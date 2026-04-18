import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
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
      postalCode: "48098",
      addressCountry: "US",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "50",
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
        <section className="relative pt-32 pb-24 bg-[#0A1429] overflow-hidden noise">
          <div className="absolute inset-0 glow-orange opacity-40" />
          <div className="absolute inset-0 grid-overlay" />
          <div className="relative max-w-6xl mx-auto px-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-white/40 mb-8">
              <a href="/" className="hover:text-white/70 transition-colors">Home</a>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/70">{page.city} Real Estate</span>
            </nav>

            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/70 mb-7">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                {page.city}, {page.state} — {page.county}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-bold text-white tracking-[-0.03em] leading-[1.08] mb-6">
                {page.headline}
              </h1>

              <p className="text-lg sm:text-xl text-white/60 max-w-2xl leading-relaxed mb-10">
                {page.subheadline}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-12">
                <a
                  href="/#lead-magnet"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold shadow-[0_20px_50px_-12px_rgba(249,115,22,0.65)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  Get Free Home Valuation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href={`tel:${company.phoneTel}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-slate-900 hover:bg-white/90 font-bold transition-all"
                >
                  <Phone className="w-4 h-4" />
                  {company.phone}
                </a>
              </div>

              {/* Inline trust */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { v: "20+", l: "Years Experience", Icon: Clock },
                  { v: "$100M+", l: "Closed Sales", Icon: DollarSign },
                  { v: "500+", l: "Homes Sold", Icon: Home },
                  { v: page.city, l: "Specialist", Icon: MapPin },
                ].map((b) => (
                  <div key={b.l} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <b.Icon className="w-4 h-4 text-orange-400 flex-shrink-0" strokeWidth={1.75} />
                    <div>
                      <div className="text-sm font-bold text-white leading-none">{b.v}</div>
                      <div className="text-[10px] text-white/50 mt-0.5">{b.l}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Market Stats Bar ── */}
        <section className="bg-white border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                { Icon: DollarSign, value: page.medianPrice, label: "Median Price" },
                { Icon: TrendingUp, value: page.priceChange, label: "Price Trend" },
                { Icon: Clock, value: page.avgDaysOnMarket, label: "Days on Market" },
                { Icon: Users, value: page.population, label: "Population" },
                { Icon: GraduationCap, value: page.topSchoolDistrict.split("—")[0].trim(), label: "Schools" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <s.Icon className="w-4 h-4 text-orange-500" strokeWidth={1.75} />
                    <span className="text-[11px] text-slate-500 uppercase tracking-wider font-medium">{s.label}</span>
                  </div>
                  <div className="text-xl font-bold text-slate-900 tracking-tight">{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Intro ── */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <div className="space-y-5 text-[17px] text-slate-700 leading-[1.8]">
              {page.introParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ── For Buyers ── */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-14 items-start">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-5">
                  <Key className="w-3.5 h-3.5" />
                  For Buyers
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-6 leading-tight">
                  {page.buyerHeadline}
                </h2>
                <div className="space-y-4 text-slate-700 text-[16px] leading-[1.7]">
                  {page.buyerParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
              <div className="space-y-3 lg:mt-16">
                {page.buyerPoints.map((point) => (
                  <div key={point} className="flex gap-3 p-4 rounded-xl bg-white border border-slate-200/70 hover:border-blue-300 hover:shadow-md transition-all">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-[15px] text-slate-700">{point}</span>
                  </div>
                ))}
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-colors mt-4"
                >
                  Start Your Home Search <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── For Sellers ── */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-14 items-start">
              <div className="lg:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-200 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  For Sellers
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-6 leading-tight">
                  {page.sellerHeadline}
                </h2>
                <div className="space-y-4 text-slate-700 text-[16px] leading-[1.7]">
                  {page.sellerParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
              <div className="space-y-3 lg:order-1 lg:mt-16">
                {page.sellerPoints.map((point) => (
                  <div key={point} className="flex gap-3 p-4 rounded-xl bg-white border border-slate-200/70 hover:border-emerald-300 hover:shadow-md transition-all">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-[15px] text-slate-700">{point}</span>
                  </div>
                ))}
                <a
                  href="/#lead-magnet"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold text-sm transition-colors mt-4"
                >
                  Get Free Home Valuation <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Market Trend ── */}
        <section className="py-16 bg-slate-50 border-y border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-200 flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-6 h-6 text-orange-600" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em] mb-2">
                  {page.city} Market Outlook
                </p>
                <p className="text-[17px] text-slate-800 leading-[1.75]">{page.marketTrend}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Neighborhoods ── */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.22em] mb-3">Neighborhoods</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-10">
              Where to buy in {page.city}
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {page.neighborhoods.map((n) => (
                <div
                  key={n.name}
                  className="group rounded-2xl bg-gradient-to-br from-white to-slate-50/50 border border-slate-200/70 p-7 hover:border-orange-300/60 hover:shadow-[0_20px_50px_-20px_rgba(15,23,42,0.12)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">{n.name}</h3>
                  <p className="text-[15px] text-slate-600 leading-relaxed">{n.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Choose Us ── */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-6">
            <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.22em] mb-3">Why us</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-10">
              Why {page.city} clients choose us
            </h2>
            <div className="space-y-4">
              {page.whyChooseUs.map((item) => (
                <div key={item.title} className="flex gap-4 p-6 rounded-2xl bg-white border border-slate-200/70 hover:border-orange-300/60 hover:shadow-md transition-all">
                  <CheckCircle2 className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonial ── */}
        <section className="relative py-24 bg-[#0A1429] overflow-hidden noise">
          <div className="absolute inset-0 glow-orange opacity-25" />
          <div className="absolute inset-0 grid-overlay" />
          <div className="relative max-w-3xl mx-auto px-6 text-center text-white">
            <div className="flex justify-center gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-7 h-7 text-orange-400" fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <blockquote className="text-xl sm:text-2xl font-medium leading-relaxed mb-7 tracking-[-0.01em]">
              &ldquo;{page.testimonial.quote}&rdquo;
            </blockquote>
            <div className="text-white/60 text-sm">
              <span className="font-semibold text-white/85">{page.testimonial.name}</span>
              <span className="mx-2">—</span>
              {page.testimonial.context}
            </div>
          </div>
        </section>

        {/* ── Local Insight ── */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-orange-50/20 border border-slate-200/70 p-8">
              <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em] mb-3">Local insight</p>
              <p className="text-[17px] text-slate-800 leading-[1.75]">{page.localInsight}</p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-6">
            <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.22em] mb-3">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-10">
              {page.city} real estate questions
            </h2>
            <div className="space-y-4">
              {page.faqs.map((f) => (
                <details
                  key={f.question}
                  className="group rounded-2xl bg-white border border-slate-200/70 overflow-hidden hover:border-orange-300/60 transition-colors"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer text-[17px] font-bold text-slate-900 leading-snug list-none [&::-webkit-details-marker]:hidden">
                    {f.question}
                    <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0 ml-4 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed -mt-1">
                    {f.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Related Cities (Internal Links) ── */}
        <section className="py-16 bg-white border-t border-slate-100">
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.22em] mb-3">Also serving</p>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-6">
              Explore more Metro Detroit communities
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {otherCities.map((c) => (
                <a
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="group flex items-center justify-between px-5 py-4 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-orange-300 hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div>
                    <div className="font-bold text-slate-900 text-sm group-hover:text-orange-600 transition-colors">{c.city}</div>
                    <div className="text-[11px] text-slate-500">{c.medianPrice}</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative py-24 bg-[#0A1429] overflow-hidden noise">
          <div className="absolute inset-0 glow-orange opacity-50" />
          <div className="absolute inset-0 grid-overlay" />
          <div className="relative max-w-2xl mx-auto px-6 text-center text-white">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.02em] mb-5 leading-tight">
              {page.ctaHeadline}
            </h2>
            <p className="text-lg text-white/60 mb-10 leading-relaxed">
              {page.ctaSubheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/#lead-magnet"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold shadow-[0_20px_50px_-12px_rgba(249,115,22,0.65)] hover:-translate-y-0.5 transition-all"
              >
                Get Free Home Valuation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={`tel:${company.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-slate-900 font-bold transition-all"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
