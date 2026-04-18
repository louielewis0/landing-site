import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { company } from "@/lib/config";
import { getCityPage, getAllCitySlugs, type CityPage } from "@/lib/city-pages";
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
  Home,
  DollarSign,
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
    areaServed: { "@type": "City", name: page.city, containedInPlace: { "@type": "State", name: "Michigan" } },
    address: { "@type": "PostalAddress", streetAddress: "2032 E Square Lake Rd Suite 400A", addressLocality: "Troy", addressRegion: "MI", postalCode: "48098" },
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }} />

        {/* Hero */}
        <section className="relative pt-36 pb-20 bg-[#0A1429] overflow-hidden noise">
          <div className="absolute inset-0 glow-orange opacity-50" />
          <div className="absolute inset-0 grid-overlay" />
          <div className="relative max-w-5xl mx-auto px-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/70 mb-7">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              {page.city}, {page.state} — {page.county}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-[-0.03em] leading-[1.05] mb-5">
              {page.headline}
            </h1>
            <p className="text-lg sm:text-xl text-white/65 max-w-3xl leading-relaxed mb-9">
              {page.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#lead-magnet" className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold shadow-[0_20px_50px_-12px_rgba(249,115,22,0.65)] hover:-translate-y-0.5 transition-all">
                Get Free Home Valuation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href={`tel:${company.phoneTel}`} className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white text-slate-900 hover:bg-white/90 font-bold transition-all">
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </div>
        </section>

        {/* Market Stats */}
        <section className="bg-white border-b border-slate-100 py-14">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
              {[
                { Icon: DollarSign, value: page.medianPrice, label: "Median Home Price" },
                { Icon: TrendingUp, value: page.priceChange, label: "Price Trend" },
                { Icon: Clock, value: page.avgDaysOnMarket, label: "Avg Days on Market" },
                { Icon: Users, value: page.population, label: "Population" },
                { Icon: GraduationCap, value: page.topSchoolDistrict.split("—")[0].trim(), label: "Top School District" },
              ].map((s) => (
                <div key={s.label} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                    <s.Icon className="w-5 h-5 text-orange-600" strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="text-[15px] font-bold text-slate-900 leading-tight">{s.value}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="space-y-5 text-[17px] text-slate-700 leading-[1.75]">
              {page.introParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Neighborhoods */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.22em] mb-4">Neighborhoods</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-10">
              Where to buy in {page.city}
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {page.neighborhoods.map((n) => (
                <div key={n.name} className="rounded-2xl bg-white border border-slate-200/70 p-7 hover:border-orange-300 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{n.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{n.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.22em] mb-4">Why us</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-10">
              Why {page.city} clients choose {company.name}
            </h2>
            <div className="space-y-5">
              {page.whyChooseUs.map((item) => (
                <div key={item.title} className="flex gap-4">
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

        {/* Testimonial */}
        <section className="relative py-20 bg-[#0A1429] overflow-hidden noise">
          <div className="absolute inset-0 glow-orange opacity-30" />
          <div className="absolute inset-0 grid-overlay" />
          <div className="relative max-w-3xl mx-auto px-6 text-center text-white">
            <div className="flex justify-center gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-6 h-6 text-orange-400" fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <blockquote className="text-xl sm:text-2xl font-medium leading-relaxed mb-6">
              "{page.testimonial.quote}"
            </blockquote>
            <div className="text-white/60 text-sm">
              <span className="font-semibold text-white/80">{page.testimonial.name}</span> — {page.testimonial.context}
            </div>
          </div>
        </section>

        {/* Local Insight */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-6">
            <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-orange-50/30 border border-slate-200/70 p-8">
              <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.22em] mb-3">Local insight</p>
              <p className="text-[17px] text-slate-800 leading-[1.7]">{page.localInsight}</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-6">
            <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.22em] mb-4">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-10">
              Frequently asked about {page.city} real estate
            </h2>
            <div className="space-y-5">
              {page.faqs.map((f) => (
                <div key={f.question} className="rounded-2xl bg-white border border-slate-200/70 p-7">
                  <h3 className="text-[17px] font-bold text-slate-900 mb-3">{f.question}</h3>
                  <p className="text-slate-600 leading-relaxed">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-20 bg-[#0A1429] overflow-hidden noise">
          <div className="absolute inset-0 glow-orange opacity-50" />
          <div className="absolute inset-0 grid-overlay" />
          <div className="relative max-w-2xl mx-auto px-6 text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">
              Ready to make your move in {page.city}?
            </h2>
            <p className="text-lg text-white/60 mb-10">
              Get a free, no-obligation home valuation or talk to a {page.city} specialist today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="#lead-magnet" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold shadow-[0_20px_50px_-12px_rgba(249,115,22,0.6)] transition-all">
                Get Free Home Valuation <ArrowRight className="w-4 h-4" />
              </a>
              <a href={`tel:${company.phoneTel}`} className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white text-slate-900 font-bold transition-all">
                <Phone className="w-4 h-4" />
                Call {company.phone}
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
