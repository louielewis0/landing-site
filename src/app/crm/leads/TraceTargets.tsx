"use client";

import { useMemo, useState } from "react";
import { AlertCircle, Crosshair, PhoneOutgoing } from "lucide-react";
import { usePasscode } from "../gate";
import { apiFetch } from "../_lib/api-client";
import type { Lead } from "@/lib/lead-shape";

/**
 * Top targets — ranks every phone-less, still-alive lead by expected
 * value and lets the user pick which ones are worth spending a skip-
 * trace search on. Scoring is heuristic and fully client-side (parsed
 * from budget_range + the "· NN DOM ·" fragment the Matrix importer
 * writes into message):
 *
 *   • GCI potential — list price × 3%, but with a LUXURY PENALTY:
 *     score rises to ~$1.2M then falls off hard. Ultra-luxury expireds
 *     draw every agent in the county (lottery tickets, not pipeline).
 *   • Death speed — a listing that died in ≤3 weeks means a seller
 *     who expected fast results and is freshly frustrated. Low DOM
 *     scores HIGHER here (opposite of a buyer's read).
 *   • Recency — imported in the last 48h = the competition window.
 *   • Readiness — has a real owner name (traceable now).
 *
 * Leads still carrying the "Owner —" placeholder can't be traced
 * (Enrich matches on name + address) so their checkbox is disabled
 * with a "needs name" chip instead of failing server-side.
 *
 * Batch trace runs sequentially (one search each, cap enforced
 * server-side); a 429 stops the run and surfaces the cap message.
 */

type Scored = {
  lead: Lead;
  score: number;
  gci: number | null;
  reasons: string[];
  needsName: boolean;
};

function parsePriceOf(lead: Lead): number | null {
  const src = lead.budget_range ?? lead.message ?? "";
  const m = src.match(/\$\s?([\d,]+)/);
  if (!m) return null;
  const n = parseInt(m[1].replace(/,/g, ""), 10);
  return Number.isFinite(n) && n > 10_000 ? n : null;
}

function parseDomOf(lead: Lead): number | null {
  const m = (lead.message ?? "").match(/(\d+)\s*DOM/i);
  return m ? parseInt(m[1], 10) : null;
}

function scoreLead(lead: Lead): Scored {
  const price = parsePriceOf(lead);
  const dom = parseDomOf(lead);
  const needsName = !lead.name || lead.name.startsWith("Owner —");
  const reasons: string[] = [];
  let score = 0;

  const gci = price !== null ? Math.round(price * 0.03) : null;
  if (price !== null) {
    if (price > 2_500_000) {
      score += 20;
      reasons.push("luxury lottery — every agent is chasing it");
    } else if (price > 1_200_000) {
      score += 40;
      reasons.push(`~$${Math.round((gci ?? 0) / 1000)}K GCI · high-end, more competition`);
    } else {
      score += Math.round((price / 1_200_000) * 55);
      reasons.push(`~$${Math.round((gci ?? 0) / 1000)}K GCI potential`);
    }
  } else {
    score += 15;
    reasons.push("no list price on record");
  }

  if (dom !== null) {
    if (dom <= 21) {
      score += 25;
      reasons.push(`died in ${dom} days — seller freshly frustrated`);
    } else if (dom <= 45) {
      score += 18;
      reasons.push(`${dom} DOM — gave up early`);
    } else if (dom <= 90) {
      score += 12;
      reasons.push(`${dom} DOM — likely priced wrong`);
    } else {
      score += 6;
      reasons.push(`${dom} DOM — long sit, needs a new story`);
    }
  } else {
    score += 8;
  }

  const ageMs = Date.now() - new Date(lead.created_at).getTime();
  if (ageMs < 48 * 3600 * 1000) {
    score += 8;
    reasons.push("fresh — competition window still open");
  }
  if (lead.priority === "hot") score += 6;
  if (!needsName) {
    score += 6;
  } else {
    reasons.push("needs name (Realist) before tracing");
  }

  return { lead, score: Math.min(100, score), gci, reasons, needsName };
}

