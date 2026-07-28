"use client";

import { useEffect, useState } from "react";

/**
 * Always-editable field primitive for the lead-detail drawer.
 * Notion-style "the value IS the input" — no view/edit toggle.
 * Saves on blur if the value changed; ESC reverts and blurs.
 *
 * Label sits in a 110px gutter so multiple fields stack on a
 * consistent column edge. `multiline` swaps the underlying
 * <input> for a <textarea>. `type` covers text / email / tel /
 * date / number (with sensible defaults).
 *
 * Empty string saves as null so the database stores NULL on
 * clear — the PATCH route accepts string|boolean|null and the
 * leads columns are nullable for everything the drawer edits.
 * Exception: NOT-NULL columns (name, status, priority) bounce
 * off Postgres and surface the constraint error to the caller's
 * onError handler.
 */
export default function EditableField({
  label,
  value,
  onSave,
  placeholder,
  multiline,
  type = "text",
  saveOnEmptyAs = null,
  onError,
}: {
  label: string;
  value: string;
  onSave: (next: string | null) => void | Promise<void>;
  placeholder?: string;
  multiline?: boolean;
  type?: "text" | "email" | "tel" | "date" | "number";
  /** What to send when the cleared field is saved. Defaults to null
   *  (DB stores NULL). Pass "" for fields that must stay non-null
   *  but accept an empty string. */
  saveOnEmptyAs?: string | null;
  onError?: (message: string) => void;
}) {
  const [local, setLocal] = useState(value);

  useEffect(() => {
    setLocal(value);
  }, [value]);

  async function commit() {
    if (local === value) return;
    try {
      const out =
        local.trim() === "" ? saveOnEmptyAs : local;
      await onSave(out);
    } catch (e) {
      setLocal(value);
      onError?.(e instanceof Error ? e.message : String(e));
    }
  }

  const sharedClass =
    "w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/15 text-white/90 text-[13.5px] placeholder-white/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-white/[0.07] transition-all";

  return (
    <div className="grid grid-cols-[110px_1fr] gap-3 py-1.5 items-start">
      <label className="text-[11px] text-white/45 uppercase tracking-[0.18em] pt-2.5">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setLocal(value);
              (e.target as HTMLTextAreaElement).blur();
            }
          }}
          placeholder={placeholder}
          rows={3}
          className={`${sharedClass} resize-y`}
        />
      ) : (
        <input
          type={type}
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setLocal(value);
              (e.target as HTMLInputElement).blur();
            }
            if (e.key === "Enter" && type !== "number") {
              (e.target as HTMLInputElement).blur();
            }
          }}
          placeholder={placeholder}
          className={sharedClass}
        />
      )}
    </div>
  );
}
