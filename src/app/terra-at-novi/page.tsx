import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const data: GuidePageData = {
  slug: "terra-at-novi",
  crumbLabel: "Terra at Novi",
  eyebrow: "Luxury new construction · Novi, MI",
  h1: (
    <>
      <span style={{ color: "var(--s-gold)" }}>Terra</span> at Novi, Michigan
    </>
  ),
  h1Text: "Terra at Novi, MI — Gated Luxury Ranch Homes by Cambridge Homes",
  sub: "Terra is one of Novi's most exclusive new-construction communities — a gated enclave of custom ranch estates by Cambridge Homes, tucked against 300 acres of protected woodlands. Here's what the community offers, what homes cost, and how to buy in the top-ranked Novi school district.",
  publishedISO: "2026-11-23",
  publishedLabel: "November 23, 2026",
  bullets: ["Gated · 40 custom ranch homes", "From ~$1.23M to $1.59M+", "Backs 300 acres of woodlands"],
  sections: [
    {
      heading: "What Terra at Novi is",
      body: (
        <>
          <p>
            Terra is a <strong>gated luxury community</strong> of about <strong>40 custom ranch homes</strong> in Novi
            (48374), built by <strong>Cambridge Homes</strong> &mdash; a Southeast Michigan builder since 1979 known for
            custom, well-planned luxury communities. What sets Terra apart is the setting: a secluded enclave wrapped by
            roughly <strong>300 acres of protected woodlands</strong>, giving buyers rare privacy and nature inside one of
            Metro Detroit&rsquo;s most sought-after cities.
          </p>
          <p>
            The homes are <strong>single-level ranch living in a modern prairie style</strong> &mdash; a design that&rsquo;s
            in high demand and short supply &mdash; and fully customizable in floor plan, features, and finishes.
          </p>
        </>
      ),
    },
    {
      heading: "Terra homes & pricing",
      body: (
        <>
          <p>Cambridge Homes offers three primary ranch plans at Terra (base pricing, customizable):</p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8 }}>
            <li><strong>~2,580 sq ft &mdash; from about $1,232,500</strong></li>
            <li><strong>~2,875 sq ft &mdash; from about $1,343,500</strong></li>
            <li><strong>~3,500 sq ft &mdash; from about $1,590,000</strong></li>
          </ul>
          <p>
            Plans feature ranch (main-floor) living with 2+ bedrooms and 3 baths in the published configurations, with
            room to customize up. Pricing is base and moves with options and the market &mdash; confirm current pricing and
            availability before you commit.
          </p>
          <p style={{ fontSize: 13, color: "var(--s-muted)" }}>Figures are builder base prices as published (2026) and subject to change.</p>
        </>
      ),
    },
    {
      heading: "Why Terra & Novi",
      body: (
        <>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li><strong>Gated privacy + nature.</strong> A small, gated community backing 300 acres of woods is a rare combination in built-up west Oakland County.</li>
            <li><strong>Top-ranked schools.</strong> Novi Community School District is consistently among Michigan&rsquo;s best &mdash; a major value driver for resale and demand.</li>
            <li><strong>Ranch luxury.</strong> Single-level living is scarce at this price point and highly sought by move-down and lifestyle buyers.</li>
            <li><strong>Location.</strong> Easy I-96/I-275 access, Twelve Oaks, and the Novi corporate corridor minutes away.</li>
          </ul>
          <p style={{ marginTop: 12 }}>
            Exploring Novi&rsquo;s high end more broadly? See our{" "}
            <a href="/luxury-homes-in-novi" style={{ color: "var(--s-gold-ink)", fontWeight: 600 }}>luxury homes in Novi</a>{" "}
            guide and{" "}
            <a href="/gated-communities-michigan" style={{ color: "var(--s-gold-ink)", fontWeight: 600 }}>gated communities in Michigan</a>.
          </p>
        </>
      ),
    },
    {
      heading: "Buying at Terra — have your own agent",
      body: (
        <>
          <p>
            Here&rsquo;s what many new-construction buyers don&rsquo;t realize: the builder&rsquo;s on-site rep works for{" "}
            <strong>the builder</strong>, not for you. Bringing your own agent costs you nothing and gives you someone
            negotiating <em>your</em> price, options, and contract &mdash; and advising on resale value and whether the lot
            and plan are worth it.
          </p>
          <p>
            <strong>Sundus Lewis</strong> and <strong>Real Estate Market Center</strong> specialize in Novi and
            west-Oakland luxury, have closed <strong>$100M+</strong> across the metro, and hold a <strong>5.0 rating across
            110+ Google reviews</strong>. We&rsquo;ll represent you at Terra (or find you a comparable Novi luxury or gated
            home), and make sure you buy right.
          </p>
        </>
      ),
    },
  ],
  faqHeading: "Terra at Novi questions",
  faqs: [
    {
      question: "Who builds Terra in Novi, and what is it?",
      answer:
        "Terra is a gated luxury community of about 40 custom ranch homes in Novi, MI (48374), built by Cambridge Homes, a Southeast Michigan builder since 1979. The enclave backs roughly 300 acres of protected woodlands, and the homes are single-level, modern-prairie-style ranches that buyers can customize in floor plan and finishes.",
    },
    {
      question: "How much do homes at Terra at Novi cost?",
      answer:
        "Base pricing starts around $1,232,500 for roughly 2,580 sq ft, with larger plans at about $1,343,500 (~2,875 sq ft) and $1,590,000 (~3,500 sq ft). These are builder base prices and move with options and the market, so confirm current pricing and availability before committing.",
    },
    {
      question: "What school district is Terra at Novi in?",
      answer:
        "Terra is in Novi (48374) and served by the Novi Community School District, consistently ranked among Michigan's best — a key reason demand and resale value in the area stay strong. Always verify the exact school assignment for a specific lot before you buy.",
    },
    {
      question: "Should I use my own agent to buy at Terra?",
      answer:
        "Yes — it costs you nothing and protects your interests. The builder's on-site representative works for the builder, not the buyer. Sundus Lewis of Real Estate Market Center specializes in Novi and west-Oakland luxury (5.0 across 110+ Google reviews, $100M+ closed) and can represent you at Terra on your price, options, and contract, or find a comparable Novi luxury home.",
    },
  ],
  related: [
    { href: "/luxury-homes-in-novi", label: "Luxury homes in Novi" },
    { href: "/gated-communities-michigan", label: "Gated communities in Michigan" },
    { href: "/luxury-homes-in-northville", label: "Luxury homes in Northville" },
    { href: "/best-school-districts-michigan", label: "Best school districts in Michigan" },
    { href: "/contact", label: "Talk to a luxury specialist" },
  ],
  ctaHeading: "Interested in Terra at Novi? Let us represent you.",
  ctaBody: (
    <>
      Bringing your own agent to new construction costs you nothing and protects your price, options, and resale value.
      Real Estate Market Center will represent you at Terra &mdash; or find you a comparable gated or luxury home in Novi.
    </>
  ),
  ctaPrimary: { href: "/contact", label: "Talk to a luxury specialist" },
  metaTitle: "Terra at Novi, MI | Gated Luxury Ranch Homes by Cambridge Homes",
  metaDescription:
    "Terra at Novi is a gated community of ~40 custom ranch homes by Cambridge Homes, backing 300 acres of woodlands, from ~$1.23M to $1.59M+. Pricing, plans, the top-ranked Novi schools, and why to bring your own agent — from Real Estate Market Center.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
