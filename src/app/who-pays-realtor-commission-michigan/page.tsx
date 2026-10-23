import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const data: GuidePageData = {
  slug: "who-pays-realtor-commission-michigan",
  crumbLabel: "Who Pays Realtor Commission",
  eyebrow: "Commission guide · Michigan",
  h1: (
    <>
      Who pays the <span style={{ color: "var(--s-gold)" }}>realtor commission</span> in Michigan?
    </>
  ),
  h1Text: "Who Pays Realtor Commission in Michigan? (2026, After the NAR Settlement)",
  sub: (
    <>
      Since the August 2024 industry rule changes, no one is automatically on the hook for the
      buyer&rsquo;s agent &mdash; and commissions were never set by law. Here&rsquo;s how it actually works
      in Michigan now, for buyers and sellers, in plain English.
    </>
  ),
  bullets: [
    "Commissions are fully negotiable — never set by law",
    "Sellers aren't required to pay the buyer's agent anymore (but often still do)",
    "Buyers now sign a written agreement setting their agent's fee before touring homes",
  ],
  publishedISO: "2026-10-23",
  publishedLabel: "October 23, 2026",
  sections: [
    {
      heading: "The short answer",
      body: (
        <>
          <p>
            In Michigan, the real estate commission is <strong>whatever the parties agree to</strong> &mdash;
            it is negotiable and has never been fixed by law. What changed in <strong>August 2024</strong>,
            when the National Association of Realtors&rsquo; legal settlement took effect, is{" "}
            <em>how the buyer&rsquo;s agent gets paid</em>:
          </p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li>
              Offers of buyer-agent compensation are <strong>no longer posted on the MLS</strong>.
            </li>
            <li>
              A buyer now signs a <strong>written buyer-agency agreement</strong> that states their
              agent&rsquo;s fee <strong>before touring homes</strong> &mdash; and the amount must be specific,
              not open-ended.
            </li>
            <li>
              Sellers are <strong>no longer required</strong> to pay the buyer&rsquo;s agent &mdash; though many
              still choose to, because it attracts more buyers.
            </li>
          </ul>
        </>
      ),
    },
    {
      heading: "How the buyer's agent actually gets paid now (three ways)",
      body: (
        <>
          <p>In practice, buyer-agent compensation flows one of three ways in a Michigan deal:</p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li>
              <strong>The seller offers to pay it (still the most common).</strong> A seller can offer
              buyer-agent compensation to widen their buyer pool &mdash; it just isn&rsquo;t advertised on
              the MLS anymore, so it&rsquo;s negotiated deal-by-deal.
            </li>
            <li>
              <strong>It&rsquo;s written in as a seller concession.</strong> The buyer asks the seller to
              credit their agent&rsquo;s fee as part of the offer, the same way concessions cover closing
              costs.
            </li>
            <li>
              <strong>The buyer pays their own agent directly,</strong> per the written buyer-agency
              agreement they signed, if the seller doesn&rsquo;t cover it.
            </li>
          </ul>
          <p style={{ fontSize: 13, color: "var(--s-muted)" }}>
            Bottom line: it&rsquo;s a negotiation, not a fixed rule &mdash; and a good agent will tell you
            exactly who&rsquo;s paying what before you sign anything.
          </p>
        </>
      ),
    },
    {
      heading: "If you're selling",
      body: (
        <>
          <p>
            You negotiate your listing agent&rsquo;s fee directly &mdash; it&rsquo;s a line item, not a fixed
            percentage. Separately, you decide <em>whether</em> to offer compensation to the buyer&rsquo;s
            agent. Offering something is often worth it: it keeps your home in front of the widest set of
            buyers and keeps deals simple. Historically total commissions ran around{" "}
            <strong>5&ndash;6%</strong> split between the two sides; today each side is negotiated on its
            own, so your total depends on what you agree to. See how it fits your bottom line with the{" "}
            <a href="/home-sale-proceeds-calculator">net proceeds calculator</a>.
          </p>
        </>
      ),
    },
    {
      heading: "If you're buying",
      body: (
        <>
          <p>
            Before an agent can tour homes with you, you&rsquo;ll sign a <strong>written buyer-agency
            agreement</strong> that spells out their fee and how long it runs. Read it &mdash; the fee is
            negotiable, and you can negotiate for the seller to cover it in your offer. The upside of the
            new rules is transparency: you know your agent&rsquo;s compensation up front instead of it being
            buried in the MLS. New to the process? Start with{" "}
            <a href="/how-to-buy-a-home-in-michigan">how to buy a home in Michigan</a>.
          </p>
        </>
      ),
    },
  ],
  faqHeading: "Realtor commission in Michigan — common questions",
  faqs: [
    {
      question: "Do sellers still pay the buyer's agent in Michigan?",
      answer:
        "Not automatically. Since the NAR settlement took effect in August 2024, sellers are no longer required to pay the buyer's agent. Many sellers still choose to offer buyer-agent compensation to attract more buyers, but it's now negotiated deal-by-deal rather than posted on the MLS.",
    },
    {
      question: "How much is realtor commission in Michigan?",
      answer:
        "There is no legally set rate — commissions are fully negotiable. Historically, total commissions ran around 5–6% of the sale price split between the listing and buyer sides. Today each side is negotiated separately, so the total depends entirely on what the parties agree to.",
    },
    {
      question: "Do I have to sign a buyer-agency agreement in Michigan?",
      answer:
        "Yes. Under the August 2024 rules, a buyer must sign a written buyer-agency agreement that states the agent's compensation before touring homes with that agent. The fee must be a specific amount or rate and is negotiable.",
    },
    {
      question: "Can the buyer's agent commission be a seller concession?",
      answer:
        "Yes. A buyer can ask the seller to cover the buyer's agent compensation as a concession written into the offer — similar to asking a seller to credit closing costs. Whether the seller agrees is part of the negotiation.",
    },
  ],
  related: [
    { href: "/michigan-closing-costs", label: "Michigan closing costs, explained" },
    { href: "/sell-your-home-metro-detroit", label: "Sell your home for more" },
    { href: "/how-to-buy-a-home-in-michigan", label: "How to buy a home in Michigan" },
    { href: "/home-sale-proceeds-calculator", label: "Net proceeds calculator (sellers)" },
  ],
  ctaHeading: "Not sure what you'll actually pay?",
  ctaBody: (
    <>
      Commissions are negotiable &mdash; and we&rsquo;ll walk you through your options honestly before you
      sign anything, whether you&rsquo;re buying or selling.
    </>
  ),
  ctaPrimary: { href: "/contact", label: "Talk to a local expert" },
  metaTitle: "Who Pays Realtor Commission in Michigan? (2026 NAR Settlement)",
  metaDescription:
    "Who pays realtor commission in Michigan after the 2024 NAR settlement: commissions are negotiable, sellers aren't required to pay the buyer's agent, and buyers sign a written agency agreement. Plain-English guide for buyers and sellers.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
