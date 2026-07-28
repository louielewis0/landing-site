import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { checkDashboardAuth } from "@/lib/dashboard-auth";
import { ACTIVITY_COLUMNS, ACTIVITY_TYPES } from "@/lib/activity-shape";

/**
 * GET  /api/dashboard/leads/[id]/activities  → list newest-first
 * POST /api/dashboard/leads/[id]/activities  → log a new activity
 *
 * Backed by public.activities from supabase/crm_phase1a.sql.
 * Both endpoints run with the service_role key (same pattern
 * as the rest of /api/dashboard/*) and bypass RLS.
 *
 * created_by is set to null during Phase 2 — agents are
 * populated only after Phase 3 ships Supabase Auth (the FK
 * agents.id → auth.users(id) requires real users). The drawer
 * timeline renders "by you" for null authors.
 */

export async function GET(
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

  const { data, error } = await getSupabaseAdmin()
    .from("activities")
    .select(ACTIVITY_COLUMNS)
    .eq("lead_id", id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ activities: data ?? [] });
}

export async function POST(
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

  const type = body.type;
  if (typeof type !== "string" || !ACTIVITY_TYPES.includes(type as never)) {
    return NextResponse.json(
      {
        error: `type must be one of ${ACTIVITY_TYPES.join(", ")}`,
      },
      { status: 400 },
    );
  }

  const bodyText = typeof body.body === "string" ? body.body : null;

  const { data, error } = await getSupabaseAdmin()
    .from("activities")
    .insert({
      lead_id: id,
      type,
      body: bodyText,
      // Phase 2: no agents populated, so author is null.
      // Phase 3 will replace this with the authenticated agent's id.
      created_by: null,
    })
    .select(ACTIVITY_COLUMNS)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Self-clearing queues (FUB's "unactioned" mechanic): logging a real
  // contact attempt on a never-touched lead advances it out of `new`
  // so it drops off the Respond Now queue without a manual status
  // click. Notes/meetings don't count as contact.
  let leadStatus: string | null = null;
  if (type === "call" || type === "text" || type === "email") {
    const { data: lead } = await getSupabaseAdmin()
      .from("leads")
      .select("id, status")
      .eq("id", id)
      .single();
    if (lead?.status === "new") {
      const { data: updated } = await getSupabaseAdmin()
        .from("leads")
        .update({ status: "attempted" })
        .eq("id", id)
        .select("status")
        .single();
      leadStatus = updated?.status ?? null;
    }
  }

  return NextResponse.json({ activity: data, leadStatus });
}
