import type { Metadata } from "next";
import SiteShell from "@/components/site/SiteShell";
import { company, googleReviews } from "@/lib/config";
import { ArrowRight, ChevronRight, CalendarDays, Landmark, Building2, Phone, MapPin, ShieldCheck, Star } from "lucide-react";

const BASE = "https://marketcenterrealty.com";
const SLUG = "best-real-estate-brokerages-oakland-county";
const URL = `${BASE}/${SLUG}`;

export const metadata: Metadata = {
  title: "The Best Real Estate Brokerages in Oakland County, MI? 10 Compared (2026)",
  description:
    "An honest 2026 comparison of 10 real estate brokerages serving Oakland County, MI — independent boutiques and luxury franchises — by type, tenure, location, and specialty. Compiled by a local brokerage that appears in the list, with verified facts and disclosed methodology.",
  alternates: { canonical: URL },
  openGraph: {
    title: "The Best Real Estate Brokerages in Oakland County, MI? 10 Compared (2026)",
    description: "Independent boutiques vs luxury franchises — a transparent Oakland County brokerage comparison.",
    type: "article",
    locale: "en_US",
    url: URL,
  },
};

type Brokerage = {
  name: string; city: string; type: string; est: string; focus: string; publisher?: boolean; site?: string;
};

const independents: Brokerage[] = [
  { name: "Real Estate Market Center", city: "Troy", type: "Independent, family-run", est: "2003", focus: "Full-service across Oakland & Macomb; street-level local pricing; publishes its own sourced market research", publisher: true, site: "https://marketcenterrealty.com" },
  { name: "DOBI Real Estate", city: "Birmingham", type: "Independent", est: "—", focus: "Modern full-service; in-house marketing and agent support" },
  { name: "Arterra Realty", city: "Rochester", type: "Independent", est: "—", focus: "Agent-centric; residential and new construction" },
  { name: "National Realty Centers", city: "Northville", type: "Independent", est: "2007", focus: "Agent-focused, 100%-commission brokerage model" },
  { name: "Good Company Realty", city: "Royal Oak", type: "Independent", est: "—", focus: "High-volume residential team; Royal Oak / Ferndale corridor" },
];

const franchises: Brokerage[] = [
  { name: "Max Broock Realtors", city: "Birmingham", type: "Franchise — a Real Estate One company", est: "1895", focus: "Luxury and estate homes across Birmingham–Bloomfield; Luxury Portfolio / LeadingRE networks" },
  { name: "Signature Sotheby's International Realty", city: "Birmingham", type: "Franchise — Sotheby's affiliate", est: "2014", focus: "Luxury and estate properties" },
  { name: "Coldwell Banker Weir Manuel", city: "Birmingham", type: "Franchise — Coldwell Banker", est: "1950", focus: "Luxury / premier properties; Coldwell Banker Global Luxury" },
  { name: "Keller Williams Domain", city: "Birmingham", type: "Franchise — Keller Williams", est: "—", focus: "Luxury real estate; tech-forward marketing" },
  { name: "RE/MAX Classic", city: "Farmington Hills", type: "Franchise — RE/MAX", est: "—", focus: "Full-service residential and commercial; RE/MAX Luxury for high-end" },
];
const all = [...independents, ...franchises];

const faqs = [
  {
    question: "Who is the best real estate brokerage in Oakland County?",
    answer:
      "There's no single 'best' — it depends on what you're buying and the service you want. For luxury and estate homes in Birmingham–Bloomfield, the established franchise brands (Max Broock, Signature Sotheby's, Coldwell Banker Weir Manuel) specialize there. For a personal, independent, full-service experience across Oakland and Macomb, boutique independents like Real Estate Market Center, DOBI, and Arterra compete on service and local knowledge. Match the brokerage to your property type and how hands-on you want your agent to be.",
  },
  {
    question: "What's the difference between a franchise and an independent brokerage?",
    answer:
      "A franchise brokerage (RE/MAX, Keller Williams, Coldwell Banker, Sotheby's) operates under a national brand with shared marketing, referral networks, and standards, while being independently owned locally. An independent brokerage (like Real Estate Market Center) isn't tied to a national brand — which can mean more flexibility and a more personal, owner-involved experience, without the franchise overhead. Neither is inherently better; it's a style-of-service choice.",
  },
  {
    question: "Does the brokerage matter, or just the agent?",
    answer:
      "Both. Your day-to-day experience is driven by the individual agent, but the brokerage shapes the marketing resources, negotiation support, luxury-network access, and oversight behind that agent. For a high-end listing, brand and network can matter more; for a personal buy-side relationship, the agent and the brokerage's culture often matter most.",
  },
  {
    question: "Why doesn't this comparison show star ratings or review counts?",
    answer:
      "Deliberately. Online review counts change constantly, and we could not independently verify each brokerage's current Google rating to a standard we'd stake a published claim on — and we won't publish a number we can't stand behind about another business. So we've left ratings out and focused on verifiable facts (type, tenure, location, specialty). Check each brokerage's current Google rating yourself before you decide; that's the honest way to use review data.",
  },
  {
    question: "What areas of Oakland County do these brokerages serve?",
    answer:
      "Collectively, all of Oakland County and beyond — with concentrations in Birmingham and Bloomfield (the luxury brands on Old Woodward), Troy and Rochester (full-service independents), Royal Oak and Ferndale (the high-volume teams), and the western communities like Farmington Hills, Novi, and West Bloomfield. Real Estate Market Center works the full county plus neighboring Macomb.",
  },
  {
    question: "How many real estate brokerages are in Oakland County?",
    answer:
      "Hundreds, from single-agent shops to large franchise offices. This comparison covers ten well-known, established options across the two main categories — independent/boutique and franchise/luxury — to give buyers and sellers a representative map of the landscape, not an exhaustive directory.",
  },
  {
    question: "How do I verify a brokerage or agent's license?",
    answer:
      "Use the State of Michigan's license lookup through LARA (the Department of Licensing and Regulatory Affairs). Every legitimate Michigan brokerage and agent is licensed and publicly verifiable — it takes about a minute and is worth doing before you sign with anyone, including us.",
  },
  {
    question: "Is Real Estate Market Center a large or small brokerage?",
    answer:
      "Independent and boutique by design. It's a family-run brokerage in Troy, established in 2003, with 20+ years in the market and a reported $100M+ in closed sales — big enough to know Oakland and Macomb street by street, small enough that a broker (not an assistant) handles your transaction. It's the personal-service alternative to the national franchises on this list.",
  },
];

