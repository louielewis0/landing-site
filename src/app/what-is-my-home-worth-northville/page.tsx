import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const data: GuidePageData = {
  slug: "what-is-my-home-worth-northville",
  crumbLabel: "Northville Home Values",
  eyebrow: "Home values · Northville, MI",
  h1: (
    <>
      What&rsquo;s your <span style={{ color: "var(--s-gold)" }}>Northville</span> home worth?
    </>
  ),
  h1Text: "What's My Home Worth in Northville, MI? 2026 Home Values & Valuation",
  sub: (
    <>
      Northville is one of the pricier, most sought-after suburbs on the west side &mdash; powered by a
      top-ranked school district, a beloved downtown, and a deep luxury tier. Here&rsquo;s where values
      stand and how to get a broker-verified number on your home.
    </>
  ),
  bullets: [
    "Typical Northville home ~$607K · +5.2% year over year",
    "Recent median sale price ~$517K",
    "Deep luxury tier — golf estates & new construction",
  ],
  publishedISO: "2026-10-12",
  publishedLabel: "October 12, 2026",
  sections: [
    {
      heading: "Northville home values right now",
      body: (
        <>
          <p>
            As of the latest sourced data, the typical Northville home value is about{" "}
            <strong>$607,000</strong>, up a strong <strong>~5.2% year over year</strong> (Zillow
            home-value index) &mdash; with a recent median sale price around <strong>$517,000</strong>.
            Above the everyday market sits a deep luxury tier, from golf-course estates to new
            construction at The Downs.
          </p>
          <p>
            One pattern to know: Northville&rsquo;s <strong>entry homes sell quickly, but the luxury tier
            moves more slowly</strong> &mdash; so pricing precision matters most at the high end.
          </p>
        </>
      ),
    },
    {
      heading: "What drives home values in Northville",
      body: (
        <>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li>
              <strong>Schools.</strong> Northville Public Schools ranks among the very best in
              Michigan (around #2 statewide, Niche 2026) &mdash; a core reason homes hold value.
            </li>
            <li>
              <strong>The downtown premium.</strong> Proximity to the historic, walkable downtown
              carries real value; in-town homes command it.
            </li>
            <li>
              <strong>New construction at The Downs.</strong> The ~48-acre redevelopment of the former
              racetrack is adding significant new (and luxury) inventory near the core.
            </li>
            <li>
              <strong>Golf &amp; estates.</strong> Northville Hills and other estate enclaves anchor the
              high end.
            </li>
          </ul>
        </>
      ),
    },
    {
      heading: "Is now a good time to sell in Northville?",
      body: (
        <>
          <p>
            Yes &mdash; values are up strongly year over year, inventory is tight, and demand for the
            schools and downtown lifestyle is steady. The nuance is at the top of the market, where
            precise pricing and strong marketing separate a clean sale from a listing that lingers.
          </p>
        </>
      ),
    },
    {
      heading: "Get a real number on your Northville home",
      body: (
        <>
          <p>
            Whether you&rsquo;re in an in-town historic home, a golf-community estate, or new construction,
            the only reliable value is one built on genuinely comparable Northville sales. We&rsquo;ll give
            you a broker-verified range within 24 hours.
          </p>
          <p>
            <a href="/home-value">Get your free Northville home valuation &rarr;</a> &middot;{" "}
            <a href="/luxury-homes-in-northville">See Northville&rsquo;s luxury market</a>
          </p>
          <p style={{ fontSize: 12, color: "var(--s-muted)" }}>
            Data: Zillow Home Value Index and Redfin (2026). ZHVI is a typical home value, not a median
            sale price; figures move with the market. Note the City of Northville straddles the
            Wayne/Oakland county line.
          </p>
        </>
      ),
    },
  ],
  faqHeading: "Northville home values — common questions",
  faqs: [
    {
      question: "What is my home worth in Northville, MI?",
      answer:
        "The typical Northville home is worth about $607,000 as of the latest sourced data (Zillow Home Value Index), up about 5.2% year over year, with a recent median sale price around $517,000. Above that sits a deep luxury tier. Your home's value depends on location (in-town vs. golf estate), condition, and updates. Get a free broker-verified valuation at marketcenterrealty.com/home-value.",
    },
    {
      question: "Why are Northville homes expensive?",
      answer:
        "Northville combines a top-ranked school district (around #2 in Michigan), a highly desirable walkable downtown, golf-course estates, and new construction at The Downs — with tight inventory. That mix has driven strong year-over-year value growth of about 5.2%.",
    },
    {
      question: "How fast do homes sell in Northville?",
      answer:
        "Entry and mid-market homes tend to sell quickly given tight inventory and strong demand, while the luxury tier moves more slowly. Pricing precision is especially important at the high end.",
    },
  ],
  related: [
    { href: "/home-value", label: "Free home valuation" },
    { href: "/luxury-homes-in-northville", label: "Luxury homes in Northville" },
    { href: "/living-in-northville", label: "Living in Northville" },
    { href: "/home-sale-proceeds-calculator", label: "Net proceeds calculator" },
    { href: "/sell-your-home-metro-detroit", label: "How we sell homes for more" },
  ],
  ctaHeading: "What's your Northville home really worth?",
  ctaBody: (
    <>
      From in-town historic homes to golf-course estates, get a broker-verified number built on real
      Northville comps &mdash; free, no obligation.
    </>
  ),
  ctaPrimary: { href: "/home-value", label: "Get my free valuation" },
  metaTitle: "What's My Home Worth in Northville, MI? 2026 Values",
  metaDescription:
    "Northville, MI home values are ~$607K, up 5.2% year over year, with recent median sales ~$517K and a deep luxury tier. Get a free broker-verified valuation from Real Estate Market Center.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
