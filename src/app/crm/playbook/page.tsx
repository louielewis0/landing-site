import type { Metadata } from "next";
import PlaybookClient from "./PlaybookClient";

export const metadata: Metadata = { title: "Playbook" };

export default function CrmPlaybookPage() {
  return (
    <>
      <h1 style={{ margin: "0 0 6px", fontFamily: "var(--font-grotesk), 'Space Grotesk', sans-serif", fontWeight: 300, fontSize: 40, letterSpacing: "-0.025em", color: "#191a1c" }}>
        Your 90-day playbook.
      </h1>
      <p className="text-white/55 text-[14px] mb-8 max-w-2xl leading-relaxed">
        Daily homework distilled from the Tommy Mello corpus, filtered for a
        solo, no-budget, zero-lead operator. Free + in-person beats paid at
        your stage. Check tasks off; the page remembers.
      </p>
      <PlaybookClient />
    </>
  );
}
