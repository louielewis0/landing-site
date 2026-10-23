import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const data: GuidePageData = {
  slug: "home-inspection-vs-appraisal",
  crumbLabel: "Inspection vs. Appraisal",
  eyebrow: "Buyer guide · Michigan",
  h1: (
    <>
      Home <span style={{ color: "var(--s-gold)" }}>inspection vs. appraisal</span>: what&rsquo;s the
      difference?
    </>
  ),
  h1Text: "Home Inspection vs. Appraisal: Difference, Who Pays, and Do You Need Both?",
  sub: (
    <>
      They sound similar and happen around the same time, but they do completely different jobs. The
      inspection protects <em>you</em>. The appraisal protects your <em>lender</em>. Here&rsquo;s how each
      works and whether you need both.
    </>
  ),
  bullets: [
    "Inspection = the home's condition (protects the buyer)",
    "Appraisal = the home's value (protects the lender)",
    "Financing a home? The appraisal is required; the inspection is optional but smart",
  ],
  publishedISO: "2026-10-23",
  publishedLabel: "October 23, 2026",
  sections: [
    {
      heading: "The short answer",
      body: (
        <>
          <p>
            A <strong>home inspection</strong> tells you <em>what shape the house is in</em> &mdash; the roof,
            furnace, wiring, plumbing, foundation, and safety issues. You hire the inspector, and it&rsquo;s
            there to protect <strong>you, the buyer</strong>.
          </p>
          <p>
            A <strong>home appraisal</strong> tells your lender <em>what the house is worth</em> &mdash; an
            independent opinion of value so the bank doesn&rsquo;t lend more than the home is worth. The
            lender orders it, and it protects <strong>the lender</strong> (and, indirectly, you from
            overpaying).
          </p>
          <p>
            Same month, totally different purpose: one is about <strong>condition</strong>, the other is
            about <strong>value</strong>.
          </p>
        </>
      ),
    },
    {
      heading: "Side by side",
      body: (
        <>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li>
              <strong>Purpose &mdash;</strong> Inspection: the home&rsquo;s condition &amp; safety. Appraisal: the
              home&rsquo;s market value.
            </li>
            <li>
              <strong>Who orders it &mdash;</strong> Inspection: you, the buyer. Appraisal: your lender.
            </li>
            <li>
              <strong>Who pays &mdash;</strong> Both are customarily paid by the buyer. Inspection ~$300&ndash;$500;
              appraisal ~$300&ndash;$600.
            </li>
            <li>
              <strong>Required? &mdash;</strong> Inspection: optional (but strongly recommended). Appraisal:
              required by the lender whenever you&rsquo;re financing.
            </li>
            <li>
              <strong>What it looks at &mdash;</strong> Inspection: a hands-on review of systems, structure,
              and safety. Appraisal: condition plus comparable recent sales to form a value.
            </li>
            <li>
              <strong>What a bad result means &mdash;</strong> Inspection: leverage to negotiate repairs,
              credits, or walk away. Appraisal below the price: the deal has to be renegotiated or the
              gap covered.
            </li>
          </ul>
        </>
      ),
    },
    {
      heading: "Do you need both?",
      body: (
        <>
          <p>
            <strong>If you&rsquo;re financing:</strong> your lender will <em>require</em> the appraisal, and we
            strongly recommend you also get the inspection. Skipping the inspection to win a bidding war
            is a gamble &mdash; the appraisal won&rsquo;t catch a cracked heat exchanger or an aging roof.
          </p>
          <p>
            <strong>If you&rsquo;re paying cash:</strong> neither is technically required, but a good
            inspection is still money well spent. You can always order an appraisal yourself if you want
            an independent read on value. Run your numbers first with the{" "}
            <a href="/home-affordability-calculator">affordability calculator</a>.
          </p>
        </>
      ),
    },
    {
      heading: "What happens if the appraisal comes in low?",
      body: (
        <>
          <p>
            If the appraisal lands below your offer price, you have options: ask the seller to lower the
            price to the appraised value, meet in the middle, <strong>bring extra cash</strong> to cover
            the gap (if your contract has an appraisal gap clause), or &mdash; if your offer had an appraisal
            contingency &mdash; walk away and keep your earnest money. A low inspection result works
            differently: it&rsquo;s your cue to <strong>negotiate repairs or a credit</strong> before you
            commit.
          </p>
          <p>
            New to all of this? Start with{" "}
            <a href="/how-to-buy-a-home-in-michigan">how to buy a home in Michigan</a>, and see your{" "}
            <a href="/michigan-closing-costs">Michigan closing costs</a> so both fees are no surprise.
          </p>
        </>
      ),
    },
  ],
  faqHeading: "Inspection vs. appraisal — common questions",
  faqs: [
    {
      question: "What's the difference between a home inspection and an appraisal?",
      answer:
        "An inspection evaluates the home's physical condition and safety to protect the buyer, and the buyer hires the inspector. An appraisal is an independent opinion of the home's market value, ordered by the lender to make sure it isn't lending more than the home is worth. One is about condition; the other is about value.",
    },
    {
      question: "Do I need both an inspection and an appraisal?",
      answer:
        "If you're financing the purchase, the lender requires an appraisal and we strongly recommend also getting an inspection. If you're paying cash, neither is required, but an inspection is still a smart, low-cost way to avoid expensive surprises.",
    },
    {
      question: "Who pays for the inspection and the appraisal?",
      answer:
        "Both are customarily paid by the buyer. A home inspection typically runs about $300–$500, and an appraisal about $300–$600, depending on the property.",
    },
    {
      question: "What happens if the appraisal comes in lower than my offer?",
      answer:
        "You can ask the seller to lower the price, negotiate to split the difference, bring extra cash to cover the gap, or — if you had an appraisal contingency — walk away and keep your earnest money. The exact options depend on the contingencies written into your offer.",
    },
  ],
  related: [
    { href: "/how-to-buy-a-home-in-michigan", label: "How to buy a home in Michigan" },
    { href: "/michigan-closing-costs", label: "Michigan closing costs, explained" },
    { href: "/home-affordability-calculator", label: "Affordability calculator (buyers)" },
    { href: "/who-pays-realtor-commission-michigan", label: "Who pays realtor commission in Michigan?" },
  ],
  ctaHeading: "Buying soon? Have an expert in your corner.",
  ctaBody: (
    <>
      We&rsquo;ll help you read the inspection, handle a low appraisal, and negotiate hard on your behalf &mdash;
      so you buy with confidence.
    </>
  ),
  ctaPrimary: { href: "/contact", label: "Talk to a local expert" },
  metaTitle: "Home Inspection vs. Appraisal: Difference, Cost & Do You Need Both?",
  metaDescription:
    "Home inspection vs. appraisal explained: the inspection checks the home's condition and protects the buyer; the appraisal confirms value and protects the lender. Who orders each, who pays, whether you need both, and what to do if the appraisal comes in low.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
