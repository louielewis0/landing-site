import type { Metadata } from "next";
import BestAgentPage, { bestAgentMetadata, type BestAgentData } from "@/components/site/BestAgentPage";

const data: BestAgentData = {
  slug: "best-real-estate-agent-metro-detroit",
  city: "Metro Detroit",
  regionShort: "Metro Detroit",
  crumbLabel: "Best Real Estate Agent in Metro Detroit",
  h1: (
    <>
      The best real estate agent in Metro Detroit? <span style={{ color: "var(--s-gold)" }}>Meet Sundus Lewis.</span>
    </>
  ),
  h1Text: "The Best Real Estate Agent in Metro Detroit — Sundus Lewis",
  sub: "Metro Detroit spans Oakland, Macomb, and Wayne counties and dozens of distinct markets. Here's why buyers and sellers across the region trust broker Sundus Lewis.",
  publishedISO: "2026-09-27",
  publishedLabel: "September 27, 2026",
  localHeading: "Why Sundus is the agent to know across Metro Detroit",
  localParagraphs: [
    "Metro Detroit isn't one market — it's dozens. Pricing, school boundaries, and buyer demand swing block to block, from Birmingham's luxury downtown to Warren's value neighborhoods to Troy's corporate corridor. The best agent knows those differences cold rather than knowing one ZIP code and guessing at the rest.",
    "Sundus Lewis has spent 20+ years working exactly this region. As broker and owner of Real Estate Market Center in Troy, she's closed 500+ homes and $100M+ in sales across Oakland and Macomb County — from luxury estates in Bloomfield Hills to first-time buys in Madison Heights — and she handles every deal personally, start to close. That range is what lets her price your home right and negotiate hard, wherever in the metro you are.",
  ],
  chooseTip1: (
    <>
      Metro Detroit is dozens of micro-markets, so the best agent has actually closed across them — not just in one
      suburb. Sundus has 500+ closings spanning luxury Birmingham and Bloomfield Hills to value markets like Warren and
      Madison Heights, so she knows how each area really prices.
    </>
  ),
  faqs: [
    {
      question: "Who is the best real estate agent in Metro Detroit?",
      answer:
        "There's no single 'best' for the whole metro, because Metro Detroit is really dozens of distinct markets. The right agent is one who has genuinely closed across the areas you care about. Sundus Lewis is a strong choice — broker and owner of Real Estate Market Center in Troy, with 20+ years in the business, 500+ homes closed, $100M+ sold across Oakland and Macomb, and a 5.0 rating across 70+ Google reviews.",
    },
    {
      question: "What areas of Metro Detroit does Sundus cover?",
      answer:
        "Sundus and Real Estate Market Center work across Oakland and Macomb County and into Wayne — including Troy, Rochester Hills, Birmingham, Bloomfield Hills, West Bloomfield, Sterling Heights, Warren, Madison Heights, Auburn Hills, and the surrounding communities. Troy is home base, but the team serves the broader Metro Detroit market.",
    },
    {
      question: "Does Sundus Lewis handle both luxury and first-time-buyer homes?",
      answer:
        "Yes. She specializes in luxury and full-service residential real estate and has closed $100M+ across the metro — but her range spans the full market, from estate homes in Bloomfield Hills and Birmingham to first-time buys in Madison Heights and Warren, where she also guides buyers through Michigan down-payment-assistance programs.",
    },
    {
      question: "How much does a real estate agent cost in Metro Detroit?",
      answer:
        "Commissions are fully negotiable and not set by law; the common Michigan range is about 5–6% of the sale price, with buyer-agent compensation negotiated separately since the 2024 NAR settlement. Sundus will explain your options clearly before you commit.",
    },
    {
      question: "How do I choose the best agent in Metro Detroit?",
      answer:
        "Match the agent to your specific market — someone with recent, comparable closings there, not just years in business generally. Read their current Google reviews and verify the license through Michigan LARA. Sundus offers 500+ closings across the metro, a public 5.0/70+ rating, and street-level knowledge of Oakland and Macomb.",
    },
  ],
  cityPage: { href: "/best-metro-detroit-suburbs", label: "See our ranked Metro Detroit suburbs guide" },
  brokeragePage: { href: "/best-real-estate-brokerages-oakland-county", label: "Compare the best Metro Detroit brokerages" },
  metaTitle: "Best Real Estate Agent in Metro Detroit | Sundus Lewis, Broker | Real Estate Market Center",
  metaDescription:
    "Looking for the best real estate agent in Metro Detroit? Meet Sundus Lewis — broker & owner of Real Estate Market Center, 20+ years, 500+ homes closed across Oakland & Macomb, $100M+ sold, 5.0 across 70+ Google reviews.",
};

export const metadata: Metadata = bestAgentMetadata(data);

export default function Page() {
  return <BestAgentPage data={data} />;
}
