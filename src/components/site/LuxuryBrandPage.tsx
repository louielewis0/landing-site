import type { ReactNode } from "react";
import SiteShell from "@/components/site/SiteShell";
import { company } from "@/lib/config";
import { ArrowRight, ChevronRight, Phone, MapPin } from "lucide-react";

const BASE = "https://marketcenterrealty.com";
const SERIF = 'var(--font-display), "Cormorant Garamond", Georgia, serif';

export type LuxFAQ = { question: string; answer: string };
export type LuxSection = { heading: string; body: ReactNode };

export type LuxuryBrandData = {
  slug: string;
  crumbLabel: string;
  eyebrow: string;
  h1: ReactNode;
  h1Text: string;
  sub: ReactNode;
  heroImage?: string;
  heroImageAlt?: string;
  stats?: { value: string; label: string }[];
  sections: LuxSection[];
  awardBand?: boolean;
  faqs: LuxFAQ[];
  faqHeading: string;
  related: { href: string; label: string }[];
  ctaHeading: string;
  ctaBody: ReactNode;
  ctaPrimary: { href: string; label: string };
  /** Optional extra JSON-LD (e.g. Person) injected alongside the standard schema. */
  extraSchema?: Record<string, unknown>;
  publishedISO: string;
  metaTitle: string;
  metaDescription: string;
};

export function luxuryMetadata(d: LuxuryBrandData) {
  const url = `${BASE}/${d.slug}`;
  return {
    title: d.metaTitle,
    description: d.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: d.metaTitle, description: d.metaDescription, type: "website" as const, url, siteName: company.name },
    robots: { index: true, follow: true },
  };
}

