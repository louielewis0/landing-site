import type { Metadata } from "next";
import SiteShell from "@/components/site/SiteShell";
import { company } from "@/lib/config";
import { ArrowRight, ChevronRight, CalendarDays, Landmark, BarChart3, Phone, MapPin } from "lucide-react";

const BASE = "https://marketcenterrealty.com";
const SLUG = "metro-detroit-housing-market-update";
const URL = `${BASE}/${SLUG}`;

export const metadata: Metadata = {
  title: "Metro Detroit Housing Market Update: Q3 2026 (Sourced Data)",
  description:
    "Where the Metro Detroit housing market stands in Q3 2026 — home values, sale prices, and days on market for Troy, Rochester Hills, Birmingham, Sterling Heights, Warren and more, from Zillow (Aug 2026) and Redfin. Values still up year-over-year, led by Birmingham. By a Metro Detroit brokerage.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Metro Detroit Housing Market Update: Q3 2026",
    description: "Sourced home values, sale prices, and days on market across seven Metro Detroit suburbs.",
    type: "article",
    locale: "en_US",
    url: URL,
  },
};

/**
 * Fresh Q3 2026 data — a dated snapshot, kept local to this page so it never
 * has to reconcile with the vintage-stamped figures on the evergreen guides.
 * Zillow ZHVI: primary CSV, latest month Aug 31 2026; YoY computed Aug 2025 →
 * Aug 2026 from the same series. Redfin: rendered city pages, all home types,
 * three months ending August 2026. Both pulled 2026-09-21.
 */
type Row = {
  city: string; slug: string;
  zhvi: string; zhviYoY: string;
  redfin: string; redfinYoY: string; dom: string; sold: string;
  small?: boolean;
};
const rows: Row[] = [
  { city: "Birmingham", slug: "birmingham-real-estate-agent", zhvi: "$749,411", zhviYoY: "+6.5%", redfin: "$1.1M", redfinYoY: "+13.6%", dom: "25 days", sold: "125" },
  { city: "Bloomfield Hills", slug: "bloomfield-hills-real-estate-agent", zhvi: "$677,440", zhviYoY: "+4.5%", redfin: "$855K", redfinYoY: "−34.3%*", dom: "28 days", sold: "19", small: true },
  { city: "Rochester Hills", slug: "rochester-hills-real-estate-agent", zhvi: "$469,977", zhviYoY: "+3.5%", redfin: "$480K", redfinYoY: "+2.1%", dom: "14 days", sold: "261" },
  { city: "Troy", slug: "troy-real-estate-agent", zhvi: "$458,678", zhviYoY: "+2.2%", redfin: "$472K", redfinYoY: "+6.2%", dom: "19 days", sold: "279" },
  { city: "West Bloomfield", slug: "west-bloomfield-real-estate-agent", zhvi: "$457,173", zhviYoY: "+2.8%", redfin: "$452K", redfinYoY: "−3.8%", dom: "23 days", sold: "289" },
  { city: "Sterling Heights", slug: "sterling-heights-real-estate-agent", zhvi: "$308,784", zhviYoY: "+1.4%", redfin: "$320K", redfinYoY: "≈0%", dom: "15 days", sold: "429" },
  { city: "Warren", slug: "warren-real-estate-agent", zhvi: "$200,537", zhviYoY: "+0.4%", redfin: "$225K", redfinYoY: "+5.6%", dom: "21 days", sold: "483" },
];

const sources = [
  {
    id: 1,
    label: "Zillow Home Value Index (ZHVI), all homes, smoothed & seasonally adjusted — Zillow Research public dataset, monthly series through August 31, 2026",
    url: "https://www.zillow.com/research/data/",
    accessed: "2026-09-21",
    note: "One-year changes computed from the same series (Aug 2025 vs Aug 2026). ZHVI is a typical home value, not a median sale price.",
  },
  {
    id: 2,
    label: "Redfin city housing-market pages, all home types, three months ending August 2026 (median sale price, year-over-year change, median days on market, homes sold)",
    url: "https://www.redfin.com/",
    accessed: "2026-09-21",
    note: "West Bloomfield uses Redfin's township-linked neighborhood page. Bloomfield Hills' figures rest on only 19 sales, so its −34.3% year-over-year swing is small-sample volatility, not a real decline — the value index (+4.5%) is the cleaner read there.",
  },
];

