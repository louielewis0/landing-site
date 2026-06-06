/**
 * 90-day playbook task content. Distilled from the Tommy Mello Gold corpus
 * (segments 1–10 + the synthesized MARKET-CENTER-PLAYBOOK), filtered to a
 * solo, no-budget, zero-lead agent's reality.
 *
 * What's IN: existing-network mining, in-person networking (BNI / Chamber /
 * HOA), Google reviews + reputation, speed-to-lead discipline, script
 * memorization + reps, the bagel route, Dream 100 partners, consistency.
 *
 * What's OUT (90% of the corpus): paid digital, PPC, truck wraps, radio/TV,
 * recruiting armies, fleet, acquisitions, equity programs — broker/owner
 * moves that don't apply here.
 *
 * Every task carries a `note` citing the corpus principle behind it so the
 * "why" is one line away from the "what". Notes reference the segment
 * number where the principle lives.
 *
 * Phases:
 *   1 — Foundation (Days 1–30): mine your existing network, install the
 *       free infrastructure, build script muscle.
 *   2 — Momentum  (Days 31–60): bagel route, weekly cadence, HOA push,
 *       reps under pressure.
 *   3 — Systems   (Days 61–90): speed-to-lead discipline, KPI tracking,
 *       Dream 100 deepening, plan the next 30.
 *
 * Task IDs are stable kebab-case slugs (e.g. p1-d01-list-50). They become
 * the primary key in playbook_completions. Don't rename without a
 * migration — completed-state is keyed off them.
 */

export type Phase = 1 | 2 | 3;

export type PlaybookTask = {
  id: string;
  day: number; // 1–90
  phase: Phase;
  title: string;
  note?: string;
};

export type PhaseInfo = {
  id: Phase;
  dayStart: number;
  dayEnd: number;
  title: string;
  subtitle: string;
};

export const PHASES: PhaseInfo[] = [
  {
    id: 1,
    dayStart: 1,
    dayEnd: 30,
    title: "Foundation",
    subtitle:
      "Mine your existing network. Install the free infrastructure. Build the script muscle.",
  },
  {
    id: 2,
    dayStart: 31,
    dayEnd: 60,
    title: "Momentum",
    subtitle:
      "Bagel route. Weekly cadence. HOAs. Reps under pressure. Conversations compound.",
  },
  {
    id: 3,
    dayStart: 61,
    dayEnd: 90,
    title: "Systems",
    subtitle:
      "Speed-to-lead discipline. KPI tracking. Dream 100 deepening. Plan the next 30 from data.",
  },
];

export const TOTAL_DAYS = 90;
export const WEEKLY_CONVERSATIONS_TARGET = 15;

const t = (
  id: string,
  day: number,
  phase: Phase,
  title: string,
  note?: string,
): PlaybookTask => ({ id, day, phase, title, note });

/* ─────────────────────────────────────────────────────────────────────────
   PHASE 1 — FOUNDATION (Days 1–30)
   ───────────────────────────────────────────────────────────────────────── */
