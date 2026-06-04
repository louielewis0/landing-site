"use client";

import { Search, Download, Plus } from "lucide-react";
import type { LeadStatus, Priority } from "@/lib/lead-shape";

/**
 * Search + filter bar above the leads table.
 *
 * Phase 2D adds three new filters beyond the legacy
 * (search, status): source, priority, and property type. All
 * three are populated from the actual leads array so the
 * dropdown options track real data — no hardcoded vocabularies
 * to drift from what shipped through the public capture forms.
 *
 * The "Add lead" button next to the export sits here rather
 * than at the top of the page because it belongs visually with
 * the other table controls. The topbar "+ Add lead" affordance
 * (in the layout) deep-links here with ?add=1 so navigating
 * from another /crm route still gets you straight into the
 * form.
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

export type FilterState = {
  search: string;
  status: "all" | LeadStatus;
  source: "all" | string;
  priority: "all" | Priority;
  propertyType: "all" | string;
};

export function makeEmptyFilters(): FilterState {
  return {
    search: "",
    status: "all",
    source: "all",
    priority: "all",
    propertyType: "all",
  };
}

export default function Filters({
  state,
  onChange,
  sourceOptions,
  propertyTypeOptions,
  visibleCount,
  onAddLead,
  onExportCsv,
  showingAddPanel,
}: {
  state: FilterState;
  onChange: (next: FilterState) => void;
  sourceOptions: string[];
  propertyTypeOptions: string[];
  visibleCount: number;
  onAddLead: () => void;
  onExportCsv: () => void;
  showingAddPanel: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-5">
      <div className="relative flex-1 min-w-[220px] max-w-md">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bone/40"
          strokeWidth={1.5}
        />
        <input
          type="search"
          value={state.search}
          onChange={(e) => onChange({ ...state, search: e.target.value })}
          placeholder="Search name, phone, or email"
          className="w-full pl-11 pr-4 py-3 rounded-full bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/40 text-[13.5px] focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] transition-all"
        />
      </div>

      <FilterSelect
        value={state.status}
        onChange={(v) =>
          onChange({ ...state, status: v as "all" | LeadStatus })
        }
        ariaLabel="Filter by status"
      >
        <option value="all" className="bg-ink">
          All statuses
        </option>
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s} className="bg-ink">
            {STATUS_LABELS[s]}
          </option>
        ))}
      </FilterSelect>

      <FilterSelect
        value={state.source}
        onChange={(v) => onChange({ ...state, source: v })}
        ariaLabel="Filter by source"
      >
        <option value="all" className="bg-ink">
          All sources
        </option>
        {sourceOptions.map((s) => (
          <option key={s} value={s} className="bg-ink">
            {s}
          </option>
        ))}
      </FilterSelect>

      <FilterSelect
        value={state.priority}
        onChange={(v) =>
          onChange({ ...state, priority: v as "all" | Priority })
        }
        ariaLabel="Filter by priority"
      >
        <option value="all" className="bg-ink">
          All priorities
        </option>
        <option value="hot" className="bg-ink">
          hot
        </option>
        <option value="warm" className="bg-ink">
          warm
        </option>
        <option value="cold" className="bg-ink">
          cold
        </option>
      </FilterSelect>

      <FilterSelect
        value={state.propertyType}
        onChange={(v) => onChange({ ...state, propertyType: v })}
        ariaLabel="Filter by property type"
      >
        <option value="all" className="bg-ink">
          All property types
        </option>
        {propertyTypeOptions.map((s) => (
          <option key={s} value={s} className="bg-ink">
            {s}
          </option>
        ))}
      </FilterSelect>

      <div className="flex-1" />

      <button
        onClick={onAddLead}
        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12.5px] font-semibold tracking-wide transition-all duration-400 ${
          showingAddPanel
            ? "border border-bone/25 text-bone/80 hover:text-bone hover:border-bone/50"
            : "bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink"
        }`}
      >
        <Plus className="w-3.5 h-3.5" strokeWidth={2.25} />
        {showingAddPanel ? "Close" : "Add lead"}
      </button>

      <button
        onClick={onExportCsv}
        disabled={visibleCount === 0}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-bone/20 text-bone/80 text-[12.5px] tracking-wide hover:border-[var(--gold)]/40 hover:text-bone transition-all duration-400 disabled:opacity-40"
      >
        <Download className="w-3.5 h-3.5" strokeWidth={1.75} />
        Export CSV ({visibleCount})
      </button>
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  ariaLabel,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={ariaLabel}
      className="px-4 py-2.5 rounded-full bg-bone/[0.04] border border-bone/15 text-bone text-[12.5px] font-medium focus:outline-none focus:border-[var(--gold)]/60 transition-all appearance-none cursor-pointer"
    >
      {children}
    </select>
  );
}
