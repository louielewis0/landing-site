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
const SLUG = "birmingham-vs-bloomfield-hills";
const URL = `${BASE}/${SLUG}`;

export const metadata: Metadata = {
  title: "Birmingham vs Bloomfield Hills (2026): Which Luxury Suburb Wins?",
  description:
    "Birmingham and Bloomfield Hills compared with sourced 2026 data — home values, sale prices, days on market, and Niche school ranks (#9 vs #7). Birmingham's typical value just passed Bloomfield Hills. By a Metro Detroit brokerage.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Birmingham vs Bloomfield Hills (2026): Which Luxury Suburb Wins?",
    description:
      "Walkable downtown vs gated estates — Metro Detroit's two premier luxury suburbs, compared with sourced data.",
    type: "article",
    locale: "en_US",
    url: URL,
  },
};

const CITED_IDS = [1, 2, 3, 4];

const faqs = [
  {
    question: "Is Birmingham or Bloomfield Hills more expensive?",
    answer:
      "It depends which gauge you read, and they now disagree in an interesting way. On Zillow's smoothed typical home value (June 2026), Birmingham ($757,616) has passed Bloomfield Hills ($690,654) — the walkable downtown now out-prices the gated estates next door. On Redfin's median sale price (three months ending May 2026), Bloomfield Hills is higher at $912,454 versus Birmingham's $817,511 — but Bloomfield Hills' figure rests on only 16 sales that quarter, so a couple of big estates swing the whole number. Both are Metro Detroit's top price tier.",
  },
  {
    question: "Which has better schools, Birmingham or Bloomfield Hills?",
    answer:
      "Both are top-ten in Michigan and close: Bloomfield Hills Schools ranks #7 and Birmingham Public Schools #9 of the state's 538 districts (Niche, 2026). The gap is small enough that neither should be the deciding factor — lifestyle and property type matter more between these two.",
  },
  {
    question: "What's the real difference between them?",
    answer:
      "Birmingham is a walkable downtown you can live on foot — restaurants and shops along Old Woodward, condos and tighter lots, a market that trades often (median 20 days on market). Bloomfield Hills is estates on acreage, privacy, and very low turnover: only about 4,460 residents (2020 Census), few homes trade each year, and they sit longer when they do (median 40 days). One is urban-luxury; the other is legacy-estate.",
  },
  {
    question: "Which market moves faster?",
    answer:
      "Birmingham, by a wide margin: a median of 20 days on market versus 40 in Bloomfield Hills (Redfin, three months ending May 2026). Bloomfield Hills' thin inventory and higher price points mean fewer buyers and longer marketing periods — normal for legacy-estate markets, not a weakness.",
  },
  {
    question: "Which appreciated more over the past year?",
    answer:
      "Birmingham on the smoothed index — up 6.4% in Zillow's value series (year through June 2026) versus 4.9% for Bloomfield Hills, and Birmingham's index passed Bloomfield Hills' in the process. Redfin's sale prices are noisier here because Bloomfield Hills trades so few homes; where the gauges conflict on a thin-volume city, trust the smoothed index.",
  },
];

