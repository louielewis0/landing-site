import type { Metadata } from "next";
import SiteShell from "@/components/site/SiteShell";
import { company } from "@/lib/config";
import { citations } from "@/lib/best-suburbs-guide";
import { schoolsMeta, districtEntries, schoolsFaqs } from "@/lib/school-districts-guide";
import {
  MapPin,
  ArrowRight,
  ChevronRight,
  CalendarDays,
  Landmark,
  GraduationCap,
  Phone,
} from "lucide-react";

const BASE = "https://marketcenterrealty.com";
const URL = `${BASE}/${schoolsMeta.slug}`;

export const metadata: Metadata = {
  title: schoolsMeta.metaTitle,
  description: schoolsMeta.metaDescription,
  alternates: { canonical: URL },
  openGraph: {
    title: schoolsMeta.metaTitle,
    description: schoolsMeta.metaDescription,
    type: "article",
    locale: "en_US",
    url: URL,
  },
};

/** Citations shown on this page (subset of the shared numbered list). */
const CITED_IDS = [1, 2, 3, 5, 6, 7];

export default function SchoolDistrictsGuidePage() {
  const sources = citations.filter((c) => CITED_IDS.includes(c.id));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: schoolsMeta.title,
    datePublished: schoolsMeta.datePublished,
    dateModified: schoolsMeta.dateModified,
    url: URL,
    author: { "@type": "Organization", name: company.name, url: BASE },
    publisher: { "@type": "Organization", name: company.name, url: BASE },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: schoolsMeta.title,
    numberOfItems: districtEntries.length,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    itemListElement: districtEntries.map((d) => ({
      "@type": "ListItem",
      position: d.rank,
      name: `${d.district} — ${d.nicheRank}`,
      url: `${URL}#${d.district.toLowerCase().replace(/\s+/g, "-")}`,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: schoolsFaqs.map((f) => ({
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
      { "@type": "ListItem", position: 2, name: "Best School Districts in Metro Detroit", item: URL },
    ],
  };

  return (
    <SiteShell>
      <main style={{ paddingTop: 24 }} className="bg-cream">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
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
              <span style={{ color: "var(--navy)" }}>Best School Districts</span>
            </nav>

            <div className="s-eyebrow">
              <GraduationCap className="w-3 h-3" style={{ marginRight: 2 }} />
              Metro Detroit · 2026 Schools Guide
            </div>

            <h1 style={{ fontSize: "clamp(32px, 4.4vw, 54px)", lineHeight: 1.12, marginBottom: 22 }}>
              The Best School Districts in Metro Detroit, Ranked — and What a Home Costs in Each
            </h1>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", fontSize: 12.5, color: "var(--s-muted)", marginBottom: 34 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <CalendarDays className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />
                Published August 3, 2026 · ranks from Niche&rsquo;s 2026 Michigan list · home values June 2026
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <Landmark className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />
                By {company.name}, a Troy, MI brokerage
              </span>
            </div>

            {/* TL;DR — the direct answer, first */}
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
              <p style={{ fontSize: 16.5, lineHeight: 1.8, color: "var(--s-ink)" }}>{schoolsMeta.shortAnswer}</p>
            </div>
          </div>
        </section>

        {/* ── Ranked table ── */}
        <section className="bg-cream-2" style={{ padding: "70px 0" }}>
          <div className="container">
            <div className="reveal">
              <div className="s-eyebrow">Side by side</div>
              <h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", marginBottom: 10 }}>
                Six districts, one table
              </h2>
              <p style={{ fontSize: 13.5, color: "var(--s-muted)", marginBottom: 26, maxWidth: 760 }}>
                Ranks are Niche&rsquo;s 2026 Best School Districts in Michigan (538 districts ranked) — one
                rating methodology, quoted as published, not an official state assessment. Home values are
                Zillow&rsquo;s typical home value for the district&rsquo;s primary city, June 2026.
              </p>
            </div>
            <div className="reveal" style={{ overflowX: "auto", borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff" }}>
              <table style={{ width: "100%", textAlign: "left", fontSize: 13.5, minWidth: 760, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--line)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--s-muted)" }}>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>#</th>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>District</th>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>Niche 2026 rank³</th>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>Primary city</th>
                    <th style={{ padding: "16px 20px", fontWeight: 600 }}>Typical home value¹</th>
                  </tr>
                </thead>
                <tbody>
                  {districtEntries.map((d) => {
                    const stats = d.take.match(/\$[\d,]+/)?.[0] ?? "—";
                    return (
                      <tr key={d.district} style={{ borderTop: "1px solid var(--line)" }}>
                        <td style={{ padding: "16px 20px", color: "var(--s-gold)", fontWeight: 600 }}>{d.rank}</td>
                        <td style={{ padding: "16px 20px", fontWeight: 600, color: "var(--s-ink)" }}>
                          <a href={`#${d.district.toLowerCase().replace(/\s+/g, "-")}`}>{d.district}</a>
                        </td>
                        <td style={{ padding: "16px 20px" }}>{d.nicheRank.replace(" (Niche 2026)", "")}</td>
                        <td style={{ padding: "16px 20px" }}>
                          <a href={`/${d.citySlug}`} style={{ color: "var(--s-gold)" }}>{d.city}</a>
                        </td>
                        <td style={{ padding: "16px 20px", fontVariantNumeric: "tabular-nums" }}>{stats}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 11, color: "var(--s-muted)", marginTop: 14 }}>
              Superscripts refer to the numbered sources at the end of this page.
            </p>
          </div>
        </section>

        {/* ── Ranked entries ── */}
        <section className="bg-cream" style={{ padding: "80px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div style={{ display: "grid", gap: 56 }}>
              {districtEntries.map((d) => (
                <article key={d.district} id={d.district.toLowerCase().replace(/\s+/g, "-")} className="reveal" style={{ scrollMarginTop: 110 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 6 }}>
                    <span style={{ fontFamily: "var(--font-fraunces)", fontSize: 44, lineHeight: 1, color: "var(--s-gold)" }}>{d.rank}</span>
                    <h2 style={{ fontSize: "clamp(24px, 3vw, 34px)", lineHeight: 1.15 }}>{d.district}</h2>
                  </div>
                  <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--s-gold)", marginBottom: 18 }}>
                    {d.nicheRank} · {d.city}
                  </p>
                  <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--s-ink)", marginBottom: 14 }}>{d.take}</p>
                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: 1.75,
                      color: "var(--s-muted)",
                      borderLeft: "2px solid rgba(217,118,47,0.4)",
                      paddingLeft: 16,
                      marginBottom: 16,
                    }}
                  >
                    <strong style={{ color: "var(--s-ink)" }}>Boundary check:</strong> {d.boundaryNote}
                  </p>
                  <a
                    href={`/${d.citySlug}`}
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--s-gold)", fontWeight: 600 }}
                  >
                    Read our full {d.city} buyer &amp; seller guide
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </article>
              ))}

              {/* Honest Warren note — absence stated, not hidden */}
              <article className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff", padding: 28 }}>
                <h2 style={{ fontSize: 22, marginBottom: 10 }}>Where&rsquo;s Warren?</h2>
                <p style={{ fontSize: 14.5, lineHeight: 1.8, color: "var(--s-muted)" }}>
                  Six public districts serve the city of Warren (per the city&rsquo;s official schools page),
                  and none of them appears in the top 225 of Niche&rsquo;s 2026 Michigan ranking. Warren is
                  Metro Detroit&rsquo;s <a href="/warren-real-estate-agent" style={{ color: "var(--s-gold)" }}>affordability play</a> — the
                  lowest home prices of the seven cities we serve — rather than its schools play. We&rsquo;d
                  rather tell you that plainly than bury it.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ── Methodology ── */}
        <section className="bg-cream-2" style={{ padding: "70px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal">
              <div className="s-eyebrow">How this list was built</div>
              <div style={{ display: "grid", gap: 16, fontSize: 15, lineHeight: 1.8, color: "var(--s-ink)" }}>
                <p>
                  Ranks come from one named source — Niche&rsquo;s 2026 Best School Districts in Michigan —
                  quoted exactly as published and attributed as Niche&rsquo;s opinion. Home values are
                  Zillow&rsquo;s smoothed typical home value (June 2026) for each district&rsquo;s primary
                  city. Boundary statements were verified against official district and municipal sites in
                  July 2026. We are a Troy brokerage; the #1 district on this list is our home city&rsquo;s,
                  so check the sources rather than taking our word for it.
                </p>
                <p>
                  What we didn&rsquo;t do: average rating systems together, quote undated test scores, or
                  guess at boundaries. Where a district&rsquo;s rank isn&rsquo;t in Niche&rsquo;s top tier —
                  Warren&rsquo;s six districts — we say so instead of omitting it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-cream" style={{ padding: "80px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal">
              <div className="s-eyebrow">FAQ</div>
              <h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", marginBottom: 30 }}>
                Common questions, answered directly
              </h2>
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              {schoolsFaqs.map((f) => (
                <details
                  key={f.question}
                  className="reveal"
                  style={{ borderRadius: 18, border: "1px solid var(--line)", background: "#fff", padding: "20px 24px" }}
                >
                  <summary style={{ fontSize: 15.5, fontWeight: 600, color: "var(--s-ink)", cursor: "pointer" }}>
                    {f.question}
                  </summary>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--s-muted)", marginTop: 12 }}>{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Sources ── */}
        <section className="bg-cream-2" style={{ padding: "60px 0" }}>
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
              Comparing whole cities instead of districts? See{" "}
              <a href="/best-metro-detroit-suburbs" style={{ color: "var(--s-gold)", fontWeight: 600 }}>
                the 7 best Metro Detroit suburbs to buy a home in 2026, ranked
              </a>
              .
            </p>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-cream" style={{ padding: "80px 0 100px", textAlign: "center" }}>
          <div className="container" style={{ maxWidth: 640 }}>
            <h2 style={{ fontSize: "clamp(26px, 3.4vw, 40px)", marginBottom: 14 }}>
              Want the attendance zone verified before you offer?
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--s-muted)", marginBottom: 30 }}>
              We check the exact district assignment on every listing we show — because one block can change
              the school, and the school changes the value.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/home-value" className="btn btn-gold">
                Talk to a boundary-literate agent <ArrowRight className="w-4 h-4" />
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
