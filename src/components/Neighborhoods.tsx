import { company } from "@/lib/config";
import { cityPages } from "@/lib/city-pages";
import { ArrowRight } from "lucide-react";
import Reveal from "./motion/Reveal";

const areas = [
  "Troy",
  "Rochester Hills",
  "Birmingham",
  "Bloomfield Hills",
  "West Bloomfield",
  "Sterling Heights",
  "Warren",
];

function getAreaHref(cityName: string): string {
  const page = cityPages.find((p) => p.city === cityName);
  return page ? `/${page.slug}` : "/#contact";
}

function hasLandingPage(cityName: string): boolean {
  return cityPages.some((p) => p.city === cityName);
}

export default function Neighborhoods() {
  return (
    <section id="areas" className="relative py-32 atmosphere overflow-hidden">
      <div className="absolute inset-0 grain pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <Reveal>
            <p className="eyebrow mb-5">Where we work</p>
          </Reveal>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-bone leading-[1.02] mb-6">
            <span className="block overflow-hidden">
              <Reveal variant="mask" className="block">
                Serving {company.region}
              </Reveal>
            </span>
            <span className="block overflow-hidden">
              <Reveal variant="mask" delay={1} className="block italic gold-text">
                block by block.
              </Reveal>
            </span>
          </h2>
          <Reveal delay={2}>
            <p className="text-[17px] text-bone/55 leading-relaxed font-light max-w-2xl mx-auto">
              From family-first suburbs to luxury estates and urban investment
              neighborhoods — we know the streets, not just the listings.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {areas.map((name, i) => {
            const href = getAreaHref(name);
            const hasPage = hasLandingPage(name);
            return (
              <Reveal
                key={name}
                delay={((i % 3) + 1) as 1 | 2 | 3}
                as="a"
                className="group relative overflow-hidden rounded-xl border border-bone/10 bg-ink-2/60 hover:border-[var(--gold)]/40 hover:bg-ink-2 transition-all duration-700"
              >
                <a href={href} className="absolute inset-0 z-10" aria-label={`${name}, MI`} />
                <div className="px-7 py-7 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-bone/40 uppercase tracking-[0.22em] mb-2">
                      {hasPage ? "Area Guide" : "Serving"}
                    </div>
                    <div className="font-display text-[1.6rem] font-light text-bone group-hover:text-[var(--gold-soft)] transition-colors duration-500 leading-tight">
                      {name}, MI
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[var(--gold-soft)] group-hover:translate-x-1 transition-transform duration-500" />
                </div>
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/0 to-transparent group-hover:via-[var(--gold)]/60 transition-all duration-700"
                />
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={2} className="text-center">
          <a
            href="/#lead-magnet"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink font-semibold text-[14px] tracking-wide transition-all duration-500"
          >
            Request your valuation
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-sm text-bone/50 mt-4">
            Don't see your city?{" "}
            <a href="/#contact" className="text-[var(--gold-soft)] font-medium hover:text-[var(--gold)] transition-colors">
              Just ask
            </a>{" "}
            — we work across all of Michigan.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