const faqs = [
  {
    question: "Is the Metro Detroit housing market going up or down in late 2026?",
    answer:
      "Up, modestly. On Zillow's smoothed home-value index, all seven suburbs we track were higher year-over-year as of August 2026 — none was declining — ranging from +0.4% (Warren) to +6.5% (Birmingham). Redfin's three-month sale-price medians are noisier and dipped in a couple of cities, but the underlying value trend is positive across the board.",
  },
  {
    question: "Which Metro Detroit suburb is hottest right now?",
    answer:
      "Birmingham. It posted the fastest home-value growth (+6.5% on Zillow, year through August 2026) and the strongest sale-price gain (+13.6% on Redfin's three months ending August). The luxury top end of the market is running hotter than the affordable end this cycle.",
  },
  {
    question: "Are home prices falling anywhere in Metro Detroit?",
    answer:
      "Not on the smoothed value index — every one of the seven cities was positive year-over-year in August 2026. A few Redfin three-month sale medians dipped (West Bloomfield −3.8%), which usually reflects the mix of homes that happened to sell. Bloomfield Hills shows −34.3% on Redfin, but that rests on just 19 sales — small-sample noise, not a crash; its value index was up 4.5%.",
  },
  {
    question: "How fast are homes selling?",
    answer:
      "Fast in the mid-market: Rochester Hills homes sold in a median of 14 days and Sterling Heights 15 (Redfin, three months ending August 2026). The luxury tier takes longer — Birmingham 25 days, Bloomfield Hills 28 — normal for higher price points and thinner buyer pools.",
  },
  {
    question: "When is this data from?",
    answer:
      "Home values are Zillow's index through August 31, 2026; sale prices and days on market are Redfin's three months ending August 2026. Both were pulled September 21, 2026. We refresh this page as new monthly data publishes.",
  },
];

const articleSchema = {
  "@context": "https://schema.org", "@type": "Article",
  headline: "Metro Detroit Housing Market Update: Q3 2026",
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
    { "@type": "ListItem", position: 2, name: "Metro Detroit Market Update", item: URL },
  ],
};

