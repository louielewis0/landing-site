"use client";

import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Flame, Clock, Trash2 } from "lucide-react";
import StatusPill from "@/components/crm/StatusPill";
import PriorityDot from "@/components/crm/PriorityDot";
import { relativeTime } from "../_lib/relative-time";
import type { Lead } from "@/lib/lead-shape";

/**
 * Draggable Kanban card.
 *
 * Card content per Phase 2 brief: name, priority, source, property
 * type, last activity, status pill. "Last activity" is leads.updated_at
 * (or created_at as fallback).
 *
 * Delete affordance (new): hover-revealed trash icon top-right that
 * doesn't compete with the drag handle. Two-tap confirmation directly
 * inside the card — first tap morphs the body into a "Delete this lead?
 * Permanent." prompt with two buttons. No global modal, no router push,
 * stays inside the card so the rest of the board doesn't blink.
 *
 * Drag affordances:
 *   • Cursor: grab → grabbing
 *   • While dragging: lower opacity + gold border tint
 *   • Pointer activation requires 6px of movement (configured at the
 *     DndContext level in PipelineClient) so a click doesn't misfire
 *     as a drag
 *
 * When the confirm prompt is open the dnd-kit listeners are NOT spread
 * onto the card root — clicks on Yes/Cancel would otherwise be
 * intercepted as drag-starts and the buttons would feel mushy.
 */
export default function KanbanCard({
  lead,
  onDelete,
  deleting,
}: {
  lead: Lead;
  onDelete: (leadId: string) => void;
  deleting: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: lead.id });
  const [confirming, setConfirming] = useState(false);

  const style: React.CSSProperties = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    opacity: isDragging ? 0.6 : 1,
  };

  const lastActivity = lead.updated_at ?? lead.created_at;

  const meta = [lead.source, lead.property_type, lead.transaction_type]
    .filter((v): v is string => Boolean(v))
    .join(" · ");

  // Next-activity chip (Pipedrive pattern): every card answers
  // "what's next and when" at a glance. Red = overdue, gold = due
  // today, grey = scheduled, dashed hollow = nothing scheduled (the
  // silent pipeline-killer state).
  const today = new Date().toISOString().slice(0, 10);
  const fu = lead.follow_up_date;
  const isTerminalCard =
    lead.status === "closed_won" ||
    lead.status === "closed_lost" ||
    lead.status === "dead";
  let nextChip: { text: string; cls: string } | null = null;
  if (!isTerminalCard) {
    if (fu && fu < today) {
      nextChip = {
        text: `overdue · ${new Date(fu + "T12:00:00").toLocaleDateString(undefined, { month: "short", day: "numeric" })}`,
        cls: "border-rust/50 bg-rust/[0.1] text-rust",
      };
    } else if (fu === today) {
      nextChip = {
        text: "due today",
        cls: "border-[var(--gold)]/50 bg-[var(--gold)]/[0.08] text-[var(--gold-soft)]",
      };
    } else if (fu) {
      nextChip = {
        text: `next · ${new Date(fu + "T12:00:00").toLocaleDateString(undefined, { month: "short", day: "numeric" })}`,
        cls: "border-bone/15 text-bone/50",
      };
    } else {
      nextChip = {
        text: "no next step",
        cls: "border-dashed border-bone/25 text-bone/40",
      };
    }
  }

  // While confirming we deliberately omit listeners/attributes so the
  // confirmation buttons receive clicks normally.
  const interactive = !confirming;

  function startConfirm(e: React.PointerEvent | React.MouseEvent) {
    e.stopPropagation();
    setConfirming(true);
  }

  function cancelConfirm(e: React.PointerEvent | React.MouseEvent) {
    e.stopPropagation();
    setConfirming(false);
  }

  function confirmDelete(e: React.PointerEvent | React.MouseEvent) {
    e.stopPropagation();
    onDelete(lead.id);
    // Don't reset confirming — the parent removes the card from the
    // board on success, so the component unmounts. If the delete
    // fails the parent restores the lead and the user can re-open the
    // confirm.
  }

  if (confirming) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="rounded-xl border border-rust/40 bg-rust/[0.07] p-3 backdrop-blur-xl select-none"
      >
        <p className="text-[12.5px] text-bone font-medium mb-1.5">
          Delete this lead?
        </p>
        <p className="text-[11px] text-bone/55 mb-3">
          Permanent. Activities cascade.
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={confirmDelete}
            onPointerDown={(e) => e.stopPropagation()}
            disabled={deleting}
            className="flex-1 px-2.5 py-1.5 rounded-md bg-rust hover:bg-rust/80 text-white text-[11.5px] font-semibold tracking-wide transition-colors disabled:opacity-60"
          >
            {deleting ? "Deleting…" : "Yes, delete"}
          </button>
          <button
            type="button"
            onClick={cancelConfirm}
            onPointerDown={(e) => e.stopPropagation()}
            disabled={deleting}
            className="px-2.5 py-1.5 rounded-md border border-bone/20 text-bone/75 hover:text-bone hover:border-bone/35 text-[11.5px] font-medium transition-colors disabled:opacity-60"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(interactive ? listeners : {})}
      {...(interactive ? attributes : {})}
      className={`group relative rounded-xl border p-3 backdrop-blur-xl cursor-grab active:cursor-grabbing select-none transition-colors duration-150 touch-none ${
        isDragging
          ? "border-[var(--gold)]/50 bg-[var(--gold)]/[0.08] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]"
          : "border-bone/10 bg-ink-3/70 hover:border-bone/20 hover:bg-ink-3/85"
      }`}
    >
      {/* Trash button — hidden until hover/focus, suppresses pointer-
          down to keep dnd-kit from interpreting the click as a drag. */}
      <button
        type="button"
        onClick={startConfirm}
        onPointerDown={(e) => e.stopPropagation()}
        aria-label="Delete lead"
        className="absolute top-1.5 right-1.5 p-1 rounded-md text-bone/35 hover:text-rust hover:bg-rust/10 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-200"
      >
        <Trash2 className="w-3 h-3" strokeWidth={2} />
      </button>

      <div className="flex items-center gap-2 mb-2 pr-5">
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
      {nextChip && (
        <div className="mt-2">
          <span
            className={`inline-block px-2 py-0.5 rounded-md border text-[10px] tracking-wide ${nextChip.cls}`}
          >
            {nextChip.text}
          </span>
        </div>
      )}

    </div>
  );
}
