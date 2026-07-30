import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

/**
 * POST /api/valuation — the instant-valuation lead funnel.
 * Body: { name, email, phone, address, city, state, zip, intent? }
 *
 * Flow:
 *  1. Insert the lead FIRST (source "instant-valuation") — the lead
 *     is captured whether or not the AVM call succeeds. It appears in
 *     /crm under Website & Inbound immediately.
 *  2. Call RentCast's AVM (real ML valuation on recorded sales — not
 *     an LLM guess) for an instant estimate + range + comp count.
 *  3. Return { estimate } for the reveal screen, or { pending: true }
 *     when the key is missing / call fails / rate-limited — the UI
 *     then promises the broker-prepared valuation within 24h.
 *
 * Env: RENTCAST_API_KEY (optional — absence = graceful pending mode).
 * The estimate is logged onto the lead as a note-style message suffix
 * so the broker sees what the visitor saw.
 */

type Body = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  address?: unknown;
  city?: unknown;
  state?: unknown;
  zip?: unknown;
  intent?: unknown;
};

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function POST(req: NextRequest) {
  const b = (await req.json().catch(() => ({}))) as Body;
  const name = str(b.name);
  const email = str(b.email);
  const phone = str(b.phone);
  const address = str(b.address);
  const city = str(b.city);
  const state = str(b.state) || "MI";
  const zip = str(b.zip);
  const intent = ["buy", "sell", "invest", "other"].includes(str(b.intent))
    ? str(b.intent)
    : "sell";

  if (!name || !address || !city || (!email && !phone)) {
    return NextResponse.json(
      { error: "Name, address, city, and an email or phone are required." },
      { status: 400 }
    );
  }

  const fullAddress = `${address}, ${city}, ${state}${zip ? " " + zip : ""}`;
  const admin = getSupabaseAdmin();

  // 1 ─ capture the lead unconditionally
  const { data: lead, error: insErr } = await admin
    .from("leads")
    .insert({
      name,
      email: email || null,
      phone: phone || null,
      intent,
      source: "instant-valuation",
      address: fullAddress,
      lead_type: "seller",
      transaction_type: "sell",
      priority: "hot",
      status: "new",
      message: "Requested an instant valuation",
    })
    .select("id")
    .single();

  if (insErr) {
    return NextResponse.json({ error: insErr.message }, { status: 500 });
  }

  // 2 ─ instant AVM
  const key = process.env.RENTCAST_API_KEY;
  if (!key) {
    return NextResponse.json({ pending: true });
  }

  try {
    const url = `https://api.rentcast.io/v1/avm/value?address=${encodeURIComponent(fullAddress)}`;
    const res = await fetch(url, {
      headers: { "X-Api-Key": key, accept: "application/json" },
      signal: AbortSignal.timeout(9000),
    });
    if (!res.ok) {
      return NextResponse.json({ pending: true });
    }
    const data = (await res.json()) as {
      price?: number;
      priceRangeLow?: number;
      priceRangeHigh?: number;
      comparables?: unknown[];
    };
    if (!data.price) {
      return NextResponse.json({ pending: true });
    }

    const estimate = {
      value: Math.round(data.price),
      low: Math.round(data.priceRangeLow ?? data.price * 0.93),
      high: Math.round(data.priceRangeHigh ?? data.price * 1.07),
      comps: Array.isArray(data.comparables) ? data.comparables.length : 0,
    };

    // 3 ─ note what the visitor saw on the lead record
    await admin
      .from("leads")
      .update({
        message: `Instant valuation shown: $${estimate.value.toLocaleString("en-US")} (range $${estimate.low.toLocaleString("en-US")}–$${estimate.high.toLocaleString("en-US")}, ${estimate.comps} comps)`,
        budget_range: `$${estimate.value.toLocaleString("en-US")}`,
      })
      .eq("id", lead.id);

    return NextResponse.json({ estimate });
  } catch {
    return NextResponse.json({ pending: true });
  }
}
