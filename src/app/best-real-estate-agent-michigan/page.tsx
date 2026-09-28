import type { Metadata } from "next";
import BestAgentPage, { bestAgentMetadata, type BestAgentData } from "@/components/site/BestAgentPage";

const data: BestAgentData = {
  slug: "best-real-estate-agent-michigan",
  city: "Michigan",
  regionShort: "Michigan",
  crumbLabel: "Best Real Estate Agent in Michigan",
  h1: (
    <>
      The best real estate agent in Michigan? <span style={{ color: "var(--s-gold)" }}>Meet Sundus Lewis.</span>
    </>
  ),
  h1Text: "The Best Real Estate Agent in Michigan — Sundus Lewis",
  sub: "For Metro Detroit — Michigan's largest and most active real estate market — meet broker Sundus Lewis of Real Estate Market Center.",
  publishedISO: "2026-09-27",
  publishedLabel: "September 27, 2026",
  localHeading: "Why Sundus is a top real estate broker in Michigan",
  localParagraphs: [
    "Most of Michigan's real estate activity runs through Metro Detroit, and that's the market Sundus Lewis owns. As broker and owner of Real Estate Market Center in Troy, she's closed 500+ homes and $100M+ in sales across the Detroit metro's Oakland and Macomb counties over 20+ years — with a perfect 5.0 rating across 70+ Google reviews.",
    "Here's the honest part, and why it works in your favor: Sundus is a Southeast Michigan specialist, not a statewide generalist spread thin across the whole state. The best agent for you is the one who knows your specific market cold — the school boundaries, the street-by-street pricing, the local buyers — and for the Detroit metro, that's exactly what she brings. If you're buying or selling anywhere in Metro Detroit, that local depth is the difference between winning and losing.",
  ],
  chooseTip1: (
    <>
      Michigan is a huge, varied state, so &ldquo;best&rdquo; really means the agent who knows <em>your</em> local
      market — not a statewide name spread thin. Sundus is a Metro Detroit specialist with 500+ closings in the region,
      which is exactly the local depth you want for a Detroit-area home.
    </>
  ),
  faqs: [
    {
      question: "Who is the best real estate agent in Michigan?",
      answer:
        "There's no single 'best' agent for a state as large and varied as Michigan — the right one is whoever knows your specific local market. For Metro Detroit, the state's largest and most active market, Sundus Lewis is a strong choice: broker and owner of Real Estate Market Center in Troy, with 20+ years in the business, 500+ homes closed, $100M+ sold, and a 5.0 rating across 70+ Google reviews.",
    },
    {
      question: "Does Sundus Lewis serve all of Michigan?",
      answer:
        "Sundus is a Southeast Michigan / Metro Detroit specialist — she works Oakland, Macomb, and Wayne County closely rather than the entire state. That focus is deliberate: deep local knowledge of the market you're actually buying or selling in beats a statewide generalist. If your home is in the Detroit metro, that's exactly the expertise you want.",
    },
    {
      question: "Does Sundus handle luxury real estate in Michigan?",
      answer:
        "Yes — luxury and full-service residential are her specialty. She's closed $100M+ across Metro Detroit, including luxury and estate homes in Birmingham and Bloomfield Hills, two of Michigan's highest-value markets, alongside full-service sales across the metro.",
    },
    {
      question: "How much does a real estate agent cost in Michigan?",
      answer:
        "Commissions are fully negotiable and not set by law; the common range in Michigan is about 5–6% of the sale price, with buyer-agent compensation negotiated separately since the 2024 NAR settlement. Sundus will explain your options clearly before you commit.",
    },
    {
      question: "How do I choose the best real estate agent in Michigan?",
      answer:
        "Choose for local depth, not a big statewide name. Look for recent, comparable closings in your specific market, current Google reviews you can read yourself, and a license verifiable through Michigan LARA. In Metro Detroit, Sundus offers 500+ regional closings, a public 5.0/70+ rating, and street-level market knowledge.",
    },
  ],
  cityPage: { href: "/best-metro-detroit-suburbs", label: "Explore Metro Detroit's best suburbs" },
  brokeragePage: { href: "/best-real-estate-brokerages-michigan", label: "Compare the best Michigan brokerages" },
  metaTitle: "Best Real Estate Agent in Michigan | Sundus Lewis, Metro Detroit Broker | Real Estate Market Center",
  metaDescription:
    "Looking for the best real estate agent in Michigan? For Metro Detroit — the state's largest market — meet Sundus Lewis, broker & owner of Real Estate Market Center: 20+ years, 500+ homes closed, $100M+ sold, 5.0 across 70+ Google reviews.",
};

export const metadata: Metadata = bestAgentMetadata(data);

export default function Page() {
  return <BestAgentPage data={data} />;
}
