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
import { useDeleteLead } from "../_lib/use-delete-lead";
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
  const deleter = useDeleteLead();

  // Local mirror seeded from useLeads and re-seeded only when the
  // upstream array actually changes — NOT on every render. Depending
  // on the whole `result` object would re-fire this effect every time
  // PipelineClient re-renders (useLeads returns a fresh object literal
  // each call), which would wipe any optimistic update from a drag
  // or delete the moment React committed it. Depending on the array
  // reference + the status flag means: on first ready, on reload, and
  // nowhere else.
  const [leads, setLeads] = useState<Lead[]>([]);
  useEffect(() => {
    if (result.status === "ready") setLeads(result.leads);
  }, [result.status, result.leads]);

  const [error, setError] = useState<string | null>(null);
  // Tracks which card is currently mid-delete so the confirmation
  // button can render a spinner state without us widening the deleter
  // hook to expose a multi-id pending map.
  const [deletingLeadId, setDeletingLeadId] = useState<string | null>(null);

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

  function handleDelete(leadId: string) {
    const previous = leads.find((l) => l.id === leadId);
    if (!previous) return;

    setDeletingLeadId(leadId);
    setError(null);
    // Optimistic remove — the card vanishes immediately so a slow
    // network doesn't leave the confirmation row stuck on "Deleting…"
    setLeads((prev) => prev.filter((l) => l.id !== leadId));

    deleter
      .mutate(leadId)
      .catch((e: unknown) => {
        // Restore the row in its original position. We don't know the
        // exact index from inside the setter, so push to the same
        // bucket's tail — close enough and the user can grab it back.
        setLeads((prev) => [...prev, previous]);
        setError(e instanceof Error ? e.message : String(e));
      })
      .finally(() => setDeletingLeadId(null));
  }

  if (result.status === "loading") {
    return (
      <div className="flex gap-3 overflow-x-auto pb-4">
        {PIPELINE_STAGES.map((s) => (
          <div
            key={s.stage}
            className="w-[280px] h-[440px] shrink-0 rounded-2xl border border-white/[0.08] bg-white/[0.03] animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (result.status === "error") {
    return (
      <div className="crm-glass !border-[#FB7185]/30 rounded-2xl p-8 text-center">
        <div className="w-12 h-12 rounded-2xl border border-[#FB7185]/30 bg-[#FB7185]/10 flex items-center justify-center mx-auto mb-4 text-[#FB7185]">
          <AlertCircle className="w-5 h-5" strokeWidth={1.5} />
        </div>
        <p className="text-lg font-semibold text-[#191a1c] mb-2">
          Couldn&apos;t load pipeline.
        </p>
        <p className="text-white/55 text-[14px] mb-6">
          {result.error}
        </p>
        <button
          type="button"
          onClick={result.reload}
          className="crm-btn crm-btn-primary"
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
        <div className="mb-4 px-4 py-2.5 rounded-xl border border-[#FB7185]/40 bg-[#FB7185]/[0.07] backdrop-blur-xl flex items-center gap-3 text-[13px] text-[#FDA4AF]">
          <AlertCircle className="w-4 h-4 shrink-0" strokeWidth={1.75} />
          <span className="flex-1">{error}</span>
          <button
            type="button"
            onClick={() => setError(null)}
            className="text-[#FDA4AF]/70 hover:text-[#FDA4AF] transition-colors duration-150"
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
              onDelete={handleDelete}
              deletingLeadId={deletingLeadId}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}
