import type { Priority } from "@/lib/lead-shape";

/**
 * Small dot indicating a lead's priority, sized to sit next to a
 * name on a row or card. Used by the Kanban cards (2C), the
 * leads table (2D), and the lead-detail header (2E) so the
 * hot/warm/cold rank is scannable at a glance.
 *
 * Color encoding uses the CRM design system's semantic accents
 * (rose / amber / sky) so temperature reads instantly. "Hot" gets
 * a faint outer halo so it stands out at row-scan speed.
 */
/* Semantic temperature colors (CRM design system): hot reads as
   urgent at a glance instead of blending into the gold accents. */
const STYLES: Record<Priority, string> = {
  hot:  "bg-[#FB7185] shadow-[0_0_0_3px_rgba(251,113,133,0.2)]",
  warm: "bg-[#FBBF24]",
  cold: "bg-[#38BDF8]/60",
};

export default function PriorityDot({ priority }: { priority: Priority }) {
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full shrink-0 ${STYLES[priority]}`}
      aria-label={`Priority ${priority}`}
    />
  );
}
