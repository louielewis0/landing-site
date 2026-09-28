import type { Metadata } from "next";
import BestAgentPage, { bestAgentMetadata, type BestAgentData } from "@/components/site/BestAgentPage";

const data: BestAgentData = {
  slug: "best-real-estate-agent-sterling-heights",
  city: "Sterling Heights",
  regionShort: "Sterling Heights",
  crumbLabel: "Best Real Estate Agent in Sterling Heights",
  h1: (
    <>
      The best real estate agent in Sterling Heights? <span style={{ color: "var(--s-gold)" }}>Meet Sundus Lewis.</span>
    </>
  ),
  h1Text: "The Best Real Estate Agent in Sterling Heights, MI — Sundus Lewis",
  sub: "Sterling Heights is Macomb County's largest city — a strong, mid-market family suburb. Here's why buyers and sellers trust broker Sundus Lewis to price it right and move fast.",
  publishedISO: "2026-09-27",
  publishedLabel: "September 27, 2026",
  localHeading: "Why Sundus is the agent to know in Sterling Heights",
  localParagraphs: [
    "Sterling Heights is Macomb County's largest city and one of Metro Detroit's most solid mid-market family suburbs — well-kept subdivisions, good value relative to Oakland County, and strong demand from buyers who want more home for the money. It's a market where correct pricing and quick execution matter more than a luxury brand name.",
    "Sundus Lewis, broker and owner of Real Estate Market Center, works Sterling Heights and the surrounding Macomb communities from just across the county line in Troy. With 20+ years in the business and 500+ closings, she knows the Utica and Warren Consolidated school boundaries, prices to the street, and handles your deal personally from first call to closing.",
  ],
  chooseTip1: (
    <>
      Sterling Heights is a mid-market family suburb, so the deciding factor is an agent who knows the subdivisions and
      the Utica vs. Warren Consolidated school boundaries and prices correctly — not a luxury brand. Sundus works the
      Macomb market from just over the county line and moves fast for buyers and sellers.
    </>
  ),
  faqs: [
    {
      question: "Who is the best real estate agent in Sterling Heights, MI?",
      answer:
        "There's no single 'best' for everyone. Sterling Heights is a mid-market family suburb, so the biggest factor is an agent who knows the subdivisions and school boundaries and prices correctly. Sundus Lewis is a strong choice — broker and owner of Real Estate Market Center, serving Sterling Heights and Macomb from nearby Troy, with 20+ years in the business, 500+ homes closed, $100M+ sold, and a 5.0 rating across 70+ Google reviews.",
    },
    {
      question: "What school district is Sterling Heights in?",
      answer:
        "Sterling Heights is served primarily by Utica Community Schools and Warren Consolidated Schools, with the split depending on your address. Because the boundary matters for both your children's schools and resale value, Sundus verifies the exact district on every listing before you offer.",
    },
    {
      question: "Is Sundus local to Sterling Heights / Macomb County?",
      answer:
        "Yes — Real Estate Market Center is based in Troy, right across the Oakland–Macomb line, and Sundus works Sterling Heights, Warren, and the surrounding Macomb communities regularly. You get a genuinely local agent for the Macomb market, not an out-of-area name.",
    },
    {
      question: "How much does a real estate agent cost in Sterling Heights?",
      answer:
        "Commissions are fully negotiable and not set by law; the common Michigan range is about 5–6% of the sale price, with buyer-agent compensation negotiated separately since the 2024 NAR settlement. Sundus will explain your options clearly before you commit.",
    },
    {
      question: "Is Sterling Heights a good place to buy a home?",
      answer:
        "Yes — it's one of Macomb County's most stable, in-demand suburbs, known for well-maintained subdivisions and strong value versus neighboring Oakland County. It's less luxury-driven than Birmingham or Bloomfield, which means an agent's local knowledge and pricing discipline matter most. Sundus brings both.",
    },
  ],
  cityPage: { href: "/sterling-heights-real-estate-agent", label: "See our full Sterling Heights real estate guide" },
  brokeragePage: { href: "/best-real-estate-brokerages-sterling-heights", label: "Compare the best Sterling Heights brokerages" },
  metaTitle: "Best Real Estate Agent in Sterling Heights, MI | Sundus Lewis, Broker | Real Estate Market Center",
  metaDescription:
    "Looking for the best real estate agent in Sterling Heights, MI? Meet Sundus Lewis — broker & owner of Real Estate Market Center, 20+ years, 500+ homes closed, $100M+ sold, 5.0 across 70+ Google reviews.",
};

export const metadata: Metadata = bestAgentMetadata(data);

export default function Page() {
  return <BestAgentPage data={data} />;
}
