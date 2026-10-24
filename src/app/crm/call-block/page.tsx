import type { Metadata } from "next";
import CallBlockClient from "./CallBlockClient";

export const metadata: Metadata = { title: "Call Block" };

export default function CrmCallBlockPage() {
  return (
    <>
      <h1
        style={{
          margin: "0 0 6px",
          fontFamily: "var(--font-display), 'Cormorant Garamond', Georgia, serif",
          fontWeight: 500,
          fontSize: 44,
          letterSpacing: "-0.01em",
          color: "var(--crm-ink)",
        }}
      >
        Morning call block
      </h1>
      <p style={{ fontSize: 14, color: "var(--crm-ink-faint)", margin: "0 0 24px", maxWidth: 600 }}>
        One lead at a time. Tap to call, log the outcome in a tap, and the next one&rsquo;s up.
        Work it 8&ndash;11 and let the numbers build &mdash; roughly 25 conversations earns an appointment.
      </p>
      <CallBlockClient />
    </>
  );
}
