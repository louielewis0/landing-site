import type { Metadata } from "next";
import ActivityFeedClient from "./ActivityFeedClient";

export const metadata: Metadata = { title: "Activity" };

export default function CrmActivityPage() {
  return (
    <>
      <p className="eyebrow mb-3">Activity</p>
      <h1 className="font-display text-4xl font-light text-bone tracking-tight mb-3">
        Touch timeline.
      </h1>
      <p className="text-bone/55 text-[15px] mb-10 max-w-2xl font-light">
        Every call, email, text, meeting, and note — across every lead,
        newest first. Click any row to open that lead.
      </p>
      <ActivityFeedClient />
    </>
  );
}
