"use client";

import { useEffect, useState } from "react";
import { AlertCircle, RefreshCw, ListChecks, LayoutGrid } from "lucide-react";
import { useLeads } from "../_lib/use-leads";
import TodayQueue from "./TodayQueue";
import DailyVitals from "./DailyVitals";
import KpiGrid from "./KpiGrid";
import RecentLeads from "./RecentLeads";
import SourceBreakdown from "./SourceBreakdown";
import type { Lead } from "@/lib/lead-shape";

/**
 * CommandCenter — the /crm home. Dark-executive redesign of the old
 * TemplateDashboard. One client component owns the leads fetch and
 * renders:
 *
 *   1. A luxury serif header (greeting + date + new-lead count).
 *   2. An always-on KPI strip — four serif figures on a gold-edged
 *      bar for an at-a-glance read.
 *   3. A Focus / Overview toggle:
 *        • Focus    → TodayQueue, the prioritized "do this now" feed
 *                     (speed-to-lead first). The default.
 *        • Overview → the full analytics: 6-KPI grid + recent leads
 *                     + leads-by-source.
 *
 * The toggle choice is remembered per browser (localStorage), falling
 * back to Focus so the action list is what greets you by default.
 */

const GROTESK = "var(--font-grotesk), 'Space Grotesk', sans-serif";
const DAY = 86400000;
const ACTIVE = new Set([
  "new",
  "attempted",
  "contacted",
  "qualified",
  "showing",
  "negotiating",
]);

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function parseMoney(s: string | null): number {
  if (!s) return 0;
  const m = s.replace(/,/g, "").match(/\$?\s*(\d+(?:\.\d+)?)\s*([kKmM])?/);
  if (!m) return 0;
  let n = parseFloat(m[1]);
  if (m[2]?.toLowerCase() === "k") n *= 1e3;
  if (m[2]?.toLowerCase() === "m") n *= 1e6;
  if (!m[2] && n < 10000) n *= 1000; // "450" likely means $450k
  return n;
}

