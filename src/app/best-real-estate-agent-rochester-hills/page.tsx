import type { Metadata } from "next";
import BestAgentPage, { bestAgentMetadata, type BestAgentData } from "@/components/site/BestAgentPage";

const data: BestAgentData = {
  slug: "best-real-estate-agent-rochester-hills",
  city: "Rochester Hills",
  regionShort: "Rochester Hills",
  crumbLabel: "Best Real Estate Agent in Rochester Hills",
  h1: (
    <>
      The best real estate agent in Rochester Hills? <span style={{ color: "var(--s-gold)" }}>Meet Sundus Lewis.</span>
    </>
  ),
  h1Text: "The Best Real Estate Agent in Rochester Hills, MI — Sundus Lewis",
  sub: "Rochester Hills is one of Oakland County's most desirable family markets — top schools, trails, and strong resale. Here's why buyers and sellers trust broker Sundus Lewis to get it right.",
  publishedISO: "2026-09-27",
  publishedLabel: "September 27, 2026",
  localHeading: "Why Sundus is the agent to know in Rochester Hills",
  localParagraphs: [
    "Rochester Hills rewards an agent who knows how much the market shifts from the Stony-Creek-bordering north end to the downtown-Rochester side, and that Rochester Community Schools boundaries don't follow the city limits. Sundus has closed across the city for years and prices street by street rather than city-wide.",
    "She knows the details that move the needle here: the Paint Creek Trail and Stony Creek premiums, the Clinton River flood pockets, and the Avondale and Romeo boundary areas that catch families off guard. As broker and owner of Real Estate Market Center, she verifies school assignment on every listing and gives you one point of contact from first call to closing.",
  ],
  chooseTip1: (
    <>
      Rochester Hills is a top-district family market where school boundaries don&rsquo;t match city lines and the
      north end prices differently from the downtown-Rochester side. You want an agent who prices street by street and
      verifies the school zone before you offer — which is exactly how Sundus works.
    </>
  ),
  faqs: [
    {
      question: "Who is the best real estate agent in Rochester Hills, MI?",
      answer:
        "There's no single 'best' for everyone, but the right agent for Rochester Hills understands the Rochester Community Schools boundaries (which don't follow city limits), the Paint Creek and Stony Creek premiums, and the flood pockets near the Clinton River. Sundus Lewis is a strong choice — broker and owner of Real Estate Market Center, with 20+ years in the business, 500+ homes closed, $100M+ sold, and a perfect 5.0 rating across 70+ Google reviews.",
    },
    {
      question: "Are Rochester Hills schools really that good?",
      answer:
        "Rochester Community Schools is consistently one of Oakland County's top districts, which is a major driver of the city's strong, stable home values. The catch is that district boundaries don't align neatly with the Rochester Hills city line — some homes feed Avondale or other districts. Sundus verifies the exact school assignment on every listing before you make an offer.",
    },
    {
      question: "Does Sundus Lewis sell luxury homes in Rochester Hills?",
      answer:
        "Yes — luxury and full-service residential are her specialty. She's closed $100M+ across Oakland County, including higher-end homes in Rochester Hills and neighboring Rochester, Bloomfield, and Birmingham. Whether it's a family home near the trails or a luxury property, you get the broker handling it personally.",
    },
    {
      question: "How much does a real estate agent cost in Rochester Hills?",
      answer:
        "Commissions are fully negotiable and not set by law; the common Michigan range is about 5–6% of the sale price, and since the 2024 NAR settlement buyer-agent compensation is negotiated separately. Sundus will explain your options clearly before you commit to anything.",
    },
    {
      question: "How do I choose a good Rochester Hills agent?",
      answer:
        "Weigh recent local closings, current Google reviews you can read yourself, and a license verifiable through Michigan LARA. A strong Rochester Hills agent should also be able to tell you the exact school district for any address on the spot. Sundus offers 500+ closings, a public 5.0/70+ rating, and street-level knowledge of the city.",
    },
  ],
  cityPage: { href: "/rochester-hills-real-estate-agent", label: "See our full Rochester Hills real estate guide" },
  brokeragePage: { href: "/best-real-estate-brokerages-rochester-hills", label: "Compare the best Rochester Hills brokerages" },
  metaTitle: "Best Real Estate Agent in Rochester Hills, MI | Sundus Lewis, Broker | Real Estate Market Center",
  metaDescription:
    "Looking for the best real estate agent in Rochester Hills, MI? Meet Sundus Lewis — broker & owner of Real Estate Market Center, 20+ years, 500+ homes closed, $100M+ sold, 5.0 across 70+ Google reviews.",
};

export const metadata: Metadata = bestAgentMetadata(data);

export default function Page() {
  return <BestAgentPage data={data} />;
}
