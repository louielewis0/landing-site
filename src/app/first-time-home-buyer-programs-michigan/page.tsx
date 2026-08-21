import type { Metadata } from "next";
import SiteShell from "@/components/site/SiteShell";
import { company } from "@/lib/config";
import {
  ArrowRight,
  ChevronRight,
  CalendarDays,
  Landmark,
  KeyRound,
  Phone,
  MapPin,
} from "lucide-react";

const BASE = "https://marketcenterrealty.com";
const SLUG = "first-time-home-buyer-programs-michigan";
const URL = `${BASE}/${SLUG}`;

export const metadata: Metadata = {
  title: "First-Time Home Buyer Programs in Michigan (2026): MSHDA & FHA Explained",
  description:
    "A plain-English guide to Michigan first-time buyer help in 2026 — MSHDA's MI Home Loan and down-payment assistance, plus FHA low-down-payment loans: who qualifies, how much help, and how to start. By a Metro Detroit brokerage.",
  alternates: { canonical: URL },
  openGraph: {
    title: "First-Time Home Buyer Programs in Michigan (2026): MSHDA & FHA Explained",
    description:
      "MSHDA down-payment assistance and FHA loans, explained for Michigan first-time buyers — eligibility, amounts, and next steps.",
    type: "article",
    locale: "en_US",
    url: URL,
  },
};

type Source = { id: number; label: string; url: string; accessed: string; note?: string };

const sources: Source[] = [
  {
    id: 1,
    label:
      "Michigan State Housing Development Authority (MSHDA) — MI Home Loan and Down Payment Assistance program details",
    url: "https://www.michigan.gov/mshda",
    accessed: "2026-08-21",
    note: "Assistance amounts, credit-score minimums, household-income limits, and sales-price limits are set by MSHDA and change over time. Confirm current terms with MSHDA or a MSHDA-participating lender before relying on any figure here.",
  },
  {
    id: 2,
    label:
      "U.S. Department of Housing and Urban Development (HUD) / Federal Housing Administration — FHA loan down-payment and credit requirements",
    url: "https://www.hud.gov/buying/loans",
    accessed: "2026-08-21",
  },
];

const faqs = [
  {
    question: "What is MSHDA and how does its down payment assistance work?",
    answer:
      "MSHDA is the Michigan State Housing Development Authority — a state agency, not a lender. Through its MI Home Loan program, qualified buyers can pair a mortgage from a participating lender with down-payment assistance (widely offered as up to $10,000) delivered as a second loan at 0% interest with no monthly payment; it's repaid only when you sell, refinance, or pay off the first mortgage. Because terms change, confirm the current amount and structure with MSHDA or a participating lender.",
  },
  {
    question: "Do I have to be a first-time buyer to use MSHDA?",
    answer:
      "Usually, but not always. MSHDA's assistance is generally aimed at first-time buyers (no ownership interest in a primary residence in the past three years), but repeat buyers can qualify in designated 'targeted' areas. A MSHDA lender can check whether a specific address falls in a targeted area.",
  },
  {
    question: "What are the basic MSHDA eligibility requirements?",
    answer:
      "The core gates are typically: a minimum credit score (commonly cited as 640), household income under MSHDA's limit for your county and household size, the home as your primary residence within a sales-price limit, and completion of a homebuyer education course. Exact limits vary by county and change over time — a participating lender will run your specific numbers.",
  },
  {
    question: "What's the difference between MSHDA and an FHA loan?",
    answer:
      "They solve different problems and often work together. FHA is a federal loan type that lets qualified buyers put as little as 3.5% down (with a credit score of 580 or higher; 10% down for scores of 500–579). MSHDA is state down-payment assistance that can help cover that down payment and closing costs. Many Michigan first-time buyers use an FHA loan for the mortgage and MSHDA assistance for the cash to close.",
  },
  {
    question: "How do I actually start?",
    answer:
      "Two steps, in order: get pre-approved with a MSHDA-participating lender (they'll confirm which programs you qualify for and run the income and price limits for your target cities), and complete the required homebuyer education course. Then you shop with a clear budget and your assistance lined up. We work with first-time buyers across Metro Detroit and can point you to participating lenders.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "First-Time Home Buyer Programs in Michigan (2026): MSHDA & FHA Explained",
  datePublished: "2026-08-21",
  dateModified: "2026-08-21",
  url: URL,
  author: { "@type": "Organization", name: company.name, url: BASE },
  publisher: { "@type": "Organization", name: company.name, url: BASE },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE },
    { "@type": "ListItem", position: 2, name: "Michigan First-Time Buyer Programs", item: URL },
  ],
};

