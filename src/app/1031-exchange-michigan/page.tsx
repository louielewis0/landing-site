import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const data: GuidePageData = {
  slug: "1031-exchange-michigan",
  crumbLabel: "1031 Exchange in Michigan",
  eyebrow: "Investor guide · Michigan",
  h1: (
    <>
      The <span style={{ color: "var(--s-gold)" }}>1031 exchange</span> in Michigan, explained
    </>
  ),
  h1Text: "1031 Exchange in Michigan (2026): Rules, Timeline & How to Defer Tax",
  sub: "A 1031 exchange lets a Michigan investor sell one property and roll the entire gain into the next — deferring capital gains tax, depreciation recapture, and state tax instead of handing a chunk to the IRS. Here's exactly how it works, the strict deadlines, and the mistakes that blow it up.",
  publishedISO: "2026-11-16",
  publishedLabel: "November 16, 2026",
  bullets: [
    "Defer capital gains + depreciation recapture",
    "45 days to identify, 180 days to close",
    "Michigan follows the federal rules",
  ],
  sections: [
    {
      heading: "What a 1031 exchange actually does",
      body: (
        <>
          <p>
            Named for Section 1031 of the tax code, a <strong>1031 (&ldquo;like-kind&rdquo;) exchange</strong> lets you
            sell an <strong>investment or business property</strong> and reinvest the proceeds into another one
            <strong> without paying tax on the gain now</strong>. Instead of losing 20&ndash;35% of your profit to
            taxes, your <em>full</em> equity keeps working, compounding into a bigger property.
          </p>
          <p>
            It is <strong>deferral, not forgiveness</strong> &mdash; but investors legally chain exchanges for decades
            (&ldquo;swap &rsquo;til you drop&rdquo;), and when the property passes to heirs, they receive a{" "}
            <strong>stepped-up basis</strong> that can erase the deferred gain entirely. It&rsquo;s the single most
            powerful wealth-building tool in real estate.
          </p>
          <p style={{ fontSize: 13, color: "var(--s-muted)" }}>
            Run the numbers for your own deal with our{" "}
            <a href="/1031-exchange-calculator" style={{ color: "var(--s-gold-ink)", fontWeight: 600 }}>1031 exchange calculator</a>.
          </p>
        </>
      ),
    },
    {
      heading: "The rules & the timeline (this is where deals die)",
      body: (
        <>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li>
              <strong>Investment/business property only.</strong> Rentals, commercial, land, and multi-family qualify.
              Your <strong>primary residence does not</strong> (that uses the separate home-sale exclusion).
            </li>
            <li>
              <strong>Like-kind is broad.</strong> Any U.S. real property held for investment is like-kind to any
              other &mdash; you can swap a rental house for an apartment building, or land for a strip mall.
            </li>
            <li>
              <strong>45 days to identify.</strong> From the day you close your sale, you have <strong>45 calendar
              days</strong> to formally identify your replacement property (or properties). No extensions.
            </li>
            <li>
              <strong>180 days to close.</strong> You must <strong>close</strong> on the replacement within{" "}
              <strong>180 days</strong> of your sale. The 45- and 180-day clocks run at the same time.
            </li>
            <li>
              <strong>Use a Qualified Intermediary.</strong> You <em>cannot touch the money</em> &mdash; a QI holds the
              proceeds between sales. If the cash hits your account, the exchange is blown.
            </li>
            <li>
              <strong>Trade equal or up.</strong> To defer <em>all</em> the tax, buy a property of equal or greater
              value and reinvest all your equity (and replace any debt). Take cash out (&ldquo;boot&rdquo;) and that
              portion is taxed.
            </li>
          </ul>
        </>
      ),
    },
    {
      heading: "What taxes you're deferring",
      body: (
        <>
          <p>A 1031 defers more than just capital gains &mdash; which is why it&rsquo;s so valuable:</p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li><strong>Federal capital gains tax</strong> &mdash; up to 20% on long-term gains.</li>
            <li><strong>Depreciation recapture</strong> &mdash; taxed up to 25%, and on a long-held rental this is often the <em>biggest</em> piece.</li>
            <li><strong>Net Investment Income Tax</strong> &mdash; an extra 3.8% for higher earners.</li>
            <li><strong>Michigan income tax</strong> &mdash; 4.25% on the gain. Michigan conforms to federal 1031 treatment, so deferring federally defers your Michigan tax too.</li>
          </ul>
          <p>
            Add it up and a 1031 can keep <strong>roughly a third of your gain</strong> invested instead of sent to
            the government &mdash; equity you can leverage into a larger, better-cash-flowing property.
          </p>
          <p style={{ fontSize: 13, color: "var(--s-muted)" }}>This is general information, not tax or legal advice &mdash; work with a CPA and a Qualified Intermediary.</p>
        </>
      ),
    },
    {
      heading: "Does a 1031 exchange work in Michigan?",
      body: (
        <>
          <p>
            Yes. <strong>Michigan follows the federal 1031 rules</strong> &mdash; there&rsquo;s no state add-back that
            claws the tax back, so a properly structured exchange defers both your federal and your 4.25% Michigan
            tax. Metro Detroit is a strong market to exchange within: investors routinely trade up from single
            rentals into <strong>2&ndash;4 unit buildings, commercial, or newer construction</strong> in growing
            Oakland, Macomb, and Wayne County submarkets.
          </p>
          <p>
            The hard part isn&rsquo;t the paperwork &mdash; it&rsquo;s the <strong>45-day clock</strong>. You have to
            line up your replacement property fast, which is exactly where an agent who knows the inventory (and the
            off-market deals) makes or breaks the exchange.
          </p>
        </>
      ),
    },
    {
      heading: "How we help investors exchange",
      body: (
        <>
          <p>
            <strong>Real Estate Market Center</strong> helps Michigan investors run clean exchanges: we help you sell
            the relinquished property, and &mdash; critically &mdash; we have your <strong>replacement property
            identified inside the 45-day window</strong>, including off-market opportunities a public search
            won&rsquo;t show. We coordinate with your Qualified Intermediary and CPA so the deadlines are hit and the
            deferral holds.
          </p>
          <p>
            Thinking about trading up? Start with the{" "}
            <a href="/1031-exchange-calculator" style={{ color: "var(--s-gold-ink)", fontWeight: 600 }}>1031 calculator</a>{" "}
            to see your deferred tax, then let&rsquo;s talk about the right replacement property.
          </p>
        </>
      ),
    },
  ],
  faqHeading: "1031 exchange in Michigan — common questions",
  faqs: [
    {
      question: "What is a 1031 exchange in Michigan?",
      answer:
        "A 1031 exchange lets a Michigan investor sell an investment or business property and reinvest the proceeds into another like-kind property while deferring the tax on the gain. Instead of paying capital gains tax, depreciation recapture, and Michigan's 4.25% income tax now, your full equity rolls into the next property. Michigan follows the federal rules, so a properly done exchange defers both federal and state tax.",
    },
    {
      question: "What are the 1031 exchange timeline rules?",
      answer:
        "Two strict deadlines that run at the same time from the day you close your sale: you have 45 calendar days to formally identify your replacement property, and 180 calendar days to close on it. There are no extensions, and you must use a Qualified Intermediary to hold the proceeds — if the money touches your account, the exchange fails.",
    },
    {
      question: "Can I do a 1031 exchange on my primary residence?",
      answer:
        "No. 1031 exchanges are only for property held for investment or business use — rentals, commercial, land, and multi-family. Your primary residence doesn't qualify (though it may qualify for the separate home-sale capital gains exclusion of $250,000 single / $500,000 married).",
    },
    {
      question: "How much tax does a 1031 exchange defer?",
      answer:
        "Potentially a lot: federal capital gains (up to 20%), depreciation recapture (up to 25%), the 3.8% Net Investment Income Tax for higher earners, and Michigan's 4.25% income tax. Combined, that can be roughly a third of your gain kept invested instead of paid out — which is what makes exchanging into a bigger property so powerful.",
    },
    {
      question: "Does Michigan recognize 1031 exchanges?",
      answer:
        "Yes. Michigan conforms to the federal treatment of 1031 like-kind exchanges, so there's no separate state tax triggered when you defer at the federal level. A correctly structured exchange defers your Michigan income tax on the gain along with the federal taxes.",
    },
  ],
  related: [
    { href: "/1031-exchange-calculator", label: "1031 exchange calculator" },
    { href: "/rental-property-roi-calculator", label: "Rental property ROI calculator" },
    { href: "/sell-or-rent-calculator", label: "Sell or rent calculator" },
    { href: "/cost-of-selling-a-house-in-michigan", label: "Cost of selling a house in Michigan" },
    { href: "/metro-detroit-housing-market-update", label: "Metro Detroit market update" },
  ],
  ctaHeading: "Thinking about a 1031 exchange? Let's beat the 45-day clock.",
  ctaBody: (
    <>
      Tell us about the property you&rsquo;re selling and we&rsquo;ll help you line up the right replacement &mdash;
      including off-market deals &mdash; inside your exchange window, and coordinate with your intermediary and CPA so
      the deferral holds.
    </>
  ),
  ctaPrimary: { href: "/contact", label: "Talk to an investment specialist" },
  metaTitle: "1031 Exchange in Michigan (2026): Rules, Timeline & Tax Deferral",
  metaDescription:
    "How a 1031 exchange works in Michigan: defer capital gains, depreciation recapture, and the 4.25% state tax by reinvesting in like-kind property. The 45-day / 180-day timeline, Qualified Intermediary rules, and how to line up a replacement property in time.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
