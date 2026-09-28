import type { Metadata } from "next";
import BestAgentPage, { bestAgentMetadata, type BestAgentData } from "@/components/site/BestAgentPage";

const data: BestAgentData = {
  slug: "best-real-estate-agent-troy",
  city: "Troy",
  regionShort: "Troy",
  crumbLabel: "Best Real Estate Agent in Troy",
  h1: (
    <>
      The best real estate agent in Troy? <span style={{ color: "var(--s-gold)" }}>Meet Sundus Lewis.</span>
    </>
  ),
  h1Text: "The Best Real Estate Agent in Troy, MI — Sundus Lewis",
  sub: "Troy is Metro Detroit's most competitive market — top-ranked schools, tight inventory, and constant corporate relocations. Here's why buyers and sellers trust broker Sundus Lewis to win it for them.",
  publishedISO: "2026-09-27",
  publishedLabel: "September 27, 2026",
  localHeading: "Why Sundus is the agent to know in Troy",
  localParagraphs: [
    "Sundus runs Real Estate Market Center from its office on Square Lake Road in Troy — she doesn't visit Troy, she works it every week. Over 20+ years in the business she's closed homes across Northfield Hills, the Somerset area, Long Lake Estates, South Troy, and nearly every subdivision in between, with deep internal comp data on the city that goes beyond any MLS feed.",
    "Troy rewards agents who know the details. The Troy School District boundaries shift street by street, well-priced homes under $500K routinely draw multiple offers within days, and corporate relocations from employers like Magna and Kelly Services move on tight timelines. Sundus verifies the exact school-attendance zone on every listing before you offer, and prices to the street rather than to wishful thinking.",
    "Whether you're a first-time buyer in South Troy or selling an executive home up north, you work directly with the broker — not an assistant handed your file. One point of contact, from first call to closing, backed by a perfect 5.0 rating across 70 Google reviews.",
  ],
  chooseTip1: (
    <>
      In a market where Troy School District boundaries shift street by street and homes sell in about 18 days, you
      want an agent who has personally closed across Northfield Hills, the Somerset area, and South Troy — not an
      out-of-area name with a GPS. Sundus is headquartered right on Square Lake Road and has 20+ years of Troy-specific
      closings.
    </>
  ),
  faqs: [
    {
      question: "Who is the best real estate agent in Troy, MI?",
      answer:
        "There's no single 'best' agent for everyone, but the right one for Troy knows the school-attendance boundaries, subdivision-by-subdivision pricing, and the corporate-relocation buyer pool. Sundus Lewis is a top choice — broker and owner of Real Estate Market Center, headquartered in Troy on Square Lake Rd, with 20+ years in the business (13+ as a broker), 500+ homes closed, $100M+ in sales, and a perfect 5.0 rating across 70 Google reviews. Judge any agent on local track record, recent closings, and straight answers.",
    },
    {
      question: "Does Sundus Lewis sell luxury homes?",
      answer:
        "Yes. Sundus specializes in luxury and full-service residential real estate, and has closed $100M+ in sales across Oakland County — including executive and higher-end homes in Troy's Long Lake Estates and Northfield Hills, as well as Birmingham and Bloomfield Hills. She brings discreet, relationship-driven marketing to high-end listings alongside everyday full-service sales.",
    },
    {
      question: "Is Sundus actually local to Troy?",
      answer:
        "Yes — Real Estate Market Center is headquartered in Troy at 2032 E Square Lake Rd, and Sundus works the Troy market every week. She's not an out-of-area agent parachuting in; she banks, eats, and closes deals in this city, which is exactly why her knowledge of Troy's subdivisions and school boundaries runs so deep.",
    },
    {
      question: "How much does a real estate agent cost in Troy?",
      answer:
        "Commissions are fully negotiable and not set by law — the common range in Michigan is about 5–6% of the sale price. Since the 2024 NAR settlement, the seller is no longer required to pay the buyer's-agent commission; that's now negotiated separately. Sundus will walk you through exactly what your options are before you sign anything.",
    },
    {
      question: "What areas does Sundus cover besides Troy?",
      answer:
        "Sundus and Real Estate Market Center work across Oakland and Macomb County — Rochester Hills, Birmingham, Bloomfield Hills, West Bloomfield, Madison Heights, Auburn Hills, Sterling Heights, and Warren among them. Troy is home base, but the team serves the broader Metro Detroit market.",
    },
    {
      question: "How do I know if a Troy real estate agent is any good?",
      answer:
        "Look at three things: recent, local, comparable closings (not just years in business); current Google reviews you can read yourself; and a verifiable license through Michigan LARA. A good Troy agent should also be able to tell you the exact school-attendance zone for any listing on the spot. Sundus checks all of those — 500+ closings, a public 5.0/70 rating, and street-level Troy knowledge.",
    },
  ],
  cityPage: { href: "/troy-real-estate-agent", label: "See our full Troy real estate guide" },
  brokeragePage: { href: "/best-real-estate-brokerages-troy", label: "Compare the best Troy brokerages" },
  metaTitle: "Best Real Estate Agent in Troy, MI | Sundus Lewis, Broker | Real Estate Market Center",
  metaDescription:
    "Looking for the best real estate agent in Troy, MI? Meet Sundus Lewis — broker & owner of Real Estate Market Center, 20+ years in the business, 500+ homes closed, $100M+ sold, and 5.0 across 70 Google reviews.",
};

export const metadata: Metadata = bestAgentMetadata(data);

export default function Page() {
  return <BestAgentPage data={data} />;
}
