import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Flyer — 5040 Patrick Road",
  robots: { index: false, follow: false },
};

export default function FlyerPage() {
  return (
    <div className="min-h-screen bg-[#060B18] flex flex-col items-center gap-16 py-12 px-6">
      <div className="text-center text-white mb-4">
        <h1 className="text-2xl font-bold mb-2">Social Media Flyers</h1>
        <p className="text-white/50 text-sm">Screenshot or right-click → Save Image</p>
      </div>

      {/* ═══ INSTAGRAM POST (1:1) ═══ */}
      <div>
        <p className="text-xs text-white/40 uppercase tracking-wider text-center mb-3">Instagram Post — 1080 x 1080</p>
        <div
          className="relative overflow-hidden bg-[#0A1429]"
          style={{ width: 540, height: 540 }}
        >
          {/* Background glow */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 20%, rgba(249,115,22,0.25), transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(37,99,235,0.15), transparent 50%)" }} />
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

          {/* Content */}
          <div className="relative h-full flex flex-col justify-between p-10">
            {/* Top: Badge */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider">
                Just Listed
              </div>
            </div>

            {/* Middle: Price + Address */}
            <div>
              <div className="text-[64px] font-black text-white tracking-[-0.03em] leading-none mb-3"
                style={{ background: "linear-gradient(135deg, #fdba74 0%, #fb923c 45%, #f97316 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                $448,900
              </div>
              <div className="text-white text-xl font-bold tracking-tight">
                5040 Patrick Road
              </div>
              <div className="text-white/60 text-sm mt-1">
                West Bloomfield Twp, MI 48322
              </div>

              {/* Stats row */}
              <div className="flex gap-5 mt-5">
                {[
                  { v: "4", l: "Beds" },
                  { v: "3", l: "Baths" },
                  { v: "2,040", l: "Sq Ft" },
                  { v: "2-Car", l: "Garage" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="text-white text-xl font-bold leading-none">{s.v}</div>
                    <div className="text-white/40 text-[10px] uppercase tracking-wider mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom: Highlights + Agent */}
            <div>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {["Granite Kitchen", "Fireplace", "Hardwood Floors", "Large Deck", "Updated Baths", "Full Basement"].map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-white/70 text-[9px] font-medium">
                    {t}
                  </span>
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

      {/* ═══ TIKTOK / IG STORY (9:16) ═══ */}
      <div>
        <p className="text-xs text-white/40 uppercase tracking-wider text-center mb-3">TikTok / IG Story — 1080 x 1920</p>
        <div
          className="relative overflow-hidden bg-[#0A1429]"
          style={{ width: 360, height: 640 }}
        >
          {/* Background glow */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 10%, rgba(249,115,22,0.3), transparent 50%), radial-gradient(ellipse at 50% 90%, rgba(37,99,235,0.2), transparent 50%)" }} />
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

          <div className="relative h-full flex flex-col justify-between p-8">
            {/* Top */}
            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider mb-4">
                Just Listed
              </div>
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/10 mx-auto mt-2">
                <Image src="/logo.png" alt="REMC" width={48} height={48} className="w-full h-full object-contain" />
              </div>
            </div>

            {/* Price block */}
            <div className="text-center">
              <div className="text-[56px] font-black tracking-[-0.03em] leading-none mb-2"
                style={{ background: "linear-gradient(135deg, #fdba74 0%, #fb923c 45%, #f97316 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                $448,900
              </div>
              <div className="text-white text-lg font-bold tracking-tight">
                5040 Patrick Road
              </div>
              <div className="text-white/55 text-sm mt-1">
                West Bloomfield, MI 48322
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { v: "4", l: "Beds" },
                { v: "3", l: "Baths" },
                { v: "2,040", l: "Sq Ft" },
                { v: "2-Car", l: "Garage" },
              ].map((s) => (
                <div key={s.l} className="text-center py-3 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="text-white text-lg font-bold leading-none">{s.v}</div>
                  <div className="text-white/40 text-[9px] uppercase tracking-wider mt-1">{s.l}</div>
                </div>
              ))}
            </div>

            {/* Highlights */}
            <div className="space-y-2">
              {[
                "Granite kitchen with stainless steel appliances",
                "White brick fireplace in family room",
                "Hardwood floors & updated bathrooms",
                "Large deck with private backyard",
                "Full basement + 2-car garage",
              ].map((h) => (
                <div key={h} className="flex items-center gap-2.5 text-[11px] text-white/70">
                  <div className="w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                  {h}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <div className="px-6 py-3 rounded-xl bg-orange-500 text-white font-bold text-sm">
                Call (248) 568-6081
              </div>
              <div className="text-white/30 text-[9px] mt-3 uppercase tracking-wider">
                Real Estate Market Center · MLS #20261021717
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ INSTAGRAM FEED (4:5) ═══ */}
      <div>
        <p className="text-xs text-white/40 uppercase tracking-wider text-center mb-3">Instagram Feed — 1080 x 1350</p>
        <div
          className="relative overflow-hidden bg-[#0A1429]"
          style={{ width: 432, height: 540 }}
        >
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 30%, rgba(249,115,22,0.25), transparent 55%), radial-gradient(ellipse at 85% 75%, rgba(37,99,235,0.18), transparent 50%)" }} />
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />

          <div className="relative h-full flex flex-col justify-between p-9">
            {/* Top */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider">
                Just Listed
              </div>
              <div className="w-9 h-9 rounded-lg overflow-hidden bg-white/10">
                <Image src="/logo.png" alt="REMC" width={36} height={36} className="w-full h-full object-contain" />
              </div>
            </div>

            {/* Price */}
            <div>
              <div className="text-[54px] font-black tracking-[-0.03em] leading-none mb-2"
                style={{ background: "linear-gradient(135deg, #fdba74 0%, #fb923c 45%, #f97316 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                $448,900
              </div>
              <div className="text-white text-xl font-bold tracking-tight">5040 Patrick Road</div>
              <div className="text-white/55 text-sm mt-1">West Bloomfield, MI 48322</div>

              <div className="flex gap-5 mt-5">
                {[
                  { v: "4", l: "Beds" },
                  { v: "3", l: "Baths" },
                  { v: "2,040", l: "Sq Ft" },
                  { v: "2-Car", l: "Garage" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="text-white text-xl font-bold leading-none">{s.v}</div>
                    <div className="text-white/40 text-[10px] uppercase tracking-wider mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-1.5">
              {["Granite kitchen · Stainless appliances", "White brick fireplace", "Hardwood floors · Updated baths", "Full basement · Large deck", "Move-in ready"].map((h) => (
                <div key={h} className="flex items-center gap-2 text-[11px] text-white/65">
                  <div className="w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                  {h}
                </div>
              ))}
            </div>

            {/* Bottom */}
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

      <p className="text-white/30 text-xs text-center pb-8">
        Open this page on your phone → screenshot each flyer → post directly to Instagram / TikTok
      </p>
    </div>
  );
}