export default function TraceTargets({
  leads,
  onUpdated,
}: {
  leads: Lead[];
  onUpdated: (updated: Lead[]) => void;
}) {
  const passcode = usePasscode();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);
  const [running, setRunning] = useState(false);
  const [rowMsg, setRowMsg] = useState<Record<string, string>>({});
  const [summary, setSummary] = useState<string | null>(null);

  const ranked = useMemo(() => {
    const candidates = leads.filter(
      (l) =>
        !l.phone &&
        l.status !== "dead" &&
        l.status !== "closed_lost" &&
        l.status !== "closed_won",
    );
    return candidates.map(scoreLead).sort((a, b) => b.score - a.score);
  }, [leads]);

  const visible = showAll ? ranked : ranked.slice(0, 12);

  function toggle(id: string) {
    setSelected((cur) => {
      const next = new Set(cur);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function traceSelected() {
    setRunning(true);
    setSummary(null);
    const ids = ranked.filter((r) => selected.has(r.lead.id)).map((r) => r.lead.id);
    let ok = 0;
    let failed = 0;
    for (const id of ids) {
      setRowMsg((m) => ({ ...m, [id]: "Tracing…" }));
      try {
        const data = await apiFetch<{ lead: Lead; used: number; cap: number }>(
          passcode,
          "/trace",
          { method: "POST", body: JSON.stringify({ leadId: id }) },
        );
        onUpdated([data.lead]);
        ok++;
        setRowMsg((m) => ({
          ...m,
          [id]: `✓ ${data.lead.phone ?? "traced"} · ${data.used}/${data.cap}`,
        }));
        setSelected((cur) => {
          const next = new Set(cur);
          next.delete(id);
          return next;
        });
      } catch (e) {
        failed++;
        const msg = e instanceof Error ? e.message : String(e);
        setRowMsg((m) => ({ ...m, [id]: msg }));
        if (msg.toLowerCase().includes("cap reached")) break;
      }
    }
    setSummary(`Done — ${ok} traced, ${failed} failed/skipped.`);
    setRunning(false);
  }

  if (!ranked.length) return null;

  const selectedCount = ranked.filter((r) => selected.has(r.lead.id)).length;

  return (
    <section className="rounded-2xl bg-white/[0.02] border border-white/10 p-7 mb-6">
      <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
        <div>
          <p className="crm-label text-[var(--gold-soft)] mb-2">Top targets</p>
          <h2 className="text-lg font-semibold text-[#f4f5f7] tracking-tight">
            Best leads without a phone number
          </h2>
          <p className="text-[13px] text-white/55 mt-2 font-light max-w-2xl">
            Ranked by commission potential × how fast the listing died ×
            freshness — with a penalty for luxury lottery tickets everyone
            chases. Tick the ones worth a skip-trace search, then trace them
            in one go. Greyed rows need a real owner name (Realist) first.
          </p>
        </div>
        <button
          onClick={traceSelected}
          disabled={running || selectedCount === 0}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-[#0A0B0F] font-semibold text-[13px] tracking-wide transition-all duration-500 disabled:opacity-50"
        >
          <PhoneOutgoing className="w-4 h-4" strokeWidth={1.75} />
          {running
            ? "Tracing…"
            : `Trace selected (${selectedCount} search${selectedCount === 1 ? "" : "es"})`}
        </button>
      </div>

      <ul className="divide-y divide-white/[0.06]">
        {visible.map(({ lead, score, reasons, needsName }) => (
          <li key={lead.id} className="py-3 flex items-start gap-4">
            <input
              type="checkbox"
              checked={selected.has(lead.id)}
              disabled={needsName || running}
              onChange={() => toggle(lead.id)}
              className="mt-1.5 h-4 w-4 accent-[var(--gold)] disabled:opacity-30 cursor-pointer"
              aria-label={`Select ${lead.name}`}
            />
            <div
              className={`w-11 h-11 rounded-xl border flex items-center justify-center text-[15px] font-semibold shrink-0 ${
                score >= 70
                  ? "border-[var(--gold)]/50 text-[var(--gold-soft)]"
                  : score >= 45
                    ? "border-white/20 text-white/80"
                    : "border-white/10 text-white/40"
              }`}
              title="Lead score (0–100)"
            >
              {score}
            </div>
            <div className={`flex-1 min-w-0 ${needsName ? "opacity-55" : ""}`}>
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-[14px] text-white/90 font-medium truncate">
                  {lead.name}
                </span>
                {lead.budget_range && (
                  <span className="text-[12.5px] text-[var(--gold-soft)]">
                    {lead.budget_range}
                  </span>
                )}
              </div>
              <p className="text-[12px] text-white/50 font-light truncate">
                {lead.address ?? "no address"}
              </p>
              <p className="text-[11.5px] text-white/45 font-light mt-0.5">
                {reasons.join(" · ")}
              </p>
              {rowMsg[lead.id] && (
                <p className="text-[11.5px] mt-1 font-light text-[var(--gold-soft)]">
                  {rowMsg[lead.id]}
                </p>
              )}
            </div>
            <Crosshair
              className="w-3.5 h-3.5 text-white/20 mt-2 shrink-0"
              strokeWidth={1.5}
            />
          </li>
        ))}
      </ul>

      {ranked.length > 12 && (
        <button
          onClick={() => setShowAll((v) => !v)}
          className="mt-3 text-[12px] text-white/45 hover:text-white/70 transition-colors tracking-wide"
        >
          {showAll ? "Show top 12 only" : `Show all ${ranked.length}`}
        </button>
      )}

      {summary && (
        <div className="mt-4 text-[13px] text-white/70 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[var(--gold-soft)]" strokeWidth={1.75} />
          {summary}
        </div>
      )}
    </section>
  );
}
