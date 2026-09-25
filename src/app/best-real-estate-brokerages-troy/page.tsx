import type { Metadata } from "next";
import BrokerageComparisonPage, {
  brokerageMetadata,
  type BrokerageComparisonData,
} from "@/components/site/BrokerageComparisonPage";

const data: BrokerageComparisonData = {
  slug: "best-real-estate-brokerages-troy",
  region: "Troy, MI",
  regionShort: "Troy",
  crumbLabel: "Troy Brokerages Compared",
  h1: "The Best Real Estate Brokerages in Troy, MI? 7 Compared",
  publishedISO: "2026-09-23",
  publishedLabel: "September 23, 2026",
  compiledLabel: "September 2026",
  serviceArea: "Troy and Oakland County",
  chooseTip1: (
    <>
      Troy is a strong, mid-to-upper family-home market with excellent schools. For most Troy buyers
      and sellers, the deciding factor isn&rsquo;t a luxury brand name — it&rsquo;s finding an agent
      who knows Troy&rsquo;s neighborhoods and school boundaries and will handle your deal personally.
      A full-service independent is often the right fit here; the national brands are strong too.
    </>
  ),
  shortAnswer: (
    <>
      Troy is one of Metro Detroit&rsquo;s most sought-after family markets — top schools, strong
      resale, and a mix of price points. Its brokerages split into two camps.{" "}
      <strong>Independent brokerages</strong> — Real Estate Market Center (based in Troy), Farbman
      Group, and St. Aubin — compete on personal service and deep local knowledge.{" "}
      <strong>Franchise brands</strong> — Real Estate One, Max Broock, Keller Williams Somerset, and
      Century 21 Professionals — bring national networks and standardized marketing. There&rsquo;s no
      single &ldquo;best&rdquo;: match the brokerage to your property and how hands-on you want your
      agent. All seven are compared below on verified facts.
    </>
  ),
  independents: [
    {
      name: "Real Estate Market Center",
      city: "Troy",
      type: "Independent luxury",
      est: "2003",
      focus:
        "Troy-based, full-service across Oakland & Macomb; street-level local pricing; publishes its own sourced market research",
      publisher: true,
      site: "https://marketcenterrealty.com",
    },
    {
      name: "Farbman Group",
      city: "Troy",
      type: "Independent, family-owned",
      est: "—",
      focus:
        "Commercial real estate — brokerage, property management, development, and financial services; 45+ years in the market",
    },
    {
      name: "St. Aubin Real Estate",
      city: "Sterling Heights (serves Troy)",
      type: "Independent, family-owned",
      est: "—",
      focus:
        "Full-service residential across Southeastern Michigan; personal-service model with a high share of repeat clients",
    },
  ],
  franchises: [
    {
      name: "Real Estate One — Troy",
      city: "Troy",
      type: "Real Estate One (Michigan regional brand)",
      est: "—",
      focus: "Full-service residential; statewide Michigan network",
    },
    {
      name: "Max Broock Realtors — Troy",
      city: "Troy",
      type: "Real Estate One family brand",
      est: "1895",
      focus: "Residential and luxury; Luxury Portfolio / LeadingRE networks",
    },
    {
      name: "Keller Williams Realty Somerset",
      city: "Troy",
      type: "Franchise — Keller Williams",
      est: "—",
      focus:
        "Full-service residential; technology and agent-training-forward",
    },
    {
      name: "Century 21 Professionals",
      city: "Troy",
      type: "Franchise — Century 21",
      est: "—",
      focus: "Full-service residential and commercial brokerage",
    },
  ],
  faqs: [
    {
      question: "Who is the best real estate brokerage in Troy, MI?",
      answer:
        "There's no single 'best' — it depends on what you're buying or selling and the service you want. Troy is largely a family-home market, so the deciding factor is usually the individual agent's local knowledge rather than a luxury brand. Real Estate Market Center is a Troy-based independent that competes on personal, owner-involved service and its own published market research; the national brands (Real Estate One, Max Broock, Keller Williams, Century 21) bring standardized marketing and referral networks. Match the brokerage to your needs and interview more than one agent.",
    },
    {
      question: "What makes Troy a good place to buy a home?",
      answer:
        "Troy is consistently one of Metro Detroit's most in-demand suburbs: highly rated schools, low crime, strong resale values, and a central Oakland County location with quick access to major employers and freeways. It offers a wide price range — from condos and starter homes to executive housing — which is why both independents and national brands compete hard here. A local agent who knows Troy's specific subdivisions and school boundaries is worth more than a headline brand.",
    },
    {
      question: "Is Real Estate Market Center based in Troy?",
      answer:
        "Yes. Real Estate Market Center is an independent luxury brokerage headquartered in Troy (2032 E Square Lake Rd, Suite 400A), established in 2003, with 20+ years and a reported $100M+ in closed sales across Oakland and Macomb County. It's the local independent on this list — big enough to know Troy street by street, small enough that a broker (not an assistant) handles your transaction.",
    },
    {
      question: "What's the difference between a franchise and an independent brokerage?",
      answer:
        "A franchise brokerage (Keller Williams, Century 21, and the Real Estate One / Max Broock group) operates under a shared brand with common marketing, referral networks, and standards, while being locally run. An independent brokerage (like Real Estate Market Center) isn't tied to a national brand — which can mean more flexibility and a more personal, owner-involved experience. Neither is inherently better; it's a style-of-service choice.",
    },
    {
      question: "Why doesn't this comparison show star ratings or review counts?",
      answer:
        "Deliberately. Online review counts change constantly, and we could not independently verify each brokerage's current Google rating to a standard we'd stake a published claim on — and we won't publish a number we can't stand behind about another business. So we've left ratings out and focused on verifiable facts. Check each brokerage's current Google rating yourself before you decide.",
    },
    {
      question: "How do I verify a Troy brokerage or agent's license?",
      answer:
        "Use the State of Michigan's license lookup through LARA (the Department of Licensing and Regulatory Affairs). Every legitimate Michigan brokerage and agent is licensed and publicly verifiable — it takes about a minute and is worth doing before you sign with anyone, including us.",
    },
  ],
};

export const metadata: Metadata = brokerageMetadata(data);

export default function Page() {
  return <BrokerageComparisonPage data={data} />;
}
