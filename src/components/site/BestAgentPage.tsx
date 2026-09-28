import type { ReactNode } from "react";
import Image from "next/image";
import SiteShell from "@/components/site/SiteShell";
import { company, googleReviews } from "@/lib/config";
import { ArrowRight, ChevronRight, CalendarDays, Award, Phone, MapPin, Star, CheckCircle2 } from "lucide-react";

const BASE = "https://marketcenterrealty.com";

/** Shared broker facts — all verifiable. */
const SUNDUS = {
  name: "Sundus Lewis",
  title: "Broker & Owner · Real Estate Market Center",
  photo: "/sundus-lewis.png",
  stats: [
    { num: "20+", label: "Years in the business" },
    { num: "500+", label: "Homes closed" },
    { num: "$100M+", label: "In closed sales" },
    { num: "5.0", label: "70+ Google reviews" },
  ] as { num: string; label: string }[],
};

/* Real Google reviews that specifically mention Sundus by name. Fill this from
   the live Google Business Profile — verbatim only, never invented. Until it
   has 3+ entries, the page falls back to the general REMC reviews. */
const SUNDUS_REVIEWS: { text: string; name: string }[] = [
  {
    text: "I've had the pleasure of working with Sundus and Real Estate Market Center 10 + years, and I can't recommend her highly enough. She is a true professional who genuinely cares about her clients' needs and wellbeing. What sets Sundus apart is her hands-on approach throughout the entire process — she stays actively involved from start to finish, making sure every detail is handled. If you're looking for a realtor who combines expertise with genuine care, Sundus Lewis is the one to call. Highly recommend!",
    name: "Rafi Sabbagh",
  },
  {
    text: "Best real estate brokerage in Michigan, really appreciated Sundus Lewis the broker for Real Estate Market Center running me through the whole process step by step.",
    name: "Ramiz Ghareeba",
  },
  {
    text: "We have been trying to look for a house for so long until we met Sundus — she was so fast and so helpful and super kind, and thanks to her we got the house we wanted!",
    name: "Ammar Jarbooa",
  },
];

export type BestAgentFAQ = { question: string; answer: string };

export type BestAgentData = {
  slug: string;
  city: string;
  regionShort: string;
  crumbLabel: string;
  h1: ReactNode;
  h1Text: string;
  sub: ReactNode;
  publishedISO: string;
  publishedLabel: string;
  /** City-specific "why Sundus here" paragraphs. */
  localHeading: string;
  localParagraphs: ReactNode[];
  /** How-to-choose tip #1, tailored to the city/property type. */
  chooseTip1: ReactNode;
  faqs: BestAgentFAQ[];
  /** Reinforcing cross-links. */
  cityPage: { href: string; label: string };
  brokeragePage: { href: string; label: string };
  metaTitle: string;
  metaDescription: string;
};

export function bestAgentMetadata(d: BestAgentData) {
  const url = `${BASE}/${d.slug}`;
  return {
    title: d.metaTitle,
    description: d.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: d.metaTitle, description: d.metaDescription, type: "profile" as const, url, siteName: company.name },
    robots: { index: true, follow: true },
  };
}

function Stars() {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} width={15} height={15} style={{ color: "var(--s-gold)" }} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}

