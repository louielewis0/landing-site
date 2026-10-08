import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const data: GuidePageData = {
  slug: "what-is-my-home-worth-birmingham",
  crumbLabel: "Birmingham Home Values",
  eyebrow: "Home values · Birmingham, MI",
  h1: (
    <>
      What&rsquo;s your <span style={{ color: "var(--s-gold)" }}>Birmingham</span> home worth?
    </>
  ),
  h1Text: "What's My Home Worth in Birmingham, MI? 2026 Luxury Home Values & Valuation",
  sub: (
    <>
      Birmingham is Metro Detroit&rsquo;s walkable luxury capital — and its fastest-appreciating
      suburb. But between in-town condos, historic homes, and Quarton Lake estates, &ldquo;median&rdquo;
      means little. Here&rsquo;s what Birmingham values are really doing, and how to price your home.
    </>
  ),
  bullets: [
    "Typical Birmingham home ~$749K · +6.5% year over year",
    "Fastest value growth of the suburbs we track",
    "A large share of the luxury tier sells off-market",
  ],
  publishedISO: "2026-10-08",
  publishedLabel: "October 8, 2026",
  sections: [
    {
      heading: "Birmingham home values right now",
      body: (
        <>
          <p>
            The typical Birmingham home value is about <strong>$749,411</strong>, up a market-leading{" "}
            <strong>+6.5% year over year</strong> on Zillow&rsquo;s index — the strongest appreciation of
            the Metro Detroit suburbs we track. Redfin&rsquo;s three-month median sale price runs around{" "}
            <strong>$1.1M</strong> (+13.6%), with a median of roughly <strong>25 days on market</strong>.
            The gap between the two numbers tells the story: Birmingham is a small, high-variance
            market where the mix of what sells swings the median hard.
          </p>
          <p>
            An in-town condo, a renovated historic home near Poppleton Park, and a Quarton Lake
            estate are three different markets. Pricing a Birmingham home well requires real,
            hyper-local comps — not a portal estimate.
          </p>
        </>
      ),
    },
    {
      heading: "What drives home values in Birmingham",
      body: (
        <>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li>
              <strong>Walkable downtown.</strong> Proximity to Old Woodward&rsquo;s dining, shopping, and
              nightlife is Birmingham&rsquo;s signature premium — in-town and near-town addresses carry it.
            </li>
            <li>
              <strong>The luxury top end.</strong> Quarton Lake and the Quarton Road corridor hold
              the trophy estates; true luxury inventory generally begins around $1.5M and climbs into
              the multimillions.
            </li>
            <li>
              <strong>Schools.</strong> Birmingham Public Schools (Groves and Seaholm) is a strong,
              top-tier district that supports family-home demand.
            </li>
            <li>
              <strong>The off-market reality.</strong> A meaningful share of Birmingham&rsquo;s high end
              trades privately and never hits the MLS — which means public &ldquo;days on market&rdquo; and
              comps understate true activity. This is where an experienced local broker matters most.
            </li>
          </ul>
        </>
      ),
    },
    {
      heading: "Is now a good time to sell in Birmingham?",
      body: (
        <>
          <p>
            For most sellers, yes — Birmingham has posted the strongest value growth in the region,
            and demand for walkable, well-located luxury remains deep. The nuance is at the very top
            of the market, where pricing precision and discreet, off-market-capable marketing make
            the difference between a strong, quiet sale and a listing that lingers publicly.
          </p>
        </>
      ),
    },
    {
      heading: "Get a real number on your Birmingham home",
      body: (
        <>
          <p>
            In a market this varied, the only reliable value is one built on genuinely comparable
            Birmingham sales — adjusted for location relative to downtown, condition, and finish
            level — plus awareness of recent off-market trades. We&rsquo;ll give you a broker-verified
            range within 24 hours, with the discretion the luxury end requires.
          </p>
          <p>
            <a href="/home-value">Get your free Birmingham home valuation &rarr;</a> · Or explore the{" "}
            <a href="/luxury-homes-in-birmingham">Birmingham luxury market guide</a>.
          </p>
          <p style={{ fontSize: 12, color: "var(--s-muted)" }}>
            Data: Zillow Home Value Index (through Aug 2026) and Redfin (three months ending Aug
            2026), pulled Sept 21, 2026. ZHVI is a typical home value, not a median sale price.
          </p>
        </>
      ),
    },
  ],
  faqHeading: "Birmingham home values — common questions",
  faqs: [
    {
      question: "What is my home worth in Birmingham, MI?",
      answer:
        "The typical Birmingham home is worth about $749,411 as of the latest sourced data (Zillow Home Value Index), up 6.5% year over year, with recent median sale prices around $1.1M. Birmingham is a high-variance market — an in-town condo, a historic home, and a Quarton Lake estate price very differently — so a hyper-local comparable-sales valuation is essential. Get a free broker-verified valuation at marketcenterrealty.com/home-value.",
    },
    {
      question: "Why is Birmingham so expensive?",
      answer:
        "Birmingham combines a highly walkable downtown (Old Woodward), a top-tier school district, and a limited supply of luxury estates around Quarton Lake. That scarcity plus lifestyle premium has made it the fastest-appreciating suburb we track, up 6.5% year over year.",
    },
    {
      question: "Do luxury homes in Birmingham sell off-market?",
      answer:
        "Yes — a meaningful share of Birmingham's high-end homes trade privately and never appear on the MLS. That makes experienced, discreet, off-market-capable representation especially valuable when buying or selling in the luxury tier.",
    },
  ],
  related: [
    { href: "/home-value", label: "Free home valuation" },
    { href: "/luxury-homes-in-birmingham", label: "Birmingham luxury market guide" },
    { href: "/sell-your-home-metro-detroit", label: "How we sell homes for more" },
    { href: "/birmingham-real-estate-agent", label: "Birmingham real estate agent" },
    { href: "/best-real-estate-agent-birmingham", label: "Best real estate agent in Birmingham" },
  ],
  ctaHeading: "What's your Birmingham home really worth?",
  ctaBody: (
    <>
      A broker-verified valuation built on real Birmingham comps — including awareness of recent
      off-market trades — with the discretion the luxury market requires. Free, no obligation.
    </>
  ),
  ctaPrimary: { href: "/home-value", label: "Get my free valuation" },
  metaTitle: "What's My Home Worth in Birmingham, MI? 2026 Values & Valuation",
  metaDescription:
    "Birmingham, MI home values are ~$749K, up 6.5% year over year — the fastest-appreciating Metro Detroit suburb. See what drives Birmingham values and get a free broker-verified valuation from Real Estate Market Center.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
