import type { Metadata } from "next";
import BestAgentPage, { bestAgentMetadata, type BestAgentData } from "@/components/site/BestAgentPage";

const data: BestAgentData = {
  slug: "best-real-estate-agent-birmingham",
  city: "Birmingham",
  regionShort: "Birmingham",
  crumbLabel: "Best Real Estate Agent in Birmingham",
  h1: (
    <>
      The best real estate agent in Birmingham? <span style={{ color: "var(--s-gold)" }}>Meet Sundus Lewis.</span>
    </>
  ),
  h1Text: "The Best Real Estate Agent in Birmingham, MI — Sundus Lewis",
  sub: "Birmingham is Metro Detroit's luxury capital — a fast, high-stakes, relationship-driven market. Here's why sellers of high-end homes and discerning buyers trust broker Sundus Lewis.",
  publishedISO: "2026-09-27",
  publishedLabel: "September 27, 2026",
  localHeading: "Why Sundus is the agent to know in Birmingham",
  localParagraphs: [
    "Birmingham is where Metro Detroit's luxury market concentrates — the walkable Old Woodward downtown, estate homes, and block-by-block premiums from Poppleton Park to Quarton. It's also one of the fastest, most competitive markets in the region, where winning comes down to pricing precision, marketing, and relationships with the agents who control inventory.",
    "That's Sundus Lewis's specialty. As broker and owner of Real Estate Market Center, she focuses on luxury and full-service residential real estate and has closed $100M+ in sales across Oakland County — bringing discreet, high-end marketing to Birmingham-area listings and sharp negotiation to buyers competing in multiple-offer situations. She understands the micro-premiums that keep you from overpaying in Poppleton Park or getting priced out of Quarton.",
    "In a market this high-stakes, representation quality is the difference between winning a home and losing five bids — or between a luxury listing that sells for full value and one that sits. You work directly with the broker, start to close, backed by a perfect 5.0 rating across 70 Google reviews.",
  ],
  chooseTip1: (
    <>
      Birmingham is a luxury, fast-moving, relationship-driven market — the best agent knows the block-by-block
      premiums from Poppleton Park to Quarton and the listing agents who control inventory. Sundus specializes in
      luxury homes and has closed $100M+ across Oakland County, so she competes on structure, timing, and
      relationships, not just price.
    </>
  ),
  faqs: [
    {
      question: "Who is the best real estate agent in Birmingham, MI?",
      answer:
        "There's no single 'best' for everyone, but Birmingham's luxury, multiple-offer market rewards an agent who knows the block-by-block premiums, moves fast, and has relationships with the listing agents controlling inventory. Sundus Lewis is a strong choice — broker and owner of Real Estate Market Center, a luxury-focused independent, with 20+ years in the business (13+ as a broker), $100M+ closed across Oakland County, and a perfect 5.0 rating across 70 Google reviews.",
    },
    {
      question: "Does Sundus Lewis handle luxury and estate homes in Birmingham?",
      answer:
        "Yes — luxury is her specialty. Sundus focuses on high-end, full-service residential real estate and has closed $100M+ in sales across Oakland County, including Birmingham and Bloomfield Hills. She brings discreet, tailored marketing to luxury listings and experienced negotiation to buyers competing for premium Birmingham homes.",
    },
    {
      question: "How competitive is the Birmingham real estate market?",
      answer:
        "Very. Birmingham is one of Metro Detroit's fastest and highest-priced markets, where desirable homes often draw multiple offers and price alone doesn't win. Success comes from an agent who understands the neighborhood-by-neighborhood premiums, can write a strong same-day offer, and has the relationships and marketing to compete — which is exactly what Sundus brings.",
    },
    {
      question: "How much does a luxury real estate agent cost in Birmingham?",
      answer:
        "Commissions are fully negotiable and not set by law; the common Michigan range is about 5–6% of the sale price, and since the 2024 NAR settlement buyer-agent compensation is negotiated separately. On higher-value Birmingham homes the dollars are larger, so it's worth discussing structure up front — Sundus will lay out your options clearly before you commit.",
    },
    {
      question: "Is Sundus based in Birmingham?",
      answer:
        "Sundus is based minutes away in Troy, where Real Estate Market Center is headquartered, and works the Birmingham–Bloomfield luxury corridor closely. Being independent and Troy-based means you get a personal, owner-involved experience rather than a franchise desk — with full familiarity of the Birmingham market.",
    },
    {
      question: "How do I choose the right agent for a Birmingham luxury home?",
      answer:
        "For a luxury sale or purchase, weigh three things: a real track record with higher-end Oakland County homes, a marketing approach suited to luxury buyers (not generic MLS blasting), and discretion. Verify the license through Michigan LARA and read recent Google reviews. Sundus offers $100M+ in closed sales, a luxury specialty, and a public 5.0/70 rating.",
    },
  ],
  cityPage: { href: "/birmingham-real-estate-agent", label: "See our full Birmingham real estate guide" },
  brokeragePage: { href: "/best-real-estate-brokerages-birmingham", label: "Compare the best Birmingham brokerages" },
  metaTitle: "Best Real Estate Agent in Birmingham, MI | Sundus Lewis, Luxury Broker | Real Estate Market Center",
  metaDescription:
    "Looking for the best luxury real estate agent in Birmingham, MI? Meet Sundus Lewis — broker & owner of Real Estate Market Center, luxury specialist, $100M+ closed, and 5.0 across 70 Google reviews.",
};

export const metadata: Metadata = bestAgentMetadata(data);

export default function Page() {
  return <BestAgentPage data={data} />;
}
