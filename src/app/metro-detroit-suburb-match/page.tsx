import type { Metadata } from "next";
import SiteShell from "@/components/site/SiteShell";
import { company } from "@/lib/config";
import HeroLeadForm from "@/components/HeroLeadForm";
import { CheckCircle2, MapPin, Star, ShieldCheck } from "lucide-react";

const BASE = "https://marketcenterrealty.com";
const SLUG = "metro-detroit-suburb-match";
const URL = `${BASE}/${SLUG}`;

export const metadata: Metadata = {
  title: "Free Metro Detroit Suburb Match | Find Your Right Neighborhood",
  description:
    "Tell us your budget and must-haves — a local broker sends you a free, personalized match of the Metro Detroit suburbs and homes that fit, backed by sourced 2026 data. No cost, no obligation.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Free Metro Detroit Suburb Match | Real Estate Market Center",
    description:
      "A personalized suburb-and-home match from a local Metro Detroit broker — free, backed by sourced data.",
    type: "website",
    url: URL,
    siteName: company.name,
  },
  robots: { index: true, follow: true },
};

export default function SuburbMatchPage() {
  const benefits = [
    ["Your suburb shortlist", "The 2–3 Metro Detroit suburbs that actually fit your budget, schools, and commute — not a generic list."],
    ["Homes that match", "Current listings in those areas that hit your criteria, plus a heads-up on ones about to come to market."],
    ["Sourced data, not sales talk", "Home values, school-district ranks, and market speed pulled from Zillow, Redfin, the Census, and Niche — cited, so you can check it."],
    ["A real broker, fast", "A licensed broker reviews your answers and reaches out — usually within the hour, not a chatbot."],
  ];
  const steps = [
    ["1", "Tell us your move", "Your budget, whether you're buying or selling, and how to reach you — 30 seconds."],
    ["2", "We build your match", "A broker maps your priorities to the right suburbs and pulls matching homes and data."],
    ["3", "You get a real plan", "A personalized shortlist and a straight conversation — no pressure, no obligation."],
  ];

  return (
    <SiteShell>
      <main style={{ paddingTop: 24 }} className="bg-cream">
        {/* ── Hero + form ── */}
        <section className="bg-cream" style={{ padding: "44px 0 64px" }}>
          <div className="container" style={{ display: "grid", gap: 44, gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", alignItems: "start", maxWidth: 1080 }}>
            <div>
              <div className="s-eyebrow">
                <MapPin className="w-3 h-3" style={{ marginRight: 2 }} />
                Free · Personalized · No obligation
              </div>
              <h1 style={{ fontSize: "clamp(34px, 4.6vw, 58px)", lineHeight: 1.08, marginBottom: 20 }}>
                Find the Metro Detroit suburb that&rsquo;s actually right for you.
              </h1>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--s-muted)", marginBottom: 26, maxWidth: 540 }}>
                Tell us your budget and what matters most — schools, commute, lakes, price — and a local
                broker sends back a personalized match: the 2&ndash;3 suburbs that fit, the homes available in
                them, and the sourced data behind it. Free, and there&rsquo;s no catch.
              </p>
              <div style={{ display: "grid", gap: 12, maxWidth: 540 }}>
                {benefits.map(([h, b]) => (
                  <div key={h} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <CheckCircle2 className="w-5 h-5" style={{ color: "var(--s-gold)", flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: "var(--s-ink)" }}>{h}</div>
                      <div style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--s-muted)" }}>{b}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <HeroLeadForm source="suburb-match" />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 14, fontSize: 12.5, color: "var(--s-muted)" }}>
                <Star className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} fill="currentColor" strokeWidth={0} />
                Rated 5.0 on Google · 20+ years · $100M+ closed
              </div>
            </div>
          </div>
        </section>

        {/* ── Proof band ── */}
        <section className="bg-cream-2" style={{ padding: "44px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
          <div className="container" style={{ maxWidth: 1000 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 20, textAlign: "center" }}>
              {[
                ["5.0★", "Google rating"],
                ["20+ yrs", "In Metro Detroit"],
                ["$100M+", "In closed sales"],
                ["7 suburbs", "We know street-by-street"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(26px, 3.4vw, 36px)", color: "var(--navy)", lineHeight: 1 }}>{v}</div>
                  <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--s-muted)", marginTop: 8 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="bg-cream" style={{ padding: "72px 0" }}>
          <div className="container" style={{ maxWidth: 900 }}>
            <div className="reveal" style={{ textAlign: "center", marginBottom: 40 }}>
              <div className="s-eyebrow" style={{ justifyContent: "center" }}>How it works</div>
              <h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)" }}>Three steps to your shortlist</h2>
            </div>
            <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
              {steps.map(([n, h, b]) => (
                <div key={n} className="reveal" style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff", padding: 28 }}>
                  <div style={{ fontFamily: "var(--font-fraunces)", fontSize: 34, color: "var(--s-gold)", lineHeight: 1, marginBottom: 12 }}>{n}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--s-ink)", marginBottom: 8 }}>{h}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--s-muted)" }}>{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why us / data proof ── */}
        <section className="bg-cream-2" style={{ padding: "72px 0" }}>
          <div className="container" style={{ maxWidth: 780, textAlign: "center" }}>
            <div className="reveal">
              <div className="s-eyebrow" style={{ justifyContent: "center" }}>
                <ShieldCheck className="w-3 h-3" style={{ marginRight: 2 }} />
                Why trust our match
              </div>
              <h2 style={{ fontSize: "clamp(24px, 3vw, 34px)", marginBottom: 18 }}>We publish our homework</h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--s-ink)", marginBottom: 22 }}>
                Most agents hand you a gut-feel list. We back every suburb recommendation with sourced,
                dated data — home values from Zillow, sale prices from Redfin, school ranks from Niche, and
                population from the U.S. Census — and we publish it openly so you can check our work before
                you ever talk to us.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", fontSize: 13.5 }}>
                <a href="/best-metro-detroit-suburbs" style={{ color: "var(--s-gold)", fontWeight: 600 }}>See the ranked suburb guide</a>
                <span style={{ color: "var(--s-muted)" }}>·</span>
                <a href="/how-much-home-metro-detroit-budget" style={{ color: "var(--s-gold)", fontWeight: 600 }}>What your budget buys</a>
                <span style={{ color: "var(--s-muted)" }}>·</span>
                <a href="/metro-detroit-housing-market-update" style={{ color: "var(--s-gold)", fontWeight: 600 }}>Current market data</a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Final CTA (form again) ── */}
        <section className="bg-cream" style={{ padding: "72px 0 96px" }}>
          <div className="container" style={{ maxWidth: 520 }}>
            <div className="reveal" style={{ textAlign: "center", marginBottom: 26 }}>
              <h2 style={{ fontSize: "clamp(26px, 3.4vw, 38px)", marginBottom: 12 }}>Get your free suburb match</h2>
              <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "var(--s-muted)" }}>
                30 seconds now, a personalized plan back within the hour. No cost, no obligation, and your
                info stays with us.
              </p>
            </div>
            <HeroLeadForm source="suburb-match" />
            <p style={{ fontSize: 12, color: "var(--s-muted)", marginTop: 22, textAlign: "center", display: "inline-flex", alignItems: "center", gap: 8, width: "100%", justifyContent: "center" }}>
              <MapPin className="w-3.5 h-3.5" style={{ color: "var(--s-gold)" }} />
              {company.address} · {company.phone}
            </p>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
