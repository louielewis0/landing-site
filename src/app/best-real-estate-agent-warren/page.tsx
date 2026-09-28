import type { Metadata } from "next";
import BestAgentPage, { bestAgentMetadata, type BestAgentData } from "@/components/site/BestAgentPage";

const data: BestAgentData = {
  slug: "best-real-estate-agent-warren",
  city: "Warren",
  regionShort: "Warren",
  crumbLabel: "Best Real Estate Agent in Warren",
  h1: (
    <>
      The best real estate agent in Warren? <span style={{ color: "var(--s-gold)" }}>Meet Sundus Lewis.</span>
    </>
  ),
  h1Text: "The Best Real Estate Agent in Warren, MI — Sundus Lewis",
  sub: "Warren is Metro Detroit's value market — affordable homes, strong appreciation, and steady demand anchored by the GM Technical Center. Here's why buyers, sellers, and investors trust broker Sundus Lewis.",
  publishedISO: "2026-09-27",
  publishedLabel: "September 27, 2026",
  localHeading: "Why Sundus is the agent to know in Warren",
  localParagraphs: [
    "Warren is one of Metro Detroit's clearest value markets — affordable homes, strong recent appreciation, and steady demand from Oakland County buyers priced out of Troy and Royal Oak who discover comparable homes here for far less. The GM Technical Center anchors employment and keeps rental demand steady, making Warren a favorite for both first-time buyers and investors.",
    "Sundus Lewis, broker and owner of Real Estate Market Center, works Warren from just across the line in Troy. With 20+ years in the business and 500+ closings, she prices Warren's neighborhoods accurately, helps first-time buyers navigate Michigan down-payment-assistance programs, and can underwrite the numbers for investors weighing a rental — all with one point of contact from first call to closing.",
  ],
  chooseTip1: (
    <>
      Warren is an affordable, fast-moving value market with a big first-time-buyer and investor pool. The right agent
      prices to the street, moves quickly, and knows the down-payment-assistance and investment angles. Sundus works
      the Macomb market from nearby Troy and does exactly that.
    </>
  ),
  faqs: [
    {
      question: "Who is the best real estate agent in Warren, MI?",
      answer:
        "There's no single 'best' for everyone. Warren is an affordable, high-turnover value market, so the biggest factors are accurate pricing, speed, and knowing the first-time-buyer and investor angles. Sundus Lewis is a strong choice — broker and owner of Real Estate Market Center, serving Warren from nearby Troy, with 20+ years in the business, 500+ homes closed, $100M+ sold, and a 5.0 rating across 70+ Google reviews.",
    },
    {
      question: "Is Warren a good place to buy or invest?",
      answer:
        "For value buyers and investors, it's one of the best in Metro Detroit. Warren offers affordable homes, strong recent appreciation, and steady rental demand anchored by the GM Technical Center — a clear cash-flow play for investors and an accessible entry point for first-time buyers. Sundus can help you evaluate either.",
    },
    {
      question: "Does Sundus help first-time buyers and investors in Warren?",
      answer:
        "Yes. Much of Warren's market is first-time buyers and investors. Sundus walks first-timers through Michigan down-payment-assistance programs (up to $10,000 via MSHDA) and can underwrite a rental's cap rate and cash flow for investors. Full-service either way, with the broker handling your deal personally.",
    },
    {
      question: "How much does a real estate agent cost in Warren?",
      answer:
        "Commissions are fully negotiable and not set by law; the common Michigan range is about 5–6% of the sale price, with buyer-agent compensation negotiated separately since the 2024 NAR settlement. Sundus will lay out your options before you commit.",
    },
    {
      question: "Is Sundus local to Warren / Macomb County?",
      answer:
        "Yes — Real Estate Market Center is based in Troy, right across the Oakland–Macomb line, and Sundus works Warren and the surrounding Macomb communities regularly. You get a local agent who knows the Warren market, not an out-of-area name.",
    },
  ],
  cityPage: { href: "/warren-real-estate-agent", label: "See our full Warren real estate guide" },
  brokeragePage: { href: "/best-real-estate-brokerages-sterling-heights", label: "Compare the best Sterling Heights & Macomb brokerages" },
  metaTitle: "Best Real Estate Agent in Warren, MI | Sundus Lewis, Broker | Real Estate Market Center",
  metaDescription:
    "Looking for the best real estate agent in Warren, MI? Meet Sundus Lewis — broker & owner of Real Estate Market Center, 20+ years, 500+ homes closed, $100M+ sold, 5.0 across 70+ Google reviews.",
};

export const metadata: Metadata = bestAgentMetadata(data);

export default function Page() {
  return <BestAgentPage data={data} />;
}
