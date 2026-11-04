import type { Metadata } from "next";
import BestAgentPage, { bestAgentMetadata, type BestAgentData } from "@/components/site/BestAgentPage";

const data: BestAgentData = {
  slug: "best-real-estate-agent-shelby-township",
  city: "Shelby Township",
  regionShort: "Shelby Township",
  crumbLabel: "Best Real Estate Agent in Shelby Township",
  h1: (
    <>
      The best real estate agent in Shelby Township? <span style={{ color: "var(--s-gold)" }}>Meet Sundus Lewis.</span>
    </>
  ),
  h1Text: "The Best Real Estate Agent in Shelby Township, MI — Sundus Lewis",
  sub: "Shelby Township is one of Macomb County's most sought-after family markets — newer subdivisions, strong schools, and Stony Creek at your back door. Here's why buyers and sellers trust broker Sundus Lewis.",
  publishedISO: "2026-11-04",
  publishedLabel: "November 4, 2026",
  localHeading: "Why Sundus is the agent to know in Shelby Township",
  localParagraphs: [
    "Shelby Township is where a lot of Macomb County buyers want to land — newer construction, larger lots, Stony Creek Metropark, and a strong family feel. Demand for move-in-ready homes is steady, and the newer-subdivision inventory prices differently from the older pockets. Sundus knows the township's neighborhoods and prices to the specific home, not a township-wide average.",
    "Most of Shelby is served by Utica Community Schools, with some areas in other districts, and the right subdivision depends on your commute up the M-53 (Van Dyke) and M-59 corridors. As broker and owner of Real Estate Market Center, Sundus verifies the school assignment on every listing and gives you one point of contact from first call to closing.",
  ],
  chooseTip1: (
    <>
      Shelby Township mixes newer subdivisions with older pockets across more than one school district, so you want an
      agent who prices to the specific neighborhood and verifies the school zone before you offer &mdash; which is how
      Sundus works.
    </>
  ),
  faqs: [
    {
      question: "Who is the best real estate agent in Shelby Township, MI?",
      answer:
        "There's no single 'best' for everyone, but Shelby Township is a strong family market where newer subdivisions price differently from older pockets and school boundaries vary — so neighborhood-level knowledge matters. Sundus Lewis is a strong choice — broker and owner of Real Estate Market Center, with 20+ years in the business, 500+ homes closed, $100M+ sold, and a perfect 5.0 rating across 105+ Google reviews.",
    },
    {
      question: "What school district is Shelby Township in?",
      answer:
        "Most of Shelby Township is served by Utica Community Schools, though some areas feed other districts — boundaries don't follow the township line. Sundus verifies the exact school assignment for any address before you make an offer.",
    },
    {
      question: "Is Shelby Township a good place to buy a home?",
      answer:
        "Shelby Township is one of Macomb County's most popular suburbs — newer housing, larger lots, Stony Creek Metropark, strong schools, and easy access to the M-53 and M-59 corridors. It draws steady family demand, which supports values. Sundus can help you find the right subdivision for your budget.",
    },
    {
      question: "Does Sundus Lewis work in Macomb County?",
      answer:
        "Yes. As broker and owner of Real Estate Market Center, Sundus represents buyers and sellers across Macomb County — including Shelby Township, Washington, Macomb Township, and Sterling Heights — alongside her Oakland County business, with 500+ closings and $100M+ in sales.",
    },
    {
      question: "How do I choose a good Shelby Township agent?",
      answer:
        "Weigh recent local closings, current Google reviews you can read yourself, and a license verifiable through Michigan LARA — and an agent who knows the subdivisions and school boundaries. Sundus offers 500+ closings and a public 5.0 rating across 105+ reviews.",
    },
  ],
  cityPage: { href: "/homes", label: "Browse Shelby Township homes for sale" },
  brokeragePage: { href: "/best-real-estate-brokerages-sterling-heights", label: "Compare nearby Macomb brokerages" },
  metaTitle: "Best Real Estate Agent in Shelby Township, MI | Sundus Lewis, Broker | Real Estate Market Center",
  metaDescription:
    "Looking for the best real estate agent in Shelby Township, MI? Meet Sundus Lewis — broker & owner of Real Estate Market Center, 20+ years, 500+ homes closed, $100M+ sold, 5.0 across 105+ Google reviews.",
};

export const metadata: Metadata = bestAgentMetadata(data);

export default function Page() {
  return <BestAgentPage data={data} />;
}
