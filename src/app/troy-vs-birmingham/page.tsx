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
const SLUG = "troy-vs-birmingham";
const URL = `${BASE}/${SLUG}`;

export const metadata: Metadata = {
  title: "Troy vs Birmingham MI (2026): Which Suburb Should You Buy In?",
  description:
    "Troy vs Birmingham compared with sourced 2026 data — home values ($472K vs $758K), sale prices, appreciation, and Niche school ranks (#3 vs #9). Value and top schools, or a walkable downtown? By a Troy, MI brokerage that sells in both.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Troy vs Birmingham MI (2026): Which Suburb Should You Buy In?",
    description:
      "Home values, schools, appreciation, and lifestyle — Metro Detroit's value-and-schools pick vs its walkable luxury suburb, compared with sourced data.",
    type: "article",
    locale: "en_US",
    url: URL,
  },
};

const CITED_IDS = [1, 2, 3, 4];

const faqs = [
  {
    question: "Is Troy or Birmingham better for families?",
    answer:
      "For schools on paper, Troy: Troy School District ranks #3 of Michigan's 538 districts versus Birmingham Public Schools at #9 (Niche, 2026), and Troy's typical home value is roughly $285,000 lower (Zillow, June 2026). Birmingham's draw is a walkable downtown you can raise kids around rather than a higher school rank. If the decision is schools and value, Troy wins; if it's lifestyle, Birmingham makes its case.",
  },
  {
    question: "Which is more expensive, Troy or Birmingham?",
    answer:
      "Birmingham, by a wide margin. In June 2026, Zillow's typical home value was $757,616 in Birmingham versus $472,471 in Troy — about $285,000, or 60%, higher. Redfin's median sale price over the three months ending May 2026 was $817,511 in Birmingham versus $435,739 in Troy. Birmingham is one of Metro Detroit's most expensive suburbs; Troy is a value play by comparison.",
  },
  {
    question: "Which is appreciating faster?",
    answer:
      "Birmingham, on both gauges. Zillow's smoothed value index rose 6.4% in Birmingham versus 2.6% in Troy in the year through June 2026, and Redfin's median sale price rose 12.8% in Birmingham while Troy's fell 5.9%. Troy's sale-price dip is mix-sensitive — a 3-month median moves with which homes happened to sell — so read it as steady, not falling. Either way, Birmingham was the hotter market this cycle.",
  },
  {
    question: "Is Birmingham worth the premium over Troy?",
    answer:
      "It depends what you're buying. Birmingham's premium buys a genuinely walkable downtown — restaurants, shops, and offices along Old Woodward — which is rare in Michigan, plus faster appreciation. But at roughly $285,000 more for a #9 school district against Troy's #3, it's a lifestyle purchase, not a schools upgrade. If the walkable core is the point, the premium is real value. If it isn't, your money goes further in Troy.",
  },
  {
    question: "Do school boundaries follow city limits in either city?",
    answer:
      "No. In both cities, attendance areas don't follow municipal borders — small pockets feed neighboring districts. Verify the exact attendance area for any specific address before you offer; in Troy and Birmingham alike it's a street-by-street question, not a city-wide one.",
  },
];

