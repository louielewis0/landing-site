import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import Reveal from "@/components/motion/Reveal";
import { company } from "@/lib/config";
import {
  Phone,
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  Home,
  Car,
  Sparkles,
  ArrowRight,
  Mail,
  CheckCircle2,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "5040 Patrick Road, West Bloomfield — $448,900 | 4 Bed 3 Bath Colonial | Real Estate Market Center",
  description:
    "Beautifully maintained 4-bed, 3-bath colonial in West Bloomfield Twp. 2,040 sqft, updated kitchen with granite, white brick fireplace, large deck, 2-car garage. Listed at $448,900. MLS #20261021717.",
  openGraph: {
    title: "5040 Patrick Road, West Bloomfield — $448,900",
    description: "4 Bed | 3 Bath | 2,040 sqft | Move-in ready colonial with updated kitchen, fireplace, large deck & 2-car garage.",
    type: "website",
  },
};

const features = [
  { icon: BedDouble, label: "Bedrooms", value: "4" },
  { icon: Bath, label: "Bathrooms", value: "3" },
  { icon: Ruler, label: "Sq Ft", value: "2,040" },
  { icon: Home, label: "Style", value: "Colonial" },
  { icon: Car, label: "Garage", value: "2-Car" },
  { icon: MapPin, label: "City", value: "West Bloomfield" },
];

const highlights = [
  "Modernized kitchen with granite countertops & stainless steel appliances",
  "Stunning white brick fireplace in the family room",
  "Hardwood flooring throughout upstairs bedrooms",
  "Updated bathrooms with granite vanities & modern finishes",
  "Fully functional basement — additional living or storage space",
  "Expansive deck overlooking a large private backyard",
  "Great curb appeal with a 2-car attached garage",
  "Move-in ready — no major updates needed",
];

