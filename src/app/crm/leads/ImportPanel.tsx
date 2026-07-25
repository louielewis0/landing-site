"use client";

import { useRef, useState } from "react";
import { AlertCircle, FileUp } from "lucide-react";
import { usePasscode } from "../gate";
import { apiFetch } from "../_lib/api-client";
import type { Lead } from "@/lib/lead-shape";

/**
 * Matrix CSV importer. Companion card to DncScrubber — same visual
 * shell, same data flow: mutation happens server-side
 * (POST /api/dashboard/import), the inserted rows come back in the
 * response, and the parent (LeadsTableClient) prepends them into
 * its local leads mirror via onImported.
 *
 * Accepts either a pasted export or a picked .csv file (FileReader
 * → same textarea, so the user can eyeball what's about to import
 * either way). Dedupe lives server-side, so re-importing the same
 * file is harmless — rows report as duplicates instead of doubling.
 */
export type ImportReport = {
  rows: number;
  imported: number;
  updated?: number;
  duplicates: number;
  invalid: number;
};

export default function ImportPanel({
  onImported,
  onUpdated,
}: {
  onImported: (leads: Lead[]) => void;
  onUpdated: (leads: Lead[]) => void;
}) {
  const passcode = usePasscode();
  const fileRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [report, setReport] = useState<ImportReport | null>(null);
  const [err, setErr] = useState<string | null>(null);

  function pickFile(f: File | undefined) {
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      setInput(typeof reader.result === "string" ? reader.result : "");
      setFileName(f.name);
      setReport(null);
      setErr(null);
    };
    reader.readAsText(f);
  }

  async function runImport() {
    setImporting(true);
    setErr(null);
    setReport(null);
    try {
      const data = await apiFetch<{
        report: ImportReport;
        leads: Lead[];
        updatedLeads?: Lead[];
      }>(passcode, "/import", {
        method: "POST",
        body: JSON.stringify({ csv: input }),
      });
      setReport(data.report);
      if (data.leads.length) onImported(data.leads);
      if (data.updatedLeads?.length) onUpdated(data.updatedLeads);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Import failed");
    } finally {
      setImporting(false);
    }
  }

  return (
    <section className="rounded-2xl bg-bone/[0.02] border border-bone/10 p-7 mb-6">
      <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
        <div>
          <p className="eyebrow mb-2">Matrix import</p>
          <h2 className="font-display text-2xl font-light text-bone tracking-tight">
            Import expireds from an MLS export
          </h2>
          <p className="text-[13px] text-bone/55 mt-2 font-light max-w-2xl">
            Paste (or pick) a Matrix export <em>or</em> a skip-trace results
            file. New addresses become{" "}
            <span className="text-[var(--gold-soft)]">source: Expired</span>{" "}
            seller leads due today. Rows matching an existing lead fill in
            its missing <span className="text-[var(--gold-soft)]">phone</span>{" "}
            and owner name instead of duplicating — so BatchSkipTracing
            results drop straight in. Re-running any file is safe.
          </p>
        </div>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-bone/20 hover:border-[var(--gold)]/60 text-bone/80 hover:text-bone text-[13px] tracking-wide transition-all"
        >
          <FileUp className="w-4 h-4" strokeWidth={1.75} />
          {fileName ?? "Pick .csv file"}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".csv,.txt,.tsv"
          className="hidden"
          onChange={(e) => pickFile(e.target.files?.[0])}
        />
      </div>

      <textarea
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setFileName(null);
        }}
        placeholder={`Paste the Matrix export here (header row + listings), e.g.:\nMLS #,Stat,Ty,Address,City,County,Price,DOM\n20261049557,UWTH,RS,14027 Hobart Avenue,Warren,Macomb,"$150,000",N/23/23`}
        rows={6}
        className="w-full px-4 py-3.5 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/30 font-mono text-[13px] focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] resize-y transition-all"
      />

      <div className="flex flex-wrap items-center gap-3 mt-4">
        <button
          onClick={runImport}
          disabled={importing || !input.trim()}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink font-semibold text-[13px] tracking-wide transition-all duration-500 disabled:opacity-50"
        >
          {importing ? "Importing…" : "Import leads"}
        </button>
        <button
          onClick={() => {
            setInput("");
            setFileName(null);
            setReport(null);
            setErr(null);
            if (fileRef.current) fileRef.current.value = "";
          }}
          className="text-[12px] text-bone/45 hover:text-bone/70 transition-colors tracking-wide"
        >
          Clear
        </button>
      </div>

      {err && (
        <div className="mt-4 text-[13px] text-rust flex items-center gap-2">
          <AlertCircle className="w-4 h-4" strokeWidth={1.75} />
          {err}
        </div>
      )}

      {report && (
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-5 gap-3">
          <ImportTile label="Rows in file" value={report.rows} />
          <ImportTile label="Imported" value={report.imported} accent />
          <ImportTile label="Enriched (phone/name)" value={report.updated ?? 0} accent />
          <ImportTile label="Duplicates skipped" value={report.duplicates} />
          <ImportTile label="Invalid rows" value={report.invalid} danger />
        </div>
      )}
    </section>
  );
}

function ImportTile({
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
  return (
    <div className="rounded-xl border border-bone/10 bg-bone/[0.03] px-4 py-3">
      <div
        className={`font-display text-2xl font-light ${
          danger && value > 0
            ? "text-rust"
            : accent
              ? "text-[var(--gold-soft)]"
              : "text-bone"
        }`}
      >
        {value}
      </div>
      <div className="text-[11px] text-bone/50 tracking-wide mt-0.5">{label}</div>
    </div>
  );
}
