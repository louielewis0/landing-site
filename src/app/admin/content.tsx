"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { company } from "@/lib/config";
import {
  Star,
  MessageSquare,
  TrendingUp,
  Upload,
  Send,
  ShieldCheck,
  Bot,
  RotateCcw,
  MapPin,
  Search,
  Users,
  DollarSign,
  ChevronRight,
  CheckCircle2,
  Phone,
  ArrowRight,
  Zap,
  BarChart3,
  Target,
  Clock,
  BadgeCheck,
  Sparkles,
  ExternalLink,
} from "lucide-react";

// Metadata is in page.tsx (server component). This is the client-side content.

const GOOGLE_REVIEW_URL =
  "https://www.google.com/search?q=Real+Estate+Market+Center+Troy+MI";

/* ─── Shared UI helpers ─── */

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm rounded-2xl ${className}`}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-[0.15em] mb-6">
      {children}
    </div>
  );
}

function Stars({ count = 5, size = 20 }: { count?: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className="fill-amber-400 text-amber-400"
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  PAGE                                                                      */
/* ─────────────────────────────────────────────────────────────────────────── */

export default function ReviewsPage() {
  return (
    <>
      <Header />
      <main className="bg-[#0A1429] text-white">
        {/* ── 1. HERO ── */}
        <HeroSection />

        {/* ── 2. CURRENT STATE ANALYSIS ── */}
        <CurrentStateSection />

        {/* ── 3. AUTOMATED REVIEW FUNNEL ── */}
        <FunnelSection />

        {/* ── 4. REVENUE TIERS ── */}
        <RevenueTiersSection />

        {/* ── 5. UNIT ECONOMICS ── */}
        <UnitEconomicsSection />

        {/* ── 6. 90-DAY TIMELINE ── */}
        <TimelineSection />

        {/* ── 7. GOOGLE BEFORE / AFTER ── */}
        <BeforeAfterSection />

        {/* ── 8. AI REVIEW RESPONSES ── */}
        <AIReviewsSection />

        {/* ── 9. 3-YEAR REVENUE TRAJECTORY ── */}
        <TrajectorySection />

        {/* ── 10. INVESTMENT SUMMARY / CTA ── */}
        <InvestmentCTASection />

        {/* ── 11. REVIEW CTA ── */}
        <ReviewCTASection />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  SECTION 1 — HERO                                                        */
/* ═══════════════════════════════════════════════════════════════════════════ */

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 glow-orange" />
      <div className="absolute inset-0 grid-overlay" />
      <div className="noise absolute inset-0" />

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
        <div className="fade-up max-w-4xl">
          <SectionLabel>
            <Sparkles size={14} /> Review Growth System
          </SectionLabel>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
            Your Past Clients Are Worth{" "}
            <span className="gradient-text">$487K/Year</span> in Reviews You
            Haven&apos;t Collected
          </h1>

          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mb-12 leading-relaxed">
            An automated system that turns your existing client list into a
            flood of 5-star Google reviews — on complete autopilot. Dominate the
            Map Pack. Capture every lead. Compound your reputation.
          </p>
        </div>

        {/* Big Stats */}
        <div className="fade-up-delay grid sm:grid-cols-3 gap-4 lg:gap-6 max-w-4xl">
          {[
            {
              value: "247%",
              label: "More Map Pack Visibility",
              color: "text-amber-400",
            },
            {
              value: "$487K",
              label: "Projected Revenue / Year",
              color: "text-emerald-400",
            },
            {
              value: "3 Profiles",
              label: "= 3x Coverage",
              color: "text-blue-400",
            },
          ].map((stat) => (
            <GlassCard key={stat.label} className="p-6 text-center">
              <div
                className={`text-3xl sm:text-4xl font-extrabold ${stat.color} mb-1`}
              >
                {stat.value}
              </div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  SECTION 2 — CURRENT STATE ANALYSIS                                       */
/* ═══════════════════════════════════════════════════════════════════════════ */

function CurrentStateSection() {
  const marketCards = [
    { icon: DollarSign, label: "Median Home Price", value: "$425K", sub: "Troy, MI" },
    { icon: Target, label: "Avg Commission", value: "2.5%", sub: "Buyer + Seller side" },
    { icon: Users, label: "Competing Agents", value: "180+", sub: "Troy metro area" },
  ];

  const factors = [
    { rank: 1, label: "Reviews", note: "Quantity + quality + velocity", color: "bg-amber-500" },
    { rank: 2, label: "Proximity", note: "Business location to searcher", color: "bg-blue-500" },
    { rank: 3, label: "Relevance", note: "Category, keywords, services", color: "bg-purple-500" },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 glow-soft" />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionLabel>
          <MapPin size={14} /> Troy, MI Market Analysis
        </SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Where You Stand <span className="gradient-text">Right Now</span>
        </h2>
        <p className="text-white/50 max-w-xl mb-12">
          The data doesn&apos;t lie. Here&apos;s a snapshot of the competitive landscape
          in your backyard.
        </p>

        {/* Market Data Cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          {marketCards.map((c) => (
            <GlassCard key={c.label} className="p-6">
              <c.icon size={22} className="text-orange-400 mb-3" />
              <div className="text-2xl font-bold mb-1">{c.value}</div>
              <div className="text-sm text-white/70 font-medium">{c.label}</div>
              <div className="text-xs text-white/40 mt-0.5">{c.sub}</div>
            </GlassCard>
          ))}
        </div>

        {/* Review Gap Visualization */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <GlassCard className="p-8">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <BarChart3 size={18} className="text-amber-400" />
              Review Gap Analysis
            </h3>
            <div className="space-y-6">
              {[
                { label: "Your Profile", reviews: 15, pct: "5%", color: "bg-red-500/80" },
                { label: "Target (3-Pack)", reviews: 100, pct: "36%", color: "bg-amber-500" },
                { label: "Top Agent (Troy)", reviews: 280, pct: "100%", color: "bg-emerald-500" },
              ].map((bar) => (
                <div key={bar.label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">{bar.label}</span>
                    <span className="font-semibold">{bar.reviews} reviews</span>
                  </div>
                  <div className="h-3 rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className={`h-full rounded-full ${bar.color} transition-all duration-1000`}
                      style={{ width: bar.pct }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-300 font-medium">
                You need 85+ more reviews just to enter 3-Pack contention.
              </p>
            </div>
          </GlassCard>

          <div className="space-y-6">
            {/* 70% stat */}
            <GlassCard className="p-8">
              <div className="text-5xl font-extrabold text-amber-400 mb-2">70%</div>
              <p className="text-white/70 text-sm leading-relaxed">
                of consumers <span className="text-white font-medium">only contact agents
                that appear in the Google Maps 3-Pack</span>. If you&apos;re not there,
                you&apos;re invisible to 7 out of 10 potential clients.
              </p>
            </GlassCard>

            {/* Google Ranking Factors */}
            <GlassCard className="p-8">
              <h3 className="text-lg font-bold mb-5">Google Maps Ranking Factors</h3>
              <div className="space-y-3">
                {factors.map((f) => (
                  <div key={f.rank} className="flex items-center gap-4">
                    <div
                      className={`w-8 h-8 rounded-lg ${f.color} flex items-center justify-center text-sm font-bold text-white shrink-0`}
                    >
                      {f.rank}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{f.label}</div>
                      <div className="text-xs text-white/40">{f.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  SECTION 3 — AUTOMATED REVIEW COLLECTION FUNNEL                          */
/* ═══════════════════════════════════════════════════════════════════════════ */

function FunnelSection() {
  const steps = [
    {
      num: 1,
      title: "Upload Client List",
      desc: "Import your past client contacts — names, phone numbers. That's it.",
      icon: Upload,
      color: "bg-amber-500",
      borderColor: "border-amber-500/30",
    },
    {
      num: 2,
      title: "Automated Drip Campaign",
      desc: "System sends 5-10 personalized SMS per day for organic review velocity.",
      icon: Send,
      color: "bg-amber-500",
      borderColor: "border-amber-500/30",
    },
    {
      num: 3,
      title: "Smart Gate — 5 Stars Only",
      desc: "Only 5-star responders get the Google review link. 1-4 stars get private feedback form.",
      icon: ShieldCheck,
      color: "bg-emerald-500",
      borderColor: "border-emerald-500/30",
    },
    {
      num: 4,
      title: "AI Review Responses",
      desc: "Every review gets a personalized owner response within minutes — fully automated.",
      icon: Bot,
      color: "bg-emerald-500",
      borderColor: "border-emerald-500/30",
    },
    {
      num: 5,
      title: "Reviews Compound Into Rankings",
      desc: "More reviews → higher Maps ranking → more leads → more closings → more reviews.",
      icon: RotateCcw,
      color: "bg-emerald-500",
      borderColor: "border-emerald-500/30",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#0d1a33]" />
      <div className="absolute inset-0 grid-overlay" />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionLabel>
          <Zap size={14} /> The System
        </SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Automated Review Collection{" "}
          <span className="gradient-text">Funnel</span>
        </h2>
        <p className="text-white/50 max-w-xl mb-16">
          A battle-tested flow that converts past clients into public 5-star
          reviews — while filtering out anything less.
        </p>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Phone Mockup */}
          <div className="flex justify-center">
            <div className="w-[320px] rounded-[2.5rem] border-2 border-white/10 bg-[#111C36] p-2 shadow-2xl shadow-black/40">
              <div className="rounded-[2rem] bg-[#0A1429] overflow-hidden">
                {/* Status bar */}
                <div className="flex items-center justify-between px-6 pt-4 pb-2">
                  <span className="text-xs text-white/40">9:41 AM</span>
                  <div className="w-20 h-5 rounded-full bg-black" />
                  <span className="text-xs text-white/40">100%</span>
                </div>

                {/* Header */}
                <div className="px-5 py-3 border-b border-white/[0.06]">
                  <div className="text-sm font-semibold">{company.shortName}</div>
                  <div className="text-xs text-white/40">SMS Conversation</div>
                </div>

                {/* Messages */}
                <div className="px-4 py-5 space-y-3 min-h-[380px]">
                  {/* Outgoing */}
                  <div className="flex justify-end">
                    <div className="bg-orange-500 text-white text-[13px] rounded-2xl rounded-br-md px-4 py-2.5 max-w-[230px] leading-snug">
                      Hi Sarah! Thank you for choosing {company.shortName} for
                      your home purchase. We&apos;d love your feedback — on a scale
                      of 1-5, how was your experience?
                    </div>
                  </div>

                  {/* Incoming */}
                  <div className="flex justify-start">
                    <div className="bg-white/[0.08] text-white text-[13px] rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[230px] leading-snug">
                      5! You guys were amazing, made the whole process so easy 🙌
                    </div>
                  </div>

                  {/* Auto-reply */}
                  <div className="flex justify-end">
                    <div className="bg-orange-500 text-white text-[13px] rounded-2xl rounded-br-md px-4 py-2.5 max-w-[230px] leading-snug">
                      That means so much to us! 🎉 Would you mind sharing that on
                      Google? It only takes 30 seconds:
                      <span className="block mt-1 underline text-white/90 text-xs break-all">
                        g.page/r/review-link
                      </span>
                    </div>
                  </div>

                  {/* Gate explanation */}
                  <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-1">
                      <ShieldCheck size={14} />
                      SMART GATE
                    </div>
                    <p className="text-[11px] text-white/50 leading-relaxed">
                      If response is 1-4 stars → private feedback form only. No
                      review link sent. Your public rating stays protected.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Funnel Steps */}
          <div className="space-y-4">
            {steps.map((step) => (
              <GlassCard
                key={step.num}
                className={`p-5 flex items-start gap-4 border-l-2 ${step.borderColor}`}
              >
                <div
                  className={`${step.color} w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0`}
                >
                  {step.num}
                </div>
                <div>
                  <div className="font-semibold mb-1 flex items-center gap-2">
                    <step.icon size={16} className="text-white/40" />
                    {step.title}
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </GlassCard>
            ))}

            {/* Projection */}
            <GlassCard className="p-6 mt-6 border-emerald-500/20">
              <h4 className="text-sm font-bold text-emerald-400 mb-4 uppercase tracking-wider">
                Projected Results
              </h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { value: "65%", label: "SMS Open Rate" },
                  { value: "40%", label: "Respond" },
                  { value: "120+", label: "New 5-Star Reviews" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-bold text-white">{s.value}</div>
                    <div className="text-xs text-white/40 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  SECTION 4 — REVENUE TIERS                                               */
/* ═══════════════════════════════════════════════════════════════════════════ */

function RevenueTiersSection() {
  const tiers = [
    {
      tier: 0,
      label: "Current State",
      desc: "1 Google profile, minimal reviews",
      leads: "~8 leads/mo",
      revenue: "$42K/yr",
      delta: null,
      gradient: "from-white/10 to-white/[0.03]",
      accent: "text-white/50",
      badge: "bg-white/10 text-white/50",
    },
    {
      tier: 1,
      label: "Review System Live",
      desc: "100+ reviews in first 90 days",
      leads: "~28 leads/mo",
      revenue: "$149K/yr",
      delta: "+$107K",
      gradient: "from-amber-500/20 to-amber-500/[0.03]",
      accent: "text-amber-400",
      badge: "bg-amber-500/20 text-amber-400",
    },
    {
      tier: 2,
      label: "+2 GBP Profiles",
      desc: "Birmingham + Rochester Hills coverage",
      leads: "~62 leads/mo",
      revenue: "$329K/yr",
      delta: "+$180K",
      gradient: "from-emerald-500/20 to-emerald-500/[0.03]",
      accent: "text-emerald-400",
      badge: "bg-emerald-500/20 text-emerald-400",
    },
    {
      tier: 3,
      label: "+LSA Google Guaranteed",
      desc: "Google Guaranteed badge + Local Service Ads",
      leads: "~22 LSA leads/mo",
      revenue: "$441K/yr",
      delta: "+$112K",
      gradient: "from-blue-500/20 to-blue-500/[0.03]",
      accent: "text-blue-400",
      badge: "bg-blue-500/20 text-blue-400",
    },
    {
      tier: 4,
      label: "AI Auto Reviews",
      desc: "8-12 reviews/mo ongoing, 250+ reviews year 1",
      leads: "Compounding",
      revenue: "$487K/yr",
      delta: "Total",
      gradient: "from-purple-500/20 to-purple-500/[0.03]",
      accent: "text-purple-400",
      badge: "bg-purple-500/20 text-purple-400",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 glow-orange opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionLabel>
          <TrendingUp size={14} /> Revenue Tiers
        </SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Five Levels to{" "}
          <span className="gradient-text">$487K/Year</span>
        </h2>
        <p className="text-white/50 max-w-xl mb-14">
          Each tier stacks on the last. Every addition compounds the one before
          it.
        </p>

        <div className="grid gap-4">
          {tiers.map((t) => (
            <div
              key={t.tier}
              className={`relative rounded-2xl border border-white/[0.06] overflow-hidden bg-gradient-to-r ${t.gradient} backdrop-blur-sm`}
            >
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                {/* Badge */}
                <div
                  className={`${t.badge} text-xs font-bold px-3 py-1.5 rounded-lg shrink-0 w-fit`}
                >
                  TIER {t.tier}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-lg">{t.label}</div>
                  <div className="text-sm text-white/50">{t.desc}</div>
                </div>

                {/* Leads */}
                <div className="text-sm text-white/60 shrink-0">
                  {t.leads}
                </div>

                {/* Revenue */}
                <div className="text-right shrink-0">
                  <div className={`text-2xl font-extrabold ${t.accent}`}>
                    {t.revenue}
                  </div>
                  {t.delta && (
                    <div className="text-xs text-emerald-400 font-semibold mt-0.5">
                      {t.delta}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  SECTION 5 — UNIT ECONOMICS                                              */
/* ═══════════════════════════════════════════════════════════════════════════ */

function UnitEconomicsSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#0d1a33]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionLabel>
          <DollarSign size={14} /> Unit Economics
        </SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Revenue Per Lead{" "}
          <span className="gradient-text">Breakdown</span>
        </h2>
        <p className="text-white/50 max-w-xl mb-14">
          Simple math, massive impact. Every lead has a calculable dollar value.
        </p>

        {/* Formula */}
        <GlassCard className="p-8 mb-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 text-center justify-center mb-6">
            {[
              { val: "$425K", label: "Avg Price" },
              { val: "×" },
              { val: "2.5%", label: "Commission" },
              { val: "×" },
              { val: "5%", label: "Close Rate" },
              { val: "=" },
              { val: "$531", label: "Per Lead", highlight: true },
            ].map((item, i) =>
              item.label ? (
                <div
                  key={i}
                  className={`px-4 py-3 rounded-xl ${
                    item.highlight
                      ? "bg-emerald-500/15 border border-emerald-500/30"
                      : "bg-white/[0.04]"
                  }`}
                >
                  <div
                    className={`text-xl font-bold ${
                      item.highlight ? "text-emerald-400" : ""
                    }`}
                  >
                    {item.val}
                  </div>
                  <div className="text-[11px] text-white/40 mt-1">
                    {item.label}
                  </div>
                </div>
              ) : (
                <span key={i} className="text-2xl font-light text-white/30">
                  {item.val}
                </span>
              )
            )}
          </div>
        </GlassCard>

        {/* Revenue at different lead volumes */}
        <div className="grid sm:grid-cols-3 gap-4 max-w-3xl">
          {[
            {
              leads: 28,
              label: "Tier 1",
              monthly: "$14,868",
              color: "border-amber-500/30",
            },
            {
              leads: 62,
              label: "Tier 2",
              monthly: "$32,922",
              color: "border-emerald-500/30",
            },
            {
              leads: 84,
              label: "Full System",
              monthly: "$44,604",
              color: "border-purple-500/30",
            },
          ].map((r) => (
            <GlassCard
              key={r.leads}
              className={`p-6 text-center border-t-2 ${r.color}`}
            >
              <div className="text-sm text-white/50 mb-1">{r.label}</div>
              <div className="text-3xl font-extrabold mb-1">{r.monthly}</div>
              <div className="text-xs text-white/40">/mo at {r.leads} leads</div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  SECTION 6 — 90-DAY TIMELINE                                             */
/* ═══════════════════════════════════════════════════════════════════════════ */

function TimelineSection() {
  const milestones = [
    {
      period: "Week 1-2",
      title: "Setup + Import",
      desc: "Google Business Profile audit, client list import, SMS templates configured.",
      color: "bg-amber-500",
      ring: "ring-amber-500/30",
    },
    {
      period: "Week 3-4",
      title: "First Wave — 50+ Reviews",
      desc: "Automated drip begins. First 50+ five-star reviews land on your profile.",
      color: "bg-amber-500",
      ring: "ring-amber-500/30",
    },
    {
      period: "Week 5-8",
      title: "3-Pack Ranking + Profile Expansion",
      desc: "Enter the Google Maps 3-Pack. Launch Birmingham + Rochester Hills profiles.",
      color: "bg-emerald-500",
      ring: "ring-emerald-500/30",
    },
    {
      period: "Week 9-12",
      title: "Full System Live",
      desc: "LSA activated. AI auto-responses running. Compounding flywheel engaged.",
      color: "bg-purple-500",
      ring: "ring-purple-500/30",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 glow-soft" />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionLabel>
          <Clock size={14} /> 90-Day Roadmap
        </SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          From Zero to <span className="gradient-text">Dominant</span> in 90 Days
        </h2>
        <p className="text-white/50 max-w-xl mb-16">
          A clear, phased rollout. You&apos;ll see results within the first two weeks.
        </p>

        <div className="max-w-2xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[18px] top-2 bottom-2 w-px bg-gradient-to-b from-amber-500/50 via-emerald-500/50 to-purple-500/50" />

            <div className="space-y-10">
              {milestones.map((m) => (
                <div key={m.period} className="flex gap-6">
                  {/* Node */}
                  <div className="relative shrink-0">
                    <div
                      className={`w-[38px] h-[38px] rounded-full ${m.color} ring-4 ${m.ring} flex items-center justify-center`}
                    >
                      <CheckCircle2 size={18} className="text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <GlassCard className="p-6 flex-1">
                    <div className="text-xs font-bold text-white/40 uppercase tracking-wider mb-1">
                      {m.period}
                    </div>
                    <div className="font-bold text-lg mb-1">{m.title}</div>
                    <p className="text-sm text-white/50 leading-relaxed">
                      {m.desc}
                    </p>
                  </GlassCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  SECTION 7 — GOOGLE BEFORE / AFTER                                       */
/* ═══════════════════════════════════════════════════════════════════════════ */

function BeforeAfterSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#0d1a33]" />
      <div className="absolute inset-0 grid-overlay" />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionLabel>
          <Search size={14} /> Google Presence
        </SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-14">
          Before vs. <span className="gradient-text">After</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Before */}
          <GlassCard className="p-8 border-red-500/20">
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-6">
              Before
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03]">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-white/40">
                  RC
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{company.name}</div>
                  <div className="flex items-center gap-1 mt-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={
                          i < 4
                            ? "fill-amber-400 text-amber-400"
                            : "text-white/20"
                        }
                      />
                    ))}
                    <span className="text-xs text-white/40 ml-1">
                      4.0 (12 reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-white/40">
                <MapPin size={14} />
                <span>Page 2 results</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-red-400">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                Not in Maps 3-Pack
              </div>
            </div>
          </GlassCard>

          {/* After */}
          <GlassCard className="p-8 border-emerald-500/20 ring-1 ring-emerald-500/10">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-6">
              After — 90 Days
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/10">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <BadgeCheck size={20} className="text-emerald-400" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold flex items-center gap-2">
                    {company.name}
                    <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-bold">
                      GUARANTEED
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Stars count={5} size={12} />
                    <span className="text-xs text-white/60 ml-1">
                      5.0 (187 reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-emerald-400">
                <MapPin size={14} />
                <span className="font-semibold">Position #2 in 3-Pack</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-400">
                <BadgeCheck size={14} />
                <span>Google Guaranteed Badge</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  SECTION 8 — AI REVIEW RESPONSES                                         */
/* ═══════════════════════════════════════════════════════════════════════════ */

function AIReviewsSection() {
  const reviews = [
    {
      initials: "JM",
      name: "Jennifer M.",
      rating: 5,
      text: "Absolutely wonderful experience from start to finish! The team at Real Estate Market Center made selling our Troy home seamless. They handled everything with such professionalism and care. We got $22K over asking in just 5 days!",
      response:
        "Jennifer, thank you so much for your kind words! It was truly a pleasure helping you and your family with the sale of your Troy home. Getting $22K over asking in just 5 days is a testament to the preparation and pricing strategy we built together. We wish you all the best in your new chapter, and please don't hesitate to reach out if you ever need anything!",
      bgColor: "bg-amber-500/15",
    },
    {
      initials: "DK",
      name: "David K.",
      rating: 5,
      text: "First-time buyer here and I was nervous about the whole process. The team walked me through every single step, explained everything clearly, and found me a great place in Rochester Hills within my budget. Couldn't recommend them more highly.",
      response:
        "David, congratulations on your first home! We know the process can feel overwhelming, especially for first-time buyers, and it was our privilege to guide you through it. Rochester Hills is a fantastic community and we're thrilled you found the perfect fit within your budget. Welcome to homeownership — enjoy every moment!",
      bgColor: "bg-blue-500/15",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 glow-soft" />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionLabel>
          <Bot size={14} /> AI-Powered Responses
        </SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Every Review Gets a{" "}
          <span className="gradient-text">Personal Response</span>
        </h2>
        <p className="text-white/50 max-w-xl mb-14">
          AI generates thoughtful, on-brand owner responses within minutes of
          each review — no manual work required.
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
          {reviews.map((r) => (
            <GlassCard key={r.name} className="p-6 space-y-5">
              {/* Reviewer */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-full ${r.bgColor} flex items-center justify-center text-sm font-bold`}
                >
                  {r.initials}
                </div>
                <div>
                  <div className="font-semibold text-sm">{r.name}</div>
                  <Stars count={r.rating} size={14} />
                </div>
              </div>

              <p className="text-sm text-white/70 leading-relaxed">
                &ldquo;{r.text}&rdquo;
              </p>

              {/* Owner Response */}
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-white/60">
                    Owner Response
                  </span>
                  <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                    <Sparkles size={10} /> AI Generated
                  </span>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">
                  &ldquo;{r.response}&rdquo;
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  SECTION 9 — 3-YEAR REVENUE TRAJECTORY                                   */
/* ═══════════════════════════════════════════════════════════════════════════ */