export default function ListingPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="relative pt-36 pb-24 atmosphere grain vignette overflow-hidden">
          <div className="relative max-w-6xl mx-auto px-6">
            <div className="fade-up flex items-center gap-3 mb-8">
              <span className="block w-10 h-px bg-[var(--gold)] opacity-60" />
              <span className="eyebrow">
                <Sparkles className="w-3 h-3 inline mr-2 -mt-0.5 text-[var(--gold-soft)]" />
                Just Listed · MLS #20261021717
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-[5rem] font-light text-bone leading-[1.02] mb-4 tracking-tight">
              <span className="block overflow-hidden">
                <span className="block mask-wipe">5040 Patrick Road</span>
              </span>
            </h1>
            <p className="fade-up delay-1 text-xl sm:text-2xl text-bone/55 mb-2 font-light">
              West Bloomfield Twp, MI 48322
            </p>

            <div className="fade-up delay-2 flex flex-wrap items-baseline gap-4 mt-10 mb-12">
              <span className="font-display text-6xl sm:text-7xl font-light gold-text tracking-tight">
                $448,900
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-12">
              {features.map((f, i) => (
                <Reveal key={f.label} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-bone/[0.03] border border-bone/10">
                  <f.icon className="w-4 h-4 text-[var(--gold-soft)] flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <div className="font-display text-[15px] font-light text-bone leading-none">{f.value}</div>
                    <div className="text-[10px] text-bone/45 mt-1 uppercase tracking-[0.18em]">{f.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="fade-up delay-3 flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${company.phoneTel}`}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink font-semibold text-[14px] tracking-wide transition-all duration-500"
              >
                <Phone className="w-4 h-4" />
                Schedule a showing
              </a>
              <a
                href={`mailto:${company.email}?subject=Inquiry: 5040 Patrick Road, West Bloomfield&body=Hi, I'm interested in the property at 5040 Patrick Road, West Bloomfield (MLS %2320261021717). Please send me more information.`}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-bone/25 text-bone hover:border-bone/60 hover:bg-bone/5 font-medium text-[14px] tracking-wide transition-all duration-500"
              >
                <Mail className="w-4 h-4 text-[var(--gold-soft)]" />
                Request info
              </a>
            </div>
          </div>
        </section>

        {/* ── Description ── */}
        <section className="py-24 bg-ink relative overflow-hidden">
          <div className="absolute inset-0 grain pointer-events-none" />
          <div className="relative max-w-4xl mx-auto px-6">
            <Reveal>
              <p className="eyebrow mb-5">About this home</p>
            </Reveal>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-bone leading-[1.05] mb-10">
              <span className="block overflow-hidden">
                <Reveal variant="mask" className="block italic gold-text">A move-in ready colonial.</Reveal>
              </span>
            </h2>
            <div className="text-[17px] text-bone/70 leading-[1.85] space-y-6 font-light">
              <Reveal>
                <p>
                  Beautifully maintained colonial-style home offering spacious living and thoughtful
                  updates throughout. Step inside to a bright and open layout featuring large living
                  and dining areas with abundant natural light and updated flooring, perfect for both
                  everyday living and entertaining.
                </p>
              </Reveal>
              <Reveal delay={1}>
                <p>
                  The home includes a modernized kitchen with granite countertops, stainless steel
                  appliances, and ample cabinet space, seamlessly connected to the main living areas.
                  Enjoy a cozy family room with a stunning white brick fireplace and direct access to
                  the backyard.
                </p>
              </Reveal>
              <Reveal delay={2}>
                <p>
                  Upstairs, you'll find generously sized bedrooms with hardwood flooring, while the
                  bathrooms have been tastefully updated with granite vanities and modern finishes.
                  The fully functional basement provides additional living or storage space, offering
                  flexibility for future customization.
                </p>
              </Reveal>
              <Reveal delay={3}>
                <p>
                  Step outside to a large backyard with an expansive deck, ideal for relaxing,
                  hosting gatherings, or enjoying peaceful outdoor views. Complete with great curb
                  appeal, a 2-car garage, and a desirable layout, this home is move-in ready and a
                  must-see.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Highlights ── */}
        <section className="py-24 atmosphere relative overflow-hidden">
          <div className="absolute inset-0 grain pointer-events-none" />
          <div className="relative max-w-4xl mx-auto px-6">
            <Reveal>
              <p className="eyebrow mb-5">Key features</p>
            </Reveal>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-bone leading-[1.05] mb-12">
              <span className="block overflow-hidden">
                <Reveal variant="mask" className="block">What sets it apart.</Reveal>
              </span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {highlights.map((h, i) => (
                <Reveal
                  key={h}
                  delay={((i % 3) + 1) as 1 | 2 | 3}
                  className="flex gap-3 p-5 rounded-xl bg-bone/[0.03] border border-bone/10 hover:border-[var(--gold)]/30 transition-all duration-500"
                >
                  <CheckCircle2 className="w-5 h-5 text-[var(--gold-soft)] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span className="text-[14.5px] text-bone/75 font-light leading-relaxed">{h}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Property Details ── */}
        <section className="py-24 bg-ink relative overflow-hidden">
          <div className="absolute inset-0 grain pointer-events-none" />
          <div className="relative max-w-4xl mx-auto px-6">
            <Reveal>
              <p className="eyebrow mb-5">Property details</p>
            </Reveal>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-bone leading-[1.05] mb-12">
              <span className="block overflow-hidden">
                <Reveal variant="mask" className="block">The specifics.</Reveal>
              </span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-1">
              {[
                { label: "Address", value: "5040 Patrick Road" },
                { label: "City", value: "West Bloomfield Twp, MI 48322" },
                { label: "Price", value: "$448,900" },
                { label: "Bedrooms", value: "4" },
                { label: "Bathrooms", value: "3" },
                { label: "Square Feet", value: "2,040" },
                { label: "Property Type", value: "Colonial / Single Family" },
                { label: "Garage", value: "2-Car Attached" },
                { label: "Basement", value: "Yes — Full, Functional" },
                { label: "Fireplace", value: "Yes — White Brick" },
                { label: "MLS Number", value: "#20261021717" },
                { label: "Status", value: "Active — Just Listed" },
              ].map((d) => (
                <div key={d.label} className="flex justify-between py-4 border-b border-bone/10">
                  <span className="text-[12px] text-bone/45 uppercase tracking-[0.18em]">{d.label}</span>
                  <span className="text-[14px] text-bone font-medium">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Location ── */}
        <section className="py-24 atmosphere relative overflow-hidden">
          <div className="absolute inset-0 grain pointer-events-none" />
          <div className="relative max-w-4xl mx-auto px-6">
            <Reveal>
              <p className="eyebrow mb-5">Location</p>
            </Reveal>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-bone leading-[1.05] mb-6">
              <span className="block overflow-hidden">
                <Reveal variant="mask" className="block">Where it lives.</Reveal>
              </span>
            </h2>
            <Reveal delay={1}>
              <p className="text-bone/65 mb-8 text-[16px] leading-relaxed font-light max-w-2xl">
                Located in West Bloomfield Township — known for lakefront living, top-rated schools,
                and a diverse community. Minutes from Orchard Lake Road shopping and dining, Cass Lake,
                and major freeway access.
              </p>
            </Reveal>
            <Reveal delay={2} className="rounded-2xl overflow-hidden border border-bone/10 aspect-video shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
              <iframe
                src="https://maps.google.com/maps?q=5040+Patrick+Road+West+Bloomfield+MI+48322&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(0.4) contrast(1.05)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="5040 Patrick Road, West Bloomfield"
              />
            </Reveal>
          </div>
        </section>

        {/* ── West Bloomfield context ── */}
        <section className="py-20 bg-ink-2 relative overflow-hidden border-y border-bone/10">
          <div className="absolute inset-0 grain pointer-events-none" />
          <div className="relative max-w-3xl mx-auto px-6">
            <Reveal className="rounded-2xl bg-bone/[0.03] border border-bone/10 p-9">
              <p className="eyebrow mb-4">Why West Bloomfield</p>
              <p className="text-[17px] text-bone/75 leading-[1.85] font-light">
                West Bloomfield offers a unique combination of lakefront living, cultural diversity,
                and suburban convenience. The township's 14+ lakes, highly rated schools, and proximity
                to Orchard Lake Road's dining and retail make it one of Oakland County's most desirable
                communities. Homes here hold their value and demand stays strong year-round.
              </p>
              <a
                href="/west-bloomfield-real-estate-agent"
                className="inline-flex items-center gap-2 text-[var(--gold-soft)] font-medium text-[13px] tracking-wide mt-6 hover:text-[var(--gold)] transition-colors"
              >
                Learn more about West Bloomfield real estate <ArrowRight className="w-4 h-4" />
              </a>
            </Reveal>
          </div>
        </section>

        {/* ── Agent CTA ── */}
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
          <div className="relative max-w-4xl mx-auto px-6">
            <div className="grid md:grid-cols-[auto_1fr] gap-12 items-center">
              <Reveal className="w-32 h-32 md:w-44 md:h-44 rounded-2xl overflow-hidden bg-ink-2 mx-auto md:mx-0 ring-1 ring-bone/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
                <Image
                  src="/agent.jpg"
                  alt="Real Estate Market Center Agent"
                  width={176}
                  height={176}
                  className="w-full h-full object-cover"
                />
              </Reveal>

              <div className="text-center md:text-left">
                <Reveal>
                  <p className="eyebrow mb-4">Talk to a broker</p>
                </Reveal>
                <h2 className="font-display text-4xl sm:text-5xl font-light text-bone leading-[1.05] mb-5">
                  <span className="block overflow-hidden">
                    <Reveal variant="mask" className="block italic gold-text">Interested in this property?</Reveal>
                  </span>
                </h2>
                <Reveal delay={1}>
                  <p className="text-bone/65 text-[16px] mb-8 leading-relaxed font-light">
                    Call to schedule a private showing, ask about the neighborhood, or request
                    a full property report. We respond within the hour.
                  </p>
                </Reveal>

                <Reveal delay={2} className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                  <a
                    href={`tel:${company.phoneTel}`}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink font-semibold text-[14px] tracking-wide transition-all duration-500"
                  >
                    <Phone className="w-4 h-4" />
                    Call {company.phone}
                  </a>
                  <a
                    href={`mailto:${company.email}?subject=Inquiry: 5040 Patrick Road&body=I'd like to schedule a showing for 5040 Patrick Road, West Bloomfield.`}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-bone/25 text-bone hover:border-bone/60 hover:bg-bone/5 font-medium text-[14px] tracking-wide transition-all duration-500"
                  >
                    <Mail className="w-4 h-4 text-[var(--gold-soft)]" />
                    Email us
                  </a>
                </Reveal>

                <Reveal delay={3} className="flex items-center gap-7 mt-7 justify-center md:justify-start text-[12px] text-bone/45 tracking-wide">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-[var(--gold-soft)]" fill="currentColor" strokeWidth={0} />
                    <span>5-star rated</span>
                  </div>
                  <div>20+ years</div>
                  <div>$100M+ sold</div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── Social Media Flyers (intentionally bright/orange — these get screenshotted for IG/TikTok) ── */}
        <section className="py-24 bg-[#060B18] relative overflow-hidden">
          <div className="relative max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="eyebrow mb-3">Social media flyers</p>
              <h2 className="font-display text-3xl font-light text-bone tracking-tight mb-2">
                Screenshot &amp; post.
              </h2>
              <p className="text-bone/45 text-sm">Save each image below and post to Instagram, TikTok or Facebook</p>
            </div>

            <div className="flex flex-col items-center gap-16">
              {/* ── Instagram Post (1:1) ── */}
              <div>
                <p className="text-xs text-bone/40 uppercase tracking-wider text-center mb-3">Instagram Post — Square</p>
                <div className="relative overflow-hidden bg-[#0A1429] rounded-2xl" style={{ width: 540, height: 540, maxWidth: "90vw", aspectRatio: "1/1" }}>
                  <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 20%, rgba(249,115,22,0.25), transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(37,99,235,0.15), transparent 50%)" }} />
                  <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                  <div className="relative h-full flex flex-col justify-between p-10">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider">Just Listed</div>
                    </div>
                    <div>
                      <div className="text-[64px] font-black tracking-[-0.03em] leading-none mb-3" style={{ background: "linear-gradient(135deg, #fdba74, #fb923c, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>$448,900</div>
                      <div className="text-white text-xl font-bold tracking-tight">5040 Patrick Road</div>
                      <div className="text-white/60 text-sm mt-1">West Bloomfield Twp, MI 48322</div>
                      <div className="flex gap-5 mt-5">
                        {[{ v: "4", l: "Beds" }, { v: "3", l: "Baths" }, { v: "2,040", l: "Sq Ft" }, { v: "2-Car", l: "Garage" }].map((s) => (
                          <div key={s.l}><div className="text-white text-xl font-bold leading-none">{s.v}</div><div className="text-white/40 text-[10px] uppercase tracking-wider mt-1">{s.l}</div></div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {["Granite Kitchen", "Fireplace", "Hardwood Floors", "Large Deck", "Updated Baths", "Full Basement"].map((t) => (
                          <span key={t} className="px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-white/70 text-[9px] font-medium">{t}</span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/10">
                            <Image src="/logo.png" alt="REMC" width={40} height={40} className="w-full h-full object-contain" />
                          </div>
                          <div>
                            <div className="text-white text-xs font-bold">Real Estate Market Center</div>
                            <div className="text-white/50 text-[10px]">(248) 568-6081</div>
                          </div>
                        </div>
                        <div className="text-[9px] text-white/30">MLS #20261021717</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── TikTok / IG Story (9:16) ── */}
              <div>
                <p className="text-xs text-bone/40 uppercase tracking-wider text-center mb-3">TikTok / IG Story</p>
                <div className="relative overflow-hidden bg-[#0A1429] rounded-2xl" style={{ width: 360, height: 640, maxWidth: "90vw" }}>
                  <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 10%, rgba(249,115,22,0.3), transparent 50%), radial-gradient(ellipse at 50% 90%, rgba(37,99,235,0.2), transparent 50%)" }} />
                  <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
                  <div className="relative h-full flex flex-col justify-between p-8">
                    <div className="text-center">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider mb-4">Just Listed</div>
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/10 mx-auto mt-2">
                        <Image src="/logo.png" alt="REMC" width={48} height={48} className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-[56px] font-black tracking-[-0.03em] leading-none mb-2" style={{ background: "linear-gradient(135deg, #fdba74, #fb923c, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>$448,900</div>
                      <div className="text-white text-lg font-bold tracking-tight">5040 Patrick Road</div>
                      <div className="text-white/55 text-sm mt-1">West Bloomfield, MI 48322</div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[{ v: "4", l: "Beds" }, { v: "3", l: "Baths" }, { v: "2,040", l: "Sq Ft" }, { v: "2-Car", l: "Garage" }].map((s) => (
                        <div key={s.l} className="text-center py-3 rounded-xl bg-white/[0.04] border border-white/10">
                          <div className="text-white text-lg font-bold leading-none">{s.v}</div>
                          <div className="text-white/40 text-[9px] uppercase tracking-wider mt-1">{s.l}</div>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      {["Granite kitchen with stainless appliances", "White brick fireplace in family room", "Hardwood floors & updated bathrooms", "Large deck with private backyard", "Full basement + 2-car garage"].map((h) => (
                        <div key={h} className="flex items-center gap-2.5 text-[11px] text-white/70">
                          <div className="w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />{h}
                        </div>
                      ))}
                    </div>
                    <div className="text-center">
                      <div className="px-6 py-3 rounded-xl bg-orange-500 text-white font-bold text-sm">Call (248) 568-6081</div>
                      <div className="text-white/30 text-[9px] mt-3 uppercase tracking-wider">Real Estate Market Center · MLS #20261021717</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── IG Feed (4:5) ── */}
              <div>
                <p className="text-xs text-bone/40 uppercase tracking-wider text-center mb-3">Instagram Feed — 4:5</p>
                <div className="relative overflow-hidden bg-[#0A1429] rounded-2xl" style={{ width: 432, height: 540, maxWidth: "90vw" }}>
                  <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 30%, rgba(249,115,22,0.25), transparent 55%), radial-gradient(ellipse at 85% 75%, rgba(37,99,235,0.18), transparent 50%)" }} />
                  <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
                  <div className="relative h-full flex flex-col justify-between p-9">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider">Just Listed</div>
                      <div className="w-9 h-9 rounded-lg overflow-hidden bg-white/10">
                        <Image src="/logo.png" alt="REMC" width={36} height={36} className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <div>
                      <div className="text-[54px] font-black tracking-[-0.03em] leading-none mb-2" style={{ background: "linear-gradient(135deg, #fdba74, #fb923c, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>$448,900</div>
                      <div className="text-white text-xl font-bold tracking-tight">5040 Patrick Road</div>
                      <div className="text-white/55 text-sm mt-1">West Bloomfield, MI 48322</div>
                      <div className="flex gap-5 mt-5">
                        {[{ v: "4", l: "Beds" }, { v: "3", l: "Baths" }, { v: "2,040", l: "Sq Ft" }, { v: "2-Car", l: "Garage" }].map((s) => (
                          <div key={s.l}><div className="text-white text-xl font-bold leading-none">{s.v}</div><div className="text-white/40 text-[10px] uppercase tracking-wider mt-1">{s.l}</div></div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      {["Granite kitchen · Stainless appliances", "White brick fireplace", "Hardwood floors · Updated baths", "Full basement · Large deck", "Move-in ready"].map((h) => (
                        <div key={h} className="flex items-center gap-2 text-[11px] text-white/65">
                          <div className="w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />{h}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white text-xs font-bold">Real Estate Market Center</div>
                        <div className="text-orange-400 text-xs font-semibold">(248) 568-6081</div>
                      </div>
                      <div className="text-[8px] text-white/25">MLS #20261021717</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-bone/30 text-xs text-center mt-12">Open on your phone → screenshot each flyer → post to Instagram, TikTok or Facebook</p>
          </div>
        </section>

        {/* ── Print section (visible only in print) ── */}
        <div className="hidden print:block p-10 bg-white text-black">
          <div className="text-center border-b-2 border-slate-900 pb-6 mb-6">
            <h1 className="text-4xl font-black">$448,900</h1>
            <h2 className="text-2xl font-bold mt-2">5040 Patrick Road, West Bloomfield Twp, MI 48322</h2>
            <p className="text-lg mt-2">4 Bed | 3 Bath | 2,040 Sq Ft | Colonial | 2-Car Garage</p>
          </div>
          <p className="text-sm leading-relaxed mb-4">
            Beautifully maintained colonial-style home offering spacious living and thoughtful updates throughout.
            Modernized kitchen with granite countertops and stainless steel appliances. Stunning white brick fireplace.
            Hardwood flooring upstairs. Updated bathrooms. Full basement. Large deck with private backyard. Move-in ready.
          </p>
          <p className="text-sm font-bold mt-6">
            {company.name} | {company.phone} | {company.email} | MLS #20261021717
          </p>
        </div>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