function fmtMoney(n: number): string {
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${Math.round(n / 1e3)}K`;
  return `$${n}`;
}

const isActive = (l: Lead) => l.is_active ?? ACTIVE.has(l.status);

type View = "focus" | "overview";

function Figure({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent?: boolean;
}) {
  return (
    <div style={{ padding: "4px 2px" }}>
      <div
        style={{
          fontFamily: GROTESK,
          fontSize: 10.5,
          fontWeight: 500,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--crm-ink-faint)",
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div
        className={accent ? "crm-figure crm-figure-gold" : "crm-figure"}
        style={{ fontSize: 42 }}
      >
        {value}
      </div>
    </div>
  );
}

export default function CommandCenter() {
  const result = useLeads();
  const [view, setView] = useState<View>("focus");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("crm-home-view");
      if (saved === "focus" || saved === "overview") setView(saved);
    } catch {
      /* private mode / blocked storage — Focus default is fine */
    }
  }, []);

  const choose = (v: View) => {
    setView(v);
    try {
      localStorage.setItem("crm-home-view", v);
    } catch {
      /* non-fatal */
    }
  };

  const leads = result.status === "ready" ? result.leads : [];

  const now = new Date();
  const dateLine = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const active = leads.filter(isActive);
  const newCount = leads.filter((l) => l.status === "new").length;
  const hot = leads.filter(
    (l) => l.is_hot_active ?? (l.priority === "hot" && isActive(l)),
  ).length;
  const closing = leads.filter(
    (l) => l.status === "showing" || l.status === "negotiating",
  ).length;
  const inPlay = active.reduce((s, l) => s + parseMoney(l.budget_range), 0);

  const ready = result.status === "ready";
  const dash = (v: string | number) => (ready ? v : "–");

  const subline =
    newCount > 0
      ? `${dateLine}  ·  ${newCount} new ${newCount === 1 ? "lead" : "leads"} waiting`
      : `${dateLine}  ·  no new leads waiting`;

  return (
    <div className="fade-up">
      {/* ── Header ───────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
          marginBottom: 24,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div className="crm-eyebrow" style={{ marginBottom: 10 }}>
            Command Center
          </div>
          <h1
            className="crm-display"
            style={{ margin: 0, fontSize: 46, fontWeight: 400, lineHeight: 1 }}
          >
            {greeting()},{" "}
            <span style={{ fontWeight: 600, fontStyle: "italic" }}>Louie.</span>
          </h1>
          <div
            style={{
              marginTop: 10,
              fontSize: 13,
              color: "var(--crm-ink-dim)",
            }}
          >
            {subline}
          </div>
        </div>

        {/* View toggle */}
        <div
          role="tablist"
          aria-label="Dashboard view"
          style={{
            display: "inline-flex",
            padding: 4,
            borderRadius: 999,
            gap: 2,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--crm-line)",
          }}
        >
          {(
            [
              { v: "focus", label: "Focus", Icon: ListChecks },
              { v: "overview", label: "Overview", Icon: LayoutGrid },
            ] as const
          ).map(({ v, label, Icon }) => {
            const on = view === v;
            return (
              <button
                key={v}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => choose(v)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "8px 16px",
                  borderRadius: 999,
                  fontFamily: GROTESK,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "none",
                  transition: "all 160ms ease",
                  background: on ? "var(--crm-gold-dim)" : "transparent",
                  color: on ? "var(--crm-ink)" : "var(--crm-ink-faint)",
                  boxShadow: on
                    ? "inset 0 0 0 1px rgba(200,162,76,0.3)"
                    : "none",
                }}
              >
                <Icon
                  className="w-3.5 h-3.5"
                  strokeWidth={1.75}
                  style={{ color: on ? "var(--crm-gold-soft)" : "inherit" }}
                />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── KPI strip (always on) ────────────────────────────── */}
      <div
        className="crm-glass-gold"
        style={{
          borderRadius: 20,
          padding: "4px 8px",
          marginBottom: 22,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        }}
      >
        {[
          { label: "New leads", value: dash(newCount), accent: newCount > 0 },
          { label: "In play", value: dash(fmtMoney(inPlay)) },
          { label: "Hot", value: dash(hot), accent: hot > 0 },
          { label: "Closing", value: dash(closing) },
        ].map((f, i) => (
          <div
            key={f.label}
            style={{
              padding: "18px 20px",
              borderLeft:
                i === 0 ? "none" : "1px solid rgba(200,162,76,0.14)",
            }}
          >
            <Figure label={f.label} value={f.value} accent={f.accent} />
          </div>
        ))}
      </div>

      {/* ── Daily effort scoreboard ──────────────────────────── */}
      <DailyVitals />

      {/* ── Body: loading / error / view ─────────────────────── */}
      {result.status === "loading" && (
        <div className="space-y-6">
          <div className="crm-glass rounded-2xl h-[420px] animate-pulse" />
        </div>
      )}

      {result.status === "error" && (
        <div className="crm-glass rounded-2xl p-8 text-center !border-[#FB7185]/30">
          <div className="w-12 h-12 rounded-2xl border border-[#FB7185]/30 bg-[#FB7185]/10 flex items-center justify-center mx-auto mb-4 text-[#FB7185]">
            <AlertCircle className="w-5 h-5" strokeWidth={1.5} />
          </div>
          <p
            className="text-lg font-semibold mb-2"
            style={{ color: "var(--crm-ink)" }}
          >
            Couldn&apos;t load leads.
          </p>
          <p
            className="text-[14px] mb-6"
            style={{ color: "var(--crm-ink-dim)" }}
          >
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
      )}

      {result.status === "ready" &&
        (view === "focus" ? (
          <TodayQueue leads={leads} />
        ) : (
          <div className="space-y-6">
            <KpiGrid leads={leads} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentLeads leads={leads} />
              <SourceBreakdown leads={leads} />
            </div>
          </div>
        ))}
    </div>
  );
}
