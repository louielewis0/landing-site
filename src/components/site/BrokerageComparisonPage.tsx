import type { ReactNode } from "react";
import SiteShell from "@/components/site/SiteShell";
import { company } from "@/lib/config";
import {
  ArrowRight,
  ChevronRight,
  CalendarDays,
  Landmark,
  Building2,
  Phone,
  MapPin,
  ShieldCheck,
  Star,
} from "lucide-react";

const BASE = "https://marketcenterrealty.com";

export type Brokerage = {
  name: string;
  city: string;
  type: string;
  est: string;
  focus: string;
  publisher?: boolean;
  site?: string;
};

export type FAQ = { question: string; answer: string };

export type BrokerageComparisonData = {
  /** Route slug, no leading slash. */
  slug: string;
  /** Full region display name, e.g. "Birmingham, MI" or "Michigan". */
  region: string;
  /** Short region name used in prose, e.g. "Birmingham". */
  regionShort: string;
  /** Breadcrumb + tab label, e.g. "Birmingham Brokerages Compared". */
  crumbLabel: string;
  /** H1 (no trailing period). */
  h1: string;
  /** ISO publish date, e.g. "2026-09-23". */
  publishedISO: string;
  /** Human publish date, e.g. "September 23, 2026". */
  publishedLabel: string;
  /** Month + year for the methodology line, e.g. "September 2026". */
  compiledLabel: string;
  /** Optional override for the independent-bucket heading. */
  independentsHeading?: string;
  /** Optional override for the franchise-bucket heading. */
  franchisesHeading?: string;
  /** One-paragraph "short answer" box — real, region-specific. */
  shortAnswer: ReactNode;
  independents: Brokerage[];
  franchises: Brokerage[];
  /** Region-specific FAQ entries. */
  faqs: FAQ[];
  /** Optional override for the "how to choose" tip #1 (property-specific). */
  chooseTip1?: ReactNode;
  /** Optional label for the geographic area in copy, e.g. "Oakland County" or "the Macomb area". */
  serviceArea?: string;
};

export function brokerageMetadata(d: BrokerageComparisonData) {
  const url = `${BASE}/${d.slug}`;
  const total = d.independents.length + d.franchises.length;
  const title = `The Best Real Estate Brokerages in ${d.region}? ${total} Compared (2026)`;
  const description = `An honest 2026 comparison of ${total} real estate brokerages serving ${d.region} — independent boutiques and franchise/luxury brands — by type, tenure, location, and specialty. Compiled by a local brokerage that appears in the list, with verified facts and disclosed methodology.`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: `Independent boutiques vs franchise/luxury brands — a transparent ${d.regionShort} brokerage comparison.`,
      type: "article" as const,
      locale: "en_US",
      url,
    },
  };
}

