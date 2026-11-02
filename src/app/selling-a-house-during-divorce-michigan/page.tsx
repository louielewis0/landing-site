import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const data: GuidePageData = {
  slug: "selling-a-house-during-divorce-michigan",
  crumbLabel: "Selling a House in a Divorce",
  eyebrow: "Divorce & real estate · Michigan",
  h1: (
    <>
      Selling a house during a <span style={{ color: "var(--s-gold)" }}>divorce</span> in Michigan
    </>
  ),
  h1Text: "Selling a House During a Divorce in Michigan (2026 Guide)",
  sub: (
    <>
      The marital home is usually a couple&rsquo;s largest shared asset &mdash; and often the hardest to
      divide. Here&rsquo;s how selling a house in a Michigan divorce actually works: your options, how the
      value gets set, how the proceeds are split, and how to keep the process calm and fair for both sides.
    </>
  ),
  bullets: [
    "Michigan divides marital property equitably (fairly) — not automatically 50/50",
    "You can sell the home, buy out your spouse, or co-own it temporarily",
    "A neutral, broker-prepared valuation keeps both sides — and the court — on the same page",
  ],
  publishedISO: "2026-11-02",
  publishedLabel: "November 2, 2026",
  sections: [
    {
      heading: "The short answer",
      body: (
        <>
          <p>
            Michigan is an <strong>equitable-distribution</strong> state. That means the marital home and
            its equity are divided in a way the court considers <em>fair</em> &mdash; which is often close to
            50/50, but not always. When a couple owns a home together, they generally have three paths:
          </p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li>
              <strong>Sell the home</strong> and divide the net proceeds per the divorce judgment.
            </li>
            <li>
              <strong>One spouse buys out the other</strong> &mdash; keeping the house and refinancing to
              remove the departing spouse from the mortgage.
            </li>
            <li>
              <strong>Co-own it temporarily</strong> &mdash; for example, until children finish school &mdash;
              then sell later on agreed terms.
            </li>
          </ul>
          <p style={{ marginTop: 12 }}>
            Selling is the cleanest option for most couples: it converts a hard-to-split asset into cash and
            gives both people a true fresh start. The key is agreeing on <strong>price, timing, and agent</strong>{" "}
            &mdash; or the court will decide those for you.
          </p>
        </>
      ),
    },
    {
      heading: "Setting the price: why a neutral valuation matters",
      body: (
        <>
          <p>
            The single biggest source of conflict in a divorce sale is <strong>what the home is worth</strong>.
            One spouse wants to price high; the other wants a fast sale. The fix is a{" "}
            <strong>neutral, broker-prepared valuation</strong> both parties and their attorneys can trust.
          </p>
          <p>
            We prepare <strong>Broker Price Opinions (BPOs)</strong> and market valuations specifically for
            divorce matters &mdash; a written, defensible opinion of value supported by recent comparable sales.
            We&rsquo;ll work directly with your attorney, stay neutral, and keep our opinion based on the data,
            not on either side&rsquo;s wishes. That single document often settles the biggest argument in the
            whole process.
          </p>
        </>
      ),
    },
    {
      heading: "How the proceeds — and the mortgage — get divided",
      body: (
        <>
          <p>
            In Michigan, how the equity splits is set by the <strong>Judgment of Divorce</strong>. Until that
            judgment is final, sale proceeds are frequently held in <strong>escrow</strong> rather than
            distributed, so neither spouse can spend the other&rsquo;s share prematurely.
          </p>
          <p>
            The <strong>mortgage</strong> is its own issue. Both names usually stay on the loan until the home
            is sold or refinanced &mdash; and both remain legally responsible for payments in the meantime, no
            matter who lives there. If one spouse keeps the house, they typically must{" "}
            <strong>refinance</strong> to remove the other from the loan (and often pay a buyout for their
            share of the equity). These terms belong in your settlement, written down clearly.
          </p>
        </>
      ),
    },
    {
      heading: "Taxes and timing",
      body: (
        <>
          <p>
            A big one: the <strong>capital-gains home-sale exclusion</strong>. A married couple filing jointly
            can generally exclude up to <strong>$500,000</strong> of gain on a primary residence; a single
            filer up to <strong>$250,000</strong>. Because that threshold changes when you go from married to
            single, the <strong>timing of the sale relative to when the divorce is final</strong> can have real
            tax consequences. Run this by a CPA before you decide when to close.
          </p>
          <p>
            Timing-wise, you can list and sell <strong>during</strong> the divorce (with both parties&rsquo; or
            the court&rsquo;s agreement) or after the judgment. Selling during can relieve the burden of two
            households carrying one mortgage; selling after can simplify who signs what. Your attorney will
            guide the right sequence for your case.
          </p>
        </>
      ),
    },
    {
      heading: "Choosing the right agent for a divorce sale",
      body: (
        <>
          <p>
            A divorce sale needs an agent who is <strong>neutral, discreet, and used to coordinating with
            attorneys</strong>. We communicate with both spouses equally (or only through counsel, if that&rsquo;s
            cleaner), keep every decision documented, and price to the market so the home actually sells &mdash;
            not to win an argument. We also handle showings and logistics in a way that respects a home where
            emotions are already running high.
          </p>
          <p style={{ marginTop: 12, fontSize: 13.5, color: "var(--s-muted)" }}>
            This page is general information, not legal or tax advice. Property division, timing, and the
            handling of proceeds depend on your specific circumstances and your Judgment of Divorce &mdash;
            always follow the guidance of your own attorney and CPA.
          </p>
        </>
      ),
    },
  ],
  faqs: [
    {
      question: "Is Michigan a 50/50 state for the house in a divorce?",
      answer:
        "Not exactly. Michigan is an equitable-distribution state, meaning the marital home and its equity are divided fairly rather than by an automatic 50/50 rule. In practice many divisions land near 50/50, but a court can order a different split based on factors like each spouse's contributions, length of marriage, and circumstances.",
    },
    {
      question: "Can I sell the house before the divorce is final in Michigan?",
      answer:
        "Yes, if both spouses agree or the court authorizes it. Many couples sell during the divorce to stop carrying two households on one mortgage. The net proceeds are often held in escrow until the Judgment of Divorce dictates how they're divided. Coordinate the timing with your attorney.",
    },
    {
      question: "How is the home's value determined in a Michigan divorce?",
      answer:
        "Most couples use a neutral, broker-prepared valuation — a Broker Price Opinion (BPO) or market analysis supported by recent comparable sales — that both attorneys can rely on. In contested cases a licensed appraisal may be ordered. A neutral value prepared by a broker who isn't taking sides often resolves the biggest disagreement in the case.",
    },
    {
      question: "Do both spouses have to agree to sell the house?",
      answer:
        "Generally yes, because both are usually on the title. If you can't agree, the court can order the home sold as part of the property division. Reaching agreement on price, timing, and the agent yourselves is almost always faster and less costly than having a judge decide.",
    },
    {
      question: "Who is responsible for the mortgage during a divorce?",
      answer:
        "Both spouses remain legally responsible for the mortgage until the home is sold or refinanced — regardless of who lives in it. If one spouse keeps the house, they typically refinance to remove the other from the loan and pay a buyout for their share of the equity.",
    },
  ],
  faqHeading: "Divorce home-sale questions, answered",
  related: [
    { href: "/home-sale-proceeds-calculator", label: "Net proceeds calculator (sellers)" },
    { href: "/selling-an-inherited-house-michigan", label: "Selling an inherited house in Michigan" },
    { href: "/sell-your-home-metro-detroit", label: "Sell your home for more" },
    { href: "/michigan-closing-costs", label: "Michigan closing costs explained" },
    { href: "/home-value", label: "What's my home worth? (free valuation)" },
    { href: "/contact", label: "Talk to a local agent, discreetly" },
  ],
  ctaHeading: "Need a neutral valuation or a discreet sale?",
  ctaBody: (
    <>
      We prepare broker valuations for divorce matters and handle the sale with discretion &mdash; working
      directly with you and your attorney. No pressure, no taking sides. Reach out for a confidential
      conversation.
    </>
  ),
  ctaPrimary: { href: "/contact", label: "Request a confidential consultation" },
  metaTitle: "Selling a House During a Divorce in Michigan (2026 Guide)",
  metaDescription:
    "How to sell a house in a Michigan divorce: equitable distribution, sell vs. buyout vs. co-own, how a neutral broker valuation sets the price, how proceeds and the mortgage are divided, and the capital-gains timing that matters. From a Metro Detroit brokerage.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
