import type { Metadata } from "next";
import BestAgentPage, { bestAgentMetadata, type BestAgentData } from "@/components/site/BestAgentPage";

const data: BestAgentData = {
  slug: "best-real-estate-agent-royal-oak",
  city: "Royal Oak",
  regionShort: "Royal Oak",
  crumbLabel: "Best Real Estate Agent in Royal Oak",
  h1: (
    <>
      The best real estate agent in Royal Oak? <span style={{ color: "var(--s-gold)" }}>Meet Sundus Lewis.</span>
    </>
  ),
  h1Text: "The Best Real Estate Agent in Royal Oak, MI — Sundus Lewis",
  sub: "Royal Oak is one of Metro Detroit's most active, in-demand markets — a walkable downtown, strong rental and resale demand, and homes that move fast. Here's why buyers and sellers trust broker Sundus Lewis.",
  publishedISO: "2026-11-04",
  publishedLabel: "November 4, 2026",
  localHeading: "Why Sundus is the agent to know in Royal Oak",
  localParagraphs: [
    "Royal Oak moves. The downtown scene, the walkability, and the mix of classic bungalows and newer builds keep demand high and days on market low — well-priced, move-in-ready homes routinely draw multiple offers. That speed rewards an agent who can price precisely and act fast, which is exactly how Sundus works.",
    "Royal Oak's housing stock is unusually varied for one city — pre-war bungalows, mid-century ranches, and new-construction infill, often on the same block, each priced differently. As broker and owner of Real Estate Market Center, Sundus prices street by street, prepares a home to win in a competitive market, and gives you one point of contact from first call to closing.",
  ],
  chooseTip1: (
    <>
      Royal Oak is a fast, competitive market with wildly varied housing on the same streets, so you want an agent who
      prices precisely and can win multiple-offer situations &mdash; which is how Sundus works.
    </>
  ),
  faqs: [
    {
      question: "Who is the best real estate agent in Royal Oak, MI?",
      answer:
        "There's no single 'best' for everyone, but Royal Oak's fast, competitive market rewards an agent who prices precisely, preps a home to stand out, and can win multiple-offer situations. Sundus Lewis is a strong choice — broker and owner of Real Estate Market Center, with 20+ years in the business, 500+ homes closed, $100M+ sold, and a perfect 5.0 rating across 105+ Google reviews.",
    },
    {
      question: "Do homes sell fast in Royal Oak?",
      answer:
        "Yes — Royal Oak is one of the most in-demand markets in the area, and well-priced, move-in-ready homes often sell quickly and draw multiple offers. That makes pricing and preparation critical. Sundus helps sellers win on terms and helps buyers compete without overpaying.",
    },
    {
      question: "What kinds of homes are in Royal Oak?",
      answer:
        "Royal Oak has an unusually varied housing stock — pre-war bungalows, mid-century ranches, and new-construction infill, sometimes on the same block. Each prices differently, so street-level knowledge matters. Sundus prices to the specific home and location rather than to a city-wide average.",
    },
    {
      question: "Does Sundus Lewis handle both buyers and sellers in Royal Oak?",
      answer:
        "Yes. As broker and owner of Real Estate Market Center, Sundus represents buyers and sellers across Royal Oak and the surrounding Oakland County communities, with 500+ closings and $100M+ in sales. You work directly with the broker from first call to closing.",
    },
    {
      question: "How do I choose a good Royal Oak agent?",
      answer:
        "Weigh recent local closings, current Google reviews you can read yourself, and a license verifiable through Michigan LARA — and in a fast market, an agent's track record on pricing and multiple offers. Sundus offers 500+ closings and a public 5.0 rating across 105+ reviews.",
    },
  ],
  cityPage: { href: "/homes", label: "Browse Royal Oak homes for sale" },
  brokeragePage: { href: "/best-real-estate-brokerages-oakland-county", label: "Best brokerages in Oakland County" },
  metaTitle: "Best Real Estate Agent in Royal Oak, MI | Sundus Lewis, Broker | Real Estate Market Center",
  metaDescription:
    "Looking for the best real estate agent in Royal Oak, MI? Meet Sundus Lewis — broker & owner of Real Estate Market Center, 20+ years, 500+ homes closed, $100M+ sold, 5.0 across 105+ Google reviews.",
};

export const metadata: Metadata = bestAgentMetadata(data);

export default function Page() {
  return <BestAgentPage data={data} />;
}
