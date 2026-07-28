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

  // Stage value: sum of parseable budget_range figures. Real
  // brokerage boards show dollars per column — count alone hides
  // that one $800k lead outweighs five $150k ones.
  const stageValue = leads.reduce((sum, l) => {
    const m = (l.budget_range ?? "").match(/\$?\s?([\d,]+)/);
    if (!m) return sum;
    const n = parseInt(m[1].replace(/,/g, ""), 10);
    return Number.isFinite(n) && n > 10_000 ? sum + n : sum;
  }, 0);
  const valueLabel =
    stageValue >= 1_000_000
      ? `$${(stageValue / 1_000_000).toFixed(1)}M`
      : stageValue >= 1_000
        ? `$${Math.round(stageValue / 1_000)}K`
        : null;

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col w-[280px] shrink-0 rounded-2xl border backdrop-blur-xl transition-all duration-150 ${
        isOver
          ? "border-[var(--gold)]/50 bg-[var(--gold)]/[0.07] shadow-[0_0_0_3px_rgba(200,162,76,0.12)]"
          : isTerminal
            ? "border-white/[0.05] bg-white/[0.015]"
            : "border-white/[0.09] bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
      }`}
    >
      <header className="px-4 py-3 border-b border-white/[0.06]">
        <div className="flex items-baseline justify-between mb-0.5">
          <p
            className={`crm-label ${
              isTerminal ? "!text-white/35" : "!text-[var(--gold-soft)]"
            }`}
          >
            {label}
          </p>
          <span className="text-[12px] text-white/85 crm-num">
            {leads.length}
            {valueLabel && (
              <span className="text-white/45 ml-1.5">· {valueLabel}</span>
            )}
          </span>
        </div>
        <p className="text-[11px] text-white/40">{description}</p>
      </header>
      <div className="flex-1 p-3 space-y-2 overflow-y-auto min-h-[120px] max-h-[calc(100vh-280px)]">
        {leads.length === 0 ? (
          <p className="text-center text-[11px] text-white/25 py-6 tracking-wide">
            drop leads here
          </p>
        ) : (
          // Self-prioritizing column: soonest next-activity first,
          // overdue on top, nothing-scheduled last (Pipedrive sort).
          [...leads]
            .sort((a, b) =>
              (a.follow_up_date ?? "9999-12-31").localeCompare(
                b.follow_up_date ?? "9999-12-31",
              ),
            )
            .map((lead) => (
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
