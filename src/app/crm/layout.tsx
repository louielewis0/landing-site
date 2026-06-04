import type { Metadata } from "next";
import CrmGate from "./gate";

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
 * 2A commit (1): bare gate + atmospheric background, page stubs
 * render directly into the body.
 *
 * 2A commit (2): the sidebar + topbar shell wraps `{children}` in
 * here. Subsequent sub-phases never need to touch this file again.
 */
export default function CrmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CrmGate>
      <div className="min-h-screen atmosphere grain vignette relative">
        {children}
      </div>
    </CrmGate>
  );
}
