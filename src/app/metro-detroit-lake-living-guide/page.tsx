import type { Metadata } from "next";
import SiteShell from "@/components/site/SiteShell";
import { company } from "@/lib/config";
import { citations, rankedCities } from "@/lib/best-suburbs-guide";
import { ArrowRight, ChevronRight, CalendarDays, Landmark, Waves, Phone, MapPin } from "lucide-react";

const BASE = "https://marketcenterrealty.com";
const SLUG = "metro-detroit-lake-living-guide";
const URL = `${BASE}/${SLUG}`;

export const metadata: Metadata = {
  title: "Metro Detroit Lake Living: A Buyer's Guide to Lake Homes (2026)",
  description:
    "Thinking about a lake home near Detroit? West Bloomfield is the region's lake hub. Learn the price-defining difference between lakefront, lake-access, and lake-view, plus the due diligence every lake buyer needs — seawalls, docks, and flood insurance. By a Metro Detroit brokerage.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Metro Detroit Lake Living: A Buyer's Guide to Lake Homes (2026)",
    description: "Lakefront vs lake-access vs lake-view, and the due diligence that protects your purchase.",
    type: "article",
    locale: "en_US",
    url: URL,
  },
};

const CITED_IDS = [1, 7];

const faqs = [
  {
    question: "Where is the best lake living near Detroit?",
    answer:
      "West Bloomfield is Metro Detroit's lake hub — a charter township built around a cluster of lakes, so lakefront and lake-access homes are a normal option rather than a rarity. Its typical home value is $466,635 (Zillow, June 2026), roughly Troy-level pricing where the premium buys water access instead of a corporate corridor. Lakes in and around the township include Cass, Pine, Orchard, and Walnut.",
  },
  {
    question: "What's the difference between lakefront, lake-access, and lake-view?",
    answer:
      "It's the single biggest price driver on a lake home. Lakefront means your property directly touches the water, usually with private dock rights — the priciest tier. Lake-access means you don't own waterfront but your subdivision has a shared access point, beach, or dock. Lake-view means you can see the water but have no right to use it. On the same lake, the gap between lakefront and lake-access can be very large, so know exactly which one a listing offers before you fall in love with it.",
  },
  {
    question: "What should I check before buying a lake home?",
    answer:
      "Beyond a standard inspection: the seawall condition (replacement is expensive and not covered by a normal home inspection — hire a marine contractor), dock and any watercraft permits and whether they transfer, flood-zone status and the flood-insurance premium, and whether the lake is 'all-sports' (powerboats, jet skis) or no-wake — that changes both the lifestyle and the noise. These are the items that surprise lake buyers, and we walk every one of them before an offer.",
  },
  {
    question: "Are lake homes a good investment?",
    answer:
      "Waterfront is genuinely scarce, which supports value over time, and lake homes can command premium seasonal rents. But they also carry costs a non-waterfront home doesn't — seawall upkeep, higher insurance, dock maintenance — so run the full carrying cost, not just the purchase price. We model the real numbers with lake buyers rather than assuming waterfront always appreciates.",
  },
];

