import Link from "next/link";
import Image from "next/image";
import { company } from "@/lib/config";

/**
 * Homepage sections, built 1:1 from the user's template
 * ("Real Estate Market Center.html"): inset rounded hero video with a
 * huge overlapping Space Grotesk headline, statement + stats band,
 * glass listing cards, numbered about rows, and a dark CTA band into
 * the valuation funnel.
 */

export function TemplateHero() {
  return (
    <section className="t-hero-full">
      <video autoPlay muted loop playsInline preload="metadata" poster="/hero-video-poster.jpg">
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="t-hero-full-shade" aria-hidden />
      <div className="t-hero-logo">
        <Image
          src="/mcr-logo-color-3d.png"
          alt={company.name}
          width={1156}
          height={1156}
          priority
        />
      </div>
      <div className="t-hero-copy">
        <div className="t-hero-tag">
          Live in a home that speaks for itself before you even open the door
        </div>
        <Link href="/home-value" className="t-pill">
          What&rsquo;s My Home Worth?
        </Link>
      </div>
    </section>
  );
}

export function TemplateStats() {
  return (
    <div className="t-wrap t-stats">
      <div className="t-eyebrow">Since 2004</div>
      <h2>
        Metro Detroit&rsquo;s <span className="t-blue">family-run</span> brokerage.
      </h2>
      <div className="t-stats-grid">
        <div>
          <div className="t-stat-num">
            20<span>+</span>
          </div>
          <div className="t-stat-label">Years in business</div>
        </div>
        <div>
          <div className="t-stat-num">
            $100M<span>+</span>
          </div>
          <div className="t-stat-label">In homes sold</div>
        </div>
        <div>
          <div className="t-stat-num">
            500<span>+</span>
          </div>
          <div className="t-stat-label">Homes closed</div>
        </div>
      </div>
    </div>
  );
}

const CARDS = [
  {
    href: "/listing/5040-patrick-road",
    img: "/areas/west-bloomfield-real-estate-agent.jpg",
    tag: "Sold",
    price: "$448,900",
    meta: "4 bd · 3 ba",
    addr: "5040 Patrick Road · W. Bloomfield",
  },
  {
    href: "/home-value",
    img: "/areas/cta-interior.jpg",
    tag: "Sellers",
    price: "Your home?",
    meta: "60-sec estimate",
    addr: "Find out what it's worth today",
  },
  {
    href: "/#contact",
    img: "/areas/modern-white.jpg",
    tag: "Buyers",
    price: "Coming soon",
    meta: "early access",
    addr: "Hear about listings before they hit the market",
  },
];

export function TemplateListings() {
  return (
    <div className="t-wrap t-listings" id="listings">
      <div className="t-listings-head">
        <h2>
          On the <span>market</span>
        </h2>
        <Link href="/listing/5040-patrick-road" className="t-link-caps">
          Just sold &rarr;
        </Link>
      </div>
      <div className="t-listings-grid">
        {CARDS.map((c) => (
          <Link key={c.addr} href={c.href} className="t-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.img} alt={c.addr} loading="lazy" />
            <div className="t-card-shade" aria-hidden />
            <div className="t-card-tag">{c.tag}</div>
            <div className="t-card-bar">
              <div className="t-card-row">
                <div className="t-card-price">{c.price}</div>
                <div className="t-card-meta">{c.meta}</div>
              </div>
              <div className="t-card-addr">{c.addr}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function TemplateAbout() {
  return (
    <div className="t-wrap t-about" id="about">
      <div className="t-about-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/agent.jpg" alt={`${company.name} — our team`} loading="lazy" />
      </div>
      <div>
        <div className="t-eyebrow">Who we are</div>
        <h2>
          One family, <span>helping yours.</span>
        </h2>
        <p className="t-about-p">
          We&rsquo;re not a franchise desk. For two decades our family has guided Metro
          Detroit families through buying and selling &mdash; straight answers,
          street-level pricing knowledge, and one point of contact from first call
          to closing.
        </p>
        <div className="t-about-rows">
          <div>
            <span className="t-num">01</span>
            <span>Street-level comps across Oakland, Macomb &amp; Wayne</span>
          </div>
          <div>
            <span className="t-num">02</span>
            <span>One point of contact, start to close</span>
          </div>
          <div>
            <span className="t-num">03</span>
            <span>500+ closings of negotiation experience on your side</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TemplateCta() {
  return (
    <div className="t-wrap t-cta-wrap">
      <div className="t-cta">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/areas/bloomfield-hills-real-estate-agent.jpg" alt="" loading="lazy" />
        <div className="t-cta-shade" aria-hidden />
        <div className="t-cta-copy">
          <h2>
            Thinking about
            <br />
            <span>your next move?</span>
          </h2>
          <p>A free, no-pressure valuation from people who know your street.</p>
          <Link href="/home-value" className="t-pill t-pill-solid">
            Get My Valuation
          </Link>
        </div>
      </div>
    </div>
  );
}
