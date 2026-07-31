import type { Metadata } from "next";
import ActivityFeedClient from "./ActivityFeedClient";

export const metadata: Metadata = { title: "Activity" };

export default function CrmActivityPage() {
  return (
    <>
      <p className="crm-label text-[var(--gold-soft)] mb-2">Activity</p>
      <h1 className="text-2xl font-semibold text-[#191a1c] tracking-tight mb-2">
        Touch timeline.
      </h1>
      <p className="text-white/55 text-[14px] mb-8 max-w-2xl">
        Every call, email, text, meeting, and note — across every lead,
        newest first. Click any row to open that lead.
      </p>
      <ActivityFeedClient />
    </>
  );
}