export default function TroyVsBirminghamPage() {
  const troy = rankedCities.find((c) => c.city === "Troy")!;
  const bham = rankedCities.find((c) => c.city === "Birmingham")!;
  const sources = citations.filter((c) => CITED_IDS.includes(c.id));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Troy vs Birmingham MI (2026): Which Suburb Should You Buy In?",
    datePublished: "2026-08-26",
    dateModified: "2026-08-26",
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
      { "@type": "ListItem", position: 2, name: "Troy vs Birmingham", item: URL },
    ],
  };

  const rows: { label: string; troy: string; bham: string; cite: string }[] = [
    { label: "Typical home value (Jun 2026)", troy: troy.stats.zhvi, bham: bham.stats.zhvi, cite: "¹" },
    { label: "1-yr change, value index", troy: troy.stats.zhviYoY, bham: bham.stats.zhviYoY, cite: "¹" },
    { label: "Median sale price (3 mo ending May 2026)", troy: troy.stats.medianSale, bham: bham.stats.medianSale, cite: "⁴" },
    { label: "1-yr change, sale price", troy: troy.stats.medianSaleYoY, bham: bham.stats.medianSaleYoY, cite: "⁴" },
    { label: "Median days on market", troy: troy.stats.dom, bham: bham.stats.dom, cite: "⁴" },
    { label: "Population (2020 Census)", troy: troy.stats.population, bham: bham.stats.population, cite: "²" },
    { label: "School district (Niche 2026)", troy: "Troy SD — #3 in MI", bham: "Birmingham PS — #9 in MI", cite: "³" },
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
              <span style={{ color: "var(--navy)" }}>Troy vs Birmingham</span>
            </nav>

            <div className="s-eyebrow">
              <Scale className="w-3 h-3" style={{ marginRight: 2 }} />
              Head to head · 2026
            </div>

            <h1 style={{ fontSize: "clamp(32px, 4.4vw, 54px)", lineHeight: 1.12, marginBottom: 22 }}>
              Troy vs Birmingham: Which Suburb Should You Buy In?
            </h1>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", fontSize: 12.5, color: "var(--s-muted)", marginBottom: 34 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <CalendarDays className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />
                Published August 26, 2026 · market data through spring 2026, vintage stated per figure
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
                These two aren&rsquo;t close on price: Birmingham&rsquo;s typical home value was about{" "}
                <strong>$285,000 higher</strong> than Troy&rsquo;s in June 2026 (Zillow), and it appreciated
                faster on both gauges. Choose <strong>Birmingham</strong> if you&rsquo;re buying the
                walkable Old Woodward downtown — restaurants and shops on foot, one of the few truly
                walkable cores in Michigan — and you want the hottest resale market of the pair. Choose{" "}
                <strong>Troy</strong> if you want Michigan&rsquo;s <strong>#3 school district</strong>{" "}
                (Niche, 2026) at roughly 60% of Birmingham&rsquo;s price, plus the Big Beaver corporate
                corridor and I-75 commutes. Honest framing: Birmingham&rsquo;s premium is a lifestyle
                purchase, not a schools upgrade — Troy&rsquo;s #3 beats Birmingham&rsquo;s #9. Our office is
                in Troy; every figure below is sourced so you can check us.
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
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>Birmingham</th>
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
                      <td style={{ padding: "15px 20px", fontWeight: 600, color: "var(--s-ink)", fontVariantNumeric: "tabular-nums" }}>{r.bham}</td>
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
                <li>Schools are the priority — Troy SD is #3 of 538 in Michigan, six spots above Birmingham (Niche, 2026)</li>
                <li>You want a top-tier suburb without a $750K+ entry point — Troy&rsquo;s typical value is roughly 60% of Birmingham&rsquo;s</li>
                <li>You commute along I-75 / Big Beaver or work in Troy&rsquo;s corporate corridor</li>
                <li>You want a deeper condo and townhome market and more inventory to choose from</li>
              </ul>
              <a href={`/${troy.citySlug}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--s-gold)", fontWeight: 600, marginTop: 18 }}>
                Full Troy guide <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff", padding: 30 }}>
              <h2 style={{ fontSize: 24, marginBottom: 14 }}>Choose Birmingham if…</h2>
              <ul style={{ display: "grid", gap: 10, fontSize: 14.5, lineHeight: 1.7, color: "var(--s-ink)", paddingLeft: 18 }}>
                <li>A truly walkable downtown is the whole point — dining, shops, and offices along Old Woodward</li>
                <li>You want the hottest resale market of the two — the fastest appreciation on both Zillow and Redfin</li>
                <li>The budget clears $750K+ and the lifestyle premium is worth more to you than the schools rank</li>
                <li>Walk-to-everything and downtown-adjacent architecture beat corridor convenience and lot size</li>
              </ul>
              <a href={`/${bham.citySlug}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--s-gold)", fontWeight: 600, marginTop: 18 }}>
                Full Birmingham guide <ArrowRight className="w-3.5 h-3.5" />
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
              Weighing other suburbs too? See{" "}
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
              We close in both cities. Tell us your budget, your commute, and whether a walkable downtown is
              a must-have — we&rsquo;ll tell you which side of the line fits, including when the honest
              answer is Troy over the pricier option.
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
