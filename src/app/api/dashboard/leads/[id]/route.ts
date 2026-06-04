import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { checkDashboardAuth } from "@/lib/dashboard-auth";
import { LEAD_COLUMNS } from "@/lib/lead-shape";

/**
 * PATCH /api/dashboard/leads/[id]  → update whitelisted fields on a lead
 *
 * Whitelist prevents the client from updating arbitrary columns
 * (e.g. id, created_at). Phase 2E expanded the set so the
 * lead-detail drawer can edit the full record.
 *
 * Whitelist members (18 total):
 *   • Compliance / status (added in earlier phases):
 *     status, dnc_scrubbed, do_not_call
 *   • Identity / contact:
 *     name, phone, email, address
 *   • Intent / notes:
 *     intent, message
 *   • Lead classification:
 *     source, lead_type, property_type, transaction_type,
 *     budget_range
 *   • Pipeline metadata:
 *     priority, follow_up_date, assigned_to, lost_reason
 *
 * Validation: per-field CHECK constraints on public.leads
 * (priority IN ('hot','warm','cold'), property_type IN (…),
 * transaction_type IN ('buy','sell','lease'), status IN (…))
 * are enforced by Postgres. A bad value comes back as a 400
 * with the Postgres error string in `error`, which is plenty
 * informative for the drawer UI.
 *
 * The assigned_to field is allowed at the route level even
 * though Phase 2E renders it read-only in the UI — Phase 3
 * (Supabase Auth + agents) will flip the UI on without
 * needing another route change.
 */

const ALLOWED_PATCH_FIELDS = new Set([
  // Compliance / status
  "status",
  "dnc_scrubbed",
  "do_not_call",
  // Identity / contact
  "name",
  "phone",
  "email",
  "address",
  // Intent / notes
  "intent",
  "message",
  // Lead classification
  "source",
  "lead_type",
  "property_type",
  "transaction_type",
  "budget_range",
  // Pipeline metadata
  "priority",
  "follow_up_date",
  "assigned_to",
  "lost_reason",
]);

type Patchable = Record<string, string | boolean | null>;

export async function PATCH(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  if (!checkDashboardAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const patch: Patchable = {};
  for (const [k, v] of Object.entries(body)) {
    if (!ALLOWED_PATCH_FIELDS.has(k)) continue;
    if (v === null) {
      // Explicit null clears an optional field (e.g. follow_up_date,
      // lost_reason, assigned_to). NOT-NULL columns (name, status,
      // priority) bounce off the DB constraint and we surface that
      // 400.
      patch[k] = null;
    } else if (typeof v === "string" || typeof v === "boolean") {
      patch[k] = v;
    }
  }

  if (Object.keys(patch).length === 0) {
    return NextResponse.json(
      { error: "No allowed fields to update" },
      { status: 400 },
    );
  }

  const { data, error } = await getSupabaseAdmin()
    .from("leads")
    .update(patch)
    .eq("id", id)
    .select(LEAD_COLUMNS)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ lead: data });
}
