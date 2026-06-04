"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Flame, Clock } from "lucide-react";
import StatusPill from "@/components/crm/StatusPill";
import PriorityDot from "@/components/crm/PriorityDot";
import { relativeTime } from "../_lib/relative-time";
import type { Lead } from "@/lib/lead-shape";

/**
 * Draggable Kanban card.
 *
 * Card content per Phase 2 brief: name, priority, source,
 * property type, last activity, status pill. "Last activity" is
 * leads.updated_at (or created_at as fallback) — once the
 * activities table has routes in 2E, the most-recent touch
 * timestamp could replace this, but for 2C updated_at is the
 * right proxy and surfaces stage-transition timing for free.
 *
 * Drag affordances:
 *   • Cursor: grab → grabbing
 *   • While dragging: lower opacity + gold border tint
 *   • Pointer activation requires 6px of movement (configured at
 *     the DndContext level in PipelineClient) so a click doesn't
 *     misfire as a drag
 */
export default function KanbanCard({ lead }: { lead: Lead }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: lead.id });

  const style: React.CSSProperties = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    opacity: isDragging ? 0.6 : 1,
  };

  const lastActivity = lead.updated_at ?? lead.created_at;

  const meta = [lead.source, lead.property_type, lead.transaction_type]
    .filter((v): v is string => Boolean(v))
    .join(" · ");

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`rounded-xl border p-3 backdrop-blur-xl cursor-grab active:cursor-grabbing select-none transition-colors duration-150 touch-none ${
        isDragging
          ? "border-[var(--gold)]/50 bg-[var(--gold)]/[0.08] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]"
          : "border-bone/10 bg-ink-3/70 hover:border-bone/20 hover:bg-ink-3/85"
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <PriorityDot priority={lead.priority} />
        <p className="text-[13px] text-bone font-medium truncate flex-1">
          {lead.name}
        </p>
        {lead.is_hot_active && (
          <Flame
            className="w-3 h-3 text-[var(--gold-soft)] shrink-0"
            strokeWidth={2}
          />
        )}
        {lead.is_overdue_followup && (
          <Clock
            className="w-3 h-3 text-[var(--gold-deep)] shrink-0"
            strokeWidth={2}
          />
        )}
      </div>
      {meta && (
        <p className="text-[11px] text-bone/45 mb-2 truncate">{meta}</p>
      )}
      <div className="flex items-center justify-between gap-2">
        <StatusPill status={lead.status} />
        <span className="text-[10px] text-bone/35 tabular-nums whitespace-nowrap">
          {relativeTime(lastActivity)}
        </span>
      </div>
    </div>
  );
}
