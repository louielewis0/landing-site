import { Zap, TrendingUp, DollarSign, Flame, Clock, Landmark } from "lucide-react";
import KpiCard from "@/components/crm/KpiCard";
import type { Lead } from "@/lib/lead-shape";

/**
 * Six-card KPI grid for the overview surface. All counts derive
 * from the leads list — five via the leads_v view flags
 * (is_active, is_hot_active, is_overdue_followup) and the rest
 * via straight client-side filters on the same array.
 *
 * Layout: 1 col mobile → 2 col tablet → 3 col laptop → 6 col on
 * very wide screens. The two action-item KPIs (Hot Leads and
 * Overdue Follow-ups) wear emphasis="highlight" so they stand out
 * as the rows that need a human response.
 *
 * "Closed Won" is rendered as a count, not a dollar amount —
 * the Lead model doesn't carry a deal_value field yet. Adding
 * one is a future enhancement; surfacing a fabricated value
 * here would be worse than naming the limitation honestly.
 */
export default function KpiGrid({ leads }: { leads: Lead[] }) {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const newThisWeek = leads.filter(
    (l) => new Date(l.created_at) >= sevenDaysAgo
  ).length;
  const uncontactedInbound = leads.filter(
    (l) =>
      l.status === "new" &&
      (l.source ?? "").trim().toLowerCase() !== "expired",
  ).length;
  const active = leads.filter((l) => l.is_active === true).length;
  const hot = leads.filter((l) => l.is_hot_active === true).length;
  const overdue = leads.filter((l) => l.is_overdue_followup === true).length;

  // Pipeline dollars: sum of parseable budget_range over the active
  // pipeline. Est. GCI at 3% — leading indicator of revenue, which
  // beats raw lead counts (total-lead count is the canonical vanity
  // metric for a small brokerage).
  const pipelineValue = leads.reduce((sum, l) => {
    if (l.is_active !== true) return sum;
    const m = (l.budget_range ?? "").match(/\$?\s?([\d,]+)/);
    if (!m) return sum;
    const n = parseInt(m[1].replace(/,/g, ""), 10);
    return Number.isFinite(n) && n > 10_000 ? sum + n : sum;
  }, 0);
  const estGci = Math.round(pipelineValue * 0.03);
  const money = (n: number) =>
    n >= 1_000_000
      ? `$${(n / 1_000_000).toFixed(1)}M`
      : n >= 1_000
        ? `$${Math.round(n / 1_000)}K`
        : `$${n}`;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <KpiCard
        label="Respond Now"
        value={uncontactedInbound}
        delta={uncontactedInbound > 0 ? "uncontacted inbound" : "inbox clear"}
        icon={<Zap className="w-4 h-4" strokeWidth={1.5} />}
        emphasis={uncontactedInbound > 0 ? "highlight" : "default"}
      />
      <KpiCard
        label="New This Week"
        value={newThisWeek}
        delta={newThisWeek > 0 ? "last 7 days" : "—"}
        icon={<TrendingUp className="w-4 h-4" strokeWidth={1.5} />}
      />
      <KpiCard
        label="Hot Leads"
        value={hot}
        delta={active > 0 ? `of ${active} active` : undefined}
        icon={<Flame className="w-4 h-4" strokeWidth={1.5} />}
        emphasis="highlight"
      />
      <KpiCard
        label="Overdue Follow-ups"
        value={overdue}
        delta={overdue > 0 ? "needs response" : "all clear"}
        icon={<Clock className="w-4 h-4" strokeWidth={1.5} />}
        emphasis={overdue > 0 ? "highlight" : "default"}
      />
      <KpiCard
        label="Pipeline Value"
        value={money(pipelineValue)}
        delta={`${active} active lead${active === 1 ? "" : "s"}`}
        icon={<DollarSign className="w-4 h-4" strokeWidth={1.5} />}
      />
      <KpiCard
        label="Est. GCI in Play"
        value={money(estGci)}
        delta="at 3% listing side"
        icon={<Landmark className="w-4 h-4" strokeWidth={1.5} />}
      />
    </section>
  );
}
