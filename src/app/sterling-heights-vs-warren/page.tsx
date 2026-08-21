import type { Metadata } from "next";
import SiteShell from "@/components/site/SiteShell";
import { company } from "@/lib/config";
import { citations, rankedCities } from "@/lib/best-suburbs-guide";
import {
  ArrowRight,
  ChevronRight,
  CalendarDays,
  Landmark,
  Scale,
  Phone,
  MapPin,
} from "lucide-react";

const BASE = "https://marketcenterrealty.com";
const SLUG = "sterling-heights-vs-warren";
const URL = `${BASE}/${SLUG}`;

export const metadata: Metadata = {
  title: "Sterling Heights vs Warren (2026): Which Is the Better Value?",
  description:
    "Sterling Heights vs Warren compared with sourced 2026 data — home values, sale prices, days on market, and schools. The two most affordable Macomb County cities, side by side, for first-time buyers. By a Metro Detroit brokerage.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Sterling Heights vs Warren (2026): Which Is the Better Value?",
    description:
      "Macomb County's two affordability plays, compared with sourced data — price, schools, and who each fits.",
    type: "article",
    locale: "en_US",
    url: URL,
  },
};

const CITED_IDS = [1, 2, 3, 4, 5, 6];

const faqs = [
  {
    question: "Is Sterling Heights or Warren cheaper?",
    answer:
      "Warren, clearly. Warren's typical home value is $204,491 versus Sterling Heights' $315,750 (Zillow, June 2026) — Warren is roughly $111,000 lower and the most affordable city on our seven-city list. Redfin's median sale price says the same: $209,874 in Warren, $319,759 in Sterling Heights (three months ending May 2026).",
  },
  {
    question: "Which has better schools?",
    answer:
      "Sterling Heights. Its north side is served by Utica Community Schools, ranked #72 of Michigan's 538 districts (Niche, 2026); its south side is Warren Consolidated. Warren itself is served by six public districts, none of which appears in Niche's 2026 top 225. If schools are your top priority, Sterling Heights — specifically a Utica Community Schools address — is the pick. In both cities, verify the exact district for any address before you offer.",
  },
  {
    question: "Which is the better value for a first-time buyer?",
    answer:
      "It's a real trade-off, not a tie. Warren gets you into a detached brick ranch for the lowest price in Metro Detroit — the pick if monthly payment is the constraint. Sterling Heights costs more but adds a top-75 school district (on the north side) and faster resale: homes there sell in a median of 15 days versus 21 in Warren (Redfin). Buy Warren for pure affordability; buy Sterling Heights if a stronger school district and quicker resale justify the extra cost.",
  },
  {
    question: "Which market moves faster?",
    answer:
      "Sterling Heights: a median of 15 days on market versus 21 in Warren (Redfin, three months ending May 2026). Both are competitive, well-priced markets — come pre-approved either way.",
  },
  {
    question: "Which appreciated more over the past year?",
    answer:
      "The two gauges disagree, and the gap is instructive. Redfin's median sale price rose 13.4% in Warren versus 2.8% in Sterling Heights — but Zillow's smoothed value index rose just 1.7% in Warren versus 2.4% in Sterling Heights. A sale-price jump that far above the value index usually means the mix of homes that sold shifted toward pricier ones, not that every house gained 13%. Treat Warren's sale-price spike as a mix effect until the value index confirms it.",
  },
];

