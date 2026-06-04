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
  priority: "hot" | "warm" | "cold";
  follow_up_date: string | null;
  assigned_to: string | null;
  lost_reason: string | null;
  status: LeadStatus;
  dnc_scrubbed: boolean;
  do_not_call: boolean;
};

/** Columns explicitly selected from leads — keep in sync with Lead type. */
export const LEAD_COLUMNS =
  "id, created_at, updated_at, name, email, phone, intent, message, source, address, lead_type, property_type, transaction_type, budget_range, priority, follow_up_date, assigned_to, lost_reason, status, dnc_scrubbed, do_not_call";

/** Statuses that mean "no longer in pipeline". Used by /dashboard's Callable count. */
export const TERMINAL_STATUSES: ReadonlySet<LeadStatus> = new Set<LeadStatus>([
  "dead",
  "closed_lost",
  "closed_won",
]);

/** Cycle used by /dashboard's status-pill click. CRM-set statuses are not cyclable here. */
export const STATUS_CYCLE: LeadStatus[] = ["new", "attempted", "contacted", "dead"];
