import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const data: GuidePageData = {
  slug: "michigan-property-taxes-explained",
  crumbLabel: "Michigan Property Taxes",
  eyebrow: "Tax guide · Michigan",
  h1: (
    <>
      Michigan <span style={{ color: "var(--s-gold)" }}>property taxes</span>, explained
    </>
  ),
  h1Text: "Michigan Property Taxes Explained: SEV, Uncapping, PRE & Rates (2026)",
  sub: (
    <>
      Michigan property taxes work differently than most states &mdash; and the difference can cost a
      new buyer thousands if they don&rsquo;t see it coming. Here&rsquo;s how they&rsquo;re calculated, why your
      bill &ldquo;uncaps&rdquo; when you buy, the homestead exemption that saves you money, and what you&rsquo;ll
      actually pay in Metro Detroit.
    </>
  ),
  bullets: [
    "Taxable Value — not market value — is what you're taxed on",
    "Your bill uncaps the year after you buy (budget for it)",
    "The homestead exemption (PRE) saves ~18 mills",
  ],
  publishedISO: "2026-10-11",
  publishedLabel: "October 11, 2026",
  sections: [
    {
      heading: "How Michigan property tax is calculated",
      body: (
        <>
          <p>Three values drive your bill:</p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li>
              <strong>True Cash Value (TCV):</strong> the assessor&rsquo;s estimate of your home&rsquo;s market
              value.
            </li>
            <li>
              <strong>State Equalized Value (SEV):</strong> by law, exactly <strong>50% of TCV</strong>.
            </li>
            <li>
              <strong>Taxable Value (TV):</strong> the number you&rsquo;re actually taxed on &mdash; the{" "}
              <em>lesser</em> of the current SEV or last year&rsquo;s TV increased by the inflation cap (see
              below). TV is usually below SEV.
            </li>
          </ul>
          <p>
            Your tax = <strong>Taxable Value &times; total millage &divide; 1,000</strong> (one &ldquo;mill&rdquo;
            is $1 of tax per $1,000 of Taxable Value). Example: a $100,000 Taxable Value at 40 mills =
            $4,000 per year. Michigan also levies a flat <strong>6-mill State Education Tax</strong>{" "}
            statewide.
          </p>
        </>
      ),
    },
    {
      heading: "Proposal A: the cap that protects owners",
      body: (
        <>
          <p>
            Under <strong>Proposal A (1994)</strong>, as long as you own the home, your Taxable Value
            can rise each year by only the <strong>lesser of 5% or the rate of inflation</strong>. The
            state publishes the &ldquo;Inflation Rate Multiplier&rdquo; annually:
          </p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8 }}>
            <li><strong>2026:</strong> 2.7%</li>
            <li><strong>2025:</strong> 3.1%</li>
            <li><strong>2024:</strong> 5.0% (the cap &mdash; actual inflation was higher)</li>
          </ul>
          <p>
            This is why a long-time owner&rsquo;s taxable value can drift well below their home&rsquo;s actual
            market value &mdash; and why the next part matters so much.
          </p>
        </>
      ),
    },
    {
      heading: "Uncapping: the surprise that hits new buyers",
      body: (
        <>
          <p>
            Here&rsquo;s the big one. The year <em>after</em> a home sells, its Taxable Value{" "}
            <strong>&ldquo;uncaps&rdquo; and resets to the full SEV</strong> (50% of market value). The seller
            may have enjoyed years of capped increases &mdash; but as the new owner,{" "}
            <strong>you lose that protection</strong>, and your first full-year tax bill can be{" "}
            <strong>meaningfully higher than what the seller was paying</strong>.
          </p>
          <p>
            <strong>Never budget off the seller&rsquo;s current tax bill.</strong> Estimate your taxes using
            the SEV (roughly half the price you&rsquo;re paying) times the local millage. A good agent and
            lender will help you project the uncapped number before you buy. Certain transfers &mdash;
            between spouses and some close relatives, or into some trusts &mdash; can be exempt from
            uncapping; confirm your specific situation with the local assessor.
          </p>
        </>
      ),
    },
    {
      heading: "The Principal Residence Exemption (PRE) saves you money",
      body: (
        <>
          <p>
            If you own and occupy the home as your <strong>primary residence</strong>, the{" "}
            <strong>Principal Residence Exemption (PRE, or &ldquo;homestead&rdquo;)</strong> exempts you from
            up to <strong>18 mills of local school operating tax</strong> &mdash; a significant annual
            saving versus a non-homestead (rental or second-home) parcel.
          </p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8 }}>
            <li>File <strong>Form 2368</strong> with your local assessor/township.</li>
            <li>File by <strong>June 1</strong> to take effect for that year&rsquo;s summer bill, or by <strong>November 1</strong> for the winter bill.</li>
            <li>When a home stops being your principal residence, file a rescission (Form 2602).</li>
          </ul>
          <p style={{ fontSize: 13, color: "var(--s-muted)" }}>
            When buying, make sure the PRE is filed &mdash; it doesn&rsquo;t always transfer automatically.
          </p>
        </>
      ),
    },
    {
      heading: "Summer vs. winter bills, and what you'll actually pay",
      body: (
        <>
          <p>
            Michigan bills property tax <strong>twice a year</strong>. The <strong>summer bill</strong>{" "}
            (mailed around July 1, commonly due July 31) is usually the larger one &mdash; it carries school
            operating tax and the state education tax. The <strong>winter bill</strong> (mailed around
            December 1, typically payable into mid-February) covers remaining county and local millage.
            The exact split varies by community, so check your local treasurer.
          </p>
          <p>
            <strong>What it actually costs:</strong> effective property-tax rates run roughly{" "}
            <strong>1.2%&ndash;1.3% of home value</strong> in Metro Detroit, varying widely by community and
            school district. Oakland County&rsquo;s effective rate is around <strong>1.23%</strong> (a median
            bill near $4,500), and Macomb County&rsquo;s around <strong>1.28%</strong> (median near $3,400).
            Total millage typically ranges from about 30 to 70 mills depending on the city, schools, and
            local debt &mdash; with homestead (PRE) parcels about 18 mills lower.
          </p>
          <p style={{ fontSize: 13, color: "var(--s-muted)" }}>
            Rates vary significantly by community &mdash; always check the specific city/township tax-rate
            sheet for an exact figure. Sources: Michigan Dept. of Treasury (inflation multipliers, PRE),
            and county/aggregator estimates for effective rates (approximate, 2026).
          </p>
        </>
      ),
    },
  ],
  faqHeading: "Michigan property taxes — common questions",
  faqs: [
    {
      question: "How are property taxes calculated in Michigan?",
      answer:
        "Michigan taxes your home's Taxable Value — not its market value. Taxable Value is the lesser of the State Equalized Value (50% of market value) or last year's Taxable Value increased by the inflation cap. Your tax equals Taxable Value times the total local millage divided by 1,000 (one mill is $1 per $1,000 of Taxable Value).",
    },
    {
      question: "Why did my property taxes go up so much after I bought my home?",
      answer:
        "Because of 'uncapping.' Under Proposal A, a home's Taxable Value increases are capped while you own it, but the year after a sale the Taxable Value resets to the full State Equalized Value (50% of market value). As the new owner you lose the prior owner's capped value, so your bill can be meaningfully higher than theirs. Always budget using the uncapped estimate.",
    },
    {
      question: "What is the Principal Residence Exemption in Michigan?",
      answer:
        "The Principal Residence Exemption (PRE, or homestead exemption) exempts an owner-occupied primary residence from up to 18 mills of local school operating tax, saving you money each year. File Form 2368 with your local assessor — by June 1 for that year's summer bill, or November 1 for the winter bill.",
    },
    {
      question: "How much are property taxes in Oakland County and Metro Detroit?",
      answer:
        "Effective property-tax rates run roughly 1.2%–1.3% of home value in Metro Detroit, varying widely by community. Oakland County's effective rate is around 1.23% (a median bill near $4,500) and Macomb County's around 1.28% (median near $3,400). Always check the specific community's tax-rate sheet, since millage differs by city and school district.",
    },
    {
      question: "When are Michigan property taxes due?",
      answer:
        "Michigan bills twice a year. The summer bill is mailed around July 1 (commonly due July 31) and the winter bill around December 1 (typically payable into mid-February). Exact due dates and which taxes fall in each bill vary by municipality.",
    },
  ],
  related: [
    { href: "/how-to-buy-a-home-in-michigan", label: "How to buy a home in Michigan" },
    { href: "/michigan-closing-costs", label: "Michigan closing costs explained" },
    { href: "/home-affordability-calculator", label: "Affordability calculator" },
    { href: "/home-sale-proceeds-calculator", label: "Net proceeds calculator" },
    { href: "/home-value", label: "What's my home worth?" },
  ],
  ctaHeading: "Questions about a home's taxes before you buy?",
  ctaBody: (
    <>
      We&rsquo;ll help you estimate the real, uncapped property taxes on any home &mdash; so there are no
      surprises after closing. Talk to a local expert.
    </>
  ),
  ctaPrimary: { href: "/contact", label: "Talk to a local expert" },
  metaTitle: "Michigan Property Taxes Explained (2026): SEV, Uncapping & PRE",
  metaDescription:
    "Michigan property taxes explained: how SEV and Taxable Value work, why your bill uncaps the year after you buy, the Principal Residence Exemption (18 mills), summer/winter bills, and Metro Detroit rates (~1.2–1.3%). From Real Estate Market Center.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
