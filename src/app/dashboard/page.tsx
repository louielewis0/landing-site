import type { Metadata } from "next";
import DashboardGate from "./gate";

export const metadata: Metadata = {
  title: "Leads Dashboard | Real Estate Market Center",
  description: "Internal leads pipeline + DNC scrubber.",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <DashboardGate />;
}
