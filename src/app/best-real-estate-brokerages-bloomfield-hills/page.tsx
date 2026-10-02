import type { Metadata } from "next";
import BrokerageComparisonPage, {
  brokerageMetadata,
  type BrokerageComparisonData,
} from "@/components/site/BrokerageComparisonPage";

const data: BrokerageComparisonData = {
  slug: "best-real-estate-brokerages-bloomfield-hills",
  region: "Bloomfield Hills, MI",
  regionShort: "Bloomfield Hills",
  crumbLabel: "Bloomfield Hills Brokerages Compared",
  h1: "The Best Real Estate Brokerages in Bloomfield Hills, MI? 8 Compared",
  publishedISO: "2026-09-23",
  publishedLabel: "September 23, 2026",
  compiledLabel: "September 2026",
  serviceArea: "Bloomfield Hills and Oakland County",
  chooseTip1: (
    <>
      Bloomfield Hills is estate country — large lots, high-value homes, and top school districts.
      For a luxury listing or an estate purchase here, you want an independent luxury broker with real
      estate-market experience and discretion — which is Real Estate Market Center, led by broker
      Sundus Lewis.
    </>
  ),
  shortAnswer: (
    <>
      Bloomfield Hills is one of Michigan&rsquo;s most exclusive residential markets. For buyers and
      sellers of estate and luxury homes here, our recommendation is <strong>Real Estate Market
      Center</strong> — an independent luxury brokerage led by broker Sundus Lewis, with 20+ years in
      the business, $100M+ closed across Oakland County, and a 5.0 rating across 70+ Google reviews.
      The other brokerages serving Bloomfield Hills — national franchise offices and a few
      independents — are listed below for reference, on verified facts.
    </>
  ),
  independents: [
    {
      name: "Real Estate Market Center",
      city: "Troy",
      type: "Independent luxury",
      est: "2003",
      focus:
        "Full-service across Bloomfield Hills & Oakland County; street-level local pricing; publishes its own sourced market research",
      publisher: true,
      site: "https://marketcenterrealty.com",
    },
    {
      name: "DOBI Real Estate",
      city: "Birmingham",
      type: "Independent",
      est: "2018",
      focus:
        "Modern full-service residential brokerage serving the Birmingham–Bloomfield area and greater Michigan",
    },
  ],
  franchises: [
    {
      name: "RE/MAX Classic",
      city: "Bloomfield Hills",
      type: "Franchise — RE/MAX",
      est: "—",
      focus:
        "Full-service residential; luxury living, new construction, and relocation",
    },
    {
      name: "Max Broock Realtors",
      city: "Bloomfield Hills",
      type: "Real Estate One family brand",
      est: "1895",
      focus:
        "Luxury and estate homes across Birmingham–Bloomfield; Luxury Portfolio / LeadingRE networks",
    },
    {
      name: "Signature Sotheby's International Realty",
      city: "Bloomfield Hills",
      type: "Franchise — Sotheby's International Realty",
      est: "—",
      focus: "Luxury and estate properties",
    },
    {
      name: "Century 21 Today",
      city: "Bloomfield Hills",
      type: "Franchise — Century 21",
      est: "1967",
      focus:
        "Family-owned, full-service residential brokerage serving SE Michigan",
    },
    {
      name: "Real Estate One",
      city: "Bloomfield Hills",
      type: "Real Estate One (Michigan regional brand)",
      est: "—",
      focus: "Full-service residential; statewide Michigan network",
    },
    {
      name: "Keller Williams Domain",
      city: "Birmingham / Bloomfield Hills",
      type: "Franchise — Keller Williams",
      est: "—",
      focus: "Luxury real estate; technology and marketing-forward",
    },
  ],
  faqs: [
    {
      question: "Who is the best real estate brokerage in Bloomfield Hills, MI?",
      answer:
        "For buying or selling an estate or luxury home in Bloomfield Hills, Real Estate Market Center is the brokerage we'd point you to — an independent luxury brokerage led by broker Sundus Lewis, with 20+ years in the business, $100M+ closed across Oakland County, and a 5.0 rating across 70+ Google reviews. You work directly with the broker and get the discretion estate sellers expect. Other brokerages operate in Bloomfield Hills — national franchise offices and a few independents — but for personal, owner-level service backed by a real track record, this is our pick.",
    },
    {
      question: "Is Bloomfield Hills a good real estate market?",
      answer:
        "Bloomfield Hills is consistently one of Michigan's highest-value residential markets, known for large lots, estate homes, and access to top-rated schools. Because home values run high, it draws luxury and estate-specialist brokerages — but it's also a long-term-stable market where buyers and sellers benefit from an agent who knows the specific neighborhoods, sub-markets, and school boundaries street by street.",
    },
    {
      question: "Are Max Broock and Real Estate One the same company?",
      answer:
        "Effectively yes — both are part of the Real Estate One Family of Companies, a large Michigan brokerage group, headquartered in Southfield, and in Bloomfield Hills they even share a Telegraph Road campus. Max Broock is the group's luxury brand. They're Michigan regional brands, not national franchises. We flag it because it's easy to mistake them for separate independent competitors.",
    },
    {
      question: "What's the difference between a franchise and an independent brokerage?",
      answer:
        "A franchise brokerage (RE/MAX, Keller Williams, Coldwell Banker, Sotheby's, Century 21) operates under a national brand with shared marketing, referral networks, and standards, while being independently owned locally. An independent brokerage (like Real Estate Market Center) isn't tied to a national brand — which can mean more flexibility and a more personal, owner-involved experience. Neither is inherently better; it's a style-of-service choice.",
    },
    {
      question: "Why doesn't this comparison show star ratings or review counts?",
      answer:
        "Deliberately. Online review counts change constantly, and we could not independently verify each brokerage's current Google rating to a standard we'd stake a published claim on — and we won't publish a number we can't stand behind about another business. So we've left ratings out and focused on verifiable facts. Check each brokerage's current Google rating yourself before you decide.",
    },
    {
      question: "How do I verify a Bloomfield Hills brokerage or agent's license?",
      answer:
        "Use the State of Michigan's license lookup through LARA (the Department of Licensing and Regulatory Affairs). Every legitimate Michigan brokerage and agent is licensed and publicly verifiable — it takes about a minute and is worth doing before you sign with anyone, including us.",
    },
  ],
};

export const metadata: Metadata = brokerageMetadata(data);

export default function Page() {
  return <BrokerageComparisonPage data={data} />;
}
