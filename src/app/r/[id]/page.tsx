"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { generateReviewOptions } from "@/lib/review-generator";
import { company } from "@/lib/config";
import { fraunces, inter, manrope, grotesk } from "@/lib/site-fonts";
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
      <div className="min-h-screen bg-[#f2efe9] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#E4501E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className={`site-theme ${fraunces.variable} ${inter.variable} ${manrope.variable} ${grotesk.variable}`}>
        <div className="min-h-screen bg-cream flex items-center justify-center px-6">
          <div className="text-center" style={{ color: "var(--s-ink)" }}>
            <h1 style={{ fontSize: 26, marginBottom: 8 }}>Link not found</h1>
            <p style={{ color: "var(--s-muted)" }}>This review link may have expired or is invalid.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`site-theme ${fraunces.variable} ${inter.variable} ${manrope.variable} ${grotesk.variable}`}>
    <div className="min-h-screen bg-cream relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(228,80,30,0.08), transparent 60%)",
        }}
      />

      <div className="relative flex items-center justify-center min-h-screen px-6 py-16">
        <div className="w-full max-w-lg">
          {/* Logo */}
          <div className="flex justify-center mb-10">
            <div className="bg-white rounded-2xl p-2" style={{ border: "1px solid var(--line)", boxShadow: "0 10px 30px -12px rgba(25,26,28,0.15)" }}>
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
            <div className="text-center" style={{ color: "var(--s-ink)" }}>
              <h1 style={{ fontSize: "clamp(30px, 5vw, 40px)", lineHeight: 1.15, marginBottom: 12 }}>
                Hi {req?.name?.split(" ")[0]},
              </h1>
              <p style={{ fontSize: 17, color: "var(--s-muted)", marginBottom: 40, lineHeight: 1.6 }}>
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
                      className="w-14 h-14 sm:w-16 sm:h-16 transition-colors"
                      style={{
                        color:
                          star <= (hoveredStar || selectedRating)
                            ? "var(--s-gold)"
                            : "rgba(25,26,28,0.15)",
                      }}
                      fill={star <= (hoveredStar || selectedRating) ? "currentColor" : "none"}
                      strokeWidth={1.5}
                    />
                  </button>
                ))}
              </div>

              <p style={{ fontSize: 13, color: "var(--s-muted)" }}>
                Tap a star to rate your experience
              </p>
            </div>
          )}

          {/* Step: 5-star → AI review + Google link */}
          {step === "five-star" && (
            <div style={{ color: "var(--s-ink)" }}>
              <div className="text-center mb-8">
                <div className="flex justify-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-8 h-8" style={{ color: "var(--s-gold)" }} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)", marginBottom: 8 }}>
                  Thank you!
                </h2>
                <p style={{ color: "var(--s-muted)" }}>
                  We wrote a review you can use — edit it or paste it as-is.
                </p>
              </div>

              {/* Review options */}
              <div className="space-y-3 mb-6">
                {reviews.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedReview(i)}
                    className="w-full text-left p-5 rounded-2xl transition-all"
                    style={{
                      background: "#fff",
                      border:
                        selectedReview === i
                          ? "1px solid rgba(228,80,30,0.55)"
                          : "1px solid var(--line)",
                      boxShadow:
                        selectedReview === i
                          ? "0 12px 34px -14px rgba(228,80,30,0.35)"
                          : "0 6px 20px -14px rgba(25,26,28,0.12)",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors"
                        style={{
                          border:
                            selectedReview === i
                              ? "2px solid var(--s-gold)"
                              : "2px solid rgba(25,26,28,0.3)",
                          background: selectedReview === i ? "var(--s-gold)" : "transparent",
                        }}
                      >
                        {selectedReview === i && (
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        )}
                      </div>
                      <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--s-ink)" }}>{r}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Regenerate */}
              <button
                onClick={regenerate}
                className="flex items-center gap-2 mx-auto mb-8 transition-colors"
                style={{ fontSize: 13, color: "var(--s-muted)" }}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Generate new options
              </button>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={copyReview}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-base transition-all"
                  style={
                    copied
                      ? { background: "#2f9e63", color: "#fff" }
                      : { background: "var(--navy)", color: "#fff" }
                  }
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
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-base transition-all hover:scale-[1.01] active:scale-[0.99]"
                  style={{
                    background: "var(--s-gold)",
                    color: "#fff",
                    boxShadow: "0 12px 40px -12px rgba(228,80,30,0.55)",
                  }}
                >
                  <MessageSquare className="w-5 h-5" />
                  Paste on Google
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <p className="text-center mt-6" style={{ fontSize: 12, color: "var(--s-muted)" }}>
                Step 1: Copy the review. Step 2: Click "Paste on Google" → paste it in.
              </p>
            </div>
          )}

          {/* Step: 1-4 stars → private feedback */}
          {step === "feedback" && (
            <div className="text-center" style={{ color: "var(--s-ink)" }}>
              <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)", marginBottom: 12 }}>
                We appreciate your honesty.
              </h2>
              <p style={{ color: "var(--s-muted)", marginBottom: 32 }}>
                We'd love to know how we can improve. This goes directly to our
                team — it won't be posted publicly.
              </p>

              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="What could we have done better?"
                rows={4}
                className="w-full px-5 py-4 rounded-xl resize-none transition-all focus:outline-none"
                style={{
                  background: "#fff",
                  border: "1px solid var(--line)",
                  color: "var(--s-ink)",
                }}
              />

              <button
                onClick={submitFeedback}
                disabled={submitting || !feedback.trim()}
                className="mt-4 w-full px-6 py-4 rounded-xl font-semibold transition-all disabled:opacity-50"
                style={{ background: "var(--navy)", color: "#fff" }}
              >
                {submitting ? "Sending…" : "Send Private Feedback"}
              </button>

              <p className="mt-4" style={{ fontSize: 12, color: "var(--s-muted)" }}>
                100% private. A team member will follow up personally.
              </p>
            </div>
          )}

          {/* Step: Done */}
          {step === "done" && (
            <div className="text-center" style={{ color: "var(--s-ink)" }}>
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: "rgba(47,158,99,0.14)", color: "#2f9e63" }}
              >
                <Check className="w-8 h-8" strokeWidth={2.5} />
              </div>
              <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)", marginBottom: 12 }}>
                Thank you, {req?.name?.split(" ")[0]}.
              </h2>
              <p style={{ color: "var(--s-muted)", marginBottom: 32 }}>
                Your response has been received. We truly appreciate you taking
                the time.
              </p>
              <a href={`tel:${company.phoneTel}`} className="btn btn-navy">
                <Phone className="w-4 h-4" />
                Call {company.phone}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
