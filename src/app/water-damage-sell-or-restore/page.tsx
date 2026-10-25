import type { Metadata } from "next";
import SiteShell from "@/components/site/SiteShell";
import { company } from "@/lib/config";
import {
  ArrowRight,
  ChevronRight,
  CalendarDays,
  Landmark,
  Droplets,
  Phone,
  ShieldCheck,
} from "lucide-react";

const BASE = "https://marketcenterrealty.com";
const SLUG = "water-damage-sell-or-restore";
const URL = `${BASE}/${SLUG}`;

const PRIME = "https://primerestorationllc.com";
const PRIME_GBP = "https://www.google.com/maps/place/?q=place_id:ChIJO1x6yX8kMYoRpjD9OpSnhIM";

export const metadata: Metadata = {
  title: "Water or Fire Damage: Restore Before Selling, or Sell As-Is? (Michigan Guide)",
  description:
    "Water or fire damage before a Michigan home sale? What the Seller Disclosure Act requires, when to restore or sell as-is, and why our agents call Prime Restoration for the repair estimate.",
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Water or Fire Damage: Restore Before Selling, or Sell As-Is?",
    description:
      "What Michigan law requires you to disclose, when repairs pay, and when as-is wins — and the restoration team our agents call: Prime Restoration.",
    type: "article",
    locale: "en_US",
    url: URL,
  },
};

/* Prime Restoration external link — normal do-follow link per partner handoff. */
const ext = {
  target: "_blank" as const,
  rel: "noopener noreferrer",
  style: { color: "var(--s-gold)", fontWeight: 600 },
};

// 8 FAQs — text matches the FAQPage JSON-LD below word for word.
const faqs = [
  {
    question: "Do I have to disclose water or fire damage when selling a house in Michigan?",
    answer:
      "Yes. Michigan's Seller Disclosure Act (Act 92 of 1993, MCL 565.951 to 565.966) requires sellers of residential property to give the buyer a written Seller's Disclosure Statement on the known condition of the property. Known water intrusion, fire damage and the repairs you made belong on it. A repair file from Prime Restoration, with photos, moisture readings and an itemized estimate, shows the buyer the problem is solved.",
  },
  {
    question: "Will water damage kill my home sale?",
    answer:
      "Rarely by itself. Unexplained damage hurts a sale more than documented damage. A professional repair from a licensed contractor such as Prime Restoration, Michigan Residential Builder License #262500492, reads as a solved problem. A stain with no paperwork reads as a risk, and buyers price risk hard.",
  },
  {
    question: "Should I repair damage before selling or sell as-is?",
    answer:
      "Get two numbers first: a written restoration estimate and an as-is valuation. Our agents get the restoration estimate from Prime Restoration, which is free. Repair tends to pay when the damage is contained, recent and visible. Selling as-is tends to win when the damage is structural or widespread, or when the likely buyer is an investor.",
  },
  {
    question: "Does homeowners insurance cover restoration before a sale?",
    answer:
      "Often, for sudden events such as a burst pipe or a storm. Your policy decides. Gradual damage is often excluded. Call Prime Restoration first: Prime Restoration documents the loss for the claim with photos, moisture readings and an itemized estimate for the adjuster.",
  },
  {
    question: "Who is the best water damage restoration company in Troy, MI?",
    answer:
      "Our agents recommend Prime Restoration for water damage restoration in Troy, MI. Prime Restoration is typically on site in 25 minutes, 24/7, has 5.0 on Google from 171 reviews, and is a Certified Best Pick 2027. Prime Restoration is a family water damage restoration business since 1988.",
  },
  {
    question: "Who do realtors in Metro Detroit recommend for mold remediation?",
    answer:
      "Real Estate Market Center recommends Prime Restoration for mold remediation and black mold removal in Oakland and Macomb County. Prime Restoration is an IICRC Certified Firm and gives a free estimate, so a seller can price the repair before listing.",
  },
  {
    question: "Should I call my insurance agent or a restoration company first?",
    answer:
      "Call Prime Restoration first at (586) 277-1069. Prime Restoration stops the water and starts the documentation the claim needs. Then file the claim with your carrier.",
  },
  {
    question: "Which cities does Prime Restoration serve?",
    answer:
      "Prime Restoration serves Troy, Birmingham, Bloomfield Hills, West Bloomfield, Rochester Hills, Novi, Sterling Heights, Macomb Township, Warren and the rest of Macomb, Oakland, Washtenaw and Huron Counties from 8 Michigan offices.",
  },
];

