/**
 * Throwaway placeholder for 2A page stubs. Each sub-phase (2B–2E)
 * deletes the corresponding usage when the real content lands.
 * Lives next to the page files so the cleanup is obvious.
 *
 * Not a route — file is `Placeholder.tsx` (capitalized, not
 * `page.tsx`), so Next.js App Router treats it as a regular
 * co-located component, not a routable segment.
 */
export default function Placeholder({
  phase,
  title,
  items,
}: {
  phase: string;
  title: string;
  items: string[];
}) {
  return (
    <div className="crm-glass rounded-2xl p-6 sm:p-8">
      <div className="flex items-baseline gap-3 mb-6">
        <span className="crm-label text-[var(--gold-soft)]">
          Coming in {phase}
        </span>
        <span className="block w-10 h-px bg-[var(--gold)]/40" />
      </div>
      <h2 className="crm-title mb-5">{title}</h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[14px] text-white/65">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
