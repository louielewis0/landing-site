import type { Metadata } from "next";
import SiteShell from "@/components/site/SiteShell";
import { company } from "@/lib/config";
import { citations, rankedCities } from "@/lib/best-suburbs-guide";
import { ArrowRight, ChevronRight, CalendarDays, Landmark, TrendingUp, Phone, MapPin } from "lucide-react";

const BASE = "https://marketcenterrealty.com";
const SLUG = "fastest-appreciating-metro-detroit-suburbs";
const URL = `${BASE}/${SLUG}`;

export const metadata: Metadata = {
  title: "Fastest-Appreciating Metro Detroit Suburbs (2026), Ranked by Home-Value Growth",
  description:
    "Which Metro Detroit suburbs' home values grew fastest over the past year? Ranked by Zillow's home-value index (through June 2026) — Birmingham leads at +6.4%. Sourced data, honest caveats, and what it means for buyers and investors. By a Metro Detroit brokerage.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Fastest-Appreciating Metro Detroit Suburbs (2026), Ranked",
    description: "One-year home-value growth across seven suburbs, ranked with sourced data.",
    type: "article",
    locale: "en_US",
    url: URL,
  },
};

const CITED_IDS = [1, 4];

/** Parse "+6.4%" / "+1.7%" → number for ranking. */
function toPct(s: string): number {
  const m = s.match(/-?\d+(\.\d+)?/);
  return m ? parseFloat(m[0]) : 0;
}

const faqs = [
  {
    question: "Which Metro Detroit suburb's home values grew fastest in the past year?",
    answer:
      "Birmingham, on Zillow's smoothed home-value index: +6.4% over the year through June 2026, the highest of the seven cities we track. Bloomfield Hills (+4.9%) and Rochester Hills (+3.6%) follow. Warren was slowest on this index at +1.7%.",
  },
  {
    question: "Does fast appreciation mean I should buy there?",
    answer:
      "Not by itself. Past one-year appreciation is history, not a forecast — it tells you where demand has been strong, not where it's headed. A fast-appreciating city may also be the most expensive to enter (Birmingham) while a slower one may be the best affordability play (Warren). Match the metric to your goal: appreciation for equity growth, affordability for a reachable payment.",
  },
  {
    question: "Why does Warren look slow here but fast elsewhere?",
    answer:
      "Because two gauges measure different things. On Zillow's smoothed value index, Warren rose just 1.7% (year through June 2026). But Redfin's median sale price rose 13.4% in the spring window — a gap that usually means the mix of homes that sold shifted toward pricier ones, not that every house gained 13%. The smoothed index is the cleaner read on underlying value; treat the sale-price spike as a mix effect until the index confirms it.",
  },
  {
    question: "Is home-value growth the same as a good investment?",
    answer:
      "No. A good investment weighs entry price, rental yield, and carrying costs — not just appreciation. Warren's low entry and strong rental demand can beat a higher-appreciation city on cash-on-cash return, while Birmingham's appreciation suits an equity-growth, owner-occupant strategy. We run the actual numbers for investor clients rather than chasing a single headline percentage.",
  },
];

