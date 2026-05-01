import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import Reveal from "@/components/motion/Reveal";
import { company } from "@/lib/config";
import { Star, ExternalLink, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Leave a Review | Real Estate Market Center",
  description: `Share your experience with ${company.name}. Your feedback helps Metro Detroit families find a team they can trust.`,
};

const GOOGLE_REVIEW_URL = "https://g.page/r/CedXUjtrh5QfEBM/review";

export default function ReviewPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative pt-44 pb-28 atmosphere grain vignette overflow-hidden">
          <div className="relative max-w-2xl mx-auto px-6 text-center">
            <div className="fade-up flex items-center justify-center gap-3 mb-10">
              <span className="block w-10 h-px bg-[var(--gold)] opacity-60" />
              <span className="eyebrow">
                <Star className="w-3 h-3 inline mr-2 -mt-0.5 text-[var(--gold-soft)]" fill="currentColor" />
                Trusted by hundreds
              </span>
              <span className="block w-10 h-px bg-[var(--gold)] opacity-60" />
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-light text-bone leading-[1.02] mb-7">
              <span className="block overflow-hidden">
                <span className="block mask-wipe">Your feedback</span>
              </span>
              <span className="block overflow-hidden">
                <span className="block mask-wipe delay-1 italic gold-text">means everything.</span>
              </span>
            </h1>

            <p className="fade-up delay-2 text-[17px] text-bone/60 leading-relaxed max-w-lg mx-auto mb-12 font-light">
              If we helped you buy, sell, or invest in {company.region} real estate,
              we'd love to hear about your experience. Your review helps future
              clients find a team they can trust.
            </p>

            <div className="fade-up delay-3 flex justify-center gap-2 mb-12">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className="w-9 h-9 sm:w-11 sm:h-11 text-[var(--gold)]"
                  fill="currentColor"
                  strokeWidth={0}
                />
              ))}
            </div>

            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="fade-up delay-3 group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink font-semibold text-[15px] tracking-wide transition-all duration-500 shadow-[0_30px_80px_-20px_rgba(200,162,76,0.4)]"
            >
              Leave a Google review
              <ExternalLink className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
            </a>

            <p className="fade-up delay-3 text-[13px] text-bone/40 mt-6">
              Takes less than 30 seconds
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="py-28 bg-ink relative overflow-hidden">
          <div className="absolute inset-0 grain pointer-events-none" />
          <div className="relative max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <Reveal>
                <p className="eyebrow mb-5">How it works</p>
              </Reveal>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-bone leading-[1.04]">
                <span className="block overflow-hidden">
                  <Reveal variant="mask" className="block">Three quick steps.</Reveal>
                </span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-10">
              {[
                {
                  num: "01",
                  title: "Click the button",
                  desc: "Opens your Google account on the review page.",
                },
                {
                  num: "02",
                  title: "Pick your rating",
                  desc: "Tap the stars that match your experience.",
                },
                {
                  num: "03",
                  title: "Write a few words",
                  desc: "Even one sentence helps. Mention what we did well.",
                },
              ].map((s, i) => (
                <Reveal key={s.num} delay={((i % 3) + 1) as 1 | 2 | 3} className="text-center">
                  <div className="w-14 h-14 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/5 flex items-center justify-center mx-auto mb-5">
                    <span className="font-display text-xl font-light text-[var(--gold-soft)]">
                      {s.num}
                    </span>
                  </div>
                  <h3 className="font-display text-[1.4rem] font-light text-bone mb-2 tracking-tight">{s.title}</h3>
                  <p className="text-[14px] text-bone/55 leading-relaxed font-light max-w-xs mx-auto">{s.desc}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={3} className="text-center mt-16">
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink font-semibold text-[14px] tracking-wide transition-all duration-500"
              >
                Leave your review
                <ExternalLink className="w-4 h-4" />
              </a>
            </Reveal>
          </div>
        </section>

        {/* Appreciation + Contact */}
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
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-bone leading-[1.05] mb-6">
              <span className="block overflow-hidden">
                <Reveal variant="mask" className="block">Thank you for choosing</Reveal>
              </span>
              <span className="block overflow-hidden">
                <Reveal variant="mask" delay={1} className="block italic gold-text">{company.name}.</Reveal>
              </span>
            </h2>
            <Reveal delay={2}>
              <p className="text-bone/60 text-[17px] leading-relaxed mb-12 font-light">
                We don't take your trust for granted. Every review — good or
                constructive — helps us serve {company.region} better.
              </p>
            </Reveal>

            <Reveal delay={3} className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`tel:${company.phoneTel}`}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-bone/25 text-bone hover:border-bone/60 hover:bg-bone/5 font-medium text-[14px] tracking-wide transition-all duration-500"
              >
                <Phone className="w-4 h-4 text-[var(--gold-soft)]" />
                Call {company.phone}
              </a>
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink font-semibold text-[14px] tracking-wide transition-all duration-500"
              >
                Leave a review
                <ExternalLink className="w-4 h-4" />
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
