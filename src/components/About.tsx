import Image from "next/image";
import { company } from "@/lib/config";
import Reveal from "./motion/Reveal";
import Parallax from "./motion/Parallax";
import TiltCard from "./motion/TiltCard";
import MagneticButton from "./motion/MagneticButton";

export default function About() {
  return (
    <section id="about" className="relative py-32 bg-ink overflow-hidden">
      <div className="absolute inset-0 grain pointer-events-none" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 30% 50%, rgba(200,162,76,0.12), transparent 65%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-14 lg:gap-20 items-center">
        <Reveal delay={1} className="lg:col-span-5 relative">
          <Parallax speed={-0.08}>
            <TiltCard className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-ink-2 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.8)] ring-1 ring-bone/10">
              <Image
                src="/agent.jpg"
                alt={`${company.name} — Metro Detroit real estate experts`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              {/* warm gradient cinematic wash */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              <div
                className="absolute inset-0 mix-blend-overlay opacity-30"
                style={{
                  background: "linear-gradient(135deg, rgba(200,162,76,0.5), transparent 60%)",
                }}
              />
            </TiltCard>
          </Parallax>

          {/* Floating credential card */}
          <div className="absolute -bottom-6 -right-4 lg:-right-10 w-44 px-5 py-4 rounded-xl bg-ink-2 border border-bone/10 backdrop-blur-xl shadow-2xl drift">
            <div className="font-display text-3xl font-light text-bone">20+</div>
            <div className="text-[10px] text-bone/50 uppercase tracking-[0.22em] mt-1">
              Years on the ground
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow mb-5">About</p>
          </Reveal>
          <h2 className="font-display text-5xl md:text-6xl lg:text-[4rem] font-light text-bone leading-[1.04] mb-8">
            <span className="block overflow-hidden">
              <Reveal variant="mask" className="block">{company.region}'s trusted</Reveal>
            </span>
            <span className="block overflow-hidden">
              <Reveal variant="mask" delay={1} className="block italic gold-text">real-estate experts.</Reveal>
            </span>
          </h2>
          <Reveal delay={2}>
            <p className="text-bone/65 text-[17px] leading-[1.75] mb-10 font-light max-w-xl">
              We're a {company.region}-based team helping buyers, sellers, and
              investors make confident real-estate decisions. Over{" "}
              <span className="text-bone">20 years of experience</span> and{" "}
              <span className="text-bone">$100M+ in closed transactions</span>{" "}
              behind every conversation.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-10 max-w-xl">
            {[
              "Licensed real estate professionals",
              "Residential, commercial & luxury",
              "First-time buyer specialists",
              "Investor-focused strategies",
            ].map((p, i) => (
              <Reveal key={p} delay={((i % 3) + 1) as 1 | 2 | 3} className="flex gap-3 items-center text-[14.5px] text-bone/70 font-light">
                <span className="w-1 h-1 rounded-full bg-[var(--gold-soft)]" />
                {p}
              </Reveal>
            ))}
          </div>

          <Reveal delay={3} className="flex flex-col sm:flex-row gap-3">
            <MagneticButton as="div" className="inline-block">
              <a
                href="#lead-magnet"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink font-semibold text-[14px] tracking-wide transition-all duration-500"
              >
                Schedule a consultation
              </a>
            </MagneticButton>
            <MagneticButton as="div" className="inline-block">
              <a
                href={`tel:${company.phoneTel}`}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-bone/25 text-bone hover:border-bone/60 hover:bg-bone/5 font-medium text-[14px] tracking-wide transition-all duration-500"
              >
                Call {company.phone}
              </a>
            </MagneticButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
