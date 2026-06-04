import type { Metadata } from "next";
import PipelineClient from "./PipelineClient";

export const metadata: Metadata = { title: "Pipeline" };

export default function CrmPipelinePage() {
  return (
    <>
      <p className="eyebrow mb-3">Pipeline</p>
      <h1 className="font-display text-4xl font-light text-bone tracking-tight mb-2">
        Kanban board.
      </h1>
      <p className="text-bone/55 text-[15px] mb-8 max-w-2xl font-light">
        Drag a card between columns to update its status. Stages are
        computed by{" "}
        <code className="font-mono text-[13px] text-[var(--gold-soft)]">
          leads_v.pipeline_stage
        </code>
        ; drops PATCH the underlying lead via the same service-role
        route the legacy dashboard uses.
      </p>
      <PipelineClient />
    </>
  );
}
