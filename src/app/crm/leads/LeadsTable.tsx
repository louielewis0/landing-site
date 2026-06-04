"use client";

import LeadRow from "./LeadRow";
import type { Lead } from "@/lib/lead-shape";

/**
 * The leads table itself. Header row + body rows. Loading and
 * empty states render inline tbody messages, same shape as the
 * legacy.
 *
 * Whole-row selection state and the optimistic status / DNC
 * mutations live up in LeadsTableClient — this component just
 * renders what it's handed and forwards click events.
 */
export default function LeadsTable({
  leads,
  loading,
  totalCount,
  selectedId,
  onSelect,
  onCycleStatus,
  onToggleScrubbed,
}: {
  leads: Lead[];
  loading: boolean;
  totalCount: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onCycleStatus: (lead: Lead) => void;
  onToggleScrubbed: (lead: Lead) => void;
}) {
  return (
    <div className="rounded-2xl border border-bone/10 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-[13.5px]">
          <thead>
            <tr className="bg-bone/[0.03] text-[10px] text-bone/45 uppercase tracking-[0.22em]">
              <th className="text-left px-5 py-3.5 font-medium">Created</th>
              <th className="text-left px-5 py-3.5 font-medium">Lead</th>
              <th className="text-left px-5 py-3.5 font-medium">Contact</th>
              <th className="text-left px-5 py-3.5 font-medium">Intent</th>
              <th className="text-left px-5 py-3.5 font-medium">Message</th>
              <th className="text-left px-5 py-3.5 font-medium">Status</th>
              <th className="text-left px-5 py-3.5 font-medium">DNC</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-12 text-center text-bone/45 text-[14px]"
                >
                  Loading leads…
                </td>
              </tr>
            )}
            {!loading && leads.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-12 text-center text-bone/45 text-[14px]"
                >
                  {totalCount === 0
                    ? "No leads yet. They'll appear here as people submit forms."
                    : "No leads match your search or filters."}
                </td>
              </tr>
            )}
            {!loading &&
              leads.map((lead, i) => (
                <LeadRow
                  key={lead.id}
                  lead={lead}
                  striped={i % 2 === 1}
                  selected={selectedId === lead.id}
                  onSelect={() => onSelect(lead.id)}
                  onCycleStatus={() => onCycleStatus(lead)}
                  onToggleScrubbed={() => onToggleScrubbed(lead)}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
