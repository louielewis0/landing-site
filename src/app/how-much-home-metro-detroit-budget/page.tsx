import type { Metadata } from "next";
import SiteShell from "@/components/site/SiteShell";
import { company } from "@/lib/config";
import { citations, rankedCities } from "@/lib/best-suburbs-guide";
import {
  ArrowRight,
  ChevronRight,
  CalendarDays,
  Landmark,
  Wallet,
  Phone,
  MapPin,
} from "lucide-react";

const BASE = "https://marketcenterrealty.com";
const SLUG = "how-much-home-metro-detroit-budget";
const URL = `${BASE}/${SLUG}`;

export const metadata: Metadata = {
  title: "How Much Home Does Your Budget Buy in Metro Detroit? (2026)",
  description:
    "What a $200K, $300K, $450K, or $750K budget actually buys across Metro Detroit's suburbs in 2026 — mapped to Warren, Sterling Heights, Troy, Rochester Hills, Birmingham and more, using sourced Zillow home values. By a Metro Detroit brokerage.",
  alternates: { canonical: URL },
  openGraph: {
    title: "How Much Home Does Your Budget Buy in Metro Detroit? (2026)",
    description:
      "Match your budget to the right suburb — a sourced 2026 price ladder across seven Metro Detroit cities.",
    type: "article",
    locale: "en_US",
    url: URL,
  },
};

const CITED_IDS = [1, 3];

/** Parse "$472,471" → 472471 so the ladder sorts by real value, never by hand. */
function toNum(zhvi: string): number {
  return parseInt(zhvi.replace(/[^0-9]/g, ""), 10);
}

const faqs = [
  {
    question: "How much house can I get for $200,000 in Metro Detroit?",
    answer:
      "At around $200,000, Warren is your center of gravity — its typical home value is $204,491 (Zillow, June 2026), the lowest of the seven cities we serve. That budget generally buys a detached brick ranch with a basement in Macomb County's largest city. It's the most affordable entry point in Metro Detroit.",
  },
  {
    question: "What can I buy for $300,000?",
    answer:
      "Around $300,000 puts you in Sterling Heights, where the typical home value is $315,750 (Zillow, June 2026) — a step up from Warren that adds a top-75 Michigan school district (Utica Community Schools) on the north side and faster resale. It's the sweet spot for first-time buyers who want more than the cheapest option.",
  },
  {
    question: "What does a $450,000–$480,000 budget buy?",
    answer:
      "That range lands you in the heart of Metro Detroit's family-suburb tier: West Bloomfield ($466,635), Troy ($472,471), and Rochester Hills ($480,334) all cluster there (Zillow, June 2026). You're choosing between top-five school districts (Troy #3, Rochester #5), lake living (West Bloomfield), and trail-and-park lifestyle (Rochester Hills) — at nearly the same price.",
  },
  {
    question: "What budget do I need for Birmingham or Bloomfield Hills?",
    answer:
      "The luxury tier starts around $690,000–$760,000: Bloomfield Hills' typical home value is $690,654 and Birmingham's is $757,616 (Zillow, June 2026) — and Birmingham's has now passed Bloomfield Hills'. Birmingham buys a walkable downtown lifestyle; Bloomfield Hills buys estates on acreage. Both are Metro Detroit's top price tier.",
  },
  {
    question: "Do these numbers mean every home costs exactly that?",
    answer:
      "No — a typical home value is a midpoint, not a floor or ceiling. Every city has homes well above and below its number, depending on neighborhood, condition, school-district boundary, and lot. Use this ladder to know which cities your budget centers on; we'll show you the actual range within each one.",
  },
];

