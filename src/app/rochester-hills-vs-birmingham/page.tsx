import type { Metadata } from "next";
import SiteShell from "@/components/site/SiteShell";
import { company } from "@/lib/config";
import { citations, rankedCities } from "@/lib/best-suburbs-guide";
import { ArrowRight, ChevronRight, CalendarDays, Landmark, Scale, Phone, MapPin } from "lucide-react";

const BASE = "https://marketcenterrealty.com";
const SLUG = "rochester-hills-vs-birmingham";
const URL = `${BASE}/${SLUG}`;

export const metadata: Metadata = {
  title: "Rochester Hills vs Birmingham (2026): Family Value or Walkable Luxury?",
  description:
    "Rochester Hills vs Birmingham compared with sourced 2026 data. A surprise: Rochester Hills' schools rank higher (#5 vs #9) while costing about $277K less. Home values, market speed, and who each fits. By a Metro Detroit brokerage.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Rochester Hills vs Birmingham (2026): Family Value or Walkable Luxury?",
    description: "Higher-ranked schools for less, or a walkable downtown for more — compared with sourced data.",
    type: "article",
    locale: "en_US",
    url: URL,
  },
};

const CITED_IDS = [1, 2, 3, 4];

const faqs = [
  {
    question: "Which is more expensive, Rochester Hills or Birmingham?",
    answer:
      "Birmingham, by a lot — about $277,000 more. Birmingham's typical home value is $757,616 versus Rochester Hills' $480,334 (Zillow, June 2026). Birmingham is a top luxury tier; Rochester Hills is an upper-mid family market.",
  },
  {
    question: "Which has better schools?",
    answer:
      "Here's the surprise: Rochester Hills. Rochester Community Schools ranks #5 of Michigan's 538 districts (Niche, 2026), higher than Birmingham Public Schools at #9 — even though Birmingham costs roughly $277,000 more. The lesson: in Birmingham you're paying for the walkable downtown, not a higher school rank. Boundaries don't follow city lines in either place, so verify the attendance area for any address.",
  },
  {
    question: "What's the real difference between them?",
    answer:
      "Rochester Hills is a family suburb organized around the Paint Creek Trail, Stony Creek Metropark, and walkable downtown Rochester next door — larger lots, more house per dollar, a top-five school district. Birmingham is a compact, walkable luxury downtown you can live on foot, with tighter lots, condos, and premium pricing. One is space-and-trails; the other is urban-luxury.",
  },
  {
    question: "Which market is hotter?",
    answer:
      "Both are strong, in different ways. Rochester Hills sells faster — a median of 15 days on market versus Birmingham's 20 (Redfin, three months ending May 2026), and Redfin labels it 'most competitive.' Birmingham posted stronger price growth in the spring window (+12.8% median sale price YoY). Come pre-approved for either.",
  },
  {
    question: "Which is the better value?",
    answer:
      "For schools-per-dollar, Rochester Hills is hard to beat — a #5 district at $480,334 versus a #9 at $757,616. Birmingham's value is the walkable lifestyle, which is genuinely rare in Michigan and holds its premium. If your priority is a top district and family space, Rochester Hills wins on value; if it's living on foot in a premier downtown, Birmingham is the one thing money can buy here that Rochester Hills can't.",
  },
];

