import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { sendLeadNotification } from "@/lib/notify";

/**
 * POST /api/lead — the single capture endpoint for every PUBLIC website form
 * (contact, hero, lead gate, showing/property inquiry, tool forms, review
 * feedback). Replaces the old pattern of forms writing to Supabase directly
 * with the anon key.
 *
 * Why: the anon role is INSERT-only (no SELECT), and new-lead ALERTS used to
 * depend entirely on a Supabase dashboard webhook — which broke and dropped a
 * $931K lead on 2026-10-29. Routing through here lets us (a) insert with the
 * admin client and (b) fire the phone/email alert in-code, immediately, with
 * no webhook in the loop.
 *
 * Body: a plain lead object (same keys the forms used to insert). Only the
 * whitelisted columns below are accepted; anything else is dropped so a public
 * caller can't set internal fields (assignment, timestamps, etc.).
 */

// Columns a public form is allowed to set.
const ALLOWED = new Set([
  "name",
  "email",
  "phone",
  "intent",
  "source",
  "message",
  "priority",
  "status",
  "lead_type",
  "transaction_type",
  "address",
  "budget_range",
  "city",
  "state",
  "zip",
]);

export async function POST(req: NextRequest) {
  const raw = (await req.json().catch(() => ({}))) as Record<string, unknown>;

  const row: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(raw)) {
    if (ALLOWED.has(k) && v !== undefined) row[k] = v;
  }

  const name = typeof row.name === "string" ? row.name.trim() : "";
  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  row.name = name;

  const admin = getSupabaseAdmin();
  const { data, error } = await admin
    .from("leads")
    .insert(row)
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Fire the alert in-code. Best-effort: a notify failure must not fail the
  // capture — the lead is already saved and visible in the CRM.
  try {
    await sendLeadNotification({
      name,
      email: typeof row.email === "string" ? row.email : null,
      phone: typeof row.phone === "string" ? row.phone : null,
      source: typeof row.source === "string" ? row.source : null,
      intent: typeof row.intent === "string" ? row.intent : null,
      message: typeof row.message === "string" ? row.message : null,
      budget_range:
        typeof row.budget_range === "string" ? row.budget_range : null,
      address: typeof row.address === "string" ? row.address : null,
      priority: typeof row.priority === "string" ? row.priority : null,
    });
  } catch {
    /* alert is best-effort; lead is already captured */
  }

  return NextResponse.json({ ok: true, id: data?.id });
}
