import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const data: GuidePageData = {
  slug: "cost-of-selling-a-house-in-michigan",
  crumbLabel: "Cost of Selling a House in Michigan",
  eyebrow: "Seller guide · Michigan",
  h1: (
    <>
      The <span style={{ color: "var(--s-gold)" }}>cost of selling</span> a house in Michigan
    </>
  ),
  h1Text: "Cost of Selling a House in Michigan: Fees, Transfer Tax & Taxes (2026)",
  sub: "Between transfer tax, title insurance, prorated property taxes, and a negotiable commission, most Michigan sellers pay somewhere around 6–9% of the sale price to sell. Here's every line item, who pays it, and the taxes you may (or may not) owe.",
  publishedISO: "2026-11-16",
  publishedLabel: "November 16, 2026",
  bullets: [
    "Seller costs ex-commission: ~4% of price",
    "Transfer tax: 0.86% (seller-paid)",
    "Most sellers owe $0 capital gains",
  ],
  sections: [
    {
      heading: "The short answer: what it costs to sell",
      body: (
        <>
          <p>
            In Michigan, a seller&rsquo;s closing costs <em>excluding commission</em> typically run about{" "}
            <strong>4% of the sale price</strong> &mdash; transfer tax, the owner&rsquo;s title insurance policy,
            prorated property taxes, and a few smaller fees. Add a <strong>negotiable real estate
            commission</strong> on top, and the all-in cost of selling usually lands in the{" "}
            <strong>6%&ndash;9%</strong> range. On a <strong>$400,000</strong> sale, that&rsquo;s roughly{" "}
            <strong>$24,000&ndash;$36,000</strong> depending on what you negotiate.
          </p>
          <p>
            The single biggest variable is commission &mdash; which, since the August 2024 industry rule
            changes, is fully negotiable and no longer a fixed number. See{" "}
            <a href="/who-pays-realtor-commission-michigan" style={{ color: "var(--s-gold-ink)", fontWeight: 600 }}>who pays the realtor commission in Michigan</a>.
          </p>
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
              $7.50 per $1,000 (0.75%) plus a county tax of $1.10 per $1,000 (0.11%) &mdash; <strong>$8.60 per
              $1,000 combined</strong>, customarily paid by the seller. On a $400,000 sale that&rsquo;s about{" "}
              <strong>$3,440</strong>.
            </li>
            <li>
              <strong>Owner&rsquo;s title insurance &mdash; roughly 0.4% of price.</strong> In Michigan the seller
              customarily buys the owner&rsquo;s policy for the buyer; it scales with price.
            </li>
            <li>
              <strong>Prorated property taxes.</strong> You pay your share of the year&rsquo;s taxes up to the
              closing date.
            </li>
            <li>
              <strong>Real estate commission &mdash; negotiable.</strong> Historically ~5&ndash;6% total; today each
              side is negotiated separately, and sellers decide whether to offer buyer-agent compensation.
            </li>
            <li>
              <strong>Payoff &amp; smaller items.</strong> Your remaining mortgage balance, plus any title/closing
              fees, recording, a possible home-warranty credit, and any <strong>seller concessions</strong> you
              agree to.
            </li>
          </ul>
          <p style={{ fontSize: 13, color: "var(--s-muted)" }}>
            Want your exact bottom line after costs? Use our{" "}
            <a href="/home-sale-proceeds-calculator" style={{ color: "var(--s-gold-ink)", fontWeight: 600 }}>net proceeds calculator</a>.
          </p>
        </>
      ),
    },
    {
      heading: "Taxes on selling a house in Michigan",
      body: (
        <>
          <p>
            Two taxes come up when you sell. The first is the <strong>transfer tax</strong> above (0.86%). The
            second is <strong>capital gains tax</strong> &mdash; and here&rsquo;s the good news: <strong>most sellers
            owe nothing.</strong>
          </p>
          <p>
            If the home was your <strong>primary residence</strong> for at least <strong>two of the last five
            years</strong>, the federal home-sale exclusion lets you exclude up to <strong>$250,000</strong> of
            gain if you&rsquo;re single, or <strong>$500,000</strong> if married filing jointly. Because Michigan
            income tax starts from your federal income, excluded gain generally isn&rsquo;t taxed by the state
            either. Capital gains usually only come into play on investment properties, second homes, or gains
            above those limits.
          </p>
          <p>
            One Michigan-specific break: if you&rsquo;re selling for <strong>less than you paid</strong> and your
            State Equalized Value dropped, you may be able to <strong>refund the state portion of the transfer
            tax</strong> (0.75%) &mdash; ask your title company.
          </p>
          <p style={{ fontSize: 13, color: "var(--s-muted)" }}>
            This is general information, not tax advice &mdash; confirm your situation with a CPA.
          </p>
        </>
      ),
    },
    {
      heading: "How to sell for more (and net more)",
      body: (
        <>
          <p>
            The costs above are largely fixed &mdash; the lever that actually moves your net proceeds is{" "}
            <strong>price and negotiation</strong>. That&rsquo;s where the right listing strategy pays for itself:
            accurate pricing, strong marketing that reaches the widest buyer pool, and skilled negotiation
            typically recover far more than the commission costs.
          </p>
          <p>
            <strong>Real Estate Market Center</strong> prices your home to the real market, markets it to maximize
            your buyer pool, and negotiates to protect your bottom line &mdash; so you keep more at closing. Not sure
            where to start? Get a{" "}
            <a href="/home-value" style={{ color: "var(--s-gold-ink)", fontWeight: 600 }}>free home valuation</a>{" "}
            and we&rsquo;ll walk you through your estimated costs and net proceeds, honestly.
          </p>
        </>
      ),
    },
  ],
  faqHeading: "Cost of selling a house in Michigan — common questions",
  faqs: [
    {
      question: "How much does it cost to sell a house in Michigan?",
      answer:
        "Excluding commission, Michigan sellers typically pay about 4% of the sale price in costs — transfer tax (0.86%), the owner's title insurance policy (~0.4%), prorated property taxes, and smaller fees. Adding a negotiable real estate commission, the all-in cost of selling usually runs 6–9% of the price. On a $400,000 sale that's roughly $24,000–$36,000.",
    },
    {
      question: "What is the transfer tax when selling a house in Michigan?",
      answer:
        "Michigan's real estate transfer tax is 0.86% of the sale price — $7.50 per $1,000 to the state (0.75%) plus $1.10 per $1,000 to the county (0.11%), for $8.60 per $1,000 combined. It's customarily paid by the seller. On a $400,000 home that's about $3,440.",
    },
    {
      question: "Do I pay capital gains tax when I sell my house in Michigan?",
      answer:
        "Usually not on a primary residence. If you owned and lived in the home for at least two of the last five years, the federal exclusion lets you exclude up to $250,000 of gain ($500,000 if married filing jointly), and Michigan generally follows the federal treatment. Capital gains typically only apply to investment properties, second homes, or gains above those limits. Confirm with a CPA.",
    },
    {
      question: "Who pays closing costs when selling a house in Michigan?",
      answer:
        "The seller customarily pays the transfer tax, the owner's title insurance policy, prorated property taxes, and the real estate commission they agree to. The buyer customarily pays their lender fees, appraisal, inspection, the lender's title policy, and prepaid escrows. Many of these are negotiable in the purchase agreement.",
    },
    {
      question: "Can I get a refund on Michigan transfer tax?",
      answer:
        "Possibly. If you sell your home for less than you originally paid and the State Equalized Value has declined since you bought, Michigan allows a refund of the state portion of the transfer tax (0.75%). Ask your title company or closing agent to check your eligibility before closing.",
    },
  ],
  related: [
    { href: "/home-sale-proceeds-calculator", label: "Net proceeds calculator (sellers)" },
    { href: "/michigan-closing-costs", label: "Michigan closing costs, explained" },
    { href: "/who-pays-realtor-commission-michigan", label: "Who pays the realtor commission?" },
    { href: "/sell-your-home-metro-detroit", label: "Sell your home for more" },
    { href: "/michigan-seller-disclosure-requirements", label: "Michigan seller disclosure" },
  ],
  ctaHeading: "Know your real net proceeds before you list",
  ctaBody: (
    <>
      We&rsquo;ll give you a free home valuation and a clear, honest breakdown of your selling costs and
      estimated take-home &mdash; no pressure, no surprises at the closing table.
    </>
  ),
  ctaPrimary: { href: "/home-value", label: "Get your home's value" },
  metaTitle: "Cost of Selling a House in Michigan (2026): Fees, Transfer Tax & Taxes",
  metaDescription:
    "What it really costs to sell a house in Michigan: seller closing costs (~4% ex-commission), the 0.86% transfer tax, title insurance, a negotiable commission, and whether you owe capital gains tax (most sellers don't).",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
