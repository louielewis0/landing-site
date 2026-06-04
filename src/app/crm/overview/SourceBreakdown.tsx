import type { Lead } from "@/lib/lead-shape";

/**
 * Leads-by-source horizontal bar list. Native SVG-free
 * implementation — each bar is a positioned div with a width
 * proportional to its count relative to the largest source.
 * Native HTML keeps the bundle lean (no chart lib dep) and lets
 * each row reuse the same hover and color treatment as the rest
 * of the CRM surfaces.
 *
 * Bars use the gold deep → gold soft gradient. Sources are
 * sorted by count desc, top 8 shown. An "Other" row aggregates
 * anything past the visible cut so the percentages still add up.
 *
 * `source` is free text per the Phase 1A SQL (no CHECK
 * constraint) — values like "hero", "leads-page", "FSBO",
 * "Expired" coexist. We surface them as-is rather than trying
 * to canonicalize, since the legacy /dashboard CSV export
 * relies on the raw value.
 */
export default function SourceBreakdown({ leads }: { leads: Lead[] }) {
  const counts = new Map<string, number>();
  for (const lead of leads) {
    const src = (lead.source ?? "").trim() || "unknown";
    counts.set(src, (counts.get(src) ?? 0) + 1);
  }

  const sorted = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  const visible = sorted.slice(0, 8);
  const rest = sorted.slice(8);
  const restTotal = rest.reduce((sum, [, n]) => sum + n, 0);
  if (restTotal > 0) visible.push(["other", restTotal]);

  const total = leads.length;
  const max = visible.length > 0 ? visible[0][1] : 1;

  return (
    <section className="rounded-2xl border border-bone/10 bg-bone/[0.02] backdrop-blur-xl overflow-hidden">
      <header className="flex items-center justify-between px-6 py-4 border-b border-bone/10">
        <div>
          <p className="eyebrow mb-1">Leads by Source</p>
          <p className="text-bone/55 text-[13px] font-light">
            where they came from
          </p>
        </div>
        <p className="text-[12px] text-bone/45 tracking-wide">
          {total} total
        </p>
      </header>

      {visible.length === 0 ? (
        <div className="px-6 py-10 text-center text-bone/45 text-[14px]">
          No source data yet.
        </div>
      ) : (
        <ul className="divide-y divide-bone/[0.06]">
          {visible.map(([source, count]) => {
            const pct = total > 0 ? Math.round((count / total) * 100) : 0;
            const barPct = max > 0 ? (count / max) * 100 : 0;
            return (
              <li
                key={source}
                className="flex items-center gap-4 px-6 py-3 hover:bg-bone/[0.02] transition-colors duration-200"
              >
                <span className="w-32 text-[13px] text-bone/65 truncate">
                  {source}
                </span>
                <div className="flex-1 h-2 bg-bone/[0.05] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--gold-deep)] to-[var(--gold-soft)]"
                    style={{ width: `${barPct}%` }}
                  />
                </div>
                <span className="w-10 text-right text-[13px] text-bone tabular-nums">
                  {count}
                </span>
                <span className="w-12 text-right text-[12px] text-bone/45 tabular-nums">
                  {pct}%
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
