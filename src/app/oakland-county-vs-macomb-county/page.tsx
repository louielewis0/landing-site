import type { Metadata } from "next";
import SiteShell from "@/components/site/SiteShell";
import { company } from "@/lib/config";
import { citations, rankedCities } from "@/lib/best-suburbs-guide";
import { ArrowRight, ChevronRight, CalendarDays, Landmark, Map as MapIcon, Phone, MapPin } from "lucide-react";

const BASE = "https://marketcenterrealty.com";
const SLUG = "oakland-county-vs-macomb-county";
const URL = `${BASE}/${SLUG}`;

export const metadata: Metadata = {
  title: "Oakland County vs Macomb County (2026): Where Should You Buy?",
  description:
    "Oakland vs Macomb County for Metro Detroit home buyers — the sharpest price-and-schools divide in the region. Oakland runs pricier with top-ranked districts; Macomb is the affordability play. Compared with sourced 2026 data. By a Metro Detroit brokerage.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Oakland County vs Macomb County (2026): Where Should You Buy?",
    description: "Price, schools, and value across the county line — a sourced 2026 buyer's comparison.",
    type: "article",
    locale: "en_US",
    url: URL,
  },
};

const CITED_IDS = [1, 2, 3, 5, 6];

const OAKLAND = ["Troy", "Rochester Hills", "Birmingham", "Bloomfield Hills", "West Bloomfield"];
const MACOMB = ["Sterling Heights", "Warren"];

const faqs = [
  {
    question: "Is Oakland or Macomb County more expensive?",
    answer:
      "Oakland, substantially. Among the suburbs we serve, Oakland County cities range from about $466,635 (West Bloomfield) to $757,616 (Birmingham) in typical home value, while Macomb County's run from $204,491 (Warren) to $315,750 (Sterling Heights) — Zillow, June 2026. The county line is one of the clearest price divides in Metro Detroit.",
  },
  {
    question: "Which county has better schools?",
    answer:
      "By Niche's 2026 Michigan ranking, the Oakland suburbs we serve hold four of the state's top-ten districts (Troy #3, Rochester #5, Bloomfield Hills #7, Birmingham #9), plus West Bloomfield at #30. On the Macomb side, Sterling Heights' north end is Utica Community Schools (#72) and Warren's districts don't crack the top 225. That said, schools are set by district, not county — always verify the exact attendance area for an address rather than assuming by county.",
  },
  {
    question: "Is Macomb County a good place to buy a home?",
    answer:
      "Yes — it's Metro Detroit's value play. Macomb gets you a detached home for well under Oakland prices, with Sterling Heights offering a top-75 district on its north side and Warren offering the lowest entry point in the region. For first-time buyers and investors focused on payment and cash flow, Macomb often makes more sense than Oakland.",
  },
  {
    question: "Which county should I choose?",
    answer:
      "Match it to your priority. Choose Oakland if top-ranked school districts, prestige addresses, or a walkable downtown (Birmingham) justify the higher price. Choose Macomb if affordability, a lower monthly payment, or investment cash flow matter most. Many Metro Detroit families start in Macomb and move up to Oakland later — and some never leave Macomb because the value is too good.",
  },
];

