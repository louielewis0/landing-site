import type { Metadata } from "next";
import Placeholder from "./Placeholder";

export const metadata: Metadata = { title: "Overview" };

export default function CrmOverviewPage() {
  return (
    <>
      <p className="eyebrow mb-3">Overview</p>
      <h1 className="font-display text-4xl font-light text-bone tracking-tight mb-3">
        Welcome back.
      </h1>
      <p className="text-bone/55 text-[15px] mb-10 max-w-2xl font-light">
        Your real-estate command center. KPIs, the needs-attention list, the
        recent-activity feed, and the leads-by-source breakdown land here in
        Phase 2B.
      </p>
      <Placeholder
        phase="2B"
        title="Overview KPIs + needs-attention + activity feed"
        items={[
          "Total Leads",
          "New This Week",
          "Active Pipeline",
          "Hot Leads",
          "Overdue Follow-ups",
          "Closed Won Value",
        ]}
      />
    </>
  );
}
