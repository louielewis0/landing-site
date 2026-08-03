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
const SLUG = "troy-vs-rochester-hills";
const URL = `${BASE}/${SLUG}`;

export const metadata: Metadata = {
  title: "Troy vs Rochester Hills (2026): Which Suburb Should You Buy In?",
  description:
    "Troy and Rochester Hills compared with sourced 2026 data — home values, sale prices, days on market, Niche school ranks (#3 vs #5), and who each suburb actually fits. By a Troy, MI brokerage that sells in both.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Troy vs Rochester Hills (2026): Which Suburb Should You Buy In?",
    description:
      "Home values, schools, market speed, and lifestyle — the two best family suburbs in Metro Detroit, compared with sourced data.",
    type: "article",
    locale: "en_US",
    url: URL,
  },
};

const CITED_IDS = [1, 2, 3, 4];

const faqs = [
  {
    question: "Is Troy or Rochester Hills better for families?",
    answer:
      "Both are top-tier: Troy School District ranks #3 and Rochester Community Schools #5 of Michigan's 538 districts (Niche, 2026), and their typical home values are within about $8,000 of each other (Zillow, June 2026). Troy wins on schools rank and corporate commutes; Rochester Hills wins on parks, trails, and downtown-Rochester lifestyle. The honest answer is your commute and weekends decide it, not school quality.",
  },
  {
    question: "Which is more expensive, Troy or Rochester Hills?",
    answer:
      "They're effectively tied. In June 2026, Zillow's typical home value was $480,334 in Rochester Hills and $472,471 in Troy — a gap of under 2%. Redfin's median sale price over the three months ending May 2026 was $434,740 in Rochester Hills and $435,739 in Troy — a gap of under $1,000.",
  },
  {
    question: "Which market moves faster?",
    answer:
      "Rochester Hills: a median of 15 days on market versus Troy's 20 (Redfin, three months ending May 2026), and Redfin labels Rochester Hills 'most competitive.' Both are fast markets — either way, come pre-approved.",
  },
  {
    question: "Which appreciated more over the past year?",
    answer:
      "The gauges split. Zillow's smoothed value index rose 3.6% in Rochester Hills vs 2.6% in Troy (year through June 2026). Redfin's mix-sensitive median sale price rose 2.3% in Rochester Hills while Troy's fell 5.9% — a spread that usually reflects which homes happened to sell, not a Troy decline. Where sources disagree, we show both.",
  },
  {
    question: "Do school boundaries follow city limits in either city?",
    answer:
      "No. Small pockets of Troy feed neighboring districts, and Rochester Community Schools serves Rochester, Rochester Hills, and Oakland Township with lines that don't follow municipal borders. Verify the exact attendance area for any address before you offer — in both cities it's a street-by-street question.",
  },
];

