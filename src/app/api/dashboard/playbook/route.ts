import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { checkDashboardAuth } from "@/lib/dashboard-auth";

/**
 * GET /api/dashboard/playbook
 *
 * Returns the full playbook tracker state for /crm/playbook:
 *   - completions: every checked task_id + when it was checked
 *   - conversations: every conversation event + its timestamp
 *
 * The client computes stats (current day, streak, this-week's
 * conversation count, etc.) from these two streams so the route stays
 * dumb-pipe. Conversation counts are bucketed client-side using ISO
 * week boundaries so daylight-saving + timezone never bite.
 */
export async function GET(req: NextRequest) {
  if (!checkDashboardAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sb = getSupabaseAdmin();

  const [completionsRes, conversationsRes] = await Promise.all([
    sb
      .from("playbook_completions")
      .select("id, task_id, completed_at")
      .order("completed_at", { ascending: true }),
    sb
      .from("playbook_conversations")
      .select("id, started_at, note")
      .order("started_at", { ascending: false }),
  ]);

  if (completionsRes.error) {
    return NextResponse.json(
      { error: completionsRes.error.message },
      { status: 500 },
    );
  }
  if (conversationsRes.error) {
    return NextResponse.json(
      { error: conversationsRes.error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({
    completions: completionsRes.data ?? [],
    conversations: conversationsRes.data ?? [],
  });
}
