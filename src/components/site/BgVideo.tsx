"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * BgVideo — a muted, looping background video with an accessible
 * pause/play control (WCAG 2.2.2 Pause, Stop, Hide). It is started
 * programmatically instead of with the `autoPlay` attribute, so
 * visitors who set "reduce motion" see the poster held still. Renders
 * the <video> (so parent CSS targeting `… video` still applies) plus a
 * small floating toggle button.
 */
export default function BgVideo({
  srcMp4,
  poster,
  videoClassName,
}: {
  srcMp4: string;
  poster: string;
  videoClassName?: string;
}) {
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
      .catch(() => setPlaying(false));
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
    <>
      <video
        ref={videoRef}
        className={videoClassName}
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
      >
        <source src={srcMp4} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause background video" : "Play background video"}
        style={{
          position: "absolute",
          bottom: 24,
          right: 24,
          zIndex: 6,
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
    </>
  );
}