export default function BestAgentPage({ data }: { data: BestAgentData }) {
  const { city, regionShort } = data;
  const url = `${BASE}/${data.slug}`;
  const reviews = (SUNDUS_REVIEWS.length >= 3 ? SUNDUS_REVIEWS : googleReviews).slice(0, 3);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: `${SUNDUS.name} — ${company.name}`,
    url,
    telephone: company.phone,
    areaServed: { "@type": "City", name: city, containedInPlace: { "@type": "State", name: "Michigan" } },
    address: {
      "@type": "PostalAddress",
      streetAddress: "2032 E Square Lake Rd Ste 400A",
      addressLocality: "Troy",
      addressRegion: "MI",
      postalCode: "48085",
      addressCountry: "US",
    },
    founder: { "@type": "Person", name: SUNDUS.name, jobTitle: "Broker & Owner", worksFor: { "@type": "Organization", name: company.name } },
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

        {/* Hero */}
        <section className="bg-cream" style={{ padding: "44px 0 20px" }}>
          <div className="container" style={{ maxWidth: 980 }}>
            <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--s-muted)", marginBottom: 28 }}>
              <a href="/">Home</a>
              <ChevronRight className="w-3 h-3" />
              <span style={{ color: "var(--navy)" }}>{data.crumbLabel}</span>
            </nav>
            <div className="s-eyebrow"><Award className="w-3 h-3" style={{ marginRight: 2 }} />Meet your agent · {city}</div>
            <h1 style={{ fontSize: "clamp(30px, 4.2vw, 50px)", lineHeight: 1.08, marginBottom: 18, maxWidth: 820 }}>{data.h1}</h1>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--s-muted)", maxWidth: 720 }}>{data.sub}</p>
          </div>
        </section>

        {/* Broker card */}
        <section className="bg-cream" style={{ padding: "16px 0 56px" }}>
          <div className="container" style={{ maxWidth: 980 }}>
            <div className="agent-card" style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff", padding: 30 }}>
              <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--line)", aspectRatio: "4/5", position: "relative" }}>
                <Image src={SUNDUS.photo} alt={`${SUNDUS.name}, Broker & Owner of ${company.name}`} fill style={{ objectFit: "cover" }} sizes="300px" />
              </div>
              <div>
                <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", lineHeight: 1.15, marginBottom: 4 }}>{SUNDUS.name}</h2>
                <div style={{ fontSize: 14, color: "var(--s-gold)", fontWeight: 600, marginBottom: 8 }}>{SUNDUS.title}</div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--s-muted)", marginBottom: 18 }}>
                  <Stars /> 5.0 · 70+ Google reviews
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--s-ink)", marginBottom: 20 }}>
                  Sundus Lewis is the broker and owner of Real Estate Market Center, an independent luxury brokerage in
                  Troy. With <strong>20+ years in the business</strong> — including 13+ as a licensed broker — she has
                  closed <strong>500+ homes</strong> and <strong>$100M+ in sales</strong> across {regionShort} and greater
                  Metro Detroit, specializing in luxury and full-service residential real estate. She works every deal
                  personally — one broker, start to close.
                </p>
                <div className="agent-stats" style={{ marginBottom: 22 }}>
                  {SUNDUS.stats.map((s) => (
                    <div key={s.label} style={{ textAlign: "center", padding: "12px 6px", borderRadius: 12, background: "var(--cream-2)" }}>
                      <div style={{ fontSize: "clamp(18px, 2.4vw, 24px)", fontWeight: 700, color: "var(--navy)", fontVariantNumeric: "tabular-nums", lineHeight: 1.1 }}>{s.num}</div>
                      <div style={{ fontSize: 10.5, color: "var(--s-muted)", marginTop: 3 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <a href="/home-value" className="btn btn-gold">Get your free home valuation <ArrowRight className="w-4 h-4" /></a>
                  <a href={`tel:${company.phoneTel}`} className="btn btn-ghost"><Phone className="w-4 h-4" />{company.phone}</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="bg-cream-2" style={{ padding: "64px 0" }}>
          <div className="container" style={{ maxWidth: 980 }}>
            <div className="reveal"><div className="s-eyebrow">In their words</div><h2 style={{ fontSize: "clamp(24px, 3vw, 34px)", marginBottom: 8 }}>What clients say</h2>
              <p style={{ fontSize: 13.5, color: "var(--s-muted)", marginBottom: 26 }}>A sample of Sundus&rsquo;s verified 5.0-star Google reviews.</p>
            </div>
            <div className="agent-reviews">
              {reviews.map((r) => (
                <div key={r.name} style={{ borderRadius: 16, border: "1px solid var(--line)", background: "#fff", padding: 22 }}>
                  <Stars />
                  <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "var(--s-ink)", margin: "12px 0" }}>&ldquo;{r.text}&rdquo;</p>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--s-muted)" }}>— {r.name}, Google review</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Sundus for this city */}
        <section className="bg-cream" style={{ padding: "64px 0" }}>
          <div className="container" style={{ maxWidth: 780, display: "grid", gap: 16 }}>
            <div className="reveal"><div className="s-eyebrow">Local expertise</div><h2 style={{ fontSize: "clamp(22px, 2.8vw, 30px)", marginBottom: 8 }}>{data.localHeading}</h2></div>
            <div style={{ fontSize: 15.5, lineHeight: 1.8, color: "var(--s-ink)", display: "grid", gap: 14 }}>
              {data.localParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* How to choose */}
        <section className="bg-cream-2" style={{ padding: "64px 0" }}>
          <div className="container" style={{ maxWidth: 780 }}>
            <div className="reveal"><div className="s-eyebrow">How to choose</div><h2 style={{ fontSize: "clamp(22px, 2.8vw, 30px)", marginBottom: 18 }}>How to pick the best real estate agent in {regionShort}</h2></div>
            <div style={{ display: "grid", gap: 14, fontSize: 15, lineHeight: 1.75, color: "var(--s-ink)" }}>
              <p><strong>1. Local track record.</strong> {data.chooseTip1}</p>
              <p><strong>2. Straight pricing, backed by data.</strong> The best agents price to the street, not to flatter you into a listing. Sundus publishes Real Estate Market Center&rsquo;s own sourced market research so you can check the numbers before you ever call.</p>
              <p><strong>3. One point of contact.</strong> You want the broker running your deal — not handed to an assistant. Sundus personally handles each transaction from first call to closing.</p>
              <p><strong>4. Verify the license and the reviews.</strong> Confirm any agent&rsquo;s license through Michigan LARA and read their recent Google reviews yourself. Sundus holds a 5.0 rating across 70 reviews — recent, specific, and public.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-cream" style={{ padding: "64px 0" }}>
          <div className="container" style={{ maxWidth: 780 }}>
            <div className="reveal"><div className="s-eyebrow">FAQ</div><h2 style={{ fontSize: "clamp(24px, 3vw, 34px)", marginBottom: 26 }}>{regionShort} real estate agent questions</h2></div>
            <div style={{ display: "grid", gap: 12 }}>
              {data.faqs.map((f) => (
                <details key={f.question} className="reveal" style={{ borderRadius: 18, border: "1px solid var(--line)", background: "#fff", padding: "20px 24px" }}>
                  <summary style={{ fontSize: 15.5, fontWeight: 600, color: "var(--s-ink)", cursor: "pointer" }}>{f.question}</summary>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--s-muted)", marginTop: 12 }}>{f.answer}</p>
                </details>
              ))}
            </div>
            {/* Reinforcing cross-links */}
            <div style={{ marginTop: 26, display: "flex", gap: "10px 22px", flexWrap: "wrap", fontSize: 13.5 }}>
              <a href={data.cityPage.href} style={{ color: "var(--s-gold)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6 }}>{data.cityPage.label} <ArrowRight className="w-3.5 h-3.5" /></a>
              <a href={data.brokeragePage.href} style={{ color: "var(--s-gold)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6 }}>{data.brokeragePage.label} <ArrowRight className="w-3.5 h-3.5" /></a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-cream-2" style={{ padding: "76px 0 96px", textAlign: "center" }}>
          <div className="container" style={{ maxWidth: 640 }}>
            <h2 style={{ fontSize: "clamp(25px, 3.4vw, 38px)", marginBottom: 14 }}>Work with {city}&rsquo;s top-rated broker</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--s-muted)", marginBottom: 28 }}>
              Whether you&rsquo;re buying, selling, or investing in {city}, Sundus will give you a straight, data-backed
              plan — and handle it personally. No franchise script, no hand-offs.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/home-value" className="btn btn-gold">Get your free valuation <ArrowRight className="w-4 h-4" /></a>
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