export default function LuxuryBrandPage({ data }: { data: LuxuryBrandData }) {
  const url = `${BASE}/${data.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: data.h1Text,
    url,
    datePublished: data.publishedISO,
    dateModified: data.publishedISO,
    publisher: { "@type": "Organization", name: company.name, url: BASE },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
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
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        {data.extraSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data.extraSchema) }} />
        )}

        {/* ── Cinematic navy hero ── */}
        <section style={{ background: "#121A24", color: "#F1EADB", padding: "clamp(40px,7vw,96px) 0 clamp(44px,6vw,80px)" }}>
          <div className="container" style={{ maxWidth: 1060 }}>
            <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(241,234,219,0.5)", marginBottom: 40 }}>
              <a href="/" style={{ color: "rgba(241,234,219,0.6)" }}>Home</a>
              <ChevronRight className="w-3 h-3" />
              <span style={{ color: "rgba(241,234,219,0.85)" }}>{data.crumbLabel}</span>
            </nav>

            <div style={{ display: "grid", gridTemplateColumns: data.heroImage ? "minmax(0,1.5fr) minmax(0,0.9fr)" : "1fr", gap: "clamp(28px,5vw,64px)", alignItems: "center" }}>
              <div>
                <div style={{ color: "var(--s-gold-ink)", fontWeight: 700, fontSize: 13, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 20 }}>{data.eyebrow}</div>
                <h1 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(40px,6.4vw,76px)", lineHeight: 1.03, letterSpacing: "-0.01em", color: "#F1EADB", margin: 0 }}>{data.h1}</h1>
                <div style={{ width: 72, height: 2, background: "var(--s-gold)", margin: "28px 0 26px" }} />
                <p style={{ fontSize: 17.5, lineHeight: 1.75, color: "rgba(241,234,219,0.82)", maxWidth: 620, margin: 0 }}>{data.sub}</p>
              </div>
              {data.heroImage && (
                <div style={{ justifySelf: "center" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={data.heroImage}
                    alt={data.heroImageAlt ?? data.h1Text}
                    width={300}
                    height={360}
                    style={{ width: "min(300px,78vw)", height: "auto", aspectRatio: "5/6", objectFit: "cover", borderRadius: 16, border: "1px solid rgba(228,80,30,0.5)", boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}
                  />
                </div>
              )}
            </div>

            {data.stats && data.stats.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "28px 0", marginTop: "clamp(40px,5vw,64px)", borderTop: "1px solid rgba(241,234,219,0.14)", paddingTop: 34 }}>
                {data.stats.map((s, i) => (
                  <div key={s.label} style={{ flex: "1 1 160px", paddingLeft: i === 0 ? 0 : 24, borderLeft: i === 0 ? "none" : "1px solid rgba(241,234,219,0.14)" }}>
                    <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(30px,4vw,44px)", color: "var(--s-gold)", lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: 11.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(241,234,219,0.6)", marginTop: 10 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Editorial sections ── */}
        {data.sections.map((s, i) => (
          <section key={s.heading} className={i % 2 === 0 ? "bg-cream" : "bg-cream-2"} style={{ padding: "clamp(44px,6vw,72px) 0" }}>
            <div className="container" style={{ maxWidth: 820 }}>
              <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(26px,3.4vw,40px)", letterSpacing: "-0.01em", color: "var(--navy)", marginBottom: 22, lineHeight: 1.1 }}>{s.heading}</h2>
              <div style={{ fontSize: 16, lineHeight: 1.85, color: "var(--s-ink)", display: "grid", gap: 16 }}>{s.body}</div>
            </div>
          </section>
        ))}

        {/* ── Award band ── */}
        {data.awardBand && (
          <section style={{ background: "#121A24", color: "#F1EADB", padding: "clamp(48px,6vw,72px) 0", textAlign: "center" }}>
            <div className="container" style={{ maxWidth: 680 }}>
              <a href="/best-real-estate-brokerage-in-michigan" style={{ display: "inline-block", marginBottom: 20 }} title="Named #1 real estate brokerage in Michigan by TownAnswer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/townanswer-award-2026.svg" alt="Certified TownAnswer Best 2026 — #1 Real Estate Brokerage in Michigan" width={300} height={89} style={{ maxWidth: "88%", height: "auto", borderRadius: 14 }} />
              </a>
              <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(24px,3vw,34px)", color: "#F1EADB", margin: "0 0 10px" }}>
                Michigan&rsquo;s <span style={{ color: "var(--s-gold)" }}>#1</span> real estate brokerage, 2026
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(241,234,219,0.75)", margin: "0 auto 18px", maxWidth: 520 }}>
                Named first of 1,634 Michigan brokerages by TownAnswer &mdash; on a methodology businesses can&rsquo;t pay to influence. 5.0&#9733; across 85+ Google reviews.
              </p>
              <a href="/best-real-estate-brokerage-in-michigan" style={{ color: "var(--s-gold-ink)", fontWeight: 600, fontSize: 14, display: "inline-flex", alignItems: "center", gap: 6 }}>
                See how we earned it <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </section>
        )}

        {/* ── FAQ ── */}
        <section className={data.sections.length % 2 === 0 ? "bg-cream" : "bg-cream-2"} style={{ padding: "clamp(48px,6vw,76px) 0" }}>
          <div className="container" style={{ maxWidth: 820 }}>
            <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(26px,3.4vw,40px)", color: "var(--navy)", marginBottom: 28, lineHeight: 1.1 }}>{data.faqHeading}</h2>
            <div style={{ display: "grid", gap: 12 }}>
              {data.faqs.map((f) => (
                <details key={f.question} style={{ borderRadius: 16, border: "1px solid var(--line)", background: "#fff", padding: "20px 26px" }}>
                  <summary style={{ fontSize: 16, fontWeight: 600, color: "var(--s-ink)", cursor: "pointer" }}>{f.question}</summary>
                  <p style={{ fontSize: 14.5, lineHeight: 1.8, color: "var(--s-muted)", marginTop: 14 }}>{f.answer}</p>
                </details>
              ))}
            </div>
            {data.related.length > 0 && (
              <div style={{ marginTop: 30, display: "flex", gap: "12px 26px", flexWrap: "wrap", fontSize: 14 }}>
                {data.related.map((r) => (
                  <a key={r.href} href={r.href} style={{ color: "var(--s-gold-ink)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6 }}>
                    {r.label} <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── CTA band ── */}
        <section style={{ background: "#121A24", color: "#F1EADB", padding: "clamp(64px,7vw,96px) 0", textAlign: "center" }}>
          <div className="container" style={{ maxWidth: 640 }}>
            <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(28px,3.8vw,46px)", color: "#F1EADB", margin: "0 0 16px", lineHeight: 1.08 }}>{data.ctaHeading}</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "rgba(241,234,219,0.8)", marginBottom: 30 }}>{data.ctaBody}</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href={data.ctaPrimary.href} className="btn btn-gold">{data.ctaPrimary.label} <ArrowRight className="w-4 h-4" /></a>
              <a href={`tel:${company.phoneTel}`} className="btn btn-ghost" style={{ color: "#F1EADB", borderColor: "rgba(241,234,219,0.3)" }}><Phone className="w-4 h-4" />{company.phone}</a>
            </div>
            <p style={{ fontSize: 12, color: "rgba(241,234,219,0.55)", marginTop: 26, display: "inline-flex", alignItems: "center", gap: 8 }}>
              <MapPin className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />{company.address}
            </p>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
