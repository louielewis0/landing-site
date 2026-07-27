import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import Reveal from "@/components/motion/Reveal";
import { company } from "@/lib/config";
import { guideMeta, rankedCities, faqs, citations } from "@/lib/best-suburbs-guide";
import {
  Phone,
  MapPin,
  ArrowRight,
  ChevronRight,
  CalendarDays,
  Landmark,
  ListOrdered,
  ScrollText,
} from "lucide-react";

const BASE = "https://marketcenterrealty.com";
const URL = `${BASE}/${guideMeta.slug}`;

export const metadata: Metadata = {
  title: guideMeta.metaTitle,
  description: guideMeta.metaDescription,
  alternates: { canonical: URL },
  openGraph: {
    title: guideMeta.metaTitle,
    description: guideMeta.metaDescription,
    type: "article",
    locale: "en_US",
    url: URL,
  },
};

export default function BestSuburbsGuidePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guideMeta.title,
    datePublished: guideMeta.datePublished,
    dateModified: guideMeta.dateModified,
    url: URL,
    author: {
      "@type": "Organization",
      name: company.name,
      url: BASE,
    },
    publisher: {
      "@type": "Organization",
      name: company.name,
      url: BASE,
    },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: guideMeta.title,
    numberOfItems: rankedCities.length,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    itemListElement: rankedCities.map((c) => ({
      "@type": "ListItem",
      position: c.rank,
      name: `${c.city}, MI — ${c.bestFor}`,
      url: `${URL}#${c.city.toLowerCase().replace(/\s+/g, "-")}`,
    })),
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
      { "@type": "ListItem", position: 2, name: "Best Metro Detroit Suburbs", item: URL },
    ],
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

        {/* ── Hero ── */}
        <section className="relative pt-36 pb-20 atmosphere grain vignette overflow-hidden">
          <div className="relative max-w-4xl mx-auto px-6">
            <nav className="flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-bone/35 mb-10">
              <a href="/" className="hover:text-bone/70 transition-colors">Home</a>
              <ChevronRight className="w-3 h-3" />
              <span className="text-bone/65">Best Metro Detroit Suburbs</span>
            </nav>

            <div className="fade-up flex items-center gap-3 mb-7">
              <span className="block w-10 h-px bg-[var(--gold)] opacity-60" />
              <span className="eyebrow">
                <MapPin className="w-3 h-3 inline mr-2 -mt-0.5 text-[var(--gold-soft)]" />
                Metro Detroit · 2026 Buyer&rsquo;s Guide
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-bone tracking-tight leading-[1.06] mb-7">
              The 7 Best Metro Detroit Suburbs to Buy a Home in 2026, Ranked
            </h1>

            <div className="fade-up delay-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-bone/50 mb-10">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="w-3.5 h-3.5 text-[var(--gold-soft)]" />
                Updated July 27, 2026 · market data through {guideMeta.dataThrough}
              </span>
              <span className="inline-flex items-center gap-2">
                <Landmark className="w-3.5 h-3.5 text-[var(--gold-soft)]" />
                By {company.name}, a Troy, MI brokerage
              </span>
            </div>

            {/* TL;DR — the direct answer, first */}
            <Reveal className="rounded-2xl border border-[var(--gold)]/30 bg-[var(--gold)]/5 p-8">
              <p className="eyebrow mb-4">The short answer</p>
              <p className="text-[17px] text-bone/85 leading-[1.8] font-light">{guideMeta.shortAnswer}</p>
            </Reveal>
          </div>
        </section>

        {/* ── Comparison table ── */}
        <section className="py-16 bg-ink-2 border-y border-bone/10 relative overflow-hidden">
          <div className="absolute inset-0 grain pointer-events-none" />
          <div className="relative max-w-6xl mx-auto px-6">
            <Reveal>
              <p className="eyebrow mb-5">Side by side</p>
            </Reveal>
            <h2 className="font-display text-3xl sm:text-4xl font-light text-bone tracking-tight mb-3">
              All seven cities, one table
            </h2>
            <p className="text-[13px] text-bone/45 mb-8 font-light max-w-3xl">
              Two market gauges, both shown: Zillow&rsquo;s typical home value (a smoothed index, June 2026)
              and Redfin&rsquo;s median sale price (rolling three months ending May 2026). They measure
              different things and sometimes disagree — where they do, trust the trend only when both agree.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-bone/10">
              <table className="w-full text-left text-[13.5px] min-w-[900px]">
                <thead>
                  <tr className="border-b border-bone/15 text-[10px] uppercase tracking-[0.18em] text-bone/45">
                    <th className="px-5 py-4 font-medium">#</th>
                    <th className="px-5 py-4 font-medium">City</th>
                    <th className="px-5 py-4 font-medium">Typical home value¹</th>
                    <th className="px-5 py-4 font-medium">1-yr change¹</th>
                    <th className="px-5 py-4 font-medium">Median sale price⁴</th>
                    <th className="px-5 py-4 font-medium">Days on market⁴</th>
                    <th className="px-5 py-4 font-medium">Population²</th>
                    <th className="px-5 py-4 font-medium">School district³</th>
                  </tr>
                </thead>
                <tbody>
                  {rankedCities.map((c) => (
                    <tr key={c.city} className="border-b border-bone/5 last:border-0 hover:bg-bone/[0.03] transition-colors">
                      <td className="px-5 py-4 text-[var(--gold-soft)] font-medium">{c.rank}</td>
                      <td className="px-5 py-4">
                        <a href={`#${c.city.toLowerCase().replace(/\s+/g, "-")}`} className="text-bone font-medium hover:text-[var(--gold-soft)] transition-colors">
                          {c.city}
                        </a>
                        <div className="text-[11px] text-bone/40 mt-0.5">{c.bestFor}</div>
                      </td>
                      <td className="px-5 py-4 text-bone/80">{c.stats.zhvi}</td>
                      <td className="px-5 py-4 text-bone/80">{c.stats.zhviYoY}</td>
                      <td className="px-5 py-4 text-bone/80">{c.stats.medianSale}</td>
                      <td className="px-5 py-4 text-bone/80">{c.stats.dom}</td>
                      <td className="px-5 py-4 text-bone/80">{c.stats.population}</td>
                      <td className="px-5 py-4 text-bone/70">{c.stats.nicheRank}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-bone/35 mt-4 font-light">
              Superscripts refer to the numbered sources at the end of this page. Populations are 2020 Census
              counts. School column shows the primary district&rsquo;s statewide Niche 2026 rank.
            </p>
          </div>
        </section>

        {/* ── Ranked cities ── */}
        <section className="py-24 bg-ink relative overflow-hidden">
          <div className="absolute inset-0 grain pointer-events-none" />
          <div className="relative max-w-4xl mx-auto px-6">
            <Reveal>
              <p className="eyebrow mb-5">
                <ListOrdered className="w-3 h-3 inline mr-2 -mt-0.5 text-[var(--gold-soft)]" />
                The ranking
              </p>
            </Reveal>
            <div className="space-y-20">
              {rankedCities.map((c) => (
                <article key={c.city} id={c.city.toLowerCase().replace(/\s+/g, "-")} className="scroll-mt-28">
                  <Reveal>
                    <div className="flex items-baseline gap-4 mb-2">
                      <span className="font-display text-5xl font-light gold-text leading-none">{c.rank}</span>
                      <h2 className="font-display text-3xl sm:text-4xl font-light text-bone tracking-tight">
                        {c.city}, MI
                      </h2>
                    </div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--gold-soft)] mb-6">
                      {c.bestFor} · {c.county}
                    </p>
                  </Reveal>
                  <Reveal delay={1}>
                    <p className="text-[17px] text-bone/85 leading-[1.8] font-light mb-6 border-l-2 border-[var(--gold)]/40 pl-5">
                      {c.answer}
                    </p>
                  </Reveal>
                  <div className="space-y-5 text-[15.5px] text-bone/65 leading-[1.8] font-light mb-7">
                    {c.paragraphs.map((p, i) => (
                      <Reveal key={i} delay={((i % 3) + 1) as 1 | 2 | 3}>
                        <p>{p}</p>
                      </Reveal>
                    ))}
                  </div>
                  <Reveal delay={2}>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-bone/50 mb-6">
                      <span>Schools: {c.stats.district}</span>
                    </div>
                    <a
                      href={`/${c.citySlug}`}
                      className="inline-flex items-center gap-2 text-[13.5px] text-[var(--gold-soft)] hover:text-[var(--gold)] transition-colors"
                    >
                      Read our full {c.city} buyer &amp; seller guide
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </Reveal>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Methodology ── */}
        <section className="py-20 bg-ink-2 border-y border-bone/10 relative overflow-hidden">
          <div className="absolute inset-0 grain pointer-events-none" />
          <div className="relative max-w-3xl mx-auto px-6">
            <Reveal>
              <p className="eyebrow mb-5">
                <ScrollText className="w-3 h-3 inline mr-2 -mt-0.5 text-[var(--gold-soft)]" />
                How we ranked — and who&rsquo;s ranking
              </p>
            </Reveal>
            <div className="space-y-5 text-[15.5px] text-bone/70 leading-[1.85] font-light">
              <p>
                We are {company.name}, a residential brokerage headquartered in Troy that has worked all seven
                of these cities for over 20 years. That means two things: we know these markets house by house,
                and we are not a neutral party — we ranked our own home city #1. So we built this page to be
                checkable rather than taking our word for it.
              </p>
              <p>
                The order weighs five factors: school district strength (Niche&rsquo;s 2026 Michigan ranking,
                plus district-boundary verification against official district and city sources), price
                accessibility (Zillow&rsquo;s June 2026 typical home value), market momentum (one-year change in
                that index, cross-checked against Redfin&rsquo;s sale-price and days-on-market data), lifestyle
                fit (our agents&rsquo; on-the-ground experience — labeled as such wherever it appears), and
                long-term demand anchors like employment corridors and walkability. The weighting is editorial
                judgment for a typical family buyer; your priorities may reorder the list, which is why every
                city entry names what it is best for.
              </p>
              <p>
                What we deliberately did not do: quote any statistic without a source and a date, average two
                sources that disagree, or fill gaps with estimates. Where our two market sources conflict
                (Troy, Warren, Bloomfield Hills), we show both numbers and explain the gap. Where we could not
                verify something from a primary source — like post-2020 population estimates — we used the
                verifiable figure and said so. Populations are therefore 2020 Census counts, and Niche ranks
                are quoted as Niche&rsquo;s opinion, not the state&rsquo;s.
              </p>
              <p>
                This page was last reviewed on July 27, 2026, and we update it as Zillow and Redfin publish new
                monthly data.
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-24 atmosphere relative overflow-hidden">
          <div className="absolute inset-0 grain pointer-events-none" />
          <div className="relative max-w-4xl mx-auto px-6">
            <Reveal>
              <p className="eyebrow mb-5">FAQ</p>
            </Reveal>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-bone leading-[1.06] mb-12">
              Common questions, answered directly
            </h2>
            <div className="space-y-3">
              {faqs.map((f) => (
                <Reveal
                  key={f.question}
                  as="details"
                  className="group rounded-2xl bg-bone/[0.03] border border-bone/10 overflow-hidden hover:border-[var(--gold)]/35 transition-colors duration-500"
                >
                  <summary className="flex items-center justify-between p-7 cursor-pointer text-[16px] font-medium text-bone leading-snug list-none [&::-webkit-details-marker]:hidden">
                    {f.question}
                    <ChevronRight className="w-4 h-4 text-[var(--gold-soft)] flex-shrink-0 ml-4 group-open:rotate-90 transition-transform duration-500" />
                  </summary>
                  <div className="px-7 pb-7 text-bone/65 leading-[1.8] -mt-1 text-[14.5px] font-light">
                    {f.answer}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Sources ── */}
        <section className="py-16 bg-ink relative overflow-hidden border-t border-bone/10">
          <div className="absolute inset-0 grain pointer-events-none" />
          <div className="relative max-w-3xl mx-auto px-6">
            <Reveal>
              <p className="eyebrow mb-6">Sources</p>
            </Reveal>
            <ol className="space-y-4 text-[13px] text-bone/55 font-light list-none">
              {citations.map((s) => (
                <li key={s.id} className="flex gap-3">
                  <span className="text-[var(--gold-soft)] flex-shrink-0">{s.id}.</span>
                  <span>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline decoration-bone/20 underline-offset-4 hover:text-bone transition-colors">
                      {s.label}
                    </a>
                    <span className="text-bone/35"> — accessed {s.accessed}.</span>
                    {s.note && <span className="block text-bone/40 mt-1">{s.note}</span>}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative py-28 atmosphere overflow-hidden">
          <div className="absolute inset-0 grain pointer-events-none" />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-50"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,162,76,0.18), transparent 60%)",
            }}
          />
          <div className="relative max-w-2xl mx-auto px-6 text-center">
            <h2 className="font-display text-4xl sm:text-5xl font-light text-bone leading-[1.05] mb-6">
              <span className="italic gold-text">Narrowed it to two or three?</span>
            </h2>
            <Reveal delay={1}>
              <p className="text-[17px] text-bone/65 mb-10 leading-relaxed font-light">
                Talk it through with an agent who closes in all seven of these cities. We&rsquo;ll tell you
                which one actually fits your budget, commute, and school priorities — including when the answer
                isn&rsquo;t Troy.
              </p>
            </Reveal>
            <Reveal delay={2} className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/#contact"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink font-semibold text-[14px] tracking-wide transition-all duration-500"
              >
                Ask us which city fits you
                <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
              </a>
              <a
                href={`tel:${company.phoneTel}`}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-bone/25 text-bone hover:border-bone/60 hover:bg-bone/5 font-medium text-[14px] tracking-wide transition-all duration-500"
              >
                <Phone className="w-4 h-4 text-[var(--gold-soft)]" />
                {company.phone}
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
