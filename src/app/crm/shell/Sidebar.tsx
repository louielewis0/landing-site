import { LayoutDashboard, Columns3, Users, Activity } from "lucide-react";
import Brand from "./Brand";
import NavLink from "./NavLink";

/**
 * Left navigation rail for /crm. Visible on md+ viewports; hidden
 * on mobile in 2A (where a future pass would surface a hamburger
 * toggle in the topbar — punted from 2A so the desktop CRM ships
 * polished first).
 *
 * `sticky top-0 h-screen` keeps the rail in view as the main
 * column scrolls. Internal layout puts the brand at the top, nav
 * links in the middle (Dashboard / Pipeline / Leads / Activity
 * per the approved route plan), and a small authenticated
 * indicator at the bottom.
 *
 * The "Authenticated" dot is intentionally subtle (gold ping,
 * 11px label) so it reads as a status indicator, not a coercive
 * "you're logged in" banner.
 */
export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:flex-col md:w-[240px] md:shrink-0 md:sticky md:top-0 md:h-screen md:self-start bg-ink-2/80 backdrop-blur-xl border-r border-bone/10">
      <Brand />
      <nav className="flex-1 py-4 flex flex-col gap-0.5">
        <NavLink
          href="/crm"
          label="Dashboard"
          icon={<LayoutDashboard className="w-4 h-4" strokeWidth={1.5} />}
        />
        <NavLink
          href="/crm/pipeline"
          label="Pipeline"
          icon={<Columns3 className="w-4 h-4" strokeWidth={1.5} />}
        />
        <NavLink
          href="/crm/leads"
          label="Leads"
          icon={<Users className="w-4 h-4" strokeWidth={1.5} />}
        />
        <NavLink
          href="/crm/activity"
          label="Activity"
          icon={<Activity className="w-4 h-4" strokeWidth={1.5} />}
        />
      </nav>
      <footer className="border-t border-bone/10 px-5 py-4 flex items-center gap-2 text-[11px] text-bone/45 tracking-wide">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--gold-soft)] opacity-70 animate-ping" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--gold)]" />
        </span>
        Authenticated
      </footer>
    </aside>
  );
}
