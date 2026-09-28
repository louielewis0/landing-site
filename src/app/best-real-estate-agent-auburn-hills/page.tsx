import type { Metadata } from "next";
import BestAgentPage, { bestAgentMetadata, type BestAgentData } from "@/components/site/BestAgentPage";

const data: BestAgentData = {
  slug: "best-real-estate-agent-auburn-hills",
  city: "Auburn Hills",
  regionShort: "Auburn Hills",
  crumbLabel: "Best Real Estate Agent in Auburn Hills",
  h1: (
    <>
      The best real estate agent in Auburn Hills? <span style={{ color: "var(--s-gold)" }}>Meet Sundus Lewis.</span>
    </>
  ),
  h1Text: "The Best Real Estate Agent in Auburn Hills, MI — Sundus Lewis",
  sub: "Auburn Hills is a live-where-you-work market — Stellantis, BorgWarner, and Oakland University are all here. Here's why buyers, sellers, and investors trust broker Sundus Lewis.",
  publishedISO: "2026-09-27",
  publishedLabel: "September 27, 2026",
  localHeading: "Why Sundus is the agent to know in Auburn Hills",
  localParagraphs: [
    "Auburn Hills is one of the rare Metro Detroit suburbs where you can live minutes from where you work — Stellantis' North American HQ, BorgWarner, Continental, and Oakland University are all in the city. It also has two quirks a good agent has to know: it's split among four school districts (Avondale, Rochester, Pontiac, and Lake Orion) with boundaries that cut through the city, and several local real estate firms are actually commercial or property-management specialists, not home-sale brokerages.",
    "Sundus Lewis, broker and owner of Real Estate Market Center, is a full-service residential broker who works Auburn Hills — she understands the corporate-relocation buyer, the Oakland University rental market, and how to verify which of the four districts a home falls in. With 20+ years in the business and $100M+ closed, you get one broker handling your deal personally.",
  ],
  chooseTip1: (
    <>
      Auburn Hills is split among four school districts and several local firms are commercial/property-management, not
      home sales — so you want a full-service residential broker who verifies the district and understands the
      relocation and Oakland University rental angles. That&rsquo;s exactly what Sundus does.
    </>
  ),
  faqs: [
    {
      question: "Who is the best real estate agent in Auburn Hills, MI?",
      answer:
        "There's no single 'best,' and notably several firms with an Auburn Hills office focus on commercial real estate or property management rather than home sales. For buying or selling a home, you want a full-service residential broker who knows the corporate-relocation buyer and the four-way school split. Sundus Lewis fits — broker and owner of Real Estate Market Center, with 20+ years in the business, $100M+ closed, and a 5.0 rating across 70+ Google reviews.",
    },
    {
      question: "What school district will my Auburn Hills home be in?",
      answer:
        "It depends entirely on the address — Auburn Hills is split among four districts: Avondale (the largest share, including downtown and the I-75 corridor), Rochester (northeastern, generally highest-rated), Pontiac (western/southern edges), and Lake Orion (a small northern slice). Because boundaries cut through the city rather than following ZIP codes, Sundus verifies the district on every listing.",
    },
    {
      question: "Is Auburn Hills good for rental investment?",
      answer:
        "It's one of the stronger rental markets in north Oakland County, thanks to Oakland University (roughly 16,000 students) plus professionals at Stellantis, BorgWarner, and Continental. That drives consistent rental demand and a renter-to-buyer pipeline. Sundus can underwrite a specific deal's cap rate and cash flow, and Real Estate Market Center offers property management if you'd rather be hands-off.",
    },
    {
      question: "How much does a real estate agent cost in Auburn Hills?",
      answer:
        "Commissions are fully negotiable and not set by law; the common Michigan range is about 5–6% of the sale price, with buyer-agent compensation negotiated separately since the 2024 NAR settlement. Sundus will explain your options before you commit.",
    },
    {
      question: "Does Sundus handle corporate relocations in Auburn Hills?",
      answer:
        "Yes. Auburn Hills' corporate headquarters generate constant relocation buyers and sellers, and Sundus understands their timelines and what they look for in a home. When you're selling, she knows how to market to that buyer pool; when you're relocating in, she helps you land the right home and the right school district quickly.",
    },
  ],
  cityPage: { href: "/auburn-hills-real-estate-agent", label: "See our full Auburn Hills real estate guide" },
  brokeragePage: { href: "/best-real-estate-brokerages-auburn-hills", label: "Compare the best Auburn Hills brokerages" },
  metaTitle: "Best Real Estate Agent in Auburn Hills, MI | Sundus Lewis, Broker | Real Estate Market Center",
  metaDescription:
    "Looking for the best real estate agent in Auburn Hills, MI? Meet Sundus Lewis — broker & owner of Real Estate Market Center, 20+ years, 500+ homes closed, $100M+ sold, 5.0 across 70+ Google reviews.",
};

export const metadata: Metadata = bestAgentMetadata(data);

export default function Page() {
  return <BestAgentPage data={data} />;
}
