/**
 * Activity shape — mirrors public.activities from
 * supabase/crm_phase1a.sql. Used by the lead-detail drawer's
 * timeline (2E) and any future activity-feed surface.
 *
 * created_by references public.agents(id). Agents are populated
 * only after Phase 3 ships Supabase Auth (the table FK is
 * agents.id → auth.users(id)). For Phase 2E we INSERT with
 * created_by = null; the timeline renders "by you" as a stand-in
 * for any null author.
 */

export type ActivityType = "call" | "email" | "text" | "meeting" | "note";

export type Activity = {
  id: string;
  lead_id: string;
  type: ActivityType;
  body: string | null;
  created_by: string | null;
  created_at: string;
};

/** Columns selected from public.activities. */
export const ACTIVITY_COLUMNS =
  "id, lead_id, type, body, created_by, created_at";

export const ACTIVITY_TYPES: readonly ActivityType[] = [
  "call",
  "email",
  "text",
  "meeting",
  "note",
] as const;