const articleSchema = {
  "@context": "https://schema.org", "@type": "Article",
  headline: "The Best Real Estate Brokerages in Oakland County, MI? 10 Compared (2026)",
  datePublished: "2026-09-22", dateModified: "2026-09-22", url: URL,
  author: { "@type": "Organization", name: company.name, url: BASE },
  publisher: { "@type": "Organization", name: company.name, url: BASE },
};
const itemListSchema = {
  "@context": "https://schema.org", "@type": "ItemList",
  name: "Real estate brokerages serving Oakland County, MI (2026 comparison)",
  numberOfItems: all.length,
  itemListElement: all.map((b, i) => ({ "@type": "ListItem", position: i + 1, name: b.name })),
};
const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};
const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE },
    { "@type": "ListItem", position: 2, name: "Oakland County Brokerages Compared", item: URL },
  ],
};

export default function OaklandBrokeragesPage() {
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
              <a href="/">Home</a><ChevronRight className="w-3 h-3" /><span style={{ color: "var(--navy)" }}>Oakland County Brokerages Compared</span>
            </nav>
            <div className="s-eyebrow"><Building2 className="w-3 h-3" style={{ marginRight: 2 }} />Brokerage comparison · 2026</div>
            <h1 style={{ fontSize: "clamp(30px, 4.2vw, 52px)", lineHeight: 1.1, marginBottom: 20 }}>
              The Best Real Estate Brokerages in Oakland County, MI? 10 Compared
            </h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", fontSize: 12.5, color: "var(--s-muted)", marginBottom: 28 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><CalendarDays className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />Published September 22, 2026</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><Landmark className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />By {company.name}, a Troy, MI brokerage</span>
            </div>

            {/* Publisher disclosure — FTC transparency */}
            <div style={{ borderRadius: 14, border: "1px solid var(--line)", background: "#fff", padding: "16px 20px", marginBottom: 26, fontSize: 13.5, color: "var(--s-muted)", display: "flex", gap: 12 }}>
              <ShieldCheck className="w-5 h-5" style={{ color: "var(--s-gold)", flexShrink: 0 }} />
              <span><strong style={{ color: "var(--s-ink)" }}>Disclosure:</strong> This comparison was compiled by Real Estate Market Center, an Oakland County brokerage that appears in the list below. We&rsquo;ve kept it factual and included our competitors fairly — see the methodology for exactly how, and what we deliberately left out.</span>
            </div>

            <div className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid rgba(217,118,47,0.3)", background: "rgba(217,118,47,0.06)", padding: 30 }}>
              <div className="s-eyebrow">The short answer</div>
              <p style={{ fontSize: 16.5, lineHeight: 1.8, color: "var(--s-ink)" }}>
                Oakland County&rsquo;s brokerages split into two camps. <strong>Luxury franchise brands</strong> —
                Max Broock, Signature Sotheby&rsquo;s, Coldwell Banker Weir Manuel, Keller Williams Domain,
                RE/MAX Classic — dominate high-end Birmingham and Bloomfield with national networks.{" "}
                <strong>Independent, boutique brokerages</strong> — Real Estate Market Center, DOBI, Arterra,
                National Realty Centers, Good Company — compete on personal service and local knowledge across
                the broader county. There&rsquo;s no universal &ldquo;best&rdquo;: match the brokerage to your
                property type and how hands-on you want your agent. Below, all ten compared on verified facts.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="bg-cream-2" style={{ padding: "70px 0" }}>
          <div className="container" style={{ maxWidth: 900 }}>
            <div className="reveal"><div className="s-eyebrow">Side by side</div><h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", marginBottom: 10 }}>Ten Oakland County brokerages, compared</h2>
              <p style={{ fontSize: 13.5, color: "var(--s-muted)", marginBottom: 26, maxWidth: 760 }}>Verified facts only — type, tenure, location, focus. See &ldquo;How this was compiled&rdquo; for why star ratings are intentionally excluded.</p>
            </div>
            <div className="reveal" style={{ overflowX: "auto", borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff" }}>
              <table style={{ width: "100%", textAlign: "left", fontSize: 13, minWidth: 720, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--line)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--s-muted)" }}>
                    <th style={{ padding: "14px 16px", fontWeight: 600 }}>Brokerage</th>
                    <th style={{ padding: "14px 16px", fontWeight: 600 }}>Office</th>
                    <th style={{ padding: "14px 16px", fontWeight: 600 }}>Type</th>
                    <th style={{ padding: "14px 16px", fontWeight: 600 }}>Est.</th>
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
                      <td style={{ padding: "13px 16px", color: "var(--s-muted)" }}>{b.focus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 11, color: "var(--s-muted)", marginTop: 14 }}>&ldquo;—&rdquo; means an establishment year isn&rsquo;t publicly stated on the brokerage&rsquo;s own materials. Facts as of September 2026.</p>
          </div>
        </section>

        {/* Independent bucket */}
        <section className="bg-cream" style={{ padding: "80px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal"><div className="s-eyebrow">Category 1</div><h2 style={{ fontSize: "clamp(24px, 2.8vw, 32px)", marginBottom: 22 }}>Independent &amp; boutique brokerages</h2></div>
            <div style={{ display: "grid", gap: 16 }}>
              {independents.map((b) => (
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
            <div className="reveal"><div className="s-eyebrow">Category 2</div><h2 style={{ fontSize: "clamp(24px, 2.8vw, 32px)", marginBottom: 22 }}>Franchise &amp; luxury brands</h2></div>
            <div style={{ display: "grid", gap: 16 }}>
              {franchises.map((b) => (
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
                  This comparison was compiled by Real Estate Market Center in September 2026. Each
                  brokerage&rsquo;s type, office location, established year, and specialty were taken from that
                  brokerage&rsquo;s own public website and reliable business sources. Where an establishment
                  year isn&rsquo;t publicly stated, we show &ldquo;—&rdquo; rather than guess.
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
                  drawn from their own positioning — no manufactured &ldquo;cons,&rdquo; no self-serving
                  ranking. The goal is a fair map of the Oakland County landscape, not a trophy for us.
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
              <h2 style={{ fontSize: "clamp(24px, 2.8vw, 32px)", marginBottom: 18 }}>Picking a brokerage in Oakland County</h2>
              <div style={{ display: "grid", gap: 14, fontSize: 15, lineHeight: 1.75, color: "var(--s-ink)" }}>
                <p><strong>1. Match the specialty to your property.</strong> Buying or selling a luxury estate in Birmingham–Bloomfield? The luxury franchises live there. A family home, first purchase, or investment across the county? A full-service independent may serve you better.</p>
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
            <div className="reveal"><div className="s-eyebrow">FAQ</div><h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", marginBottom: 30 }}>Oakland County brokerage questions</h2></div>
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

        {/* REMC Google reviews (publisher — only our own reviews shown) */}
        <section className="bg-cream" style={{ padding: "70px 0" }}>
          <div className="container" style={{ maxWidth: 860, textAlign: "center" }}>
            <div className="s-eyebrow" style={{ justifyContent: "center" }}>What our clients say</div>
            <h2 style={{ fontSize: "clamp(24px, 2.8vw, 32px)", marginBottom: 14 }}>Real Estate Market Center — rated 5.0 on Google</h2>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 30 }}>
              <span style={{ display: "inline-flex", gap: 2 }}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} width={18} height={18} style={{ color: "var(--s-gold)" }} fill="currentColor" strokeWidth={0} />
                ))}
              </span>
              <span style={{ fontSize: 13.5, color: "var(--s-muted)" }}>5.0 average · 70+ reviews</span>
            </div>
            <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", textAlign: "left" }}>
              {googleReviews.slice(0, 3).map((r) => (
                <figure key={r.name} style={{ margin: 0, borderRadius: 16, border: "1px solid var(--line)", background: "#fff", padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                  <span style={{ display: "inline-flex", gap: 2 }}>
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} width={13} height={13} style={{ color: "var(--s-gold)" }} fill="currentColor" strokeWidth={0} />
                    ))}
                  </span>
                  <blockquote style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: "var(--s-ink)", flex: 1 }}>&ldquo;{r.text}&rdquo;</blockquote>
                  <figcaption style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 10, borderTop: "1px solid var(--line)" }}>
                    <span style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--navy)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, flexShrink: 0 }}>{r.name.charAt(0)}</span>
                    <span>
                      <span style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--s-ink)" }}>{r.name}</span>
                      <span style={{ fontSize: 11, color: "var(--s-muted)" }}>Google review</span>
                    </span>
                  </figcaption>
                </figure>
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
              you&rsquo;re buying or selling and we&rsquo;ll give you a straight, data-backed plan — no
              franchise script.
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
