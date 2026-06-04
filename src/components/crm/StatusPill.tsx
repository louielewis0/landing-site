import type { LeadStatus } from "@/lib/lead-shape";

/**
 * Lead status pill — uppercase tracked chip, color-coded by
 * status. Used across every CRM surface that needs to surface a
 * lead's pipeline state (KPI cards in 2B, Kanban cards in 2C,
 * leads table rows in 2D, lead-detail header in 2E).
 *
 * STATUS_STYLES and STATUS_LABELS are lifted verbatim from the
 * legacy /dashboard/dashboard.tsx so the new /crm surfaces and
 * the in-flight legacy list render statuses identically during
 * the parallel-rebuild window (until 2D lifts the leads list
 * here and the legacy file goes away).
 *
 * All 9 status vocabularies render with appropriate color so the
 * pill never shows blank when a CRM-set status (qualified,
 * showing, negotiating, closed_won, closed_lost) appears on a
 * lead alongside the legacy ones (new, attempted, contacted,
 * dead).
 */

const STATUS_STYLES: Record<LeadStatus, string> = {
  new:          "bg-bone/10 text-bone border-bone/20",
  attempted:    "bg-[var(--gold-soft)]/15 text-[var(--gold-soft)] border-[var(--gold-soft)]/35",
  contacted:    "bg-[var(--gold)]/15 text-[var(--gold)] border-[var(--gold)]/40",
  qualified:    "bg-[var(--gold)]/20 text-[var(--gold-soft)] border-[var(--gold)]/45",
  showing:      "bg-[var(--gold)]/25 text-[var(--gold-soft)] border-[var(--gold)]/50",
  negotiating:  "bg-[var(--gold)]/30 text-bone border-[var(--gold)]/55",
  closed_won:   "bg-green-500/15 text-green-400 border-green-500/40",
  closed_lost:  "bg-rust/15 text-rust/80 border-rust/35",
  dead:         "bg-rust/20 text-rust border-rust/40",
};

const STATUS_LABELS: Record<LeadStatus, string> = {
  new:          "new",
  attempted:    "attempted",
  contacted:    "contacted",
  qualified:    "qualified",
  showing:      "showing",
  negotiating:  "negotiating",
  closed_won:   "closed · won",
  closed_lost:  "closed · lost",
  dead:         "dead",
};

export default function StatusPill({ status }: { status: LeadStatus }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full border text-[10px] font-semibold tracking-[0.18em] uppercase whitespace-nowrap ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
