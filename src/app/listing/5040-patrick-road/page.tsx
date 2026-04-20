import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { company } from "@/lib/config";
import {
  Phone,
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  Home,
  Flame,
  Car,
  TreePine,
  Sparkles,
  ArrowRight,
  Share2,
  Printer,
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
        <section className="relative pt-32 pb-20 bg-[#0A1429] overflow-hidden noise">
          <div className="absolute inset-0 glow-orange opacity-40" />
          <div className="absolute inset-0 grid-overlay" />

          <div className="relative max-w-6xl mx-auto px-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Just Listed — MLS #20261021717
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-[-0.03em] leading-[1.05] mb-4">
              5040 Patrick Road
            </h1>
            <p className="text-xl sm:text-2xl text-white/60 mb-2">
              West Bloomfield Twp, MI 48322
            </p>

            <div className="flex flex-wrap items-baseline gap-4 mt-8 mb-10">
              <span className="text-5xl sm:text-6xl font-black gradient-text tracking-tight">$448,900</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-10">
              {features.map((f) => (
                <div key={f.label} className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10">
                  <f.icon className="w-4 h-4 text-orange-400 flex-shrink-0" strokeWidth={1.75} />
                  <div>
                    <div className="text-sm font-bold text-white leading-none">{f.value}</div>
                    <div className="text-[10px] text-white/50 mt-0.5">{f.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${company.phoneTel}`}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold shadow-[0_20px_50px_-12px_rgba(249,115,22,0.65)] hover:-translate-y-0.5 transition-all"
              >
                <Phone className="w-4 h-4" />
                Schedule a Showing
              </a>
              <a
                href={`mailto:${company.email}?subject=Inquiry: 5040 Patrick Road, West Bloomfield&body=Hi, I'm interested in the property at 5040 Patrick Road, West Bloomfield (MLS %2320261021717). Please send me more information.`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-slate-900 hover:bg-white/90 font-bold transition-all"
              >
                <Mail className="w-4 h-4" />
                Request Info
              </a>
            </div>
          </div>
        </section>

        {/* ── Description ── */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-6">About This Home</h2>
            <div className="text-[17px] text-slate-700 leading-[1.8] space-y-5">
              <p>
                Beautifully maintained colonial-style home offering spacious living and thoughtful
                updates throughout. Step inside to a bright and open layout featuring large living
                and dining areas with abundant natural light and updated flooring, perfect for both
                everyday living and entertaining.
              </p>
              <p>
                The home includes a modernized kitchen with granite countertops, stainless steel
                appliances, and ample cabinet space, seamlessly connected to the main living areas.
                Enjoy a cozy family room with a stunning white brick fireplace and direct access to
                the backyard.
              </p>
              <p>
                Upstairs, you'll find generously sized bedrooms with hardwood flooring, while the
                bathrooms have been tastefully updated with granite vanities and modern finishes.
                The fully functional basement provides additional living or storage space, offering
                flexibility for future customization.
              </p>
              <p>
                Step outside to a large backyard with an expansive deck, ideal for relaxing,
                hosting gatherings, or enjoying peaceful outdoor views. Complete with great curb
                appeal, a 2-car garage, and a desirable layout, this home is move-in ready and a
                must-see.
              </p>
            </div>
          </div>
        </section>

        {/* ── Highlights ── */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-8">Key Features</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {highlights.map((h) => (
                <div key={h} className="flex gap-3 p-4 rounded-xl bg-white border border-slate-200/70">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-[15px] text-slate-700">{h}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Property Details ── */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-8">Property Details</h2>
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-4">
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
                <div key={d.label} className="flex justify-between py-3 border-b border-slate-100">
                  <span className="text-sm text-slate-500">{d.label}</span>
                  <span className="text-sm font-semibold text-slate-900">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Location ── */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-6">Location</h2>
            <p className="text-slate-600 mb-6">
              Located in West Bloomfield Township — known for lakefront living, top-rated schools,
              and a diverse community. Minutes from Orchard Lake Road shopping and dining, Cass Lake,
              and major freeway access.
            </p>
            <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-video">
              <iframe
                src="https://maps.google.com/maps?q=5040+Patrick+Road+West+Bloomfield+MI+48322&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="5040 Patrick Road, West Bloomfield"
              />
            </div>
          </div>
        </section>

        {/* ── West Bloomfield context ── */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-orange-50/20 border border-slate-200/70 p-8">
              <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em] mb-3">Why West Bloomfield</p>
              <p className="text-[17px] text-slate-800 leading-[1.75]">
                West Bloomfield offers a unique combination of lakefront living, cultural diversity,
                and suburban convenience. The township's 14+ lakes, highly rated schools, and proximity
                to Orchard Lake Road's dining and retail make it one of Oakland County's most desirable
                communities. Homes here hold their value and demand stays strong year-round.
              </p>
              <a href="/west-bloomfield-real-estate-agent" className="inline-flex items-center gap-2 text-orange-600 font-semibold text-sm mt-4 hover:text-orange-500 transition-colors">
                Learn more about West Bloomfield real estate <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ── Agent CTA ── */}
        <section className="relative py-20 bg-[#0A1429] overflow-hidden noise">
          <div className="absolute inset-0 glow-orange opacity-40" />
          <div className="absolute inset-0 grid-overlay" />

          <div className="relative max-w-4xl mx-auto px-6">
            <div className="grid md:grid-cols-[auto_1fr] gap-10 items-center">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden bg-white/10 mx-auto md:mx-0 ring-2 ring-white/10">
                <Image
                  src="/agent.jpg"
                  alt="Real Estate Market Center Agent"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-white text-center md:text-left">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                  Interested in this property?
                </h2>
                <p className="text-white/60 text-lg mb-6 leading-relaxed">
                  Call to schedule a private showing, ask about the neighborhood, or request
                  a full property report. We respond within the hour.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                  <a
                    href={`tel:${company.phoneTel}`}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold shadow-[0_20px_50px_-12px_rgba(249,115,22,0.65)] transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    Call {company.phone}
                  </a>
                  <a
                    href={`mailto:${company.email}?subject=Inquiry: 5040 Patrick Road&body=I'd like to schedule a showing for 5040 Patrick Road, West Bloomfield.`}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-slate-900 font-bold transition-all"
                  >
                    <Mail className="w-4 h-4" />
                    Email Us
                  </a>
                </div>

                <div className="flex items-center gap-6 mt-6 justify-center md:justify-start text-sm text-white/50">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-orange-400" fill="currentColor" strokeWidth={0} />
                    <span>5-Star Rated</span>
                  </div>
                  <div>20+ Years Experience</div>
                  <div>$100M+ Sold</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Social Media Flyers ── */}
        <section className="py-20 bg-[#060B18]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Social Media Flyers</h2>
              <p className="text-white/50 text-sm">Screenshot or save each image below and post to Instagram / TikTok / Facebook</p>
            </div>

            <div className="flex flex-col items-center gap-16">
              {/* ── Instagram Post (1:1) ── */}
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider text-center mb-3">Instagram Post — Square</p>
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
                <p className="text-xs text-white/40 uppercase tracking-wider text-center mb-3">TikTok / IG Story</p>
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
                <p className="text-xs text-white/40 uppercase tracking-wider text-center mb-3">Instagram Feed — 4:5</p>
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

            <p className="text-white/30 text-xs text-center mt-10">Open on your phone → screenshot each flyer → post to Instagram / TikTok / Facebook</p>
          </div>
        </section>

        {/* ── Print section (visible only in print) ── */}
        <div className="hidden print:block p-10">
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
