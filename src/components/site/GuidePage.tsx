import type { ReactNode } from "react";
import SiteShell from "@/components/site/SiteShell";
import { company } from "@/lib/config";
import { ArrowRight, ChevronRight, Phone, MapPin, Check } from "lucide-react";

const BASE = "https://marketcenterrealty.com";

export type GuideFAQ = { question: string; answer: string };
export type GuideSection = { heading: string; body: ReactNode };

export type GuidePageData = {
  slug: string;
  crumbLabel: string;
  eyebrow: string;
  h1: ReactNode;
  h1Text: string;
  sub: ReactNode;
  bullets: string[];
  publishedISO: string;
  publishedLabel: string;
  sections: GuideSection[];
  faqs: GuideFAQ[];
  faqHeading: string;
  /** Reinforcing internal links. */
  related: { href: string; label: string }[];
  ctaHeading: string;
  ctaBody: ReactNode;
  ctaPrimary: { href: string; label: string };
  metaTitle: string;
  metaDescription: string;
};

export function guideMetadata(d: GuidePageData) {
  const url = `${BASE}/${d.slug}`;
  return {
    title: d.metaTitle,
    description: d.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: d.metaTitle, description: d.metaDescription, type: "article" as const, url, siteName: company.name },
    robots: { index: true, follow: true },
  };
}

export default function GuidePage({ data }: { data: GuidePageData }) {
  const url = `${BASE}/${data.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.h1Text,
    datePublished: data.publishedISO,
    dateModified: data.publishedISO,
    url,
    author: { "@type": "Organization", name: company.name, url: BASE },
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
      <main style={{ paddingTop: 24 }} className="bg-cream">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

        {/* Hero */}
        <section className="bg-cream" style={{ padding: "44px 0 20px" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--s-muted)", marginBottom: 28 }}>
              <a href="/">Home</a>
              <ChevronRight className="w-3 h-3" />
              <span style={{ color: "var(--navy)" }}>{data.crumbLabel}</span>
            </nav>
            <div className="s-eyebrow">{data.eyebrow}</div>
            <h1 style={{ fontSize: "clamp(30px, 4.2vw, 50px)", lineHeight: 1.08, marginBottom: 18 }}>{data.h1}</h1>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--s-muted)", marginBottom: 20 }}>{data.sub}</p>
            <ul style={{ display: "flex", flexWrap: "wrap", gap: "8px 22px", listStyle: "none", padding: 0, margin: 0 }}>
              {data.bullets.map((b) => (
                <li key={b} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--s-ink)" }}>
                  <Check className="w-4 h-4" style={{ color: "var(--s-gold)" }} />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Content sections — alternating backgrounds */}
        {data.sections.map((s, i) => (
          <section key={s.heading} className={i % 2 === 0 ? "bg-cream-2" : "bg-cream"} style={{ padding: "56px 0" }}>
            <div className="container" style={{ maxWidth: 860 }}>
              <div className="reveal">
                <h2 style={{ fontSize: "clamp(23px, 2.9vw, 32px)", marginBottom: 18 }}>{s.heading}</h2>
                <div style={{ fontSize: 15.5, lineHeight: 1.8, color: "var(--s-ink)", display: "grid", gap: 14 }}>{s.body}</div>
              </div>
            </div>
          </section>
        ))}

        {/* FAQ */}
        <section className={data.sections.length % 2 === 0 ? "bg-cream-2" : "bg-cream"} style={{ padding: "64px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal"><div className="s-eyebrow">FAQ</div><h2 style={{ fontSize: "clamp(24px, 3vw, 34px)", marginBottom: 26 }}>{data.faqHeading}</h2></div>
            <div style={{ display: "grid", gap: 12 }}>
              {data.faqs.map((f) => (
                <details key={f.question} className="reveal" style={{ borderRadius: 18, border: "1px solid var(--line)", background: "#fff", padding: "20px 24px" }}>
                  <summary style={{ fontSize: 15.5, fontWeight: 600, color: "var(--s-ink)", cursor: "pointer" }}>{f.question}</summary>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--s-muted)", marginTop: 12 }}>{f.answer}</p>
                </details>
              ))}
            </div>
            {data.related.length > 0 && (
              <div style={{ marginTop: 26, display: "flex", gap: "10px 22px", flexWrap: "wrap", fontSize: 13.5 }}>
                {data.related.map((r) => (
                  <a key={r.href} href={r.href} style={{ color: "var(--s-gold)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6 }}>
                    {r.label} <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-cream-2" style={{ padding: "76px 0 96px", textAlign: "center" }}>
          <div className="container" style={{ maxWidth: 640 }}>
            <h2 style={{ fontSize: "clamp(25px, 3.4vw, 38px)", marginBottom: 14 }}>{data.ctaHeading}</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--s-muted)", marginBottom: 28 }}>{data.ctaBody}</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href={data.ctaPrimary.href} className="btn btn-gold">{data.ctaPrimary.label} <ArrowRight className="w-4 h-4" /></a>
              <a href={`tel:${company.phoneTel}`} className="btn btn-ghost"><Phone className="w-4 h-4" />{company.phone}</a>
            </div>
            <p style={{ fontSize: 12, color: "var(--s-muted)", marginTop: 24, display: "inline-flex", alignItems: "center", gap: 8 }}>
              <MapPin className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />{company.address}
            </p>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
