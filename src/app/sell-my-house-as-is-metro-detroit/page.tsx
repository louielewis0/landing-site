import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const data: GuidePageData = {
  slug: "sell-my-house-as-is-metro-detroit",
  crumbLabel: "Sell My House As-Is",
  eyebrow: "Seller guide · Metro Detroit",
  h1: (
    <>
      Sell your house <span style={{ color: "var(--s-gold)" }}>as-is</span> in Metro Detroit
    </>
  ),
  h1Text: "Sell My House As-Is in Metro Detroit, Michigan (2026)",
  sub: "You can absolutely sell your home as-is in Michigan — without renovating, repairing, or cleaning out decades of stuff. But selling as-is on the open market almost always nets you far more than a cash-for-houses lowball. Here's how it works, and how to get the most for a home that needs work.",
  publishedISO: "2026-11-16",
  publishedLabel: "November 16, 2026",
  bullets: [
    "No repairs, no cleanout, no staging",
    "Net more than a cash-buyer lowball",
    "Warren, Rochester Hills, Madison Heights & all metro",
  ],
  sections: [
    {
      heading: "What 'as-is' actually means in Michigan",
      body: (
        <>
          <p>
            Selling <strong>as-is</strong> means you&rsquo;re selling the home in its current condition and{" "}
            <strong>won&rsquo;t make repairs</strong> or offer repair credits. The buyer takes the property with
            whatever it needs. It&rsquo;s a completely normal, legal way to sell &mdash; and for an inherited home, a
            dated house, or one that needs work, it&rsquo;s often the smartest path.
          </p>
          <p>
            Two things to know. First, <strong>as-is does not remove your disclosure duty</strong> &mdash; Michigan
            still requires a{" "}
            <a href="/michigan-seller-disclosure-requirements" style={{ color: "var(--s-gold-ink)", fontWeight: 600 }}>Seller&rsquo;s Disclosure Statement</a>{" "}
            on most sales, and you can&rsquo;t hide a known defect. Second, buyers can still inspect &mdash; they just
            can&rsquo;t expect you to fix what they find. As-is sets the expectation up front, which actually makes
            for cleaner, faster deals.
          </p>
        </>
      ),
    },
    {
      heading: "As-is on the open market vs. 'we buy houses' cash offers",
      body: (
        <>
          <p>
            When a home needs work, the first calls people get are from <strong>cash investors</strong> &mdash; the
            &ldquo;we buy houses&rdquo; signs and &ldquo;sell my house fast&rdquo; ads. They&rsquo;re convenient, but
            convenience is expensive: these buyers typically pay <strong>50&ndash;70% of market value</strong>, because
            their whole business model is buying low, doing the work, and reselling for the spread <em>you</em> left
            on the table.
          </p>
          <p>
            Here&rsquo;s what most sellers don&rsquo;t realize: you can sell <strong>as-is on the open market</strong> too.
            There is huge demand from <strong>everyday buyers, flippers, and investors</strong> competing for homes
            that need work &mdash; especially in strong Metro Detroit areas. Expose the home to <em>all</em> of them
            instead of one lowball cash buyer, and the price goes up. Even after a little more time and a standard
            commission, as-is-on-market sellers routinely <strong>net tens of thousands more</strong> than they would
            have from the first cash offer.
          </p>
        </>
      ),
    },
    {
      heading: "How we sell your house as-is for more",
      body: (
        <>
          <p><strong>Real Estate Market Center</strong> runs an as-is sale to maximize your net, not just your speed:</p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li><strong>Price it right for condition</strong> &mdash; using real comparable sales, so it draws competing offers instead of sitting.</li>
            <li><strong>Market to the full buyer pool</strong> &mdash; MLS, investors, flippers, and retail buyers who <em>want</em> a project, so multiple parties bid.</li>
            <li><strong>No prep required</strong> &mdash; no repairs, no cleanout, no staging; leave what you don&rsquo;t want and we handle the rest.</li>
            <li><strong>Handle disclosure correctly</strong> &mdash; so you&rsquo;re protected and the deal doesn&rsquo;t fall apart later.</li>
            <li><strong>Vet the cash offers you do get</strong> &mdash; and tell you honestly when one is actually a good deal.</li>
          </ul>
          <p style={{ marginTop: 12 }}>
            We help sellers across <strong>Warren, Sterling Heights, Madison Heights, Rochester Hills, Troy,
            Birmingham, and all of Oakland, Macomb, and Wayne County</strong>. Selling an inherited or damaged home?
            See our guides on{" "}
            <a href="/selling-an-inherited-house-michigan" style={{ color: "var(--s-gold-ink)", fontWeight: 600 }}>selling an inherited house</a>{" "}
            and{" "}
            <a href="/water-damage-sell-or-restore" style={{ color: "var(--s-gold-ink)", fontWeight: 600 }}>selling a damaged home vs. restoring it</a>.
          </p>
        </>
      ),
    },
    {
      heading: "When as-is makes the most sense",
      body: (
        <>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li><strong>Inherited or estate homes</strong> you don&rsquo;t want to pour money into.</li>
            <li><strong>Dated homes</strong> that would need a full renovation to show &ldquo;retail.&rdquo;</li>
            <li><strong>Homes with deferred maintenance</strong> &mdash; roof, mechanicals, foundation &mdash; where repairs would cost more than they return.</li>
            <li><strong>Fire, water, or storm damage</strong>, where restoring first isn&rsquo;t worth it.</li>
            <li><strong>Any situation where speed and simplicity matter</strong> &mdash; divorce, relocation, downsizing, or a tough tenant.</li>
          </ul>
          <p>
            Not sure whether to sell as-is or fix a few things first? We&rsquo;ll tell you &mdash; sometimes a $2,000
            fix adds $15,000 to the price, and sometimes it doesn&rsquo;t move the needle at all. That advice is free.
          </p>
        </>
      ),
    },
  ],
  faqHeading: "Selling a house as-is in Michigan — common questions",
  faqs: [
    {
      question: "Can I sell my house as-is in Michigan?",
      answer:
        "Yes. Selling as-is means you sell in current condition and won't make repairs. It's completely legal in Michigan. You still have to provide a Seller's Disclosure Statement on most sales and can't conceal known defects, and buyers can still inspect — they just can't expect you to fix what they find. For homes that need work, as-is is often the smartest way to sell.",
    },
    {
      question: "Should I sell as-is to a cash buyer or on the open market?",
      answer:
        "Usually the open market. 'We buy houses' cash investors typically pay 50–70% of market value because they resell for the difference. You can sell as-is on the MLS and expose the home to everyday buyers, flippers, and investors all at once — which drives the price up. Even after a bit more time and a standard commission, open-market as-is sellers routinely net tens of thousands more than the first cash offer.",
    },
    {
      question: "Do I have to make repairs or clean out the house to sell as-is?",
      answer:
        "No. As-is means no repairs, no repair credits, and no required prep. With Real Estate Market Center you can leave what you don't want behind — no cleanout, no staging, no renovation. We price and market the home for its condition so it still draws competing offers.",
    },
    {
      question: "Do I still need a seller's disclosure if I sell as-is?",
      answer:
        "In most cases, yes. Selling 'as-is' affects who pays for repairs, not whether you have to be honest. Michigan still requires a completed Seller's Disclosure Statement on most 1–4 unit home sales, and you cannot knowingly hide a known defect. Handling disclosure correctly actually protects you and keeps the deal from falling apart later.",
    },
    {
      question: "I inherited a house in Metro Detroit that needs work — what should I do?",
      answer:
        "You have options, and you don't have to renovate. Many inherited homes sell best as-is on the open market, where buyers who want a project compete for it. We help families across Warren, Rochester Hills, Madison Heights, Troy, and all of Metro Detroit sell inherited and as-is homes for the most money, with no prep required. Start with a free valuation and we'll lay out the honest numbers.",
    },
  ],
  related: [
    { href: "/home-value", label: "Get your home's value (free)" },
    { href: "/selling-an-inherited-house-michigan", label: "Selling an inherited house in Michigan" },
    { href: "/water-damage-sell-or-restore", label: "Damaged home: sell as-is or restore?" },
    { href: "/cost-of-selling-a-house-in-michigan", label: "Cost of selling a house in Michigan" },
    { href: "/sell-your-home-metro-detroit", label: "Sell your home for more" },
  ],
  ctaHeading: "Sell as-is for the most money — no repairs, no cleanout",
  ctaBody: (
    <>
      Tell us about your home and we&rsquo;ll give you a free, honest valuation and a plan to sell it as-is for the
      most money &mdash; without fixing a thing. No pressure, and we&rsquo;ll tell you if a cash offer is actually
      worth taking.
    </>
  ),
  ctaPrimary: { href: "/home-value", label: "Get my free as-is valuation" },
  metaTitle: "Sell My House As-Is in Metro Detroit, Michigan (2026) | No Repairs",
  metaDescription:
    "Sell your house as-is in Metro Detroit — no repairs, no cleanout, no staging. Why selling as-is on the open market nets far more than a 'we buy houses' cash offer, what Michigan disclosure still requires, and how we sell as-is homes for more across Warren, Rochester Hills, Madison Heights, Troy & Oakland County.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
