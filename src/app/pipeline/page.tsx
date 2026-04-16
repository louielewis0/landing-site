import type { Metadata } from "next";
import PipelineGate from "./gate";

export const metadata: Metadata = {
  title: "Review Pipeline | Real Estate Market Center",
  description: "Internal review pipeline CRM.",
  robots: { index: false, follow: false },
};

export default function PipelinePage() {
  return <PipelineGate />;
}
