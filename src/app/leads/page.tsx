import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { company } from "@/lib/config";
import LeadsForm from "./LeadsForm";

export const metadata: Metadata = {
  title: `Get in Touch | ${company.name}`,
  description:
    "Tell us your move — buy, sell, both, or just browsing — and a real Metro Detroit broker will reach back out within the hour.",
  alternates: { canonical: "https://marketcenterrealty.com/leads" },
  openGraph: {
    title: `Get in Touch | ${company.name}`,
    description:
      "Tell us your move and a real Metro Detroit broker will reach back out within the hour.",
    type: "website",
    url: "https://marketcenterrealty.com/leads",
    siteName: company.name,
  },
  robots: { index: true, follow: true },
};

export default function LeadsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative pt-36 pb-28 atmosphere grain vignette overflow-hidden min-h-[80vh] flex items-center">
          {/* Same atmospheric layers used across the cinematic site */}
          <div className="absolute inset-0 -z-10 scanline opacity-30 pointer-events-none" />

          <div className="relative max-w-6xl mx-auto px-6 w-full grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <div className="fade-up flex items-center gap-3 mb-8">
                <span className="block w-10 h-px bg-[var(--gold)] opacity-60" />
                <span className="eyebrow">Metro Detroit · Brokerage</span>
              </div>

              <h1 className="font-display text-[3rem] sm:text-6xl lg:text-[4.5rem] font-light leading-[1.02] mb-7 text-bone tracking-[-0.025em]">
                <span className="block overflow-hidden">
                  <span className="block mask-wipe">Tell us your move.</span>
                </span>
                <span className="block overflow-hidden">
                  <span className="block mask-wipe delay-1 italic gold-text">We&rsquo;ll take it from here.</span>
                </span>
              </h1>

              <p className="fade-up delay-2 max-w-xl text-[17px] sm:text-lg text-bone/65 leading-[1.65] mb-10 font-light">
                A real broker reaches back out — usually within the hour. No bots,
                no generic replies. Whether you&rsquo;re buying, selling, or just
                exploring, we&rsquo;ll meet you where you are.
              </p>

              <div className="fade-up delay-3 flex flex-wrap items-center gap-x-7 gap-y-2 text-[13px] text-bone/45">
                <span className="inline-flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-[var(--gold-soft)]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Five-star rated
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="block w-1 h-1 rounded-full bg-bone/25" />
                  20+ years in Metro Detroit
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="block w-1 h-1 rounded-full bg-bone/25" />
                  Replies within the hour
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 fade-up delay-3">
              <LeadsForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