const PHASE_1: PlaybookTask[] = [
  // Week 1 — Sphere mapping
  t("p1-d01-list-50", 1, 1,
    "List 50 people you know in Metro Detroit who own or rent a home. Master sheet, names + phone + neighborhood.",
    "Segment 1: 40% of A1's revenue comes from referrals. Your existing network is the cheapest deal you'll ever close — start it on paper before anywhere else."),
  t("p1-d01-watch-segment-1", 1, 1,
    "Read segment-01.md. Highlight the three lines that hit hardest.",
    "Foundation rep. The corpus is your operating manual; the playbook is the index."),

  t("p1-d02-top-20", 2, 1,
    "From your 50, mark the TOP 20 — anyone who could buy, sell, or refer in the next 12 months.",
    "Segment 5: sort the database by relationship strength before anything else. Tommy's database = $1.7M people; yours starts at 20."),
  t("p1-d02-practice-opener", 2, 1,
    "Memorize the 3-question listing opener out loud: \"How long have you lived here? What has to go right for this move to be a win? Is this your first time selling?\"",
    "Segment 1: the diagnostic frame. Questions out-convert pitches every time."),

  t("p1-d03-write-message", 3, 1,
    "Write your \"I'm an agent now at Market Center\" heads-up message — one short, honest paragraph. No pitch. Just \"wanted you to know, and I'm here if it ever comes up.\"",
    "Segment 5: people don't refer pitches. They refer people they like and trust."),

  t("p1-d04-send-five-1", 4, 1,
    "Send the heads-up message to 5 people from your top 20.",
    "Each one is a conversation that counts toward the weekly target (15)."),
  t("p1-d04-opener-reps", 4, 1,
    "Say the 3-question opener out loud 3x. Slow. With pauses.",
    "Segment 3: the pause is the thing. \"Then shut up.\""),

  t("p1-d05-send-five-2", 5, 1,
    "Send the heads-up message to 5 more from your top 20.",
    "Don't refine the message. Send 5. Then 5. Then 5. Velocity beats wording."),

  t("p1-d06-send-five-3", 6, 1,
    "Send the heads-up message to 5 more.",
    "20 total this week. Track replies in your sheet."),

  t("p1-d07-send-final-five", 7, 1,
    "Send the heads-up message to the last 5 of your top 20.",
    ""),
  t("p1-d07-week1-reflect", 7, 1,
    "How many replied? How many said \"actually, I know someone…\"? Log in your sheet.",
    "Segment 9: \"What gets measured gets managed.\" Even with 20 messages."),

  // Week 2 — Reviews + script muscle
  t("p1-d08-gbp", 8, 1,
    "Set up your personal Google profile, or get your name added to the Market Center GBP as an agent.",
    "Segment 8: \"Nobody leaves a review for the business. They leave it for the individual.\" Your name has to be findable."),

  t("p1-d09-write-review-asks", 9, 1,
    "Write 5 one-sentence review-request messages, tailored to people you've helped — real estate or not. Friends, family, past coworkers, anyone.",
    "Segment 6: \"Would you be willing to leave a review for me and mention [neighborhood] and [my name]?\" That's the template."),

  t("p1-d10-send-review-asks-1", 10, 1,
    "Send 3 of those review requests.",
    "Segment 8: reviews with photos count 10x; mentioning the agent's name + neighborhood compounds it."),

  t("p1-d11-send-review-asks-2", 11, 1,
    "Send the other 2 review requests.",
    ""),
  t("p1-d11-close-reps", 11, 1,
    "Say the close out loud 5x: \"What is it going to take to earn your business today?\" Then sit in silence. Time the silence.",
    "Segments 1 + 9: the close repeated 5+ times in the corpus. The silence is the close — not the question."),

  t("p1-d12-commission-rebuttal", 12, 1,
    "Memorize the commission rebuttal: \"I'd rather apologize once for the commission being too high than apologize multiple times for poor service.\"",
    "Segment 1, verbatim Tommy. Don't reword. Memorize."),

  t("p1-d13-options-frame", 13, 1,
    "Write down 3 listing tiers you could pitch: White-Glove / Signature / Essentials. One bullet of what's in each. Show mom for sanity check.",
    "Segment 1, 3, 6, 7, 8, 10 — repeated: \"If you're not giving options, you're giving ultimatums.\" Three tiers, not one number."),

  t("p1-d14-3wk-cadence", 14, 1,
    "For every top-20 contact who hasn't replied, schedule 3 touches over the next 3 weeks. Each touch ends with a question mark.",
    "Segment 2: 3-week follow-up cadence, every touch ends with a question mark. The question pulls them back to you."),
  t("p1-d14-week2-reflect", 14, 1,
    "Reflect: how many conversations did you start this week? Update the weekly counter.",
    "Target: 15/week. With someone who could buy, sell, or refer."),

  // Week 3 — Network discovery (BNI + Chamber + Partners)
  t("p1-d15-list-bni", 15, 1,
    "Find every BNI chapter within 30 minutes of Troy. List them: day, time, where, cost to visit (usually free for first visit).",
    "Segment 7, Tommy verbatim: \"When you're stuck between a rock and a hard spot in marketing, go to BNI meetings.\" His #1 sub-$5M tactic."),

  t("p1-d16-email-bni", 16, 1,
    "Email one BNI chapter to visit as a guest this month.",
    "Segment 7: just walk in. The room is the goal."),

  t("p1-d17-chamber", 17, 1,
    "Find the Troy Chamber of Commerce events calendar. Pick one event in the next 30 days. RSVP.",
    "Segment 8: \"Communities matter way more than people give them credit for.\""),

  t("p1-d18-mortgage-list", 18, 1,
    "Identify 3 mortgage brokers in Troy by name. One from your network, one from Google, one referenced at a BNI chapter site.",
    "Segment 9: \"Pre-game with bagels at the biggest mortgage broker.\" Prep the list before you show up with a bagel."),

  t("p1-d19-title-list", 19, 1,
    "Identify 2 title companies in Troy by name. Mom's used ones if possible.",
    "Segment 9: the bagel route hits same partners twice a week, every week, for 90 days."),

  t("p1-d20-inspector-list", 20, 1,
    "Identify 2 home inspectors in Troy by name.",
    "Segment 10 Dream 100: inspectors see homes before listings. They're a referral channel disguised as a vendor."),

  t("p1-d21-coffee-email", 21, 1,
    "Send one \"would love to grab coffee — only question I have is, how can I help YOU win?\" email to one of the 7 partners on your list.",
    "Segment 9 frame: \"How can I help you?\" Then shut up. The bagel route earns the right to ask this question."),

  // Week 4 — Show up + ask + reflect
  t("p1-d22-attend-bni", 22, 1,
    "Attend the BNI chapter. Goal: leave with 3 names + a follow-up plan for each.",
    "Segment 7: \"Tommy + stepdad picked up one HOA → 400 jobs.\" One room can move you forward 5 years."),

  t("p1-d23-bni-followup", 23, 1,
    "Send a one-line follow-up to each person you met at BNI. Reference one specific thing they said.",
    "Segment 7: specificity is the price of being remembered. \"Nice to meet you\" is not."),

  t("p1-d24-reps", 24, 1,
    "3-question opener + close + commission rebuttal — 3 reps each. Out loud. Time the silence.",
    "The corpus runs on muscle memory. Reps now, comfort later."),

  t("p1-d25-attend-chamber", 25, 1,
    "Attend the Troy Chamber event. Leave with 3 business cards.",
    ""),

  t("p1-d26-first-coffee", 26, 1,
    "Have your first partner coffee. Question: \"How can I help you win?\" Then shut up.",
    "Segment 9: the partner who says no isn't the lesson — the partner who says \"actually…\" is the win."),

  t("p1-d27-review-ask", 27, 1,
    "Ask one past contact for a Google review. Use Segment 6's ask verbatim — mention name + neighborhood in the request.",
    "Segment 8: a review without a name + neighborhood is a wasted review."),

  t("p1-d28-hoa-list", 28, 1,
    "List 5 HOAs in Troy you'd want to be in front of.",
    "Segment 7: HOA gatekeepers are the highest-leverage in-person lead source you have. Their newsletter is a 200-home email blast you don't pay for."),

  t("p1-d29-hoa-research", 29, 1,
    "Identify the HOA president of one of those 5 HOAs. LinkedIn, Facebook, neighborhood site, search.",
    ""),

  t("p1-d30-30day-reflect", 30, 1,
    "30-day reflection. Three bullets: what worked, what didn't, who showed up. No judgment.",
    "Segment 7: \"Test 1,000 things, 100 will work. Then double down.\" The next 30 days lean on what worked here."),
  t("p1-d30-conv-target", 30, 1,
    "Conversation log review: how many conversations did you start with someone who could buy / sell / refer? Goal was 15/week × 4 weeks.",
    ""),
];