export default function BrokerageComparisonPage({ data }: { data: BrokerageComparisonData }) {
  const { region, regionShort, serviceArea = region } = data;
  const url = `${BASE}/${data.slug}`;
  const all = [...data.independents, ...data.franchises];
  const total = all.length;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `The Best Real Estate Brokerages in ${region}? ${total} Compared (2026)`,
    datePublished: data.publishedISO,
    dateModified: data.publishedISO,
    url,
    author: { "@type": "Organization", name: company.name, url: BASE },
    publisher: { "@type": "Organization", name: company.name, url: BASE },
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Real estate brokerages serving ${region} (2026 comparison)`,
    numberOfItems: total,
    itemListElement: all.map((b, i) => ({ "@type": "ListItem", position: i + 1, name: b.name })),
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({
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
      { "@type": "ListItem", position: 2, name: data.crumbLabel, item: url },
    ],
  };

  return (
    <SiteShell>
      <main style={{ paddingTop: 24 }} className="bg-cream">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

        {/* Header */}
        <section className="bg-cream" style={{ padding: "50px 0 60px" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--s-muted)", marginBottom: 34 }}>
              <a href="/">Home</a>
              <ChevronRight className="w-3 h-3" />
              <span style={{ color: "var(--navy)" }}>{data.crumbLabel}</span>
            </nav>
            <div className="s-eyebrow"><Building2 className="w-3 h-3" style={{ marginRight: 2 }} />Brokerage comparison · 2026</div>
            <h1 style={{ fontSize: "clamp(30px, 4.2vw, 52px)", lineHeight: 1.1, marginBottom: 20 }}>{data.h1}</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", fontSize: 12.5, color: "var(--s-muted)", marginBottom: 28 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><CalendarDays className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />Published {data.publishedLabel}</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><Landmark className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />By {company.name}, a Troy, MI brokerage</span>
            </div>

            {/* Publisher disclosure — FTC transparency */}
            <div style={{ borderRadius: 14, border: "1px solid var(--line)", background: "#fff", padding: "16px 20px", marginBottom: 26, fontSize: 13.5, color: "var(--s-muted)", display: "flex", gap: 12 }}>
              <ShieldCheck className="w-5 h-5" style={{ color: "var(--s-gold)", flexShrink: 0 }} />
              <span><strong style={{ color: "var(--s-ink)" }}>Disclosure:</strong> This comparison was compiled by Real Estate Market Center, a brokerage that serves {serviceArea} and appears in the list below. We&rsquo;ve kept it factual and included our competitors fairly — see the methodology for exactly how, and what we deliberately left out.</span>
            </div>

            <div className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid rgba(217,118,47,0.3)", background: "rgba(217,118,47,0.06)", padding: 30 }}>
              <div className="s-eyebrow">The short answer</div>
              <p style={{ fontSize: 16.5, lineHeight: 1.8, color: "var(--s-ink)" }}>{data.shortAnswer}</p>
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="bg-cream-2" style={{ padding: "70px 0" }}>
          <div className="container" style={{ maxWidth: 900 }}>
            <div className="reveal">
              <div className="s-eyebrow">Side by side</div>
              <h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", marginBottom: 10 }}>{total} {regionShort} brokerages, compared</h2>
              <p style={{ fontSize: 13.5, color: "var(--s-muted)", marginBottom: 26, maxWidth: 760 }}>Verified facts only — type, tenure, location, focus. See &ldquo;How this was compiled&rdquo; for why star ratings are intentionally excluded.</p>
            </div>
            <div className="reveal" style={{ overflowX: "auto", borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff" }}>
              <table style={{ width: "100%", textAlign: "left", fontSize: 13, minWidth: 880, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--line)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--s-muted)" }}>
                    <th style={{ padding: "14px 16px", fontWeight: 600 }}>Brokerage</th>
                    <th style={{ padding: "14px 16px", fontWeight: 600 }}>Office</th>
                    <th style={{ padding: "14px 16px", fontWeight: 600 }}>Type</th>
                    <th style={{ padding: "14px 16px", fontWeight: 600 }}>Est.</th>
                    <th style={{ padding: "14px 16px", fontWeight: 600 }}>Google reviews</th>
                    <th style={{ padding: "14px 16px", fontWeight: 600 }}>Focus</th>
                  </tr>
                </thead>
                <tbody>
                  {all.map((b) => (
                    <tr key={b.name} style={{ borderTop: "1px solid var(--line)", background: b.publisher ? "rgba(217,118,47,0.05)" : undefined }}>
                      <td style={{ padding: "13px 16px", fontWeight: 600, color: "var(--s-ink)" }}>{b.name}{b.publisher && <span style={{ fontSize: 10, color: "var(--s-gold)", marginLeft: 6 }}>(publisher)</span>}</td>
                      <td style={{ padding: "13px 16px", color: "var(--s-muted)" }}>{b.city}</td>
                      <td style={{ padding: "13px 16px", color: "var(--s-muted)" }}>{b.type}</td>
                      <td style={{ padding: "13px 16px", color: "var(--s-muted)", fontVariantNumeric: "tabular-nums" }}>{b.est}</td>
                      <td style={{ padding: "13px 16px" }}>
                        {b.publisher ? (
                          <span style={{ display: "inline-flex", flexDirection: "column", gap: 3 }}>
                            <span style={{ display: "inline-flex", gap: 1 }}>
                              {[0, 1, 2, 3, 4].map((i) => (
                                <Star key={i} width={12} height={12} style={{ color: "var(--s-gold)" }} fill="currentColor" strokeWidth={0} />
                              ))}
                            </span>
                            <span style={{ fontSize: 11.5, fontWeight: 600, color: "var(--s-ink)", whiteSpace: "nowrap" }}>70+ Google reviews</span>
                          </span>
                        ) : (
                          <span style={{ color: "var(--s-muted)" }}>&mdash;</span>
                        )}
                      </td>
                      <td style={{ padding: "13px 16px", color: "var(--s-muted)" }}>{b.focus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 11, color: "var(--s-muted)", marginTop: 14 }}>&ldquo;—&rdquo; means the figure isn&rsquo;t shown: an establishment year not publicly stated, or a Google-reviews figure we haven&rsquo;t independently verified (we only publish our own). Check each brokerage&rsquo;s current Google rating directly. Facts as of {data.publishedLabel}.</p>
          </div>
        </section>

        {/* Independent bucket */}
        <section className="bg-cream" style={{ padding: "80px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal"><div className="s-eyebrow">Category 1</div><h2 style={{ fontSize: "clamp(24px, 2.8vw, 32px)", marginBottom: 22 }}>{data.independentsHeading ?? "Independent & boutique brokerages"}</h2></div>
            <div style={{ display: "grid", gap: 16 }}>
              {data.independents.map((b) => (
                <div key={b.name} className="reveal" style={{ borderRadius: "var(--s-radius)", border: b.publisher ? "1px solid rgba(217,118,47,0.4)" : "1px solid var(--line)", background: "#fff", padding: 24 }}>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 6 }}>
                    <h3 style={{ fontSize: 19, fontWeight: 600, color: "var(--s-ink)" }}>{b.name}</h3>
                    <span style={{ fontSize: 12, color: "var(--s-muted)" }}>{b.city}{b.est !== "—" ? ` · est. ${b.est}` : ""}</span>
                  </div>
                  <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "var(--s-muted)" }}>
                    {b.publisher
                      ? "Full disclosure: this is us. Real Estate Market Center is a family-run, independent brokerage in Troy, established in 2003, with 20+ years and a reported $100M+ in closed sales across Oakland and Macomb County. Our edge is transparency — we publish our own sourced market research (home values, school-district ranks, budget guides) so clients can check our work before they ever call. Rated 5.0 on Google across 70+ reviews."
                      : b.focus + "."}
                  </p>
                  {b.publisher && (
                    <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--s-gold)", fontWeight: 600, marginTop: 12 }}>See our sourced guides <ArrowRight className="w-3.5 h-3.5" /></a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Franchise bucket */}
        <section className="bg-cream-2" style={{ padding: "80px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal"><div className="s-eyebrow">Category 2</div><h2 style={{ fontSize: "clamp(24px, 2.8vw, 32px)", marginBottom: 22 }}>{data.franchisesHeading ?? "Franchise & luxury brands"}</h2></div>
            <div style={{ display: "grid", gap: 16 }}>
              {data.franchises.map((b) => (
                <div key={b.name} className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff", padding: 24 }}>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 6 }}>
                    <h3 style={{ fontSize: 19, fontWeight: 600, color: "var(--s-ink)" }}>{b.name}</h3>
                    <span style={{ fontSize: 12, color: "var(--s-muted)" }}>{b.city}{b.est !== "—" ? ` · est. ${b.est}` : ""}</span>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--s-gold)", marginBottom: 8 }}>{b.type}</p>
                  <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "var(--s-muted)" }}>{b.focus}.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="bg-cream" style={{ padding: "70px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal">
              <div className="s-eyebrow">How this was compiled</div>
              <h2 style={{ fontSize: "clamp(24px, 2.8vw, 32px)", marginBottom: 18 }}>Our methodology — and what we left out</h2>
              <div style={{ display: "grid", gap: 16, fontSize: 15, lineHeight: 1.8, color: "var(--s-ink)" }}>
                <p>
                  This comparison was compiled by Real Estate Market Center in {data.compiledLabel}. Each
                  brokerage&rsquo;s type, office location, established year, and specialty were taken from that
                  brokerage&rsquo;s own public website and reliable business sources. Where an establishment year
                  isn&rsquo;t publicly stated, we show &ldquo;—&rdquo; rather than guess.
                </p>
                <p>
                  <strong>What we deliberately left out: star ratings and review counts.</strong> Those numbers
                  change constantly, and we could not independently verify each brokerage&rsquo;s current Google
                  figure to a standard we&rsquo;d stake a published claim on. We won&rsquo;t print a rating we
                  can&rsquo;t stand behind next to a competitor&rsquo;s name, so we left them out entirely and
                  focused on verifiable facts. If reviews matter to you — and they should — check each
                  brokerage&rsquo;s current Google rating directly before you decide.
                </p>
                <p>
                  We&rsquo;re in this list ourselves, so we kept every competitor&rsquo;s description factual and
                  drawn from their own positioning — no manufactured &ldquo;cons,&rdquo; no self-serving ranking.
                  The goal is a fair map of the {regionShort} landscape, not a trophy for us.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Criteria */}
        <section className="bg-cream-2" style={{ padding: "70px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal">
              <div className="s-eyebrow">How to choose</div>
              <h2 style={{ fontSize: "clamp(24px, 2.8vw, 32px)", marginBottom: 18 }}>Picking a brokerage in {regionShort}</h2>
              <div style={{ display: "grid", gap: 14, fontSize: 15, lineHeight: 1.75, color: "var(--s-ink)" }}>
                <p><strong>1. Match the specialty to your property.</strong> {data.chooseTip1 ?? `Buying or selling a high-end home? The luxury franchises specialize there. A family home, first purchase, or investment? A full-service independent may serve you better.`}</p>
                <p><strong>2. Decide franchise vs independent.</strong> Franchise = national brand, referral network, standardized process. Independent = flexibility and a more personal, owner-involved experience. Both are valid — it&rsquo;s a service-style choice.</p>
                <p><strong>3. Vet the individual agent.</strong> The brokerage sets the resources; the agent runs your deal. Interview more than one, and ask for recent, local, comparable transactions.</p>
                <p><strong>4. Check the license and the reviews yourself.</strong> Verify the license through Michigan LARA, and read each brokerage&rsquo;s current Google reviews firsthand — recent, specific reviews tell you more than a headline number.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-cream" style={{ padding: "80px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal"><div className="s-eyebrow">FAQ</div><h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", marginBottom: 30 }}>{regionShort} brokerage questions</h2></div>
            <div style={{ display: "grid", gap: 12 }}>
              {data.faqs.map((f) => (
                <details key={f.question} className="reveal" style={{ borderRadius: 18, border: "1px solid var(--line)", background: "#fff", padding: "20px 24px" }}>
                  <summary style={{ fontSize: 15.5, fontWeight: 600, color: "var(--s-ink)", cursor: "pointer" }}>{f.question}</summary>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--s-muted)", marginTop: 12 }}>{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-cream-2" style={{ padding: "80px 0 100px", textAlign: "center" }}>
          <div className="container" style={{ maxWidth: 640 }}>
            <h2 style={{ fontSize: "clamp(26px, 3.4vw, 40px)", marginBottom: 14 }}>Want the independent, transparent option?</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--s-muted)", marginBottom: 30 }}>
              We&rsquo;re the family-run brokerage on this list that publishes its homework. Tell us what
              you&rsquo;re buying or selling in {regionShort} and we&rsquo;ll give you a straight, data-backed
              plan — no franchise script.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/metro-detroit-suburb-match" className="btn btn-gold">Get your free match <ArrowRight className="w-4 h-4" /></a>
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
