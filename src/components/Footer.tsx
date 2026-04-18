import Image from "next/image";
import { company } from "@/lib/config";
import { cityPages } from "@/lib/city-pages";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#060B18] text-white/70 overflow-hidden">
      <div className="absolute inset-0 glow-orange opacity-10" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* ── Top: Brand + CTA ── */}
        <div className="py-16 border-b border-white/[0.06]">
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div className="flex items-center gap-4">
              <div className="bg-white/95 rounded-xl p-1.5">
                <Image src="/logo.png" alt={company.name} width={48} height={48} className="w-11 h-11 object-contain" />
              </div>
              <div>
                <div className="text-white font-bold text-lg tracking-tight">{company.name}</div>
                <div className="text-sm text-white/40">{company.footerTagline}</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/#lead-magnet"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold text-sm shadow-[0_12px_40px_-12px_rgba(249,115,22,0.5)] transition-all"
              >
                Get Free Home Valuation
              </a>
              <a
                href={`tel:${company.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                {company.phone}
              </a>
            </div>
          </div>
        </div>

        {/* ── Main Grid ── */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-10 border-b border-white/[0.06]">
          {/* Contact */}
          <div>
            <div className="text-white font-semibold mb-5 text-[11px] uppercase tracking-[0.18em]">Contact</div>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`tel:${company.phoneTel}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="w-3.5 h-3.5 text-orange-400" />
                  <span className="font-semibold text-white">{company.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="w-3.5 h-3.5 text-orange-400" />
                  <span className="break-all">{company.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/40">
                <MapPin className="w-3.5 h-3.5 text-orange-400 mt-0.5 flex-shrink-0" />
                <span>{company.address}</span>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <div className="text-white font-semibold mb-5 text-[11px] uppercase tracking-[0.18em]">Services</div>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Buy a Home", href: "/#services" },
                { label: "Sell Your Home", href: "/#lead-magnet" },
                { label: "First-Time Buyers", href: "/#services" },
                { label: "Luxury Real Estate", href: "/#services" },
                { label: "Investment Properties", href: "/#services" },
                { label: "Property Management", href: "/#services" },
              ].map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="hover:text-white transition-colors">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas — links to city pages */}
          <div>
            <div className="text-white font-semibold mb-5 text-[11px] uppercase tracking-[0.18em]">Areas We Serve</div>
            <ul className="space-y-2.5 text-sm">
              {cityPages.map((c) => (
                <li key={c.slug}>
                  <a href={`/${c.slug}`} className="hover:text-white transition-colors">
                    {c.city}, MI
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <div className="text-white font-semibold mb-5 text-[11px] uppercase tracking-[0.18em]">Resources</div>
            <ul className="space-y-2.5 text-sm">
              <li><a href="/#lead-magnet" className="hover:text-white transition-colors">Free Home Valuation</a></li>
              <li><a href="/#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/#contact" className="hover:text-white transition-colors">Contact</a></li>
              <li>
                <a href="/reviews" className="hover:text-white transition-colors flex items-center gap-1.5">
                  Leave a Review
                  <ExternalLink className="w-3 h-3 text-white/30" />
                </a>
              </li>
            </ul>
          </div>

          {/* Social + Legal */}
          <div>
            <div className="text-white font-semibold mb-5 text-[11px] uppercase tracking-[0.18em]">Connect</div>
            <ul className="space-y-2.5 text-sm">
              {company.social.facebook && (
                <li>
                  <a href={company.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
                </li>
              )}
              {company.social.instagram && (
                <li>
                  <a href={company.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                </li>
              )}
              {company.social.linkedin && (
                <li>
                  <a href={company.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
                </li>
              )}
              <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="py-8 flex flex-col sm:flex-row gap-4 justify-between items-center text-xs text-white/30">
          <div>© {year} {company.name}. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <span>Licensed Real Estate Brokerage in Michigan</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">{company.address}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
