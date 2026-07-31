/**
 * KPI tile for the overview surface (Phase 2B). Frosted-glass card
 * on the CRM mesh backdrop — crm-glass fill, generous padding,
 * large tabular-nums numeral, optional delta line and lead icon.
 *
 * `emphasis="highlight"` swaps the panel to a gold-tinted variant
 * for the surface's most-important metric (e.g. Hot Leads,
 * Overdue Follow-ups) so a scanner can find the anchor at a
 * glance. Idle cards stay neutral glass.
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
      className={`crm-glass rounded-2xl p-5 sm:p-6 transition-all duration-150 hover:-translate-y-0.5 ${
        emphasis === "highlight"
          ? "!bg-[linear-gradient(135deg,rgba(200,162,76,0.12),rgba(167,139,250,0.05))] !border-[var(--gold)]/30"
          : "hover:!bg-white/[0.06]"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="crm-label">{label}</p>
        {icon && (
          <span
            className={
              emphasis === "highlight"
                ? "text-[var(--gold-soft)]"
                : "text-white/35"
            }
          >
            {icon}
          </span>
        )}
      </div>
      <p className="crm-num text-3xl font-semibold text-[#191a1c]">
        {value}
      </p>
      {delta && (
        <p
          className={`mt-2 text-[12px] ${
            emphasis === "highlight"
              ? "text-[var(--gold-soft)]"
              : "text-white/55"
          }`}
        >
          {delta}
        </p>
      )}
    </div>
  );
}
