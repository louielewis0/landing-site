import type { Metadata } from "next";
import PipelineClient from "./PipelineClient";

export const metadata: Metadata = { title: "Pipeline" };

export default function CrmPipelinePage() {
  return (
    <>
      <p className="crm-label text-[var(--gold-soft)] mb-2">Pipeline</p>
      <h1 className="text-2xl font-semibold text-[#191a1c] tracking-tight mb-2">
        Kanban board.
      </h1>
      <p className="text-white/55 text-[14px] mb-8 max-w-2xl">
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
