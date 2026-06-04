import type { Priority } from "@/lib/lead-shape";

/**
 * Small dot indicating a lead's priority, sized to sit next to a
 * name on a row or card. Used by the Kanban cards (2C), the
 * leads table (2D), and the lead-detail header (2E) so the
 * hot/warm/cold rank is scannable at a glance.
 *
 * Color encoding stays inside the brand palette (gold-soft → gold
 * → bone faded) instead of borrowing red/yellow/green — the
 * marketing site's gold gradient is the brand and Phase 2 doesn't
 * introduce new hues. "Hot" gets a faint outer halo so it stands
 * out against "warm" without changing hue.
 */
const STYLES: Record<Priority, string> = {
  hot:  "bg-[var(--gold-soft)] shadow-[0_0_0_3px_rgba(217,185,104,0.18)]",
  warm: "bg-[var(--gold)]",
  cold: "bg-bone/30",
};

export default function PriorityDot({ priority }: { priority: Priority }) {
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full shrink-0 ${STYLES[priority]}`}
      aria-label={`Priority ${priority}`}
    />
  );
}
