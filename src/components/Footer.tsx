import { company } from "@/lib/config";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-slate-950 text-white/70 py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="text-white font-bold text-lg mb-2">{company.name}</div>
          <p className="text-sm max-w-sm">{company.description}</p>
        </div>
        <div>
          <div className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
            Contact
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={`tel:${company.phoneTel}`} className="hover:text-white transition-colors">
                {company.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="hover:text-white transition-colors">
                {company.email}
              </a>
            </li>
            <li>{company.address}</li>
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
            Follow
          </div>
          <ul className="space-y-2 text-sm">
            {company.social.instagram && (
              <li>
                <a href={company.social.instagram} className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
            )}
            {company.social.facebook && (
              <li>
                <a href={company.social.facebook} className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </li>
            )}
            {company.social.linkedin && (
              <li>
                <a href={company.social.linkedin} className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
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
      <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-white/10 text-xs text-white/40 flex flex-col sm:flex-row gap-2 justify-between">
        <div>© {year} {company.name}. All rights reserved.</div>
        <div>Licensed Real Estate Brokerage in {company.state}.</div>
      </div>
    </footer>
  );
}