export default function SterlingHeightsVsWarrenPage() {
  const sh = rankedCities.find((c) => c.city === "Sterling Heights")!;
  const wr = rankedCities.find((c) => c.city === "Warren")!;
  const sources = citations.filter((c) => CITED_IDS.includes(c.id));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Sterling Heights vs Warren (2026): Which Is the Better Value?",
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
      { "@type": "ListItem", position: 2, name: "Sterling Heights vs Warren", item: URL },
    ],
  };

  const rows: { label: string; sh: string; wr: string; cite: string }[] = [
    { label: "Typical home value (Jun 2026)", sh: sh.stats.zhvi, wr: wr.stats.zhvi, cite: "¹" },
    { label: "1-yr change, value index", sh: sh.stats.zhviYoY, wr: wr.stats.zhviYoY, cite: "¹" },
    { label: "Median sale price (3 mo ending May 2026)", sh: sh.stats.medianSale, wr: wr.stats.medianSale, cite: "⁴" },
    { label: "1-yr change, sale price", sh: sh.stats.medianSaleYoY, wr: wr.stats.medianSaleYoY, cite: "⁴" },
    { label: "Median days on market", sh: sh.stats.dom, wr: wr.stats.dom, cite: "⁴" },
    { label: "Population (2020 Census)", sh: sh.stats.population, wr: wr.stats.population, cite: "²" },
    { label: "Schools (Niche 2026)", sh: "Utica CS #72 (north) / Warren Consolidated", wr: "6 districts, none in top 225", cite: "³⁵⁶" },
  ];

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
              <span style={{ color: "var(--navy)" }}>Sterling Heights vs Warren</span>
            </nav>

            <div className="s-eyebrow">
              <Scale className="w-3 h-3" style={{ marginRight: 2 }} />
              Head to head · 2026
            </div>

            <h1 style={{ fontSize: "clamp(32px, 4.4vw, 54px)", lineHeight: 1.12, marginBottom: 22 }}>
              Sterling Heights vs Warren: Which Is the Better Value?
            </h1>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", fontSize: 12.5, color: "var(--s-muted)", marginBottom: 34 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <CalendarDays className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />
                Published August 21, 2026 · market data through spring 2026, vintage stated per figure
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <Landmark className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />
                By {company.name} — a Metro Detroit brokerage selling in both
              </span>
            </div>

            <div className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid rgba(217,118,47,0.3)", background: "rgba(217,118,47,0.06)", padding: 30 }}>
              <div className="s-eyebrow">The short answer</div>
              <p style={{ fontSize: 16.5, lineHeight: 1.8, color: "var(--s-ink)" }}>
                These are Macomb County&rsquo;s two affordability plays, and the trade-off is clean.{" "}
                <strong>Warren</strong> is cheaper — a typical home value of $204,491, the lowest of the
                seven cities we serve — the pick if the monthly payment is the constraint.{" "}
                <strong>Sterling Heights</strong> costs about $111,000 more ($315,750) but buys a top-75
                Michigan school district on its north side (Utica Community Schools) and faster resale
                (15-day median vs 21). Buy Warren for pure affordability; buy Sterling Heights when a
                stronger district and quicker resale justify the step up. Everything below is sourced.
              </p>
            </div>
          </div>
        </section>

        {/* ── Head-to-head table ── */}
        <section className="bg-cream-2" style={{ padding: "70px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal">
              <div className="s-eyebrow">Head to head</div>
              <h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", marginBottom: 26 }}>The numbers, side by side</h2>
            </div>
            <div className="reveal" style={{ overflowX: "auto", borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff" }}>
              <table style={{ width: "100%", textAlign: "left", fontSize: 13.5, minWidth: 620, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--line)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--s-muted)" }}>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>Metric</th>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>Sterling Heights</th>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>Warren</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.label} style={{ borderTop: "1px solid var(--line)" }}>
                      <td style={{ padding: "15px 20px", color: "var(--s-muted)" }}>
                        {r.label}
                        <sup style={{ color: "var(--s-gold)" }}>{r.cite}</sup>
                      </td>
                      <td style={{ padding: "15px 20px", fontWeight: 600, color: "var(--s-ink)", fontVariantNumeric: "tabular-nums" }}>{r.sh}</td>
                      <td style={{ padding: "15px 20px", fontWeight: 600, color: "var(--s-ink)", fontVariantNumeric: "tabular-nums" }}>{r.wr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 11, color: "var(--s-muted)", marginTop: 14 }}>
              Superscripts refer to the numbered sources at the end of this page. Where Zillow&rsquo;s index
              and Redfin&rsquo;s sale price disagree on momentum (they do for Warren), both are shown — a
              3-month median is mix-sensitive; the smoothed index isn&rsquo;t.
            </p>
          </div>
        </section>

        {/* ── Choose X if ── */}
        <section className="bg-cream" style={{ padding: "80px 0" }}>
          <div className="container" style={{ maxWidth: 860, display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            <div className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff", padding: 30 }}>
              <h2 style={{ fontSize: 24, marginBottom: 14 }}>Choose Sterling Heights if…</h2>
              <ul style={{ display: "grid", gap: 10, fontSize: 14.5, lineHeight: 1.7, color: "var(--s-ink)", paddingLeft: 18 }}>
                <li>Schools are a priority — a north-side Utica Community Schools address (#72 in MI)</li>
                <li>You want faster resale and a slightly newer housing stock</li>
                <li>You can stretch about $111K above Warren for the district and resale</li>
                <li>You&rsquo;re a first-time buyer who plans to move up in 5–7 years</li>
              </ul>
              <a href={`/${sh.citySlug}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--s-gold)", fontWeight: 600, marginTop: 18 }}>
                Full Sterling Heights guide <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff", padding: 30 }}>
              <h2 style={{ fontSize: 24, marginBottom: 14 }}>Choose Warren if…</h2>
              <ul style={{ display: "grid", gap: 10, fontSize: 14.5, lineHeight: 1.7, color: "var(--s-ink)", paddingLeft: 18 }}>
                <li>Monthly payment is the constraint — the lowest home prices in Metro Detroit</li>
                <li>You want a detached brick ranch with a real basement over square footage in a pricier city</li>
                <li>You&rsquo;re buying to hold or rent — low entry near the GM/auto employment base</li>
                <li>You&rsquo;ll verify the district carefully, since school quality varies block to block</li>
              </ul>
              <a href={`/${wr.citySlug}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--s-gold)", fontWeight: 600, marginTop: 18 }}>
                Full Warren guide <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-cream-2" style={{ padding: "80px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal">
              <div className="s-eyebrow">FAQ</div>
              <h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", marginBottom: 30 }}>Common questions, answered directly</h2>
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
              Weighing more than these two? See{" "}
              <a href="/best-metro-detroit-suburbs" style={{ color: "var(--s-gold)", fontWeight: 600 }}>
                all seven Metro Detroit suburbs, ranked for 2026
              </a>{" "}
              and our guide to{" "}
              <a href="/first-time-home-buyer-programs-michigan" style={{ color: "var(--s-gold)", fontWeight: 600 }}>
                Michigan first-time buyer down-payment programs
              </a>
              .
            </p>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-cream-2" style={{ padding: "80px 0 100px", textAlign: "center" }}>
          <div className="container" style={{ maxWidth: 640 }}>
            <h2 style={{ fontSize: "clamp(26px, 3.4vw, 40px)", marginBottom: 14 }}>First home on a real budget?</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--s-muted)", marginBottom: 30 }}>
              We help first-time buyers in both cities navigate financing, down-payment assistance, and
              school-district boundaries — so you get the right home, not just any home.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/home-value" className="btn btn-gold">
                Start with a free consult <ArrowRight className="w-4 h-4" />
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
