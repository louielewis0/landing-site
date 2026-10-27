import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Homepage action tiles (DOBI-style): three large image cards — Buying a Home
 * (→ IDX search), Selling a Home (→ free valuation), Just Listed (→ live IDX
 * listings). Replaces the old "On the market" listings showcase.
 */
const TILES = [
  {
    href: "/homes",
    img: "/tiles/tile-buy.jpg",
    label: "Buying a Home",
    sub: "Search every live MLS listing across Metro Detroit.",
    cta: "Start your search",
  },
  {
    href: "/home-value",
    img: "/tiles/tile-sell.jpg",
    label: "Selling a Home",
    sub: "See what your home is worth — free, no obligation.",
    cta: "Get your home value",
  },
  {
    href: "/homes",
    img: "/tiles/tile-listed.jpg",
    label: "Just Listed",
    sub: "The newest homes on the market, refreshed hourly.",
    cta: "View live listings",
  },
];

export default function ActionTiles() {
  return (
    <section className="t-wrap at-section" id="listings">
      <div className="at-head">
        <div className="t-eyebrow">Start here</div>
        <h2>
          How can we <span className="t-blue">help you move?</span>
        </h2>
      </div>
      <div className="at-grid">
        {TILES.map((t) => (
          <Link key={t.label} href={t.href} className="at-tile">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={t.img} alt={t.label} loading="lazy" />
            <div className="at-shade" aria-hidden />
            <div className="at-content">
              <h3 className="at-label">{t.label}</h3>
              <p className="at-sub">{t.sub}</p>
              <span className="at-cta">
                {t.cta} <ArrowRight width={16} height={16} aria-hidden />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
