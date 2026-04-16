"use client";

import { useState } from "react";
import { company } from "@/lib/config";
import {
  Phone,
  PhoneIncoming,
  PhoneOutgoing,
  UserCheck,
  Home,
  TrendingUp,
  DollarSign,
  ArrowRight,
  AlertTriangle,
  Star,
  Clock,
  CheckCircle2,
  XCircle,
  Handshake,
  MessageSquare,
  Target,
  Shield,
  Zap,
} from "lucide-react";

type Section = {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
};

const sections: Section[] = [
  { id: "inbound-buyer", title: "Inbound — Buyer Calls", icon: <PhoneIncoming className="w-5 h-5" />, color: "text-blue-400" },
  { id: "inbound-seller", title: "Inbound — Seller Calls", icon: <PhoneIncoming className="w-5 h-5" />, color: "text-emerald-400" },
  { id: "outbound-fsbo", title: "Outbound — FSBO", icon: <PhoneOutgoing className="w-5 h-5" />, color: "text-amber-400" },
  { id: "outbound-expired", title: "Outbound — Expired Listings", icon: <PhoneOutgoing className="w-5 h-5" />, color: "text-orange-400" },
  { id: "outbound-past", title: "Outbound — Past Clients", icon: <PhoneOutgoing className="w-5 h-5" />, color: "text-purple-400" },
  { id: "objections", title: "Objection Handlers", icon: <Shield className="w-5 h-5" />, color: "text-red-400" },
  { id: "handoff", title: "Partner Handoff", icon: <Handshake className="w-5 h-5" />, color: "text-cyan-400" },
  { id: "followup", title: "Follow-Up Sequences", icon: <Clock className="w-5 h-5" />, color: "text-pink-400" },
];

export default function ScriptsDashboard() {
  const [active, setActive] = useState("inbound-buyer");

  return (
    <div className="min-h-screen bg-[#0A1429] text-white">
      {/* Top bar */}
      <div className="border-b border-white/10 bg-white/[0.02] backdrop-blur sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
              <Phone className="w-5 h-5 text-orange-400" />
              Call Playbook
            </h1>
            <p className="text-xs text-white/40">{company.name} — Internal Only</p>
          </div>
          <div className="text-xs text-white/30 flex items-center gap-2">
            <Shield className="w-3.5 h-3.5" />
            Private
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Golden rules */}
        <div className="rounded-2xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 p-6 mb-8">
          <h2 className="text-sm font-bold text-orange-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Golden Rules — Every Call
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <Clock className="w-4 h-4" />, rule: "Respond in under 5 minutes", sub: "First agent to call wins 78% of the time" },
              { icon: <MessageSquare className="w-4 h-4" />, rule: "Ask questions, don't pitch", sub: "Listen 70%, talk 30%" },
              { icon: <Target className="w-4 h-4" />, rule: "Always set the next step", sub: "Appointment, showing, or follow-up call" },
              { icon: <Handshake className="w-4 h-4" />, rule: "Handoff warm, not cold", sub: "Introduce your partner by name" },
            ].map((r) => (
              <div key={r.rule} className="flex gap-3">
                <div className="text-orange-400 mt-0.5">{r.icon}</div>
                <div>
                  <div className="text-sm font-semibold text-white">{r.rule}</div>
                  <div className="text-xs text-white/40 mt-0.5">{r.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          {/* Sidebar nav */}
          <div className="space-y-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left transition-all ${
                  active === s.id
                    ? "bg-white/[0.06] border border-white/10 text-white"
                    : "text-white/50 hover:text-white/80 hover:bg-white/[0.02]"
                }`}
              >
                <span className={s.color}>{s.icon}</span>
                {s.title}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="min-h-[600px]">
            {active === "inbound-buyer" && <InboundBuyer />}
            {active === "inbound-seller" && <InboundSeller />}
            {active === "outbound-fsbo" && <OutboundFSBO />}
            {active === "outbound-expired" && <OutboundExpired />}
            {active === "outbound-past" && <OutboundPast />}
            {active === "objections" && <Objections />}
            {active === "handoff" && <PartnerHandoff />}
            {active === "followup" && <FollowUp />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Script Components ─── */

function ScriptCard({ title, tag, tagColor, children }: { title: string; tag?: string; tagColor?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 mb-4">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-lg font-bold">{title}</h3>
        {tag && (
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${tagColor ?? "bg-white/10 text-white/50"}`}>
            {tag}
          </span>
        )}
      </div>
      <div className="space-y-4 text-[15px] text-white/75 leading-relaxed">{children}</div>
    </div>
  );
}

