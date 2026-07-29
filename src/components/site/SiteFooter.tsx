import Image from "next/image";
import Link from "next/link";
import { company } from "@/lib/config";
import { cityPages } from "@/lib/city-pages";

/**
 * Site footer — prototype .site-footer treatment (deep navy, 4-col
 * grid) carrying every link from the previous footer: services,
 * all area pages, resources (incl. best-suburbs guide + privacy),
 * and social. Copy unchanged.
 */
export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link href="/" className="s-logo">
              <span className="s-logo-mark">
                <Image
                  src="/logo.png"
                  alt={company.name}
                  width={26}
                  height={26}
                  style={{ objectFit: "contain" }}
                />
              </span>
              {company.name}
            </Link>
            <p>{company.footerTagline}</p>
            <div style={{ marginTop: 22, display: "flex", gap: 12 }}>
              <Link
                href="/home-value"
                className="btn btn-gold"
                style={{ padding: "11px 20px", fontSize: 13 }}
              >
                Request valuation
              </Link>
            </div>
          </div>

          <div className="foot-col">
            <h4>Services</h4>
            <ul>
              <li><Link href="/#services">Buy a Home</Link></li>
              <li><Link href="/#lead-magnet">Sell Your Home</Link></li>
              <li><Link href="/#services">First-Time Buyers</Link></li>
              <li><Link href="/#services">Luxury Real Estate</Link></li>
              <li><Link href="/#services">Investment Properties</Link></li>
              <li><Link href="/#services">Property Management</Link></li>
            </ul>
          </div>

          <div className="foot-col">
            <h4>Areas</h4>
            <ul>
              {cityPages.map((c) => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}`}>{c.city}, MI</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="foot-col">
            <h4>Connect</h4>
            <ul>
              <li><a href={`tel:${company.phoneTel}`}>{company.phone}</a></li>
              <li><a href={`mailto:${company.email}`}>{company.email}</a></li>
              {company.social.facebook && (
                <li>
                  <a href={company.social.facebook} target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                </li>
              )}
              <li><Link href="/best-metro-detroit-suburbs">Best Metro Detroit Suburbs</Link></li>
              <li><Link href="/reviews">Leave a Review</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="foot-bottom">
          <span>
            © {year} {company.name}. All rights reserved. Licensed Real Estate
            Brokerage in Michigan.
          </span>
          <span>{company.address}</span>
        </div>
      </div>
    </footer>
  );
}
