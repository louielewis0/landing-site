"use client";

import { useEffect, useState } from "react";
import { Phone, MessageSquare, Mail, Users } from "lucide-react";
import { usePasscode } from "../gate";
import type { ActivityType } from "@/lib/activity-shape";

/**
 * DailyVitals — a "did you do the work today" scoreboard (the idea
 * borrowed from LionDesk's Vitals): calls / texts / emails logged
 * today and how many distinct leads were worked. A quiet
 * accountability counter, not a vanity metric — it resets every day.
 *
 * Fetches the global activity feed (same passcode-gated endpoint the
 * Activity page uses) and tallies today's rows client-side. Fails
 * silent: if it can't load, it simply doesn't render, so it never
 * blocks the dashboard.
 */

type Row = { type: ActivityType; created_at: string; lead_id: string };

const isToday = (iso: string) => {
  const d = new Date(iso);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
};

export default function DailyVitals() {
  const passcode = usePasscode();
  const [rows, setRows] = useState<Row[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/dashboard/activities", {
      headers: { "x-dashboard-auth": passcode },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { activities: Row[] }) => {
        if (!cancelled) setRows(d.activities ?? []);
      })
      .catch(() => {
        if (!cancelled) setRows([]);
      });
    return () => {
      cancelled = true;
    };
  }, [passcode]);

  if (rows === null) return null; // quiet until loaded

  const today = rows.filter((r) => isToday(r.created_at));
  const count = (t: ActivityType) => today.filter((r) => r.type === t).length;
  const calls = count("call");
  const texts = count("text");
  const emails = count("email");
  const worked = new Set(today.map((r) => r.lead_id)).size;

  const stats = [
    { Icon: Phone, label: "calls", value: calls },
    { Icon: MessageSquare, label: "texts", value: texts },
    { Icon: Mail, label: "emails", value: emails },
    { Icon: Users, label: "leads worked", value: worked },
  ];

  const anything = calls + texts + emails > 0;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        flexWrap: "wrap",
        padding: "12px 20px",
        borderRadius: 14,
        marginBottom: 22,
        background: "rgba(255,255,255,0.025)",
        border: "1px solid var(--crm-line)",
      }}
    >
      <span
        className="crm-eyebrow"
        style={{ marginRight: 2, letterSpacing: "0.2em" }}
      >
        Today
      </span>
      {stats.map(({ Icon, label, value }) => (
        <span
          key={label}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            fontSize: 13,
            color: "var(--crm-ink-dim)",
          }}
        >
          <Icon
            className="w-3.5 h-3.5"
            strokeWidth={1.75}
            style={{
              color: value > 0 ? "var(--crm-gold-soft)" : "var(--crm-ink-ghost)",
            }}
          />
          <b
            className="crm-num"
            style={{
              color: value > 0 ? "var(--crm-ink)" : "var(--crm-ink-faint)",
              fontWeight: 600,
            }}
          >
            {value}
          </b>
          {label}
        </span>
      ))}
      <span
        style={{
          marginLeft: "auto",
          fontSize: 12,
          color: "var(--crm-ink-faint)",
          fontStyle: "italic",
        }}
      >
        {anything ? "keep the streak going" : "no outreach logged yet today"}
      </span>
    </div>
  );
}
