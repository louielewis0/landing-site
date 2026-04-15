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
              alt="Sundus Lewis, Real Estate Market Center"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
          </div>

          <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(15,23,42,0.25)] ring-1 ring-slate-200/60 p-5 float hidden sm:block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6c0 1.887.454 3.665 1.257 5.234a.75.75 0 00.515.402L8 14.5V17a1 1 0 001 1h2a1 1 0 001-1v-2.5l2.228-.864a.75.75 0 00.515-.402A11.948 11.948 0 0016 8a6 6 0 00-6-6zm0 2a4 4 0 014 4c0 1.415-.331 2.758-.92 3.966L11 12.25V16H9v-3.75l-2.08-.284A9.948 9.948 0 016 8a4 4 0 014-4z" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 leading-none">20+</div>
                <div className="text-[11px] text-slate-500 uppercase tracking-[0.15em] font-medium mt-1">
                  Years Experience
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.22em] mb-4">
            About
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-slate-900 tracking-[-0.02em] mb-7 leading-[1.05]">
            Local experts.
            <br />
            <span className="gradient-text">Real results.</span>
          </h2>
          <div className="space-y-5 text-slate-700 text-[17px] leading-[1.7]">
            <p>
              {company.name} has been helping families and investors across
              Metro Detroit for over two decades. We're not a franchise. We're
              not a call center. We're the team picking up the phone.
            </p>
            <p>
              That means straight answers about pricing, marketing, and whether
              it's actually the right time to make a move. We tell you the
              truth, even when it costs us a listing. That's the reason clients
              keep coming back — and keep sending their friends.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-10">
            <a
              href="#lead-magnet"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-colors shadow-lg shadow-slate-900/10"
            >
              Book a consultation
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