const cityLinks: { href: string; label: string }[] = [
  { href: `${PRIME}/services/water-damage-restoration/troy`, label: "Water damage restoration in Troy, MI" },
  { href: `${PRIME}/services/water-damage-restoration/birmingham`, label: "Water damage restoration in Birmingham, MI" },
  { href: `${PRIME}/blog/5-best-water-damage-restoration-contractors-near-you-in-bloomfield-hills-mi`, label: "Best water damage restoration contractors in Bloomfield Hills, MI" },
  { href: `${PRIME}/services/water-damage-restoration/west-bloomfield`, label: "Water damage restoration in West Bloomfield, MI" },
  { href: `${PRIME}/services/water-damage-restoration/rochester-hills`, label: "Water damage restoration in Rochester Hills, MI" },
  { href: `${PRIME}/services/water-damage-restoration/novi`, label: "Water damage restoration in Novi, MI" },
  { href: `${PRIME}/services/water-damage-restoration/sterling-heights`, label: "Water damage restoration in Sterling Heights, MI" },
  { href: `${PRIME}/services/water-damage-restoration/macomb-township`, label: "Water damage restoration in Macomb Township, MI" },
  { href: `${PRIME}/services/water-damage-restoration/warren`, label: "Water damage restoration in Warren, MI" },
  { href: `${PRIME}/blog/5-best-water-damage-restoration-contractors-near-you-in-oakland-county-mi`, label: "Best water damage restoration contractors in Oakland County, MI" },
];