function Say({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 px-5 py-4">
      <div className="text-[10px] text-blue-400 uppercase tracking-wider font-semibold mb-1.5">Say</div>
      <div className="text-white/90 text-[15px] leading-relaxed">{children}</div>
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 text-sm text-white/50 italic">
      <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
      <div>{children}</div>
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 text-sm text-emerald-300/80">
      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
      <div>{children}</div>
    </div>
  );
}

/* ─── Inbound Buyer ─── */
function InboundBuyer() {
  return (
    <div>
      <ScriptCard title="Opening — When a Buyer Calls You" tag="High Intent" tagColor="bg-blue-500/20 text-blue-400">
        <Say>
          Hi, this is Sundus with Real Estate Market Center — thanks for calling! How can I help you today?
        </Say>
        <Note>Let them talk first. Don't pitch. Listen for: what they're looking for, timeline, if they have an agent, if they're pre-approved.</Note>
      </ScriptCard>

      <ScriptCard title="Qualifying Questions — Ask All of These">
        <div className="space-y-3">
          <Say>Great, so you're looking to buy — that's exciting. Let me ask you a few quick questions so I can actually help you, not waste your time.</Say>
          <div className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-2.5">
            <div className="text-white/90 font-medium text-sm">Ask these in order:</div>
            {[
              "What area are you looking in? Any specific cities or neighborhoods?",
              "What's your ideal price range?",
              "How many bedrooms and bathrooms do you need?",
              "What's your timeline — when do you need to be in a home?",
              "Are you currently renting or do you have a home to sell first?",
              "Have you been pre-approved with a lender yet?",
              "Are you currently working with another agent?",
            ].map((q, i) => (
              <div key={i} className="flex gap-3 text-sm text-white/70">
                <span className="text-orange-400 font-bold">{i + 1}.</span>
                <span>"{q}"</span>
              </div>
            ))}
          </div>
        </div>
      </ScriptCard>

      <ScriptCard title="Pre-Approval Pivot" tag="Critical" tagColor="bg-amber-500/20 text-amber-400">
        <div className="text-sm text-white/50 mb-3">If they're NOT pre-approved:</div>
        <Say>
          No worries at all — a lot of people start looking before getting pre-approved. Here's what I'd recommend: let me connect you with a great lender I work with. They can get you pre-approved in about 24 hours, and then we'll know your exact budget so I'm not showing you homes that don't work. Sound good?
        </Say>
        <Tip>This is where you hand off to your partner lender. See the Partner Handoff section.</Tip>
      </ScriptCard>

      <ScriptCard title="Setting the Appointment" tag="Close" tagColor="bg-emerald-500/20 text-emerald-400">
        <Say>
          Here's what I'd like to do — I'll pull together some properties that match what you described, and let's schedule a quick 15-minute call this week to go over them together. That way you're not wasting time scrolling Zillow. What works better for you — mornings or afternoons?
        </Say>
        <Note>Always give two time options, never leave it open-ended. "Would Tuesday at 2 or Wednesday at 10 work better?"</Note>
      </ScriptCard>

      <ScriptCard title="Closing the Call">
        <Say>
          Perfect, I've got you down for [day/time]. I'll send you a text to confirm and I'll have a few listings ready for us to look at. If anything comes up before then, you've got my cell — (248) 568-6081. Looking forward to working with you, [name].
        </Say>
      </ScriptCard>
    </div>
  );
}

