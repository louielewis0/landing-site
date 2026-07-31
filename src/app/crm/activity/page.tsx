import type { Metadata } from "next";
import ActivityFeedClient from "./ActivityFeedClient";

export const metadata: Metadata = { title: "Activity" };

export default function CrmActivityPage() {
  return (
    <>
      <h1 style={{ margin: "0 0 6px", fontFamily: "var(--font-grotesk), 'Space Grotesk', sans-serif", fontWeight: 300, fontSize: 40, letterSpacing: "-0.025em", color: "#191a1c" }}>
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
