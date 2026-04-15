import Image from "next/image";
import { company } from "@/lib/config";

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-5 gap-12 items-center">
        <div className="lg:col-span-2 relative">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.15)]">
            <Image
              src="/agent.jpg"
              alt="Sundus Lewis, Real Estate Market Center"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
              priority={false}
            />
          </div>
          <div className="absolute -bottom-5 -right-5 bg-orange-500 text-white px-5 py-3 rounded-xl shadow-xl rotate-2 hidden sm:block">
            <div className="text-2xl font-bold leading-none">20+</div>
            <div className="text-[11px] uppercase tracking-wider opacity-90">Years</div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em] mb-3">
            About
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6 leading-[1.05]">
            Local experts. <span className="gradient-text">Real results.</span>
          </h2>
          <div className="space-y-4 text-slate-700 text-[17px] leading-relaxed">
            <p>
              {company.name} has been helping families and investors across
              Metro Detroit for over two decades. We're not a franchise, we're
              not a call center — we're the team picking up the phone.
            </p>
            <p>
              That means you get straight answers about pricing, pricing
              strategy, and whether it's actually the right time to make a
              move. We tell you the truth, even when it costs us a listing.
              That's the reason clients keep coming back — and keep sending
              their friends.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <a
              href="#lead-magnet"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-colors"
            >
              Book a consultation
            </a>
            <a
              href={`tel:${company.phoneTel}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white font-semibold transition-colors"
            >
              Call {company.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
