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

/* Semantic hue per stage (CRM design system): cool → warm as the
   lead moves down-funnel, green for won, muted/rose for lost/dead.
   One hue per status so states differentiate at a glance. */
const STATUS_STYLES: Record<LeadStatus, string> = {
  new:          "bg-[#38BDF8]/12 text-[#7DD3FC] border-[#38BDF8]/35",
  attempted:    "bg-[#FBBF24]/12 text-[#FCD34D] border-[#FBBF24]/35",
  contacted:    "bg-[var(--gold)]/15 text-[var(--gold-soft)] border-[var(--gold)]/40",
  qualified:    "bg-[#A78BFA]/14 text-[#C4B5FD] border-[#A78BFA]/40",
  showing:      "bg-[#2DD4BF]/12 text-[#5EEAD4] border-[#2DD4BF]/40",
  negotiating:  "bg-[#FB923C]/14 text-[#FDBA74] border-[#FB923C]/40",
  closed_won:   "bg-[#4ADE80]/14 text-[#86EFAC] border-[#4ADE80]/40",
  closed_lost:  "bg-white/[0.07] text-white/50 border-white/20",
  dead:         "bg-[#FB7185]/12 text-[#FDA4AF] border-[#FB7185]/40",
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