function TrajectorySection() {
  const bars = [
    { label: "Now", value: "$42K", height: "6%", color: "bg-white/20" },
    { label: "Year 1", value: "$487K", height: "65%", color: "bg-gradient-to-t from-amber-600 to-amber-400" },
    { label: "Year 2", value: "$612K", height: "82%", color: "bg-gradient-to-t from-emerald-600 to-emerald-400" },
    { label: "Year 3", value: "$748K", height: "100%", color: "bg-gradient-to-t from-purple-600 to-purple-400" },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#0d1a33]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionLabel>
          <BarChart3 size={14} /> 3-Year Projection
        </SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-14">
          Revenue <span className="gradient-text">Trajectory</span>
        </h2>

        {/* Bar Chart */}
        <div className="max-w-3xl mx-auto mb-14">
          <div className="flex items-end justify-center gap-6 sm:gap-10 h-[300px] sm:h-[360px]">
            {bars.map((bar) => (
              <div key={bar.label} className="flex flex-col items-center gap-3 flex-1 max-w-[100px]">
                <div className="text-sm sm:text-lg font-extrabold">{bar.value}</div>
                <div
                  className={`w-full rounded-t-xl ${bar.color} transition-all duration-1000`}
                  style={{ height: bar.height }}
                />
                <div className="text-xs text-white/40 font-medium">{bar.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { value: "$1.85M", label: "Cumulative Revenue (3yr)", color: "text-emerald-400" },
            { value: "400+", label: "Reviews Accumulated", color: "text-amber-400" },
            { value: "17.8x", label: "Return on Investment", color: "text-purple-400" },
          ].map((s) => (
            <GlassCard key={s.label} className="p-6 text-center">
              <div className={`text-3xl font-extrabold ${s.color} mb-1`}>
                {s.value}
              </div>
              <div className="text-xs text-white/40">{s.label}</div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  SECTION 10 — INVESTMENT SUMMARY / CTA                                   */
/* ═══════════════════════════════════════════════════════════════════════════ */

function InvestmentCTASection() {
  const breakdown = [
    { label: "Current Revenue", value: "$42K", color: "text-white/50" },
    { label: "+ Review System", value: "+$107K", color: "text-amber-400" },
    { label: "+ 2 Additional Profiles", value: "+$180K", color: "text-emerald-400" },
    { label: "+ LSA Google Guaranteed", value: "+$112K", color: "text-blue-400" },
    { label: "+ AI Auto Reviews", value: "+$46K", color: "text-purple-400" },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 glow-orange" />
      <div className="absolute inset-0 grid-overlay" />
      <div className="noise absolute inset-0" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <SectionLabel>
            <TrendingUp size={14} /> Investment Summary
          </SectionLabel>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            From <span className="text-white/40">$42K</span> to{" "}
            <span className="gradient-text">$487K</span>
          </h2>
          <p className="text-white/50 mb-12">
            A complete breakdown of projected annual revenue at full system
            deployment.
          </p>

          {/* Breakdown */}
          <GlassCard className="p-8 mb-10 text-left">
            <div className="space-y-4">
              {breakdown.map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/60">{item.label}</span>
                    <span className={`text-lg font-bold ${item.color}`}>
                      {item.value}
                    </span>
                  </div>
                  {i < breakdown.length - 1 && (
                    <div className="border-b border-white/[0.06] mt-4" />
                  )}
                </div>
              ))}
            </div>
            <div className="border-t-2 border-orange-500/30 mt-6 pt-6 flex items-center justify-between">
              <span className="font-bold text-lg">Total Projected</span>
              <span className="text-3xl font-extrabold gradient-text">
                $487K/yr
              </span>
            </div>
          </GlassCard>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.1] text-white font-semibold transition-all"
            >
              <Star size={18} className="text-amber-400" />
              Leave a Review
              <ExternalLink size={14} className="text-white/40" />
            </a>

            <a
              href={`tel:${company.phoneTel}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold shadow-[0_8px_32px_-8px_rgba(249,115,22,0.5)] transition-all"
            >
              <Phone size={18} />
              Schedule Strategy Call
              <ArrowRight size={16} />
            </a>
          </div>

          <p className="text-xs text-white/30">
            Powered by automated review collection and AI response technology.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  SECTION 11 — REVIEW CTA                                                 */
/* ═══════════════════════════════════════════════════════════════════════════ */

function ReviewCTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#0d1a33]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Already a Client?{" "}
            <span className="gradient-text">Share Your Experience.</span>
          </h2>
          <p className="text-white/50 mb-10">
            Takes less than 30 seconds. Your review helps future homebuyers
            find a team they can trust.
          </p>

          {/* Stars */}
          <div className="flex justify-center mb-8">
            <Stars count={5} size={40} />
          </div>

          {/* Big Review Button */}
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-lg shadow-[0_12px_40px_-12px_rgba(249,115,22,0.6)] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageSquare size={22} />
            Leave a Google Review
            <ExternalLink size={18} />
          </a>

          <p className="text-sm text-white/30 mt-6">
            Takes less than 30 seconds
          </p>
        </div>
      </div>
    </section>
  );
}
