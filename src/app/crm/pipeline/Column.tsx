"use client";

import { useDroppable } from "@dnd-kit/core";
import KanbanCard from "./KanbanCard";
import type { Lead, PipelineStage } from "@/lib/lead-shape";

/**
 * One column of the Kanban board. The whole column body is the
 * droppable target, so a card can be dropped on any empty space
 * inside it (not just on the existing cards).
 *
 * Visual states:
 *   • idle (active stage)   — bone/[0.02] bg, bone/10 border
 *   • idle (terminal stage) — bone/[0.01] bg, dimmed border —
 *                              draws the eye to active stages
 *   • drop hover            — gold tint on bg + border so the
 *                              user sees where they're landing
 *
 * Empty body shows a faint "drop leads here" hint so the column
 * doesn't read as broken when there's nothing in it.
 *
 * Column has an internal scroll (max-height capped) so a column
 * with 30 cards doesn't push the row's height taller than the
 * viewport.
 */
export default function Column({
  stage,
  label,
  description,
  isTerminal,
  leads,
  onDelete,
  deletingLeadId,
}: {
  stage: PipelineStage;
  label: string;
  description: string;
  isTerminal: boolean;
  leads: Lead[];
  onDelete: (leadId: string) => void;
  deletingLeadId: string | null;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: stage });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col w-[280px] shrink-0 rounded-2xl border backdrop-blur-xl transition-colors duration-200 ${
        isOver
          ? "border-[var(--gold)]/45 bg-[var(--gold)]/[0.06]"
          : isTerminal
            ? "border-bone/[0.06] bg-bone/[0.01]"
            : "border-bone/10 bg-bone/[0.02]"
      }`}
    >
      <header className="px-4 py-3 border-b border-bone/[0.06]">
        <div className="flex items-baseline justify-between mb-0.5">
          <p
            className={`text-[11px] tracking-[0.24em] uppercase ${
              isTerminal ? "text-bone/35" : "text-[var(--gold-soft)]"
            }`}
          >
            {label}
          </p>
          <span className="text-[12px] text-bone tabular-nums">
            {leads.length}
          </span>
        </div>
        <p className="text-[11px] text-bone/40 font-light">{description}</p>
      </header>
      <div className="flex-1 p-3 space-y-2 overflow-y-auto min-h-[120px] max-h-[calc(100vh-280px)]">
        {leads.length === 0 ? (
          <p className="text-center text-[11px] text-bone/25 py-6 tracking-wide">
            drop leads here
          </p>
        ) : (
          leads.map((lead) => (
            <KanbanCard
              key={lead.id}
              lead={lead}
              onDelete={onDelete}
              deleting={deletingLeadId === lead.id}
            />
          ))
        )}
      </div>
    </div>
  );
}
