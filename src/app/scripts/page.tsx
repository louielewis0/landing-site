import type { Metadata } from "next";
import ScriptsGate from "./gate";

export const metadata: Metadata = {
  title: "Call Scripts | Real Estate Market Center",
  description: "Internal call scripts and lead handling playbook.",
  robots: { index: false, follow: false },
};

export default function ScriptsPage() {
  return <ScriptsGate />;
}
