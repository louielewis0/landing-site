# DESIGN.md — Market Center Realty

## Color (CSS vars in globals.css)
- `--ink #0A0908` / `--ink-2 #14110D` / `--ink-3 #1C1814` — warm near-blacks (backgrounds, layered surfaces)
- `--bone #F5F1EA` — warm off-white (text; never pure #fff)
- `--gold #C8A24C` / `--gold-soft #D9B968` / `--gold-deep #9C7A2E` — accent family; primary CTAs, active states, eyebrows
- `--rust #8C4A1F` — danger/urgent (DNC, overdue, delete)
- Strategy: Restrained. Gold ≤10% of any surface; rust only for true urgency.

## Typography
- Display: `font-display` → Cormorant Garamond (serif), font-light, tight tracking. Page titles, lead names, big numbers.
- UI: Geist Sans. Sizes commonly 11–14px; eyebrows are 10–11px uppercase tracked wide (`.eyebrow` class, gold-soft).
- Hierarchy via serif-vs-sans contrast + scale, not weight stacking.

## Surfaces & elevation
- Panels: `rounded-2xl border border-bone/10 bg-bone/[0.02]` (+ backdrop-blur on overlays only).
- Hover: bg-bone/[0.03-0.06], border-bone/20-30.
- Overlays (drawer/modal): ink-2/95 + backdrop-blur, layered shadow `shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]`.
- Inputs: bg-bone/[0.04], border-bone/15, focus:border-gold/60.

## Buttons
- Primary: `rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink font-semibold text-[13px] tracking-wide`.
- Secondary: rounded-full border border-bone/15-20, text-bone/60→bone on hover.
- Destructive: rust fills or rust borders, two-tap confirm pattern.

## Motion
- Ease-out only (cubic-bezier(0.16,1,0.3,1) ≈ ease-out-expo), 200–500ms.
- Transforms + opacity only; never layout properties.
- Entrance patterns: slide+fade (drawer), stagger children 50–80ms.
- Respect prefers-reduced-motion.

## Components in play
KpiCard, StatusPill, PriorityDot, EmptyState, pill-shaped tab/filter buttons with count badges, day-grouped feeds, kanban cards with next-activity chips.
