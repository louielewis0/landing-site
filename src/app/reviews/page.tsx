import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { company } from "@/lib/config";
import { Star, ExternalLink, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Leave a Review | Real Estate Market Center",
  description: `Share your experience with ${company.name}. Your feedback helps Metro Detroit families find a team they can trust.`,
};

const GOOGLE_REVIEW_URL =
  "https://www.google.com/search?q=Real+Estate+Market+Center+Troy+MI";

export default function ReviewPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative pt-40 pb-24 bg-[#0A1429] overflow-hidden noise">
          <div className="absolute inset-0 glow-orange opacity-60" />
          <div className="absolute inset-0 grid-overlay" />

          <div className="relative max-w-2xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/70 mb-8">
              <Star className="w-3.5 h-3.5 text-orange-400" fill="currentColor" />
              Trusted by hundreds of Metro Detroit families
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-[-0.03em] leading-[1.05] mb-6">
              Your feedback
              <br />
              <span className="gradient-text">means everything.</span>
            </h1>

            <p className="text-lg text-white/65 leading-relaxed max-w-lg mx-auto mb-12">
              If we helped you buy, sell, or invest in Metro Detroit real estate,
              we'd love to hear about your experience. Your review helps future
              clients find a team they can trust.
            </p>

            {/* Stars */}
            <div className="flex justify-center gap-2 mb-10">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className="w-10 h-10 sm:w-12 sm:h-12 text-orange-400"
                  fill="currentColor"
                  strokeWidth={0}
                />
              ))}
            </div>

            {/* Big Review Button */}
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold text-lg shadow-[0_20px_60px_-12px_rgba(249,115,22,0.6)] hover:shadow-[0_20px_60px_-8px_rgba(249,115,22,0.8)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Leave a Google Review
              <ExternalLink className="w-5 h-5" />
            </a>

            <p className="text-sm text-white/40 mt-6">
              Takes less than 30 seconds
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight text-center mb-12">
              Three quick steps.
            </h2>

            <div className="grid sm:grid-cols-3 gap-8">
              {[
                {
                  num: "1",
                  title: "Click the button",
                  desc: "Opens your Google account on the review page.",
                },
                {
                  num: "2",
                  title: "Pick your rating",
                  desc: "Tap the stars that match your experience.",
                },
                {
                  num: "3",
                  title: "Write a few words",
                  desc: "Even one sentence helps. Mention what we did well.",
                },
              ].map((s) => (
                <div key={s.num} className="text-center">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-200 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-orange-600">
                      {s.num}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">{s.title}</h3>
                  <p className="text-sm text-slate-600">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-colors"
              >
                Leave Your Review →
              </a>
            </div>
          </div>
        </section>

        {/* Appreciation + Contact */}
        <section className="relative py-20 bg-[#0A1429] overflow-hidden noise">
          <div className="absolute inset-0 glow-orange opacity-30" />
          <div className="absolute inset-0 grid-overlay" />

          <div className="relative max-w-2xl mx-auto px-6 text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">
              Thank you for choosing
              <br />
              <span className="gradient-text">{company.name}.</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-10">
              We don't take your trust for granted. Every review — good or
              constructive — helps us serve Metro Detroit better.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`tel:${company.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white text-slate-900 hover:bg-white/90 font-bold transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call {company.phone}
              </a>
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold shadow-[0_12px_40px_-12px_rgba(249,115,22,0.6)] transition-all"
              >
                Leave a Review
                <ExternalLink className="w-4 h-4" />
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