export default function LakeLivingGuidePage() {
  const wb = rankedCities.find((c) => c.city === "West Bloomfield")!;
  const sources = citations.filter((c) => CITED_IDS.includes(c.id));

  const articleSchema = {
    "@context": "https://schema.org", "@type": "Article",
    headline: "Metro Detroit Lake Living: A Buyer's Guide to Lake Homes (2026)",
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
      { "@type": "ListItem", position: 2, name: "Metro Detroit Lake Living Guide", item: URL },
    ],
  };

  const tiers = [
    { name: "Lakefront", body: "Your property directly touches the water, typically with private dock rights. The most expensive tier — and the one buyers picture when they imagine 'a lake house.' On any given lake, lakefront commands a large premium over everything else.", tag: "Highest price" },
    { name: "Lake-access", body: "You don't own waterfront, but your subdivision includes a shared access point — a beach, boat launch, or community dock. It can deliver much of the lake lifestyle for meaningfully less than lakefront, and it's the value sweet spot for many buyers.", tag: "Value sweet spot" },
    { name: "Lake-view", body: "You can see the water but have no right to use it. It buys the view and some of the ambiance without dock or swim rights — priced well below the other two, and sometimes confused with lake-access, so confirm exactly what rights convey.", tag: "View only" },
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
              <a href="/">Home</a><ChevronRight className="w-3 h-3" /><span style={{ color: "var(--navy)" }}>Lake Living Guide</span>
            </nav>
            <div className="s-eyebrow"><Waves className="w-3 h-3" style={{ marginRight: 2 }} />Buyer&rsquo;s guide · 2026</div>
            <h1 style={{ fontSize: "clamp(32px, 4.4vw, 54px)", lineHeight: 1.12, marginBottom: 22 }}>Metro Detroit Lake Living: A Buyer&rsquo;s Guide to Lake Homes</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", fontSize: 12.5, color: "var(--s-muted)", marginBottom: 34 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><CalendarDays className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />Published September 21, 2026</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><Landmark className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />By {company.name}, a Metro Detroit brokerage</span>
            </div>
            <div className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid rgba(217,118,47,0.3)", background: "rgba(217,118,47,0.06)", padding: 30 }}>
              <div className="s-eyebrow">The short answer</div>
              <p style={{ fontSize: 16.5, lineHeight: 1.8, color: "var(--s-ink)" }}>
                If you want lake living near Detroit, <strong>West Bloomfield</strong> is the hub — a township
                built around a cluster of lakes where waterfront and lake-access homes are a normal option, at a
                typical value of $466,635 (Zillow, June 2026). Before you shop, learn the one distinction that
                decides price more than anything else: <strong>lakefront vs lake-access vs lake-view</strong>.
                Then handle the lake-specific due diligence — seawalls, docks, flood insurance, and whether the
                lake is all-sports. This guide covers both.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-cream-2" style={{ padding: "70px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal">
              <div className="s-eyebrow">The price-defining distinction</div>
              <h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", marginBottom: 10 }}>Three kinds of &ldquo;lake home&rdquo;</h2>
              <p style={{ fontSize: 13.5, color: "var(--s-muted)", marginBottom: 26, maxWidth: 760 }}>
                Two listings on the same lake at very different prices usually differ on this — not on the house.
                Know which tier you&rsquo;re buying before you make an offer.
              </p>
            </div>
            <div style={{ display: "grid", gap: 16 }}>
              {tiers.map((t) => (
                <div key={t.name} className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff", padding: 26 }}>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
                    <h3 style={{ fontSize: 21, fontWeight: 600, color: "var(--s-ink)" }}>{t.name}</h3>
                    <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--s-gold)" }}>{t.tag}</span>
                  </div>
                  <p style={{ fontSize: 14.5, lineHeight: 1.75, color: "var(--s-muted)" }}>{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-cream" style={{ padding: "80px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal">
              <div className="s-eyebrow">Due diligence</div>
              <h2 style={{ fontSize: "clamp(24px, 2.8vw, 32px)", marginBottom: 18 }}>What to check before you buy a lake home</h2>
              <div style={{ display: "grid", gap: 16, fontSize: 15.5, lineHeight: 1.8, color: "var(--s-ink)" }}>
                <p><strong>Seawall condition.</strong> A failing seawall is expensive to replace and is <em>not</em> covered by a standard home inspection. Have a marine contractor evaluate it separately before you waive contingencies.</p>
                <p><strong>Docks and permits.</strong> Confirm what dock and watercraft rights exist, whether permits transfer with the sale, and any HOA rules on boats — these vary lake to lake and can limit how you actually use the water.</p>
                <p><strong>Flood zone and insurance.</strong> Check the flood-zone status and get a real flood-insurance quote early; on some properties it materially changes the monthly cost.</p>
                <p><strong>All-sports vs no-wake.</strong> An all-sports lake means powerboats and jet skis — lively, and louder on summer weekends. A no-wake lake is quieter. Neither is better; they&rsquo;re different lifestyles, so match the lake to how you actually want to live.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-cream-2" style={{ padding: "80px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal"><div className="s-eyebrow">FAQ</div><h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", marginBottom: 30 }}>Lake-buyer questions, answered directly</h2></div>
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
            <p style={{ fontSize: 12, color: "var(--s-muted)", marginTop: 16, fontStyle: "italic" }}>
              Lake-buying due-diligence points above reflect our agents&rsquo; transaction experience, not a
              cited study; specifics vary by lake and property — verify each for your target home.
            </p>
            <p style={{ fontSize: 13, color: "var(--s-muted)", marginTop: 16 }}>
              Ready to look?{" "}
              <a href={`/${wb.citySlug}`} style={{ color: "var(--s-gold)", fontWeight: 600 }}>Our full West Bloomfield guide</a>{" "}·{" "}
              <a href="/west-bloomfield-vs-bloomfield-hills" style={{ color: "var(--s-gold)", fontWeight: 600 }}>West Bloomfield vs Bloomfield Hills</a>.
            </p>
          </div>
        </section>

        <section className="bg-cream-2" style={{ padding: "80px 0 100px", textAlign: "center" }}>
          <div className="container" style={{ maxWidth: 640 }}>
            <h2 style={{ fontSize: "clamp(26px, 3.4vw, 40px)", marginBottom: 14 }}>Want to be on the water next summer?</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--s-muted)", marginBottom: 30 }}>
              We&rsquo;ve inspected seawalls, checked dock rights, and closed lake homes for years. Tell us your
              budget and which lifestyle you want — we&rsquo;ll find the right water and the right tier.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/home-value" className="btn btn-gold">Start your lake-home search <ArrowRight className="w-4 h-4" /></a>
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
