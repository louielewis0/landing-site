"use client";

import { useEffect, useRef, useState } from "react";
import { company } from "@/lib/config";

/**
 * AI concierge — floating chat bubble on every public page.
 * Talks to /api/concierge (Claude + capture_lead tool). Conversation
 * persists in sessionStorage so it survives page navigation. Styles
 * are self-contained below so globals.css stays untouched.
 */

type Msg = { role: "user" | "assistant"; content: string };

const STORE_KEY = "remc-concierge";
const GREETING =
  "Hi, I'm Maya with Real Estate Market Center! Ask me anything about buying or selling in Metro Detroit, or just tell me what you're looking for.";
const CHIPS = ["I'm thinking of selling", "I'm looking to buy", "What's my home worth?"];
const MAX_USER_TURNS = 20;

export default function Concierge() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORE_KEY);
      if (saved) setMsgs(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify(msgs.slice(-40)));
    } catch {}
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [msgs, open, busy]);

  const userTurns = msgs.filter((m) => m.role === "user").length;

  async function send(text: string) {
    const clean = text.trim();
    if (!clean || busy) return;
    if (userTurns >= MAX_USER_TURNS) {
      setMsgs((m) => [
        ...m,
        { role: "user", content: clean },
        {
          role: "assistant",
          content: `Let's continue this live — call or text us at ${company.phone} and a broker will pick it up from here.`,
        },
      ]);
      setInput("");
      return;
    }
    const next: Msg[] = [...msgs, { role: "user", content: clean }];
    setMsgs(next);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/concierge", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMsgs((m) => [
        ...m,
        {
          role: "assistant",
          content:
            typeof data.reply === "string" && data.reply
              ? data.reply
              : `Something hiccuped — call us at ${company.phone} and we'll help right away.`,
        },
      ]);
    } catch {
      setMsgs((m) => [
        ...m,
        {
          role: "assistant",
          content: `Connection issue — call or text us at ${company.phone}.`,
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <style>{`
        .conc-bubble {
          position: fixed; bottom: 26px; right: 26px; z-index: 95;
          width: 56px; height: 56px; border-radius: 50%; border: none; cursor: pointer;
          background: var(--navy); color: #fff;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 16px 34px -12px rgba(22,24,29,0.5);
          transition: transform .25s, box-shadow .25s;
        }
        .conc-bubble:hover { transform: translateY(-2px); box-shadow: 0 20px 40px -12px rgba(22,24,29,0.55); }
        .conc-panel {
          position: fixed; bottom: 96px; right: 26px; z-index: 95;
          width: min(372px, calc(100vw - 32px));
          height: min(540px, calc(100dvh - 130px));
          background: var(--cream, #fafaf8); border-radius: 20px;
          border: 1px solid var(--line, #e7e4dd);
          box-shadow: 0 30px 70px -20px rgba(22,24,29,0.35);
          display: flex; flex-direction: column; overflow: hidden;
          animation: concIn .28s cubic-bezier(.22,1,.36,1);
        }
        @keyframes concIn { from { opacity: 0; transform: translateY(14px) scale(.98); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .conc-panel { animation: none; } }
        .conc-head {
          background: var(--navy); color: #fff; padding: 14px 18px;
          display: flex; align-items: center; gap: 12px;
        }
        .conc-avatar {
          width: 42px; height: 42px; border-radius: 50%; object-fit: cover;
          border: 2px solid rgba(255,255,255,0.35); flex-shrink: 0;
        }
        .conc-head .avatar-wrap { position: relative; flex-shrink: 0; }
        .conc-head .dot {
          position: absolute; bottom: 1px; right: 1px;
          width: 10px; height: 10px; border-radius: 50%; background: #6fcf85;
          border: 2px solid var(--navy);
        }
        .conc-msg-row { display: flex; gap: 8px; align-items: flex-end; }
        .conc-msg-row .mini-avatar {
          width: 26px; height: 26px; border-radius: 50%; object-fit: cover; flex-shrink: 0;
        }
        .conc-head b { font-size: 14.5px; font-weight: 600; letter-spacing: .01em; }
        .conc-head span { display: block; font-size: 12px; opacity: .65; margin-top: 1px; }
        .conc-head button {
          margin-left: auto; background: none; border: none; color: #fff;
          opacity: .7; cursor: pointer; font-size: 20px; line-height: 1; padding: 4px;
        }
        .conc-head button:hover { opacity: 1; }
        .conc-body { flex: 1; overflow-y: auto; padding: 18px 16px; display: flex; flex-direction: column; gap: 10px; }
        .conc-msg {
          max-width: 85%; padding: 11px 14px; border-radius: 16px;
          font-size: 14px; line-height: 1.55; white-space: pre-wrap; overflow-wrap: break-word;
        }
        .conc-msg.a { background: #fff; border: 1px solid var(--line, #e7e4dd); color: var(--s-ink, #23262d); align-self: flex-start; border-bottom-left-radius: 6px; }
        .conc-msg.u { background: var(--navy); color: #fff; align-self: flex-end; border-bottom-right-radius: 6px; }
        .conc-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .conc-chips button {
          border: 1px solid var(--s-gold, #d9762f); color: var(--s-gold, #d9762f);
          background: none; border-radius: 100px; padding: 8px 14px; font-size: 13px;
          cursor: pointer; font-family: inherit; transition: background .2s, color .2s;
        }
        .conc-chips button:hover { background: var(--s-gold, #d9762f); color: #fff; }
        .conc-typing { display: inline-flex; gap: 4px; padding: 13px 14px; }
        .conc-typing i { width: 6px; height: 6px; border-radius: 50%; background: var(--s-muted, #757a83); animation: concB 1.1s infinite; }
        .conc-typing i:nth-child(2) { animation-delay: .15s; }
        .conc-typing i:nth-child(3) { animation-delay: .3s; }
        @keyframes concB { 0%, 60%, 100% { opacity: .3; } 30% { opacity: 1; } }
        .conc-foot { display: flex; gap: 8px; padding: 12px; border-top: 1px solid var(--line, #e7e4dd); background: #fff; }
        .conc-foot input {
          flex: 1; border: 1px solid var(--line, #e7e4dd); border-radius: 100px;
          padding: 11px 16px; font-size: 14px; font-family: inherit;
          background: var(--cream, #fafaf8); color: var(--s-ink, #23262d); outline: none;
        }
        .conc-foot input:focus { border-color: var(--s-gold, #d9762f); }
        .conc-foot button {
          width: 42px; height: 42px; border-radius: 50%; border: none; cursor: pointer;
          background: var(--s-gold, #d9762f); color: #fff; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .conc-foot button:disabled { opacity: .45; cursor: default; }
        .conc-note { font-size: 11px; color: var(--s-muted, #757a83); text-align: center; padding: 0 12px 10px; background: #fff; }
        @media (max-width: 560px) { .conc-panel { right: 16px; bottom: 90px; } .conc-bubble { bottom: 20px; right: 20px; } }
      `}</style>

      {open && (
        <div className="conc-panel" role="dialog" aria-label="Chat with our concierge">
          <div className="conc-head">
            <span className="avatar-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="conc-avatar" src="/concierge-avatar.jpg" alt="Maya" />
              <span className="dot" aria-hidden />
            </span>
            <div>
              <b>Maya</b>
              <span>Real Estate Market Center · Online</span>
            </div>
            <button aria-label="Close chat" onClick={() => setOpen(false)}>
              ×
            </button>
          </div>
          <div className="conc-body" ref={bodyRef}>
            <div className="conc-msg-row">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="mini-avatar" src="/concierge-avatar.jpg" alt="" />
              <div className="conc-msg a">{GREETING}</div>
            </div>
            {msgs.length === 0 && (
              <div className="conc-chips">
                {CHIPS.map((c) => (
                  <button key={c} onClick={() => send(c)}>
                    {c}
                  </button>
                ))}
              </div>
            )}
            {msgs.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="conc-msg u">
                  {m.content}
                </div>
              ) : (
                <div key={i} className="conc-msg-row">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="mini-avatar" src="/concierge-avatar.jpg" alt="" />
                  <div className="conc-msg a">{m.content}</div>
                </div>
              ),
            )}
            {busy && (
              <div className="conc-msg-row" aria-label="Maya is typing">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="mini-avatar" src="/concierge-avatar.jpg" alt="" />
                <div className="conc-msg a conc-typing">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            )}
          </div>
          <form
            className="conc-foot"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              maxLength={1200}
              aria-label="Your message"
            />
            <button type="submit" disabled={busy || !input.trim()} aria-label="Send">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </form>
          <div className="conc-note">Maya is our virtual assistant. A licensed broker follows up personally.</div>
        </div>
      )}

      <button
        className="conc-bubble"
        aria-label={open ? "Close chat" : "Chat with us"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        )}
      </button>
    </>
  );
}
