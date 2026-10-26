import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { company } from "@/lib/config";

/**
 * Footer (DOBI-inspired, clean): centered logo, email / phone / address,
 * reliability disclaimer, REALTOR® + Equal Housing Opportunity marks, a
 * hairline rule, then copyright + Privacy Policy + Accessibility.
 *
 * The large set of internal SEO links (guides, tools, city pages) is preserved
 * inside a subtle collapsible "Site directory" — it keeps those pages linked
 * and crawlable without cluttering the clean footer.
 */

function RealtorMark() {
  return (
    <span className="df-badge" aria-label="REALTOR®">
      <svg width="30" height="30" viewBox="0 0 64 64" aria-hidden>
        <defs>
          <mask id="df-r">
            <rect width="64" height="64" fill="#fff" />
            <text x="32" y="47" textAnchor="middle" fontSize="44" fontWeight="800"
              fontFamily="Georgia, serif" fill="#000">R</text>
          </mask>
        </defs>
        <rect width="64" height="64" rx="4" fill="currentColor" mask="url(#df-r)" />
      </svg>
      <span className="df-badge-label">REALTOR&reg;</span>
    </span>
  );
}

function EqualHousingMark() {
  return (
    <span className="df-badge" aria-label="Equal Housing Opportunity">
      <svg width="30" height="30" viewBox="0 0 64 64" fill="none"
        stroke="currentColor" strokeWidth="4" strokeLinejoin="round" aria-hidden>
        <path d="M7 31 L32 11 L57 31" />
        <path d="M14 30 V52 H50 V30" />
        <line x1="25" y1="40" x2="39" y2="40" strokeWidth="4.5" />
        <line x1="25" y1="47" x2="39" y2="47" strokeWidth="4.5" />
      </svg>
      <span className="df-badge-label">Equal Housing<br />Opportunity</span>
    </span>
  );
}

export default function SiteFooter() {
  const year = new Date().getFullYear();

  const directory = [
    { label: "Sell Your Home", href: "/sell-your-home-metro-detroit" },
    { label: "What's My Home Worth?", href: "/home-value" },
    { label: "Search Homes", href: "/homes" },
    { label: "Listings", href: "/#listings" },
    { label: "Team", href: "/#about" },
    { label: "Reviews", href: "/reviews" },
    { label: "Contact", href: "/contact" },
    { label: "Market Update", href: "/metro-detroit-housing-market-update" },
    { label: "Best Suburbs Guide", href: "/best-metro-detroit-suburbs" },
    { label: "School Districts Guide", href: "/best-school-districts-metro-detroit" },
    { label: "Home Budget Guide", href: "/how-much-home-metro-detroit-budget" },
    { label: "First-Time Buyer Programs", href: "/first-time-home-buyer-programs-michigan" },
    { label: "How to Buy in Michigan", href: "/how-to-buy-a-home-in-michigan" },
    { label: "Michigan Closing Costs", href: "/michigan-closing-costs" },
    { label: "Michigan Property Taxes", href: "/michigan-property-taxes-explained" },
    { label: "Who Pays Realtor Commission?", href: "/who-pays-realtor-commission-michigan" },
    { label: "Seller Disclosure Rules", href: "/michigan-seller-disclosure-requirements" },
    { label: "Damage: Sell or Restore?", href: "/water-damage-sell-or-restore" },
    { label: "Inspection vs. Appraisal", href: "/home-inspection-vs-appraisal" },
    { label: "Buy or Sell Now?", href: "/should-i-buy-or-sell-now-metro-detroit" },
    { label: "Oakland County Brokerages", href: "/best-real-estate-brokerages-oakland-county" },
    { label: "Michigan Brokerages", href: "/best-real-estate-brokerages-michigan" },
    { label: "Home Sale Proceeds", href: "/home-sale-proceeds-calculator" },
    { label: "Affordability Calculator", href: "/home-affordability-calculator" },
    { label: "Rental ROI Calculator", href: "/rental-property-roi-calculator" },
    { label: "Rent vs. Buy", href: "/rent-vs-buy-calculator" },
    { label: "1031 Exchange", href: "/1031-exchange-calculator" },
    { label: "Sell or Rent?", href: "/sell-or-rent-calculator" },
    { label: "Down Payment Help", href: "/michigan-down-payment-assistance" },
    { label: "Troy", href: "/troy-real-estate-agent" },
    { label: "Rochester Hills", href: "/rochester-hills-real-estate-agent" },
    { label: "Birmingham", href: "/birmingham-real-estate-agent" },
    { label: "Bloomfield Hills", href: "/bloomfield-hills-real-estate-agent" },
    { label: "West Bloomfield", href: "/west-bloomfield-real-estate-agent" },
    { label: "Sterling Heights", href: "/sterling-heights-real-estate-agent" },
    { label: "Warren", href: "/warren-real-estate-agent" },
    { label: "Madison Heights", href: "/madison-heights-real-estate-agent" },
    { label: "Auburn Hills", href: "/auburn-hills-real-estate-agent" },
  ];

  return (
    <footer className="df-foot">
      <div className="df-inner">
        <Link href="/" className="df-logo" aria-label={`${company.name} home`}>
          <Image src="/mcr-logo-color-3d.png" alt={company.name} width={180} height={180} />
        </Link>

        <div className="df-contact">
          <a className="df-contact-item" href={`mailto:${company.email}`}>
            <Mail width={22} height={22} aria-hidden />
            <span>{company.email}</span>
          </a>
          <a className="df-contact-item" href={`tel:${company.phoneTel}`}>
            <Phone width={22} height={22} aria-hidden />
            <span>{company.phone}</span>
          </a>
          <div className="df-contact-item">
            <MapPin width={22} height={22} aria-hidden />
            <span>{company.address}</span>
          </div>
        </div>

        <p className="df-disclaimer">
          All information is deemed reliable but not guaranteed and should be independently reviewed and verified.
        </p>

        <div className="df-badges">
          <RealtorMark />
          <EqualHousingMark />
        </div>

        <div className="df-rule" />

        <div className="df-legal">
          <span>&copy; {year} {company.name}</span>
          <span className="df-dot">&middot;</span>
          <Link href="/privacy">Privacy Policy</Link>
          <span className="df-dot">&middot;</span>
          <Link href="/accessibility">Accessibility</Link>
        </div>
        <div className="df-license">Licensed in Michigan &middot; Equal Housing Opportunity</div>

        <details className="df-more">
          <summary>Site directory</summary>
          <nav className="df-more-links" aria-label="Site directory">
            {directory.map((l) => (
              <Link key={l.href} href={l.href}>{l.label}</Link>
            ))}
          </nav>
        </details>
      </div>
    </footer>
  );
}
