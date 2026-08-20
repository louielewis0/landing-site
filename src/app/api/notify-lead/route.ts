import { NextRequest, NextResponse } from "next/server";
import { company } from "@/lib/config";

/**
 * POST /api/notify-lead — fired by a Supabase Database Webhook on every
 * INSERT into public.leads, so a new-lead email lands the moment a lead
 * arrives from ANY source (website, Maya, yard-sign page, CRM add).
 *
 * Payload (Supabase webhook shape):
 *   { type: "INSERT", table: "leads", record: {<the new lead row>}, ... }
 *
 * Auth: the webhook sends header `x-webhook-secret: <LEAD_WEBHOOK_SECRET>`.
 * Send: Resend REST API (no SDK) to NOTIFY_EMAIL. All env optional —
 * absence degrades gracefully (returns 200 so Supabase doesn't retry-storm).
 *
 * Env: LEAD_WEBHOOK_SECRET, RESEND_API_KEY, NOTIFY_EMAIL.
 */

type LeadRecord = {
  name?: string;
  phone?: string | null;
  email?: string | null;
  source?: string | null;
  intent?: string | null;
  message?: string | null;
  budget_range?: string | null;
  address?: string | null;
  priority?: string | null;
};

const SOURCE_LABEL: Record<string, string> = {
  "instant-valuation": "Home valuation tool",
  "ai-concierge": "Maya (AI chat)",
  "showing-request": "Showing request",
  "yard-sign": "Yard sign (QR scan)",
  "contact-form": "Website contact form",
  hero: "Website",
};

function label(source?: string | null): string {
  if (!source) return "Website";
  return SOURCE_LABEL[source] ?? source;
}

export async function POST(req: NextRequest) {
  const secret = process.env.LEAD_WEBHOOK_SECRET;
  if (secret && req.headers.get("x-webhook-secret") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as { record?: LeadRecord };
  const r = body.record;
  if (!r || !r.name) {
    return NextResponse.json({ skipped: "no record" });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  if (!key || !to) {
    // Not configured yet — acknowledge so the webhook doesn't retry.
    return NextResponse.json({ pending: "email not configured" });
  }

  const rows: [string, string | null | undefined][] = [
    ["Name", r.name],
    ["Phone", r.phone],
    ["Email", r.email],
    ["Looking to", r.intent],
    ["Budget", r.budget_range],
    ["Address", r.address],
    ["Came from", label(r.source)],
    ["Note", r.message],
  ];
  const hot = (r.priority ?? "").toLowerCase() === "hot";

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:520px;margin:0 auto;color:#191a1c">
      <div style="background:#E4501E;color:#fff;padding:18px 24px;border-radius:14px 14px 0 0">
        <div style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;opacity:.85">${hot ? "🔥 Hot new lead" : "New lead"}</div>
        <div style="font-size:22px;font-weight:700;margin-top:2px">${r.name}</div>
      </div>
      <table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #eee;border-top:none;border-radius:0 0 14px 14px">
        ${rows
          .filter(([, v]) => v)
          .map(
            ([k, v]) =>
              `<tr><td style="padding:11px 24px;border-bottom:1px solid #f2f2f2;color:#888;font-size:13px;width:110px;vertical-align:top">${k}</td><td style="padding:11px 24px;border-bottom:1px solid #f2f2f2;font-size:15px;font-weight:600">${v}</td></tr>`,
          )
          .join("")}
      </table>
      ${r.phone ? `<div style="text-align:center;margin:20px 0"><a href="tel:${r.phone}" style="display:inline-block;background:#191a1c;color:#fff;padding:13px 28px;border-radius:100px;text-decoration:none;font-weight:600;font-size:15px">Call ${r.name.split(" ")[0]} now</a></div>` : ""}
      <div style="text-align:center;margin:16px 0"><a href="https://marketcenterrealty.com/crm" style="color:#E4501E;font-size:13px;font-weight:600;text-decoration:none">Open in CRM →</a></div>
    </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: `${company.name} Leads <onboarding@resend.dev>`,
        to: [to],
        subject: `${hot ? "🔥 " : ""}New lead: ${r.name}${r.phone ? ` · ${r.phone}` : ""}`,
        html,
      }),
    });
    if (!res.ok) {
      const detail = await res.text();
      return NextResponse.json({ error: "send failed", detail }, { status: 502 });
    }
    return NextResponse.json({ sent: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : String(e) },
      { status: 502 },
    );
  }
}