export default function FirstTimeBuyerProgramsPage() {
  return (
    <SiteShell>
      <main style={{ paddingTop: 24 }} className="bg-cream">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

        {/* ── Header ── */}
        <section className="bg-cream" style={{ padding: "50px 0 60px" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <nav
              aria-label="Breadcrumb"
              style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--s-muted)", marginBottom: 34 }}
            >
              <a href="/">Home</a>
              <ChevronRight className="w-3 h-3" />
              <span style={{ color: "var(--navy)" }}>Michigan First-Time Buyer Programs</span>
            </nav>

            <div className="s-eyebrow">
              <KeyRound className="w-3 h-3" style={{ marginRight: 2 }} />
              First-time buyers · 2026
            </div>

            <h1 style={{ fontSize: "clamp(32px, 4.4vw, 54px)", lineHeight: 1.12, marginBottom: 22 }}>
              First-Time Home Buyer Programs in Michigan: MSHDA &amp; FHA, Explained
            </h1>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", fontSize: 12.5, color: "var(--s-muted)", marginBottom: 34 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <CalendarDays className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />
                Published August 21, 2026
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <Landmark className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />
                By {company.name}, a Troy, MI brokerage
              </span>
            </div>

            <div className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid rgba(217,118,47,0.3)", background: "rgba(217,118,47,0.06)", padding: 30 }}>
              <div className="s-eyebrow">The short answer</div>
              <p style={{ fontSize: 16.5, lineHeight: 1.8, color: "var(--s-ink)" }}>
                Two programs put most Michigan first-time buyers into a home with far less cash than they
                expect, and they stack. <strong>FHA</strong> is a federal loan that allows as little as 3.5%
                down (credit score 580+). <strong>MSHDA</strong> is Michigan&rsquo;s state down-payment
                assistance — commonly up to $10,000, given as a 0%-interest second loan with no monthly
                payment that you repay only when you sell or refinance. Use FHA for the mortgage and MSHDA
                for the cash to close and your out-of-pocket can shrink dramatically. The gates: roughly a
                640 credit score, income and price limits, and a homebuyer education course. Amounts and
                limits change — confirm current terms with MSHDA or a participating lender.
              </p>
            </div>
          </div>
        </section>

        {/* ── MSHDA ── */}
        <section className="bg-cream-2" style={{ padding: "70px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal">
              <div className="s-eyebrow">Program 1</div>
              <h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", marginBottom: 18 }}>MSHDA: Michigan&rsquo;s down-payment assistance</h2>
              <div style={{ display: "grid", gap: 16, fontSize: 15.5, lineHeight: 1.8, color: "var(--s-ink)" }}>
                <p>
                  MSHDA — the Michigan State Housing Development Authority — is a state agency, not a lender.
                  Its MI Home Loan program pairs a mortgage from a participating lender with down-payment
                  assistance, widely offered as up to $10,000. The assistance is a second loan at 0% interest
                  with no monthly payment; you repay it only when you sell the home, refinance, or pay off
                  the first mortgage. In practice, that turns the down payment from a wall into a deferred
                  line item.
                </p>
                <p>
                  Who qualifies (the usual gates): a minimum credit score commonly cited as 640; household
                  income under MSHDA&rsquo;s limit for your county and household size; the home as your
                  primary residence within a sales-price limit; and completion of a homebuyer education
                  course. It&rsquo;s generally for first-time buyers — no primary-residence ownership in the
                  past three years — but repeat buyers can qualify in designated &ldquo;targeted&rdquo;
                  areas. Because these limits vary by county and change over time, a participating lender
                  runs your specific numbers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FHA ── */}
        <section className="bg-cream" style={{ padding: "70px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal">
              <div className="s-eyebrow">Program 2</div>
              <h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", marginBottom: 18 }}>FHA: the low-down-payment mortgage</h2>
              <div style={{ display: "grid", gap: 16, fontSize: 15.5, lineHeight: 1.8, color: "var(--s-ink)" }}>
                <p>
                  An FHA loan is a mortgage insured by the Federal Housing Administration, designed to lower
                  the barrier to entry. Qualified buyers can put down as little as 3.5% with a credit score
                  of 580 or higher (a 10% down payment is required for scores of 500–579). FHA loans are more
                  forgiving on credit than conventional financing, which is why they&rsquo;re a common first
                  mortgage for first-time buyers.
                </p>
                <p>
                  The trade-off to understand: FHA loans carry mortgage insurance premiums that add to the
                  monthly payment, so a lender should model FHA against a low-down-payment conventional loan
                  for your situation before you choose. The key point for planning: FHA is the mortgage,
                  MSHDA is the help with the cash — they&rsquo;re designed to work together, and many
                  Michigan first-time buyers use both.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── How to start ── */}
        <section className="bg-cream-2" style={{ padding: "70px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal">
              <div className="s-eyebrow">Getting started</div>
              <h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", marginBottom: 24 }}>Three steps, in order</h2>
            </div>
            <div style={{ display: "grid", gap: 16 }}>
              {[
                ["1", "Get pre-approved with a MSHDA-participating lender", "They confirm which programs you qualify for and run the income and sales-price limits for the cities you're targeting. This is also what makes your offer competitive in fast Metro Detroit markets."],
                ["2", "Complete the homebuyer education course", "MSHDA assistance requires it, and it's genuinely useful — it demystifies escrow, closing costs, and what you'll actually pay monthly beyond the mortgage."],
                ["3", "Shop with your budget and assistance locked in", "Now you tour homes knowing your true number and with the cash-to-close handled. We match first-time buyers to the suburb where the budget goes furthest — see our budget guide below."],
              ].map(([n, title, body]) => (
                <div key={n} className="reveal" style={{ display: "flex", gap: 18, borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff", padding: 24 }}>
                  <div style={{ fontFamily: "var(--font-fraunces)", fontSize: 32, lineHeight: 1, color: "var(--s-gold)", flexShrink: 0 }}>{n}</div>
                  <div>
                    <h3 style={{ fontSize: 17, fontWeight: 600, color: "var(--s-ink)", marginBottom: 6 }}>{title}</h3>
                    <p style={{ fontSize: 14, lineHeight: 1.75, color: "var(--s-muted)" }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-cream" style={{ padding: "80px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal">
              <div className="s-eyebrow">FAQ</div>
              <h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", marginBottom: 30 }}>First-time buyer questions, answered directly</h2>
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              {faqs.map((f) => (
                <details key={f.question} className="reveal" style={{ borderRadius: 18, border: "1px solid var(--line)", background: "#fff", padding: "20px 24px" }}>
                  <summary style={{ fontSize: 15.5, fontWeight: 600, color: "var(--s-ink)", cursor: "pointer" }}>{f.question}</summary>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--s-muted)", marginTop: 12 }}>{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Sources ── */}
        <section className="bg-cream-2" style={{ padding: "60px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="s-eyebrow">Sources</div>
            <ol style={{ display: "grid", gap: 14, fontSize: 13, color: "var(--s-muted)", listStyle: "none", padding: 0 }}>
              {sources.map((s) => (
                <li key={s.id} style={{ display: "flex", gap: 12 }}>
                  <span style={{ color: "var(--s-gold)", flexShrink: 0 }}>{s.id}.</span>
                  <span>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", textUnderlineOffset: 4 }}>
                      {s.label}
                    </a>
                    <span style={{ opacity: 0.7 }}> — accessed {s.accessed}.</span>
                    {s.note && <span style={{ display: "block", opacity: 0.7, marginTop: 4 }}>{s.note}</span>}
                  </span>
                </li>
              ))}
            </ol>
            <p style={{ fontSize: 12, color: "var(--s-muted)", marginTop: 18, fontStyle: "italic" }}>
              This is general information, not lending or legal advice, and program terms change. Verify
              current eligibility and amounts with MSHDA or a participating lender for your situation.
            </p>
            <p style={{ fontSize: 13, color: "var(--s-muted)", marginTop: 18 }}>
              Ready to see where your budget lands?{" "}
              <a href="/how-much-home-metro-detroit-budget" style={{ color: "var(--s-gold)", fontWeight: 600 }}>
                How much home your budget buys in Metro Detroit
              </a>{" "}
              and{" "}
              <a href="/sterling-heights-vs-warren" style={{ color: "var(--s-gold)", fontWeight: 600 }}>
                Sterling Heights vs Warren for first-time buyers
              </a>
              .
            </p>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-cream" style={{ padding: "80px 0 100px", textAlign: "center" }}>
          <div className="container" style={{ maxWidth: 640 }}>
            <h2 style={{ fontSize: "clamp(26px, 3.4vw, 40px)", marginBottom: 14 }}>Buying your first home in Metro Detroit?</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--s-muted)", marginBottom: 30 }}>
              We walk first-time buyers through financing, down-payment assistance, and school-district
              boundaries — step by step, no pressure. Let&rsquo;s figure out what you can actually buy.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/home-value" className="btn btn-gold">
                Talk to a first-time-buyer specialist <ArrowRight className="w-4 h-4" />
              </a>
              <a href={`tel:${company.phoneTel}`} className="btn btn-ghost">
                <Phone className="w-4 h-4" />
                {company.phone}
              </a>
            </div>
            <p style={{ fontSize: 12, color: "var(--s-muted)", marginTop: 26, display: "inline-flex", alignItems: "center", gap: 8 }}>
              <MapPin className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />
              {company.address}
            </p>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
