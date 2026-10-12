import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const data: GuidePageData = {
  slug: "what-is-my-home-worth-royal-oak",
  crumbLabel: "Royal Oak Home Values",
  eyebrow: "Home values · Royal Oak, MI",
  h1: (
    <>
      What&rsquo;s your <span style={{ color: "var(--s-gold)" }}>Royal Oak</span> home worth?
    </>
  ),
  h1Text: "What's My Home Worth in Royal Oak, MI? 2026 Home Values & Valuation",
  sub: (
    <>
      Royal Oak is Metro Detroit&rsquo;s walkable, social hub &mdash; and a fast seller&rsquo;s market. But its
      older bungalows, downtown condos, and north-end homes price very differently. Here&rsquo;s where
      values stand and how to get a broker-verified number on your home.
    </>
  ),
  bullets: [
    "Typical home ~$338K (Zillow) · recent median sale ~$375K (Redfin)",
    "Fast seller's market — offers often in days",
    "Downtown vs. north end price differently",
  ],
  publishedISO: "2026-10-12",
  publishedLabel: "October 12, 2026",
  sections: [
    {
      heading: "Royal Oak home values right now",
      body: (
        <>
          <p>
            Two reputable sources tell slightly different parts of the story. Zillow&rsquo;s home-value
            index puts the typical Royal Oak home around <strong>$338,000</strong>, up{" "}
            <strong>~2.6% year over year</strong>. Redfin&rsquo;s recent median <em>sale</em> price is higher,
            around <strong>$375,000</strong> (up ~2.7%) &mdash; the difference reflects that the index
            blends all housing (including condos), while the sale median tracks what actually closed.
          </p>
          <p>
            Either way, Royal Oak is a clear <strong>seller&rsquo;s market</strong> &mdash; well-priced homes
            draw offers within days, with roughly three to four weeks to a signed deal.
          </p>
        </>
      ),
    },
    {
      heading: "What drives home values in Royal Oak",
      body: (
        <>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li>
              <strong>The walkable downtown.</strong> A dense, lively core of dining, shopping, and
              nightlife is Royal Oak&rsquo;s signature draw &mdash; and the reason young professionals pay a
              premium to be close to it.
            </li>
            <li>
              <strong>Woodward-corridor location.</strong> Midway between Detroit and the northern
              suburbs, with easy access to Birmingham, Ferndale, and downtown Detroit.
            </li>
            <li>
              <strong>Character housing.</strong> Mature, tree-lined streets of 1920s&ndash;1960s
              bungalows, ranches, and colonials &mdash; well-renovated older homes command premiums.
            </li>
            <li>
              <strong>Schools.</strong> Royal Oak Schools is a solid district (Niche 2026: A&minus;);
              small edge areas can fall into neighboring districts, so verify by address.
            </li>
          </ul>
        </>
      ),
    },
    {
      heading: "Downtown vs. north end — why location matters so much",
      body: (
        <>
          <p>
            Royal Oak isn&rsquo;t one market. The <strong>downtown area (48067)</strong> is denser with more
            condos and attached homes, and that micro-market can swing sharply on small-sample sales.
            The <strong>north end (48073)</strong> skews more single-family. Lot sizes are compact
            citywide, reflecting the walkable pre-war street grid. All of this means a block-level comp
            matters far more than a citywide average.
          </p>
        </>
      ),
    },
    {
      heading: "Get a real number on your Royal Oak home",
      body: (
        <>
          <p>
            We price on recent comparable sales in your specific Royal Oak neighborhood &mdash; matched for
            product type (single-family vs. condo), era, and updates &mdash; then give you a broker-verified
            range within 24 hours.
          </p>
          <p>
            <a href="/home-value">Get your free Royal Oak home valuation &rarr;</a>
          </p>
          <p style={{ fontSize: 12, color: "var(--s-muted)" }}>
            Data: Zillow Home Value Index (typical value, ~mid-2026) and Redfin median sale price
            (Aug 2026). The two measure different things; both move with the market.
          </p>
        </>
      ),
    },
  ],
  faqHeading: "Royal Oak home values — common questions",
  faqs: [
    {
      question: "What is my home worth in Royal Oak, MI?",
      answer:
        "Zillow's home-value index puts the typical Royal Oak home around $338,000 (up ~2.6% year over year), while Redfin's recent median sale price is about $375,000 (up ~2.7%). The two differ because the index blends all housing including condos, and the sale median tracks closed sales. Your home's value depends heavily on neighborhood (downtown vs. north end), product type, and updates. Get a free broker-verified valuation at marketcenterrealty.com/home-value.",
    },
    {
      question: "Is Royal Oak a seller's market?",
      answer:
        "Yes. Well-priced Royal Oak homes typically draw offers within days, with roughly three to four weeks to a signed deal — a competitive, seller-favorable market driven by demand for its walkable downtown lifestyle.",
    },
    {
      question: "Why do Royal Oak home values vary so much by area?",
      answer:
        "The downtown area (48067) is denser with more condos and attached homes and can swing on small-sample sales, while the north end (48073) skews single-family. With compact lots and a mix of product types, a block-level comparable matters much more than a citywide average.",
    },
  ],
  related: [
    { href: "/home-value", label: "Free home valuation" },
    { href: "/home-sale-proceeds-calculator", label: "Net proceeds calculator" },
    { href: "/sell-your-home-metro-detroit", label: "How we sell homes for more" },
    { href: "/how-to-buy-a-home-in-michigan", label: "How to buy a home in Michigan" },
    { href: "/best-real-estate-agent-metro-detroit", label: "Best real estate agent in Metro Detroit" },
  ],
  ctaHeading: "What's your Royal Oak home really worth?",
  ctaBody: (
    <>
      Downtown or north end, bungalow or condo &mdash; get a broker-verified number built on your block&rsquo;s
      recent sales. Free, no obligation.
    </>
  ),
  ctaPrimary: { href: "/home-value", label: "Get my free valuation" },
  metaTitle: "What's My Home Worth in Royal Oak, MI? 2026 Values",
  metaDescription:
    "Royal Oak, MI home values: ~$338K typical (Zillow, +2.6%), recent median sale ~$375K (Redfin). A fast seller's market where downtown and north end price differently. Free broker-verified valuation from Real Estate Market Center.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