export default function TroyVsRochesterHillsPage() {
  const troy = rankedCities.find((c) => c.city === "Troy")!;
  const rh = rankedCities.find((c) => c.city === "Rochester Hills")!;
  const sources = citations.filter((c) => CITED_IDS.includes(c.id));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Troy vs Rochester Hills (2026): Which Suburb Should You Buy In?",
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
      { "@type": "ListItem", position: 2, name: "Troy vs Rochester Hills", item: URL },
    ],
  };

  const rows: { label: string; troy: string; rh: string; cite: string }[] = [
    { label: "Typical home value (Jun 2026)", troy: troy.stats.zhvi, rh: rh.stats.zhvi, cite: "¹" },
    { label: "1-yr change, value index", troy: troy.stats.zhviYoY, rh: rh.stats.zhviYoY, cite: "¹" },
    { label: "Median sale price (3 mo ending May 2026)", troy: troy.stats.medianSale, rh: rh.stats.medianSale, cite: "⁴" },
    { label: "1-yr change, sale price", troy: troy.stats.medianSaleYoY, rh: rh.stats.medianSaleYoY, cite: "⁴" },
    { label: "Median days on market", troy: troy.stats.dom, rh: rh.stats.dom, cite: "⁴" },
    { label: "Population (2020 Census)", troy: troy.stats.population, rh: rh.stats.population, cite: "²" },
    { label: "School district (Niche 2026)", troy: "Troy SD — #3 in MI", rh: "Rochester CS — #5 in MI", cite: "³" },
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
              <span style={{ color: "var(--navy)" }}>Troy vs Rochester Hills</span>
            </nav>

            <div className="s-eyebrow">
              <Scale className="w-3 h-3" style={{ marginRight: 2 }} />
              Head to head · 2026
            </div>

            <h1 style={{ fontSize: "clamp(32px, 4.4vw, 54px)", lineHeight: 1.12, marginBottom: 22 }}>
              Troy vs Rochester Hills: Which Suburb Should You Buy In?
            </h1>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", fontSize: 12.5, color: "var(--s-muted)", marginBottom: 34 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <CalendarDays className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />
                Published August 3, 2026 · market data through spring 2026, vintage stated per figure
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <Landmark className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />
                By {company.name} — headquartered in Troy, selling in both
              </span>
            </div>

            {/* TL;DR verdict */}
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
                It&rsquo;s a coin flip on price — under 2% apart on Zillow&rsquo;s June 2026 typical home
                value and under $1,000 apart on Redfin&rsquo;s median sale price — so the decision comes down
                to lifestyle. Choose <strong>Troy</strong> for the #3 school district in Michigan (Niche,
                2026), the Big Beaver corporate corridor, and I-75 commutes. Choose{" "}
                <strong>Rochester Hills</strong> for the #5 district plus the Paint Creek Trail, Stony Creek
                Metropark, and walkable downtown Rochester next door — and a slightly faster, more
                competitive market (15-day median vs 20). Full disclosure: our office is in Troy; the data
                below is sourced so you can check us.
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
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>Troy</th>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>Rochester Hills</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.label} style={{ borderTop: "1px solid var(--line)" }}>
                      <td style={{ padding: "15px 20px", color: "var(--s-muted)" }}>
                        {r.label}
                        <sup style={{ color: "var(--s-gold)" }}>{r.cite}</sup>
                      </td>
                      <td style={{ padding: "15px 20px", fontWeight: 600, color: "var(--s-ink)", fontVariantNumeric: "tabular-nums" }}>{r.troy}</td>
                      <td style={{ padding: "15px 20px", fontWeight: 600, color: "var(--s-ink)", fontVariantNumeric: "tabular-nums" }}>{r.rh}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 11, color: "var(--s-muted)", marginTop: 14 }}>
              Superscripts refer to the numbered sources at the end of this page. Where Zillow&rsquo;s index
              and Redfin&rsquo;s sale price disagree on momentum (they do for Troy), both are shown — a
              3-month median is mix-sensitive; the smoothed index isn&rsquo;t.
            </p>
          </div>
        </section>

        {/* ── Choose X if ── */}
        <section className="bg-cream" style={{ padding: "80px 0" }}>
          <div className="container" style={{ maxWidth: 860, display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            <div className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff", padding: 30 }}>
              <h2 style={{ fontSize: 24, marginBottom: 14 }}>Choose Troy if…</h2>
              <ul style={{ display: "grid", gap: 10, fontSize: 14.5, lineHeight: 1.7, color: "var(--s-ink)", paddingLeft: 18 }}>
                <li>The school rank matters to the decimal — Troy SD is #3 of 538 (Niche, 2026)</li>
                <li>You commute along I-75 / Big Beaver, or your employer sits in Troy&rsquo;s corporate corridor</li>
                <li>You want Somerset-corridor conveniences and a bigger condo/townhome market</li>
                <li>You&rsquo;re relocating on a corporate package and timelines are tight</li>
              </ul>
              <a href={`/${troy.citySlug}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--s-gold)", fontWeight: 600, marginTop: 18 }}>
                Full Troy guide <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff", padding: 30 }}>
              <h2 style={{ fontSize: 24, marginBottom: 14 }}>Choose Rochester Hills if…</h2>
              <ul style={{ display: "grid", gap: 10, fontSize: 14.5, lineHeight: 1.7, color: "var(--s-ink)", paddingLeft: 18 }}>
                <li>Weekends mean trails — Paint Creek, Stony Creek, and downtown Rochester on foot or bike</li>
                <li>You want the fastest-moving market of the two (15-day median; Redfin&rsquo;s &ldquo;most competitive&rdquo; label)</li>
                <li>Wooded lots and newer-construction pockets beat corridor convenience for you</li>
                <li>Oakland University proximity matters — or rental demand from it, if you invest</li>
              </ul>
              <a href={`/${rh.citySlug}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--s-gold)", fontWeight: 600, marginTop: 18 }}>
                Full Rochester Hills guide <ArrowRight className="w-3.5 h-3.5" />
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
            <h2 style={{ fontSize: "clamp(26px, 3.4vw, 40px)", marginBottom: 14 }}>Still split between the two?</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--s-muted)", marginBottom: 30 }}>
              We close in both cities every month. Tell us your commute, budget, and what a Saturday looks
              like — we&rsquo;ll tell you which side of the line fits, including when the answer isn&rsquo;t Troy.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/home-value" className="btn btn-gold">
                Ask us which one fits you <ArrowRight className="w-4 h-4" />
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
