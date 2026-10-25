import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const data: GuidePageData = {
  slug: "michigan-seller-disclosure-requirements",
  crumbLabel: "Seller Disclosure Requirements",
  eyebrow: "Seller guide · Michigan",
  h1: (
    <>
      Michigan <span style={{ color: "var(--s-gold)" }}>seller disclosure</span> requirements
    </>
  ),
  h1Text: "Michigan Seller Disclosure Requirements: What You Must Disclose (2026)",
  sub: (
    <>
      Michigan law requires most home sellers to hand the buyer a completed Seller&rsquo;s Disclosure
      Statement before the deal is signed. Here&rsquo;s what you have to disclose, what you don&rsquo;t, who&rsquo;s
      exempt, and what happens if you get it wrong.
    </>
  ),
  bullets: [
    "Required for homes with 1–4 dwelling units",
    "Deliver it before the purchase agreement is signed",
    "Disclose what you know — honestly, in good faith",
  ],
  publishedISO: "2026-10-23",
  publishedLabel: "October 23, 2026",
  sections: [
    {
      heading: "The short answer",
      body: (
        <>
          <p>
            Under Michigan&rsquo;s <strong>Seller Disclosure Act</strong> (Act 92 of 1993), a seller of
            residential property with <strong>one to four dwelling units</strong> must give the buyer a
            completed <strong>Seller&rsquo;s Disclosure Statement</strong> &mdash; a standard form listing the
            known condition of the home. You deliver it <strong>before the purchase agreement is
            signed</strong> (the purchase agreement can allow for delivery shortly after acceptance, but
            earlier is always safer).
          </p>
          <p>
            The key standard is <strong>good faith</strong>: you disclose what you actually know, to the
            best of your knowledge. It is not a warranty or a guarantee of condition &mdash; but you cannot
            knowingly hide or misrepresent a defect.
          </p>
        </>
      ),
    },
    {
      heading: "What you have to disclose",
      body: (
        <>
          <p>The disclosure form walks through the home&rsquo;s known condition, including:</p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li>
              <strong>Systems &amp; appliances:</strong> heating/cooling, plumbing, electrical, water
              heater, sump pump, included appliances, and whether they&rsquo;re in working order.
            </li>
            <li>
              <strong>Structure:</strong> roof, foundation, basement, walls, windows, insulation &mdash; and
              any known leaks, settling, or water intrusion.
            </li>
            <li>
              <strong>Environmental:</strong> known presence of asbestos, radon, lead, underground
              storage tanks, contaminated soil, or methamphetamine production.
            </li>
            <li>
              <strong>Legal &amp; boundary items:</strong> easements, encroachments, shared features
              (fences, driveways, walls), zoning issues, unpermitted modifications, HOA obligations,
              outstanding assessments, and any pending litigation affecting the property.
            </li>
            <li>
              <strong>Surroundings &amp; rights:</strong> proximity to farms, landfills, airports, or
              shooting ranges; whether you carry flood insurance; and whether you own the mineral rights.
            </li>
          </ul>
          <p style={{ fontSize: 13, color: "var(--s-muted)" }}>
            Separately, federal law requires a <strong>lead-based paint disclosure</strong> for any home
            built before 1978 &mdash; that&rsquo;s on top of the state form.
          </p>
        </>
      ),
    },
    {
      heading: "Who's exempt",
      body: (
        <>
          <p>
            Some transfers don&rsquo;t require the disclosure statement because the seller isn&rsquo;t a typical
            owner-occupant. Common exemptions include:
          </p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li>Transfers by court order, or foreclosure / deed in lieu of foreclosure.</li>
            <li>
              Transfers by a fiduciary administering an estate, trust, guardianship, or conservatorship.
            </li>
            <li>Transfers between co-owners, or between spouses (including in a divorce).</li>
            <li>Transfers to or from any government entity.</li>
          </ul>
          <p style={{ fontSize: 13, color: "var(--s-muted)" }}>
            Even when you&rsquo;re exempt from the <em>form</em>, you still can&rsquo;t commit fraud &mdash; knowingly
            lying about or concealing a serious defect can create liability regardless.
          </p>
        </>
      ),
    },
    {
      heading: "What if you don't know — or get it wrong?",
      body: (
        <>
          <p>
            If you genuinely don&rsquo;t know the answer to something, you say so &mdash; &ldquo;unknown&rdquo; is a
            valid answer, and the law only asks for your <strong>good-faith</strong> knowledge, not a
            professional inspection. The danger isn&rsquo;t imperfection; it&rsquo;s{" "}
            <strong>knowingly concealing or misstating</strong> a defect you were aware of, which can
            expose you to a claim after closing.
          </p>
          <p>
            Selling a home &ldquo;as-is&rdquo; does <em>not</em> remove the disclosure duty either &mdash; as-is
            addresses who pays for repairs, not whether you have to be honest about known problems. When
            in doubt, disclose it and let the buyer decide; it protects you. Thinking about selling? See{" "}
            <a href="/sell-your-home-metro-detroit">how to sell your home for more</a> and your{" "}
            <a href="/michigan-closing-costs">Michigan closing costs</a>.
          </p>
          <p style={{ fontSize: 13, color: "var(--s-muted)" }}>
            This is general information, not legal advice. For a specific situation, talk to a Michigan
            real estate attorney.
          </p>
        </>
      ),
    },
  ],
  faqHeading: "Michigan seller disclosure — common questions",
  faqs: [
    {
      question: "Is a seller's disclosure statement required in Michigan?",
      answer:
        "Yes. Under Michigan's Seller Disclosure Act (Act 92 of 1993), sellers of residential property with one to four dwelling units must give the buyer a completed Seller's Disclosure Statement before the purchase agreement is signed. Certain transfers — such as foreclosures, estate/fiduciary sales, and transfers between spouses or co-owners — are exempt.",
    },
    {
      question: "What do I have to disclose when selling a house in Michigan?",
      answer:
        "You disclose the known condition of the home: heating, plumbing, electrical, and appliances; roof, foundation, and basement; environmental items like asbestos, radon, lead, and underground tanks; and legal items like easements, encroachments, zoning issues, HOA obligations, and known defects. Homes built before 1978 also require a federal lead-based paint disclosure.",
    },
    {
      question: "What if I don't know the answer to a disclosure question?",
      answer:
        "You can answer 'unknown.' The law asks for your good-faith knowledge, not a professional inspection. You're not required to go discover hidden problems — but you cannot knowingly conceal or misrepresent a defect you're aware of.",
    },
    {
      question: "Does selling a home 'as-is' remove the disclosure requirement in Michigan?",
      answer:
        "No. Selling 'as-is' affects who pays for repairs, not whether you must be honest. You still must provide the Seller's Disclosure Statement (unless exempt) and cannot knowingly hide a known defect.",
    },
  ],
  related: [
    { href: "/sell-your-home-metro-detroit", label: "Sell your home for more" },
    { href: "/water-damage-sell-or-restore", label: "Damage to disclose? Restore or sell as-is" },
    { href: "/michigan-closing-costs", label: "Michigan closing costs, explained" },
    { href: "/home-sale-proceeds-calculator", label: "Net proceeds calculator (sellers)" },
    { href: "/how-to-buy-a-home-in-michigan", label: "How to buy a home in Michigan" },
  ],
  ctaHeading: "Selling soon? Get it right from the start.",
  ctaBody: (
    <>
      We&rsquo;ll help you complete your disclosure accurately and price your home to sell &mdash; honestly, with
      no surprises at the closing table.
    </>
  ),
  ctaPrimary: { href: "/home-value", label: "Get your home's value" },
  metaTitle: "Michigan Seller Disclosure Requirements (2026): What to Disclose",
  metaDescription:
    "Michigan seller disclosure requirements explained: the Seller Disclosure Act requires a completed Seller's Disclosure Statement for 1–4 unit homes before signing. What you must disclose, who's exempt, as-is rules, and penalties for concealing defects.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