/* ─── Inbound Seller ─── */
function InboundSeller() {
  return (
    <div>
      <ScriptCard title="Opening — When a Seller Calls" tag="Highest Value Lead" tagColor="bg-emerald-500/20 text-emerald-400">
        <Say>
          Hi, this is Sundus with Real Estate Market Center — thanks for reaching out! Are you thinking about selling your home?
        </Say>
        <Note>Seller leads are worth 3-5x buyer leads. Treat every one like gold. Get them talking about their motivation.</Note>
      </ScriptCard>

      <ScriptCard title="Discovery Questions">
        <Say>I'd love to help. Let me ask you a few things so I can give you real answers, not fluff.</Say>
        <div className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-2.5">
          {[
            "What's the address of the property you're thinking about selling?",
            "What's making you consider a move right now?",
            "Do you have a timeline in mind — is this something you'd want to do in the next month or two, or more down the road?",
            "Have you had the home appraised or valued recently?",
            "Where would you be moving to? Are you also buying?",
            "Have you talked to any other agents about listing?",
          ].map((q, i) => (
            <div key={i} className="flex gap-3 text-sm text-white/70">
              <span className="text-emerald-400 font-bold">{i + 1}.</span>
              <span>"{q}"</span>
            </div>
          ))}
        </div>
        <Tip>The motivation question is the most important. Job change, divorce, upsizing, downsizing, financial — know their WHY.</Tip>
      </ScriptCard>

      <ScriptCard title="The Value Pitch" tag="Differentiation" tagColor="bg-orange-500/20 text-orange-400">
        <Say>
          Here's what I'd like to do — I'll run a full market analysis on your home. Not a Zestimate, not a guess — I'll pull the actual comps from the last 90 days, factor in your home's condition and upgrades, and give you a realistic range of what buyers would pay right now. Totally free, no obligation. If you like what you see, we can talk about next steps. If not, no hard feelings. Fair enough?
        </Say>
      </ScriptCard>

      <ScriptCard title="Setting the Listing Appointment">
        <Say>
          The best way to do this is for me to come see the home in person — I can give you a much more accurate number that way, plus I can point out any quick fixes that could add value. Would sometime this week work? I'm flexible — what's a good day for you?
        </Say>
        <Note>Always push for the in-person appointment. That's where you win the listing.</Note>
      </ScriptCard>

      <ScriptCard title="If They're Also Buying">
        <Say>
          Perfect — since you're also looking to buy, I can coordinate both sides so you're not stuck paying two mortgages or moving twice. I work with a great lender who specializes in bridge financing and buy-before-you-sell programs. Want me to loop them in?
        </Say>
        <Tip>Dual transaction = dual commission. Also a perfect partner handoff opportunity.</Tip>
      </ScriptCard>
    </div>
  );
}

/* ─── FSBO ─── */
function OutboundFSBO() {
  return (
    <div>
      <ScriptCard title="FSBO Cold Call Script" tag="Outbound" tagColor="bg-amber-500/20 text-amber-400">
        <Say>
          Hi, is this the owner of the home for sale on [street]? Great — my name is Sundus with Real Estate Market Center. I'm not calling to pitch you or pressure you into anything. I noticed your home listed for sale by owner and I wanted to ask — would you be open to hearing how much a buyer's agent might bring to the table? Most sellers don't realize that 87% of buyers are already working with an agent, and those agents typically won't show FSBO homes to their clients. I can help you get in front of those buyers. No commitment — just a conversation.
        </Say>
      </ScriptCard>

      <ScriptCard title="If They Say 'I Don't Want to Pay Commission'">
        <Say>
          I totally understand — that's the number one reason people go FSBO. Here's something most people don't know though: homes sold with an agent sell for an average of 13% more than FSBO homes. On a $400K home, that's over $50K. Even after commission, you'd likely net more with representation. Want me to run the numbers on your specific home so you can see for yourself?
        </Say>
      </ScriptCard>

      <ScriptCard title="If They Say 'I Already Have Interest'">
        <Say>
          That's great — having interest is a good sign. The question is whether that interest turns into the best possible offer. Are those buyers pre-approved? Do you have a way to verify their financing? I can help you evaluate offers and negotiate terms even if you already have a buyer. Sometimes that negotiation alone covers my entire fee.
        </Say>
      </ScriptCard>
    </div>
  );
}

/* ─── Expired ─── */
function OutboundExpired() {
  return (
    <div>
      <ScriptCard title="Expired Listing Script" tag="Outbound" tagColor="bg-orange-500/20 text-orange-400">
        <Say>
          Hi [name], this is Sundus with Real Estate Market Center. I noticed your home on [street] recently came off the market, and I wanted to reach out. I'm not going to bash your previous agent — I'm sure they tried. But I do things differently, and I'd love 10 minutes to show you what a different approach looks like. If it doesn't make sense, I'll be the first to tell you. Fair enough?
        </Say>
        <Note>The key with expired listings: don't trash the previous agent. Differentiate yourself with strategy, not insults.</Note>
      </ScriptCard>

      <ScriptCard title="The Differentiation Pitch">
        <Say>
          Here's what I typically see with homes that don't sell: it's almost always one of three things — pricing, marketing, or exposure. I'll be completely honest with you about which one it was. I'll pull fresh comps, show you what similar homes actually sold for, and if the numbers still work, I'll show you exactly how I'd market it differently. Can I come take a look this week?
        </Say>
      </ScriptCard>

      <ScriptCard title="If They're Frustrated / Angry">
        <Say>
          I hear you — that's really frustrating, especially when you were counting on that sale. Look, I'm not here to add to the noise. I just want to give you honest information. If it turns out your home can sell at a price that works for you, I'll show you exactly how. If it can't, I'll tell you that too. Either way, you'll have clarity. Is that worth 15 minutes to you?
        </Say>
      </ScriptCard>
    </div>
  );
}

