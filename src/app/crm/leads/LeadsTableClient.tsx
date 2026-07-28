"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { AlertCircle, RefreshCw } from "lucide-react";
import { usePasscode } from "../gate";
import { useLeads } from "../_lib/use-leads";
import { apiFetch } from "../_lib/api-client";
import { relativeTime } from "../_lib/relative-time";
import {
  STATUS_CYCLE,
  type Lead,
} from "@/lib/lead-shape";
import AddLeadPanel from "./AddLeadPanel";
import DncScrubber from "./DncScrubber";
import ImportPanel from "./ImportPanel";
import Filters, { makeEmptyFilters, type FilterState } from "./Filters";
import TraceTargets from "./TraceTargets";
import LeadsTable from "./LeadsTable";
import LeadDrawer from "./LeadDrawer";

/**
 * Top-level client component for /crm/leads. Owns:
 *   • a local mirror of the leads array (for optimistic
 *     mutations — same pattern as PipelineClient in 2C)
 *   • the FilterState (search + status + source + priority +
 *     propertyType)
 *   • the showAddPanel boolean (auto-true if ?add=1 in URL)
 *   • the row-select bridge to ?lead=<id> URL state, which the
 *     2E drawer subscribes to
 *
 * Mutations:
 *   • AddLeadPanel.onCreated  → prepend the new lead, clear ?add=1
 *   • DncScrubber.onScrubbed  → apply blocked/cleared IDs locally
 *   • cycleStatus (row pill)  → PATCH + optimistic + rollback
 *   • toggleScrubbed (row chip) → PATCH + optimistic + rollback
 *
 * The status pill on a row cycles only the LEGACY four-status
 * vocab (new → attempted → contacted → dead). CRM-set statuses
 * (qualified, showing, negotiating, closed_*) are managed
 * exclusively from the Kanban or the 2E drawer — the pill goes
 * read-only when its current status isn't in STATUS_CYCLE.
 */
