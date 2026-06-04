"use client";

import type { LeadStatus } from "@/lib/lead-shape";

/**
 * Status dropdown for the lead-detail drawer. All 9 status
 * vocabularies (legacy + CRM) are selectable here — the drawer
 * is the source of truth for status changes. The leads-table
 * status pill still gates its click-to-cycle on STATUS_CYCLE
 * (legacy four-state flow) so accidental clicks don't rewrite a
 * deliberately-set CRM status; the Kanban drag does CRM-set
 * transitions; this drawer can do any transition.
 */

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "new",
  attempted: "attempted",
  contacted: "contacted",
  qualified: "qualified",
  showing: "showing",
  negotiating: "negotiating",
  closed_won: "closed · won",
  closed_lost: "closed · lost",
  dead: "dead",
};

const STATUS_OPTIONS: LeadStatus[] = [
  "new",
  "attempted",
  "contacted",
  "qualified",
  "showing",
  "negotiating",
  "closed_won",
  "closed_lost",
  "dead",
];

export default function StatusSelect({
  value,
  onChange,
}: {
  value: LeadStatus;
  onChange: (next: LeadStatus) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as LeadStatus)}
      className="w-full px-3 py-2 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone text-[13.5px] focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] transition-all appearance-none cursor-pointer"
    >
      {STATUS_OPTIONS.map((s) => (
        <option key={s} value={s} className="bg-ink">
          {STATUS_LABELS[s]}
        </option>
      ))}
    </select>
  );
}
