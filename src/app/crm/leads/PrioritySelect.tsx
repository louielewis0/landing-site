"use client";

import type { Priority } from "@/lib/lead-shape";

/**
 * Priority 3-button toggle. Brand colors only: gold-soft (hot)
 * → gold (warm) → bone faded (cold), matching the PriorityDot
 * primitive used in tables and cards.
 *
 * The full set is always visible so the user can read the
 * current state and tap to change in one motion — no menu, no
 * select, no double-click.
 */
const PRIORITY_OPTIONS: Priority[] = ["hot", "warm", "cold"];

const ACTIVE_STYLES: Record<Priority, string> = {
  hot: "bg-[var(--gold-soft)]/20 text-[var(--gold-soft)] border-[var(--gold-soft)]/55",
  warm: "bg-[var(--gold)]/15 text-[var(--gold)] border-[var(--gold)]/45",
  cold: "bg-bone/[0.08] text-bone/85 border-bone/25",
};

export default function PrioritySelect({
  value,
  onChange,
}: {
  value: Priority;
  onChange: (next: Priority) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {PRIORITY_OPTIONS.map((p) => {
        const isActive = value === p;
        return (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className={`py-2 text-[10.5px] font-semibold tracking-[0.18em] uppercase rounded-lg border transition-all duration-200 ${
              isActive
                ? ACTIVE_STYLES[p]
                : "bg-bone/[0.02] text-bone/45 border-bone/10 hover:border-bone/25 hover:text-bone/70"
            }`}
          >
            {p}
          </button>
        );
      })}
    </div>
  );
}
