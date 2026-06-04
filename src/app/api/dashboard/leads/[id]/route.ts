import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { checkDashboardAuth } from "@/lib/dashboard-auth";
import { LEAD_COLUMNS } from "@/lib/lead-shape";

/**
 * PATCH /api/dashboard/leads/[id]  → update whitelisted fields on a lead
 *
 * Whitelist prevents the client from updating arbitrary columns (e.g. id,
 * created_at). Only the columns /dashboard mutates today are allowed.
 */

const ALLOWED_PATCH_FIELDS = new Set([
  "status",
  "dnc_scrubbed",
  "do_not_call",
]);

type Patchable = Record<string, string | boolean>;

export async function PATCH(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
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
    if (typeof v === "string" || typeof v === "boolean") patch[k] = v;
  }

  if (Object.keys(patch).length === 0) {
    return NextResponse.json(
      { error: "No allowed fields to update" },
      { status: 400 }
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
