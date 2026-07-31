import type { Metadata } from "next";
import PipelineClient from "./PipelineClient";

export const metadata: Metadata = { title: "Pipeline" };

export default function CrmPipelinePage() {
  return (
    <>
      <h1 style={{ margin: "0 0 6px", fontFamily: "var(--font-grotesk), 'Space Grotesk', sans-serif", fontWeight: 300, fontSize: 40, letterSpacing: "-0.025em", color: "#191a1c" }}>
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
