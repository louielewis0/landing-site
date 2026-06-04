import type { Metadata } from "next";
import Placeholder from "../Placeholder";

export const metadata: Metadata = { title: "Pipeline" };

export default function CrmPipelinePage() {
  return (
    <main className="px-6 py-10 max-w-7xl">
      <p className="eyebrow mb-3">Pipeline</p>
      <h1 className="font-display text-4xl font-light text-bone tracking-tight mb-3">
        Kanban board.
      </h1>
      <p className="text-bone/55 text-[15px] mb-10 max-w-2xl font-light">
        Drag-and-drop columns by pipeline stage, sourced from the{" "}
        <code className="font-mono text-[13px] text-[var(--gold-soft)]">
          leads_v.pipeline_stage
        </code>{" "}
        view column shipped in Phase 1A. Drops PATCH the lead via the
        existing service-role route.
      </p>
      <Placeholder
        phase="2C"
        title="Drag-and-drop pipeline by stage"
        items={[
          "Open",
          "Engaging",
          "Active",
          "Negotiating",
          "Won",
          "Lost",
        ]}
      />
    </main>
  );
}
