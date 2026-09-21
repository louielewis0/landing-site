import type { Metadata } from "next";
import SiteShell from "@/components/site/SiteShell";
import { company } from "@/lib/config";
import { citations, rankedCities } from "@/lib/best-suburbs-guide";
import { ArrowRight, ChevronRight, CalendarDays, Landmark, Scale, Phone, MapPin } from "lucide-react";

const BASE = "https://marketcenterrealty.com";
const SLUG = "troy-vs-sterling-heights";
const URL = `${BASE}/${SLUG}`;

export const metadata: Metadata = {
  title: "Troy vs Sterling Heights (2026): Is Troy Worth the Extra $150K?",
  description:
    "Troy vs Sterling Heights compared with sourced 2026 data — home values, schools (#3 vs Utica #72), market speed, and county lines. Is Troy's premium worth it, or is Sterling Heights the smarter value? By a Metro Detroit brokerage.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Troy vs Sterling Heights (2026): Is Troy Worth the Extra $150K?",
    description: "Top-3 schools and Oakland prestige vs Macomb value — compared with sourced data.",
    type: "article",
    locale: "en_US",
    url: URL,
  },
};

const CITED_IDS = [1, 2, 3, 4, 5];

const faqs = [
  {
    question: "How much more expensive is Troy than Sterling Heights?",
    answer:
      "About $157,000 at the typical-home-value level: Troy's is $472,471 versus Sterling Heights' $315,750 (Zillow, June 2026). Redfin's median sale price shows the same gap — $435,739 in Troy versus $319,759 in Sterling Heights (three months ending May 2026). Troy is an Oakland County move-up market; Sterling Heights is a Macomb County value market.",
  },
  {
    question: "Which has better schools, Troy or Sterling Heights?",
    answer:
      "Troy, on the rankings. The Troy School District ranks #3 of Michigan's 538 districts (Niche, 2026). Sterling Heights' north side is served by Utica Community Schools, ranked #72 — still strong, and its south side is Warren Consolidated. Both are solid; Troy's district is the higher-ranked, and that premium is a real part of Troy's higher price.",
  },
  {
    question: "Is Troy worth the extra money?",
    answer:
      "It depends on what you're buying. Troy's premium buys the #3 school district, Oakland County location, and a corporate employment corridor — and Troy homes have historically held value well. Sterling Heights gets you a top-75 district (north side) and materially lower monthly payments. For a family set on top-tier schools who can afford it, Troy is worth it; for a buyer who prioritizes payment and square footage, Sterling Heights is the smarter value.",
  },
  {
    question: "Which market moves faster?",
    answer:
      "Sterling Heights: a median of 15 days on market versus Troy's 20 (Redfin, three months ending May 2026). Both are competitive — come pre-approved either way.",
  },
  {
    question: "Are Troy and Sterling Heights in the same county?",
    answer:
      "No. Troy is in Oakland County; Sterling Heights is in Macomb County. They border each other, so the commute between them is short, but they sit in different counties with different tax and school-district structures — one reason their price tiers differ.",
  },
];

