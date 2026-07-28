"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { useLeads } from "../_lib/use-leads";
import KpiGrid from "./KpiGrid";
import TodayQueue from "./TodayQueue";
import RecentLeads from "./RecentLeads";
import SourceBreakdown from "./SourceBreakdown";

/**
 * The /crm overview surface. Single client component that owns
 * the leads fetch (via useLeads → /api/dashboard/leads → leads_v)
 * and passes the resulting array down to four server-style
 * widgets that derive their own slices.
 *
 * Loading: 6 KPI skeleton cards + 2 panel skeletons + 1 chart
 * skeleton. Same total area as the loaded layout so there's no
 * paint shift.
 *
 * Error: tight error panel with reload affordance. The most
 * common failure mode is a transient network hiccup; manual
 * reload covers it without forcing a hard refresh that would
 * also drop the in-memory passcode.
 */
export default function OverviewClient() {
  const result = useLeads();

  if (result.status === "loading") {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 h-[140px] animate-pulse"
            />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] h-[440px] animate-pulse" />
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] h-[440px] animate-pulse" />
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] h-[360px] animate-pulse" />
      </div>
    );
  }

  if (result.status === "error") {
    return (
      <div className="crm-glass !border-[#FB7185]/30 rounded-2xl p-8 text-center">
        <div className="w-12 h-12 rounded-2xl border border-[#FB7185]/30 bg-[#FB7185]/10 flex items-center justify-center mx-auto mb-4 text-[#FB7185]">
          <AlertCircle className="w-5 h-5" strokeWidth={1.5} />
        </div>
        <p className="text-lg font-semibold text-[#f4f5f7] mb-2">
          Couldn&apos;t load leads.
        </p>
        <p className="text-white/55 text-[14px] mb-6">
          {result.error}
        </p>
        <button
          type="button"
          onClick={result.reload}
          className="crm-btn crm-btn-primary"
        >
          <RefreshCw className="w-4 h-4" strokeWidth={2} />
          Retry
        </button>
      </div>
    );
  }

  const leads = result.leads;

  return (
    <div className="space-y-6">
      <KpiGrid leads={leads} />

      <TodayQueue leads={leads} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentLeads leads={leads} />
        <SourceBreakdown leads={leads} />
      </div>
    </div>
  );
}
