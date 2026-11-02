import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const data: GuidePageData = {
  slug: "selling-an-inherited-house-michigan",
  crumbLabel: "Selling an Inherited House",
  eyebrow: "Inherited property & probate · Michigan",
  h1: (
    <>
      Selling an <span style={{ color: "var(--s-gold)" }}>inherited house</span> in Michigan
    </>
  ),
  h1Text: "Selling an Inherited House in Michigan: Probate, Taxes & Timeline (2026)",
  sub: (
    <>
      Inheriting a home is equal parts gift and responsibility. This guide walks through what actually
      happens next in Michigan &mdash; whether you need probate, who has authority to sell, the tax rule that
      usually works in your favor, and whether to sell as-is or fix it up first.
    </>
  ),
  bullets: [
    "Inherited homes get a stepped-up tax basis — often little or no capital gains if you sell soon",
    "Whether you need probate depends on how the home was titled (trust, Lady Bird deed, joint ownership)",
    "The personal representative — or all heirs together — must agree to sell",
  ],
  publishedISO: "2026-11-02",
  publishedLabel: "November 2, 2026",
  sections: [
    {
      heading: "The short answer",
      body: (
        <>
          <p>
            When you inherit a house in Michigan, two things usually determine your next steps: <strong>how
            the home was titled</strong> (which decides whether it must go through probate) and <strong>who has
            legal authority to sell it</strong>. The good news on taxes: inherited property receives a{" "}
            <strong>stepped-up cost basis</strong> &mdash; so if you sell near the time you inherit, there&rsquo;s
            often little or no capital-gains tax.
          </p>
          <p>
            If the home was held in a <strong>trust</strong>, under a <strong>Lady Bird deed</strong>
            (enhanced life estate), or in <strong>joint ownership with rights of survivorship</strong>, it may
            pass <em>outside</em> probate and can often be sold quickly. If it was solely in the deceased&rsquo;s
            name, it typically goes through <strong>probate</strong> first.
          </p>
        </>
      ),
    },
    {
      heading: "Do you have to go through probate in Michigan?",
      body: (
        <>
          <p>Probate is the court process that transfers a deceased person&rsquo;s assets. You may be able to avoid it if:</p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li>The home was in a <strong>living trust</strong> &mdash; the successor trustee can sell it.</li>
            <li>
              There&rsquo;s a <strong>Lady Bird deed</strong> (very common in Michigan) or a transfer-on-death
              arrangement &mdash; title passes automatically to the named person.
            </li>
            <li>
              The home was owned <strong>jointly with rights of survivorship</strong> &mdash; it passes to the
              surviving owner.
            </li>
          </ul>
          <p style={{ marginTop: 12 }}>
            Otherwise, the estate goes through probate under Michigan&rsquo;s Estates and Protected Individuals
            Code (EPIC). Michigan offers <strong>informal</strong> and <strong>formal</strong> probate, plus
            simplified procedures for smaller estates. The court appoints a <strong>personal representative</strong>{" "}
            (executor) who is then authorized to sell the home on the estate&rsquo;s behalf.
          </p>
        </>
      ),
    },
    {
      heading: "The tax rule that usually works in your favor",
      body: (
        <>
          <p>
            Here&rsquo;s the part that surprises most heirs: you generally <strong>do not</strong> pay tax on
            the home&rsquo;s full appreciation over the decedent&rsquo;s lifetime. Inherited property gets a{" "}
            <strong>&ldquo;stepped-up basis&rdquo;</strong> &mdash; its cost basis resets to the{" "}
            <strong>fair market value on the date of death</strong>.
          </p>
          <p>
            In practice, that means if you sell shortly after inheriting, your taxable gain is often{" "}
            <strong>close to zero</strong> (you&rsquo;re only taxed on appreciation <em>after</em> the date of
            death). Michigan also has <strong>no state inheritance tax or estate tax</strong>. This is a big
            reason many heirs choose to sell sooner rather than later &mdash; but confirm the specifics with a
            CPA, especially if the home was a rental or sat for a while.
          </p>
        </>
      ),
    },
    {
      heading: "Sell as-is, or fix it up first?",
      body: (
        <>
          <p>
            Inherited homes are often dated, full of belongings, or in need of work &mdash; and heirs usually
            don&rsquo;t live nearby. You have two realistic routes:
          </p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li>
              <strong>Sell as-is.</strong> Fastest and lowest-hassle. You skip repairs and clean-out costs and
              let the buyer handle updates &mdash; you&rsquo;ll just price for condition.
            </li>
            <li>
              <strong>Do targeted prep.</strong> A clean-out, light paint, and professional photos can lift the
              sale price well beyond their cost. We&rsquo;ll tell you honestly which repairs pay for themselves
              and which don&rsquo;t &mdash; so you never over-invest in a home you&rsquo;re selling.
            </li>
          </ul>
          <p style={{ marginTop: 12, fontSize: 13.5, color: "var(--s-muted)" }}>
            This page is general information, not legal or tax advice. Probate requirements, authority to sell,
            and tax treatment depend on your specific situation &mdash; work with a probate attorney and a CPA.
          </p>
        </>
      ),
    },
  ],
  faqs: [
    {
      question: "Do I have to pay taxes when I sell an inherited house in Michigan?",
      answer:
        "Usually very little. Inherited property gets a stepped-up basis to its fair market value on the date of death, so you're only taxed on appreciation after that date. Sell soon after inheriting and the taxable gain is often near zero. Michigan also has no state inheritance or estate tax. Confirm your specifics with a CPA.",
    },
    {
      question: "Does an inherited house have to go through probate in Michigan?",
      answer:
        "Not always. If the home was in a living trust, passed by a Lady Bird deed or transfer-on-death, or was owned jointly with rights of survivorship, it can pass outside probate. If it was solely in the deceased's name, it typically goes through probate under Michigan's EPIC, where a personal representative is appointed to sell it.",
    },
    {
      question: "Can I sell an inherited house before probate is finished?",
      answer:
        "Often yes. Once the probate court appoints a personal representative, that person usually has authority to list and sell the home, with the sale closing as part of the estate. If the home avoided probate (trust, Lady Bird deed, or survivorship), you can typically sell right away. Your probate attorney will confirm the timing for your estate.",
    },
    {
      question: "What if multiple siblings inherit the house and don't agree?",
      answer:
        "All heirs who share title generally must agree to sell. A neutral, broker-prepared valuation helps everyone agree on a fair price and reduces conflict. If heirs truly can't agree, a court can be asked to order a sale (a partition action), but reaching agreement first is faster and far less costly.",
    },
    {
      question: "How long does it take to sell an inherited house in Michigan?",
      answer:
        "If the home avoided probate, it can be listed immediately and sells on a normal timeline. If probate is required, you generally wait until a personal representative is appointed (often a few weeks to a couple of months), after which the home can be listed. The sale itself then runs like any other.",
    },
  ],
  faqHeading: "Inherited-house questions, answered",
  related: [
    { href: "/selling-a-house-during-divorce-michigan", label: "Selling a house during a divorce in Michigan" },
    { href: "/home-sale-proceeds-calculator", label: "Net proceeds calculator (sellers)" },
    { href: "/sell-your-home-metro-detroit", label: "Sell your home for more" },
    { href: "/michigan-property-taxes-explained", label: "Michigan property taxes explained" },
    { href: "/home-value", label: "What's my home worth? (free valuation)" },
    { href: "/contact", label: "Talk to a local agent" },
  ],
  ctaHeading: "Inherited a home? We'll make it simple.",
  ctaBody: (
    <>
      We help personal representatives and families value and sell inherited homes across Metro Detroit
      &mdash; coordinating with your probate attorney, handling the clean-out and prep, and getting you a fair
      price with no pressure. Start with a free, no-obligation valuation.
    </>
  ),
  ctaPrimary: { href: "/home-value", label: "Get a free home valuation" },
  metaTitle: "Selling an Inherited House in Michigan: Probate, Taxes & Timeline (2026)",
  metaDescription:
    "Selling an inherited house in Michigan: when you need probate (vs. a trust or Lady Bird deed), who can sell, the stepped-up basis that usually means little or no capital gains tax, no Michigan inheritance tax, and whether to sell as-is. From a Metro Detroit brokerage.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
