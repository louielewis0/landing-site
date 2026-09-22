import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { company } from "@/lib/config";
import CountUpStats from "./CountUpStats";

/**
 * Real, verbatim Google reviews for Real Estate Market Center (Sundus Lewis'
 * Google Business Profile, 5.0★ / 70+ reviews). Displayed as visible on-page
 * social proof — intentionally NOT emitted as self-serving aggregateRating
 * JSON-LD, which Google treats as ineligible/spam for an entity reviewing
 * itself. Only REMC's own reviews appear anywhere on the site.
 */
const GOOGLE_REVIEWS: { text: string; name: string }[] = [
  { text: "Really helpful and professional team! They made the entire process smooth and stress-free, and their knowledge of the local market was evident from start to finish. I'd highly recommend Real Estate Market Center to anyone looking for a team that's responsive, knowledgeable, and genuinely easy to work with.", name: "Fadi E." },
  { text: "Had a great experience working with Real Estate Market Center. The entire staff was incredibly nice, professional, and efficient from start to finish. They are just the best.", name: "Steven N." },
  { text: "It was a pleasure working with Real Estate Market Center. Everyone on the team was professional, responsive, and really knew the ins and outs of the market.", name: "Anthony M." },
  { text: "I had an excellent experience with Real Estate Market Center. Their team was knowledgeable, dependable, and easy to work with throughout the entire process. They have a strong understanding of the Metro Detroit real estate market.", name: "Vincent A." },
  { text: "Louis was a great help at Real Estate Market Center. Best brokerage in Metro Detroit. Made the process simple and easy for me. Would recommend.", name: "Danjel P." },
  { text: "Best brokerage in Troy — highly recommend Real Estate Market Center!", name: "Adam J." },
];

function Stars({ size = 15 }: { size?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }} aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} width={size} height={size} style={{ color: "var(--s-gold)" }} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}

export function TemplateReviews() {
  return (
    <div className="t-wrap" style={{ paddingTop: 20, paddingBottom: 20 }} id="reviews">
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div className="t-eyebrow" style={{ justifyContent: "center" }}>Google reviews</div>
        <h2 style={{ marginBottom: 16 }}>
          Rated <span className="t-blue">5.0</span> by 70+ clients.
        </h2>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          <Stars size={20} />
          <span style={{ fontSize: 14, color: "var(--s-muted)" }}>5.0 average · 70+ reviews on Google</span>
        </div>
      </div>

      <div style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))" }}>
        {GOOGLE_REVIEWS.map((r) => (
          <figure key={r.name} style={{ margin: 0, borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff", padding: 26, display: "flex", flexDirection: "column", gap: 14 }}>
            <Stars />
            <blockquote style={{ margin: 0, fontSize: 14.5, lineHeight: 1.7, color: "var(--s-ink)", flex: 1 }}>
              &ldquo;{r.text}&rdquo;
            </blockquote>
            <figcaption style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 12, borderTop: "1px solid var(--line)" }}>
              <span style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--navy)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600, flexShrink: 0 }}>
                {r.name.charAt(0)}
              </span>
              <span>
                <span style={{ display: "block", fontSize: 13.5, fontWeight: 600, color: "var(--s-ink)" }}>{r.name}</span>
                <span style={{ fontSize: 11.5, color: "var(--s-muted)" }}>Google review</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: 34 }}>
        <Link href="/reviews" className="t-pill">Read more &amp; leave a review</Link>
      </div>
    </div>
  );
}

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
      <div className="t-eyebrow">Since 2003</div>
      <h2>
        Metro Detroit&rsquo;s <span className="t-blue">family-run</span> brokerage.
      </h2>
      <CountUpStats />
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

const AREAS = [
  { slug: "troy-real-estate-agent", city: "Troy", img: "/areas/troy-real-estate-agent.jpg" },
  { slug: "rochester-hills-real-estate-agent", city: "Rochester Hills", img: "/areas/rochester-hills-real-estate-agent.jpg" },
  { slug: "birmingham-real-estate-agent", city: "Birmingham", img: "/areas/birmingham-real-estate-agent.jpg" },
  { slug: "bloomfield-hills-real-estate-agent", city: "Bloomfield Hills", img: "/areas/bloomfield-hills-real-estate-agent.jpg" },
  { slug: "west-bloomfield-real-estate-agent", city: "West Bloomfield", img: "/areas/west-bloomfield-real-estate-agent.jpg" },
  { slug: "sterling-heights-real-estate-agent", city: "Sterling Heights", img: "/areas/sterling-heights-real-estate-agent.jpg" },
  { slug: "warren-real-estate-agent", city: "Warren", img: "/areas/warren-real-estate-agent.jpg" },
];

export function TemplateAreas() {
  return (
    <div className="t-wrap t-areas" id="areas">
      <div className="t-areas-head">
        <div>
          <div className="t-eyebrow">Areas we serve</div>
          <h2>
            Your neighborhood, <span>our backyard.</span>
          </h2>
        </div>
        <p className="t-areas-sub">
          Local expertise in the Metro Detroit communities we know street by
          street. Find your city below.
        </p>
      </div>
      <div className="t-areas-grid">
        {AREAS.map((a) => (
          <Link key={a.slug} href={`/${a.slug}`} className="t-area-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={a.img} alt={`Real estate agent in ${a.city}, MI`} loading="lazy" />
            <div className="t-area-shade" aria-hidden />
            <div className="t-area-label">
              <span className="t-area-city">{a.city}</span>
              <span className="t-area-sub">Real estate agent &rarr;</span>
            </div>
          </Link>
        ))}
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
