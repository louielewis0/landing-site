import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { checkDashboardAuth } from "@/lib/dashboard-auth";
import { LEAD_COLUMNS, LEADS_V_COLUMNS } from "@/lib/lead-shape";

/**
 * GET  /api/dashboard/leads  → list all leads, newest first
 * POST /api/dashboard/leads  → insert a manual lead
 *
 * Both require a valid x-dashboard-auth header (passcode). Both run on
 * the server using the service role key (bypasses RLS), so anon RLS on
 * public.leads can be locked down to INSERT-only without breaking the
 * dashboard.
 *
 * As of Phase 2A commit 3, GET reads from `leads_v` (not the base
 * `leads` table) so the response carries the five computed flags
 * defined in supabase/crm_phase1a.sql — canonical_status,
 * pipeline_stage, is_active, is_hot_active, is_overdue_followup.
 * Phase 2B (overview KPIs) and 2C (Kanban by stage) consume these
 * directly. POST still writes to the base `leads` table; views
 * aren't writable by default in Postgres. Existing /dashboard
 * legacy client (still tracked until 2D lifts the list to /crm)
 * keeps working because the extra columns are additive — TS
 * simply ignores fields the older `Lead` type doesn't name.
 */

export async function GET(req: NextRequest) {
  if (!checkDashboardAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = getSupabaseAdmin();
  const { data, error } = await admin
    .from("leads_v")
    .select(LEADS_V_COLUMNS)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Attach last_contact_at — the newest call/text/email activity per
  // lead (notes and meetings deliberately excluded: logging a note is
  // not contacting someone, same rule FUB uses so agents can't game
  // "last touched"). Computed here rather than a schema migration:
  // one indexed query, reduced to a first-seen map since rows come
  // back newest-first.
  const { data: contacts, error: cErr } = await admin
    .from("activities")
    .select("lead_id, created_at")
    .in("type", ["call", "text", "email"])
    .order("created_at", { ascending: false })
    .limit(5000);
  if (cErr) {
    return NextResponse.json({ error: cErr.message }, { status: 500 });
  }
  const lastContact = new Map<string, string>();
  for (const a of contacts ?? []) {
    if (!lastContact.has(a.lead_id)) lastContact.set(a.lead_id, a.created_at);
  }
  const leads = (data ?? []).map((l) => ({
    ...l,
    last_contact_at: lastContact.get(l.id) ?? null,
  }));

  return NextResponse.json({ leads });
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
