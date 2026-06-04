import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { checkDashboardAuth } from "@/lib/dashboard-auth";
import { LEAD_COLUMNS } from "@/lib/lead-shape";

/**
 * GET  /api/dashboard/leads  → list all leads, newest first
 * POST /api/dashboard/leads  → insert a manual lead
 *
 * Both require a valid x-dashboard-auth header (passcode). Both run on
 * the server using the service role key (bypasses RLS), so anon RLS on
 * public.leads can be locked down to INSERT-only without breaking the
 * dashboard.
 */

export async function GET(req: NextRequest) {
  if (!checkDashboardAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await getSupabaseAdmin()
    .from("leads")
    .select(LEAD_COLUMNS)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ leads: data ?? [] });
}

// Field whitelist for the manual-entry form. Anything outside this set
// is ignored — so even if a malicious client tries to POST { id: ..., status: ... },
// only the whitelisted shape goes to Supabase.
const ALLOWED_INSERT_FIELDS = new Set([
  "name",
  "phone",
  "email",
  "address",
  "intent",
  "source",
  "lead_type",
  "message",
  "property_type",
  "transaction_type",
  "budget_range",
]);

type Insertable = Record<string, string | null>;

export async function POST(req: NextRequest) {
  if (!checkDashboardAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  if (!body.name || typeof body.name !== "string" || !body.name.trim()) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }

  const payload: Insertable = {};
  for (const [k, v] of Object.entries(body)) {
    if (!ALLOWED_INSERT_FIELDS.has(k)) continue;
    if (typeof v !== "string") continue;
    const trimmed = v.trim();
    payload[k] = trimmed.length ? trimmed : null;
  }

  // name must end up populated (already validated above, but enforce post-trim)
  if (!payload.name) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }

  const { data, error } = await getSupabaseAdmin()
    .from("leads")
    .insert(payload)
    .select(LEAD_COLUMNS)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ lead: data }, { status: 201 });
}
