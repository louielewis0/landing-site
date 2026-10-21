import type { Metadata } from "next";
import PlaybookClient from "./PlaybookClient";

export const metadata: Metadata = { title: "Playbook" };

export default function CrmPlaybookPage() {
  return (
    <>
      <h1 style={{ margin: "0 0 6px", fontFamily: "var(--font-grotesk), 'Space Grotesk', sans-serif", fontWeight: 300, fontSize: 40, letterSpacing: "-0.025em", color: "var(--crm-ink)" }}>
        Your 90-day playbook
      </h1>
      <p className="text-white/55 text-[14px] mb-8 max-w-2xl leading-relaxed">
        Daily to-dos for your first 90 days — simple, mostly-free moves that
        work when you&apos;re solo with no budget. Check each one off as you go;
        the page remembers where you are.
      </p>
      <PlaybookClient />
    </>
  );
}
