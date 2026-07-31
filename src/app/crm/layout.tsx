import type { Metadata } from "next";
import CrmGate from "./gate";
import Sidebar from "./shell/Sidebar";
import { manrope, grotesk } from "@/lib/site-fonts";

export const metadata: Metadata = {
  title: { template: "%s | CRM", default: "CRM" },
  description: "Internal CRM for Real Estate Market Center.",
  robots: { index: false, follow: false },
};

/**
 * Root layout for /crm/*. Every nested route — overview,
 * pipeline, leads, activity, and any future sub-route — mounts
 * inside this layout, so the passcode gate runs exactly once per
 * session and sidebar navigation between routes doesn't unmount
 * it.
 *
 * Layout shape:
 *   ┌──────────┐ ┌─────────────────────────────┐
 *   │          │ │ Topbar (sticky)             │
 *   │ Sidebar  │ ├─────────────────────────────┤
 *   │ (sticky, │ │                             │
 *   │  md+    )│ │ <main> {children}           │
 *   │          │ │                             │
 *   └──────────┘ └─────────────────────────────┘
 *
 * The main wrapper provides horizontal padding and the page
 * content cap (`max-w-7xl`), so every page can return raw
 * content without re-declaring its own outer container. Each
 * sub-phase replaces a single page's content in place.
 */
export default function CrmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CrmGate>
      <div className={`min-h-screen crm-mesh relative flex ${manrope.variable} ${grotesk.variable}`}>
        <Sidebar />
        <div className="flex-1 min-w-0 flex flex-col">
          <main className="flex-1 w-full" style={{ padding: "30px 36px 48px" }}>{children}</main>
        </div>
      </div>
    </CrmGate>
  );
}
