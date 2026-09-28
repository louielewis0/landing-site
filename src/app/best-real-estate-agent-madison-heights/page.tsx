import type { Metadata } from "next";
import BestAgentPage, { bestAgentMetadata, type BestAgentData } from "@/components/site/BestAgentPage";

const data: BestAgentData = {
  slug: "best-real-estate-agent-madison-heights",
  city: "Madison Heights",
  regionShort: "Madison Heights",
  crumbLabel: "Best Real Estate Agent in Madison Heights",
  h1: (
    <>
      The best real estate agent in Madison Heights? <span style={{ color: "var(--s-gold)" }}>Meet Sundus Lewis.</span>
    </>
  ),
  h1Text: "The Best Real Estate Agent in Madison Heights, MI — Sundus Lewis",
  sub: "Madison Heights is one of Oakland County's smartest value buys — affordable, central, and fast-moving. Here's why first-time buyers and sellers trust broker Sundus Lewis.",
  publishedISO: "2026-09-27",
  publishedLabel: "September 27, 2026",
  localHeading: "Why Sundus is the agent to know in Madison Heights",
  localParagraphs: [
    "Madison Heights is an affordable, first-time-buyer-friendly market bordering Troy and Royal Oak, with elite freeway access at the I-75/I-696 interchange. It's also split between two school districts — the north-side Lamphere district and the south-side Madison district — with the line running through the city, so the block you buy on can change your child's school.",
    "Sundus Lewis, broker and owner of Real Estate Market Center, works Madison Heights every week from just north in Troy. With 20+ years in the business she verifies the exact school district on every listing, prices to the street in a market where well-priced homes sell in about two weeks, and guides first-time buyers through Michigan down-payment-assistance programs — all with one point of contact from first call to closing.",
  ],
  chooseTip1: (
    <>
      Madison Heights is affordable and fast-moving, and it&rsquo;s split between the Lamphere and Madison school
      districts — so you want an agent who verifies the district before you offer and prices to the street. Sundus
      works the city weekly from nearby Troy and specializes in exactly this kind of value-market execution.
    </>
  ),
  faqs: [
    {
      question: "Who is the best real estate agent in Madison Heights, MI?",
      answer:
        "There's no single 'best,' and Madison Heights has few dedicated agents in the city itself. The right one knows the Lamphere-vs-Madison school split, prices to the street, and moves fast. Sundus Lewis is a strong choice — broker and owner of Real Estate Market Center, working Madison Heights from nearby Troy, with 20+ years in the business, 500+ homes closed, $100M+ sold, and a 5.0 rating across 70+ Google reviews.",
    },
    {
      question: "Which school district will my Madison Heights home be in?",
      answer:
        "It depends on the address — Madison Heights is split. The northern part is served by Lamphere Public Schools and the southern part by Madison District Public Schools, and the two are rated differently. Because the boundary runs through the city, Sundus verifies a specific home's district before you offer, since it affects both schools and resale value.",
    },
    {
      question: "Does Sundus help first-time buyers in Madison Heights?",
      answer:
        "Yes — Madison Heights is one of Oakland County's best entry points, and much of the work here is helping first-time buyers. Sundus walks first-timers through Michigan down-payment-assistance programs (up to $10,000 via MSHDA) and the affordable, move-in-scale homes the city is known for.",
    },
    {
      question: "How much does a real estate agent cost in Madison Heights?",
      answer:
        "Commissions are fully negotiable and not set by law; the common Michigan range is about 5–6% of the sale price, with buyer-agent compensation negotiated separately since the 2024 NAR settlement. Sundus will explain your options before you commit.",
    },
    {
      question: "Is Sundus local to Madison Heights?",
      answer:
        "Yes — Real Estate Market Center is headquartered in Troy, directly north of Madison Heights, and Sundus works the city every week. You get a genuinely local agent who knows its blocks, school split, and freeway pockets — not an out-of-area name.",
    },
  ],
  cityPage: { href: "/madison-heights-real-estate-agent", label: "See our full Madison Heights real estate guide" },
  brokeragePage: { href: "/best-real-estate-brokerages-madison-heights", label: "Compare the best Madison Heights brokerages" },
  metaTitle: "Best Real Estate Agent in Madison Heights, MI | Sundus Lewis, Broker | Real Estate Market Center",
  metaDescription:
    "Looking for the best real estate agent in Madison Heights, MI? Meet Sundus Lewis — broker & owner of Real Estate Market Center, 20+ years, 500+ homes closed, $100M+ sold, 5.0 across 70+ Google reviews.",
};

export const metadata: Metadata = bestAgentMetadata(data);

export default function Page() {
  return <BestAgentPage data={data} />;
}