/* ─────────────────────────────────────────────────────────────────────────
   PHASE 2 — MOMENTUM (Days 31–60)
   ───────────────────────────────────────────────────────────────────────── */
const PHASE_2: PlaybookTask[] = [
  // Week 5 — bagel route begins
  t("p2-d31-bni-decide", 31, 2,
    "Pick your final BNI chapter (you've visited at least one). Decide: join, or visit-as-guest weekly until you can afford to join.",
    "Segment 7: membership is a few hundred dollars/year. If money is tight, visit weekly without joining first. The room still works."),

  t("p2-d32-bagel-1a", 32, 2,
    "Bagel route day 1: drop bagels at the Troy mortgage broker office. <30 minutes. No pitch.",
    "Segment 9 verbatim: \"Pre-game with bagels at the biggest [partner] twice a week.\" The first drop earns nothing. The 12th earns the relationship."),

  t("p2-d33-review-ask", 33, 2,
    "Send a Google review request to a past contact you haven't asked yet.",
    ""),

  t("p2-d34-roleplay", 34, 2,
    "Roleplay the 3-question opener with a friend or to a mirror. 10 reps.",
    "Segment 3: \"Knock, don't ring the doorbell. Strangers ring; friends knock.\" Reps build the knock confidence."),

  t("p2-d35-bni-attend", 35, 2,
    "BNI attendance. Goal: leave with 3 new names.",
    ""),

  t("p2-d36-bagel-1b", 36, 2,
    "Bagel route day 2: different partner this time — title company or inspector.",
    ""),

  t("p2-d37-hoa-reach", 37, 2,
    "Reach out to one HOA president: \"I'd love to bring a free Troy market report to your next board meeting. No pitch — just neighborhood data.\"",
    "Segment 7: HOA presidents are the gatekeepers. Lead with the free thing they can use."),

  t("p2-d38-week-reflect", 38, 2,
    "Week reflection: log conversations started this week. Bookmark the single most promising contact.",
    "Segment 9: \"Your top 100 customers will give you your next deal.\" Same for top 100 contacts."),

  // Week 6
  t("p2-d39-add-10", 39, 2,
    "Add 10 new names to your master network sheet. People you've met or reconnected with since starting.",
    "Sphere growth compounds. 10/week × 90 days = +900 new contacts."),

  t("p2-d40-bagel-2a", 40, 2,
    "Bagel route — same partner as Day 32. The repetition is the point. Don't switch yet.",
    "Segment 9: same partner twice a week for 90 days. 24+ drops before they remember you."),

  t("p2-d41-thinking-of-you", 41, 2,
    "Send \"thinking of you\" check-ins to 3 people from your top 20 who haven't replied yet.",
    "Segment 2: the 3-week cadence, each touch ends with a question mark."),

  t("p2-d42-bni-attend", 42, 2,
    "BNI attendance.",
    ""),

  t("p2-d43-bagel-2b", 43, 2,
    "Bagel route day 2 — same second partner as Day 36.",
    ""),

  t("p2-d44-mortgage-coffee", 44, 2,
    "Reach out to a new mortgage broker — not one of your bagel-route partners — for coffee.",
    "Segment 10 Dream 100: deepen the bench. One partner can be sick or out."),

  t("p2-d45-week-reflect", 45, 2,
    "Week reflection. Conversations started this week — target 15. Where did they come from? BNI, bagel, sphere, HOA?",
    ""),

  // Week 7 — HOA push
  t("p2-d46-hoa-add-5", 46, 2,
    "Add 5 more HOA presidents to your meet list. Include zip codes outside Troy if your sphere has them.",
    ""),

  t("p2-d47-hoa-onepager", 47, 2,
    "Drop a one-pager about your free \"Troy neighborhood market report for HOA newsletters\" at the bagel-route partner office. Ask them to mention it.",
    "Segment 6: \"One job into 20 new leads before they back out of the driveway.\" The partner becomes the multiplier."),

  t("p2-d48-objection-reps", 48, 2,
    "Memorize objection: \"We want to interview 3 agents.\" → \"Of course. That's what everybody smart does. I'm here right now. What's it going to take to earn your business today?\" — 5 reps.",
    "Segment 1 + 3, verbatim."),

  t("p2-d49-bni-attend", 49, 2,
    "BNI attendance. Goal: GIVE one specific referral to another BNI member. Givers receive.",
    "Segment 7: BNI runs on reciprocity. Show up to give, not just take."),

  t("p2-d50-bagel-3a", 50, 2,
    "Bagel route.",
    ""),

  t("p2-d51-hoa-meet", 51, 2,
    "Meet one HOA president — in person OR over coffee. Lead with the free market-report offer.",
    ""),

  t("p2-d52-week-reflect", 52, 2,
    "Week reflection.",
    ""),

  // Week 8
  t("p2-d53-cold-audit", 53, 2,
    "Audit: who hasn't responded after 3 touches? Move them to a quarterly cold list — still in your sphere, just lower frequency.",
    "Segment 1: \"A relationship customer spends $1,544 vs $667 over 10 years.\" Cold isn't dead — just slower."),

  t("p2-d54-bagel-4a", 54, 2,
    "Bagel route.",
    ""),

  t("p2-d55-content-post", 55, 2,
    "Write one short post about a recent Troy / Metro Detroit market trend. Post to LinkedIn or Facebook. No paid promotion.",
    "Segment 5: \"50% of my orientation class came in because they heard me on podcasts/social.\" Free reach compounds slowly."),

  t("p2-d56-bni-attend", 56, 2,
    "BNI attendance.",
    ""),

  t("p2-d57-bagel-4b", 57, 2,
    "Bagel route.",
    ""),

  t("p2-d58-personalized", 58, 2,
    "Send 3 personalized check-ins. Personalized = referenced something specific from the last conversation.",
    "Segment 7: specificity is the price of being remembered."),

  t("p2-d59-pressure-rep", 59, 2,
    "Cold-call a friend who agreed to roleplay. Run the 3-question opener under \"pressure.\" Have them push back. Hold the silence.",
    "Segment 3: \"Then shut up.\" Practice the silence under fake fire so the real one doesn't surprise you."),

  t("p2-d60-60day-reflect", 60, 2,
    "60-day reflection. Write what's working and what's not. Adjust bagel-route partners. Adjust HOA targets. Be ruthless about reallocation.",
    "Segment 6: \"For every $1 in SEO I'm spending $32 in PPC.\" Reallocation beats addition."),
];

