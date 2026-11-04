import type { Metadata } from "next";
import BestAgentPage, { bestAgentMetadata, type BestAgentData } from "@/components/site/BestAgentPage";

const data: BestAgentData = {
  slug: "best-real-estate-agent-northville",
  city: "Northville",
  regionShort: "Northville",
  crumbLabel: "Best Real Estate Agent in Northville",
  h1: (
    <>
      The best real estate agent in Northville? <span style={{ color: "var(--s-gold)" }}>Meet Sundus Lewis.</span>
    </>
  ),
  h1Text: "The Best Real Estate Agent in Northville, MI — Sundus Lewis",
  sub: "Northville pairs a storybook walkable downtown with top schools and real estate that holds its value. Here's why buyers and sellers trust broker Sundus Lewis to get it right.",
  publishedISO: "2026-11-04",
  publishedLabel: "November 4, 2026",
  localHeading: "Why Sundus is the agent to know in Northville",
  localParagraphs: [
    "Northville's charm — the historic downtown, the walkability, Maybury State Park — keeps demand high and inventory tight, especially near the center of town. That combination rewards an agent who can price a home to its exact location and move decisively for buyers. Sundus has worked this market for years and knows what a walk-to-downtown address is really worth.",
    "One wrinkle: Northville straddles the Oakland and Wayne county line, and not every 'Northville' address sits in Northville Public Schools or the City of Northville itself (much is Northville Township). As broker and owner of Real Estate Market Center, Sundus confirms the jurisdiction, taxes, and school assignment before you offer, and gives you one point of contact from first call to closing.",
  ],
  chooseTip1: (
    <>
      Northville spans two counties and mixes city, township, and school-district lines, so you want an agent who
      verifies exactly what you&rsquo;re buying &mdash; location, taxes, and schools &mdash; before you offer. That&rsquo;s
      how Sundus works.
    </>
  ),
  faqs: [
    {
      question: "Who is the best real estate agent in Northville, MI?",
      answer:
        "There's no single 'best' for everyone, but Northville's tight, high-demand market rewards an agent who prices to the exact location and verifies the county, taxes, and schools for each address. Sundus Lewis is a strong choice — broker and owner of Real Estate Market Center, with 20+ years in the business, 500+ homes closed, $100M+ sold, and a perfect 5.0 rating across 105+ Google reviews.",
    },
    {
      question: "Is Northville in Oakland or Wayne County?",
      answer:
        "Both — Northville straddles the Oakland/Wayne county line, and there's a difference between the City of Northville and the larger Northville Township. County, taxes, and school assignment can vary by address, so Sundus verifies the exact details before you make an offer.",
    },
    {
      question: "Why are Northville homes in such high demand?",
      answer:
        "Northville offers a rare combination: a walkable historic downtown, highly rated schools, parks like Maybury, and easy access to the I-275/M-14 corridor. Low inventory near downtown keeps values strong. Sundus can show you which pockets fit your budget and lifestyle.",
    },
    {
      question: "Does Sundus Lewis sell luxury homes in Northville?",
      answer:
        "Yes — luxury and full-service residential are her specialty. She's closed $100M+ across the area, including higher-end and estate homes in and around Northville and neighboring Novi. You work directly with the broker, start to finish.",
    },
    {
      question: "How do I choose a good Northville agent?",
      answer:
        "Weigh recent local closings, current Google reviews you can read yourself, and a license verifiable through Michigan LARA. A strong Northville agent should also be able to confirm the county, taxes, and school zone for any address. Sundus offers 500+ closings, a public 5.0 rating across 105+ reviews, and real local knowledge.",
    },
  ],
  cityPage: { href: "/luxury-homes-in-northville", label: "See our Northville luxury homes guide" },
  brokeragePage: { href: "/best-real-estate-brokerages-oakland-county", label: "Best brokerages in Oakland County" },
  metaTitle: "Best Real Estate Agent in Northville, MI | Sundus Lewis, Broker | Real Estate Market Center",
  metaDescription:
    "Looking for the best real estate agent in Northville, MI? Meet Sundus Lewis — broker & owner of Real Estate Market Center, 20+ years, 500+ homes closed, $100M+ sold, 5.0 across 105+ Google reviews.",
};

export const metadata: Metadata = bestAgentMetadata(data);

export default function Page() {
  return <BestAgentPage data={data} />;
}
