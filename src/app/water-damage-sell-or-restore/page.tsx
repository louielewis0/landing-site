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

export const metadata: Metadata = {
  title: "Water or Fire Damage: Restore Before Selling, or Sell As-Is? (Michigan Guide)",
  description:
    "A Metro Detroit brokerage's honest framework for damaged-home sellers: what Michigan's Seller Disclosure Act requires, when restoration pays for itself, when selling as-is wins, and how to get both numbers before deciding.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Water or Fire Damage: Restore Before Selling, or Sell As-Is?",
    description:
      "What Michigan law requires you to disclose, when repairs pay, and when as-is wins — from a brokerage that handles both paths.",
    type: "article",
    locale: "en_US",
    url: URL,
  },
};

const faqs = [
  {
    question: "Do I have to disclose water or fire damage when selling a house in Michigan?",
    answer:
      "Yes — Michigan's Seller Disclosure Act (Act 92 of 1993, MCL 565.951–966) requires sellers of residential property to deliver a written Seller's Disclosure Statement covering the known condition of the property before the sale closes. Known water intrusion, fire damage, and the repairs you made belong on it. Disclosure is based on your actual knowledge — but concealing known damage is how sellers end up in litigation after closing.",
  },
  {
    question: "Will water damage kill my home sale?",
    answer:
      "Almost never by itself — what hurts is unexplained damage. In our experience, buyers discount uncertainty far more heavily than they discount a documented, professionally remediated problem. A repair invoice from a licensed contractor with a clear scope reads as a solved problem; a water stain with no paperwork reads as an unknown risk, and buyers price unknowns brutally.",
  },
  {
    question: "Should I repair damage before selling or sell as-is?",
    answer:
      "Get both numbers first: a written restoration estimate and an honest as-is valuation. Broadly — remediation tends to pay for itself when the damage is contained, recent, and visible (the kind that scares buyers at showings). Selling as-is tends to win when damage is structural or widespread, when you lack the time or cash to manage a project, or when the likely buyer is an investor pricing on the lot and location anyway. The right answer is arithmetic, not ideology.",
  },
  {
    question: "Does homeowners insurance cover restoration before a sale?",
    answer:
      "Often, for sudden events like burst pipes or storm damage — but policies, deductibles, and exclusions vary, and gradual damage is commonly excluded. File promptly, document everything, and get your restoration contractor and your agent talking early: the insurance scope of work and the sale timeline need to line up.",
  },
];

export default function WaterDamageSellOrRestorePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Water or Fire Damage: Restore Before Selling, or Sell As-Is?",
    datePublished: "2026-08-03",
    dateModified: "2026-08-03",
    url: URL,
    author: { "@type": "Organization", name: company.name, url: BASE },
    publisher: { "@type": "Organization", name: company.name, url: BASE },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Water Damage: Sell or Restore?", item: URL },
    ],
  };

  return (
    <SiteShell>
      <main style={{ paddingTop: 24 }} className="bg-cream">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

        {/* ── Header ── */}
        <section className="bg-cream" style={{ padding: "50px 0 60px" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <nav
              aria-label="Breadcrumb"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--s-muted)",
                marginBottom: 34,
              }}
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
                Published August 3, 2026
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <Landmark className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />
                By {company.name}, a Troy, MI brokerage
              </span>
            </div>

            {/* TL;DR */}
            <div
              className="reveal"
              style={{
                borderRadius: "var(--s-radius)",
                border: "1px solid rgba(217,118,47,0.3)",
                background: "rgba(217,118,47,0.06)",
                padding: 30,
              }}
            >
              <div className="s-eyebrow">The short answer</div>
              <p style={{ fontSize: 16.5, lineHeight: 1.8, color: "var(--s-ink)" }}>
                You can&rsquo;t hide it — Michigan&rsquo;s Seller Disclosure Act requires a written statement
                of the property&rsquo;s known condition before closing — so the real decision is economic:
                get a written restoration estimate <em>and</em> an as-is valuation, and compare. In our
                experience, contained, recent, visible damage is usually worth remediating because buyers
                discount uncertainty harder than they discount a documented repair; structural or widespread
                damage often sells better as-is to an investor pricing the lot. It&rsquo;s arithmetic, not
                ideology — and you need both numbers to do it.
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
                  Michigan&rsquo;s Seller Disclosure Act (Act 92 of 1993, MCL 565.951–966) requires sellers of
                  residential property to deliver a written Seller&rsquo;s Disclosure Statement covering the
                  known condition of the property — and known water intrusion, fire damage, and what you did
                  about it belong on that form. The statement is based on your actual knowledge; you
                  don&rsquo;t have to commission inspections. But &ldquo;strategically forgetting&rdquo; known
                  damage is how sellers end up in post-closing litigation, and buyers&rsquo; inspectors find
                  most of it anyway.
                </p>
                <p>
                  So the question is never <em>whether</em> the damage enters the transaction — it&rsquo;s
                  whether it enters as a documented, solved problem or as an open question the buyer prices
                  for you. That framing decides most of what follows.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Decision framework ── */}
        <section className="bg-cream" style={{ padding: "80px 0" }}>
          <div className="container" style={{ maxWidth: 860, display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            <div className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff", padding: 30 }}>
              <h2 style={{ fontSize: 24, marginBottom: 14 }}>Restore first when…</h2>
              <ul style={{ display: "grid", gap: 10, fontSize: 14.5, lineHeight: 1.7, color: "var(--s-ink)", paddingLeft: 18 }}>
                <li>The damage is contained (one room, one system, one event) and recently occurred</li>
                <li>It&rsquo;s the kind buyers <em>see</em> — stains, odor, scorched material — which taints the whole showing</li>
                <li>Insurance is covering most of the scope, so your out-of-pocket is the deductible, not the job</li>
                <li>Your target buyer is an owner-occupant using financing — lenders and appraisers flag active damage</li>
                <li>You have the weeks to manage it; mitigation now also stops the damage from compounding</li>
              </ul>
            </div>
            <div className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff", padding: 30 }}>
              <h2 style={{ fontSize: 24, marginBottom: 14 }}>Sell as-is when…</h2>
              <ul style={{ display: "grid", gap: 10, fontSize: 14.5, lineHeight: 1.7, color: "var(--s-ink)", paddingLeft: 18 }}>
                <li>Damage is structural or spread through multiple systems — repair scope keeps growing as you open walls</li>
                <li>The realistic buyer is an investor or builder pricing on lot, location, and bones anyway</li>
                <li>You need certainty and speed more than the last dollar — estate sales, relocations, pre-foreclosure timelines</li>
                <li>The restoration estimate approaches what the finished-condition comps would return</li>
                <li>You&rsquo;d be financing repairs you can&rsquo;t comfortably afford on a home you&rsquo;re leaving</li>
              </ul>
            </div>
          </div>
          <div className="container" style={{ maxWidth: 860, marginTop: 24 }}>
            <p className="reveal" style={{ fontSize: 14, lineHeight: 1.75, color: "var(--s-muted)", borderLeft: "2px solid rgba(217,118,47,0.4)", paddingLeft: 16 }}>
              These are judgment calls from our agents&rsquo; transaction experience across Troy, Sterling
              Heights, Warren, and the surrounding cities — not formulas. The two written numbers (restoration
              estimate, as-is valuation) turn them into your specific answer.
            </p>
          </div>
        </section>

        {/* ── Partner box ── */}
        <section className="bg-cream-2" style={{ padding: "70px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div
              className="reveal"
              style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff", padding: 30 }}
            >
              <div className="s-eyebrow">
                <ShieldCheck className="w-3 h-3" style={{ marginRight: 2 }} />
                Who we call for the restoration number
              </div>
              <h2 style={{ fontSize: 24, marginBottom: 12 }}>Prime Restoration — Sterling Heights, MI</h2>
              <p style={{ fontSize: 14.5, lineHeight: 1.8, color: "var(--s-ink)", marginBottom: 12 }}>
                For the written restoration estimate, our team refers sellers to{" "}
                <a href="https://primerestorationllc.com/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--s-gold)", fontWeight: 600 }}>
                  Prime Restoration
                </a>{" "}
                — a Sterling Heights company (Michigan Residential Builder License #262500491) serving Macomb
                and Oakland County, including every city we work. Their site lists water, fire &amp; smoke,
                mold, storm, and sewage remediation, 24/7 emergency response, and a 5/5 rating across 109+
                Google reviews. Emergencies: <a href="tel:+15862771069" style={{ color: "var(--s-gold)", fontWeight: 600 }}>(586) 277-1069</a>.
              </p>
              <p style={{ fontSize: 12, color: "var(--s-muted)" }}>
                Disclosure: Prime Restoration is a referral partner our team knows personally. Get competing
                estimates for any major scope — we&rsquo;d tell you that about any contractor, including ours.
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
                    Michigan Seller Disclosure Act, Act 92 of 1993, MCL 565.951–966 (disclosure form at MCL 565.957) — Michigan Legislature
                  </a>
                  <span style={{ opacity: 0.7 }}> — accessed 2026-08-03. Legal information, not legal advice; consult an attorney about your specific disclosure obligations.</span>
                </span>
              </li>
              <li style={{ display: "flex", gap: 12 }}>
                <span style={{ color: "var(--s-gold)", flexShrink: 0 }}>2.</span>
                <span>
                  <a href="https://primerestorationllc.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", textUnderlineOffset: 4 }}>
                    Prime Restoration — services, license number, service area, and review figures as published on primerestorationllc.com
                  </a>
                  <span style={{ opacity: 0.7 }}> — accessed 2026-08-03.</span>
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
              We&rsquo;ll tell you honestly what your home is worth in its current condition — and whether the
              restoration math favors fixing first. No pressure toward either path; we close both kinds.
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
