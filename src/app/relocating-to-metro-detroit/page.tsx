import type { Metadata } from "next";
import SiteShell from "@/components/site/SiteShell";
import { company } from "@/lib/config";
import { citations, rankedCities } from "@/lib/best-suburbs-guide";
import { ArrowRight, ChevronRight, CalendarDays, Landmark, Compass, Phone, MapPin } from "lucide-react";

const BASE = "https://marketcenterrealty.com";
const SLUG = "relocating-to-metro-detroit";
const URL = `${BASE}/${SLUG}`;

export const metadata: Metadata = {
  title: "Relocating to Metro Detroit: A Complete Suburb Guide (2026)",
  description:
    "Moving to Metro Detroit? A relocation guide to the best Oakland and Macomb County suburbs — matched to your priorities (schools, budget, luxury, lakes, first home) with sourced 2026 home values and school ranks. By a Troy, MI brokerage that handles relocations.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Relocating to Metro Detroit: A Complete Suburb Guide (2026)",
    description: "Pick the right Metro Detroit suburb by priority — schools, budget, luxury, or lakes.",
    type: "article",
    locale: "en_US",
    url: URL,
  },
};

const CITED_IDS = [1, 2, 3];

const faqs = [
  {
    question: "What's the best suburb to move to in Metro Detroit?",
    answer:
      "It depends on your priority, but for most relocating families Troy is the best all-around pick — Michigan's #3-ranked school district (Niche, 2026) at a mid-range price, with a large corporate employment base. If budget leads, Sterling Heights or Warren; if luxury, Birmingham or Bloomfield Hills; if lakes, West Bloomfield; if trails and top schools, Rochester Hills. This guide points you to the right one by what you care about most.",
  },
  {
    question: "Is Oakland or Macomb County better for relocating?",
    answer:
      "Oakland County runs pricier with top-ranked school districts (four in Michigan's top ten among the suburbs we serve); Macomb County is the affordability play. Many relocating families weigh a top district in Oakland against a lower payment in Macomb. We break the county trade-off down in a dedicated guide.",
  },
  {
    question: "What should I do first when relocating to Metro Detroit?",
    answer:
      "Two things, in order: get pre-approved with a local lender (Metro Detroit's better markets move fast — homes in the family price bands often sell in two to three weeks), and verify the exact school district for any specific address, because boundaries don't follow city limits and one street can change the assignment and the value. From there, shop with a clear budget and a target shortlist.",
  },
  {
    question: "How fast is the Metro Detroit housing market right now?",
    answer:
      "As of Q3 2026, homes still sell quickly in the mid-market — Rochester Hills and Sterling Heights around two weeks — while the luxury tier takes longer. We keep a sourced, dated market-update page current so relocating buyers can see exactly where each suburb stands before they commit.",
  },
];

