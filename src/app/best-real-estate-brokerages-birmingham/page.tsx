import type { Metadata } from "next";
import BrokerageComparisonPage, {
  brokerageMetadata,
  type BrokerageComparisonData,
} from "@/components/site/BrokerageComparisonPage";

const data: BrokerageComparisonData = {
  slug: "best-real-estate-brokerages-birmingham",
  region: "Birmingham, MI",
  regionShort: "Birmingham",
  crumbLabel: "Birmingham Brokerages Compared",
  h1: "The Best Real Estate Brokerages in Birmingham, MI? 8 Compared",
  publishedISO: "2026-09-23",
  publishedLabel: "September 23, 2026",
  compiledLabel: "September 2026",
  serviceArea: "Birmingham and Oakland County",
  chooseTip1: (
    <>
      Selling or buying a luxury or estate home along Old Woodward? The luxury brands (Max
      Broock, Signature Sotheby&rsquo;s, Coldwell Banker Weir Manuel, Hall &amp; Hunter) are built for
      that market. Buying a first home, a condo, or an investment property in or around Birmingham? A
      full-service independent may give you a more personal, owner-involved experience.
    </>
  ),
  shortAnswer: (
    <>
      Birmingham is Metro Detroit&rsquo;s luxury real-estate capital, and its brokerages reflect that.
      A cluster of <strong>luxury franchise and boutique brands</strong> — Max Broock, Signature
      Sotheby&rsquo;s International Realty, Coldwell Banker Weir Manuel, Keller Williams Domain, and
      The Agency Hall &amp; Hunter — line Old Woodward and dominate the high-end market. A smaller set
      of <strong>independents</strong> — Real Estate Market Center, DOBI, and Brookstone — compete on
      personal service and flexibility across Birmingham and the broader county. There&rsquo;s no
      single &ldquo;best&rdquo;: match the brokerage to your property type and how hands-on you want
      your agent. All eight are compared below on verified facts.
    </>
  ),
  independents: [
    {
      name: "Real Estate Market Center",
      city: "Troy",
      type: "Independent, family-run",
      est: "2003",
      focus:
        "Full-service across Birmingham & Oakland County; street-level local pricing; publishes its own sourced market research",
      publisher: true,
      site: "https://marketcenterrealty.com",
    },
    {
      name: "DOBI Real Estate",
      city: "Birmingham",
      type: "Independent",
      est: "2018",
      focus:
        "Modern full-service residential brokerage serving Birmingham and greater Michigan; in-house marketing and agent support",
    },
    {
      name: "Brookstone Realtors",
      city: "Birmingham",
      type: "Independent",
      est: "—",
      focus:
        "Agent-owned, agent-centric brokerage; full-service residential across the Birmingham area",
    },
  ],
  franchises: [
    {
      name: "Max Broock Realtors",
      city: "Birmingham",
      type: "Real Estate One family (Michigan's largest brokerage group)",
      est: "1895",
      focus:
        "Luxury and estate homes on Old Woodward; Luxury Portfolio / LeadingRE networks",
    },
    {
      name: "Signature Sotheby's International Realty",
      city: "Birmingham",
      type: "Franchise — Sotheby's International Realty",
      est: "—",
      focus: "Luxury and estate properties across Birmingham–Bloomfield",
    },
    {
      name: "Coldwell Banker Weir Manuel",
      city: "Birmingham",
      type: "Franchise — Coldwell Banker",
      est: "1950",
      focus: "Luxury / premier properties; Coldwell Banker Global Luxury",
    },
    {
      name: "Keller Williams Domain",
      city: "Birmingham",
      type: "Franchise — Keller Williams",
      est: "—",
      focus: "Luxury real estate; technology and marketing-forward",
    },
    {
      name: "The Agency Hall & Hunter",
      city: "Birmingham",
      type: "Franchise — The Agency",
      est: "1954",
      focus:
        "Luxury boutique; longtime SE Michigan firm now part of The Agency's global network",
    },
  ],
  faqs: [
    {
      question: "Who is the best real estate brokerage in Birmingham, MI?",
      answer:
        "There's no single 'best' — it depends on your property and the service you want. For luxury and estate homes along Old Woodward, the established luxury brands (Max Broock, Signature Sotheby's, Coldwell Banker Weir Manuel, The Agency Hall & Hunter) specialize there. For a personal, independent, full-service experience across Birmingham and Oakland County, boutique independents like Real Estate Market Center and DOBI compete on service and local knowledge. Match the brokerage to your property type and how hands-on you want your agent to be.",
    },
    {
      question: "Why is Birmingham such a luxury-heavy real estate market?",
      answer:
        "Birmingham (ZIP 48009) is one of Metro Detroit's most affluent and walkable downtowns, with high home values and a concentration of estate properties in and around it. That's why so many national and regional luxury brands cluster their offices on and near Old Woodward Avenue — it's where the high-end inventory and buyers are. It also means buyers of more modest homes still have strong independent options; you're not required to use a luxury brand.",
    },
    {
      question: "Are Max Broock and Real Estate One the same company?",
      answer:
        "Effectively yes — both are part of the Real Estate One Family of Companies, Michigan's largest brokerage group, headquartered in Southfield. Max Broock is its luxury brand. They're Michigan regional brands, not national franchises like RE/MAX or Keller Williams. We flag this because it's easy to mistake them for separate independent competitors when comparing brokerages.",
    },
    {
      question: "What's the difference between a franchise and an independent brokerage?",
      answer:
        "A franchise brokerage (RE/MAX, Keller Williams, Coldwell Banker, Sotheby's, The Agency) operates under a national brand with shared marketing, referral networks, and standards, while being independently owned locally. An independent brokerage (like Real Estate Market Center) isn't tied to a national brand — which can mean more flexibility and a more personal, owner-involved experience. Neither is inherently better; it's a style-of-service choice.",
    },
    {
      question: "Why doesn't this comparison show star ratings or review counts?",
      answer:
        "Deliberately. Online review counts change constantly, and we could not independently verify each brokerage's current Google rating to a standard we'd stake a published claim on — and we won't publish a number we can't stand behind about another business. So we've left ratings out and focused on verifiable facts (type, tenure, location, specialty). Check each brokerage's current Google rating yourself before you decide; that's the honest way to use review data.",
    },
    {
      question: "How do I verify a Birmingham brokerage or agent's license?",
      answer:
        "Use the State of Michigan's license lookup through LARA (the Department of Licensing and Regulatory Affairs). Every legitimate Michigan brokerage and agent is licensed and publicly verifiable — it takes about a minute and is worth doing before you sign with anyone, including us.",
    },
  ],
};

export const metadata: Metadata = brokerageMetadata(data);

export default function Page() {
  return <BrokerageComparisonPage data={data} />;
}
