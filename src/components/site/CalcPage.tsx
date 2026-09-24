import type { ReactNode } from "react";
import SiteShell from "@/components/site/SiteShell";
import { company } from "@/lib/config";
import { ArrowRight, ChevronRight, Phone, MapPin, Check } from "lucide-react";

const BASE = "https://marketcenterrealty.com";

export type CalcFAQ = { question: string; answer: string };
export type CalcSection = { heading: string; body: ReactNode };

export type CalcPageProps = {
  slug: string;
  crumbLabel: string;
  eyebrow: string;
  h1: ReactNode;
  /** Plain-text H1 for schema. */
  h1Text: string;
  sub: ReactNode;
  bullets: string[];
  /** The interactive calculator (a client component). */
  children: ReactNode;
  /** Rich supporting content sections below the tool. */
  sections: CalcSection[];
  faqs: CalcFAQ[];
  faqHeading: string;
  ctaHeading: string;
  ctaBody: ReactNode;
  ctaPrimary: { href: string; label: string };
  /** SoftwareApplication schema description. */
  appDescription: string;
};

export function calcMetadata(p: { slug: string; title: string; description: string }) {
  const url = `${BASE}/${p.slug}`;
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: url },
    openGraph: { title: p.title, description: p.description, type: "website" as const, url, siteName: company.name },
    robots: { index: true, follow: true },
  };
}

export default function CalcPage(p: CalcPageProps) {
  const url = `${BASE}/${p.slug}`;

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: p.h1Text,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url,
    description: p.appDescription,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: company.name, url: BASE },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: p.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: p.crumbLabel, item: url },
    ],
  };

  return (
    <SiteShell>
      <main style={{ paddingTop: 24 }} className="bg-cream">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

        {/* Hero */}
        <section className="bg-cream" style={{ padding: "44px 0 20px" }}>
          <div className="container" style={{ maxWidth: 1040 }}>
            <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--s-muted)", marginBottom: 28 }}>
              <a href="/">Home</a>
              <ChevronRight className="w-3 h-3" />
              <span style={{ color: "var(--navy)" }}>{p.crumbLabel}</span>
            </nav>
            <div className="s-eyebrow">{p.eyebrow}</div>
            <h1 style={{ fontSize: "clamp(30px, 4.2vw, 50px)", lineHeight: 1.08, marginBottom: 18, maxWidth: 820 }}>{p.h1}</h1>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--s-muted)", maxWidth: 720, marginBottom: 20 }}>{p.sub}</p>
            <ul style={{ display: "flex", flexWrap: "wrap", gap: "8px 22px", listStyle: "none", padding: 0, margin: 0 }}>
              {p.bullets.map((b) => (
                <li key={b} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--s-ink)" }}>
                  <Check className="w-4 h-4" style={{ color: "var(--s-gold)" }} />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Calculator */}
        <section className="bg-cream" style={{ padding: "24px 0 60px" }}>
          <div className="container" style={{ maxWidth: 1040 }}>{p.children}</div>
        </section>

        {/* Supporting content */}
        {p.sections.length > 0 && (
          <section className="bg-cream-2" style={{ padding: "64px 0" }}>
            <div className="container" style={{ maxWidth: 780, display: "grid", gap: 40 }}>
              {p.sections.map((s) => (
                <div key={s.heading} className="reveal">
                  <h2 style={{ fontSize: "clamp(22px, 2.8vw, 30px)", marginBottom: 16 }}>{s.heading}</h2>
                  <div style={{ fontSize: 15.5, lineHeight: 1.8, color: "var(--s-ink)", display: "grid", gap: 14 }}>{s.body}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="bg-cream" style={{ padding: "72px 0" }}>
          <div className="container" style={{ maxWidth: 780 }}>
            <div className="reveal"><div className="s-eyebrow">FAQ</div><h2 style={{ fontSize: "clamp(24px, 3vw, 34px)", marginBottom: 26 }}>{p.faqHeading}</h2></div>
            <div style={{ display: "grid", gap: 12 }}>
              {p.faqs.map((f) => (
                <details key={f.question} className="reveal" style={{ borderRadius: 18, border: "1px solid var(--line)", background: "#fff", padding: "20px 24px" }}>
                  <summary style={{ fontSize: 15.5, fontWeight: 600, color: "var(--s-ink)", cursor: "pointer" }}>{f.question}</summary>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--s-muted)", marginTop: 12 }}>{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-cream-2" style={{ padding: "76px 0 96px", textAlign: "center" }}>
          <div className="container" style={{ maxWidth: 640 }}>
            <h2 style={{ fontSize: "clamp(25px, 3.4vw, 38px)", marginBottom: 14 }}>{p.ctaHeading}</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--s-muted)", marginBottom: 28 }}>{p.ctaBody}</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href={p.ctaPrimary.href} className="btn btn-gold">{p.ctaPrimary.label} <ArrowRight className="w-4 h-4" /></a>
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
