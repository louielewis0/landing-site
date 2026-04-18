"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { company } from "@/lib/config";
import {
  Plus,
  Copy,
  Check,
  Star,
  Users,
  MessageSquare,
  TrendingUp,
  RefreshCw,
  ExternalLink,
  X,
} from "lucide-react";

type ReviewRequest = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  service_type: string;
  service_area: string;
  status: string;
  rating: number | null;
  feedback: string | null;
  created_at: string;
};

const SERVICE_TYPES = [
  { value: "buy", label: "Buyer" },
  { value: "sell", label: "Seller" },
  { value: "first-time", label: "First-Time Buyer" },
  { value: "invest", label: "Investor" },
  { value: "relocation", label: "Relocation" },
  { value: "other", label: "Other" },
];

const AREAS = [
  "Troy",
  "Rochester Hills",
  "Birmingham",
  "Bloomfield Hills",
  "West Bloomfield",
  "Sterling Heights",
  "Warren",
];

export default function PipelineDashboard() {
  const [requests, setRequests] = useState<ReviewRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceType, setServiceType] = useState("sell");
  const [serviceArea, setServiceArea] = useState("Troy");
  const [adding, setAdding] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("review_requests")
      .select("*")
      .order("created_at", { ascending: false });
    setRequests(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  async function addClient(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setAdding(true);
    await supabase.from("review_requests").insert({
      name: name.trim(),
      email: email.trim() || null,
      phone: phone.trim() || null,
      service_type: serviceType,
      service_area: serviceArea,
      status: "pending",
    });
    setName("");
    setEmail("");
    setPhone("");
    setShowForm(false);
    setAdding(false);
    fetchAll();
  }

  function getLink(id: string) {
    const base = typeof window !== "undefined" ? window.location.origin : "";
    return `${base}/r/${id}`;
  }

  async function copyLink(id: string) {
    await navigator.clipboard.writeText(getLink(id));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  // Stats
  const total = requests.length;
  const completed = requests.filter((r) => r.status === "completed").length;
  const fiveStars = requests.filter((r) => r.rating === 5).length;
  const feedbackCount = requests.filter((r) => r.status === "feedback").length;
  const responseRate = total > 0 ? Math.round(((completed + feedbackCount) / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#0A1429] text-white">
      {/* Top bar */}
      <div className="border-b border-white/10 bg-white/[0.02] backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Review Pipeline</h1>
            <p className="text-xs text-white/40">{company.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchAll}
              className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4 text-white/60" />
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-white font-semibold text-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Client
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Clients", value: total, Icon: Users, color: "text-white" },
            { label: "5-Star Reviews", value: fiveStars, Icon: Star, color: "text-orange-400" },
            { label: "Response Rate", value: `${responseRate}%`, Icon: TrendingUp, color: "text-emerald-400" },
            { label: "Private Feedback", value: feedbackCount, Icon: MessageSquare, color: "text-blue-400" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl p-5 bg-white/[0.03] border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                  <s.Icon className={`w-4 h-4 ${s.color}`} />
                </div>
                <span className="text-xs text-white/40 uppercase tracking-wider">{s.label}</span>
              </div>
              <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Pipeline table */}
        <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="px-5 py-4 text-xs text-white/40 uppercase tracking-wider font-medium">Client</th>
                  <th className="px-5 py-4 text-xs text-white/40 uppercase tracking-wider font-medium">Service</th>
                  <th className="px-5 py-4 text-xs text-white/40 uppercase tracking-wider font-medium">Area</th>
                  <th className="px-5 py-4 text-xs text-white/40 uppercase tracking-wider font-medium">Status</th>
                  <th className="px-5 py-4 text-xs text-white/40 uppercase tracking-wider font-medium">Rating</th>
                  <th className="px-5 py-4 text-xs text-white/40 uppercase tracking-wider font-medium">Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center text-white/30">
                      Loading…
                    </td>
                  </tr>
                ) : requests.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center text-white/30">
                      No clients yet. Click "Add Client" to start the pipeline.
                    </td>
                  </tr>
                ) : (
                  requests.map((r) => (
                    <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-medium text-white">{r.name}</div>
                        <div className="text-xs text-white/30 mt-0.5">
                          {r.phone || r.email || "—"}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-white/60">
                        {SERVICE_TYPES.find((s) => s.value === r.service_type)?.label ?? r.service_type}
                      </td>
                      <td className="px-5 py-4 text-white/60">{r.service_area}</td>
                      <td className="px-5 py-4">
                        <StatusBadge status={r.status} />
                      </td>
                      <td className="px-5 py-4">
                        {r.rating ? (
                          <div className="flex items-center gap-1">
                            {Array.from({ length: r.rating }).map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 text-orange-400" fill="currentColor" strokeWidth={0} />
                            ))}
                            {r.feedback && (
                              <span className="ml-2 text-xs text-white/30" title={r.feedback}>
                                💬
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-white/20">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => copyLink(r.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            copiedId === r.id
                              ? "bg-green-500/20 text-green-400"
                              : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {copiedId === r.id ? (
                            <>
                              <Check className="w-3 h-3" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              Copy Link
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Client Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-6">
          <form
            onSubmit={addClient}
            className="w-full max-w-md rounded-3xl bg-[#111C36] border border-white/10 p-8 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Add Client to Pipeline</h3>
              <button type="button" onClick={() => setShowForm(false)} className="p-1 rounded-lg hover:bg-white/10">
                <X className="w-5 h-5 text-white/50" />
              </button>
            </div>

            <div className="space-y-3">
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Client name *"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-orange-400"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-orange-400"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-orange-400"
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-white/40 uppercase tracking-wider mb-1 block">Service</label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full px-3 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-orange-400 appearance-none"
                  >
                    {SERVICE_TYPES.map((s) => (
                      <option key={s.value} value={s.value} className="bg-[#111C36]">
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-white/40 uppercase tracking-wider mb-1 block">Area</label>
                  <select
                    value={serviceArea}
                    onChange={(e) => setServiceArea(e.target.value)}
                    className="w-full px-3 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-orange-400 appearance-none"
                  >
                    {AREAS.map((a) => (
                      <option key={a} value={a} className="bg-[#111C36]">
                        {a}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={adding}
              className="mt-6 w-full px-6 py-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold shadow-[0_12px_40px_-12px_rgba(249,115,22,0.6)] transition-all disabled:opacity-50"
            >
              {adding ? "Adding…" : "Add to Pipeline & Generate Link"}
            </button>

            <p className="text-xs text-white/30 text-center mt-4">
              After adding, copy the review link and send it to the client via text or email.
            </p>
          </form>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-white/5 text-white/50 border-white/10",
    sent: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    completed: "bg-green-500/10 text-green-400 border-green-500/20",
    feedback: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border ${
        styles[status] ?? styles.pending
      }`}
    >
      {status === "completed" ? "5★ Posted" : status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
