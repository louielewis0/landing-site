import type { LeadStatus, PipelineStage } from "./lead-shape";

/**
 * Canonical pipeline-stage definitions for the Kanban board.
 * Mirrors the case expression in supabase/crm_phase1a.sql's
 * leads_v.pipeline_stage column — stages here are the same six
 * values the view produces.
 *
 * `targetStatus` is the LeadStatus value applied when a card is
 * dropped INTO this stage. Because multiple statuses map to the
 * same stage (e.g. attempted + contacted both → engaging), we
 * pick the most-meaningful one as the canonical "drop target":
 *
 *   open        → new           (the only status mapping to open)
 *   engaging    → contacted     (vs. attempted — contacted is the
 *                                 more advanced of the two)
 *   active      → qualified     (the first active state; can be
 *                                 promoted to showing manually)
 *   negotiating → negotiating   (the only status mapping here)
 *   won         → closed_won    (the only status mapping)
 *   lost        → closed_lost   (vs. dead — closed_lost is the
 *                                 modern vocab; legacy dead stays
 *                                 mapped to lost in leads_v but
 *                                 we don't write that on a drop)
 *
 * isTerminal is used for visual treatment — won/lost columns are
 * dimmed to draw attention to the active stages above them.
 */
export type PipelineStageDef = {
  readonly stage: PipelineStage;
  readonly label: string;
  readonly description: string;
  readonly targetStatus: LeadStatus;
  readonly isTerminal: boolean;
};

export const PIPELINE_STAGES: readonly PipelineStageDef[] = [
  {
    stage: "open",
    label: "Open",
    description: "New, untouched",
    targetStatus: "new",
    isTerminal: false,
  },
  {
    stage: "engaging",
    label: "Engaging",
    description: "Outreach started",
    targetStatus: "contacted",
    isTerminal: false,
  },
  {
    stage: "active",
    label: "Active",
    description: "Working the deal",
    targetStatus: "qualified",
    isTerminal: false,
  },
  {
    stage: "negotiating",
    label: "Negotiating",
    description: "Offer / counter",
    targetStatus: "negotiating",
    isTerminal: false,
  },
  {
    stage: "won",
    label: "Won",
    description: "Closed won",
    targetStatus: "closed_won",
    isTerminal: true,
  },
  {
    stage: "lost",
    label: "Lost",
    description: "Closed lost",
    targetStatus: "closed_lost",
    isTerminal: true,
  },
] as const;