export default function OaklandVsMacombPage() {
  const oakland = rankedCities.filter((c) => OAKLAND.includes(c.city)).sort((a, b) => a.city.localeCompare(b.city));
  const macomb = rankedCities.filter((c) => MACOMB.includes(c.city)).sort((a, b) => a.city.localeCompare(b.city));
  const sources = citations.filter((c) => CITED_IDS.includes(c.id));

  const articleSchema = {
    "@context": "https://schema.org", "@type": "Article",
    headline: "Oakland County vs Macomb County (2026): Where Should You Buy?",
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
      { "@type": "ListItem", position: 2, name: "Oakland County vs Macomb County", item: URL },
    ],
  };

  const CountyBlock = ({ title, cities }: { title: string; cities: typeof rankedCities }) => (
    <div className="reveal" style={{ overflowX: "auto", borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff" }}>
      <table style={{ width: "100%", textAlign: "left", fontSize: 13.5, minWidth: 460, borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--line)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--s-muted)" }}>
            <th style={{ padding: "14px 20px", fontWeight: 600 }} colSpan={3}>{title}</th>
          </tr>
          <tr style={{ borderBottom: "1px solid var(--line)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--s-muted)" }}>
            <th style={{ padding: "12px 20px", fontWeight: 600 }}>City</th>
            <th style={{ padding: "12px 20px", fontWeight: 600 }}>Typical value¹</th>
            <th style={{ padding: "12px 20px", fontWeight: 600 }}>Schools³</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((c) => (
            <tr key={c.city} style={{ borderTop: "1px solid var(--line)" }}>
              <td style={{ padding: "13px 20px", fontWeight: 600, color: "var(--s-ink)" }}><a href={`/${c.citySlug}`}>{c.city}</a></td>
              <td style={{ padding: "13px 20px", color: "var(--s-ink)", fontVariantNumeric: "tabular-nums" }}>{c.stats.zhvi}</td>
              <td style={{ padding: "13px 20px", color: "var(--s-muted)" }}>{c.stats.nicheRank}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <SiteShell>
      <main style={{ paddingTop: 24 }} className="bg-cream">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

        <section className="bg-cream" style={{ padding: "50px 0 60px" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--s-muted)", marginBottom: 34 }}>
              <a href="/">Home</a><ChevronRight className="w-3 h-3" /><span style={{ color: "var(--navy)" }}>Oakland vs Macomb County</span>
            </nav>
            <div className="s-eyebrow"><MapIcon className="w-3 h-3" style={{ marginRight: 2 }} />County comparison · 2026</div>
            <h1 style={{ fontSize: "clamp(32px, 4.4vw, 54px)", lineHeight: 1.12, marginBottom: 22 }}>Oakland County vs Macomb County: Where Should You Buy?</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", fontSize: 12.5, color: "var(--s-muted)", marginBottom: 34 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><CalendarDays className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />Published September 21, 2026 · home values Zillow, June 2026</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><Landmark className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />By {company.name}, a Metro Detroit brokerage</span>
            </div>
            <div className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid rgba(217,118,47,0.3)", background: "rgba(217,118,47,0.06)", padding: 30 }}>
              <div className="s-eyebrow">The short answer</div>
              <p style={{ fontSize: 16.5, lineHeight: 1.8, color: "var(--s-ink)" }}>
                The county line is one of Metro Detroit&rsquo;s sharpest divides. <strong>Oakland County</strong>
                runs pricier — the suburbs we serve there range roughly $467K–$758K — and holds four of
                Michigan&rsquo;s top-ten school districts. <strong>Macomb County</strong> is the affordability
                play — our cities there run roughly $204K–$316K, with a top-75 district (Utica) on Sterling
                Heights&rsquo; north side. Choose Oakland for top schools and prestige; choose Macomb for value
                and a lower payment. One honest note: this compares the seven suburbs we work, not every city
                in either county. Everything below is sourced.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-cream-2" style={{ padding: "70px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal"><div className="s-eyebrow">Side by side</div><h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", marginBottom: 26 }}>The suburbs we serve, by county</h2></div>
            <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
              <CountyBlock title="Oakland County" cities={oakland} />
              <CountyBlock title="Macomb County" cities={macomb} />
            </div>
            <p style={{ fontSize: 11, color: "var(--s-muted)", marginTop: 14 }}>
              Superscripts refer to the numbered sources at the end of this page. School ranks are
              Niche&rsquo;s 2026 Michigan ranking (538 districts); set by district, not county.
            </p>
          </div>
        </section>

        <section className="bg-cream" style={{ padding: "80px 0" }}>
          <div className="container" style={{ maxWidth: 860, display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            <div className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff", padding: 30 }}>
              <h2 style={{ fontSize: 24, marginBottom: 14 }}>Choose Oakland County if…</h2>
              <ul style={{ display: "grid", gap: 10, fontSize: 14.5, lineHeight: 1.7, color: "var(--s-ink)", paddingLeft: 18 }}>
                <li>Top-ranked school districts are the priority (four in Michigan&rsquo;s top ten)</li>
                <li>You want a prestige address or a walkable downtown (Birmingham)</li>
                <li>Lake living (West Bloomfield) or estate space (Bloomfield Hills) appeals</li>
                <li>The higher price fits your budget and long-term plan</li>
              </ul>
            </div>
            <div className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff", padding: 30 }}>
              <h2 style={{ fontSize: 24, marginBottom: 14 }}>Choose Macomb County if…</h2>
              <ul style={{ display: "grid", gap: 10, fontSize: 14.5, lineHeight: 1.7, color: "var(--s-ink)", paddingLeft: 18 }}>
                <li>Affordability and a lower monthly payment come first</li>
                <li>A north-side Sterling Heights (Utica #72) address covers your school needs</li>
                <li>You&rsquo;re a first-time buyer or investor focused on value and cash flow</li>
                <li>You want the most house-for-the-money in Metro Detroit (Warren)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-cream-2" style={{ padding: "80px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal"><div className="s-eyebrow">FAQ</div><h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", marginBottom: 30 }}>County questions, answered directly</h2></div>
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
              Go deeper:{" "}
              <a href="/best-metro-detroit-suburbs" style={{ color: "var(--s-gold)", fontWeight: 600 }}>all seven suburbs ranked</a>{" "}·{" "}
              <a href="/best-school-districts-metro-detroit" style={{ color: "var(--s-gold)", fontWeight: 600 }}>best school districts</a>.
            </p>
          </div>
        </section>

        <section className="bg-cream-2" style={{ padding: "80px 0 100px", textAlign: "center" }}>
          <div className="container" style={{ maxWidth: 640 }}>
            <h2 style={{ fontSize: "clamp(26px, 3.4vw, 40px)", marginBottom: 14 }}>Oakland or Macomb — which fits your budget?</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--s-muted)", marginBottom: 30 }}>
              We close on both sides of the county line every month. Tell us your budget and priorities and
              we&rsquo;ll show you where it goes furthest.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/home-value" className="btn btn-gold">Get matched to a county <ArrowRight className="w-4 h-4" /></a>
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
