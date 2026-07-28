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
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40"
          strokeWidth={1.75}
        />
        <input
          type="search"
          value={state.search}
          onChange={(e) => onChange({ ...state, search: e.target.value })}
          placeholder="Search name, phone, or email"
          className="crm-input !pl-11 !py-2.5"
        />
      </div>

      <FilterSelect
        value={state.status}
        onChange={(v) =>
          onChange({ ...state, status: v as "all" | LeadStatus })
        }
        ariaLabel="Filter by status"
      >
        <option value="all" className="bg-[#12141A]">
          All statuses
        </option>
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s} className="bg-[#12141A]">
            {STATUS_LABELS[s]}
          </option>
        ))}
      </FilterSelect>

      <FilterSelect
        value={state.source}
        onChange={(v) => onChange({ ...state, source: v })}
        ariaLabel="Filter by source"
      >
        <option value="all" className="bg-[#12141A]">
          All sources
        </option>
        {sourceOptions.map((s) => (
          <option key={s} value={s} className="bg-[#12141A]">
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
        <option value="all" className="bg-[#12141A]">
          All priorities
        </option>
        <option value="hot" className="bg-[#12141A]">
          hot
        </option>
        <option value="warm" className="bg-[#12141A]">
          warm
        </option>
        <option value="cold" className="bg-[#12141A]">
          cold
        </option>
      </FilterSelect>

      <FilterSelect
        value={state.propertyType}
        onChange={(v) => onChange({ ...state, propertyType: v })}
        ariaLabel="Filter by property type"
      >
        <option value="all" className="bg-[#12141A]">
          All property types
        </option>
        {propertyTypeOptions.map((s) => (
          <option key={s} value={s} className="bg-[#12141A]">
            {s}
          </option>
        ))}
      </FilterSelect>

      <div className="flex-1" />

      <button
        onClick={onAddLead}
        className={`crm-btn ${showingAddPanel ? "crm-btn-secondary" : "crm-btn-primary"} !text-[12.5px]`}
      >
        <Plus className="w-3.5 h-3.5" strokeWidth={2.25} />
        {showingAddPanel ? "Close" : "Add lead"}
      </button>

      <button
        onClick={onExportCsv}
        disabled={visibleCount === 0}
        className="crm-btn crm-btn-secondary !text-[12.5px]"
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
      className="px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.11] text-white/85 text-[12.5px] font-medium focus:outline-none focus:border-[var(--gold)]/60 focus:shadow-[0_0_0_3px_rgba(200,162,76,0.15)] transition-all duration-150 appearance-none cursor-pointer hover:bg-white/[0.08]"
    >
      {children}
    </select>
  );
}