export default function FastestAppreciatingPage() {
  const sources = citations.filter((c) => CITED_IDS.includes(c.id));
  const ranked = [...rankedCities].sort((a, b) => toPct(b.stats.zhviYoY) - toPct(a.stats.zhviYoY));

  const articleSchema = {
    "@context": "https://schema.org", "@type": "Article",
    headline: "Fastest-Appreciating Metro Detroit Suburbs (2026), Ranked by Home-Value Growth",
    datePublished: "2026-09-21", dateModified: "2026-09-21", url: URL,
    author: { "@type": "Organization", name: company.name, url: BASE },
    publisher: { "@type": "Organization", name: company.name, url: BASE },
  };
  const itemListSchema = {
    "@context": "https://schema.org", "@type": "ItemList",
    name: "Fastest-Appreciating Metro Detroit Suburbs 2026",
    numberOfItems: ranked.length,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    itemListElement: ranked.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: `${c.city}, MI — ${c.stats.zhviYoY}` })),
  };
  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Fastest-Appreciating Suburbs", item: URL },
    ],
  };

  return (
    <SiteShell>
      <main style={{ paddingTop: 24 }} className="bg-cream">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

        <section className="bg-cream" style={{ padding: "50px 0 60px" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--s-muted)", marginBottom: 34 }}>
              <a href="/">Home</a><ChevronRight className="w-3 h-3" /><span style={{ color: "var(--navy)" }}>Fastest-Appreciating Suburbs</span>
            </nav>
            <div className="s-eyebrow"><TrendingUp className="w-3 h-3" style={{ marginRight: 2 }} />Appreciation ranking · 2026</div>
            <h1 style={{ fontSize: "clamp(32px, 4.4vw, 54px)", lineHeight: 1.12, marginBottom: 22 }}>Fastest-Appreciating Metro Detroit Suburbs, Ranked</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", fontSize: 12.5, color: "var(--s-muted)", marginBottom: 34 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><CalendarDays className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />Published September 21, 2026 · Zillow value index, year through June 2026</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><Landmark className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />By {company.name}, a Troy, MI brokerage</span>
            </div>
            <div className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid rgba(217,118,47,0.3)", background: "rgba(217,118,47,0.06)", padding: 30 }}>
              <div className="s-eyebrow">The short answer</div>
              <p style={{ fontSize: 16.5, lineHeight: 1.8, color: "var(--s-ink)" }}>
                Over the year through June 2026, <strong>Birmingham</strong> led on home-value growth at
                <strong> +6.4%</strong> (Zillow&rsquo;s smoothed index), followed by Bloomfield Hills (+4.9%)
                and Rochester Hills (+3.6%). Warren was slowest on this gauge at +1.7%. One honest caveat up
                front: past appreciation is history, not a forecast — and the fastest-appreciating city is
                often the priciest to enter. Use this to see where demand has been strong, then match it to
                your goal. Every figure is sourced below.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-cream-2" style={{ padding: "70px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal"><div className="s-eyebrow">The ranking</div><h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", marginBottom: 10 }}>By 1-year home-value growth</h2>
              <p style={{ fontSize: 13.5, color: "var(--s-muted)", marginBottom: 26, maxWidth: 760 }}>
                Ranked by Zillow&rsquo;s smoothed typical-home-value change, year through June 2026 — the
                cleaner read on underlying appreciation than a volatile 3-month median.
              </p>
            </div>
            <div className="reveal" style={{ overflowX: "auto", borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff" }}>
              <table style={{ width: "100%", textAlign: "left", fontSize: 13.5, minWidth: 620, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--line)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--s-muted)" }}>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>#</th>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>City</th>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>1-yr value growth¹</th>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>Typical home value¹</th>
                  </tr>
                </thead>
                <tbody>
                  {ranked.map((c, i) => (
                    <tr key={c.city} style={{ borderTop: "1px solid var(--line)" }}>
                      <td style={{ padding: "15px 20px", color: "var(--s-gold)", fontWeight: 600 }}>{i + 1}</td>
                      <td style={{ padding: "15px 20px", fontWeight: 600, color: "var(--s-ink)" }}><a href={`/${c.citySlug}`}>{c.city}</a></td>
                      <td style={{ padding: "15px 20px", fontWeight: 600, color: "var(--s-ink)", fontVariantNumeric: "tabular-nums" }}>{c.stats.zhviYoY}</td>
                      <td style={{ padding: "15px 20px", color: "var(--s-muted)", fontVariantNumeric: "tabular-nums" }}>{c.stats.zhvi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 11, color: "var(--s-muted)", marginTop: 14 }}>
              Superscripts refer to the numbered sources at the end of this page. Appreciation figures are
              one-year changes in Zillow&rsquo;s value index — historical, not a prediction.
            </p>
          </div>
        </section>

        <section className="bg-cream" style={{ padding: "80px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal">
              <div className="s-eyebrow">Reading the ranking</div>
              <h2 style={{ fontSize: "clamp(24px, 2.8vw, 32px)", marginBottom: 18 }}>What fast (and slow) actually means</h2>
              <div style={{ display: "grid", gap: 16, fontSize: 15.5, lineHeight: 1.8, color: "var(--s-ink)" }}>
                <p>
                  <strong>Birmingham (+6.4%)</strong> leading is notable because it&rsquo;s already the priciest
                  city on the list — demand at the top of the market kept pushing values up, not down. That
                  suits an equity-growth strategy for a buyer who can afford the entry.
                </p>
                <p>
                  <strong>Warren (+1.7%)</strong> at the bottom of the value index is the flip side of being the
                  most affordable: slower measured appreciation, but the lowest entry price and strong rental
                  demand. For a cash-flow investor, that can beat a high-appreciation city on return — which is
                  why a single percentage never decides an investment.
                </p>
                <p>
                  The honest takeaway: appreciation tells you where demand has been, and demand can shift.
                  Pair it with entry price and your holding plan. We run those numbers with buyers and
                  investors rather than chasing a headline rate.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-cream-2" style={{ padding: "80px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal"><div className="s-eyebrow">FAQ</div><h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", marginBottom: 30 }}>Appreciation questions, answered directly</h2></div>
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
              See also{" "}
              <a href="/best-metro-detroit-suburbs" style={{ color: "var(--s-gold)", fontWeight: 600 }}>all seven suburbs ranked</a>{" "}
              and{" "}
              <a href="/how-much-home-metro-detroit-budget" style={{ color: "var(--s-gold)", fontWeight: 600 }}>how much home your budget buys</a>.
            </p>
          </div>
        </section>

        <section className="bg-cream-2" style={{ padding: "80px 0 100px", textAlign: "center" }}>
          <div className="container" style={{ maxWidth: 640 }}>
            <h2 style={{ fontSize: "clamp(26px, 3.4vw, 40px)", marginBottom: 14 }}>Buying for equity growth — or cash flow?</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--s-muted)", marginBottom: 30 }}>
              We run the real return math — entry price, appreciation, rents, carrying costs — so you pick the
              suburb that fits your strategy, not just the highest headline percentage.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/home-value" className="btn btn-gold">Talk strategy with us <ArrowRight className="w-4 h-4" /></a>
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
