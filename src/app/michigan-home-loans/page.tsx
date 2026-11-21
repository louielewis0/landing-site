import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const data: GuidePageData = {
  slug: "michigan-home-loans",
  crumbLabel: "Michigan Home Loans",
  eyebrow: "Buyer financing guide · Michigan",
  h1: (
    <>
      <span style={{ color: "var(--s-gold)" }}>Home loans</span> in Michigan, explained
    </>
  ),
  h1Text: "Michigan Home Loans (2026): Loan Types, Down Payment & First-Time Help",
  sub: "The biggest myth in home buying is that you need 20% down. You don't. Between FHA, conventional, VA, USDA, and Michigan's own down-payment assistance, most buyers get in with a fraction of that. Here's every Michigan home loan option — and how little you actually need.",
  publishedISO: "2026-11-18",
  publishedLabel: "November 18, 2026",
  bullets: [
    "You don't need 20% down",
    "FHA 3.5% · Conventional 3% · VA/USDA 0%",
    "Up to $10,000 in Michigan down-payment help",
  ],
  sections: [
    {
      heading: "Your Michigan home loan options",
      body: (
        <>
          <p>Four main loan types cover almost every Michigan buyer:</p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
            <li>
              <strong>FHA &mdash; 3.5% down, flexible credit (from 580).</strong> The go-to for first-time and
              lower-credit buyers. 2026 Michigan limit: <strong>$541,287</strong> statewide. Full details on our{" "}
              <a href="/michigan-fha-loans" style={{ color: "var(--s-gold-ink)", fontWeight: 600 }}>Michigan FHA loans guide</a>.
            </li>
            <li>
              <strong>Conventional &mdash; as little as 3% down.</strong> Best with stronger credit (usually 620+); its
              PMI is <strong>cancellable at ~20% equity</strong> (unlike FHA&rsquo;s). HomeReady and Home Possible
              versions add income limits but allow just 3% down.
            </li>
            <li>
              <strong>VA &mdash; 0% down</strong> for eligible veterans, active duty, and surviving spouses, with no
              monthly mortgage insurance. If you qualify, it usually beats everything else.
            </li>
            <li>
              <strong>USDA Rural Development &mdash; 0% down</strong> in USDA-eligible areas (much of outstate Michigan),
              with household-income limits.
            </li>
          </ul>
        </>
      ),
    },
    {
      heading: "Michigan's own help: up to $10,000 down (MSHDA)",
      body: (
        <>
          <p>
            On top of those loans, Michigan offers real down-payment help through <strong>MSHDA</strong>. The{" "}
            <strong>MI 10K DPA</strong> provides up to <strong>$10,000</strong> toward your down payment and closing
            costs &mdash; a <strong>0% interest, no-monthly-payment</strong> loan you repay only when you sell, refinance,
            or pay off the home. Pair it with an FHA or conventional loan and your out-of-pocket can be remarkably small.
          </p>
          <p>
            MSHDA requires a <strong>640 credit score</strong>, a short homebuyer-education course, income within the
            program limits, and a purchase price under <strong>$566,355</strong>. See our{" "}
            <a href="/michigan-down-payment-assistance" style={{ color: "var(--s-gold-ink)", fontWeight: 600 }}>down-payment assistance guide</a>{" "}
            and{" "}
            <a href="/first-time-home-buyer-programs-michigan" style={{ color: "var(--s-gold-ink)", fontWeight: 600 }}>first-time buyer programs</a>.
          </p>
        </>
      ),
    },
    {
      heading: "How much do you really need?",
      body: (
        <>
          <p>
            For a <strong>$250,000</strong> Michigan home, here&rsquo;s the down payment by loan type:
          </p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8 }}>
            <li><strong>VA / USDA:</strong> $0 (if eligible)</li>
            <li><strong>Conventional 3%:</strong> $7,500</li>
            <li><strong>FHA 3.5%:</strong> $8,750 &mdash; and up to $10,000 of it can come from MSHDA</li>
          </ul>
          <p>
            In other words, many Michigan buyers get into a home for <strong>a few thousand dollars or less</strong> out
            of pocket &mdash; not the $50,000 they assumed. Closing costs are separate; see{" "}
            <a href="/michigan-closing-costs" style={{ color: "var(--s-gold-ink)", fontWeight: 600 }}>Michigan closing costs</a>, and run your budget with the{" "}
            <a href="/home-affordability-calculator" style={{ color: "var(--s-gold-ink)", fontWeight: 600 }}>affordability calculator</a>.
          </p>
        </>
      ),
    },
    {
      heading: "Getting pre-approved (do this first)",
      body: (
        <>
          <p>
            Before you tour homes, get <strong>pre-approved</strong> &mdash; it tells you your real budget and makes your
            offers competitive. Lenders look at your <strong>credit score, income, debt-to-income ratio</strong> (usually
            up to ~43%, higher with strong factors), and your <strong>down-payment funds</strong>. The written
            pre-approval is what sellers take seriously.
          </p>
          <p>
            You&rsquo;ll also sign a buyer-agency agreement before touring &mdash; see{" "}
            <a href="/how-to-buy-a-home-in-michigan" style={{ color: "var(--s-gold-ink)", fontWeight: 600 }}>how to buy a home in Michigan</a>{" "}
            for the full step-by-step.
          </p>
        </>
      ),
    },
    {
      heading: "We'll connect you with the right lender — free",
      body: (
        <>
          <p>
            The &ldquo;best&rdquo; loan depends on your credit, savings, and the home &mdash; and the wrong one can cost
            you thousands. <strong>Real Estate Market Center</strong> connects Michigan buyers with trusted local lenders
            who price FHA, conventional, VA, and MSHDA options side by side, then we find you the home. <strong>Sundus
            Lewis</strong> and her team have closed <strong>$100M+</strong> across Metro Detroit and hold a{" "}
            <strong>5.0 rating across 110+ Google reviews</strong> &mdash; and there&rsquo;s no cost to you to get started.
          </p>
        </>
      ),
    },
  ],
  faqHeading: "Michigan home loans — common questions",
  video: {
    src: "/videos/no-money-down.mp4",
    poster: "/videos/no-money-down.png",
    title: "You Don't Need 20% Down to Buy a Home in Michigan (2026)",
    description:
      "The 20%-down myth, busted: FHA 3.5% down, conventional as little as 3%, VA & USDA 0% if eligible, plus up to $10,000 in MSHDA down-payment assistance in Michigan.",
    uploadDate: "2026-11-21",
    durationISO: "PT27S",
  },
  faqs: [
    {
      question: "What home loans are available in Michigan?",
      answer:
        "The main options are FHA (3.5% down, flexible credit), conventional (as little as 3% down, cancellable PMI), VA (0% down for eligible veterans), and USDA Rural Development (0% down in eligible areas). On top of those, Michigan's MSHDA program offers up to $10,000 in down-payment assistance for qualifying first-time buyers.",
    },
    {
      question: "How much down payment do I need to buy a house in Michigan?",
      answer:
        "Far less than 20%. VA and USDA loans require 0% down for those who qualify, conventional loans can be as little as 3%, and FHA is 3.5% — and up to $10,000 of an FHA down payment can come from MSHDA assistance. On a $250,000 home that's roughly $0–$8,750 down depending on your loan.",
    },
    {
      question: "What credit score do I need for a home loan in Michigan?",
      answer:
        "It depends on the loan. FHA officially allows 580 for 3.5% down (lenders often prefer ~620–640), conventional loans generally want 620+, and MSHDA down-payment assistance requires a 640. A higher score means better rates and an easier approval, but you don't need perfect credit to buy.",
    },
    {
      question: "Should I get pre-approved before house hunting in Michigan?",
      answer:
        "Yes — always. Pre-approval tells you your real budget, makes your offers competitive, and is what sellers take seriously. Real Estate Market Center can connect you with a trusted local lender to get pre-approved free, then help you find homes in your range.",
    },
  ],
  related: [
    { href: "/michigan-fha-loans", label: "Michigan FHA loans" },
    { href: "/michigan-down-payment-assistance", label: "$10K down-payment assistance (MSHDA)" },
    { href: "/first-time-home-buyer-programs-michigan", label: "Michigan first-time buyer programs" },
    { href: "/home-affordability-calculator", label: "Home affordability calculator" },
    { href: "/how-to-buy-a-home-in-michigan", label: "How to buy a home in Michigan" },
  ],
  ctaHeading: "Find out what you qualify for — free",
  ctaBody: (
    <>
      We&rsquo;ll connect you with a trusted Michigan lender to compare your FHA, conventional, VA, and MSHDA options,
      then show you homes in your range. No cost, no pressure &mdash; just a clear path to owning.
    </>
  ),
  ctaPrimary: { href: "/contact", label: "Talk to us about getting pre-approved" },
  metaTitle: "Michigan Home Loans (2026): Loan Types, Down Payment & First-Time Help",
  metaDescription:
    "Every Michigan home loan option explained: FHA (3.5% down), conventional (3%), VA & USDA (0% down), plus up to $10,000 in MSHDA down-payment assistance. How much you really need to buy, what credit score, and how to get pre-approved — from Real Estate Market Center.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
