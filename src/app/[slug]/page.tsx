import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import Reveal from "@/components/motion/Reveal";
import { company } from "@/lib/config";
import { getCityPage, getAllCitySlugs, cityPages } from "@/lib/city-pages";
import {
  Phone,
  MapPin,
  TrendingUp,
  Clock,
  Users,
  GraduationCap,
  ArrowRight,
  Star,
  CheckCircle2,
  DollarSign,
  Home,
  Key,
  BarChart3,
  ChevronRight,
} from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllCitySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getCityPage(slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `https://marketcenterrealty.com/${page.slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      type: "website",
      locale: "en_US",
      url: `https://marketcenterrealty.com/${page.slug}`,
    },
  };
}

export default async function CityLandingPage({ params }: Props) {
  const { slug } = await params;
  const page = getCityPage(slug);
  if (!page) notFound();

  const otherCities = cityPages.filter((c) => c.slug !== page.slug);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const localSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: company.name,
    telephone: company.phone,
    email: company.email,
    url: `https://marketcenterrealty.com/${page.slug}`,
    areaServed: {
      "@type": "City",
      name: page.city,
      containedInPlace: { "@type": "State", name: "Michigan" },
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "2032 E Square Lake Rd Suite 400A",
      addressLocality: "Troy",
      addressRegion: "MI",
      postalCode: "48085",
      addressCountry: "US",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://marketcenterrealty.com" },
      { "@type": "ListItem", position: 2, name: `${page.city} Real Estate`, item: `https://marketcenterrealty.com/${page.slug}` },
    ],
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

        {/* ── Hero ── */}
        <section className="relative pt-36 pb-28 atmosphere grain vignette overflow-hidden">
          <div className="relative max-w-6xl mx-auto px-6">
            <nav className="flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-bone/35 mb-10">
              <a href="/" className="hover:text-bone/70 transition-colors">Home</a>
              <ChevronRight className="w-3 h-3" />
              <span className="text-bone/65">{page.city} Real Estate</span>
            </nav>

            <div className="max-w-4xl">
              <div className="fade-up flex items-center gap-3 mb-7">
                <span className="block w-10 h-px bg-[var(--gold)] opacity-60" />
                <span className="eyebrow">
                  <MapPin className="w-3 h-3 inline mr-2 -mt-0.5 text-[var(--gold-soft)]" />
                  {page.city}, {page.state} · {page.county}
                </span>
              </div>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-[5rem] font-light text-bone tracking-tight leading-[1.04] mb-7">
                <span className="block overflow-hidden">
                  <span className="block mask-wipe">{page.headline}</span>
                </span>
              </h1>

              <p className="fade-up delay-2 text-[17px] sm:text-lg text-bone/60 max-w-2xl leading-[1.7] mb-10 font-light">
                {page.subheadline}
              </p>

              <div className="fade-up delay-3 flex flex-col sm:flex-row gap-3 mb-14">
                <a
                  href="/#lead-magnet"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink font-semibold text-[14px] tracking-wide transition-all duration-500"
                >
                  Request your valuation
                  <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                </a>
                <a
                  href={`tel:${company.phoneTel}`}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-bone/25 text-bone hover:border-bone/60 hover:bg-bone/5 font-medium text-[14px] tracking-wide transition-all duration-500"
                >
                  <Phone className="w-4 h-4 text-[var(--gold-soft)]" />
                  {company.phone}
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { v: "20+", l: "Years experience", Icon: Clock },
                  { v: "$100M+", l: "Closed sales", Icon: DollarSign },
                  { v: "500+", l: "Homes sold", Icon: Home },
                  { v: page.city, l: "Specialist", Icon: MapPin },
                ].map((b, i) => (
                  <Reveal key={b.l} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-bone/[0.03] border border-bone/10">
                    <b.Icon className="w-4 h-4 text-[var(--gold-soft)] flex-shrink-0" strokeWidth={1.5} />
                    <div>
                      <div className="font-display text-[15px] font-light text-bone leading-none">{b.v}</div>
                      <div className="text-[10px] text-bone/45 mt-1 uppercase tracking-[0.18em]">{b.l}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Market Stats Bar ── */}
        <section className="bg-ink-2 border-y border-bone/10 relative overflow-hidden">
          <div className="absolute inset-0 grain pointer-events-none" />
          <div className="relative max-w-6xl mx-auto px-6 py-12">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-6">
              {[
                { Icon: DollarSign, value: page.medianPrice, label: "Median Price" },
                { Icon: TrendingUp, value: page.priceChange, label: "Price Trend" },
                { Icon: Clock, value: page.avgDaysOnMarket, label: "Days on Market" },
                { Icon: Users, value: page.population, label: "Population" },
                { Icon: GraduationCap, value: page.topSchoolDistrict.split("—")[0].trim(), label: "Schools" },
              ].map((s, i) => (
                <Reveal key={s.label} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                  <div className="flex items-center gap-2 mb-2">
                    <s.Icon className="w-3.5 h-3.5 text-[var(--gold-soft)]" strokeWidth={1.5} />
                    <span className="text-[10px] text-bone/45 uppercase tracking-[0.22em]">{s.label}</span>
                  </div>
                  <div className="font-display text-2xl font-light text-bone tracking-tight">{s.value}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Intro ── */}
        <section className="py-24 bg-ink relative overflow-hidden">
          <div className="absolute inset-0 grain pointer-events-none" />
          <div className="relative max-w-3xl mx-auto px-6">
            <div className="space-y-6 text-[17px] text-bone/70 leading-[1.85] font-light">
              {page.introParagraphs.map((p, i) => (
                <Reveal key={i} delay={((i % 3) + 1) as 1 | 2 | 3}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── For Buyers ── */}
        <section className="py-28 atmosphere relative overflow-hidden">
          <div className="absolute inset-0 grain pointer-events-none" />
          <div className="relative max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <Reveal>
                  <p className="eyebrow mb-5">
                    <Key className="w-3 h-3 inline mr-2 -mt-0.5 text-[var(--gold-soft)]" />
                    For Buyers
                  </p>
                </Reveal>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-bone leading-[1.04] mb-8">
                  <span className="block overflow-hidden">
                    <Reveal variant="mask" className="block">{page.buyerHeadline}</Reveal>
                  </span>
                </h2>
                <div className="space-y-5 text-bone/65 text-[16px] leading-[1.75] font-light">
                  {page.buyerParagraphs.map((p, i) => (
                    <Reveal key={i} delay={((i % 3) + 1) as 1 | 2 | 3}>
                      <p>{p}</p>
                    </Reveal>
                  ))}
                </div>
              </div>
              <div className="space-y-3 lg:mt-20">
                {page.buyerPoints.map((point, i) => (
                  <Reveal
                    key={point}
                    delay={((i % 3) + 1) as 1 | 2 | 3}
                    className="flex gap-3 p-4 rounded-xl bg-bone/[0.03] border border-bone/10 hover:border-[var(--gold)]/30 transition-all duration-500"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[var(--gold-soft)] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-[14.5px] text-bone/75 font-light">{point}</span>
                  </Reveal>
                ))}
                <Reveal delay={3}>
                  <a
                    href="/#contact"
                    className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink font-semibold text-[13px] tracking-wide transition-all duration-500 mt-6"
                  >
                    Start your home search <ArrowRight className="w-4 h-4" />
                  </a>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── For Sellers ── */}
        <section className="py-28 bg-ink relative overflow-hidden">
          <div className="absolute inset-0 grain pointer-events-none" />
          <div className="relative max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="lg:order-2">
                <Reveal>
                  <p className="eyebrow mb-5">
                    <TrendingUp className="w-3 h-3 inline mr-2 -mt-0.5 text-[var(--gold-soft)]" />
                    For Sellers
                  </p>
                </Reveal>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-bone leading-[1.04] mb-8">
                  <span className="block overflow-hidden">
                    <Reveal variant="mask" className="block">{page.sellerHeadline}</Reveal>
                  </span>
                </h2>
                <div className="space-y-5 text-bone/65 text-[16px] leading-[1.75] font-light">
                  {page.sellerParagraphs.map((p, i) => (
                    <Reveal key={i} delay={((i % 3) + 1) as 1 | 2 | 3}>
                      <p>{p}</p>
                    </Reveal>
                  ))}
                </div>
              </div>
              <div className="space-y-3 lg:order-1 lg:mt-20">
                {page.sellerPoints.map((point, i) => (
                  <Reveal
                    key={point}
                    delay={((i % 3) + 1) as 1 | 2 | 3}
                    className="flex gap-3 p-4 rounded-xl bg-bone/[0.03] border border-bone/10 hover:border-[var(--gold)]/30 transition-all duration-500"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[var(--gold-soft)] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-[14.5px] text-bone/75 font-light">{point}</span>
                  </Reveal>
                ))}
                <Reveal delay={3}>
                  <a
                    href="/#lead-magnet"
                    className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink font-semibold text-[13px] tracking-wide transition-all duration-500 mt-6"
                  >
                    Request your valuation <ArrowRight className="w-4 h-4" />
                  </a>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── Market Trend ── */}
        <section className="py-20 bg-ink-2 border-y border-bone/10 relative overflow-hidden">
          <div className="absolute inset-0 grain pointer-events-none" />
          <div className="relative max-w-3xl mx-auto px-6">
            <Reveal className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/5 flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-5 h-5 text-[var(--gold-soft)]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="eyebrow mb-3">{page.city} Market Outlook</p>
                <p className="text-[17px] text-bone/75 leading-[1.8] font-light">{page.marketTrend}</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Neighborhoods ── */}
        <section className="py-28 bg-ink relative overflow-hidden">
          <div className="absolute inset-0 grain pointer-events-none" />
          <div className="relative max-w-6xl mx-auto px-6">
            <Reveal>
              <p className="eyebrow mb-5">Neighborhoods</p>
            </Reveal>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-bone leading-[1.04] mb-12">
              <span className="block overflow-hidden">
                <Reveal variant="mask" className="block">Where to buy in {page.city}.</Reveal>
              </span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {page.neighborhoods.map((n, i) => (
                <Reveal
                  key={n.name}
                  delay={((i % 3) + 1) as 1 | 2 | 3}
                  className="group rounded-2xl border border-bone/10 bg-gradient-to-b from-bone/[0.03] to-transparent p-8 hover:border-[var(--gold)]/40 hover:from-bone/[0.06] transition-all duration-700 tilt"
                >
                  <h3 className="font-display text-[1.5rem] font-light text-bone mb-3 group-hover:text-[var(--gold-soft)] transition-colors duration-500">{n.name}</h3>
                  <p className="text-[14.5px] text-bone/60 leading-[1.7] font-light">{n.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Choose Us ── */}
        <section className="py-28 atmosphere relative overflow-hidden">
          <div className="absolute inset-0 grain pointer-events-none" />
          <div className="relative max-w-4xl mx-auto px-6">
            <Reveal>
              <p className="eyebrow mb-5">Why us</p>
            </Reveal>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-bone leading-[1.04] mb-12">
              <span className="block overflow-hidden">
                <Reveal variant="mask" className="block">Why {page.city} clients</Reveal>
              </span>
              <span className="block overflow-hidden">
                <Reveal variant="mask" delay={1} className="block italic gold-text">choose us.</Reveal>
              </span>
            </h2>
            <div className="space-y-4">
              {page.whyChooseUs.map((item, i) => (
                <Reveal
                  key={item.title}
                  delay={((i % 3) + 1) as 1 | 2 | 3}
                  className="flex gap-5 p-7 rounded-2xl bg-bone/[0.04] border border-bone/10 hover:border-[var(--gold)]/35 transition-all duration-700"
                >
                  <CheckCircle2 className="w-5 h-5 text-[var(--gold-soft)] flex-shrink-0 mt-1" strokeWidth={1.5} />
                  <div>
                    <h3 className="font-display text-[1.4rem] font-light text-bone mb-2 leading-tight">{item.title}</h3>
                    <p className="text-bone/65 leading-relaxed text-[14.5px] font-light">{item.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonial ── */}
        <section className="relative py-28 bg-ink overflow-hidden">
          <div className="absolute inset-0 grain pointer-events-none" />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(200,162,76,0.10), transparent 60%)",
            }}
          />
          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <Reveal>
              <div className="flex justify-center gap-1.5 mb-8">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-6 h-6 text-[var(--gold)]" fill="currentColor" strokeWidth={0} />
                ))}
              </div>
            </Reveal>
            <Reveal delay={1}>
              <blockquote className="font-display text-2xl sm:text-3xl text-bone leading-[1.4] mb-8 italic font-light">
                &ldquo;{page.testimonial.quote}&rdquo;
              </blockquote>
            </Reveal>
            <Reveal delay={2}>
              <div className="text-bone/55 text-[13px] tracking-[0.06em]">
                <span className="font-medium text-bone">{page.testimonial.name}</span>
                <span className="mx-2">—</span>
                {page.testimonial.context}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Local Insight ── */}
        <section className="py-20 bg-ink-2 relative overflow-hidden">
          <div className="absolute inset-0 grain pointer-events-none" />
          <div className="relative max-w-3xl mx-auto px-6">
            <Reveal className="rounded-2xl bg-bone/[0.03] border border-bone/10 p-9">
              <p className="eyebrow mb-4">Local insight</p>
              <p className="text-[17px] text-bone/75 leading-[1.85] font-light">{page.localInsight}</p>
            </Reveal>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-28 atmosphere relative overflow-hidden">
          <div className="absolute inset-0 grain pointer-events-none" />
          <div className="relative max-w-4xl mx-auto px-6">
            <Reveal>
              <p className="eyebrow mb-5">FAQ</p>
            </Reveal>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-bone leading-[1.04] mb-12">
              <span className="block overflow-hidden">
                <Reveal variant="mask" className="block">{page.city} real-estate</Reveal>
              </span>
              <span className="block overflow-hidden">
                <Reveal variant="mask" delay={1} className="block italic gold-text">questions.</Reveal>
              </span>
            </h2>
            <div className="space-y-3">
              {page.faqs.map((f, i) => (
                <Reveal
                  key={f.question}
                  delay={((i % 3) + 1) as 1 | 2 | 3}
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

        {/* ── Schools Deep Dive (optional) ── */}
        {page.schoolsDeepDive && (
          <section className="py-28 bg-ink relative overflow-hidden">
            <div className="absolute inset-0 grain pointer-events-none" />
            <div className="relative max-w-4xl mx-auto px-6">
              <Reveal>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/5 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-[var(--gold-soft)]" strokeWidth={1.5} />
                  </div>
                  <p className="eyebrow">Schools</p>
                </div>
              </Reveal>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-bone leading-[1.04] mb-10">
                <span className="block overflow-hidden">
                  <Reveal variant="mask" className="block">{page.schoolsDeepDive.title}</Reveal>
                </span>
              </h2>
              <div className="space-y-5 text-[17px] text-bone/70 leading-[1.85] mb-12 font-light">
                {page.schoolsDeepDive.paragraphs.map((p, i) => (
                  <Reveal key={i} delay={((i % 3) + 1) as 1 | 2 | 3}>
                    <p>{p}</p>
                  </Reveal>
                ))}
              </div>
              <div className="space-y-3">
                {page.schoolsDeepDive.schools.map((s, i) => (
                  <Reveal
                    key={s.name}
                    delay={((i % 3) + 1) as 1 | 2 | 3}
                    className="flex gap-5 p-6 rounded-2xl bg-bone/[0.03] border border-bone/10 hover:border-[var(--gold)]/30 transition-all duration-500"
                  >
                    <GraduationCap className="w-5 h-5 text-[var(--gold-soft)] flex-shrink-0 mt-1" strokeWidth={1.5} />
                    <div>
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <h3 className="font-display text-[1.3rem] font-light text-bone">{s.name}</h3>
                        <span className="text-[10px] text-[var(--gold-soft)] uppercase tracking-[0.18em]">{s.grades}</span>
                      </div>
                      <p className="text-[14px] text-bone/55 mt-1.5 font-light">{s.note}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Market Deep Dive (optional) ── */}
        {page.marketDeepDive && (
          <section className="relative py-28 atmosphere overflow-hidden">
            <div className="absolute inset-0 grain pointer-events-none" />
            <div className="relative max-w-4xl mx-auto px-6">
              <Reveal>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/5 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-[var(--gold-soft)]" strokeWidth={1.5} />
                  </div>
                  <p className="eyebrow">Deep Dive</p>
                </div>
              </Reveal>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-bone leading-[1.04] mb-10">
                <span className="block overflow-hidden">
                  <Reveal variant="mask" className="block">{page.marketDeepDive.title}</Reveal>
                </span>
              </h2>
              <div className="space-y-5 text-[17px] text-bone/70 leading-[1.85] font-light">
                {page.marketDeepDive.paragraphs.map((p, i) => (
                  <Reveal key={i} delay={((i % 3) + 1) as 1 | 2 | 3}>
                    <p>{p}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Lifestyle (optional) ── */}
        {page.lifestyleHighlights && (
          <section className="py-28 bg-ink relative overflow-hidden">
            <div className="absolute inset-0 grain pointer-events-none" />
            <div className="relative max-w-6xl mx-auto px-6">
              <Reveal>
                <p className="eyebrow mb-5">Lifestyle</p>
              </Reveal>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-bone leading-[1.04] mb-12">
                <span className="block overflow-hidden">
                  <Reveal variant="mask" className="block">{page.lifestyleHighlights.title}</Reveal>
                </span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {page.lifestyleHighlights.categories.map((cat, i) => (
                  <Reveal
                    key={cat.name}
                    delay={((i % 3) + 1) as 1 | 2 | 3}
                    className="rounded-2xl bg-bone/[0.03] border border-bone/10 p-8 hover:border-[var(--gold)]/30 transition-colors duration-500"
                  >
                    <h3 className="font-display text-[1.5rem] font-light text-bone mb-5">{cat.name}</h3>
                    <ul className="space-y-3">
                      {cat.items.map((item) => (
                        <li key={item} className="flex gap-3 text-[14px] text-bone/65 font-light">
                          <span className="w-1 h-1 rounded-full bg-[var(--gold-soft)] mt-2.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Additional Testimonials (optional) ── */}
        {page.additionalTestimonials && page.additionalTestimonials.length > 0 && (
          <section className="py-28 atmosphere relative overflow-hidden">
            <div className="absolute inset-0 grain pointer-events-none" />
            <div className="relative max-w-6xl mx-auto px-6">
              <Reveal>
                <p className="eyebrow mb-5">More {page.city} reviews</p>
              </Reveal>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-bone leading-[1.04] mb-12">
                <span className="block overflow-hidden">
                  <Reveal variant="mask" className="block">What {page.city} clients say.</Reveal>
                </span>
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                {page.additionalTestimonials.map((t, i) => (
                  <Reveal
                    key={t.name}
                    delay={((i % 3) + 1) as 1 | 2 | 3}
                    as="figure"
                    className="rounded-2xl bg-bone/[0.04] border border-bone/10 p-9 hover:border-[var(--gold)]/35 transition-all duration-700 tilt relative"
                  >
                    <span className="font-display absolute top-5 right-7 text-6xl text-[var(--gold)]/15 leading-none select-none">
                      &ldquo;
                    </span>
                    <div className="flex gap-1 mb-5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-[var(--gold-soft)]" fill="currentColor" strokeWidth={0} />
                      ))}
                    </div>
                    <blockquote className="font-display text-bone text-[1.25rem] leading-[1.5] mb-6 italic font-light">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className="pt-5 border-t border-bone/10 text-sm">
                      <div className="font-medium text-bone">{t.name}</div>
                      <div className="text-bone/45 text-[11px] uppercase tracking-[0.18em] mt-1.5">{t.context}</div>
                    </figcaption>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Related Cities ── */}
        <section className="py-20 bg-ink-2 relative overflow-hidden border-t border-bone/10">
          <div className="absolute inset-0 grain pointer-events-none" />
          <div className="relative max-w-6xl mx-auto px-6">
            <Reveal>
              <p className="eyebrow mb-3">Also serving</p>
            </Reveal>
            <h2 className="font-display text-3xl font-light text-bone tracking-tight mb-8">
              Explore more {company.region} communities
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {otherCities.map((c, i) => (
                <Reveal
                  key={c.slug}
                  delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
                  as="a"
                  className="group flex items-center justify-between px-5 py-4 rounded-xl bg-bone/[0.03] border border-bone/10 hover:border-[var(--gold)]/40 hover:bg-bone/[0.06] transition-all duration-500"
                >
                  <a href={`/${c.slug}`} className="absolute inset-0 z-10" aria-label={c.city} />
                  <div>
                    <div className="font-medium text-bone text-[14px] group-hover:text-[var(--gold-soft)] transition-colors duration-500">{c.city}</div>
                    <div className="text-[10px] text-bone/40 uppercase tracking-[0.18em] mt-1">{c.medianPrice}</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--gold-soft)] group-hover:translate-x-1 transition-transform duration-500" />
                </Reveal>
              ))}
            </div>
            <Reveal delay={2}>
              <a
                href="/best-metro-detroit-suburbs"
                className="inline-flex items-center gap-2 mt-8 text-[13px] text-bone/55 hover:text-[var(--gold-soft)] transition-colors duration-500"
              >
                Not sure which city fits? Compare all seven in our ranked 2026 guide
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </Reveal>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative py-32 atmosphere overflow-hidden">
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
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-bone leading-[1.05] mb-6">
              <span className="block overflow-hidden">
                <Reveal variant="mask" className="block italic gold-text">{page.ctaHeadline}</Reveal>
              </span>
            </h2>
            <Reveal delay={1}>
              <p className="text-[17px] text-bone/65 mb-10 leading-relaxed font-light">
                {page.ctaSubheadline}
              </p>
            </Reveal>
            <Reveal delay={2} className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/#lead-magnet"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink font-semibold text-[14px] tracking-wide transition-all duration-500"
              >
                Request your valuation
                <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
              </a>
              <a
                href={`tel:${company.phoneTel}`}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-bone/25 text-bone hover:border-bone/60 hover:bg-bone/5 font-medium text-[14px] tracking-wide transition-all duration-500"
              >
                <Phone className="w-4 h-4 text-[var(--gold-soft)]" />
                Call now
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
