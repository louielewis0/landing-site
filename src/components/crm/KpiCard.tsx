/**
 * KPI tile for the overview surface (Phase 2B). Glass card on
 * the cinematic backdrop — bone/[0.03] fill, bone/10 border,
 * generous padding, large display number, optional delta line
 * and lead icon.
 *
 * `emphasis="highlight"` swaps the panel to a gold-tinted variant
 * for the surface's most-important metric (e.g. Hot Leads,
 * Overdue Follow-ups) so a scanner can find the anchor at a
 * glance. Idle cards stay bone-tinted.
 *
 * Icon is taken as a pre-rendered JSX node (not a component
 * reference) so the card composes cleanly across server and
 * client component boundaries — same pattern as NavLink. Lucide
 * SVGs use `currentColor` for stroke, so the icon color
 * inherits from the wrapper span's text-* class.
 */
export default function KpiCard({
  label,
  value,
  delta,
  icon,
  emphasis = "default",
}: {
  label: string;
  value: string | number;
  delta?: string;
  icon?: React.ReactNode;
  emphasis?: "default" | "highlight";
}) {
  return (
    <div
      className={`rounded-2xl border p-6 backdrop-blur-xl transition-colors duration-300 ${
        emphasis === "highlight"
          ? "bg-[var(--gold)]/[0.06] border-[var(--gold)]/30 hover:bg-[var(--gold)]/[0.10]"
          : "bg-bone/[0.03] border-bone/10 hover:bg-bone/[0.05]"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-[11px] tracking-[0.24em] uppercase text-bone/45">
          {label}
        </p>
        {icon && (
          <span
            className={
              emphasis === "highlight"
                ? "text-[var(--gold-soft)]"
                : "text-bone/35"
            }
          >
            {icon}
          </span>
        )}
      </div>
      <p className="font-display text-4xl font-light text-bone tracking-tight">
        {value}
      </p>
      {delta && (
        <p
          className={`mt-2 text-[12px] ${
            emphasis === "highlight"
              ? "text-[var(--gold-soft)]"
              : "text-bone/55"
          }`}
        >
          {delta}
        </p>
      )}
    </div>
  );
}
