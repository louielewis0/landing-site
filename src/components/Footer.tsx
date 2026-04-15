import { company, cities } from "@/lib/config";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-[#0A1429] text-white/70 overflow-hidden">
      <div className="absolute inset-0 glow-orange opacity-15" />

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="max-w-3xl mb-12">
          <div className="text-white font-bold text-xl tracking-tight mb-3">
            {company.name}
          </div>
          <p className="text-[15px] leading-relaxed">
            {company.footerTagline}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 pb-10 border-b border-white/10">
          <div>
            <div className="text-white font-semibold mb-4 text-xs uppercase tracking-[0.15em]">
              Contact
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href={`tel:${company.phoneTel}`} className="hover:text-white transition-colors font-semibold text-white">
                  {company.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="hover:text-white transition-colors break-all">
                  {company.email}
                </a>
              </li>
              <li className="text-white/50">{company.address}</li>
            </ul>
          </div>

          <div>
            <div className="text-white font-semibold mb-4 text-xs uppercase tracking-[0.15em]">
              Services
            </div>
            <ul className="space-y-2 text-sm">
              <li><a href="#services" className="hover:text-white transition-colors">Buy a home</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Sell a home</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Luxury real estate</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Investment consulting</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Property management</a></li>
            </ul>
          </div>

          <div>
            <div className="text-white font-semibold mb-4 text-xs uppercase tracking-[0.15em]">
              Areas We Serve
            </div>
            <ul className="space-y-2 text-sm">
              {cities.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <a href="#areas" className="hover:text-white transition-colors">
                    {c.name}, MI
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-white font-semibold mb-4 text-xs uppercase tracking-[0.15em]">
              Follow
            </div>
            <ul className="space-y-2 text-sm">
              {company.social.facebook && (
                <li>
                  <a href={company.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    Facebook
                  </a>
                </li>
              )}
              {company.social.instagram && (
                <li>
                  <a href={company.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    Instagram
                  </a>
                </li>
              )}
              {company.social.linkedin && (
                <li>
                  <a href={company.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    LinkedIn
                  </a>
                </li>
              )}
              <li>
                <a href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 text-xs text-white/40 flex flex-col sm:flex-row gap-2 justify-between">
          <div>© {year} {company.name}. All rights reserved.</div>
          <div>Licensed Real Estate Brokerage in Michigan.</div>
        </div>
      </div>
    </footer>
  );
}
