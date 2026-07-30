import Image from "next/image";

/**
 * VideoHero — the opening screen: full-bleed aerial footage of a
 * lake-estate on a wooded peninsula (Mixkit free commercial license,
 * self-hosted at /public/hero-video.mp4, trimmed to 14s, audio
 * stripped, ~2.6MB faststart) with the embossed 3D brokerage logo
 * (black background flood-filled to transparency) floating over it. Autoplay muted
 * loop with a poster frame so the first paint is instant and mobile
 * data stays sane. A soft top/bottom vignette keeps the white nav
 * and scroll cue legible over the water.
 */
export default function VideoHero() {
  return (
    <section className="video-hero">
      <video
        className="video-hero-media"
        autoPlay
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
      <a href="/home-value" className="video-hero-cta">
        <span className="cta-copy">
          <b>What&rsquo;s your home worth?</b>
          <span>Free instant estimate</span>
        </span>
        <span className="cta-arrow" aria-hidden>
          &rarr;
        </span>
      </a>
      <div className="scroll-cue video-hero-cue">
        <span>Scroll</span>
        <span className="line" />
      </div>
    </section>
  );
}