export default function BirminghamVsBloomfieldHillsPage() {
  const bir = rankedCities.find((c) => c.city === "Birmingham")!;
  const bh = rankedCities.find((c) => c.city === "Bloomfield Hills")!;
  const sources = citations.filter((c) => CITED_IDS.includes(c.id));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Birmingham vs Bloomfield Hills (2026): Which Luxury Suburb Wins?",
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
      { "@type": "ListItem", position: 2, name: "Birmingham vs Bloomfield Hills", item: URL },
    ],
  };

  const rows: { label: string; bir: string; bh: string; cite: string }[] = [
    { label: "Typical home value (Jun 2026)", bir: bir.stats.zhvi, bh: bh.stats.zhvi, cite: "¹" },
    { label: "1-yr change, value index", bir: bir.stats.zhviYoY, bh: bh.stats.zhviYoY, cite: "¹" },
    { label: "Median sale price (3 mo ending May 2026)", bir: bir.stats.medianSale, bh: bh.stats.medianSale, cite: "⁴" },
    { label: "1-yr change, sale price", bir: bir.stats.medianSaleYoY, bh: bh.stats.medianSaleYoY, cite: "⁴" },
    { label: "Median days on market", bir: bir.stats.dom, bh: bh.stats.dom, cite: "⁴" },
    { label: "Population (2020 Census)", bir: bir.stats.population, bh: bh.stats.population, cite: "²" },
    { label: "School district (Niche 2026)", bir: "Birmingham PS — #9 in MI", bh: "Bloomfield Hills — #7 in MI", cite: "³" },
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
              <span style={{ color: "var(--navy)" }}>Birmingham vs Bloomfield Hills</span>
            </nav>

            <div className="s-eyebrow">
              <Scale className="w-3 h-3" style={{ marginRight: 2 }} />
              Head to head · 2026
            </div>

            <h1 style={{ fontSize: "clamp(32px, 4.4vw, 54px)", lineHeight: 1.12, marginBottom: 22 }}>
              Birmingham vs Bloomfield Hills: Which Luxury Suburb Wins?
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
                They&rsquo;re Metro Detroit&rsquo;s two premier luxury suburbs, and the headline is that
                Birmingham&rsquo;s typical home value ($757,616) has <strong>passed</strong> Bloomfield
                Hills&rsquo; ($690,654) in Zillow&rsquo;s June 2026 index — the walkable downtown now
                out-prices the gated estates next door. Choose <strong>Birmingham</strong> for a
                live-on-foot downtown, a market that actually trades (20-day median), and Michigan&rsquo;s
                #9 school district. Choose <strong>Bloomfield Hills</strong> for estates on acreage,
                privacy, the #7 district, and legacy-asset scarcity — just expect thin inventory and longer
                timelines. The data below is sourced so you can check us.
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
              <table style={{ width: "100%", textAlign: "left", fontSize: 13.5, minWidth: 560, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--line)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--s-muted)" }}>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>Metric</th>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>Birmingham</th>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>Bloomfield Hills</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.label} style={{ borderTop: "1px solid var(--line)" }}>
                      <td style={{ padding: "15px 20px", color: "var(--s-muted)" }}>
                        {r.label}
                        <sup style={{ color: "var(--s-gold)" }}>{r.cite}</sup>
                      </td>
                      <td style={{ padding: "15px 20px", fontWeight: 600, color: "var(--s-ink)", fontVariantNumeric: "tabular-nums" }}>{r.bir}</td>
                      <td style={{ padding: "15px 20px", fontWeight: 600, color: "var(--s-ink)", fontVariantNumeric: "tabular-nums" }}>{r.bh}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 11, color: "var(--s-muted)", marginTop: 14 }}>
              Superscripts refer to the numbered sources at the end of this page. Bloomfield Hills&rsquo;
              sale-price figures rest on very few transactions (about 16 in the sample quarter), so a
              handful of estates swings the median — we lean on the smoothed value index for that city and
              say so.
            </p>
          </div>
        </section>

        {/* ── Choose X if ── */}
        <section className="bg-cream" style={{ padding: "80px 0" }}>
          <div className="container" style={{ maxWidth: 860, display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            <div className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff", padding: 30 }}>
              <h2 style={{ fontSize: 24, marginBottom: 14 }}>Choose Birmingham if…</h2>
              <ul style={{ display: "grid", gap: 10, fontSize: 14.5, lineHeight: 1.7, color: "var(--s-ink)", paddingLeft: 18 }}>
                <li>You want to live on foot — dinner, shops, and offices along Old Woodward</li>
                <li>You&rsquo;d rather have a condo or townhome near a downtown than acreage</li>
                <li>You want a market that actually trades, so there&rsquo;s inventory to choose from</li>
                <li>Fastest one-year growth of the two on the value index matters to you (+6.4%)</li>
              </ul>
              <a href={`/${bir.citySlug}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--s-gold)", fontWeight: 600, marginTop: 18 }}>
                Full Birmingham guide <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff", padding: 30 }}>
              <h2 style={{ fontSize: 24, marginBottom: 14 }}>Choose Bloomfield Hills if…</h2>
              <ul style={{ display: "grid", gap: 10, fontSize: 14.5, lineHeight: 1.7, color: "var(--s-ink)", paddingLeft: 18 }}>
                <li>You want land, privacy, and architecture over walkability</li>
                <li>Legacy-asset scarcity appeals — very few homes trade here each year</li>
                <li>The #7 school district and estate prestige anchor the decision</li>
                <li>You have patience: thin inventory and a 40-day median mean the right home takes time</li>
              </ul>
              <a href={`/${bh.citySlug}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--s-gold)", fontWeight: 600, marginTop: 18 }}>
                Full Bloomfield Hills guide <ArrowRight className="w-3.5 h-3.5" />
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
              and{" "}
              <a href="/best-school-districts-metro-detroit" style={{ color: "var(--s-gold)", fontWeight: 600 }}>
                the best school districts in Metro Detroit
              </a>
              .
            </p>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-cream-2" style={{ padding: "80px 0 100px", textAlign: "center" }}>
          <div className="container" style={{ maxWidth: 640 }}>
            <h2 style={{ fontSize: "clamp(26px, 3.4vw, 40px)", marginBottom: 14 }}>Buying — or selling — at this level?</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--s-muted)", marginBottom: 30 }}>
              Luxury and estate transactions reward discretion and pricing precision. We handle both cities
              with the confidentiality and market knowledge this tier demands.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/home-value" className="btn btn-gold">
                Talk to us privately <ArrowRight className="w-4 h-4" />
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
