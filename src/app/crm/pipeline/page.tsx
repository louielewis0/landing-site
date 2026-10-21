import type { Metadata } from "next";
import PipelineClient from "./PipelineClient";

export const metadata: Metadata = { title: "Pipeline" };

export default function CrmPipelinePage() {
  return (
    <>
      <h1 style={{ margin: "0 0 6px", fontFamily: "var(--font-grotesk), 'Space Grotesk', sans-serif", fontWeight: 300, fontSize: 40, letterSpacing: "-0.025em", color: "var(--crm-ink)" }}>
        Pipeline
      </h1>
      <p className="text-white/55 text-[14px] mb-8 max-w-2xl">
        Every active lead as a card. Drag a card between columns to update
        where it stands — your changes save automatically.
      </p>
      <PipelineClient />
    </>
  );
}
