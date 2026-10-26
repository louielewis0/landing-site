import { fraunces, inter, manrope, grotesk } from "@/lib/site-fonts";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";
import SiteMotion from "./SiteMotion";
import Concierge from "./Concierge";
import ValuationPopup from "./ValuationPopup";

/**
 * Wrapper for every PUBLIC page (never /crm): applies the .site-theme
 * scope (navy/cream/gold tokens + Fraunces/Inter variables) and mounts
 * the shared nav, footer, and GSAP motion orchestrator. The theme is
 * scoped to this subtree so the CRM's dark system is untouched.
 */
export default function SiteShell({
  children,
  navOnDark = false,
  hideOverlays = false,
}: {
  children: React.ReactNode;
  /** White nav text while un-scrolled — for pages opening on video/dark media. */
  navOnDark?: boolean;
  /** Suppress the Concierge chat + home-value popup (e.g. on the IDX /homes
   *  page, where a valuation prompt shouldn't sit over other brokers' listings
   *  and the registration gate is the only intended overlay). */
  hideOverlays?: boolean;
}) {
  return (
    <div
      className={`site-theme ${fraunces.variable} ${inter.variable} ${manrope.variable} ${grotesk.variable} ${navOnDark ? "nav-over-video" : ""}`}
    >
      <a href="#main" className="skip-link">Skip to main content</a>
      <SiteNav />
      <div id="main" tabIndex={-1}>
        {children}
      </div>
      <SiteFooter />
      {!hideOverlays && <Concierge />}
      {!hideOverlays && <ValuationPopup />}
      <SiteMotion />
    </div>
  );
}