/* ─── Past Client ─── */
function OutboundPast() {
  return (
    <div>
      <ScriptCard title="Past Client Check-In" tag="Warm" tagColor="bg-purple-500/20 text-purple-400">
        <Say>
          Hey [name]! It's Sundus from Real Estate Market Center — how are you? I was just thinking about you and wanted to check in. How's everything going with the house? ... That's great to hear. Hey, quick question — do you know anyone in your circle who's thinking about buying or selling? I'm always looking to take great care of people you trust, and I'd really appreciate the referral if anyone comes to mind.
        </Say>
        <Tip>Past clients are your #1 referral source. Call 5 per week minimum. The script is simple — just be a human being.</Tip>
      </ScriptCard>

      <ScriptCard title="Past Client — Review Ask">
        <Say>
          Also — this is a small ask, but it really helps me a lot — would you mind leaving me a quick Google review? Takes about 30 seconds. I can text you the link right now. Your name and a couple sentences goes a long way for me.
        </Say>
        <Note>Then text them their unique /r/ link from the pipeline dashboard.</Note>
      </ScriptCard>

      <ScriptCard title="Past Client — Equity Check-In">
        <Say>
          Hey, one more thing — homes in [their city] have gone up quite a bit since you bought. I ran a quick look and your place might be worth $[X] more than what you paid. Not saying you should sell — but it's good to know where you stand. Want me to send you the full breakdown?
        </Say>
      </ScriptCard>
    </div>
  );
}

/* ─── Objections ─── */
function Objections() {
  return (
    <div>
      {[
        {
          obj: "I'm already working with an agent.",
          response: "That's great — having representation is important. If you don't mind me asking, are you under a signed agreement? ... No? Well, you're welcome to keep your options open. If for any reason things don't work out, I'm here. Can I send you my card in case?",
        },
        {
          obj: "I'm not ready yet. Just looking.",
          response: "No problem at all — honestly, the best time to start is before you're ready. That way when you do see the right home, you can move fast instead of scrambling. How about I send you listings that match what you're looking for, and when the timing's right, we'll hit the ground running?",
        },
        {
          obj: "I want to think about it.",
          response: "Absolutely, take your time. Can I ask — what specifically are you weighing? Sometimes I can help answer the question you're stuck on. ... [Listen, address] ... How about we reconnect on [specific day]? I'll check in and we can go from there.",
        },
        {
          obj: "Your commission is too high.",
          response: "I understand — commission is an investment. Here's how I look at it: my job is to net you more money than you'd get without me, even after my fee. On average, my listings sell for [X]% more than the market average in [city]. If I can show you the math on your specific home, would that change the conversation?",
        },
        {
          obj: "I can just sell it myself.",
          response: "You absolutely can — and some people do great with that. The data shows that agent-assisted sales net about 13% more on average, but every situation is different. How about this — let me run a market analysis on your home, completely free. If the numbers show you'd be better off on your own, I'll tell you. Fair?",
        },
        {
          obj: "I had a bad experience with an agent before.",
          response: "I'm sorry to hear that — unfortunately not every agent operates the same way. I can't speak for them, but I can tell you how I work: I communicate every step, I don't disappear after the contract is signed, and I'm honest even when it's not what you want to hear. Can I earn the chance to show you the difference?",
        },
        {
          obj: "I need to talk to my spouse / partner first.",
          response: "Of course — this is a big decision and you should both be on the same page. Would it be helpful if I sent you a quick summary you can share with them? Or better yet, I'd be happy to jump on a quick call with both of you. What works best?",
        },
        {
          obj: "The market is bad right now.",
          response: "I hear that a lot — and the media definitely pushes that narrative. But here's what the data actually shows in [city]: [share 1-2 recent comps or stats]. The national market and YOUR local market are two different things. Want me to show you what's actually happening on your street?",
        },
      ].map((item) => (
        <ScriptCard key={item.obj} title={item.obj} tag="Objection" tagColor="bg-red-500/15 text-red-400">
          <Say>{item.response}</Say>
        </ScriptCard>
      ))}
    </div>
  );
}