export default function BudgetLadderPage() {
  const sources = citations.filter((c) => CITED_IDS.includes(c.id));

  // Sort the seven cities by real Zillow value, low → high, so the ladder is
  // always correct no matter how the data file changes.
  const ladder = [...rankedCities].sort((a, b) => toNum(a.stats.zhvi) - toNum(b.stats.zhvi));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How Much Home Does Your Budget Buy in Metro Detroit? (2026)",
    datePublished: "2026-08-21",
    dateModified: "2026-08-21",
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
      { "@type": "ListItem", position: 2, name: "How Much Home Your Budget Buys", item: URL },
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
              style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--s-muted)", marginBottom: 34 }}
            >
              <a href="/">Home</a>
              <ChevronRight className="w-3 h-3" />
              <span style={{ color: "var(--navy)" }}>How Much Home Your Budget Buys</span>
            </nav>

            <div className="s-eyebrow">
              <Wallet className="w-3 h-3" style={{ marginRight: 2 }} />
              Budget guide · 2026
            </div>

            <h1 style={{ fontSize: "clamp(32px, 4.4vw, 54px)", lineHeight: 1.12, marginBottom: 22 }}>
              How Much Home Does Your Budget Buy in Metro Detroit?
            </h1>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", fontSize: 12.5, color: "var(--s-muted)", marginBottom: 34 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <CalendarDays className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />
                Published August 21, 2026 · home values Zillow, June 2026
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <Landmark className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />
                By {company.name}, a Troy, MI brokerage
              </span>
            </div>

            <div className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid rgba(217,118,47,0.3)", background: "rgba(217,118,47,0.06)", padding: 30 }}>
              <div className="s-eyebrow">The short answer</div>
              <p style={{ fontSize: 16.5, lineHeight: 1.8, color: "var(--s-ink)" }}>
                Your budget maps cleanly onto specific suburbs. Roughly: <strong>$200K</strong> centers on
                Warren, <strong>$300K</strong> on Sterling Heights, <strong>$450–480K</strong> on the family
                tier of West Bloomfield, Troy, and Rochester Hills, <strong>~$690K</strong> on Bloomfield
                Hills, and <strong>~$760K</strong> on Birmingham. Those are typical home values (Zillow, June
                2026) — midpoints, not limits — so each city has homes above and below. Below, every city on
                the ladder, low to high, with what the budget actually gets you.
              </p>
            </div>
          </div>
        </section>

        {/* ── The ladder table ── */}
        <section className="bg-cream-2" style={{ padding: "70px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal">
              <div className="s-eyebrow">The price ladder</div>
              <h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", marginBottom: 10 }}>Budget → suburb, low to high</h2>
              <p style={{ fontSize: 13.5, color: "var(--s-muted)", marginBottom: 26, maxWidth: 760 }}>
                Typical home value is Zillow&rsquo;s smoothed midpoint for the city (June 2026). It tells you
                where your budget centers — not the cheapest or priciest home available.
              </p>
            </div>
            <div className="reveal" style={{ overflowX: "auto", borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff" }}>
              <table style={{ width: "100%", textAlign: "left", fontSize: 13.5, minWidth: 640, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--line)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--s-muted)" }}>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>City</th>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>Typical home value¹</th>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>Best known for</th>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>Schools³</th>
                  </tr>
                </thead>
                <tbody>
                  {ladder.map((c) => (
                    <tr key={c.city} style={{ borderTop: "1px solid var(--line)" }}>
                      <td style={{ padding: "15px 20px", fontWeight: 600, color: "var(--s-ink)" }}>
                        <a href={`/${c.citySlug}`}>{c.city}</a>
                      </td>
                      <td style={{ padding: "15px 20px", fontWeight: 600, color: "var(--s-ink)", fontVariantNumeric: "tabular-nums" }}>{c.stats.zhvi}</td>
                      <td style={{ padding: "15px 20px", color: "var(--s-muted)" }}>{c.bestFor}</td>
                      <td style={{ padding: "15px 20px", color: "var(--s-muted)" }}>{c.stats.nicheRank}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 11, color: "var(--s-muted)", marginTop: 14 }}>
              Superscripts refer to the numbered sources at the end of this page. School ranks are
              Niche&rsquo;s 2026 Michigan ranking (538 districts) — one methodology, not a state assessment.
            </p>
          </div>
        </section>

        {/* ── Budget tiers narrative ── */}
        <section className="bg-cream" style={{ padding: "80px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div style={{ display: "grid", gap: 40 }}>
              {[
                {
                  band: "Around $200,000",
                  city: "Warren",
                  slug: "warren-real-estate-agent",
                  body: "The most affordable entry point in Metro Detroit. Warren's typical home value is $204,491 — a budget here generally buys a detached brick ranch with a real basement in Michigan's third-largest city, anchored by the GM Technical Center. The trade-off is schools: Warren's six districts don't crack Niche's 2026 top 225, so families prioritizing schools usually step up to Sterling Heights.",
                },
                {
                  band: "Around $300,000",
                  city: "Sterling Heights",
                  slug: "sterling-heights-real-estate-agent",
                  body: "The first-time buyer's sweet spot. At a $315,750 typical value, Sterling Heights costs more than Warren but adds a top-75 Michigan school district (Utica Community Schools) on its north side and faster resale. It's the step up that still keeps the monthly payment reachable.",
                },
                {
                  band: "Around $450,000–$480,000",
                  city: "The family tier: West Bloomfield, Troy & Rochester Hills",
                  slug: "best-metro-detroit-suburbs",
                  body: "Three of the region's best family suburbs cluster within about $15,000 of each other: West Bloomfield ($466,635), Troy ($472,471), and Rochester Hills ($480,334). At this budget you're choosing between top-five school districts (Troy #3, Rochester #5), lake living (West Bloomfield), and a trail-and-park lifestyle (Rochester Hills) — nearly the same price, very different daily life.",
                },
                {
                  band: "Around $690,000 and up",
                  city: "The luxury tier: Bloomfield Hills & Birmingham",
                  slug: "birmingham-vs-bloomfield-hills",
                  body: "Metro Detroit's top price tier. Bloomfield Hills' typical value is $690,654 — estates on acreage, privacy, and the #7 school district. Birmingham's is $757,616 and has now passed it — a walkable downtown you can live on foot, with the #9 district. Which one fits depends on whether you want land or a lifestyle.",
                },
              ].map((tier) => (
                <div key={tier.band} className="reveal">
                  <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--s-gold)", marginBottom: 8 }}>
                    {tier.band}
                  </div>
                  <h2 style={{ fontSize: "clamp(22px, 2.6vw, 30px)", lineHeight: 1.2, marginBottom: 12 }}>{tier.city}</h2>
                  <p style={{ fontSize: 15.5, lineHeight: 1.8, color: "var(--s-ink)", marginBottom: 12 }}>{tier.body}</p>
                  <a href={`/${tier.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--s-gold)", fontWeight: 600 }}>
                    Go deeper <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-cream-2" style={{ padding: "80px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal">
              <div className="s-eyebrow">FAQ</div>
              <h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", marginBottom: 30 }}>Budget questions, answered directly</h2>
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
        <section className="bg-cream" style={{ padding: "60px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="s-eyebrow">Sources</div>
            <ol style={{ display: "grid", gap: 14, fontSize: 13, color: "var(--s-muted)", listStyle: "none", padding: 0 }}>
              {sources.map((s) => (
                <li key={s.id} style={{ display: "flex", gap: 12 }}>
                  <span style={{ color: "var(--s-gold)", flexShrink: 0 }}>{s.id}.</span>
                  <span>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", textUnderlineOffset: 4 }}>
                      {s.label}
                    </a>
                    <span style={{ opacity: 0.7 }}> — accessed {s.accessed}.</span>
                    {s.note && <span style={{ display: "block", opacity: 0.7, marginTop: 4 }}>{s.note}</span>}
                  </span>
                </li>
              ))}
            </ol>
            <p style={{ fontSize: 13, color: "var(--s-muted)", marginTop: 18 }}>
              See the full ranked breakdown in{" "}
              <a href="/best-metro-detroit-suburbs" style={{ color: "var(--s-gold)", fontWeight: 600 }}>
                the 7 best Metro Detroit suburbs, ranked for 2026
              </a>
              , or if you&rsquo;re a first-time buyer, our guide to{" "}
              <a href="/first-time-home-buyer-programs-michigan" style={{ color: "var(--s-gold)", fontWeight: 600 }}>
                Michigan down-payment assistance programs
              </a>
              .
            </p>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-cream-2" style={{ padding: "80px 0 100px", textAlign: "center" }}>
          <div className="container" style={{ maxWidth: 640 }}>
            <h2 style={{ fontSize: "clamp(26px, 3.4vw, 40px)", marginBottom: 14 }}>Know your budget? We&rsquo;ll match it to the right suburb.</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--s-muted)", marginBottom: 30 }}>
              Tell us your number and what matters — schools, commute, lot, lifestyle — and we&rsquo;ll show
              you exactly where it goes furthest, with the real range in each city.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/home-value" className="btn btn-gold">
                Get matched to a suburb <ArrowRight className="w-4 h-4" />
              </a>
              <a href={`tel:${company.phoneTel}`} className="btn btn-ghost">
                <Phone className="w-4 h-4" />
                {company.phone}
              </a>
            </div>
            <p style={{ fontSize: 12, color: "var(--s-muted)", marginTop: 26, display: "inline-flex", alignItems: "center", gap: 8 }}>
              <MapPin className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />
              {company.address}
            </p>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