export default function RelocatingPage() {
  const overview = [...rankedCities].sort((a, b) => a.city.localeCompare(b.city));
  const sources = citations.filter((c) => CITED_IDS.includes(c.id));

  const articleSchema = {
    "@context": "https://schema.org", "@type": "Article",
    headline: "Relocating to Metro Detroit: A Complete Suburb Guide (2026)",
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
      { "@type": "ListItem", position: 2, name: "Relocating to Metro Detroit", item: URL },
    ],
  };

  const paths = [
    { label: "I want the best schools", href: "/best-school-districts-metro-detroit", note: "Ranked districts + what a home costs in each" },
    { label: "I'm watching my budget", href: "/how-much-home-metro-detroit-budget", note: "What your budget buys, city by city" },
    { label: "I'm a first-time buyer", href: "/first-time-home-buyer-programs-michigan", note: "MSHDA + FHA down-payment help, explained" },
    { label: "I want luxury or estates", href: "/birmingham-vs-bloomfield-hills", note: "Birmingham vs Bloomfield Hills" },
    { label: "I want lake living", href: "/metro-detroit-lake-living-guide", note: "West Bloomfield and how to buy on the water" },
    { label: "Oakland or Macomb County?", href: "/oakland-county-vs-macomb-county", note: "The price-and-schools county divide" },
    { label: "Show me the full ranking", href: "/best-metro-detroit-suburbs", note: "All seven suburbs, ranked for 2026" },
    { label: "How's the market right now?", href: "/metro-detroit-housing-market-update", note: "Current, sourced Q3 2026 data" },
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
              <a href="/">Home</a><ChevronRight className="w-3 h-3" /><span style={{ color: "var(--navy)" }}>Relocating to Metro Detroit</span>
            </nav>
            <div className="s-eyebrow"><Compass className="w-3 h-3" style={{ marginRight: 2 }} />Relocation guide · 2026</div>
            <h1 style={{ fontSize: "clamp(32px, 4.4vw, 54px)", lineHeight: 1.12, marginBottom: 22 }}>Relocating to Metro Detroit: A Complete Suburb Guide</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", fontSize: 12.5, color: "var(--s-muted)", marginBottom: 34 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><CalendarDays className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />Published September 21, 2026</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><Landmark className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />By {company.name}, a Troy, MI brokerage</span>
            </div>
            <div className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid rgba(217,118,47,0.3)", background: "rgba(217,118,47,0.06)", padding: 30 }}>
              <div className="s-eyebrow">The short answer</div>
              <p style={{ fontSize: 16.5, lineHeight: 1.8, color: "var(--s-ink)" }}>
                Metro Detroit&rsquo;s suburbs sort cleanly by priority. For most relocating families,
                <strong> Troy</strong> is the best all-around choice — a #3 Michigan school district at a
                mid-range price. From there: <strong>Sterling Heights or Warren</strong> for budget,
                <strong> Birmingham or Bloomfield Hills</strong> for luxury, <strong>West Bloomfield</strong>
                for lakes, <strong>Rochester Hills</strong> for trails and a top-five district. Pick your
                priority below and we&rsquo;ll route you to the right sourced guide — every home value and
                school rank on this site is cited and dated.
              </p>
            </div>
          </div>
        </section>

        {/* Decision paths — the hub */}
        <section className="bg-cream-2" style={{ padding: "70px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal"><div className="s-eyebrow">Start here</div><h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", marginBottom: 26 }}>What matters most to you?</h2></div>
            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
              {paths.map((p) => (
                <a key={p.href} href={p.href} className="reveal" style={{ display: "block", borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff", padding: 22, textDecoration: "none" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                    <span style={{ fontSize: 16, fontWeight: 600, color: "var(--s-ink)" }}>{p.label}</span>
                    <ArrowRight className="w-4 h-4" style={{ color: "var(--s-gold)", flexShrink: 0 }} />
                  </div>
                  <p style={{ fontSize: 13, color: "var(--s-muted)", marginTop: 6 }}>{p.note}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Overview table */}
        <section className="bg-cream" style={{ padding: "80px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal"><div className="s-eyebrow">The lay of the land</div><h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", marginBottom: 10 }}>The seven suburbs we serve</h2>
              <p style={{ fontSize: 13.5, color: "var(--s-muted)", marginBottom: 26, maxWidth: 760 }}>Typical home value (Zillow, June 2026) and each suburb&rsquo;s primary school-district rank (Niche 2026). Click any city for its full guide.</p>
            </div>
            <div className="reveal" style={{ overflowX: "auto", borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff" }}>
              <table style={{ width: "100%", textAlign: "left", fontSize: 13.5, minWidth: 560, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--line)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--s-muted)" }}>
                    <th style={{ padding: "14px 20px", fontWeight: 600 }}>City</th>
                    <th style={{ padding: "14px 20px", fontWeight: 600 }}>Typical value¹</th>
                    <th style={{ padding: "14px 20px", fontWeight: 600 }}>Best known for</th>
                    <th style={{ padding: "14px 20px", fontWeight: 600 }}>Schools³</th>
                  </tr>
                </thead>
                <tbody>
                  {overview.map((c) => (
                    <tr key={c.city} style={{ borderTop: "1px solid var(--line)" }}>
                      <td style={{ padding: "13px 20px", fontWeight: 600, color: "var(--s-ink)" }}><a href={`/${c.citySlug}`}>{c.city}</a></td>
                      <td style={{ padding: "13px 20px", color: "var(--s-ink)", fontVariantNumeric: "tabular-nums" }}>{c.stats.zhvi}</td>
                      <td style={{ padding: "13px 20px", color: "var(--s-muted)" }}>{c.bestFor}</td>
                      <td style={{ padding: "13px 20px", color: "var(--s-muted)" }}>{c.stats.nicheRank}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 11, color: "var(--s-muted)", marginTop: 14 }}>Superscripts refer to the numbered sources at the end of this page.</p>
          </div>
        </section>

        {/* Practical steps */}
        <section className="bg-cream-2" style={{ padding: "70px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal">
              <div className="s-eyebrow">Before you move</div>
              <h2 style={{ fontSize: "clamp(24px, 2.8vw, 32px)", marginBottom: 18 }}>Three relocation must-dos</h2>
              <div style={{ display: "grid", gap: 16, fontSize: 15.5, lineHeight: 1.8, color: "var(--s-ink)" }}>
                <p><strong>1. Get pre-approved first.</strong> Metro Detroit&rsquo;s better markets move in two to three weeks; relocating buyers who show up pre-approved win, and those who don&rsquo;t lose homes. Use a local lender who knows Michigan programs.</p>
                <p><strong>2. Verify the school district by address, not city.</strong> Boundaries don&rsquo;t follow city limits in Troy, Rochester Hills, Sterling Heights, West Bloomfield, or Warren — one street can change the assignment and the home&rsquo;s value. We check the exact attendance zone on every listing.</p>
                <p><strong>3. Weigh the county trade-off.</strong> Oakland County buys top-ranked schools and prestige at a higher price; Macomb County buys value and a lower payment. Knowing which you&rsquo;re optimizing for narrows the search fast.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-cream" style={{ padding: "80px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal"><div className="s-eyebrow">FAQ</div><h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", marginBottom: 30 }}>Relocation questions, answered directly</h2></div>
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

        <section className="bg-cream-2" style={{ padding: "60px 0" }}>
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
          </div>
        </section>

        <section className="bg-cream" style={{ padding: "80px 0 100px", textAlign: "center" }}>
          <div className="container" style={{ maxWidth: 640 }}>
            <h2 style={{ fontSize: "clamp(26px, 3.4vw, 40px)", marginBottom: 14 }}>Moving to Metro Detroit? Let&rsquo;s make it easy.</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--s-muted)", marginBottom: 30 }}>
              We handle relocations start to finish — from a first virtual tour to closing day. Tell us your
              timeline, budget, and must-haves, and we&rsquo;ll build your shortlist before you land.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/home-value" className="btn btn-gold">Start your relocation <ArrowRight className="w-4 h-4" /></a>
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
