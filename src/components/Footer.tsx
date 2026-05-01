import Image from "next/image";
import { company } from "@/lib/config";
import { cityPages } from "@/lib/city-pages";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink text-bone/55 overflow-hidden border-t border-bone/10">
      <div className="absolute inset-0 grain pointer-events-none" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(200,162,76,0.08), transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="py-20 border-b border-bone/10">
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div className="flex items-center gap-5">
              <div className="bg-bone/95 rounded-xl p-1.5">
                <Image
                  src="/logo.png"
                  alt={company.name}
                  width={48}
                  height={48}
                  className="w-11 h-11 object-contain"
                />
              </div>
              <div>
                <div className="text-bone font-display font-light text-2xl tracking-tight">
                  {company.name}
                </div>
                <div className="text-[13px] text-bone/40 mt-1">
                  {company.footerTagline}
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/#lead-magnet"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink font-semibold text-[13px] tracking-wide transition-all duration-500"
              >
                Request your valuation
              </a>
              <a
                href={`tel:${company.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-bone/20 text-bone hover:border-bone/50 hover:bg-bone/5 font-medium text-[13px] tracking-wide transition-all duration-500"
              >
                <Phone className="w-3.5 h-3.5" />
                {company.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="py-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12 border-b border-bone/10">
          <FooterCol title="Contact">
            <li>
              <a href={`tel:${company.phoneTel}`} className="flex items-center gap-2 hover:text-bone transition-colors">
                <Phone className="w-3.5 h-3.5 text-[var(--gold-soft)]" />
                <span className="font-medium text-bone">{company.phone}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="flex items-center gap-2 hover:text-bone transition-colors">
                <Mail className="w-3.5 h-3.5 text-[var(--gold-soft)]" />
                <span className="break-all text-[13px]">{company.email}</span>
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-[var(--gold-soft)] mt-0.5 flex-shrink-0" />
              <span className="text-[13px]">{company.address}</span>
            </li>
          </FooterCol>

          <FooterCol title="Services">
            {[
              { label: "Buy a Home", href: "/#services" },
              { label: "Sell Your Home", href: "/#lead-magnet" },
              { label: "First-Time Buyers", href: "/#services" },
              { label: "Luxury Real Estate", href: "/#services" },
              { label: "Investment Properties", href: "/#services" },
              { label: "Property Management", href: "/#services" },
            ].map((s) => (
              <li key={s.label}>
                <a href={s.href} className="hover:text-bone transition-colors">{s.label}</a>
              </li>
            ))}
          </FooterCol>

          <FooterCol title="Areas">
            {cityPages.map((c) => (
              <li key={c.slug}>
                <a href={`/${c.slug}`} className="hover:text-bone transition-colors">{c.city}, MI</a>
              </li>
            ))}
          </FooterCol>

          <FooterCol title="Resources">
            <li><a href="/#lead-magnet" className="hover:text-bone transition-colors">Free Home Valuation</a></li>
            <li><a href="/#about" className="hover:text-bone transition-colors">About Us</a></li>
            <li><a href="/#contact" className="hover:text-bone transition-colors">Contact</a></li>
            <li>
              <a href="/reviews" className="hover:text-bone transition-colors flex items-center gap-1.5">
                Leave a Review
                <ExternalLink className="w-3 h-3 text-bone/30" />
              </a>
            </li>
          </FooterCol>

          <FooterCol title="Connect">
            {company.social.facebook && (
              <li>
                <a href={company.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-bone transition-colors">Facebook</a>
              </li>
            )}
            {company.social.instagram && (
              <li>
                <a href={company.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-bone transition-colors">Instagram</a>
              </li>
            )}
            {company.social.linkedin && (
              <li>
                <a href={company.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-bone transition-colors">LinkedIn</a>
              </li>
            )}
            <li><a href="/privacy" className="hover:text-bone transition-colors">Privacy Policy</a></li>
          </FooterCol>
        </div>

        <div className="py-8 flex flex-col sm:flex-row gap-3 justify-between items-center text-[11px] text-bone/35 tracking-wide">
          <div>© {year} {company.name}. All rights reserved.</div>
          <div className="flex items-center gap-5">
            <span>Licensed Real Estate Brokerage in Michigan</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">{company.address}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-bone font-medium mb-5 text-[10px] uppercase tracking-[0.22em]">
        {title}
      </div>
      <ul className="space-y-3 text-[13.5px]">{children}</ul>
    </div>
  );
}
