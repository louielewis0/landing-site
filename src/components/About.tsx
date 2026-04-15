import Image from "next/image";
import { company } from "@/lib/config";

export default function About() {
  return (
    <section id="about" className="relative py-28 bg-white overflow-hidden">
      <div className="absolute inset-0 glow-soft" />

      <div className="relative max-w-6xl mx-auto px-6 grid lg:grid-cols-5 gap-14 items-center">
        <div className="lg:col-span-2 relative">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-slate-100 shadow-[0_40px_80px_-30px_rgba(15,23,42,0.3)] ring-1 ring-slate-200/60">
            <Image
              src="/agent.jpg"
              alt="Real Estate Market Center — Metro Detroit real estate experts"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
          </div>

        </div>

        <div className="lg:col-span-3">
          <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.22em] mb-4">
            About
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-slate-900 tracking-[-0.02em] mb-7 leading-[1.05]">
            {company.region}'s trusted
            <br />
            <span className="gradient-text">real estate experts.</span>
          </h2>
          <p className="text-slate-700 text-[17px] leading-[1.7] mb-7">
            We are a {company.region}-based real estate team specializing in
            helping buyers, sellers, and investors make confident real estate
            decisions. With <strong>over 20 years of experience</strong> and{" "}
            <strong>$100M+ in closed transactions</strong>, we bring deep market
            expertise and strong negotiation skills to every client.
          </p>

          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {[
              "Licensed real estate professionals",
              "Residential, commercial & luxury",
              "First-time buyer specialists",
              "Investor-focused strategies",
            ].map((p) => (
              <div key={p} className="flex gap-2.5 text-sm text-slate-700">
                <svg
                  className="w-5 h-5 text-orange-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {p}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#lead-magnet"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-colors shadow-lg shadow-slate-900/10"
            >
              Schedule Consultation
            </a>
            <a
              href={`tel:${company.phoneTel}`}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white font-semibold transition-colors"
            >
              Call {company.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
