import type { Metadata } from "next";
import BestAgentPage, { bestAgentMetadata, type BestAgentData } from "@/components/site/BestAgentPage";

const data: BestAgentData = {
  slug: "best-real-estate-agent-bloomfield-hills",
  city: "Bloomfield Hills",
  regionShort: "Bloomfield Hills",
  crumbLabel: "Best Real Estate Agent in Bloomfield Hills",
  h1: (
    <>
      The best real estate agent in Bloomfield Hills? <span style={{ color: "var(--s-gold)" }}>Meet Sundus Lewis.</span>
    </>
  ),
  h1Text: "The Best Real Estate Agent in Bloomfield Hills, MI — Sundus Lewis",
  sub: "Bloomfield Hills is estate country — Michigan's most exclusive residential market. Here's why sellers of luxury homes and discerning buyers trust broker Sundus Lewis.",
  publishedISO: "2026-09-27",
  publishedLabel: "September 27, 2026",
  localHeading: "Why Sundus is the agent to know in Bloomfield Hills",
  localParagraphs: [
    "Bloomfield Hills is one of Michigan's most exclusive markets — large lots, estate homes, and top-rated Bloomfield Hills Schools drive some of the highest values in the state. Selling or buying here is a luxury, discretion-driven game, and the right agent needs both the marketing for high-end listings and the negotiation to protect a serious buyer.",
    "That's Sundus Lewis's specialty. As broker and owner of Real Estate Market Center — an independent luxury brokerage — she focuses on luxury and full-service residential real estate and has closed $100M+ across Oakland County, including the Birmingham–Bloomfield corridor. She knows the sub-markets, the school boundaries, and how to price and present an estate property so it sells for what it's worth.",
  ],
  chooseTip1: (
    <>
      Bloomfield Hills is estate country, so the best agent brings luxury marketing, discretion, and real experience
      with high-value Oakland County homes — not generic MLS blasting. Sundus specializes in luxury and has closed
      $100M+ across the county, including the Birmingham–Bloomfield corridor.
    </>
  ),
  faqs: [
    {
      question: "Who is the best real estate agent in Bloomfield Hills, MI?",
      answer:
        "There's no single 'best' for everyone, but Bloomfield Hills is a luxury, estate-driven market that rewards an agent with high-end marketing, discretion, and real experience selling expensive Oakland County homes. Sundus Lewis is a strong fit — broker and owner of Real Estate Market Center, a luxury-focused independent, with 20+ years in the business, $100M+ closed, and a perfect 5.0 rating across 70+ Google reviews.",
    },
    {
      question: "Does Sundus Lewis specialize in luxury and estate homes?",
      answer:
        "Yes — it's her core focus. Sundus handles luxury and full-service residential real estate and has closed $100M+ in sales across Oakland County, including Bloomfield Hills and Birmingham. She brings discreet, tailored marketing to estate listings and experienced representation to buyers of high-value homes.",
    },
    {
      question: "What makes Bloomfield Hills real estate different?",
      answer:
        "It's one of Michigan's highest-value markets, defined by large lots, estate properties, and the top-rated Bloomfield Hills Schools. Because the homes and the buyers are at the high end, marketing, pricing precision, and discretion matter more than in a typical suburb — and a mispriced or poorly marketed luxury listing can sit. Sundus prices and presents estate homes to sell at their true value.",
    },
    {
      question: "How much does a luxury real estate agent cost in Bloomfield Hills?",
      answer:
        "Commissions are fully negotiable and not set by law; the common Michigan range is about 5–6% of the sale price, with buyer-agent compensation negotiated separately since the 2024 NAR settlement. On Bloomfield Hills' higher price points the dollars are significant, so it's worth discussing structure up front — Sundus lays out your options before you commit.",
    },
    {
      question: "Is Sundus based in Bloomfield Hills?",
      answer:
        "Sundus is based minutes away in Troy, where Real Estate Market Center is headquartered, and works the Birmingham–Bloomfield luxury corridor closely. Being an independent, owner-run brokerage means you get a personal, discreet experience rather than a franchise desk — with full command of the Bloomfield Hills market.",
    },
  ],
  cityPage: { href: "/bloomfield-hills-real-estate-agent", label: "See our full Bloomfield Hills real estate guide" },
  brokeragePage: { href: "/best-real-estate-brokerages-bloomfield-hills", label: "Compare the best Bloomfield Hills brokerages" },
  metaTitle: "Best Real Estate Agent in Bloomfield Hills, MI | Sundus Lewis, Luxury Broker | Real Estate Market Center",
  metaDescription:
    "Looking for the best luxury real estate agent in Bloomfield Hills, MI? Meet Sundus Lewis — broker & owner of Real Estate Market Center, luxury specialist, $100M+ closed, 5.0 across 70+ Google reviews.",
};

export const metadata: Metadata = bestAgentMetadata(data);

export default function Page() {
  return <BestAgentPage data={data} />;
}