export default function RochesterHillsVsBirminghamPage() {
  const rh = rankedCities.find((c) => c.city === "Rochester Hills")!;
  const bir = rankedCities.find((c) => c.city === "Birmingham")!;
  const sources = citations.filter((c) => CITED_IDS.includes(c.id));

  const articleSchema = {
    "@context": "https://schema.org", "@type": "Article",
    headline: "Rochester Hills vs Birmingham (2026): Family Value or Walkable Luxury?",
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
      { "@type": "ListItem", position: 2, name: "Rochester Hills vs Birmingham", item: URL },
    ],
  };

  const rows: { label: string; rh: string; bir: string; cite: string }[] = [
    { label: "Typical home value (Jun 2026)", rh: rh.stats.zhvi, bir: bir.stats.zhvi, cite: "¹" },
    { label: "1-yr change, value index", rh: rh.stats.zhviYoY, bir: bir.stats.zhviYoY, cite: "¹" },
    { label: "Median sale price (3 mo ending May 2026)", rh: rh.stats.medianSale, bir: bir.stats.medianSale, cite: "⁴" },
    { label: "1-yr change, sale price", rh: rh.stats.medianSaleYoY, bir: bir.stats.medianSaleYoY, cite: "⁴" },
    { label: "Median days on market", rh: rh.stats.dom, bir: bir.stats.dom, cite: "⁴" },
    { label: "Population (2020 Census)", rh: rh.stats.population, bir: bir.stats.population, cite: "²" },
    { label: "School district (Niche 2026)", rh: "Rochester CS — #5 in MI", bir: "Birmingham PS — #9 in MI", cite: "³" },
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
              <a href="/">Home</a><ChevronRight className="w-3 h-3" /><span style={{ color: "var(--navy)" }}>Rochester Hills vs Birmingham</span>
            </nav>
            <div className="s-eyebrow"><Scale className="w-3 h-3" style={{ marginRight: 2 }} />Head to head · 2026</div>
            <h1 style={{ fontSize: "clamp(32px, 4.4vw, 54px)", lineHeight: 1.12, marginBottom: 22 }}>Rochester Hills vs Birmingham: Family Value or Walkable Luxury?</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", fontSize: 12.5, color: "var(--s-muted)", marginBottom: 34 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><CalendarDays className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />Published September 21, 2026 · vintage stated per figure</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><Landmark className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />By {company.name} — a Metro Detroit brokerage selling in both</span>
            </div>
            <div className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid rgba(217,118,47,0.3)", background: "rgba(217,118,47,0.06)", padding: 30 }}>
              <div className="s-eyebrow">The short answer</div>
              <p style={{ fontSize: 16.5, lineHeight: 1.8, color: "var(--s-ink)" }}>
                The surprise up front: <strong>Rochester Hills&rsquo; schools rank higher than
                Birmingham&rsquo;s</strong> (Rochester #5 vs Birmingham #9, Niche 2026) while costing about
                $277,000 less ($480,334 vs $757,616, Zillow June 2026). So Birmingham&rsquo;s premium
                isn&rsquo;t about schools — it&rsquo;s about the walkable downtown, which is genuinely rare in
                Michigan. <strong>Choose Rochester Hills</strong> for a top-five district, family space, and
                trails at a reachable price. <strong>Choose Birmingham</strong> if living on foot in a premier
                downtown is the thing you&rsquo;re buying. Everything below is sourced.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-cream-2" style={{ padding: "70px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal"><div className="s-eyebrow">Head to head</div><h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", marginBottom: 26 }}>The numbers, side by side</h2></div>
            <div className="reveal" style={{ overflowX: "auto", borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff" }}>
              <table style={{ width: "100%", textAlign: "left", fontSize: 13.5, minWidth: 560, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--line)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--s-muted)" }}>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>Metric</th>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>Rochester Hills</th>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>Birmingham</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.label} style={{ borderTop: "1px solid var(--line)" }}>
                      <td style={{ padding: "15px 20px", color: "var(--s-muted)" }}>{r.label}<sup style={{ color: "var(--s-gold)" }}>{r.cite}</sup></td>
                      <td style={{ padding: "15px 20px", fontWeight: 600, color: "var(--s-ink)", fontVariantNumeric: "tabular-nums" }}>{r.rh}</td>
                      <td style={{ padding: "15px 20px", fontWeight: 600, color: "var(--s-ink)", fontVariantNumeric: "tabular-nums" }}>{r.bir}</td>
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
              <h2 style={{ fontSize: 24, marginBottom: 14 }}>Choose Rochester Hills if…</h2>
              <ul style={{ display: "grid", gap: 10, fontSize: 14.5, lineHeight: 1.7, color: "var(--s-ink)", paddingLeft: 18 }}>
                <li>You want the higher-ranked school district (#5) and family space</li>
                <li>Trails and parks — Paint Creek, Stony Creek — are your weekends</li>
                <li>You&rsquo;d rather have more house and lot than a walkable downtown</li>
                <li>Schools-per-dollar is the metric you care about most</li>
              </ul>
              <a href={`/${rh.citySlug}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--s-gold)", fontWeight: 600, marginTop: 18 }}>Full Rochester Hills guide <ArrowRight className="w-3.5 h-3.5" /></a>
            </div>
            <div className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff", padding: 30 }}>
              <h2 style={{ fontSize: 24, marginBottom: 14 }}>Choose Birmingham if…</h2>
              <ul style={{ display: "grid", gap: 10, fontSize: 14.5, lineHeight: 1.7, color: "var(--s-ink)", paddingLeft: 18 }}>
                <li>Living on foot in a premier downtown is the whole point</li>
                <li>You want condos/townhomes and walkable dining over lot size</li>
                <li>A top-ten district (#9) is enough, and lifestyle is the priority</li>
                <li>The ~$277K premium buys something Rochester Hills structurally can&rsquo;t</li>
              </ul>
              <a href={`/${bir.citySlug}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--s-gold)", fontWeight: 600, marginTop: 18 }}>Full Birmingham guide <ArrowRight className="w-3.5 h-3.5" /></a>
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
              More head-to-heads:{" "}
              <a href="/troy-vs-rochester-hills" style={{ color: "var(--s-gold)", fontWeight: 600 }}>Troy vs Rochester Hills</a>{" "}·{" "}
              <a href="/birmingham-vs-bloomfield-hills" style={{ color: "var(--s-gold)", fontWeight: 600 }}>Birmingham vs Bloomfield Hills</a>.
            </p>
          </div>
        </section>

        <section className="bg-cream-2" style={{ padding: "80px 0 100px", textAlign: "center" }}>
          <div className="container" style={{ maxWidth: 640 }}>
            <h2 style={{ fontSize: "clamp(26px, 3.4vw, 40px)", marginBottom: 14 }}>Schools, space, or a walkable downtown?</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--s-muted)", marginBottom: 30 }}>
              Tell us what your family actually needs and we&rsquo;ll tell you which one fits — with the real
              numbers, and the neighborhoods within each that punch above their price.
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
