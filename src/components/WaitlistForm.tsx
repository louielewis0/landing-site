"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const { error } = await supabase.from("waitlist").insert({ email });

    if (error) {
      setStatus("error");
      setMessage(error.code === "23505" ? "You're already on the list." : error.message);
      return;
    }

    setStatus("ok");
    setMessage("You're in. We'll be in touch.");
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-white/90 disabled:opacity-50"
      >
        {status === "loading" ? "..." : "Join waitlist"}
      </button>
      {message && (
        <p className={`sm:absolute sm:mt-16 text-sm ${status === "error" ? "text-red-300" : "text-green-300"}`}>
          {message}
        </p>
      )}
    </form>
  );
}
