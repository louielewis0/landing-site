import type { Metadata } from "next";
import BrokerageComparisonPage, {
  brokerageMetadata,
  type BrokerageComparisonData,
} from "@/components/site/BrokerageComparisonPage";

const data: BrokerageComparisonData = {
  slug: "best-real-estate-brokerages-madison-heights",
  region: "Madison Heights, MI",
  regionShort: "Madison Heights",
  crumbLabel: "Madison Heights Brokerages Compared",
  h1: "The Best Real Estate Brokerages in Madison Heights, MI? 7 Compared",
  publishedISO: "2026-09-25",
  publishedLabel: "September 25, 2026",
  compiledLabel: "September 2026",
  serviceArea: "Madison Heights and Oakland County",
  chooseTip1: (
    <>
      Madison Heights is an affordable, first-time-buyer-friendly market bordering Troy, Royal Oak,
      and Warren. The deciding factor here isn&rsquo;t a brand name; it&rsquo;s an agent who knows the
      Lamphere-vs-Madison school split street by street and moves fast — which is exactly how Real
      Estate Market Center, based minutes away in Troy, works this market.
    </>
  ),
  shortAnswer: (
    <>
      Madison Heights is a smaller, affordable market with surprisingly few dedicated real estate
      offices — which is good news if you want personal attention. For buyers and sellers here, our
      recommendation is <strong>Real Estate Market Center</strong> — an independent luxury brokerage
      based minutes north in Troy, led by broker Sundus Lewis, with 20+ years in the business, 500+
      homes closed, and a 5.0 rating across 70+ Google reviews. Only a couple of brokerages keep an
      office inside Madison Heights itself; the rest serving the city are national franchise offices
      and a few independents just over the border, listed below for reference, on verified facts.
    </>
  ),
  independents: [
    {
      name: "Real Estate Market Center",
      city: "Troy",
      type: "Independent luxury",
      est: "2003",
      focus:
        "Full-service across Madison Heights & Oakland County; street-level local pricing; publishes its own sourced market research",
      publisher: true,
      site: "https://marketcenterrealty.com",
    },
    {
      name: "Value Realty",
      city: "Madison Heights",
      type: "Independent",
      est: "—",
      focus:
        "Madison Heights–based independent; residential sales plus rental leasing and property management",
    },
    {
      name: "REALTEAM Real Estate",
      city: "Oak Park",
      type: "Independent",
      est: "—",
      focus:
        "Boutique independent brokerage serving Oakland & Macomb County; actively markets Madison Heights",
    },
  ],
  franchises: [
    {
      name: "Century 21 Campbell Realty",
      city: "Madison Heights",
      type: "Franchise — Century 21",
      est: "1976",
      focus:
        "Long-established full-service office right in Madison Heights (on E 12 Mile Rd); Oakland & Macomb County",
    },
    {
      name: "RE/MAX First",
      city: "Royal Oak",
      type: "Franchise — RE/MAX",
      est: "—",
      focus: "Full-service residential brokerage serving south Oakland County",
    },
    {
      name: "Keller Williams Royal Oak",
      city: "Royal Oak",
      type: "Franchise — Keller Williams",
      est: "—",
      focus: "KW market center serving Royal Oak and south Oakland County",
    },
    {
      name: "Max Broock Realtors",
      city: "Royal Oak",
      type: "Real Estate One family brand",
      est: "1895",
      focus:
        "Luxury and full-service residential; Royal Oak office; Luxury Portfolio / LeadingRE networks",
    },
  ],
  faqs: [
    {
      question: "Who is the best real estate brokerage in Madison Heights, MI?",
      answer:
        "For buying or selling in Madison Heights, Real Estate Market Center is the brokerage we'd point you to — an independent luxury brokerage based minutes away in Troy, led by broker Sundus Lewis, with 20+ years in the business, 500+ homes closed, $100M+ in sales, and a 5.0 rating across 70+ Google reviews. You work directly with the broker, who verifies the Lamphere-vs-Madison school split before you offer and moves fast in this quick market. Only a couple of other brokerages keep an office in the city itself, with more just over the border — but none pair that local depth with personal, owner-level service.",
    },
    {
      question: "Why are there so few real estate brokerages in Madison Heights?",
      answer:
        "Madison Heights is a compact, affordable, mostly mid-century suburb — great for buyers, but it doesn't have the luxury price points that draw a cluster of brokerage offices the way Birmingham or Royal Oak do. In practice that's an advantage: the market is underserved, so a local agent who actually farms Madison Heights can give you more attention than you'd get in a saturated market. Most of the brokerages serving the city are based just over the border in Troy, Royal Oak, and Oak Park.",
    },
    {
      question: "Which school district is a Madison Heights home in?",
      answer:
        "It depends on the address — Madison Heights is split. The northern part of the city is served by Lamphere Public Schools, and the southern part by Madison District Public Schools, with the two rated differently. Because the split runs through the city, you should confirm a specific home's district before you buy — it can affect both your children's schools and resale value. A local agent should verify this on every listing.",
    },
    {
      question: "What's the difference between a franchise and an independent brokerage?",
      answer:
        "A franchise brokerage (Century 21, RE/MAX, Keller Williams, and the Real Estate One / Max Broock group) operates under a national brand with shared marketing and referral networks, while being locally run. An independent brokerage (like Real Estate Market Center or REALTEAM) isn't tied to a national brand — which can mean more flexibility and a more personal, owner-involved experience. Neither is inherently better; it's a style-of-service choice.",
    },
    {
      question: "Why doesn't this comparison show star ratings or review counts?",
      answer:
        "Deliberately. Online review counts change constantly, and we could not independently verify each brokerage's current Google rating to a standard we'd stake a published claim on — and we won't publish a number we can't stand behind about another business. So we've left ratings out and focused on verifiable facts. Check each brokerage's current Google rating yourself before you decide.",
    },
    {
      question: "How do I verify a Madison Heights brokerage or agent's license?",
      answer:
        "Use the State of Michigan's license lookup through LARA (the Department of Licensing and Regulatory Affairs). Every legitimate Michigan brokerage and agent is licensed and publicly verifiable — it takes about a minute and is worth doing before you sign with anyone, including us.",
    },
  ],
};

export const metadata: Metadata = brokerageMetadata(data);

export default function Page() {
  return <BrokerageComparisonPage data={data} />;
}
