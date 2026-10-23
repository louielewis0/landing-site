import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const data: GuidePageData = {
  slug: "michigan-closing-costs",
  crumbLabel: "Michigan Closing Costs",
  eyebrow: "Cost guide · Michigan",
  h1: (
    <>
      Michigan <span style={{ color: "var(--s-gold)" }}>closing costs</span>, explained
    </>
  ),
  h1Text: "Michigan Closing Costs: Who Pays What, Transfer Tax & Totals (2026)",
  sub: (
    <>
      A clear, honest breakdown of what it costs to close on a home in Michigan &mdash; who customarily
      pays what, the exact transfer-tax rate, and realistic totals for both buyers and sellers. No
      surprises at the closing table.
    </>
  ),
  bullets: [
    "Buyers: typically ~2–5% of the price",
    "Sellers: ~4% + a negotiable commission",
    "Transfer tax: 0.86% of price (customarily seller-paid)",
  ],
  publishedISO: "2026-10-11",
  publishedLabel: "October 11, 2026",
  sections: [
    {
      heading: "The short answer",
      body: (
        <>
          <p>
            In Michigan, <strong>buyers</strong> typically pay closing costs of roughly{" "}
            <strong>2%&ndash;5% of the purchase price</strong> (lender fees, title, recording, and
            prepaid taxes/insurance). <strong>Sellers</strong> typically pay around{" "}
            <strong>4% of the sale price</strong> in costs like transfer tax and title &mdash;{" "}
            <em>plus</em> a real estate commission, which is negotiable.
          </p>
          <p>
            Want your exact seller bottom line? Use the{" "}
            <a href="/home-sale-proceeds-calculator">net proceeds calculator</a>. Buying? See{" "}
            <a href="/how-to-buy-a-home-in-michigan">how to buy a home in Michigan</a>.
          </p>
        </>
      ),
    },
    {
      heading: "Who customarily pays what in Michigan",
      body: (
        <>
          <p>
            Michigan has a couple of customs worth knowing (everything is ultimately negotiable in the
            purchase agreement):
          </p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li>
              <strong>Seller customarily pays:</strong> the state + county transfer tax, and &mdash;
              distinctively for Michigan &mdash; the <strong>owner&rsquo;s title insurance policy</strong>.
            </li>
            <li>
              <strong>Buyer customarily pays:</strong> lender/origination fees, the appraisal, the
              home inspection, the <strong>lender&rsquo;s title policy</strong>, recording fees, and
              prepaid escrows (property taxes + homeowners insurance).
            </li>
          </ul>
        </>
      ),
    },
    {
      heading: "Seller closing costs, line by line",
      body: (
        <>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li>
              <strong>Transfer tax &mdash; 0.86% of sale price.</strong> Michigan charges a state tax of
              $7.50 per $1,000 (0.75%) plus a county tax of $1.10 per $1,000 (0.11%) &mdash;{" "}
              <strong>$8.60 per $1,000 combined</strong>. On a $400,000 sale that&rsquo;s about $3,440.
            </li>
            <li>
              <strong>Owner&rsquo;s title insurance &mdash; roughly 0.4% of price.</strong> Scales with sale
              price; often discounted when issued alongside the lender&rsquo;s policy.
            </li>
            <li>
              <strong>Prorated property taxes.</strong> You pay your share of the year&rsquo;s taxes up to
              closing (Michigan&rsquo;s summer/winter tax split makes this deal-specific).
            </li>
            <li>
              <strong>Real estate commission &mdash; negotiable.</strong> Historically ~5&ndash;6% total;
              since the August 2024 industry rule changes, buyer-agent compensation is negotiated
              separately rather than posted on the MLS. We&rsquo;ll walk you through your options before you
              sign.
            </li>
            <li>
              <strong>Any seller concessions</strong> you agree to credit the buyer.
            </li>
          </ul>
          <p style={{ fontSize: 13, color: "var(--s-muted)" }}>
            Rough seller total excluding commission: about 4% of sale price. One money-saver: if your
            home&rsquo;s State Equalized Value at sale is at or below what it was when you bought, you may be
            able to claim a refund of the <em>state</em> portion of the transfer tax &mdash; ask your title
            company or attorney.
          </p>
        </>
      ),
    },
    {
      heading: "Buyer closing costs, line by line",
      body: (
        <>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li>
              <strong>Lender/origination fees &mdash; ~0.5%&ndash;1% of the loan</strong> (plus small
              application and credit-report fees).
            </li>
            <li>
              <strong>Appraisal &mdash; roughly $300&ndash;$600.</strong>
            </li>
            <li>
              <strong>Home inspection &mdash; roughly $300&ndash;$500</strong> (optional but strongly
              recommended).
            </li>
            <li>
              <strong>Lender&rsquo;s title policy &mdash; roughly 0.1% of price.</strong>
            </li>
            <li>
              <strong>Recording fees &mdash; a flat $30 per document in Michigan</strong> (so about $60 for
              the deed and mortgage).
            </li>
            <li>
              <strong>Prepaid escrows &mdash; often around 1% of price</strong>, covering prepaid property
              taxes, homeowners insurance, and per-diem interest. These are deposits toward amounts
              you&rsquo;d owe anyway, not pure fees.
            </li>
          </ul>
          <p style={{ fontSize: 13, color: "var(--s-muted)" }}>
            Rough buyer total: about 2%&ndash;5% of the purchase price. Run your numbers with the{" "}
            <a href="/home-affordability-calculator">affordability calculator</a>.
          </p>
        </>
      ),
    },
  ],
  faqHeading: "Michigan closing costs — common questions",
  faqs: [
    {
      question: "How much are closing costs in Michigan?",
      answer:
        "Buyers typically pay about 2% to 5% of the purchase price in closing costs (lender fees, title, recording, and prepaid escrows). Sellers typically pay around 4% of the sale price in costs such as transfer tax and title insurance, plus a negotiable real estate commission.",
    },
    {
      question: "Who pays closing costs in Michigan, the buyer or the seller?",
      answer:
        "Both pay a share. In Michigan the seller customarily pays the transfer tax and the owner's title insurance policy, while the buyer customarily pays lender fees, the appraisal, inspection, the lender's title policy, recording fees, and prepaid escrows. Everything is negotiable in the purchase agreement.",
    },
    {
      question: "How much is the real estate transfer tax in Michigan?",
      answer:
        "Michigan's combined real estate transfer tax is $8.60 per $1,000 of sale price — a 0.75% state tax plus a 0.11% county tax, totaling 0.86%. It's customarily paid by the seller. On a $400,000 sale that's about $3,440.",
    },
    {
      question: "Who pays for title insurance in Michigan?",
      answer:
        "In Michigan, the seller customarily pays for the owner's title insurance policy, while the buyer customarily pays for the lender's policy when financing. Both are negotiable, and issuing them together often earns a simultaneous-issue discount.",
    },
  ],
  related: [
    { href: "/who-pays-realtor-commission-michigan", label: "Who pays realtor commission in Michigan?" },
    { href: "/home-sale-proceeds-calculator", label: "Net proceeds calculator (sellers)" },
    { href: "/how-to-buy-a-home-in-michigan", label: "How to buy a home in Michigan" },
    { href: "/michigan-property-taxes-explained", label: "Michigan property taxes explained" },
    { href: "/sell-your-home-metro-detroit", label: "Sell your home for more" },
    { href: "/home-inspection-vs-appraisal", label: "Home inspection vs. appraisal" },
  ],
  ctaHeading: "Want your exact numbers?",
  ctaBody: (
    <>
      Whether you&rsquo;re buying or selling, we&rsquo;ll give you a clear, honest estimate of your real costs
      &mdash; no surprises. Talk to a local expert.
    </>
  ),
  ctaPrimary: { href: "/contact", label: "Get a clear cost estimate" },
  metaTitle: "Michigan Closing Costs (2026): Who Pays What + Transfer Tax",
  metaDescription:
    "Michigan closing costs explained: buyers ~2–5%, sellers ~4% plus a negotiable commission. Transfer tax is 0.86% (seller-paid), who pays title insurance, recording fees, and full buyer/seller breakdowns. From Real Estate Market Center.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
