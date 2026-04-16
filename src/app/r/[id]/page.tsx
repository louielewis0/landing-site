"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { generateReviewOptions } from "@/lib/review-generator";
import { company } from "@/lib/config";
import {
  Star,
  Copy,
  Check,
  ExternalLink,
  Phone,
  MessageSquare,
  RefreshCw,
} from "lucide-react";
import Image from "next/image";

const GOOGLE_REVIEW_URL = "https://g.page/r/CedXUjtrh5QfEBM/review";

type ReviewRequest = {
  id: string;
  name: string;
  service_type: string;
  service_area: string;
  status: string;
  rating: number | null;
};

export default function ClientReviewPage() {
  const params = useParams();
  const id = params.id as string;

  const [req, setReq] = useState<ReviewRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [step, setStep] = useState<"rate" | "five-star" | "feedback" | "done">("rate");
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviews, setReviews] = useState<string[]>([]);
  const [selectedReview, setSelectedReview] = useState(0);
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("review_requests")
        .select("id, name, service_type, service_area, status, rating")
        .eq("id", id)
        .single();

      if (error || !data) {
        setNotFound(true);
      } else {
        setReq(data);
        if (data.status === "completed" || data.status === "feedback") {
          setStep("done");
        }
      }
      setLoading(false);
    }
    load();
  }, [id]);

  async function handleRating(rating: number) {
    if (!req) return;
    setSelectedRating(rating);

    await supabase
      .from("review_requests")
      .update({ rating, status: rating === 5 ? "completed" : "feedback" })
      .eq("id", req.id);

    if (rating === 5) {
      const options = generateReviewOptions({
        name: req.name,
        serviceType: req.service_type,
        serviceArea: req.service_area,
      });
      setReviews(options);
      setStep("five-star");
    } else {
      setStep("feedback");
    }
  }

  function regenerate() {
    if (!req) return;
    const options = generateReviewOptions({
      name: req.name,
      serviceType: req.service_type,
      serviceArea: req.service_area,
    });
    setReviews(options);
    setSelectedReview(0);
  }

  async function copyReview() {
    await navigator.clipboard.writeText(reviews[selectedReview]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function submitFeedback() {
    if (!req || !feedback.trim()) return;
    setSubmitting(true);
    await supabase
      .from("review_requests")
      .update({ feedback, status: "feedback" })
      .eq("id", req.id);
    setStep("done");
    setSubmitting(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A1429] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-[#0A1429] flex items-center justify-center px-6">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-2">Link not found</h1>
          <p className="text-white/50">This review link may have expired or is invalid.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1429] noise relative overflow-hidden">
      <div className="absolute inset-0 glow-orange opacity-40" />
      <div className="absolute inset-0 grid-overlay" />

      <div className="relative flex items-center justify-center min-h-screen px-6 py-16">
        <div className="w-full max-w-lg">
          {/* Logo */}
          <div className="flex justify-center mb-10">
            <div className="bg-white/95 rounded-2xl p-2">
              <Image
                src="/logo.png"
                alt={company.name}
                width={60}
                height={60}
                className="w-14 h-14 object-contain"
              />
            </div>
          </div>

          {/* Step: Rate */}
          {step === "rate" && (
            <div className="text-center text-white">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                Hi {req?.name?.split(" ")[0]},
              </h1>
              <p className="text-lg text-white/65 mb-10 leading-relaxed">
                How was your experience with {company.name}?
              </p>

              <div className="flex justify-center gap-3 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    onClick={() => handleRating(star)}
                    className="transition-transform hover:scale-110 active:scale-95"
                  >
                    <Star
                      className={`w-14 h-14 sm:w-16 sm:h-16 transition-colors ${
                        star <= (hoveredStar || selectedRating)
                          ? "text-orange-400"
                          : "text-white/15"
                      }`}
                      fill={star <= (hoveredStar || selectedRating) ? "currentColor" : "none"}
                      strokeWidth={1.5}
                    />
                  </button>
                ))}
              </div>

              <p className="text-sm text-white/30">
                Tap a star to rate your experience
              </p>
            </div>
          )}

          {/* Step: 5-star → AI review + Google link */}
          {step === "five-star" && (
            <div className="text-white">
              <div className="text-center mb-8">
                <div className="flex justify-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-8 h-8 text-orange-400" fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                  Thank you!
                </h2>
                <p className="text-white/60">
                  We wrote a review you can use — edit it or paste it as-is.
                </p>
              </div>

              {/* Review options */}
              <div className="space-y-3 mb-6">
                {reviews.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedReview(i)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all ${
                      selectedReview === i
                        ? "bg-white/[0.06] border-orange-400/50 shadow-[0_0_30px_-10px_rgba(249,115,22,0.3)]"
                        : "bg-white/[0.02] border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                          selectedReview === i
                            ? "border-orange-400 bg-orange-400"
                            : "border-white/30"
                        }`}
                      >
                        {selectedReview === i && (
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        )}
                      </div>
                      <p className="text-[15px] text-white/80 leading-relaxed">{r}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Regenerate */}
              <button
                onClick={regenerate}
                className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mx-auto mb-8"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Generate new options
              </button>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={copyReview}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-base transition-all ${
                    copied
                      ? "bg-green-500 text-white"
                      : "bg-white text-slate-900 hover:bg-white/90"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5" />
                      Copied to clipboard!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      Copy Review Text
                    </>
                  )}
                </button>

                <a
                  href={GOOGLE_REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-semibold text-base shadow-[0_12px_40px_-12px_rgba(249,115,22,0.6)] transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <MessageSquare className="w-5 h-5" />
                  Paste on Google
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <p className="text-xs text-white/30 text-center mt-6">
                Step 1: Copy the review. Step 2: Click "Paste on Google" → paste it in.
              </p>
            </div>
          )}

          {/* Step: 1-4 stars → private feedback */}
          {step === "feedback" && (
            <div className="text-white text-center">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                We appreciate your honesty.
              </h2>
              <p className="text-white/60 mb-8">
                We'd love to know how we can improve. This goes directly to our
                team — it won't be posted publicly.
              </p>

              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="What could we have done better?"
                rows={4}
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-orange-400 resize-none transition-all"
              />

              <button
                onClick={submitFeedback}
                disabled={submitting || !feedback.trim()}
                className="mt-4 w-full px-6 py-4 rounded-xl bg-white text-slate-900 font-semibold transition-all disabled:opacity-50"
              >
                {submitting ? "Sending…" : "Send Private Feedback"}
              </button>

              <p className="text-xs text-white/30 mt-4">
                100% private. A team member will follow up personally.
              </p>
            </div>
          )}

          {/* Step: Done */}
          {step === "done" && (
            <div className="text-center text-white">
              <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8" strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                Thank you, {req?.name?.split(" ")[0]}.
              </h2>
              <p className="text-white/60 mb-8">
                Your response has been received. We truly appreciate you taking
                the time.
              </p>
              <a
                href={`tel:${company.phoneTel}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/15 text-white font-semibold hover:bg-white/15 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call {company.phone}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
