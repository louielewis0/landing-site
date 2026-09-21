import type { Metadata } from "next";
import SiteShell from "@/components/site/SiteShell";
import { company } from "@/lib/config";
import { citations, rankedCities } from "@/lib/best-suburbs-guide";
import { ArrowRight, ChevronRight, CalendarDays, Landmark, Scale, Phone, MapPin } from "lucide-react";

const BASE = "https://marketcenterrealty.com";
const SLUG = "west-bloomfield-vs-bloomfield-hills";
const URL = `${BASE}/${SLUG}`;

export const metadata: Metadata = {
  title: "West Bloomfield vs Bloomfield Hills (2026): They're Not the Same Place",
  description:
    "West Bloomfield and Bloomfield Hills are constantly confused but couldn't be more different — a lake-living township vs a tiny estate city. Compared with sourced 2026 home values, schools, and who each fits. By a Metro Detroit brokerage.",
  alternates: { canonical: URL },
  openGraph: {
    title: "West Bloomfield vs Bloomfield Hills (2026): They're Not the Same Place",
    description: "Lake township vs estate city — the two 'Bloomfields' compared with sourced data.",
    type: "article",
    locale: "en_US",
    url: URL,
  },
};

const CITED_IDS = [1, 2, 3, 4, 7];

const faqs = [
  {
    question: "Are West Bloomfield and Bloomfield Hills the same place?",
    answer:
      "No — they're two separate municipalities in Oakland County that people constantly confuse because they share the 'Bloomfield' name. West Bloomfield is a charter township of about 65,888 residents (2020 Census) built around more than a dozen lakes. Bloomfield Hills is a small city of only about 4,460 residents known for large estates on acreage. Different governments, different price tiers, different daily life.",
  },
  {
    question: "Which is more expensive, West Bloomfield or Bloomfield Hills?",
    answer:
      "Bloomfield Hills, by a wide margin. Its typical home value is $690,654 versus West Bloomfield's $466,635 (Zillow, June 2026) — a gap of about $224,000. Bloomfield Hills is one of Metro Detroit's top luxury tiers; West Bloomfield is a mid-priced family-and-lake market.",
  },
  {
    question: "Which has better schools?",
    answer:
      "By Niche's 2026 Michigan ranking, Bloomfield Hills Schools (#7 of 538) ranks higher than the West Bloomfield School District (#30). Both are strong; #30 statewide is still well above average. In both communities, district boundaries don't perfectly follow municipal lines, so verify the exact attendance area for any specific address before you offer.",
  },
  {
    question: "What is West Bloomfield known for?",
    answer:
      "Lakes and diversity. The township surrounds Cass, Pine, Orchard, Walnut, and other lakes, so lakefront and lake-access homes are a normal option rather than a rarity, and it has one of Oakland County's most culturally diverse populations. At a typical value of $466,635 (Zillow, June 2026), it's Troy-level pricing where the premium buys water access.",
  },
  {
    question: "Which should I buy in?",
    answer:
      "Different buyers entirely. Choose Bloomfield Hills if you want estate-scale land, privacy, prestige, and a top-ten school district, and the ~$690K-and-up entry works. Choose West Bloomfield if you want lake living, a diverse community, and family homes at roughly two-thirds the price. They're rarely a true head-to-head for the same buyer — which is exactly why confusing them leads people astray.",
  },
];

