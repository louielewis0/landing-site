import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { checkDashboardAuth } from "@/lib/dashboard-auth";

/**
 * PATCH  /api/dashboard/farm/[id] → { carded?, notes? } (toggle the
 *   card-dropped flag; carded_at is stamped/cleared to match)
 * DELETE /api/dashboard/farm/[id] → remove a target from the farm
 */

export async function PATCH(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  if (!checkDashboardAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const body = (await req.json().catch(() => ({}))) as {
    carded?: unknown;
    notes?: unknown;
  };

  const patch: Record<string, unknown> = {};
  if (typeof body.carded === "boolean") {
    patch.carded = body.carded;
    patch.carded_at = body.carded ? new Date().toISOString() : null;
  }
  if (typeof body.notes === "string") patch.notes = body.notes;

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
  }

  const { data, error } = await getSupabaseAdmin()
    .from("farm_targets")
    .update(patch)
    .eq("id", id)
    .select("id, address, lat, lng, carded, carded_at, notes, created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ target: data });
}

export async function DELETE(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  if (!checkDashboardAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const { error } = await getSupabaseAdmin().from("farm_targets").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
