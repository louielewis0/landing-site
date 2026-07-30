import { fraunces, inter, manrope } from "@/lib/site-fonts";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";
import SiteMotion from "./SiteMotion";
import Concierge from "./Concierge";

/**
 * Wrapper for every PUBLIC page (never /crm): applies the .site-theme
 * scope (navy/cream/gold tokens + Fraunces/Inter variables) and mounts
 * the shared nav, footer, and GSAP motion orchestrator. The theme is
 * scoped to this subtree so the CRM's dark system is untouched.
 */
export default function SiteShell({
  children,
  navOnDark = false,
}: {
  children: React.ReactNode;
  /** White nav text while un-scrolled — for pages opening on video/dark media. */
  navOnDark?: boolean;
}) {
  return (
    <div
      className={`site-theme ${fraunces.variable} ${inter.variable} ${manrope.variable} ${navOnDark ? "nav-over-video" : ""}`}
    >
      <SiteNav />
      {children}
      <SiteFooter />
      <Concierge />
      <SiteMotion />
    </div>
  );
}
