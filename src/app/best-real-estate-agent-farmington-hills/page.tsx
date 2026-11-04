import type { Metadata } from "next";
import BestAgentPage, { bestAgentMetadata, type BestAgentData } from "@/components/site/BestAgentPage";

const data: BestAgentData = {
  slug: "best-real-estate-agent-farmington-hills",
  city: "Farmington Hills",
  regionShort: "Farmington Hills",
  crumbLabel: "Best Real Estate Agent in Farmington Hills",
  h1: (
    <>
      The best real estate agent in Farmington Hills? <span style={{ color: "var(--s-gold)" }}>Meet Sundus Lewis.</span>
    </>
  ),
  h1Text: "The Best Real Estate Agent in Farmington Hills, MI — Sundus Lewis",
  sub: "Farmington Hills is one of Oakland County's largest, most established suburbs — a huge range of homes, solid schools, and dependable value. Here's why buyers and sellers trust broker Sundus Lewis.",
  publishedISO: "2026-11-04",
  publishedLabel: "November 4, 2026",
  localHeading: "Why Sundus is the agent to know in Farmington Hills",
  localParagraphs: [
    "Farmington Hills is big and varied — ranches and colonials from several decades, newer subdivisions, and wooded, larger-lot pockets, spread across a wide area. Price and demand shift a lot from one neighborhood to the next, so a city-wide guess doesn't cut it. Sundus has closed across the city and prices street by street.",
    "The city also spans more than one school district — much of it is Farmington Public Schools, with areas feeding other districts — and the right subdivision depends on your commute and budget. As broker and owner of Real Estate Market Center, Sundus verifies the school assignment on every listing and gives you one point of contact from first call to closing.",
  ],
  chooseTip1: (
    <>
      Farmington Hills is large and varied, with prices and school boundaries that shift neighborhood to neighborhood,
      so you want an agent who prices to the specific area and verifies the school zone before you offer &mdash; which is
      how Sundus works.
    </>
  ),
  faqs: [
    {
      question: "Who is the best real estate agent in Farmington Hills, MI?",
      answer:
        "There's no single 'best' for everyone, but Farmington Hills is a large, varied market where pricing and school boundaries change from neighborhood to neighborhood — so you want an agent with real street-level knowledge. Sundus Lewis is a strong choice — broker and owner of Real Estate Market Center, with 20+ years in the business, 500+ homes closed, $100M+ sold, and a perfect 5.0 rating across 105+ Google reviews.",
    },
    {
      question: "Is Farmington Hills a good place to buy a home?",
      answer:
        "Farmington Hills offers dependable value for its location — an established, well-run suburb with a wide range of homes, solid schools, parks, and quick access to the M-5, I-696, and I-275. It's a strong fit for buyers who want space and stability close to the job centers. Sundus can match you to the right neighborhood.",
    },
    {
      question: "What school district is Farmington Hills in?",
      answer:
        "Much of Farmington Hills is served by Farmington Public Schools, but parts of the city feed other districts — boundaries don't follow the city line. Sundus verifies the exact school assignment for any address before you make an offer.",
    },
    {
      question: "Does Sundus Lewis sell luxury homes in Farmington Hills?",
      answer:
        "Yes — luxury and full-service residential are her specialty. She's closed $100M+ across Oakland County, including higher-end and larger-lot homes in Farmington Hills and nearby communities. You get the broker handling your sale or search personally.",
    },
    {
      question: "How do I choose a good Farmington Hills agent?",
      answer:
        "Weigh recent local closings, current Google reviews you can read yourself, and a license verifiable through Michigan LARA. In a city this large, local, neighborhood-level knowledge matters most. Sundus offers 500+ closings and a public 5.0 rating across 105+ reviews.",
    },
  ],
  cityPage: { href: "/homes", label: "Browse Farmington Hills homes for sale" },
  brokeragePage: { href: "/best-real-estate-brokerages-oakland-county", label: "Best brokerages in Oakland County" },
  metaTitle: "Best Real Estate Agent in Farmington Hills, MI | Sundus Lewis, Broker | Real Estate Market Center",
  metaDescription:
    "Looking for the best real estate agent in Farmington Hills, MI? Meet Sundus Lewis — broker & owner of Real Estate Market Center, 20+ years, 500+ homes closed, $100M+ sold, 5.0 across 105+ Google reviews.",
};

export const metadata: Metadata = bestAgentMetadata(data);

export default function Page() {
  return <BestAgentPage data={data} />;
}
