import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const data: GuidePageData = {
  slug: "what-is-my-home-worth-troy",
  crumbLabel: "Troy Home Values",
  eyebrow: "Home values · Troy, MI",
  h1: (
    <>
      What&rsquo;s your <span style={{ color: "var(--s-gold)" }}>Troy</span> home worth?
    </>
  ),
  h1Text: "What's My Home Worth in Troy, MI? 2026 Home Values & Free Valuation",
  sub: (
    <>
      Troy homes sell on the strength of two things: top-ranked schools and unusually durable
      resale value. Here&rsquo;s where Troy values stand today, what moves them, and how to get a
      broker-verified number on your specific home.
    </>
  ),
  bullets: [
    "Typical Troy home ~$459K · +2.2% year over year",
    "Median ~19 days on market",
    "Among the strongest resale value in Oakland County",
  ],
  publishedISO: "2026-10-08",
  publishedLabel: "October 8, 2026",
  sections: [
    {
      heading: "Troy home values right now",
      body: (
        <>
          <p>
            As of the latest sourced data, the typical Troy home value is about{" "}
            <strong>$458,678</strong>, up <strong>+2.2% year over year</strong> on Zillow&rsquo;s
            home-value index. Redfin&rsquo;s three-month median sale price runs around{" "}
            <strong>$472,000</strong> (+6.2%), with a median of roughly <strong>19 days on market</strong>{" "}
            and about <strong>279 homes sold</strong> in the period — a deep, liquid market by Oakland
            County standards.
          </p>
          <p>
            The headline hides real spread: a 1,500 sq ft ranch near the Warren border and a 4,000
            sq ft colonial in the Troy or Athens high-school zones are very different sales. Your
            number depends on your subdivision, school zone, lot, and updates.
          </p>
        </>
      ),
    },
    {
      heading: "What drives home values in Troy",
      body: (
        <>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li>
              <strong>Schools.</strong> Troy School District — with Troy High, Athens High, and the
              International Academy — is a primary demand driver. Homes in the strongest zones
              command a measurable premium and resell faster.
            </li>
            <li>
              <strong>Resale durability.</strong> Troy has historically held value through cycles
              better than most Metro Detroit suburbs — a major draw for move-up and relocating
              buyers.
            </li>
            <li>
              <strong>Jobs &amp; location.</strong> The Big Beaver / Somerset corridor, major
              corporate employers, and quick I-75 access keep buyer demand steady year-round.
            </li>
            <li>
              <strong>Housing stock.</strong> Everything from 1960s–70s ranches and colonials to
              newer builds — condition and updates swing value hard in Troy.
            </li>
          </ul>
        </>
      ),
    },
    {
      heading: "Is now a good time to sell in Troy?",
      body: (
        <>
          <p>
            Yes, for well-prepared homes. Values are still rising year over year, inventory remains
            tight, and a ~19-day median means correctly priced, move-in-ready homes are still moving
            quickly. The risk in Troy isn&rsquo;t demand — it&rsquo;s overpricing into a market where
            buyers are comparing you directly to the comp down the street. Precision pricing wins.
          </p>
        </>
      ),
    },
    {
      heading: "Get a real number on your Troy home",
      body: (
        <>
          <p>
            An online estimate is a starting point, not an answer. We price on recorded comparable
            sales from the last 90 days in your Troy neighborhood and school zone, adjusted for your
            home&rsquo;s condition and updates — then give you a broker-verified range within 24 hours.
          </p>
          <p>
            <a href="/home-value">Get your free Troy home valuation &rarr;</a>
          </p>
          <p style={{ fontSize: 12, color: "var(--s-muted)" }}>
            Data: Zillow Home Value Index (through Aug 2026) and Redfin (three months ending Aug
            2026), pulled Sept 21, 2026. ZHVI is a typical home value, not a median sale price.
          </p>
        </>
      ),
    },
  ],
  faqHeading: "Troy home values — common questions",
  faqs: [
    {
      question: "What is my home worth in Troy, MI?",
      answer:
        "The typical Troy home is worth about $458,678 as of the latest sourced data (Zillow Home Value Index), up 2.2% year over year, with recent median sale prices around $472,000. Your home's actual value depends on its subdivision, school zone, size, lot, and updates. Get a free broker-verified valuation at marketcenterrealty.com/home-value.",
    },
    {
      question: "Is it a good time to sell a house in Troy?",
      answer:
        "Yes for well-priced, move-in-ready homes. Troy values are still up year over year, inventory is tight, and the median home sells in about 19 days. The main risk is overpricing, because Troy buyers compare homes directly against recent comparable sales.",
    },
    {
      question: "How fast do homes sell in Troy?",
      answer:
        "Recent data shows a median of about 19 days on market in Troy, with roughly 279 homes sold in the latest three-month period — a liquid, active market.",
    },
  ],
  related: [
    { href: "/home-value", label: "Free home valuation" },
    { href: "/home-sale-proceeds-calculator", label: "Net proceeds calculator" },
    { href: "/sell-your-home-metro-detroit", label: "How we sell homes for more" },
    { href: "/troy-real-estate-agent", label: "Troy real estate agent" },
    { href: "/best-real-estate-agent-troy", label: "Best real estate agent in Troy" },
  ],
  ctaHeading: "What's your Troy home really worth?",
  ctaBody: (
    <>
      An instant estimate from recorded sales, then a broker-verified number from a team that
      knows your Troy neighborhood. Free, no obligation.
    </>
  ),
  ctaPrimary: { href: "/home-value", label: "Get my free valuation" },
  metaTitle: "What's My Home Worth in Troy, MI? 2026 Values & Free Valuation",
  metaDescription:
    "Troy, MI home values are ~$459K, up 2.2% year over year, median ~19 days on market. See what drives Troy values and get a free broker-verified home valuation from Real Estate Market Center.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
