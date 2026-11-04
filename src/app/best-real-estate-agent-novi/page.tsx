import type { Metadata } from "next";
import BestAgentPage, { bestAgentMetadata, type BestAgentData } from "@/components/site/BestAgentPage";

const data: BestAgentData = {
  slug: "best-real-estate-agent-novi",
  city: "Novi",
  regionShort: "Novi",
  crumbLabel: "Best Real Estate Agent in Novi",
  h1: (
    <>
      The best real estate agent in Novi? <span style={{ color: "var(--s-gold)" }}>Meet Sundus Lewis.</span>
    </>
  ),
  h1Text: "The Best Real Estate Agent in Novi, MI — Sundus Lewis",
  sub: "Novi is one of Metro Detroit's fastest-moving, most relocation-driven markets — newer subdivisions, top schools, and buyers arriving from all over. Here's why they trust broker Sundus Lewis.",
  publishedISO: "2026-11-04",
  publishedLabel: "November 4, 2026",
  localHeading: "Why Sundus is the agent to know in Novi",
  localParagraphs: [
    "Novi is a relocation magnet — corporate transfers, out-of-state buyers, and families drawn by the schools and the I-96/M-5 access. That means fast-moving inventory and buyers who need an agent who can move quickly and explain a market they don't know yet. Sundus has closed across Novi for years and knows how to position a home for this buyer pool.",
    "The detail that trips people up here: Novi is split across more than one school district — Novi Community Schools, plus pockets that feed Northville or Walled Lake. The boundaries don't follow the city line. As broker and owner of Real Estate Market Center, Sundus verifies the exact district on every listing and gives you one point of contact from first call to closing.",
  ],
  chooseTip1: (
    <>
      Novi is a relocation-heavy market split across several school districts, so you want an agent who prices to
      current demand and confirms the exact district before you offer &mdash; which is exactly how Sundus works.
    </>
  ),
  faqs: [
    {
      question: "Who is the best real estate agent in Novi, MI?",
      answer:
        "There's no single 'best' for everyone, but Novi's fast, relocation-driven market rewards an agent who prices to current demand, moves quickly, and knows the school-district splits. Sundus Lewis is a strong choice — broker and owner of Real Estate Market Center, with 20+ years in the business, 500+ homes closed, $100M+ sold, and a perfect 5.0 rating across 105+ Google reviews.",
    },
    {
      question: "What school district is Novi, MI in?",
      answer:
        "Most of Novi is served by Novi Community Schools, but parts of the city feed Northville or Walled Lake schools — the boundaries don't match the city limits. Sundus verifies the exact school assignment for any address before you make an offer.",
    },
    {
      question: "Is Novi a good place to buy a home?",
      answer:
        "Novi is one of Metro Detroit's most in-demand suburbs — strong schools, newer housing, shopping and dining around Twelve Oaks, and quick freeway access. That draws steady relocation and resale demand, which supports home values. Sundus can walk you through which neighborhoods fit your goals.",
    },
    {
      question: "Does Sundus Lewis sell luxury homes in Novi?",
      answer:
        "Yes — luxury and full-service residential are her specialty. She's closed $100M+ across Oakland County, including higher-end and new-construction homes in Novi and nearby Northville. You get the broker handling your sale or search personally.",
    },
    {
      question: "How do I choose a good Novi agent?",
      answer:
        "Weigh recent local closings, current Google reviews you can read yourself, and a license verifiable through Michigan LARA. A strong Novi agent should also know the school-district boundaries cold. Sundus offers 500+ closings, a public 5.0 rating across 105+ reviews, and street-level knowledge of the city.",
    },
  ],
  cityPage: { href: "/luxury-homes-in-novi", label: "See our Novi luxury homes guide" },
  brokeragePage: { href: "/best-real-estate-brokerages-oakland-county", label: "Best brokerages in Oakland County" },
  metaTitle: "Best Real Estate Agent in Novi, MI | Sundus Lewis, Broker | Real Estate Market Center",
  metaDescription:
    "Looking for the best real estate agent in Novi, MI? Meet Sundus Lewis — broker & owner of Real Estate Market Center, 20+ years, 500+ homes closed, $100M+ sold, 5.0 across 105+ Google reviews.",
};

export const metadata: Metadata = bestAgentMetadata(data);

export default function Page() {
  return <BestAgentPage data={data} />;
}
