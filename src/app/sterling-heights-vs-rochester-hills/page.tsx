import type { Metadata } from "next";
import SiteShell from "@/components/site/SiteShell";
import { company } from "@/lib/config";
import { citations, rankedCities } from "@/lib/best-suburbs-guide";
import { ArrowRight, ChevronRight, CalendarDays, Landmark, Scale, Phone, MapPin } from "lucide-react";

const BASE = "https://marketcenterrealty.com";
const SLUG = "sterling-heights-vs-rochester-hills";
const URL = `${BASE}/${SLUG}`;

export const metadata: Metadata = {
  title: "Sterling Heights vs Rochester Hills (2026): Value or Top Schools?",
  description:
    "Sterling Heights vs Rochester Hills compared with sourced 2026 data — home values ~$165K apart, schools (Utica #72 vs Rochester #5), and market speed (both fast). The Macomb value play vs the Oakland family standard. By a Metro Detroit brokerage.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Sterling Heights vs Rochester Hills (2026): Value or Top Schools?",
    description: "Macomb affordability vs an Oakland top-five district — compared with sourced data.",
    type: "article",
    locale: "en_US",
    url: URL,
  },
};

const CITED_IDS = [1, 2, 3, 4, 5];

const faqs = [
  {
    question: "How much cheaper is Sterling Heights than Rochester Hills?",
    answer:
      "About $165,000 at the typical-home-value level: Sterling Heights is $315,750 versus Rochester Hills' $480,334 (Zillow, June 2026). Sterling Heights is a Macomb County value market; Rochester Hills is an upper-mid Oakland County family market.",
  },
  {
    question: "Which has better schools?",
    answer:
      "Rochester Hills, clearly. Rochester Community Schools ranks #5 of Michigan's 538 districts (Niche, 2026). Sterling Heights' north side is served by Utica Community Schools at #72 — still a top-75 district and genuinely strong, but not top-five. If the highest school rank is the priority, Rochester Hills is the pick; if a strong district at a much lower price works, Sterling Heights delivers.",
  },
  {
    question: "Which is the better value?",
    answer:
      "It depends on your priority. Sterling Heights is the value play outright — roughly $165K less for a top-75 district (north side) and a fast market. Rochester Hills costs more but buys a top-five district, larger lots, and the trail-and-park lifestyle. For a budget-focused first-time buyer, Sterling Heights; for a family set on a top district who can afford the step up, Rochester Hills.",
  },
  {
    question: "Which market moves faster?",
    answer:
      "They're tied — both sold in a median of 15 days over the three months ending May 2026 (Redfin), among the fastest markets in Metro Detroit. Come pre-approved either way; well-priced homes don't sit long in either city.",
  },
  {
    question: "Are they in the same county?",
    answer:
      "No. Sterling Heights is in Macomb County; Rochester Hills is in Oakland County. They're close enough for a short commute between them, but sit in different counties with different tax structures and school systems — part of why their price tiers differ.",
  },
];

