import type { Metadata } from "next";
import SiteShell from "@/components/site/SiteShell";
import { company } from "@/lib/config";
import { guideMeta, rankedCities, faqs, citations } from "@/lib/best-suburbs-guide";
import {
  Phone,
  MapPin,
  ArrowRight,
  ChevronRight,
  CalendarDays,
  Landmark,
} from "lucide-react";

const BASE = "https://marketcenterrealty.com";
const URL = `${BASE}/${guideMeta.slug}`;

export const metadata: Metadata = {
  title: guideMeta.metaTitle,
  description: guideMeta.metaDescription,
  alternates: { canonical: URL },
  openGraph: {
    title: guideMeta.metaTitle,
    description: guideMeta.metaDescription,
    type: "article",
    locale: "en_US",
    url: URL,
  },
};

/**
 * Long-form ranked guide — redesign typography treatment (Fraunces
 * headings on cream, reveal-on-scroll sections, no full parallax hero
 * per the design brief for content pages). Copy, data, schemas, and
 * source citations unchanged.
 */
export default function BestSuburbsGuidePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guideMeta.title,
    datePublished: guideMeta.datePublished,
    dateModified: guideMeta.dateModified,
    url: URL,
    author: { "@type": "Organization", name: company.name, url: BASE },
    publisher: { "@type": "Organization", name: company.name, url: BASE },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: guideMeta.title,
    numberOfItems: rankedCities.length,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    itemListElement: rankedCities.map((c) => ({
      "@type": "ListItem",
      position: c.rank,
      name: `${c.city}, MI — ${c.bestFor}`,
      url: `${URL}#${c.city.toLowerCase().replace(/\s+/g, "-")}`,
    })),
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
      { "@type": "ListItem", position: 2, name: "Best Metro Detroit Suburbs", item: URL },
    ],
  };

  return (
    <SiteShell>
      <main style={{ paddingTop: 24 }} className="bg-cream">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
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
              <span style={{ color: "var(--navy)" }}>Best Metro Detroit Suburbs</span>
            </nav>

            <div className="s-eyebrow">
              <MapPin className="w-3 h-3" style={{ marginRight: 2 }} />
              Metro Detroit · 2026 Buyer&rsquo;s Guide
            </div>

            <h1 style={{ fontSize: "clamp(32px, 4.4vw, 54px)", lineHeight: 1.12, marginBottom: 22 }}>
              The 7 Best Metro Detroit Suburbs to Buy a Home in 2026, Ranked
            </h1>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", fontSize: 12.5, color: "var(--s-muted)", marginBottom: 34 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <CalendarDays className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />
                Updated July 27, 2026 · market data through {guideMeta.dataThrough}
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <Landmark className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />
                By {company.name}, a Troy, MI brokerage
              </span>
            </div>

            {/* TL;DR — the direct answer, first */}
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
              <p style={{ fontSize: 16.5, lineHeight: 1.8, color: "var(--s-ink)" }}>{guideMeta.shortAnswer}</p>
            </div>
          </div>
        </section>

        {/* ── Comparison table ── */}
        <section className="bg-cream-2" style={{ padding: "70px 0" }}>
          <div className="container">
            <div className="reveal">
              <div className="s-eyebrow">Side by side</div>
              <h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", marginBottom: 10 }}>
                All seven cities, one table
              </h2>
              <p style={{ fontSize: 13.5, color: "var(--s-muted)", marginBottom: 26, maxWidth: 760 }}>
                Two market gauges, both shown: Zillow&rsquo;s typical home value (a smoothed index, June 2026)
                and Redfin&rsquo;s median sale price (rolling three months ending May 2026). They measure
                different things and sometimes disagree — where they do, trust the trend only when both agree.
              </p>
            </div>
            <div className="reveal" style={{ overflowX: "auto", borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff" }}>
              <table style={{ width: "100%", textAlign: "left", fontSize: 13.5, minWidth: 900, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--line)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--s-muted)" }}>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>#</th>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>City</th>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>Typical home value¹</th>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>1-yr change¹</th>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>Median sale price⁴</th>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>Days on market⁴</th>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>Population²</th>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>School district³</th>
                  </tr>
                </thead>
                <tbody>
                  {rankedCities.map((c) => (
                    <tr key={c.city} style={{ borderBottom: "1px solid var(--line)" }}>
                      <td style={{ padding: "16px 20px", color: "var(--s-gold)", fontWeight: 600 }}>{c.rank}</td>
                      <td style={{ padding: "16px 20px" }}>
                        <a href={`#${c.city.toLowerCase().replace(/\s+/g, "-")}`} style={{ color: "var(--navy)", fontWeight: 600 }}>
                          {c.city}
                        </a>
                        <div style={{ fontSize: 11, color: "var(--s-muted)", marginTop: 2 }}>{c.bestFor}</div>
                      </td>
                      <td style={{ padding: "16px 20px" }}>{c.stats.zhvi}</td>
                      <td style={{ padding: "16px 20px" }}>{c.stats.zhviYoY}</td>
                      <td style={{ padding: "16px 20px" }}>{c.stats.medianSale}</td>
                      <td style={{ padding: "16px 20px" }}>{c.stats.dom}</td>
                      <td style={{ padding: "16px 20px" }}>{c.stats.population}</td>
                      <td style={{ padding: "16px 20px", color: "var(--s-muted)" }}>{c.stats.nicheRank}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 11, color: "var(--s-muted)", marginTop: 14 }}>
              Superscripts refer to the numbered sources at the end of this page. Populations are 2020 Census
              counts. School column shows the primary district&rsquo;s statewide Niche 2026 rank.
            </p>
          </div>
        </section>

        {/* ── Ranked cities ── */}
        <section className="bg-cream" style={{ padding: "90px 0" }}>
          <div className="container prose-site" style={{ maxWidth: 860 }}>
            <div className="s-eyebrow reveal">The ranking</div>
            <div style={{ display: "grid", gap: 70 }}>
              {rankedCities.map((c) => (
                <article key={c.city} id={c.city.toLowerCase().replace(/\s+/g, "-")} style={{ scrollMarginTop: 110 }}>
                  <div className="reveal" style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 6 }}>
                    <span
                      style={{
                        fontFamily: "var(--font-fraunces), Fraunces, serif",
                        fontSize: 46,
                        fontWeight: 600,
                        color: "var(--s-gold)",
                        lineHeight: 1,
                      }}
                    >
                      {c.rank}
                    </span>
                    <h2 style={{ margin: 0, fontSize: "clamp(26px, 3.2vw, 36px)" }}>{c.city}, MI</h2>
                  </div>
                  <p className="reveal" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--s-gold)", fontWeight: 600, marginBottom: 20 }}>
                    {c.bestFor} · {c.county}
                  </p>
                  <div
                    className="reveal"
                    style={{
                      borderRadius: 14,
                      background: "rgba(217,118,47,0.06)",
                      border: "1px solid rgba(217,118,47,0.22)",
                      padding: "18px 22px",
                      marginBottom: 22,
                    }}
                  >
                    <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.75, color: "var(--s-ink)" }}>{c.answer}</p>
                  </div>
                  {c.paragraphs.map((p, i) => (
                    <p key={i} className="reveal" style={{ fontSize: 15.5, lineHeight: 1.8, color: "var(--s-ink)" }}>
                      {p}
                    </p>
                  ))}
                  <div className="reveal" style={{ fontSize: 12.5, color: "var(--s-muted)", margin: "16px 0 10px" }}>
                    Schools: {c.stats.district}
                  </div>
                  <a
                    href={`/${c.citySlug}`}
                    className="reveal"
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--s-gold)", fontWeight: 600 }}
                  >
                    Read our full {c.city} buyer &amp; seller guide
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Methodology ── */}
        <section className="bg-cream-2" style={{ padding: "80px 0" }}>
          <div className="container prose-site" style={{ maxWidth: 800 }}>
            <div className="s-eyebrow reveal">How we ranked — and who&rsquo;s ranking</div>
            <p className="reveal">
              We are {company.name}, a residential brokerage headquartered in Troy that has worked all seven
              of these cities for over 20 years. That means two things: we know these markets house by house,
              and we are not a neutral party — we ranked our own home city #1. So we built this page to be
              checkable rather than taking our word for it.
            </p>
            <p className="reveal">
              The order weighs five factors: school district strength (Niche&rsquo;s 2026 Michigan ranking,
              plus district-boundary verification against official district and city sources), price
              accessibility (Zillow&rsquo;s June 2026 typical home value), market momentum (one-year change in
              that index, cross-checked against Redfin&rsquo;s sale-price and days-on-market data), lifestyle
              fit (our agents&rsquo; on-the-ground experience — labeled as such wherever it appears), and
              long-term demand anchors like employment corridors and walkability. The weighting is editorial
              judgment for a typical family buyer; your priorities may reorder the list, which is why every
              city entry names what it is best for.
            </p>
            <p className="reveal">
              What we deliberately did not do: quote any statistic without a source and a date, average two
              sources that disagree, or fill gaps with estimates. Where our two market sources conflict
              (Troy, Warren, Bloomfield Hills), we show both numbers and explain the gap. Where we could not
              verify something from a primary source — like post-2020 population estimates — we used the
              verifiable figure and said so. Populations are therefore 2020 Census counts, and Niche ranks
              are quoted as Niche&rsquo;s opinion, not the state&rsquo;s.
            </p>
            <p className="reveal">
              This page was last reviewed on July 27, 2026, and we update it as Zillow and Redfin publish new
              monthly data.
            </p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-cream" style={{ padding: "90px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="sec-head reveal">
              <div className="s-eyebrow">FAQ</div>
              <h2>Common questions, answered directly</h2>
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              {faqs.map((f) => (
                <details key={f.question} className="service-card reveal" style={{ padding: 0, overflow: "hidden" }}>
                  <summary
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "22px 26px",
                      cursor: "pointer",
                      fontSize: 15.5,
                      fontWeight: 600,
                      color: "var(--navy)",
                      listStyle: "none",
                    }}
                  >
                    {f.question}
                    <ChevronRight className="w-4 h-4" style={{ color: "var(--s-gold)", flexShrink: 0, marginLeft: 14 }} />
                  </summary>
                  <div style={{ padding: "0 26px 24px", color: "var(--s-muted)", fontSize: 14.5, lineHeight: 1.8 }}>
                    {f.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Sources ── */}
        <section className="bg-cream-2" style={{ padding: "70px 0" }}>
          <div className="container" style={{ maxWidth: 800 }}>
            <div className="s-eyebrow reveal">Sources</div>
            <ol style={{ display: "grid", gap: 16, fontSize: 13, color: "var(--s-muted)", listStyle: "none", padding: 0 }}>
              {citations.map((s) => (
                <li key={s.id} className="reveal" style={{ display: "flex", gap: 12 }}>
                  <span style={{ color: "var(--s-gold)", flexShrink: 0, fontWeight: 600 }}>{s.id}.</span>
                  <span>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", textUnderlineOffset: 4 }}>
                      {s.label}
                    </a>
                    <span> — accessed {s.accessed}.</span>
                    {s.note && <span style={{ display: "block", marginTop: 4 }}>{s.note}</span>}
                  </span>
                </li>
              ))}
            </ol>
            <p className="reveal" style={{ fontSize: 13, color: "var(--s-muted)", marginTop: 20 }}>
              Go deeper:{" "}
              <a href="/best-school-districts-metro-detroit" style={{ color: "var(--s-gold)", fontWeight: 600 }}>
                Metro Detroit school districts, ranked with home prices
              </a>{" "}
              ·{" "}
              <a href="/troy-vs-rochester-hills" style={{ color: "var(--s-gold)", fontWeight: 600 }}>
                Troy vs Rochester Hills
              </a>{" "}
              ·{" "}
              <a href="/troy-vs-birmingham" style={{ color: "var(--s-gold)", fontWeight: 600 }}>
                Troy vs Birmingham
              </a>{" "}
              ·{" "}
              <a href="/birmingham-vs-bloomfield-hills" style={{ color: "var(--s-gold)", fontWeight: 600 }}>
                Birmingham vs Bloomfield Hills
              </a>{" "}
              ·{" "}
              <a href="/sterling-heights-vs-warren" style={{ color: "var(--s-gold)", fontWeight: 600 }}>
                Sterling Heights vs Warren
              </a>{" "}
              ·{" "}
              <a href="/how-much-home-metro-detroit-budget" style={{ color: "var(--s-gold)", fontWeight: 600 }}>
                How much home your budget buys
              </a>
            </p>
          </div>
        </section>

        {/* ── CTA banner ── */}
        <section className="cta-banner">
          <div
            className="cta-bg"
            data-speed="0.4"
            style={{
              backgroundImage:
                "linear-gradient(120deg, rgba(22,24,29,0.92), rgba(22,24,29,0.72)), url('/areas/cta-interior.jpg')",
            }}
          />
          <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: 720, textAlign: "center" }}>
            <h2 className="reveal" style={{ color: "#fff", fontSize: "clamp(28px, 3.8vw, 44px)", marginBottom: 18 }}>
              Narrowed it to two or three?
            </h2>
            <p className="reveal" style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, marginBottom: 36 }}>
              Talk it through with an agent who closes in all seven of these cities. We&rsquo;ll tell you
              which one actually fits your budget, commute, and school priorities — including when the answer
              isn&rsquo;t Troy.
            </p>
            <div className="reveal" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/#contact" className="btn btn-gold">
                Ask us which city fits you
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href={`tel:${company.phoneTel}`} className="btn btn-outline">
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
