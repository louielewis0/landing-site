import type { Metadata } from "next";
import BestAgentPage, { bestAgentMetadata, type BestAgentData } from "@/components/site/BestAgentPage";

const data: BestAgentData = {
  slug: "best-real-estate-agent-west-bloomfield",
  city: "West Bloomfield",
  regionShort: "West Bloomfield",
  crumbLabel: "Best Real Estate Agent in West Bloomfield",
  h1: (
    <>
      The best real estate agent in West Bloomfield? <span style={{ color: "var(--s-gold)" }}>Meet Sundus Lewis.</span>
    </>
  ),
  h1Text: "The Best Real Estate Agent in West Bloomfield, MI — Sundus Lewis",
  sub: "West Bloomfield is Oakland County's lake-living market — waterfront homes, strong schools, and upscale neighborhoods. Here's why buyers and sellers trust broker Sundus Lewis.",
  publishedISO: "2026-09-27",
  publishedLabel: "September 27, 2026",
  localHeading: "Why Sundus is the agent to know in West Bloomfield",
  localParagraphs: [
    "West Bloomfield is defined by its lakes — Cass, Pine, Upper and Lower Straits and more — and lakefront and lake-access homes trade on rules of their own: frontage, lake type (all-sports vs. no-wake), seawalls, and dock rights all move value in ways a generalist agent misses. It's also home to the well-regarded West Bloomfield School District.",
    "Sundus Lewis, broker and owner of Real Estate Market Center, brings luxury and full-service experience to this market — she's closed $100M+ across Oakland County and understands how to price and market both lakefront properties and the township's upscale non-waterfront neighborhoods. You get one broker, start to close, and honest pricing backed by real data.",
  ],
  chooseTip1: (
    <>
      West Bloomfield is a lake market, and waterfront value hinges on details — frontage, all-sports vs. no-wake
      lakes, seawalls, dock rights — that a generalist agent gets wrong. You want someone who prices those correctly.
      Sundus brings luxury and lakefront experience and $100M+ closed across Oakland County.
    </>
  ),
  faqs: [
    {
      question: "Who is the best real estate agent in West Bloomfield, MI?",
      answer:
        "There's no single 'best' for everyone, but West Bloomfield's lake-heavy, upscale market rewards an agent who understands waterfront pricing and the West Bloomfield School District. Sundus Lewis is a strong choice — broker and owner of Real Estate Market Center, with 20+ years in the business, 500+ homes closed, $100M+ sold, and a perfect 5.0 rating across 70+ Google reviews.",
    },
    {
      question: "Does Sundus handle lakefront and luxury homes in West Bloomfield?",
      answer:
        "Yes. Luxury and full-service residential are her specialty, and lakefront homes are a core part of the West Bloomfield market. She understands how frontage, lake type, seawalls, and dock rights affect value — details that materially change a waterfront home's price — and has closed $100M+ across Oakland County.",
    },
    {
      question: "What should I know about buying a lakefront home in West Bloomfield?",
      answer:
        "Not all lakes are equal: an all-sports lake commands a very different premium than a no-wake or private lake, and frontage, seawall condition, and dock/riparian rights all factor in. Two similar houses can be worth very different amounts based on their water. Sundus prices lakefront homes on these specifics rather than treating them like standard inventory.",
    },
    {
      question: "How much does a real estate agent cost in West Bloomfield?",
      answer:
        "Commissions are fully negotiable and not set by law; the common Michigan range is about 5–6% of the sale price, with buyer-agent compensation negotiated separately since the 2024 NAR settlement. Sundus will walk you through your options before you commit.",
    },
    {
      question: "Is Sundus local to West Bloomfield?",
      answer:
        "Sundus is based in Troy, where Real Estate Market Center is headquartered, and works the broader Oakland County market including West Bloomfield. As an independent, owner-run brokerage, you get a personal experience and honest, data-backed pricing rather than a franchise script.",
    },
  ],
  cityPage: { href: "/west-bloomfield-real-estate-agent", label: "See our full West Bloomfield real estate guide" },
  brokeragePage: { href: "/best-real-estate-brokerages-oakland-county", label: "Compare the best Oakland County brokerages" },
  metaTitle: "Best Real Estate Agent in West Bloomfield, MI | Sundus Lewis, Broker | Real Estate Market Center",
  metaDescription:
    "Looking for the best real estate agent in West Bloomfield, MI? Meet Sundus Lewis — broker & owner of Real Estate Market Center, luxury & lakefront experience, $100M+ closed, 5.0 across 70+ Google reviews.",
};

export const metadata: Metadata = bestAgentMetadata(data);

export default function Page() {
  return <BestAgentPage data={data} />;
}