/* ─── Partner Handoff ─── */
function PartnerHandoff() {
  return (
    <div>
      <ScriptCard title="Handing Off to Your Partner" tag="Key Step" tagColor="bg-cyan-500/20 text-cyan-400">
        <div className="rounded-xl bg-cyan-500/10 border border-cyan-500/20 p-5 mb-4">
          <div className="text-sm font-bold text-cyan-300 mb-2">Why this matters:</div>
          <div className="text-sm text-white/60">
            A warm handoff converts 5x better than a cold referral. Never just give a phone number — introduce them personally. The client should feel like they're getting VIP treatment, not being passed off.
          </div>
        </div>
      </ScriptCard>

      <ScriptCard title="Live Warm Transfer (Best Option)">
        <Say>
          [Name], I want to connect you with my partner [Partner's Name]. They specialize in [lending/buying/selling in that area] and they're going to take incredible care of you. I'm going to bring them on the line right now — give me one second.
        </Say>
        <div className="text-sm text-white/40 italic mt-2">Then three-way call your partner. Introduce:</div>
        <Say>
          Hey [Partner], I have [Client Name] on the line — they're looking to [buy/sell/get pre-approved] in [area]. I've already gone over the basics. I'll let you two take it from here, but [Client], I'm always a phone call away if you need anything. You're in great hands.
        </Say>
      </ScriptCard>

      <ScriptCard title="Text Introduction (If You Can't Call Live)">
        <div className="rounded-xl bg-white/5 border border-white/10 p-5">
          <div className="text-xs text-white/30 uppercase tracking-wider mb-2">Text to send (group text — you, client, partner):</div>
          <div className="text-[15px] text-white/80 leading-relaxed">
            "Hey [Client Name], meet [Partner Name]! They're my go-to for [lending/area expertise] and they're going to help you with [specific need]. [Partner], [Client] is looking to [buy/sell] in [area] — timeline is [X]. I'll let you two connect! Let me know if either of you needs anything."
          </div>
        </div>
        <Tip>Always include context. Your partner shouldn't have to re-ask questions you already covered.</Tip>
      </ScriptCard>

      <ScriptCard title="Follow Up After Handoff" tag="Don't Skip" tagColor="bg-amber-500/20 text-amber-400">
        <div className="text-sm text-white/60 mb-3">24 hours after the handoff, text the client:</div>
        <Say>
          Hey [Name], just checking in — did you connect with [Partner]? Want to make sure you're taken care of. Let me know if there's anything else I can do!
        </Say>
        <Note>This follow-up is what separates good agents from great ones. The client remembers you stayed involved.</Note>
      </ScriptCard>
    </div>
  );
}

/* ─── Follow Up ─── */
function FollowUp() {
  return (
    <div>
      <ScriptCard title="Speed-to-Lead Response" tag="Critical" tagColor="bg-pink-500/20 text-pink-400">
        <div className="rounded-xl bg-pink-500/10 border border-pink-500/20 p-5 mb-4">
          <div className="text-3xl font-bold text-pink-400 mb-1">5 minutes</div>
          <div className="text-sm text-white/60">Maximum response time for any new lead. After 5 minutes, conversion drops by 80%. Set phone notifications for every Supabase form submission.</div>
        </div>
        <div className="text-sm text-white/50 mb-2">Instant text to send when a lead comes in:</div>
        <Say>
          Hi [Name]! This is Sundus from Real Estate Market Center. Just got your info — I'd love to help. When's a good time for a quick 5-minute call today? I'm available now if that works.
        </Say>
      </ScriptCard>

      <ScriptCard title="Day 1 — No Response Follow-Up">
        <Say>
          Hey [Name], just following up — I know things get busy. Still happy to help with [what they inquired about]. Want me to call you or is text easier? Either way works for me.
        </Say>
      </ScriptCard>

      <ScriptCard title="Day 3 — Value Follow-Up">
        <Say>
          Hi [Name], Sundus again. I pulled some data on [their area/interest] and thought you might find it useful. A home on [nearby street] just sold for $[X] — the market is [moving fast/showing opportunity]. Would you like me to send you the full breakdown? No pressure, just trying to be helpful.
        </Say>
      </ScriptCard>

      <ScriptCard title="Day 7 — Last Touch">
        <Say>
          Hey [Name], I don't want to be annoying, so this will be my last reach-out unless you'd like to stay connected. If now's not the right time, totally fine — my number is (248) 568-6081 whenever you're ready. Wishing you the best either way!
        </Say>
        <Tip>This "breakup" text actually gets the highest response rate of any follow-up message. People reply because they feel the pressure disappear.</Tip>
      </ScriptCard>

      <ScriptCard title="Monthly Nurture (Long-Term Leads)">
        <Say>
          Hey [Name], Sundus from Real Estate Market Center checking in. Just wanted to share a quick market update for [their city]: [1-2 sentences about local stats]. If anything has changed on your end, I'm always here. Hope you're having a great week!
        </Say>
        <Note>Send this once per month to every lead that went cold. People buy when THEY'RE ready, not when you're ready. Stay top of mind.</Note>
      </ScriptCard>
    </div>
  );
}
