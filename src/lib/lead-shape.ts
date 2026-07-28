/**
 * Shared Lead shape — used by /api/dashboard/* route handlers AND the
 * dashboard client component. Kept in a non-server file so both can import.
 *
 * Mirrors the public.leads table after Phase 1 migration. New CRM fields
 * are nullable because existing rows don't have them populated yet.
 */

export type LeadStatus =
  | "new"
  | "attempted" // legacy
  | "contacted"
  | "qualified" // new
  | "showing" // new
  | "negotiating" // new
  | "closed_won" // new
  | "closed_lost" // new
  | "dead"; // legacy terminal

/** Pipeline stage as computed by leads_v. Mirrors the case
 *  expression in supabase/crm_phase1a.sql exactly. Never null in
 *  practice — every LeadStatus value maps to a stage — but typed
 *  nullable to match the SQL signature in case a future status
 *  slips into the view definition without a stage assignment. */
export type PipelineStage =
  | "open"
  | "engaging"
  | "active"
  | "negotiating"
  | "won"
  | "lost";

export type Priority = "hot" | "warm" | "cold";

export type Lead = {
  id: string;
  created_at: string;
  updated_at?: string | null;
  name: string;
  email: string | null;
  phone: string | null;
  intent: string | null;
  message: string | null;
  source: string | null;
  address: string | null;
  lead_type: string | null;
  property_type: string | null;
  transaction_type: string | null;
  budget_range: string | null;
  priority: Priority;
  follow_up_date: string | null;
  assigned_to: string | null;
  lost_reason: string | null;
  status: LeadStatus;
  dnc_scrubbed: boolean;
  do_not_call: boolean;

  // Computed by GET /api/dashboard/leads: newest call/text/email
  // activity timestamp (notes/meetings excluded — logging a note is
  // not contacting someone). Null = never personally contacted.
  last_contact_at?: string | null;

  // View-only fields populated when the row comes from leads_v
  // (which the GET /api/dashboard/leads route reads from as of
  // Phase 2A commit 3). Kept optional so consumers reading from
  // the base table directly don't have to lie about them.
  canonical_status?: LeadStatus;
  pipeline_stage?: PipelineStage | null;
  is_active?: boolean;
  is_hot_active?: boolean;
  is_overdue_followup?: boolean;
};

/** Columns explicitly selected from the leads BASE table. Used by
 *  POST (manual insert), PATCH (update with returning), and the
 *  DNC scrub route — paths that mutate or read the
 *  source-of-truth table directly. */
export const LEAD_COLUMNS =
  "id, created_at, updated_at, name, email, phone, intent, message, source, address, lead_type, property_type, transaction_type, budget_range, priority, follow_up_date, assigned_to, lost_reason, status, dnc_scrubbed, do_not_call";

/** Columns selected from the leads_v VIEW — the base lead columns
 *  plus the five computed fields the view derives from status,
 *  priority, and follow_up_date. Used by the GET list route so the
 *  overview KPI surface (2B), the Kanban (2C), and the leads
 *  table (2D) get the computed flags for free without each having
 *  to re-implement the case expressions client-side. */
export const LEADS_V_COLUMNS =
  LEAD_COLUMNS +
  ", canonical_status, pipeline_stage, is_active, is_hot_active, is_overdue_followup";

/** Statuses that mean "no longer in pipeline". Used by /dashboard's Callable count. */
export const TERMINAL_STATUSES: ReadonlySet<LeadStatus> = new Set<LeadStatus>([
  "dead",
  "closed_lost",
  "closed_won",
]);

/** Cycle used by /dashboard's status-pill click. CRM-set statuses are not cyclable here. */
export const STATUS_CYCLE: LeadStatus[] = ["new", "attempted", "contacted", "dead"];