export default function LeadsTableClient() {
  const passcode = usePasscode();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const result = useLeads();
  // Local mirror seeded from useLeads. Depending on `result.status` +
  // `result.leads` instead of the whole result object — see
  // PipelineClient for the same fix. useLeads returns a new object
  // literal every render, and `[result]` would wipe any optimistic
  // mutation we add here later.
  const [leads, setLeads] = useState<Lead[]>([]);
  useEffect(() => {
    if (result.status === "ready") setLeads(result.leads);
  }, [result.status, result.leads]);

  const [filters, setFilters] = useState<FilterState>(makeEmptyFilters());
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [mutErr, setMutErr] = useState<string | null>(null);

  // View segmentation: website/inbound leads vs expired prospecting.
  // The prospecting tools (import / trace / DNC) live ONLY in the
  // expired tab so inbound leads are never buried under machinery.
  type LeadView = "inbound" | "expired" | "all";
  const [view, setView] = useState<LeadView>("inbound");
  const isExpiredLead = useCallback(
    (l: Lead) => (l.source ?? "").trim().toLowerCase() === "expired",
    [],
  );
  const inboundLeads = useMemo(
    () => leads.filter((l) => !isExpiredLead(l)),
    [leads, isExpiredLead],
  );
  const expiredLeads = useMemo(
    () => leads.filter(isExpiredLead),
    [leads, isExpiredLead],
  );
  const segmented =
    view === "all" ? leads : view === "expired" ? expiredLeads : inboundLeads;
  const newInboundCount = useMemo(
    () => inboundLeads.filter((l) => l.status === "new").length,
    [inboundLeads],
  );
  const latestInbound = useMemo(
    () =>
      [...inboundLeads]
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        )
        .slice(0, 3),
    [inboundLeads],
  );

  // Read ?lead and ?add from URL on each render — these stay in
  // sync with browser back/forward and external links.
  const selectedLeadId = searchParams.get("lead");
  const addParam = searchParams.get("add");

  // Auto-expand the Add Lead panel when arriving with ?add=1
  // (deep-link from the topbar). Strip the param after consuming
  // it so reloads don't keep re-opening.
  useEffect(() => {
    if (addParam === "1") {
      setShowAddPanel(true);
      const params = new URLSearchParams(searchParams);
      params.delete("add");
      router.replace(
        `${pathname}${params.toString() ? `?${params.toString()}` : ""}`,
        { scroll: false },
      );
    }
  }, [addParam, pathname, router, searchParams]);

  // Filter-options derived from the current segment so dropdowns
  // track reality, not a frozen vocabulary.
  const sourceOptions = useMemo(
    () =>
      Array.from(
        new Set(
          segmented
            .map((l) => l.source ?? "")
            .filter((s): s is string => s.trim().length > 0),
        ),
      ).sort(),
    [segmented],
  );
  const propertyTypeOptions = useMemo(
    () =>
      Array.from(
        new Set(
          segmented
            .map((l) => l.property_type ?? "")
            .filter((s): s is string => s.trim().length > 0),
        ),
      ).sort(),
    [segmented],
  );

  // Filtered view — search across name / phone / email, then
  // the four select-based filters.
  const visible = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return segmented.filter((l) => {
      if (filters.status !== "all" && l.status !== filters.status) return false;
      if (filters.source !== "all" && l.source !== filters.source) return false;
      if (filters.priority !== "all" && l.priority !== filters.priority)
        return false;
      if (
        filters.propertyType !== "all" &&
        l.property_type !== filters.propertyType
      )
        return false;
      if (!q) return true;
      const hay = `${l.name} ${l.phone ?? ""} ${l.email ?? ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [segmented, filters]);

  // Drawer open/close is LOCAL state — instant, no server round-trip.
  // The ?lead=<id> URL param is synced in the background (so deep
  // links and back/forward still work) but the drawer never waits on
  // the router: a stale client after a fresh deploy used to make
  // router.push fail silently, which read as "the X does nothing."
  const [openLeadId, setOpenLeadId] = useState<string | null>(null);
  useEffect(() => {
    // External URL changes (deep link, back/forward) drive the drawer.
    setOpenLeadId(selectedLeadId);
  }, [selectedLeadId]);

  const syncUrl = useCallback(
    (id: string | null, method: "push" | "replace") => {
      const params = new URLSearchParams(searchParams);
      if (id) params.set("lead", id);
      else params.delete("lead");
      router[method](
        `${pathname}${params.toString() ? `?${params.toString()}` : ""}`,
        { scroll: false },
      );
    },
    [pathname, router, searchParams],
  );

  const selectLead = useCallback(
    (id: string) => {
      const next = openLeadId === id ? null : id;
      setOpenLeadId(next); // drawer reacts NOW
      try {
        syncUrl(next, next ? "push" : "replace"); // URL catches up
      } catch {
        // URL sync is cosmetic — never let it block the drawer.
      }
    },
    [openLeadId, syncUrl],
  );

  // Status-pill cycle (legacy four-status flow). Same semantics
  // as the legacy dashboard: CRM-set statuses are no-op here.
  const cycleStatus = useCallback(
    async (lead: Lead) => {
      if (!STATUS_CYCLE.includes(lead.status)) return;
      const idx = STATUS_CYCLE.indexOf(lead.status);
      const next = STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];

      setLeads((cur) =>
        cur.map((l) => (l.id === lead.id ? { ...l, status: next } : l)),
      );
      setMutErr(null);
      try {
        await apiFetch(passcode, `/leads/${lead.id}`, {
          method: "PATCH",
          body: JSON.stringify({ status: next }),
        });
      } catch (e) {
        setLeads((cur) =>
          cur.map((l) =>
            l.id === lead.id ? { ...l, status: lead.status } : l,
          ),
        );
        setMutErr(
          `Couldn't update status: ${
            e instanceof Error ? e.message : String(e)
          }`,
        );
      }
    },
    [passcode],
  );

  const toggleScrubbed = useCallback(
    async (lead: Lead) => {
      if (lead.do_not_call) return;
      const next = !lead.dnc_scrubbed;
      setLeads((cur) =>
        cur.map((l) =>
          l.id === lead.id ? { ...l, dnc_scrubbed: next } : l,
        ),
      );
      setMutErr(null);
      try {
        await apiFetch(passcode, `/leads/${lead.id}`, {
          method: "PATCH",
          body: JSON.stringify({ dnc_scrubbed: next }),
        });
      } catch (e) {
        setLeads((cur) =>
          cur.map((l) =>
            l.id === lead.id ? { ...l, dnc_scrubbed: lead.dnc_scrubbed } : l,
          ),
        );
        setMutErr(
          `Couldn't update DNC scrubbed flag: ${
            e instanceof Error ? e.message : String(e)
          }`,
        );
      }
    },
    [passcode],
  );

  function handleScrubbed(blockedIds: string[], clearedIds: string[]) {
    const blockSet = new Set(blockedIds);
    const clearSet = new Set(clearedIds);
    setLeads((cur) =>
      cur.map((l) => {
        if (blockSet.has(l.id))
          return { ...l, do_not_call: true, dnc_scrubbed: false };
        if (clearSet.has(l.id))
          return { ...l, do_not_call: false, dnc_scrubbed: true };
        return l;
      }),
    );
  }

  function handleCreated(lead: Lead) {
    setLeads((cur) => [lead, ...cur]);
  }

  function exportCsv() {
    const header = [
      "id",
      "created_at",
      "name",
      "phone",
      "email",
      "address",
      "intent",
      "message",
      "source",
      "lead_type",
      "property_type",
      "transaction_type",
      "budget_range",
      "priority",
      "follow_up_date",
      "assigned_to",
      "lost_reason",
      "status",
      "dnc_scrubbed",
      "do_not_call",
    ];
    const escape = (v: string | null | boolean | undefined) => {
      const s = v == null ? "" : String(v);
      if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
      return s;
    };
    const rows = visible.map((l) => [
      l.id,
      l.created_at,
      l.name,
      l.phone,
      l.email,
      l.address,
      l.intent,
      l.message,
      l.source,
      l.lead_type,
      l.property_type,
      l.transaction_type,
      l.budget_range,
      l.priority,
      l.follow_up_date,
      l.assigned_to,
      l.lost_reason,
      l.status,
      l.dnc_scrubbed,
      l.do_not_call,
    ]);
    const csv = [header, ...rows]
      .map((r) => r.map(escape).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  if (result.status === "error") {
    return (
      <div className="rounded-2xl border border-rust/40 bg-rust/[0.05] p-8 text-center">
        <div className="w-12 h-12 rounded-full border border-rust/40 bg-rust/10 flex items-center justify-center mx-auto mb-4 text-rust">
          <AlertCircle className="w-5 h-5" strokeWidth={1.5} />
        </div>
        <p className="font-display text-2xl font-light text-bone mb-2">
          Couldn&apos;t load leads.
        </p>
        <p className="text-bone/55 text-[14px] mb-6 font-light">
          {result.error}
        </p>
        <button
          type="button"
          onClick={result.reload}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink text-[13px] font-semibold tracking-wide transition-all duration-400"
        >
          <RefreshCw className="w-4 h-4" strokeWidth={2} />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {showAddPanel && (
        <AddLeadPanel
          onCreated={(l) => {
            handleCreated(l);
          }}
          onClose={() => setShowAddPanel(false)}
        />
      )}

      {/* View tabs — inbound first so new website leads are never buried */}
      <nav className="flex items-center gap-2 mb-6 flex-wrap" aria-label="Lead views">
        {(
          [
            ["inbound", "Website & Inbound", inboundLeads.length],
            ["expired", "Expired prospecting", expiredLeads.length],
            ["all", "All leads", leads.length],
          ] as const
        ).map(([key, label, count]) => (
          <button
            key={key}
            type="button"
            onClick={() => setView(key)}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] tracking-wide transition-all border ${
              view === key
                ? "bg-[var(--gold)] text-ink font-semibold border-transparent"
                : "text-bone/60 hover:text-bone border-bone/15 hover:border-bone/30"
            }`}
          >
            {label}
            <span
              className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                view === key ? "bg-ink/15" : "bg-bone/[0.06]"
              }`}
            >
              {count}
            </span>
            {key === "inbound" && newInboundCount > 0 && (
              <span className="text-[10px] uppercase tracking-[0.14em] px-1.5 py-0.5 rounded-full bg-rust/80 text-bone">
                {newInboundCount} new
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Inbound pulse — answers "are we getting website leads?" at a glance */}
      {view === "inbound" && latestInbound.length > 0 && (
        <div className="rounded-2xl bg-bone/[0.02] border border-bone/10 p-5 mb-6">
          <p className="eyebrow mb-3">Latest inbound</p>
          <ul className="space-y-1.5">
            {latestInbound.map((l) => (
              <li key={l.id} className="flex items-baseline gap-3 text-[13.5px]">
                <button
                  type="button"
                  onClick={() => selectLead(l.id)}
                  className="text-bone font-medium hover:text-[var(--gold-soft)] transition-colors truncate"
                >
                  {l.name}
                </button>
                <span className="text-bone/45 font-light truncate">
                  {l.intent ?? l.lead_type ?? "—"}
                  {l.source ? ` · ${l.source}` : ""}
                </span>
                <span className="ml-auto text-[12px] text-bone/40 shrink-0">
                  {relativeTime(l.created_at)}
                </span>
                {l.status === "new" && (
                  <span className="text-[9.5px] uppercase tracking-[0.16em] text-[var(--gold-soft)] shrink-0">
                    new
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Prospecting machinery lives ONLY in the expired tab */}
      {view === "expired" && (
        <>
          <ImportPanel
            onImported={(imported) => setLeads((cur) => [...imported, ...cur])}
            onUpdated={(updated) => {
              const byId = new Map(updated.map((l) => [l.id, l]));
              setLeads((cur) => cur.map((l) => byId.get(l.id) ?? l));
            }}
          />

          <TraceTargets
            leads={expiredLeads}
            onUpdated={(updated) => {
              const byId = new Map(updated.map((l) => [l.id, l]));
              setLeads((cur) => cur.map((l) => byId.get(l.id) ?? l));
            }}
          />

          <DncScrubber onScrubbed={handleScrubbed} />
        </>
      )}

      <Filters
        state={filters}
        onChange={setFilters}
        sourceOptions={sourceOptions}
        propertyTypeOptions={propertyTypeOptions}
        visibleCount={visible.length}
        onAddLead={() => setShowAddPanel((v) => !v)}
        onExportCsv={exportCsv}
        showingAddPanel={showAddPanel}
      />

      {mutErr && (
        <div className="mb-4 px-4 py-2.5 rounded-lg border border-rust/40 bg-rust/[0.05] flex items-center gap-3 text-[13px] text-rust">
          <AlertCircle className="w-4 h-4 shrink-0" strokeWidth={1.75} />
          <span className="flex-1">{mutErr}</span>
          <button
            type="button"
            onClick={() => setMutErr(null)}
            className="text-rust/70 hover:text-rust transition-colors duration-200"
            aria-label="Dismiss error"
          >
            ×
          </button>
        </div>
      )}

      <LeadsTable
        leads={visible}
        loading={result.status === "loading"}
        totalCount={leads.length}
        selectedId={openLeadId}
        onSelect={selectLead}
        onCycleStatus={cycleStatus}
        onToggleScrubbed={toggleScrubbed}
      />

      {/* Drawer mounts when local openLeadId matches a known row. If
          it refers to an id we don't have locally (e.g. a stale
          bookmark for a deleted lead), the drawer stays closed and
          the URL param is harmless. */}
      {openLeadId &&
        (() => {
          const selectedLead = leads.find((l) => l.id === openLeadId);
          if (!selectedLead) return null;
          return (
            <LeadDrawer
              lead={selectedLead}
              onClose={() => selectLead(openLeadId)}
              onLocalUpdate={(p) =>
                setLeads((cur) =>
                  cur.map((l) =>
                    l.id === openLeadId ? { ...l, ...p } : l,
                  ),
                )
              }
              onDeleted={() => {
                setLeads((cur) => cur.filter((l) => l.id !== openLeadId));
                selectLead(openLeadId); // toggles drawer closed + cleans URL
              }}
            />
          );
        })()}
    </div>
  );
}
