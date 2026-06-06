import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { company } from "@/lib/config";
import HomeValueForm from "./HomeValueForm";

export const metadata: Metadata = {
  title: `What's My Home Worth? | Free Home Valuation | ${company.name}`,
  description:
    "Get a free, no-obligation home valuation from a local Metro Detroit broker. Real comps, real numbers — back to you within 24 hours.",
  alternates: { canonical: "https://marketcenterrealty.com/home-value" },
  openGraph: {
    title: `Free Home Valuation | ${company.name}`,
    description:
      "Get a free, no-obligation home valuation from a local Metro Detroit broker. Real comps, back within 24 hours.",
    type: "website",
    url: "https://marketcenterrealty.com/home-value",
    siteName: company.name,
  },
  robots: { index: true, follow: true },
};

export default function HomeValuePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative pt-36 pb-28 atmosphere grain vignette overflow-hidden min-h-[88vh] flex items-center">
          <div className="absolute inset-0 -z-10 scanline opacity-30 pointer-events-none" />

          <div className="relative max-w-6xl mx-auto px-6 w-full grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <div className="fade-up flex items-center gap-3 mb-8">
                <span className="block w-10 h-px bg-[var(--gold)] opacity-60" />
                <span className="eyebrow">Free · 24-hour turnaround</span>
              </div>

              <h1 className="font-display text-[3rem] sm:text-6xl lg:text-[4.25rem] font-light leading-[1.02] mb-7 text-bone tracking-[-0.025em]">
                <span className="block overflow-hidden">
                  <span className="block mask-wipe">What&rsquo;s your home</span>
                </span>
                <span className="block overflow-hidden">
                  <span className="block mask-wipe delay-1 italic gold-text">actually worth?</span>
                </span>
              </h1>

              <p className="fade-up delay-2 text-[17px] sm:text-lg text-bone/65 leading-[1.65] mb-10 font-light max-w-md">
                A free, no-obligation market analysis from a local {company.region} broker.
                Real comps, no algorithm guesswork — back to you within 24 hours.
              </p>

              <div className="fade-up delay-3 space-y-3 max-w-md">
                {[
                  "Comps from the last 90 days on your street",
                  "Local broker who knows your neighborhood",
                  "Realistic list-price range, no inflated promises",
                  "Free, with zero obligation to list",
                ].map((p) => (
                  <div key={p} className="flex gap-3 text-[14.5px] text-bone/75 font-light">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full border border-[var(--gold)]/40 flex items-center justify-center mt-[2px]">
                      <svg
                        className="w-3 h-3 text-[var(--gold-soft)]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {p}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 fade-up delay-3">
              <HomeValueForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
