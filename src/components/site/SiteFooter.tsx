import Image from "next/image";
import Link from "next/link";
import { company } from "@/lib/config";

/**
 * Template footer (user's design): bone ground, hairline top rule,
 * logo + stacked wordmark left, links center, contact right, then a
 * bottom row with copyright + Equal Housing line.
 */
export default function SiteFooter() {
  const year = new Date().getFullYear();

  const links = [
    { label: "Sell", href: "/home-value" },
    { label: "Listings", href: "/#listings" },
    { label: "Team", href: "/#about" },
    { label: "Reviews", href: "/reviews" },
    { label: "Best Suburbs Guide", href: "/best-metro-detroit-suburbs" },
    { label: "School Districts Guide", href: "/best-school-districts-metro-detroit" },
    { label: "Home Budget Guide", href: "/how-much-home-metro-detroit-budget" },
    { label: "First-Time Buyer Programs", href: "/first-time-home-buyer-programs-michigan" },
    { label: "Privacy", href: "/privacy" },
  ];

  const areas = [
    { label: "Troy", href: "/troy-real-estate-agent" },
    { label: "Rochester Hills", href: "/rochester-hills-real-estate-agent" },
    { label: "Birmingham", href: "/birmingham-real-estate-agent" },
    { label: "Bloomfield Hills", href: "/bloomfield-hills-real-estate-agent" },
    { label: "West Bloomfield", href: "/west-bloomfield-real-estate-agent" },
    { label: "Sterling Heights", href: "/sterling-heights-real-estate-agent" },
    { label: "Warren", href: "/warren-real-estate-agent" },
  ];

  return (
    <footer className="t-foot">
      <div className="t-wrap">
        <div className="t-foot-top">
          <Link href="/" className="t-nav-brand" aria-label={`${company.name} home`}>
            <Image src="/mcr-logo-color-3d.png" alt="" width={36} height={36} />
            <span className="t-nav-word">
              Real Estate
              <br />
              Market Center
            </span>
          </Link>
          <div className="t-foot-links">
            {links.map((l) => (
              <Link key={l.label} href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>
          <div className="t-foot-areas">
            <span className="t-foot-areas-h">Real estate agents in</span>
            {areas.map((a) => (
              <Link key={a.href} href={a.href}>
                {a.label}
              </Link>
            ))}
          </div>
          <div className="t-foot-contact">
            <a href={`tel:${company.phoneTel}`}>{company.phone}</a>
            <br />
            {company.email} &middot; Troy, MI
          </div>
        </div>
        <div className="t-foot-bottom">
          <span>&copy; {year} {company.name}</span>
          <span>Equal Housing Opportunity &middot; Licensed in Michigan</span>
        </div>
      </div>
    </footer>
  );
}
