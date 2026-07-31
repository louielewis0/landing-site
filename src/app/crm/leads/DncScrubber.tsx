"use client";

import { useState } from "react";
import { AlertCircle, TriangleAlert } from "lucide-react";
import { usePasscode } from "../gate";
import { apiFetch } from "../_lib/api-client";

/**
 * DNC scrubber. Lifted from legacy /dashboard/dashboard.tsx,
 * restyled for the v11 shell. Same backend route
 * (POST /api/dashboard/scrub) and same response shape — no
 * server change.
 *
 * The legacy compliance reminder block ("Federal DNC scrub alone
 * is not enough. Cell phones cannot be autodialed under TCPA…")
 * moves alongside the scrubber here since the two are
 * conceptually paired — paste the list AND read the reminder
 * before you actually call anyone.
 *
 * On scrub success, parent (LeadsTableClient) is notified via
 * onScrubbed(blockedIds, clearedIds) so it can merge the
 * affected rows into its local leads array. The legacy code
 * mutated leads inside this component; lifting that to the
 * parent keeps the data flow one-way (Lead state owned at the
 * top of the page, mutations bubble up).
 */
export type ScrubReport = {
  pasted: number;
  checked: number;
  blocked: number;
  cleared: number;
  skipped: number;
};

export default function DncScrubber({
  onScrubbed,
}: {
  onScrubbed: (blockedIds: string[], clearedIds: string[]) => void;
}) {
  const passcode = usePasscode();
  const [input, setInput] = useState("");
  const [scrubbing, setScrubbing] = useState(false);
  const [report, setReport] = useState<ScrubReport | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function runScrub() {
    setScrubbing(true);
    setErr(null);
    setReport(null);
    try {
      const data = await apiFetch<{
        report: ScrubReport;
        blockedIds: string[];
        clearedIds: string[];
      }>(passcode, "/scrub", {
        method: "POST",
        body: JSON.stringify({ pastedNumbers: input }),
      });
      setReport(data.report);
      onScrubbed(data.blockedIds, data.clearedIds);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Scrub failed");
    } finally {
      setScrubbing(false);
    }
  }

  return (
    <>
      {/* Compliance reminder — paired with the scrubber */}
      <div className="rounded-2xl bg-white/[0.03] border border-[var(--gold)]/25 p-6 mb-6 relative overflow-hidden">
        <span className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/60 to-transparent" />
        <div className="flex gap-4">
          <TriangleAlert
            className="w-5 h-5 text-[var(--gold-soft)] flex-shrink-0 mt-0.5"
            strokeWidth={1.5}
          />
          <div className="text-[13.5px] text-white/75 font-light leading-relaxed">
            <span className="text-white/90 font-medium">Compliance reminder.</span>{" "}
            Federal DNC scrub alone is not enough. Cell phones cannot be
            autodialed under TCPA even when DNC-clear —{" "}
            <span className="text-[var(--gold-soft)]">manual dial only</span>.
            Maintain consent records for any lead you contact.
          </div>
        </div>
      </div>

      <section className="rounded-2xl bg-white/[0.02] border border-white/10 p-7 mb-8">
        <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
          <div>
            <p className="crm-label text-[var(--gold-soft)] mb-2">DNC scrubber</p>
            <h2 className="text-lg font-semibold text-[#191a1c] tracking-tight">
              Paste DNC list (248 / 586 / 313)
            </h2>
            <p className="text-[13px] text-white/55 mt-2 font-light max-w-2xl">
              Paste numbers from the federal DNC registry download. We strip
              formatting and match by 10-digit number. Matches get flagged{" "}
              <span className="text-[#FDA4AF]">DO NOT CALL</span>; everything else
              is marked{" "}
              <span className="text-[var(--gold-soft)]">clear to call</span>.
            </p>
          </div>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Paste numbers, one per line or comma-separated. Any format works:\n2485551234\n(586) 555-9876\n+1 313 555 4242`}
          rows={6}
          className="w-full px-4 py-3.5 rounded-lg bg-white/[0.04] border border-white/15 text-white/90 placeholder-white/30 font-mono text-[13px] focus:outline-none focus:border-[var(--gold)]/60 focus:bg-white/[0.07] resize-y transition-all"
        />

        <div className="flex flex-wrap items-center gap-3 mt-4">
          <button
            onClick={runScrub}
            disabled={scrubbing || !input.trim()}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-[#0A0B0F] font-semibold text-[13px] tracking-wide transition-all duration-500 disabled:opacity-50"
          >
            {scrubbing ? "Scrubbing…" : "Run DNC scrub"}
          </button>
          <button
            onClick={() => {
              setInput("");
              setReport(null);
              setErr(null);
            }}
            className="text-[12px] text-white/45 hover:text-white/70 transition-colors tracking-wide"
          >
            Clear
          </button>
        </div>

        {err && (
          <div className="mt-4 text-[13px] text-[#FDA4AF] flex items-center gap-2">
            <AlertCircle className="w-4 h-4" strokeWidth={1.75} />
            {err}
          </div>
        )}

        {report && (
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-5 gap-3">
            <ReportTile label="Pasted #s" value={report.pasted} />
            <ReportTile label="Checked" value={report.checked} />
            <ReportTile label="Blocked (DNC)" value={report.blocked} danger />
            <ReportTile label="Cleared" value={report.cleared} accent />
            <ReportTile
              label="Skipped (no phone)"
              value={report.skipped}
            />
          </div>
        )}
      </section>
    </>
  );
}

function ReportTile({
  label,
  value,
  accent,
  danger,
}: {
  label: string;
  value: number;
  accent?: boolean;
  danger?: boolean;
}) {
  const valueColor = danger
    ? "text-[#FDA4AF]"
    : accent
      ? "text-[var(--gold-soft)]"
      : "text-white/90";
  return (
    <div className="rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3">
      <div className="text-[9.5px] text-white/45 uppercase tracking-[0.22em] mb-1">
        {label}
      </div>
      <div className={`crm-num text-lg font-semibold ${valueColor}`}>
        {value}
      </div>
    </div>
  );
}