export default function MarketUpdatePage() {
  return (
    <SiteShell>
      <main style={{ paddingTop: 24 }} className="bg-cream">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

        <section className="bg-cream" style={{ padding: "50px 0 60px" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--s-muted)", marginBottom: 34 }}>
              <a href="/">Home</a><ChevronRight className="w-3 h-3" /><span style={{ color: "var(--navy)" }}>Market Update</span>
            </nav>
            <div className="s-eyebrow"><BarChart3 className="w-3 h-3" style={{ marginRight: 2 }} />Market update · Q3 2026</div>
            <h1 style={{ fontSize: "clamp(32px, 4.4vw, 54px)", lineHeight: 1.12, marginBottom: 22 }}>Metro Detroit Housing Market Update: Q3 2026</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", fontSize: 12.5, color: "var(--s-muted)", marginBottom: 34 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><CalendarDays className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />Published September 21, 2026 · data through August 2026</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><Landmark className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />By {company.name}, a Troy, MI brokerage</span>
            </div>
            <div className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid rgba(217,118,47,0.3)", background: "rgba(217,118,47,0.06)", padding: 30 }}>
              <div className="s-eyebrow">The short answer</div>
              <p style={{ fontSize: 16.5, lineHeight: 1.8, color: "var(--s-ink)" }}>
                As of August 2026, the Metro Detroit market is still rising — but the gap between the top and
                the bottom is widening. On Zillow&rsquo;s home-value index, all seven suburbs we track were up
                year-over-year, from <strong>Birmingham&rsquo;s +6.5%</strong> at the hot luxury end to
                <strong> Warren&rsquo;s +0.4%</strong>, nearly flat, at the affordable end. Homes still move
                fast in the mid-market (Rochester Hills 14 days, Sterling Heights 15) while luxury takes longer.
                No city is declining on the value index. Every figure below is sourced and dated.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-cream-2" style={{ padding: "70px 0" }}>
          <div className="container">
            <div className="reveal">
              <div className="s-eyebrow">The full picture</div>
              <h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", marginBottom: 10 }}>Seven suburbs, two gauges</h2>
              <p style={{ fontSize: 13.5, color: "var(--s-muted)", marginBottom: 26, maxWidth: 780 }}>
                Zillow&rsquo;s typical home value (smoothed, through Aug 2026) and Redfin&rsquo;s median sale
                price (three months ending Aug 2026). They measure different things and sometimes disagree —
                where they do, the value index is the cleaner read.
              </p>
            </div>
            <div className="reveal" style={{ overflowX: "auto", borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff" }}>
              <table style={{ width: "100%", textAlign: "left", fontSize: 13.5, minWidth: 820, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--line)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--s-muted)" }}>
                    <th style={{ padding: "16px 18px", fontWeight: 600 }}>City</th>
                    <th style={{ padding: "16px 18px", fontWeight: 600 }}>Typical value¹</th>
                    <th style={{ padding: "16px 18px", fontWeight: 600 }}>Value 1-yr¹</th>
                    <th style={{ padding: "16px 18px", fontWeight: 600 }}>Median sale²</th>
                    <th style={{ padding: "16px 18px", fontWeight: 600 }}>Sale 1-yr²</th>
                    <th style={{ padding: "16px 18px", fontWeight: 600 }}>Days on mkt²</th>
                    <th style={{ padding: "16px 18px", fontWeight: 600 }}>Sold (Aug)²</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.city} style={{ borderTop: "1px solid var(--line)" }}>
                      <td style={{ padding: "14px 18px", fontWeight: 600, color: "var(--s-ink)" }}><a href={`/${r.slug}`}>{r.city}</a></td>
                      <td style={{ padding: "14px 18px", color: "var(--s-ink)", fontVariantNumeric: "tabular-nums" }}>{r.zhvi}</td>
                      <td style={{ padding: "14px 18px", color: "var(--s-ink)", fontVariantNumeric: "tabular-nums" }}>{r.zhviYoY}</td>
                      <td style={{ padding: "14px 18px", color: "var(--s-muted)", fontVariantNumeric: "tabular-nums" }}>{r.redfin}</td>
                      <td style={{ padding: "14px 18px", color: "var(--s-muted)", fontVariantNumeric: "tabular-nums" }}>{r.redfinYoY}</td>
                      <td style={{ padding: "14px 18px", color: "var(--s-muted)", fontVariantNumeric: "tabular-nums" }}>{r.dom}</td>
                      <td style={{ padding: "14px 18px", color: "var(--s-muted)", fontVariantNumeric: "tabular-nums" }}>{r.sold}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 11, color: "var(--s-muted)", marginTop: 14 }}>
              Superscripts refer to the numbered sources at the end. *Bloomfield Hills&rsquo; sale figures rest
              on only 19 transactions, so its −34.3% swing is small-sample volatility — its value index was up
              4.5%. Sterling Heights&rsquo; sale price was essentially flat year-over-year.
            </p>
          </div>
        </section>

        <section className="bg-cream" style={{ padding: "80px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal">
              <div className="s-eyebrow">What&rsquo;s actually happening</div>
              <h2 style={{ fontSize: "clamp(24px, 2.8vw, 32px)", marginBottom: 18 }}>Three things the Q3 data shows</h2>
              <div style={{ display: "grid", gap: 16, fontSize: 15.5, lineHeight: 1.8, color: "var(--s-ink)" }}>
                <p>
                  <strong>1. The luxury end is leading.</strong> Birmingham is the clear front-runner — +6.5% on
                  the value index and +13.6% on Redfin&rsquo;s median sale price. Bloomfield Hills&rsquo; value
                  index is up 4.5% too. Demand at the top of the market has stayed strong even as the affordable
                  tier cools.
                </p>
                <p>
                  <strong>2. The affordable end has flattened — on value, not demand.</strong> Warren (+0.4%) and
                  Sterling Heights (+1.4%) posted the smallest value gains. But both still sell briskly (Warren
                  moved 483 homes in August, Sterling Heights 429), so this is prices leveling off, not buyers
                  disappearing. For a first-time buyer, flatter prices plus steady inventory is a friendlier
                  entry than a bidding frenzy.
                </p>
                <p>
                  <strong>3. Speed depends on price tier.</strong> Mid-market homes still fly — Rochester Hills
                  14 days, Sterling Heights 15 — while luxury sits longer (Birmingham 25, Bloomfield Hills 28).
                  If you&rsquo;re selling in the mid-market, price it right and expect a fast result; at the top
                  end, plan for a longer, more curated marketing window.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-cream-2" style={{ padding: "80px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal"><div className="s-eyebrow">FAQ</div><h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", marginBottom: 30 }}>Market questions, answered directly</h2></div>
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
                    <span style={{ display: "block", opacity: 0.7, marginTop: 4 }}>{s.note}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p style={{ fontSize: 13, color: "var(--s-muted)", marginTop: 18 }}>
              Deciding where to buy on this data? See{" "}
              <a href="/best-metro-detroit-suburbs" style={{ color: "var(--s-gold)", fontWeight: 600 }}>all seven suburbs ranked</a>{" "}·{" "}
              <a href="/fastest-appreciating-metro-detroit-suburbs" style={{ color: "var(--s-gold)", fontWeight: 600 }}>fastest-appreciating suburbs</a>.
            </p>
          </div>
        </section>

        <section className="bg-cream-2" style={{ padding: "80px 0 100px", textAlign: "center" }}>
          <div className="container" style={{ maxWidth: 640 }}>
            <h2 style={{ fontSize: "clamp(26px, 3.4vw, 40px)", marginBottom: 14 }}>Want a read on your specific home or target city?</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--s-muted)", marginBottom: 30 }}>
              Citywide numbers set the backdrop; your street, school district, and condition set the price. We&rsquo;ll
              give you the real figure — free, no pressure.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/home-value" className="btn btn-gold">Get your home&rsquo;s value <ArrowRight className="w-4 h-4" /></a>
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