export default function TroyVsSterlingHeightsPage() {
  const troy = rankedCities.find((c) => c.city === "Troy")!;
  const sh = rankedCities.find((c) => c.city === "Sterling Heights")!;
  const sources = citations.filter((c) => CITED_IDS.includes(c.id));

  const articleSchema = {
    "@context": "https://schema.org", "@type": "Article",
    headline: "Troy vs Sterling Heights (2026): Is Troy Worth the Extra $150K?",
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
      { "@type": "ListItem", position: 2, name: "Troy vs Sterling Heights", item: URL },
    ],
  };

  const rows: { label: string; troy: string; sh: string; cite: string }[] = [
    { label: "Typical home value (Jun 2026)", troy: troy.stats.zhvi, sh: sh.stats.zhvi, cite: "¹" },
    { label: "1-yr change, value index", troy: troy.stats.zhviYoY, sh: sh.stats.zhviYoY, cite: "¹" },
    { label: "Median sale price (3 mo ending May 2026)", troy: troy.stats.medianSale, sh: sh.stats.medianSale, cite: "⁴" },
    { label: "Median days on market", troy: troy.stats.dom, sh: sh.stats.dom, cite: "⁴" },
    { label: "Population (2020 Census)", troy: troy.stats.population, sh: sh.stats.population, cite: "²" },
    { label: "County", troy: "Oakland", sh: "Macomb", cite: "²" },
    { label: "Schools (Niche 2026)", troy: "Troy SD — #3 in MI", sh: "Utica CS #72 (north) / Warren Consolidated", cite: "³⁵" },
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
              <a href="/">Home</a><ChevronRight className="w-3 h-3" /><span style={{ color: "var(--navy)" }}>Troy vs Sterling Heights</span>
            </nav>
            <div className="s-eyebrow"><Scale className="w-3 h-3" style={{ marginRight: 2 }} />Head to head · 2026</div>
            <h1 style={{ fontSize: "clamp(32px, 4.4vw, 54px)", lineHeight: 1.12, marginBottom: 22 }}>Troy vs Sterling Heights: Is Troy Worth the Extra $150K?</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", fontSize: 12.5, color: "var(--s-muted)", marginBottom: 34 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><CalendarDays className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />Published September 21, 2026 · vintage stated per figure</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><Landmark className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />By {company.name} — headquartered in Troy, selling in both</span>
            </div>
            <div className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid rgba(217,118,47,0.3)", background: "rgba(217,118,47,0.06)", padding: 30 }}>
              <div className="s-eyebrow">The short answer</div>
              <p style={{ fontSize: 16.5, lineHeight: 1.8, color: "var(--s-ink)" }}>
                About $157,000 separates them — Troy&rsquo;s typical value is $472,471 vs Sterling Heights&rsquo;
                $315,750 (Zillow, June 2026) — and that gap buys three things: Michigan&rsquo;s #3 school
                district, an Oakland County address, and a corporate employment corridor. <strong>Choose
                Troy</strong> if top-tier schools and long-term value justify the higher payment. <strong>Choose
                Sterling Heights</strong> if you want a genuinely strong district (Utica #72 on the north side),
                a faster market, and a payment that leaves room to breathe. Full disclosure: our office is in
                Troy; the data below is sourced so you can check us.
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
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>Troy</th>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>Sterling Heights</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.label} style={{ borderTop: "1px solid var(--line)" }}>
                      <td style={{ padding: "15px 20px", color: "var(--s-muted)" }}>{r.label}<sup style={{ color: "var(--s-gold)" }}>{r.cite}</sup></td>
                      <td style={{ padding: "15px 20px", fontWeight: 600, color: "var(--s-ink)", fontVariantNumeric: "tabular-nums" }}>{r.troy}</td>
                      <td style={{ padding: "15px 20px", fontWeight: 600, color: "var(--s-ink)", fontVariantNumeric: "tabular-nums" }}>{r.sh}</td>
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
              <h2 style={{ fontSize: 24, marginBottom: 14 }}>Choose Troy if…</h2>
              <ul style={{ display: "grid", gap: 10, fontSize: 14.5, lineHeight: 1.7, color: "var(--s-ink)", paddingLeft: 18 }}>
                <li>The #3 school district is worth paying for</li>
                <li>You want an Oakland County address and the Big Beaver corporate corridor</li>
                <li>Long-term value retention matters more than the lowest monthly payment</li>
                <li>You&rsquo;re relocating on a corporate package with a stronger budget</li>
              </ul>
              <a href={`/${troy.citySlug}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--s-gold)", fontWeight: 600, marginTop: 18 }}>Full Troy guide <ArrowRight className="w-3.5 h-3.5" /></a>
            </div>
            <div className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff", padding: 30 }}>
              <h2 style={{ fontSize: 24, marginBottom: 14 }}>Choose Sterling Heights if…</h2>
              <ul style={{ display: "grid", gap: 10, fontSize: 14.5, lineHeight: 1.7, color: "var(--s-ink)", paddingLeft: 18 }}>
                <li>You want ~$150K more house-for-the-money, or a lower payment</li>
                <li>A north-side Utica Community Schools address (#72 in MI) covers your school needs</li>
                <li>You value a faster market and Macomb County&rsquo;s lower cost structure</li>
                <li>You&rsquo;re a first-time or move-up buyer stretching the budget wisely</li>
              </ul>
              <a href={`/${sh.citySlug}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--s-gold)", fontWeight: 600, marginTop: 18 }}>Full Sterling Heights guide <ArrowRight className="w-3.5 h-3.5" /></a>
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
              Weighing more options? See{" "}
              <a href="/best-metro-detroit-suburbs" style={{ color: "var(--s-gold)", fontWeight: 600 }}>all seven suburbs ranked</a>{" "}
              or{" "}
              <a href="/how-much-home-metro-detroit-budget" style={{ color: "var(--s-gold)", fontWeight: 600 }}>how much home your budget buys</a>.
            </p>
          </div>
        </section>

        <section className="bg-cream-2" style={{ padding: "80px 0 100px", textAlign: "center" }}>
          <div className="container" style={{ maxWidth: 640 }}>
            <h2 style={{ fontSize: "clamp(26px, 3.4vw, 40px)", marginBottom: 14 }}>Weighing the trade-off?</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--s-muted)", marginBottom: 30 }}>
              We close in both cities every month. Tell us your budget and school priorities and we&rsquo;ll
              run the real numbers — including what your monthly payment looks like each way.
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
