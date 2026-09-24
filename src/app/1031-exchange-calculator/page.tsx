import type { Metadata } from "next";
import CalcPage, { calcMetadata } from "@/components/site/CalcPage";
import Calculator from "./Calculator";

const SLUG = "1031-exchange-calculator";

export const metadata: Metadata = calcMetadata({
  slug: SLUG,
  title: "1031 Exchange Calculator & Deadline Tracker (Michigan)",
  description:
    "Free 1031 exchange calculator for Michigan investors. Estimate the capital gains and depreciation-recapture tax you can defer, the minimum replacement value to fully defer, and your 45-day and 180-day deadlines.",
});

export default function Page() {
  return (
    <CalcPage
      slug={SLUG}
      crumbLabel="1031 Exchange Calculator"
      eyebrow="Investor tool · Michigan"
      h1={
        <>
          How much tax can a <span style={{ color: "var(--s-gold)" }}>1031 exchange</span> defer?
        </>
      }
      h1Text="1031 Exchange Calculator & Deadline Tracker (Michigan)"
      sub="Selling an investment property? See the capital gains and depreciation-recapture tax you can defer by exchanging instead of cashing out — plus the minimum replacement value and your unforgiving 45- and 180-day deadlines."
      bullets={["Deferred tax estimate", "45/180-day deadline tracker", "Instant — no email required"]}
      appDescription="A free 1031 exchange calculator that estimates deferred capital gains and depreciation-recapture tax, the minimum replacement property value for full deferral, and the 45-day and 180-day IRS deadlines."
      sections={[
        {
          heading: "What a 1031 exchange actually does",
          body: (
            <>
              <p>
                A 1031 exchange (named for Section 1031 of the tax code) lets you sell an investment property and roll the
                proceeds into another &ldquo;like-kind&rdquo; investment property while <strong>deferring the tax</strong> you&rsquo;d
                otherwise owe. That&rsquo;s two taxes deferred: the <strong>capital gains tax</strong> on your appreciation and
                the <strong>depreciation recapture</strong> (taxed up to 25% federally) on the depreciation you claimed over
                the years. Keeping that money invested — instead of sending it to the IRS — is how investors compound into
                larger properties over time.
              </p>
              <p>
                To defer <em>all</em> of the tax, two rules apply: you must buy a replacement property of <strong>equal or
                greater value</strong> than your net sale price, and you must <strong>reinvest all of your net equity</strong>.
                Buy cheaper or pull cash out, and that portion (&ldquo;boot&rdquo;) becomes taxable. The calculator shows both
                targets.
              </p>
            </>
          ),
        },
        {
          heading: "The two deadlines that make or break the exchange",
          body: (
            <>
              <p>
                The 1031 timeline is strict and has <strong>no extensions</strong> — miss a deadline and the whole exchange
                fails, making the full gain taxable. From the day your sale closes:
              </p>
              <p>
                <strong>Day 45 — Identification.</strong> You must formally identify your replacement property (or
                properties) in writing. That&rsquo;s just 45 calendar days to find and name your target — which is why serious
                investors line up candidates <em>before</em> they close the sale.
              </p>
              <p>
                <strong>Day 180 — Closing.</strong> You must close on the replacement property within 180 calendar days of
                the sale. You also can&rsquo;t touch the proceeds in between — a <strong>Qualified Intermediary</strong> must
                hold them. Enter your closing date above and the tracker counts down both deadlines for you.
              </p>
            </>
          ),
        },
      ]}
      faqHeading="1031 exchange questions"
      faqs={[
        {
          question: "How much tax can I defer with a 1031 exchange?",
          answer:
            "You can defer both your capital gains tax and depreciation recapture (up to 25% federally) on the sale of an investment property. On a property with significant appreciation and years of depreciation, that can easily be tens of thousands of dollars kept working for you instead of paid in tax. Enter your numbers above for an estimate specific to your sale.",
        },
        {
          question: "What are the 45-day and 180-day rules?",
          answer:
            "After your sale closes, you have 45 calendar days to identify (in writing) the replacement property you intend to buy, and 180 calendar days to close on it. Both run from the same sale date, both are calendar days, and neither can be extended. Missing either one disqualifies the exchange and makes your gain taxable. The tracker above shows your exact dates.",
        },
        {
          question: "What does 'like-kind' property mean?",
          answer:
            "For real estate, 'like-kind' is broad: almost any investment or business real property can be exchanged for almost any other. You can swap a rental house for an apartment building, raw land for a commercial property, and so on — as long as both the sold and purchased properties are held for investment or business use (not your personal residence).",
        },
        {
          question: "Do I need a Qualified Intermediary?",
          answer:
            "Yes. You cannot take possession of the sale proceeds during the exchange — a Qualified Intermediary (QI) must hold the funds and handle the paperwork, or the exchange is invalid. You arrange the QI before your sale closes. We coordinate with your QI and CPA and source replacement properties so the moving parts line up within your deadlines.",
        },
        {
          question: "Can you help me find replacement properties in time?",
          answer:
            "That's exactly where a local brokerage earns its keep on a 1031. Because the 45-day identification window is so tight, we start sourcing qualifying Metro Detroit replacement properties as early as possible — ideally before your sale closes — and coordinate with your intermediary so you don't lose the deferral. Send us your details above to get started.",
        },
      ]}
      ctaHeading="Don't lose the deferral to the clock"
      ctaBody="The 45-day identification window is the hardest part of any 1031. We line up qualifying Metro Detroit replacement properties early and coordinate with your intermediary so your exchange closes clean."
      ctaPrimary={{ href: "/contact", label: "Start my 1031 exchange" }}
    >
      <Calculator />
    </CalcPage>
  );
}
