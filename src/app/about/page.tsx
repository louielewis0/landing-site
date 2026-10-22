import type { Metadata } from "next";
import LuxuryBrandPage, { luxuryMetadata, type LuxuryBrandData } from "@/components/site/LuxuryBrandPage";

const data: LuxuryBrandData = {
  slug: "about",
  crumbLabel: "About",
  eyebrow: "About the brokerage",
  h1: (
    <>
      About <span style={{ color: "var(--s-gold)" }}>Real Estate Market Center</span>
    </>
  ),
  h1Text: "About Real Estate Market Center — Metro Detroit's Independent Luxury Brokerage",
  sub: (
    <>
      An <strong>independent luxury real estate brokerage</strong> in Troy, Michigan, led by
      broker-owner <strong>Sundus Lewis</strong>. Since 2003 we&rsquo;ve given Metro Detroit buyers and
      sellers white-glove, owner-level representation &mdash; and in 2026 we were named the{" "}
      <strong>#1 real estate brokerage in Michigan</strong>.
    </>
  ),
  stats: [
    { value: "2003", label: "Serving since" },
    { value: "500+", label: "Homes closed" },
    { value: "$100M+", label: "In sales" },
    { value: "#1", label: "In Michigan" },
  ],
  awardBand: true,
  publishedISO: "2026-10-20",
  faqHeading: "About Real Estate Market Center — FAQ",
  sections: [
    {
      heading: "Who we are",
      body: (
        <>
          <p>
            Real Estate Market Center is an independent, full-service luxury brokerage headquartered on
            East Square Lake Road in Troy, Michigan. We&rsquo;re not a franchise desk &mdash; we&rsquo;re
            a local, owner-led team that gives buyers and sellers across the Metro Detroit luxury
            corridor straight answers, street-level pricing, and one point of contact from first call to
            closing.
          </p>
          <p>
            Founded in 2003 by broker-owner Sundus Lewis, the brokerage has closed{" "}
            <strong>500+ homes and $100M+ in sales</strong> across Oakland, Macomb, and Wayne counties,
            specializing in luxury and full-service residential real estate.
          </p>
        </>
      ),
    },
    {
      heading: "What makes us different",
      body: (
        <ul style={{ margin: 0, paddingLeft: 20, display: "grid", gap: 8 }}>
          <li><strong>Independent, not franchised.</strong> No national brand taking a cut or dictating how we serve you &mdash; just flexible, personal, owner-involved representation.</li>
          <li><strong>Owner-level service.</strong> You work directly with the broker, start to close, not an assistant handed your file.</li>
          <li><strong>Street-level pricing.</strong> We price block by block across Metro Detroit, not off a city-wide average.</li>
          <li><strong>We publish our own sourced research.</strong> Market guides, city breakdowns, and valuation tools &mdash; not generic MLS blasting.</li>
        </ul>
      ),
    },
    {
      heading: "Michigan's #1-ranked brokerage",
      body: (
        <>
          <p>
            In 2026, <a href="/best-real-estate-brokerage-in-michigan" style={{ color: "var(--s-gold-ink)", fontWeight: 600 }}>TownAnswer named Real Estate Market Center the #1 real estate brokerage in Michigan</a>{" "}
            &mdash; first of 1,634 eligible brokerages statewide, on a methodology that businesses
            cannot pay to influence. We also hold a perfect <strong>5.0 rating across 85+ Google
            reviews</strong>, with clients consistently describing the process as smooth, professional,
            and handled start to finish. Read them on our{" "}
            <a href="/reviews" style={{ color: "var(--s-gold-ink)", fontWeight: 600 }}>reviews page</a>.
          </p>
        </>
      ),
    },
    {
      heading: "The areas we serve",
      body: (
        <>
          <p>We work street by street across Metro Detroit&rsquo;s most sought-after communities:</p>
          <ul style={{ margin: 0, paddingLeft: 20, display: "grid", gap: 6 }}>
            <li><a href="/troy-real-estate-agent" style={{ color: "var(--s-gold-ink)", fontWeight: 600 }}>Troy</a> &mdash; our home city</li>
            <li><a href="/birmingham-real-estate-agent" style={{ color: "var(--s-gold-ink)", fontWeight: 600 }}>Birmingham</a></li>
            <li><a href="/bloomfield-hills-real-estate-agent" style={{ color: "var(--s-gold-ink)", fontWeight: 600 }}>Bloomfield Hills</a></li>
            <li><a href="/rochester-hills-real-estate-agent" style={{ color: "var(--s-gold-ink)", fontWeight: 600 }}>Rochester Hills</a> &amp; <a href="/rochester-real-estate-agent" style={{ color: "var(--s-gold-ink)", fontWeight: 600 }}>Rochester</a></li>
            <li><a href="/west-bloomfield-real-estate-agent" style={{ color: "var(--s-gold-ink)", fontWeight: 600 }}>West Bloomfield</a></li>
          </ul>
        </>
      ),
    },
  ],
  faqs: [
    {
      question: "Who owns Real Estate Market Center?",
      answer:
        "Real Estate Market Center is independently owned and led by broker-owner Sundus Lewis, who founded the brokerage in 2003. It is an independent brokerage, not a franchise of a national brand.",
    },
    {
      question: "Where is Real Estate Market Center located?",
      answer:
        "The brokerage is headquartered at 2032 E Square Lake Rd, Suite 400A, Troy, MI 48085, and serves the greater Metro Detroit area across Oakland, Macomb, and Wayne counties.",
    },
    {
      question: "What areas does Real Estate Market Center serve?",
      answer:
        "We serve Metro Detroit's luxury corridor — Troy, Birmingham, Bloomfield Hills, Rochester Hills, Rochester, and West Bloomfield — plus the surrounding Oakland and Macomb County communities.",
    },
    {
      question: "Is Real Estate Market Center a good brokerage?",
      answer:
        "In 2026, TownAnswer ranked Real Estate Market Center the #1 real estate brokerage in Michigan — first of 1,634 statewide — on a methodology businesses cannot pay to influence. It holds a 5.0 rating across 85+ Google reviews, with 20+ years in business, 500+ homes closed, and $100M+ in sales.",
    },
    {
      question: "How do I contact Real Estate Market Center?",
      answer:
        "Call (248) 568-6081 or visit the contact page on marketcenterrealty.com. You can also request a free, no-obligation home valuation online and a broker will follow up within 24 hours.",
    },
  ],
  related: [
    { href: "/meet-sundus-lewis", label: "Meet broker Sundus Lewis" },
    { href: "/best-real-estate-brokerage-in-michigan", label: "Why we're #1 in Michigan" },
    { href: "/reviews", label: "Read our reviews" },
    { href: "/home-value", label: "Get your home value" },
  ],
  ctaHeading: "Work with Metro Detroit's #1-ranked brokerage",
  ctaBody: (
    <>
      Independent luxury, done personally. Start with a free, no-pressure home valuation from the team
      that knows your street.
    </>
  ),
  ctaPrimary: { href: "/home-value", label: "Get My Free Home Valuation" },
  metaTitle: "About Real Estate Market Center | Metro Detroit's Independent Luxury Brokerage",
  metaDescription:
    "Real Estate Market Center is an independent luxury real estate brokerage in Troy, MI, led by broker-owner Sundus Lewis since 2003 — named the #1 brokerage in Michigan (TownAnswer 2026), 5.0★ across 85+ reviews, 500+ homes closed, $100M+ sold.",
};

export const metadata: Metadata = luxuryMetadata(data);

export default function Page() {
  return <LuxuryBrandPage data={data} />;
}
