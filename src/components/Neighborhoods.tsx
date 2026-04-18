import { company } from "@/lib/config";
import { cityPages } from "@/lib/city-pages";
import { ArrowRight } from "lucide-react";

/** All service areas — cities with landing pages link there, others go to contact */
const areas = [
  "Troy",
  "Rochester Hills",
  "Bloomfield Hills",
  "West Bloomfield",
  "Birmingham",
  "Sterling Heights",
  "Royal Oak",
  "Detroit",
  "Warren",
  "Farmington Hills",
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
    <section id="areas" className="relative py-28 bg-slate-50 overflow-hidden">
      <div className="absolute inset-0 glow-soft" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.22em] mb-4">
            Where we work
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-[-0.025em] mb-5 leading-[1.05]">
            Serving {company.region}
            <br />
            <span className="gradient-text">block by block.</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Real Estate Market Center represents buyers and sellers across all
            of Metro Detroit's top communities — from family-first suburbs to
            luxury estates and urban investment neighborhoods.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 mb-10">
          {areas.map((name) => {
            const href = getAreaHref(name);
            const hasPage = hasLandingPage(name);
            return (
              <a
                key={name}
                href={href}
                className="group relative overflow-hidden px-6 py-5 rounded-xl bg-white border border-slate-200/70 hover:border-orange-300 hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-slate-500 uppercase tracking-wider mb-0.5">
                      {hasPage ? "View area" : "Serving"}
                    </div>
                    <div className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                      {name}, MI
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-orange-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>

        <div className="text-center">
          <a
            href="/#lead-magnet"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-lg shadow-slate-900/10 transition-colors"
          >
            Get Free Home Valuation →
          </a>
          <p className="text-sm text-slate-500 mt-3">
            Don't see your city?{" "}
            <a href="/#contact" className="text-orange-600 font-semibold hover:underline">
              Just ask
            </a>{" "}
            — we work across all of Michigan.
          </p>
        </div>
      </div>
    </section>
  );
}