export default function SterlingHeightsVsRochesterHillsPage() {
  const sh = rankedCities.find((c) => c.city === "Sterling Heights")!;
  const rh = rankedCities.find((c) => c.city === "Rochester Hills")!;
  const sources = citations.filter((c) => CITED_IDS.includes(c.id));

  const articleSchema = {
    "@context": "https://schema.org", "@type": "Article",
    headline: "Sterling Heights vs Rochester Hills (2026): Value or Top Schools?",
    datePublished: "2026-09-21", dateModified: "2026-09-21", url: URL,
    author: { "@type": "Organization", name: company.name, url: BASE },
    publisher: { "@type": "Organization", name: company.name, url: BASE },
  };
  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Sterling Heights vs Rochester Hills", item: URL },
    ],
  };

  const rows: { label: string; sh: string; rh: string; cite: string }[] = [
    { label: "Typical home value (Jun 2026)", sh: sh.stats.zhvi, rh: rh.stats.zhvi, cite: "¹" },
    { label: "1-yr change, value index", sh: sh.stats.zhviYoY, rh: rh.stats.zhviYoY, cite: "¹" },
    { label: "Median sale price (3 mo ending May 2026)", sh: sh.stats.medianSale, rh: rh.stats.medianSale, cite: "⁴" },
    { label: "Median days on market", sh: sh.stats.dom, rh: rh.stats.dom, cite: "⁴" },
    { label: "Population (2020 Census)", sh: sh.stats.population, rh: rh.stats.population, cite: "²" },
    { label: "County", sh: "Macomb", rh: "Oakland", cite: "²" },
    { label: "Schools (Niche 2026)", sh: "Utica CS #72 (north) / Warren Consolidated", rh: "Rochester CS — #5 in MI", cite: "³⁵" },
  ];

  return (
    <SiteShell>
      <main style={{ paddingTop: 24 }} className="bg-cream">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

        <section className="bg-cream" style={{ padding: "50px 0 60px" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--s-muted)", marginBottom: 34 }}>
              <a href="/">Home</a><ChevronRight className="w-3 h-3" /><span style={{ color: "var(--navy)" }}>Sterling Heights vs Rochester Hills</span>
            </nav>
            <div className="s-eyebrow"><Scale className="w-3 h-3" style={{ marginRight: 2 }} />Head to head · 2026</div>
            <h1 style={{ fontSize: "clamp(32px, 4.4vw, 54px)", lineHeight: 1.12, marginBottom: 22 }}>Sterling Heights vs Rochester Hills: Value or Top Schools?</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", fontSize: 12.5, color: "var(--s-muted)", marginBottom: 34 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><CalendarDays className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />Published September 21, 2026 · vintage stated per figure</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><Landmark className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />By {company.name} — a Metro Detroit brokerage selling in both</span>
            </div>
            <div className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid rgba(217,118,47,0.3)", background: "rgba(217,118,47,0.06)", padding: 30 }}>
              <div className="s-eyebrow">The short answer</div>
              <p style={{ fontSize: 16.5, lineHeight: 1.8, color: "var(--s-ink)" }}>
                About $165,000 separates them — Sterling Heights at $315,750 vs Rochester Hills at $480,334
                (Zillow, June 2026) — and the trade is clean. <strong>Sterling Heights</strong> is the Macomb
                County value play: a top-75 district (Utica, north side) and a fast market at a much lower
                price. <strong>Rochester Hills</strong> is the Oakland County family standard: a top-five
                district, larger lots, and trails. Notably, both sell in a median of 15 days — among the
                fastest in the region. Choose on budget and how much the #5 district matters. Everything below
                is sourced.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-cream-2" style={{ padding: "70px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal"><div className="s-eyebrow">Head to head</div><h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", marginBottom: 26 }}>The numbers, side by side</h2></div>
            <div className="reveal" style={{ overflowX: "auto", borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff" }}>
              <table style={{ width: "100%", textAlign: "left", fontSize: 13.5, minWidth: 620, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--line)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--s-muted)" }}>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>Metric</th>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>Sterling Heights</th>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>Rochester Hills</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.label} style={{ borderTop: "1px solid var(--line)" }}>
                      <td style={{ padding: "15px 20px", color: "var(--s-muted)" }}>{r.label}<sup style={{ color: "var(--s-gold)" }}>{r.cite}</sup></td>
                      <td style={{ padding: "15px 20px", fontWeight: 600, color: "var(--s-ink)", fontVariantNumeric: "tabular-nums" }}>{r.sh}</td>
                      <td style={{ padding: "15px 20px", fontWeight: 600, color: "var(--s-ink)", fontVariantNumeric: "tabular-nums" }}>{r.rh}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 11, color: "var(--s-muted)", marginTop: 14 }}>Superscripts refer to the numbered sources at the end of this page.</p>
          </div>
        </section>

        <section className="bg-cream" style={{ padding: "80px 0" }}>
          <div className="container" style={{ maxWidth: 860, display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            <div className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff", padding: 30 }}>
              <h2 style={{ fontSize: 24, marginBottom: 14 }}>Choose Sterling Heights if…</h2>
              <ul style={{ display: "grid", gap: 10, fontSize: 14.5, lineHeight: 1.7, color: "var(--s-ink)", paddingLeft: 18 }}>
                <li>You want ~$165K more house-for-the-money or a lower payment</li>
                <li>A north-side Utica Community Schools address (#72) covers your needs</li>
                <li>You&rsquo;re a first-time or value-focused buyer in Macomb County</li>
                <li>A fast market at an affordable price is the goal</li>
              </ul>
              <a href={`/${sh.citySlug}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--s-gold)", fontWeight: 600, marginTop: 18 }}>Full Sterling Heights guide <ArrowRight className="w-3.5 h-3.5" /></a>
            </div>
            <div className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff", padding: 30 }}>
              <h2 style={{ fontSize: 24, marginBottom: 14 }}>Choose Rochester Hills if…</h2>
              <ul style={{ display: "grid", gap: 10, fontSize: 14.5, lineHeight: 1.7, color: "var(--s-ink)", paddingLeft: 18 }}>
                <li>A top-five school district (#5) is worth the higher price</li>
                <li>You want larger lots and Oakland County location</li>
                <li>Trails and parks — Paint Creek, Stony Creek — are your weekends</li>
                <li>Long-term value retention matters more than the lowest payment</li>
              </ul>
              <a href={`/${rh.citySlug}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--s-gold)", fontWeight: 600, marginTop: 18 }}>Full Rochester Hills guide <ArrowRight className="w-3.5 h-3.5" /></a>
            </div>
          </div>
        </section>

        <section className="bg-cream-2" style={{ padding: "80px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal"><div className="s-eyebrow">FAQ</div><h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", marginBottom: 30 }}>Common questions, answered directly</h2></div>
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

        <section className="bg-cream" style={{ padding: "60px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="s-eyebrow">Sources</div>
            <ol style={{ display: "grid", gap: 14, fontSize: 13, color: "var(--s-muted)", listStyle: "none", padding: 0 }}>
              {sources.map((s) => (
                <li key={s.id} style={{ display: "flex", gap: 12 }}>
                  <span style={{ color: "var(--s-gold)", flexShrink: 0 }}>{s.id}.</span>
                  <span>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", textUnderlineOffset: 4 }}>{s.label}</a>
                    <span style={{ opacity: 0.7 }}> — accessed {s.accessed}.</span>
                    {s.note && <span style={{ display: "block", opacity: 0.7, marginTop: 4 }}>{s.note}</span>}
                  </span>
                </li>
              ))}
            </ol>
            <p style={{ fontSize: 13, color: "var(--s-muted)", marginTop: 18 }}>
              Comparing across the county line?{" "}
              <a href="/oakland-county-vs-macomb-county" style={{ color: "var(--s-gold)", fontWeight: 600 }}>Oakland County vs Macomb County</a>{" "}·{" "}
              <a href="/sterling-heights-vs-warren" style={{ color: "var(--s-gold)", fontWeight: 600 }}>Sterling Heights vs Warren</a>.
            </p>
          </div>
        </section>

        <section className="bg-cream-2" style={{ padding: "80px 0 100px", textAlign: "center" }}>
          <div className="container" style={{ maxWidth: 640 }}>
            <h2 style={{ fontSize: "clamp(26px, 3.4vw, 40px)", marginBottom: 14 }}>Value or the top district?</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--s-muted)", marginBottom: 30 }}>
              Tell us your budget and school priorities and we&rsquo;ll run the real monthly numbers each way —
              so the choice is math, not guesswork.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/home-value" className="btn btn-gold">Run my numbers <ArrowRight className="w-4 h-4" /></a>
              <a href={`tel:${company.phoneTel}`} className="btn btn-ghost"><Phone className="w-4 h-4" />{company.phone}</a>
            </div>
            <p style={{ fontSize: 12, color: "var(--s-muted)", marginTop: 26, display: "inline-flex", alignItems: "center", gap: 8 }}>
              <MapPin className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />{company.address}
            </p>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