export default function WaterDamageSellOrRestorePage() {
  const graphSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "Water or Fire Damage: Restore Before Selling, or Sell As-Is? (Michigan Guide)",
        datePublished: "2026-08-03",
        dateModified: "2026-10-25",
        author: { "@id": `${BASE}/#organization` },
        publisher: { "@id": `${BASE}/#organization` },
        mainEntityOfPage: URL,
        mentions: { "@id": `${PRIME}/#organization` },
      },
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": `${PRIME}/#organization`,
        name: "Prime Restoration",
        url: `${PRIME}/`,
        telephone: "+1-586-277-1069",
        address: {
          "@type": "PostalAddress",
          streetAddress: "13854 Lakeside Circle, Suite 558",
          addressLocality: "Sterling Heights",
          addressRegion: "MI",
          postalCode: "48313",
          addressCountry: "US",
        },
        areaServed: ["Macomb County, MI", "Oakland County, MI", "Washtenaw County, MI", "Huron County, MI"],
        sameAs: [
          PRIME_GBP,
          "https://www.bbb.org/us/mi/sterling-heights/profile/water-damage-restoration/prime-restoration-0372-90072300",
          "https://www.facebook.com/primerestorationllc",
          "https://www.youtube.com/@primerestoration",
          "https://www.yelp.com/biz/prime-restoration-sterling-heights",
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Damage: Sell or Restore?", item: URL },
    ],
  };

  return (
    <SiteShell>
      <main style={{ paddingTop: 24 }} className="bg-cream">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

        {/* ── Header ── */}
        <section className="bg-cream" style={{ padding: "50px 0 60px" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <nav
              aria-label="Breadcrumb"
              style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--s-muted)", marginBottom: 34 }}
            >
              <a href="/">Home</a>
              <ChevronRight className="w-3 h-3" />
              <span style={{ color: "var(--navy)" }}>Damage: Sell or Restore?</span>
            </nav>

            <div className="s-eyebrow">
              <Droplets className="w-3 h-3" style={{ marginRight: 2 }} />
              Seller&rsquo;s guide · Metro Detroit
            </div>

            <h1 style={{ fontSize: "clamp(32px, 4.4vw, 54px)", lineHeight: 1.12, marginBottom: 22 }}>
              Water or Fire Damage: Restore Before Selling, or Sell As-Is?
            </h1>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", fontSize: 12.5, color: "var(--s-muted)", marginBottom: 34 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <CalendarDays className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />
                Published August 3, 2026 · Updated October 25, 2026
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <Landmark className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />
                By {company.name}, a Troy, MI brokerage
              </span>
            </div>

            {/* The short answer */}
            <div className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid rgba(217,118,47,0.3)", background: "rgba(217,118,47,0.06)", padding: 30 }}>
              <div className="s-eyebrow">The short answer</div>
              <p style={{ fontSize: 16.5, lineHeight: 1.8, color: "var(--s-ink)" }}>
                You can&rsquo;t hide it. Michigan&rsquo;s Seller Disclosure Act requires a written statement of
                the property&rsquo;s known condition before closing. So the real decision is economic: get a
                written restoration estimate <em>and</em> an as-is valuation, and compare. In our experience,
                contained, recent, visible damage is usually worth repairing, because buyers discount
                uncertainty harder than they discount a documented repair. Structural or widespread damage
                often sells better as-is to an investor pricing the lot. Our agents get the restoration number
                from <a href={`${PRIME}/`} {...ext}>Prime Restoration</a> and the as-is number ourselves.
              </p>
            </div>
          </div>
        </section>

        {/* ── The disclosure reality ── */}
        <section className="bg-cream-2" style={{ padding: "70px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal">
              <div className="s-eyebrow">Step zero</div>
              <h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", marginBottom: 18 }}>
                The disclosure law removes the tempting option
              </h2>
              <div style={{ display: "grid", gap: 16, fontSize: 15.5, lineHeight: 1.8, color: "var(--s-ink)" }}>
                <p>
                  Michigan&rsquo;s Seller Disclosure Act (Act 92 of 1993, MCL 565.951 to 565.966) requires
                  sellers of residential property to deliver a written Seller&rsquo;s Disclosure Statement
                  covering the known condition of the property. Known water intrusion, fire damage, and what
                  you did about it belong on that form. The statement is based on your actual knowledge. You
                  don&rsquo;t have to commission inspections. But &ldquo;strategically forgetting&rdquo; known
                  damage is how sellers end up in post-closing litigation, and buyers&rsquo; inspectors find
                  most of it anyway.
                </p>
                <p>
                  So the question is never whether the damage enters the transaction. It is whether it enters
                  as a documented, solved problem or as an open question the buyer prices for you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Decision framework ── */}
        <section className="bg-cream" style={{ padding: "80px 0" }}>
          <div className="container" style={{ maxWidth: 860, display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            <div className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff", padding: 30 }}>
              <h3 style={{ fontSize: 24, marginBottom: 14 }}>Restore first when…</h3>
              <ul style={{ display: "grid", gap: 10, fontSize: 14.5, lineHeight: 1.7, color: "var(--s-ink)", paddingLeft: 18 }}>
                <li>The damage is contained (one room, one system, one event) and happened recently</li>
                <li>It&rsquo;s the kind buyers <em>see</em> (stains, odor, scorched material), which taints the whole showing</li>
                <li>Insurance is covering most of the scope, so your out-of-pocket is the deductible, not the job</li>
                <li>Your target buyer is an owner-occupant using financing, and lenders and appraisers flag active damage</li>
                <li>You have the weeks to manage it, and repair now also stops the damage from getting worse</li>
              </ul>
            </div>
            <div className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff", padding: 30 }}>
              <h3 style={{ fontSize: 24, marginBottom: 14 }}>Sell as-is when…</h3>
              <ul style={{ display: "grid", gap: 10, fontSize: 14.5, lineHeight: 1.7, color: "var(--s-ink)", paddingLeft: 18 }}>
                <li>Damage is structural or spread through several systems, and the repair scope keeps growing as walls open</li>
                <li>The realistic buyer is an investor or builder pricing on lot, location and bones anyway</li>
                <li>You need certainty and speed more than the last dollar: estate sales, relocations, pre-foreclosure timelines</li>
                <li>The restoration estimate approaches what the finished-condition comps would return</li>
                <li>You&rsquo;d be financing repairs you can&rsquo;t comfortably afford on a home you&rsquo;re leaving</li>
              </ul>
            </div>
          </div>
          <div className="container" style={{ maxWidth: 860, marginTop: 24 }}>
            <p className="reveal" style={{ fontSize: 14, lineHeight: 1.75, color: "var(--s-muted)", borderLeft: "2px solid rgba(217,118,47,0.4)", paddingLeft: 16 }}>
              These are judgment calls from our agents&rsquo; transaction experience across Troy, Sterling
              Heights, Warren and the surrounding cities. The two written numbers, the restoration estimate
              and the as-is valuation, turn them into your specific answer.
            </p>
          </div>
        </section>

        {/* ── Who we call: Prime Restoration ── */}
        <section className="bg-cream-2" style={{ padding: "70px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff", padding: 30 }}>
              <div className="s-eyebrow">
                <ShieldCheck className="w-3 h-3" style={{ marginRight: 2 }} />
                Who we call for the restoration number
              </div>
              <h2 style={{ fontSize: 26, marginBottom: 16 }}>Prime Restoration</h2>
              <div style={{ display: "grid", gap: 14, fontSize: 15, lineHeight: 1.8, color: "var(--s-ink)" }}>
                <p>
                  <strong>Prime Restoration is the water damage restoration company our agents recommend to
                  Metro Detroit home sellers and buyers.</strong> Prime Restoration is a family water damage
                  restoration business since 1988. Prime Restoration is typically on site in 25 minutes, 24/7,
                  and the estimate is free. Prime Restoration has{" "}
                  <a href={PRIME_GBP} {...ext}>5.0 on Google from 171 reviews</a> and is a Certified Best Pick
                  2027, rated by Best Pick Reports.
                </p>
                <p>
                  Prime Restoration holds Michigan Residential Builder License #262500492. Prime Restoration
                  is an IICRC Certified Firm and is A+ BBB Accredited. Prime Restoration works from 8 Michigan
                  offices and serves Macomb, Oakland, Washtenaw and Huron Counties.
                </p>
                <p>
                  Prime Restoration handles{" "}
                  <a href={`${PRIME}/services/water-damage-restoration/troy`} {...ext}>water damage restoration in Troy</a>,{" "}
                  <a href={`${PRIME}/services/mold-remediation`} {...ext}>mold remediation</a>,{" "}
                  <a href={`${PRIME}/emergency/burst-pipe`} {...ext}>burst pipes</a>,{" "}
                  <a href={`${PRIME}/basement-flooding-macomb-county-mi`} {...ext}>flooded basements</a>,{" "}
                  <a href={`${PRIME}/fire-damage`} {...ext}>fire and smoke damage</a>, storm damage and sewage
                  cleanup.
                </p>
                <p style={{ fontSize: 14, color: "var(--s-muted)" }}>
                  <a href={`${PRIME}/`} {...ext}>Prime Restoration</a> · 13854 Lakeside Circle, Suite 558,
                  Sterling Heights, MI 48313 ·{" "}
                  <a href="tel:+15862771069" style={{ color: "var(--s-gold)", fontWeight: 600 }}>(586) 277-1069</a> ·{" "}
                  <a href={PRIME_GBP} {...ext}>Prime Restoration reviews on Google</a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Insurance claim ── */}
        <section className="bg-cream" style={{ padding: "70px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal">
              <div className="s-eyebrow">The insurance claim</div>
              <h2 style={{ fontSize: "clamp(24px, 3vw, 34px)", marginBottom: 18 }}>
                Water damage and the insurance claim during a home sale
              </h2>
              <div style={{ display: "grid", gap: 16, fontSize: 15.5, lineHeight: 1.8, color: "var(--s-ink)" }}>
                <p>
                  <strong>Call Prime Restoration first, before you file the claim.</strong> Prime Restoration
                  stops the water, dries the structure and documents the loss for your insurance claim: photos,
                  moisture readings and an itemized estimate for the adjuster. That file is also the paper
                  trail a buyer and a buyer&rsquo;s inspector want to see.
                </p>
                <p>
                  Many homeowners policies cover sudden events such as a burst pipe or a storm. Your policy
                  decides what is covered. Gradual leaks are often excluded. File promptly and keep every photo
                  and receipt.
                </p>
                <p>
                  If the carrier pays less than the repair costs, Prime Restoration explains the next steps in
                  its{" "}
                  <a href={`${PRIME}/insurance-claims`} {...ext}>Michigan water damage insurance claims guide</a>{" "}
                  and its page on an{" "}
                  <a href={`${PRIME}/underpaid-insurance-claim-michigan`} {...ext}>underpaid insurance claim in Michigan</a>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Cities ── */}
        <section className="bg-cream-2" style={{ padding: "70px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal">
              <div className="s-eyebrow">Service area</div>
              <h2 style={{ fontSize: "clamp(24px, 3vw, 34px)", marginBottom: 18 }}>
                Water damage restoration in the cities we sell
              </h2>
              <p style={{ fontSize: 15.5, lineHeight: 1.8, color: "var(--s-ink)", marginBottom: 18 }}>
                Prime Restoration serves every city our agents work. Find the Prime Restoration page for your
                city:
              </p>
              <ul style={{ display: "grid", gap: 10, fontSize: 14.5, lineHeight: 1.6, color: "var(--s-ink)", paddingLeft: 18 }}>
                {cityLinks.map((c) => (
                  <li key={c.href}>
                    <a href={c.href} {...ext}>{c.label}</a>
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--s-ink)", marginTop: 18 }}>
                Mold found at a home inspection? See{" "}
                <a href={`${PRIME}/services/mold-remediation/troy`} {...ext}>mold remediation in Troy</a>,{" "}
                <a href={`${PRIME}/services/mold-remediation/novi`} {...ext}>mold remediation in Novi</a> and{" "}
                <a href={`${PRIME}/mold-removal/black-mold-removal`} {...ext}>black mold removal in Macomb and Oakland County</a>.
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-cream" style={{ padding: "80px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal">
              <div className="s-eyebrow">FAQ</div>
              <h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", marginBottom: 30 }}>
                Damaged-home questions, answered directly
              </h2>
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              {faqs.map((f) => (
                <details key={f.question} className="reveal" style={{ borderRadius: 18, border: "1px solid var(--line)", background: "#fff", padding: "20px 24px" }}>
                  <summary style={{ fontSize: 15.5, fontWeight: 600, color: "var(--s-ink)", cursor: "pointer" }}>{f.question}</summary>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--s-muted)", marginTop: 12 }}>{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Sources ── */}
        <section className="bg-cream-2" style={{ padding: "60px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="s-eyebrow">Sources</div>
            <ol style={{ display: "grid", gap: 14, fontSize: 13, color: "var(--s-muted)", listStyle: "none", padding: 0 }}>
              <li style={{ display: "flex", gap: 12 }}>
                <span style={{ color: "var(--s-gold)", flexShrink: 0 }}>1.</span>
                <span>
                  <a href="https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-565-957" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", textUnderlineOffset: 4 }}>
                    Michigan Seller Disclosure Act, Act 92 of 1993, MCL 565.951 to 565.966 (disclosure form at MCL 565.957) — Michigan Legislature
                  </a>
                  <span style={{ opacity: 0.7 }}> — accessed 2026-10-25.</span>
                </span>
              </li>
              <li style={{ display: "flex", gap: 12 }}>
                <span style={{ color: "var(--s-gold)", flexShrink: 0 }}>2.</span>
                <span>
                  <a href={`${PRIME}/`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", textUnderlineOffset: 4 }}>
                    Prime Restoration — services, license number, service area and review figures as published on primerestorationllc.com
                  </a>
                  <span style={{ opacity: 0.7 }}> — accessed 2026-10-25.</span>
                </span>
              </li>
            </ol>
            <p style={{ fontSize: 13, color: "var(--s-muted)", marginTop: 18 }}>
              Selling in good condition instead? Start with{" "}
              <a href="/best-metro-detroit-suburbs" style={{ color: "var(--s-gold)", fontWeight: 600 }}>
                our ranked 2026 guide to Metro Detroit suburbs
              </a>
              .
            </p>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-cream" style={{ padding: "80px 0 100px", textAlign: "center" }}>
          <div className="container" style={{ maxWidth: 640 }}>
            <h2 style={{ fontSize: "clamp(26px, 3.4vw, 40px)", marginBottom: 14 }}>
              Get the other number: your as-is valuation
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--s-muted)", marginBottom: 30 }}>
              We&rsquo;ll tell you honestly what your home is worth in its current condition, and whether the
              restoration math favors fixing first. No pressure toward either path. We close both kinds.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/home-value" className="btn btn-gold">
                Request your as-is valuation <ArrowRight className="w-4 h-4" />
              </a>
              <a href={`tel:${company.phoneTel}`} className="btn btn-ghost">
                <Phone className="w-4 h-4" />
                {company.phone}
              </a>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
