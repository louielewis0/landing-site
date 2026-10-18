import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

/**
 * POST /api/call-summary — Vapi "server URL" webhook for the AI phone
 * receptionist that catches missed Local Services Ads (and all other) calls.
 *
 * Vapi posts several message types to this URL over a call's life
 * (status-update, transcript, tool-calls, end-of-call-report). We act ONLY
 * on `end-of-call-report`, which arrives once when the call ends and carries
 * the analysis summary + the structured fields we asked Vapi to extract.
 *
 * What it does: turns that report into a row in `public.leads` (source
 * "ai-receptionist"). That INSERT fires the existing Supabase webhook →
 * /api/notify-lead → email + Pushover, and the lead shows in /crm — so a
 * missed call lands on the broker's phone exactly like a website lead, with
 * the AI's summary and a transcript attached for follow-up and LSA disputes.
 *
 * Auth: Vapi sends the configured secret as `x-vapi-secret` (we also accept
 * `x-webhook-secret`). If CALL_WEBHOOK_SECRET is set, it must match.
 *
 * Env: CALL_WEBHOOK_SECRET (optional but recommended). Returns 200 on
 * skip/non-fatal paths so Vapi doesn't retry-storm.
 */

type StructuredData = {
  caller_name?: string;
  callback_number?: string;
  intent?: string; // buy | sell | invest | other
  city?: string;
  timeline?: string;
  price_range?: string;
  is_spam?: boolean;
  notes?: string;
};

type VapiAnalysis = {
  summary?: string;
  structuredData?: StructuredData;
  // Newer "Structured Outputs" feature delivers results here, keyed by output
  // id; each value may be the result object directly or wrapped in {result}/{value}.
  structuredOutputs?: Record<string, unknown>;
};

type VapiMessage = {
  type?: string;
  endedReason?: string;
  analysis?: VapiAnalysis;
  artifact?: { transcript?: string };
  transcript?: string;
  customer?: { number?: string };
  call?: { customer?: { number?: string } };
};

const clean = (v: unknown) => (typeof v === "string" ? v.trim() : "");

const FIELDS = [
  "caller_name", "callback_number", "intent", "city",
  "timeline", "price_range", "is_spam", "notes",
] as const;

// Collect our fields whether Vapi returns them as the classic
// `analysis.structuredData` (keyed by field name) or the newer
// `analysis.structuredOutputs` (keyed by output id, value possibly wrapped).
function collectFields(analysis?: VapiAnalysis): StructuredData {
  const out: Record<string, unknown> = {};
  const sd = analysis?.structuredData;
  if (sd && typeof sd === "object") Object.assign(out, sd);

  const so = analysis?.structuredOutputs;
  if (so && typeof so === "object") {
    for (const v of Object.values(so)) {
      if (!v || typeof v !== "object") continue;
      const rec = v as Record<string, unknown>;
      const inner = (rec.result ?? rec.value ?? rec) as Record<string, unknown>;
      if (inner && typeof inner === "object") {
        for (const k of FIELDS) {
          if (k in inner && out[k] === undefined) out[k] = inner[k];
        }
      }
    }
  }
  return out as StructuredData;
}

// Map the caller's stated intent to the two column values we KNOW the
// leads table accepts (mirrors /api/valuation). Anything buy-side or
// unclear is treated as a buyer so the insert never trips a constraint.
function mapIntent(raw: string): {
  intent: string;
  lead_type: "buyer" | "seller";
  transaction_type: "buy" | "sell";
} {
  const i = raw.toLowerCase();
  if (i === "sell") return { intent: "sell", lead_type: "seller", transaction_type: "sell" };
  if (i === "invest") return { intent: "invest", lead_type: "buyer", transaction_type: "buy" };
  if (i === "buy") return { intent: "buy", lead_type: "buyer", transaction_type: "buy" };
  return { intent: "other", lead_type: "buyer", transaction_type: "buy" };
}

export async function POST(req: NextRequest) {
  const secret = process.env.CALL_WEBHOOK_SECRET;
  if (secret) {
    const got = req.headers.get("x-vapi-secret") || req.headers.get("x-webhook-secret");
    if (got !== secret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const body = (await req.json().catch(() => ({}))) as { message?: VapiMessage };
  const msg = body.message;

  // Only the final report creates a lead; ignore the chatty in-call events.
  if (!msg || msg.type !== "end-of-call-report") {
    return NextResponse.json({ skipped: msg?.type ?? "no-message" });
  }

  const sd = collectFields(msg.analysis);
  const summary = clean(msg.analysis?.summary);
  const transcript = clean(msg.artifact?.transcript || msg.transcript);
  const callerNumber = clean(msg.customer?.number || msg.call?.customer?.number);

  const name = clean(sd.caller_name) || "LSA caller";
  const phone = clean(sd.callback_number) || callerNumber || null;
  const city = clean(sd.city);
  const timeline = clean(sd.timeline);
  const priceRange = clean(sd.price_range);
  const isSpam = sd.is_spam === true || String(sd.is_spam).toLowerCase() === "true";
  const { intent, lead_type, transaction_type } = mapIntent(clean(sd.intent));

  // Compose the broker-facing note: summary + captured fields + a trimmed
  // transcript tail for context (kept short so alerts stay readable).
  const noteLines = [
    isSpam ? "📞 AI receptionist — LIKELY SPAM (possible LSA refund dispute)." : "📞 AI receptionist — missed call caught.",
    summary && `Summary: ${summary}`,
    city && `City: ${city}`,
    timeline && `Timeline: ${timeline}`,
    priceRange && `Price range: ${priceRange}`,
    clean(sd.notes) && `Notes: ${clean(sd.notes)}`,
    msg.endedReason && `Ended: ${msg.endedReason}`,
    transcript && `\n— Transcript —\n${transcript.slice(0, 1400)}`,
  ].filter(Boolean);
  const message = noteLines.join("\n");

  // Build the insert. A real, reachable, non-spam caller is "hot"; spam
  // still gets logged (evidence for an LSA refund dispute) but never buzzes
  // as hot and is parked as "spam" status.
  const payload: Record<string, unknown> = {
    name,
    phone,
    email: null,
    intent,
    source: "ai-receptionist",
    address: city ? `${city}, MI` : null,
    lead_type,
    transaction_type,
    status: "new",
    message,
  };
  // Real, reachable caller → "hot" (buzzes). Spam → "warm" so it's logged
  // for a dispute without a hot alert. ("spam" is not a valid status value.)
  payload.priority = !isSpam && phone ? "hot" : "warm";

  const admin = getSupabaseAdmin();
  const { data, error } = await admin.from("leads").insert(payload).select("id").single();

  if (error) {
    // Don't 500 — log and ack so Vapi doesn't hammer the endpoint.
    return NextResponse.json({ ok: false, error: error.message }, { status: 200 });
  }

  return NextResponse.json({ ok: true, id: data?.id, spam: isSpam });
}
