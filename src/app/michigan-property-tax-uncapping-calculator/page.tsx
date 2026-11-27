import type { Metadata } from "next";
import CalcPage, { calcMetadata } from "@/components/site/CalcPage";
import Calculator from "./Calculator";

const SLUG = "michigan-property-tax-uncapping-calculator";

export const metadata: Metadata = calcMetadata({
  slug: SLUG,
  title: "Michigan Property Tax Uncapping Calculator (2026): Your Real Taxes After You Buy",
  description:
    "Free Michigan uncapping calculator. See what your property taxes become the year after you buy, how much more than the seller you'll pay, and the primary vs. second-home difference. Uses official 2026 Treasury and city millage figures.",
});

const link = { color: "var(--s-gold-ink)", fontWeight: 600 } as const;

export default function Page() {
  return (
    <CalcPage
      slug={SLUG}
      crumbLabel="Property Tax Uncapping Calculator"
      eyebrow="Buyer tool · Michigan property taxes"
      h1={
        <>
          What will your taxes be <span style={{ color: "var(--s-gold)" }}>after you buy?</span>
        </>
      }
      h1Text="Michigan Property Tax Uncapping Calculator (2026)"
      sub="In Michigan, the seller's tax bill is not your tax bill. The year after a sale, the home's taxable value uncaps to half its market value, and on a luxury purchase that can add thousands a year. Enter the price to see your real number before you write an offer."
      bullets={["Official 2026 inflation cap (2.7%)", "Primary vs. second-home millage", "Instant, no email required"]}
      appDescription="A free calculator that estimates a Michigan home buyer's property taxes after uncapping, using the State Equalized Value (50% of market value), local millage, and the Principal Residence Exemption."
      sections={[
        {
          heading: "How uncapping works, in one minute",
          body: (
            <>
              <p>
                Michigan taxes a home on its <strong>Taxable Value</strong>, not its price. While someone owns a home,
                Proposal A (1994) limits how fast that Taxable Value can rise each year to the{" "}
                <strong>lesser of 5% or inflation</strong>. For 2026 the state set that cap at{" "}
                <strong>2.7%</strong>{" "}(an inflation rate multiplier of 1.027, Michigan Treasury Bulletin 14 of 2025).
              </p>
              <p>
                Home values usually rise faster than the cap, so the longer someone owns, the further their Taxable
                Value falls below the home&rsquo;s <strong>State Equalized Value (SEV)</strong>, which is set at{" "}
                <strong>50% of market value</strong>. When the home sells, that protection ends. In the year after
                the transfer, the Taxable Value <strong>uncaps and resets to the full SEV</strong>{" "}(MCL 211.27a).
                The buyer starts over from the top.
              </p>
              <p>
                The formula is simple: <strong>SEV × total millage ÷ 1,000</strong>. One mill is $1 of tax for every
                $1,000 of Taxable Value. That is exactly what the calculator above runs.
              </p>
            </>
          ),
        },
        {
          heading: "A $1.25 million example in Bloomfield Hills",
          body: (
            <>
              <p>
                Take a <strong>$1,250,000</strong>{" "}purchase in the City of Bloomfield Hills. The SEV is about{" "}
                <strong>$625,000</strong>. The city&rsquo;s official 2025 rate sheet totals{" "}
                <strong>35.9981 mills</strong>{" "}for a primary residence (with the Principal Residence Exemption) and{" "}
                <strong>49.3775 mills</strong>{" "}for a non-homestead property.
              </p>
              <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8 }}>
                <li>
                  <strong>As your primary home:</strong>{" "}about <strong>$22,499 a year</strong>{" "}(roughly $1,875 a
                  month), an effective rate near 1.8% of the price.
                </li>
                <li>
                  <strong>As a second home or rental:</strong>{" "}about <strong>$30,861 a year</strong>. Losing the
                  exemption costs roughly <strong>$8,362 more every year</strong>.
                </li>
                <li>
                  <strong>Five years in,</strong>{" "}if the cap stayed at 2026&rsquo;s 2.7%, the primary-home bill would
                  be near <strong>$25,029</strong>.
                </li>
              </ul>
              <p>
                Now the uncapping gap. <em>Hypothetically</em>, if the seller had owned long enough that their Taxable
                Value sat at $400,000, they would be paying about $14,399 at the same millage. Your first uncapped
                bill would be roughly <strong>$8,100 a year higher</strong>{" "}than theirs, on the same house. That is
                why you never budget from the seller&rsquo;s bill.
              </p>
              <p style={{ fontSize: 13, color: "var(--s-muted)" }}>
                Figures use the price as a stand-in for the assessor&rsquo;s true cash value and the 2025 Bloomfield Hills
                millage; your parcel&rsquo;s numbers will differ.
              </p>
            </>
          ),
        },
        {
          heading: "Why uncapping hits luxury buyers hardest",
          body: (
            <>
              <p>
                The mechanics are the same at every price, but the dollars are not. Three things make it bigger at
                the top of the market:
              </p>
              <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8 }}>
                <li>
                  <strong>Bigger base, bigger gap.</strong>{" "}At about 36 mills, every $100,000 of price adds roughly
                  $1,800 a year in tax once uncapped. On a $2 million home in the same city, the primary-home estimate
                  is about $35,998 a year.
                </li>
                <li>
                  <strong>Long-held estates carry the deepest caps.</strong>{" "}Legacy homes in Bloomfield Hills,
                  Birmingham, and the lake communities often change hands after decades of ownership, so the
                  difference between the seller&rsquo;s capped value and the new SEV can be very large.
                </li>
                <li>
                  <strong>Second homes lose the exemption.</strong>{" "}A lake house or a pied-à-terre condo that
                  isn&rsquo;t your primary residence pays the non-homestead rate, up to 18 mills more.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: "Millage varies more than people expect",
          body: (
            <>
              <p>
                Your total depends on the city <em>and</em>{" "}the school district, and many Oakland County communities
                are split across several districts. Two official examples:
              </p>
              <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8 }}>
                <li>
                  <strong>City of Bloomfield Hills (2025, full year):</strong>{" "}35.9981 mills primary residence, 49.3775
                  non-homestead.
                </li>
                <li>
                  <strong>City of Troy (2026, summer bill only):</strong>{" "}29.1308 mills primary residence in the Troy
                  School District, versus 30.3490 in the Birmingham district and 33.7791 in Warren Consolidated. The
                  winter bill adds more on top.
                </li>
              </ul>
              <p>
                Because of that, the calculator lets you type any millage. For the exact rate, use the parcel&rsquo;s
                city or township tax-rate sheet, or ask us to pull it. Our{" "}
                <a href="/michigan-property-taxes-explained" style={link}>Michigan property taxes guide</a>{" "}covers how
                summer and winter bills are split.
              </p>
            </>
          ),
        },
        {
          heading: "Timing, paperwork, and the exemptions that matter",
          body: (
            <>
              <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8 }}>
                <li>
                  <strong>When it hits:</strong>{" "}buy in 2026 and the uncapped value goes on the 2027 assessment roll,
                  so the jump shows up on your 2027 tax bills. Your first months are usually prorated at the
                  seller&rsquo;s capped rate.
                </li>
                <li>
                  <strong>File the Principal Residence Exemption</strong>{" "}(Form 2368) with your local assessor. File
                  by June 1 for that year&rsquo;s summer bill or by November 1 for the winter bill. It does not always
                  carry over automatically.
                </li>
                <li>
                  <strong>File the Property Transfer Affidavit</strong>{" "}(Form 2766) after closing. It tells the assessor
                  the home changed hands, and late filing carries penalties.
                </li>
                <li>
                  <strong>Some transfers don&rsquo;t uncap,</strong>{" "}including transfers between spouses and certain
                  transfers to a trust or to close family. If you are buying through an LLC or trust, confirm the
                  treatment with the assessor or your attorney.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: "Use the number when you negotiate",
          body: (
            <>
              <p>
                The uncapped tax belongs in your monthly budget alongside the mortgage. On a $1.25 million home, the
                difference between budgeting from the seller&rsquo;s bill and the real uncapped bill can change your
                comfortable price range. Run it in our{" "}
                <a href="/home-affordability-calculator" style={link}>affordability calculator</a>{" "}with the uncapped
                figure, then browse{" "}
                <a href="/homes?location=Bloomfield%20Hills" style={link}>Bloomfield Hills homes for sale</a>{" "}or our{" "}
                <a href="/luxury-homes-in-bloomfield-hills" style={link}>Bloomfield Hills luxury guide</a>.
              </p>
              <p>
                Selling a long-held home instead? Your buyer&rsquo;s taxes will reset no matter what you paid, so
                pricing should reflect what the next owner will actually carry.{" "}
                <a href="/home-value" style={link}>Get a free broker valuation</a>.
              </p>
              <p style={{ fontSize: 12, color: "var(--s-muted)" }}>
                Sources: Michigan Department of Treasury, State Tax Commission Bulletin 14 of 2025 (2026 inflation rate
                multiplier 1.027); Michigan Constitution art. IX §3 and MCL 211.27a (SEV at 50%, uncapping on
                transfer); City of Bloomfield Hills 2025 Millage Rates; City of Troy 2026 summer millage rates.
                Figures are approximate and change yearly.
              </p>
            </>
          ),
        },
      ]}
      faqHeading="Property tax uncapping questions"
      faqs={[
        {
          question: "What does uncapping mean for Michigan property taxes?",
          answer:
            "Uncapping is the reset that happens after a Michigan home sells. While someone owns a home, Proposal A caps annual increases in its Taxable Value at the lesser of 5% or inflation (2.7% for 2026). In the year after a transfer of ownership, the Taxable Value uncaps and resets to the State Equalized Value, which is 50% of market value. The new owner's taxes are calculated from that higher base.",
        },
        {
          question: "How do I calculate my property taxes after buying a house in Michigan?",
          answer:
            "Take half the purchase price as an estimate of the State Equalized Value, multiply by the total local millage, and divide by 1,000. For example, a $1,250,000 home in the City of Bloomfield Hills at the 2025 primary-residence rate of 35.9981 mills comes to about $22,499 a year. The assessor sets the true cash value from market data, so the real figure can differ slightly.",
        },
        {
          question: "Why are my taxes so much higher than what the seller paid?",
          answer:
            "Because the seller's Taxable Value was capped for every year they owned the home, often rising more slowly than the market. When you buy, that cap disappears and the Taxable Value resets to the full SEV. The longer the seller owned, the bigger the jump tends to be. Always budget from the uncapped estimate, not the seller's bill.",
        },
        {
          question: "When does the uncapped tax take effect?",
          answer:
            "The year after the sale. If you buy in 2026, the uncapped Taxable Value is set on the 2027 assessment roll and shows up on your 2027 summer and winter tax bills. Taxes for the rest of the purchase year are typically prorated at closing based on the seller's capped bill.",
        },
        {
          question: "How much does the Principal Residence Exemption save?",
          answer:
            "The Principal Residence Exemption exempts a primary home from up to 18 mills of school operating tax. In the City of Bloomfield Hills, the 2025 total is 35.9981 mills with the exemption versus 49.3775 without it. On a $1,250,000 purchase, that is roughly $8,362 a year. File Form 2368 with your assessor by June 1 or November 1.",
        },
        {
          question: "Do second homes and lake houses uncap too?",
          answer:
            "Yes. Any transfer of ownership uncaps the Taxable Value, and a second home or rental also pays the higher non-homestead millage because it doesn't qualify for the Principal Residence Exemption. That combination makes lake houses and pied-à-terre condos some of the biggest tax surprises for luxury buyers.",
        },
      ]}
      ctaHeading="Know the real tax bill before you offer"
      ctaBody="Send us any Metro Detroit address and a local broker will pull the parcel's assessment and exact millage, then show you the uncapped tax alongside the comps. Free, and no obligation."
      ctaPrimary={{ href: "/homes", label: "Browse homes for sale" }}
    >
      <Calculator />
    </CalcPage>
  );
}
