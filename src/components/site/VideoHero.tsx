"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";

/**
 * VideoHero — the opening screen: full-bleed aerial footage of a
 * lake-estate (Mixkit free commercial license, self-hosted at
 * /public/hero-video.mp4, audio stripped) with the 3D brokerage logo
 * over it.
 *
 * Accessibility (WCAG 2.2.2 Pause, Stop, Hide): the video is muted and
 * loops, so it is started programmatically rather than with the
 * `autoPlay` attribute — visitors who set "reduce motion" see the
 * poster frame held still, and everyone gets a visible pause/play
 * control.
 */
export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      v.pause();
      setPlaying(false);
      return;
    }
    v.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false)); // autoplay blocked — control still works
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="video-hero">
      <video
        ref={videoRef}
        className="video-hero-media"
        muted
        loop
        playsInline
        preload="metadata"
        poster="/hero-video-poster.jpg"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="video-hero-shade" aria-hidden />
      <div className="video-hero-logo">
        <Image
          src="/mcr-logo-color-3d.png"
          alt="Real Estate Market Center"
          width={1156}
          height={1156}
          priority
        />
      </div>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause background video" : "Play background video"}
        style={{
          position: "absolute",
          bottom: 24,
          right: 24,
          zIndex: 4,
          width: 40,
          height: 40,
          borderRadius: "50%",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0,0,0,0.45)",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.45)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          cursor: "pointer",
        }}
      >
        {playing ? (
          <Pause className="w-4 h-4" strokeWidth={2} />
        ) : (
          <Play className="w-4 h-4" strokeWidth={2} />
        )}
      </button>
      <div className="scroll-cue video-hero-cue">
        <span>Scroll</span>
        <span className="line" />
      </div>
    </section>
  );
}
