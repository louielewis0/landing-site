"use client";

import { useEffect, useState } from "react";
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { AlertCircle, RefreshCw, X } from "lucide-react";
import Column from "./Column";
import { useLeads } from "../_lib/use-leads";
import { useUpdateLeadStatus } from "../_lib/use-update-lead-status";
import { PIPELINE_STAGES } from "@/lib/pipeline-stages";
import type { Lead, PipelineStage } from "@/lib/lead-shape";

/**
 * Kanban board client. Owns:
 *   • a local mirror of the leads array (so drag-drops feel
 *     instant via optimistic update)
 *   • the DnDContext that wires draggable cards to droppable
 *     columns
 *   • the PATCH dispatcher that persists status changes
 *
 * Flow on drop:
 *   1. find the lead and the target stage's canonical status
 *   2. apply an optimistic update locally (status, pipeline_stage,
 *      and the active/hot flags that depend on status — so the
 *      Flame/Clock card icons update without waiting for refetch)
 *   3. PATCH /api/dashboard/leads/[id] with the new status
 *   4. on success, merge the server's fresh updated_at + status
 *      into the optimistic row
 *   5. on error, roll back to the pre-drop snapshot and surface
 *      an inline error banner above the board
 *
 * Same-column drop (where lead.pipeline_stage === target.stage)
 * is a no-op — no API call, no flash.
 *
 * `touch-none` on the cards (set in KanbanCard) lets dnd-kit
 * intercept touch events instead of the browser handling them
 * as scroll. Pointer sensor activation distance (6px) prevents
 * a quick click from being read as a drag.
 */
export default function PipelineClient() {
  const result = useLeads();
  const updater = useUpdateLeadStatus();

  // Local mirror seeded from useLeads and re-seeded whenever the
  // upstream array changes (e.g. after a manual reload).
  const [leads, setLeads] = useState<Lead[]>([]);
  useEffect(() => {
    if (result.status === "ready") setLeads(result.leads);
  }, [result]);

  const [error, setError] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const leadId = String(active.id);
    const targetStage = String(over.id) as PipelineStage;

    const stageDef = PIPELINE_STAGES.find((s) => s.stage === targetStage);
    if (!stageDef) return;

    const lead = leads.find((l) => l.id === leadId);
    if (!lead || lead.pipeline_stage === targetStage) return;

    const previous = lead;
    const optimistic: Lead = {
      ...lead,
      status: stageDef.targetStatus,
      pipeline_stage: stageDef.stage,
      canonical_status: stageDef.targetStatus,
      is_active: !stageDef.isTerminal,
      is_hot_active: lead.priority === "hot" && !stageDef.isTerminal,
      is_overdue_followup:
        lead.is_overdue_followup === true && !stageDef.isTerminal,
    };
    setLeads((prev) => prev.map((l) => (l.id === leadId ? optimistic : l)));
    setError(null);

    updater
      .mutate(leadId, stageDef.targetStatus)
      .then((serverLead) => {
        setLeads((prev) =>
          prev.map((l) =>
            l.id === leadId
              ? {
                  ...optimistic,
                  status: serverLead.status,
                  updated_at: serverLead.updated_at,
                }
              : l,
          ),
        );
      })
      .catch((e: unknown) => {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? previous : l)),
        );
        setError(e instanceof Error ? e.message : String(e));
      });
  }

  if (result.status === "loading") {
    return (
      <div className="flex gap-3 overflow-x-auto pb-4">
        {PIPELINE_STAGES.map((s) => (
          <div
            key={s.stage}
            className="w-[280px] h-[440px] shrink-0 rounded-2xl border border-bone/10 bg-bone/[0.02] animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (result.status === "error") {
    return (
      <div className="rounded-2xl border border-rust/40 bg-rust/[0.05] p-8 text-center">
        <div className="w-12 h-12 rounded-full border border-rust/40 bg-rust/10 flex items-center justify-center mx-auto mb-4 text-rust">
          <AlertCircle className="w-5 h-5" strokeWidth={1.5} />
        </div>
        <p className="font-display text-2xl font-light text-bone mb-2">
          Couldn&apos;t load pipeline.
        </p>
        <p className="text-bone/55 text-[14px] mb-6 font-light">
          {result.error}
        </p>
        <button
          type="button"
          onClick={result.reload}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink text-[13px] font-semibold tracking-wide transition-all duration-400"
        >
          <RefreshCw className="w-4 h-4" strokeWidth={2} />
          Retry
        </button>
      </div>
    );
  }

  // Bucket leads by their (view-computed) pipeline_stage.
  const buckets = new Map<PipelineStage, Lead[]>();
  for (const stage of PIPELINE_STAGES) buckets.set(stage.stage, []);
  for (const lead of leads) {
    const s = lead.pipeline_stage;
    if (s && buckets.has(s)) buckets.get(s)!.push(lead);
  }

  return (
    <div>
      {error && (
        <div className="mb-4 px-4 py-2.5 rounded-lg border border-rust/40 bg-rust/[0.05] flex items-center gap-3 text-[13px] text-rust">
          <AlertCircle className="w-4 h-4 shrink-0" strokeWidth={1.75} />
          <span className="flex-1">
            Couldn&apos;t move lead: {error}
          </span>
          <button
            type="button"
            onClick={() => setError(null)}
            className="text-rust/70 hover:text-rust transition-colors duration-200"
            aria-label="Dismiss error"
          >
            <X className="w-3.5 h-3.5" strokeWidth={2} />
          </button>
        </div>
      )}
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="flex gap-3 overflow-x-auto pb-4">
          {PIPELINE_STAGES.map((s) => (
            <Column
              key={s.stage}
              stage={s.stage}
              label={s.label}
              description={s.description}
              isTerminal={s.isTerminal}
              leads={buckets.get(s.stage) ?? []}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}