/* ─────────────────────────────────────────────────────────────────────────
   PHASE 3 — SYSTEMS (Days 61–90)
   ───────────────────────────────────────────────────────────────────────── */
const PHASE_3: PlaybookTask[] = [
  // Week 9 — speed-to-lead + KPI
  t("p3-d61-stl-sop", 61, 3,
    "Write your speed-to-lead SOP. What happens within 5 minutes of any new inquiry? Who picks up? What text goes out? Print it. Tape it to your desk.",
    "Segment 3: Salesforce — contact a lead in 1 minute = 400% higher conversion. At 30 min they've forgotten they filled it out."),

  t("p3-d62-bagel", 62, 3,
    "Bagel route.",
    ""),

  t("p3-d63-kpi-sheet", 63, 3,
    "Build a Google Sheet with the 4 KPIs: booking rate, conversion rate, avg commission, CPA. Even if every cell is 0 today.",
    "Segment 9 verbatim: \"What's your booking rate? What's your conversion rate? Solve those four and the budget reverse-engineers itself.\""),

  t("p3-d64-bni", 64, 3,
    "BNI attendance.",
    ""),

  t("p3-d65-bagel", 65, 3,
    "Bagel route.",
    ""),

  t("p3-d66-market-update", 66, 3,
    "Send a 4-sentence Q4 Troy market update to your top 50. One number, one observation, one offer to chat.",
    "Segment 5: monthly value email = one neighborhood comp report. Useful beats clever."),

  t("p3-d67-week-reflect", 67, 3,
    "Week reflection.",
    ""),

  // Week 10 — Dream 100 deepening
  t("p3-d68-dream100", 68, 3,
    "Identify 3 mortgage brokers you want as long-term Dream 100 partners — not just bagel-route stops, but real strategic relationships.",
    "Segment 10 Dream 100 (Chet Holmes / John Ruhlin): the 100 people who, if they referred you, would change your year."),

  t("p3-d69-bagel", 69, 3,
    "Bagel route.",
    ""),

  t("p3-d70-objection-reps", 70, 3,
    "Roleplay the close + the silence after it. 5 reps. The silence is the close — not the question.",
    "Segment 9: \"He asks. He waits. The customer fills the silence.\""),

  t("p3-d71-bni", 71, 3,
    "BNI attendance.",
    ""),

  t("p3-d72-bagel", 72, 3,
    "Bagel route.",
    ""),

  t("p3-d73-direct-ask", 73, 3,
    "Ask one past contact directly: \"Who do you know who's thinking about moving in the next year?\" Don't soften it.",
    "Segment 5: the question gets asked, the question gets answered. Soft asks get soft answers."),

  t("p3-d74-week-reflect", 74, 3,
    "Week reflection.",
    ""),

  // Week 11
  t("p3-d75-kpi-update", 75, 3,
    "Update KPI sheet with the last 14 days. Still mostly 0s? Fine. The discipline of updating it is the goal.",
    "Segment 3: \"Marketing will never fix anything if your operational KPIs are broken.\" You can't fix what you can't see."),

  t("p3-d76-bagel", 76, 3,
    "Bagel route.",
    ""),

  t("p3-d77-add-partner", 77, 3,
    "Identify one inspector or stager to add to your Dream 100 (not a bagel-route partner).",
    ""),

  t("p3-d78-bni", 78, 3,
    "BNI attendance.",
    ""),

  t("p3-d79-bagel", 79, 3,
    "Bagel route.",
    ""),

  t("p3-d80-neighbor-touch", 80, 3,
    "If mom has sold a home in your zip in the last 6 months, reach out to one neighbor: \"We sold X next door — wanted to share the market activity in your block.\"",
    "Segment 6: \"Yard signs talk to the neighbors. They turn one job into 20 new leads before they back out of the driveway.\""),

  t("p3-d81-week-reflect", 81, 3,
    "Week reflection.",
    ""),

  // Week 12 — synthesis
  t("p3-d82-conv-segmentation", 82, 3,
    "Review every conversation started since Day 1. Group into hot / warm / cold. Decide who needs a touch this week.",
    "Segment 9: \"Your top 100 customers will give you your next deal.\" Find them in your conversation log."),

  t("p3-d83-bagel", 83, 3,
    "Bagel route.",
    ""),

  t("p3-d84-close-reps", 84, 3,
    "Practice the close + silence. 5 reps. Time the silence. Hold it longer than feels comfortable.",
    "Segment 9: the longer you hold the silence, the bigger the price they say."),

  t("p3-d85-bni", 85, 3,
    "BNI attendance.",
    ""),

  t("p3-d86-bagel", 86, 3,
    "Bagel route.",
    ""),

  t("p3-d87-next-30-plan", 87, 3,
    "Plan the next 30 days. What's recurring (BNI, bagel, weekly check-ins)? What's a one-time deepening tactic from your 90-day data?",
    "Segment 7: \"Double down on what worked, kill what didn't.\""),

  t("p3-d88-dream100-recoffee", 88, 3,
    "Re-invite 5 Dream 100 partners to one-on-one coffee. \"It's been [N] weeks. Want to catch up?\"",
    "Segment 10: the Dream 100 is a list you nurture forever, not a list you finish."),

  t("p3-d89-full-rep", 89, 3,
    "Run every script back-to-back, out loud, 1 rep each: 3-question opener → commission rebuttal → \"3 agents\" objection → close + silence → review ask.",
    "The full chain. End-to-end. Like a kata."),

  t("p3-d90-90day-reflect", 90, 3,
    "90-day reflection. The single biggest win. The single biggest miss. The plan for the next 90 days, written from your data — not from the playbook.",
    "Segment 7: \"Test 1,000 things, 100 will work. Then double down.\" Day 90 is when you become the author of your own playbook."),
];

export const TASKS: PlaybookTask[] = [...PHASE_1, ...PHASE_2, ...PHASE_3];

/** Look up the phase that contains a given day. */
export function phaseForDay(day: number): PhaseInfo {
  const p = PHASES.find((p) => day >= p.dayStart && day <= p.dayEnd);
  if (!p) return PHASES[PHASES.length - 1];
  return p;
}

/** All tasks for a given day, in insertion order. */
export function tasksForDay(day: number): PlaybookTask[] {
  return TASKS.filter((t) => t.day === day);
}
