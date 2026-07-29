import { fraunces, inter } from "@/lib/site-fonts";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";
import SiteMotion from "./SiteMotion";

/**
 * Wrapper for every PUBLIC page (never /crm): applies the .site-theme
 * scope (navy/cream/gold tokens + Fraunces/Inter variables) and mounts
 * the shared nav, footer, and GSAP motion orchestrator. The theme is
 * scoped to this subtree so the CRM's dark system is untouched.
 */
export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={`site-theme ${fraunces.variable} ${inter.variable}`}>
      <SiteNav />
      {children}
      <SiteFooter />
      <SiteMotion />
    </div>
  );
}
