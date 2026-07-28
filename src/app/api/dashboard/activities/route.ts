import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { checkDashboardAuth } from "@/lib/dashboard-auth";

/**
 * GET /api/dashboard/activities → global activity feed, newest
 * first, capped at 200 rows. Each row carries the lead's name +
 * status via a foreign-table select so the feed can render
 * "Call — Scott Zacharski" and deep-link to the drawer without a
 * second query. Same auth + service-role pattern as the rest of
 * /api/dashboard/*.
 */

export async function GET(req: NextRequest) {
  if (!checkDashboardAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await getSupabaseAdmin()
    .from("activities")
    .select("id, lead_id, type, body, created_at, leads(name, status)")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ activities: data ?? [] });
}
