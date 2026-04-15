import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import IDXEmbed from "@/components/IDXEmbed";
import ContactForm from "@/components/ContactForm";
import { company } from "@/lib/config";

export const metadata: Metadata = {
  title: "Search Homes in Metro Detroit | Live MLS Listings",
  description:
    "Search every MLS listing across Metro Detroit — Troy, Rochester Hills, Birmingham, Bloomfield Hills, Sterling Heights, Royal Oak, Detroit, Warren, and Farmington Hills. Filter by price, beds, and city.",
  alternates: { canonical: "https://marketcenterrealty.com/search" },
};

export default function SearchPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Search hero */}
        <section className="relative pt-36 pb-10 bg-[#0A1429] text-white overflow-hidden noise">
          <div className="absolute inset-0 glow-orange opacity-40" />
          <div className="absolute inset-0 grid-overlay" />
          <div className="relative max-w-7xl mx-auto px-6">
            <p className="text-xs font-semibold text-orange-400 uppercase tracking-[0.22em] mb-4">
              Live MLS Search
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.025em] leading-[1.05] mb-5">
              Search Homes in <span className="gradient-text">Metro Detroit.</span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
              Every active MLS listing across Troy, Rochester Hills, Birmingham,
              Bloomfield Hills, Sterling Heights, Royal Oak, Detroit, Warren, and
              Farmington Hills — filter by price, beds, baths, and more.
            </p>
          </div>
        </section>

        {/* Search widget */}
        <section className="bg-white py-14">
          <div className="max-w-7xl mx-auto px-6">
            <IDXEmbed widget="search" className="min-h-[600px]" />
          </div>
        </section>

        {/* Map + area search row */}
        <section className="bg-slate-50 py-14">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">
                Map View
              </h2>
              <IDXEmbed widget="map" className="min-h-[500px]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">
                Browse by Area
              </h2>
              <IDXEmbed widget="area" className="min-h-[500px]" />
            </div>
          </div>
        </section>

        {/* Lead capture — schedule / request info */}
        <section className="bg-white py-14">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
              Found a home you like?
            </h2>
            <p className="text-lg text-slate-600 mb-7">
              We can schedule a private showing, pull comps, or share off-market
              properties that match. Call <a href={`tel:${company.phoneTel}`} className="text-orange-600 font-semibold hover:underline">{company.phone}</a> or request info below.
            </p>
          </div>
        </section>

        <ContactForm />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
