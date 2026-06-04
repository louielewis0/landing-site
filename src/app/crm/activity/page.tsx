import type { Metadata } from "next";
import Placeholder from "../Placeholder";

export const metadata: Metadata = { title: "Activity" };

export default function CrmActivityPage() {
  return (
    <>
      <p className="eyebrow mb-3">Activity</p>
      <h1 className="font-display text-4xl font-light text-bone tracking-tight mb-3">
        Touch timeline.
      </h1>
      <p className="text-bone/55 text-[15px] mb-10 max-w-2xl font-light">
        Chronological feed of every call, email, meeting, and note logged
        against any lead. Backed by the{" "}
        <code className="font-mono text-[13px] text-[var(--gold-soft)]">activities</code>{" "}
        table shipped in Phase 1A; routes for create/list arrive in 2E along
        with the per-lead drawer that primarily writes to them.
      </p>
      <Placeholder
        phase="2B / 2E"
        title="Activity feed"
        items={["Calls", "Emails", "Texts", "Meetings", "Notes"]}
      />
    </>
  );
}