export default function WestBloomfieldVsBloomfieldHillsPage() {
  const wb = rankedCities.find((c) => c.city === "West Bloomfield")!;
  const bh = rankedCities.find((c) => c.city === "Bloomfield Hills")!;
  const sources = citations.filter((c) => CITED_IDS.includes(c.id));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "West Bloomfield vs Bloomfield Hills (2026): They're Not the Same Place",
    datePublished: "2026-09-21",
    dateModified: "2026-09-21",
    url: URL,
    author: { "@type": "Organization", name: company.name, url: BASE },
    publisher: { "@type": "Organization", name: company.name, url: BASE },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "West Bloomfield vs Bloomfield Hills", item: URL },
    ],
  };

  const rows: { label: string; wb: string; bh: string; cite: string }[] = [
    { label: "Typical home value (Jun 2026)", wb: wb.stats.zhvi, bh: bh.stats.zhvi, cite: "¹" },
    { label: "1-yr change, value index", wb: wb.stats.zhviYoY, bh: bh.stats.zhviYoY, cite: "¹" },
    { label: "Median sale price (3 mo ending May 2026)", wb: wb.stats.medianSale, bh: bh.stats.medianSale, cite: "⁴" },
    { label: "Median days on market", wb: wb.stats.dom, bh: bh.stats.dom, cite: "⁴" },
    { label: "Population (2020 Census)", wb: wb.stats.population, bh: bh.stats.population, cite: "²" },
    { label: "Municipality type", wb: "Charter township", bh: "City", cite: "²" },
    { label: "School district (Niche 2026)", wb: "West Bloomfield SD — #30 in MI", bh: "Bloomfield Hills — #7 in MI", cite: "³" },
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
              <a href="/">Home</a>
              <ChevronRight className="w-3 h-3" />
              <span style={{ color: "var(--navy)" }}>West Bloomfield vs Bloomfield Hills</span>
            </nav>
            <div className="s-eyebrow"><Scale className="w-3 h-3" style={{ marginRight: 2 }} />Head to head · 2026</div>
            <h1 style={{ fontSize: "clamp(32px, 4.4vw, 54px)", lineHeight: 1.12, marginBottom: 22 }}>
              West Bloomfield vs Bloomfield Hills: They&rsquo;re Not the Same Place
            </h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", fontSize: 12.5, color: "var(--s-muted)", marginBottom: 34 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <CalendarDays className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />
                Published September 21, 2026 · market data vintage stated per figure
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <Landmark className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />
                By {company.name} — a Metro Detroit brokerage selling in both
              </span>
            </div>
            <div className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid rgba(217,118,47,0.3)", background: "rgba(217,118,47,0.06)", padding: 30 }}>
              <div className="s-eyebrow">The short answer</div>
              <p style={{ fontSize: 16.5, lineHeight: 1.8, color: "var(--s-ink)" }}>
                They share a name and a county, and that&rsquo;s about it. <strong>Bloomfield Hills</strong> is
                a tiny estate city — about 4,460 residents, a typical home value near $690,654, and
                Michigan&rsquo;s #7 school district. <strong>West Bloomfield</strong> is a large lake-filled
                township — about 65,888 residents, a typical value near $466,635 (roughly $224K less), lakes
                everywhere, and the #30 district. If you&rsquo;re comparing them for the same purchase,
                you&rsquo;re usually comparing two different lifestyles at two different budgets. Everything
                below is sourced.
              </p>
            </div>
          </div>
        </section>

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
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>West Bloomfield</th>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>Bloomfield Hills</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.label} style={{ borderTop: "1px solid var(--line)" }}>
                      <td style={{ padding: "15px 20px", color: "var(--s-muted)" }}>{r.label}<sup style={{ color: "var(--s-gold)" }}>{r.cite}</sup></td>
                      <td style={{ padding: "15px 20px", fontWeight: 600, color: "var(--s-ink)", fontVariantNumeric: "tabular-nums" }}>{r.wb}</td>
                      <td style={{ padding: "15px 20px", fontWeight: 600, color: "var(--s-ink)", fontVariantNumeric: "tabular-nums" }}>{r.bh}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 11, color: "var(--s-muted)", marginTop: 14 }}>
              Superscripts refer to the numbered sources at the end of this page. Bloomfield Hills&rsquo;
              sale-price figures rest on very few transactions, so its median swings on a handful of estates;
              we lean on the smoothed value index for that city.
            </p>
          </div>
        </section>

        <section className="bg-cream" style={{ padding: "80px 0" }}>
          <div className="container" style={{ maxWidth: 860, display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            <div className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff", padding: 30 }}>
              <h2 style={{ fontSize: 24, marginBottom: 14 }}>Choose West Bloomfield if…</h2>
              <ul style={{ display: "grid", gap: 10, fontSize: 14.5, lineHeight: 1.7, color: "var(--s-ink)", paddingLeft: 18 }}>
                <li>Lake living is the draw — lakefront and lake-access homes are a normal option here</li>
                <li>You want a family home in the mid-$400Ks, not a luxury estate</li>
                <li>A diverse, established community matters to you</li>
                <li>A strong (#30 statewide) district at a reachable price beats a #7 you can&rsquo;t afford</li>
              </ul>
              <a href={`/${wb.citySlug}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--s-gold)", fontWeight: 600, marginTop: 18 }}>Full West Bloomfield guide <ArrowRight className="w-3.5 h-3.5" /></a>
            </div>
            <div className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff", padding: 30 }}>
              <h2 style={{ fontSize: 24, marginBottom: 14 }}>Choose Bloomfield Hills if…</h2>
              <ul style={{ display: "grid", gap: 10, fontSize: 14.5, lineHeight: 1.7, color: "var(--s-ink)", paddingLeft: 18 }}>
                <li>You want estate-scale land, privacy, and prestige</li>
                <li>The #7 school district and legacy-asset value anchor the decision</li>
                <li>A ~$690K-and-up entry point works for your budget</li>
                <li>You value scarcity — very few homes trade in a city this small</li>
              </ul>
              <a href={`/${bh.citySlug}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--s-gold)", fontWeight: 600, marginTop: 18 }}>Full Bloomfield Hills guide <ArrowRight className="w-3.5 h-3.5" /></a>
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
              Comparing the whole region? See{" "}
              <a href="/best-metro-detroit-suburbs" style={{ color: "var(--s-gold)", fontWeight: 600 }}>all seven Metro Detroit suburbs, ranked for 2026</a>.
            </p>
          </div>
        </section>

        <section className="bg-cream-2" style={{ padding: "80px 0 100px", textAlign: "center" }}>
          <div className="container" style={{ maxWidth: 640 }}>
            <h2 style={{ fontSize: "clamp(26px, 3.4vw, 40px)", marginBottom: 14 }}>Not sure which &ldquo;Bloomfield&rdquo; fits?</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--s-muted)", marginBottom: 30 }}>
              We sell in both. Tell us your budget and whether you want lakes or estates, and we&rsquo;ll
              point you to the right one — and the right neighborhood within it.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/home-value" className="btn btn-gold">Ask us which fits <ArrowRight className="w-4 h-4" /></a>
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
