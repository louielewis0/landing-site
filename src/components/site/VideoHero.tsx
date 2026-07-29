import Image from "next/image";

/**
 * VideoHero — the opening screen: full-bleed aerial footage of
 * waterfront estates (Mixkit free commercial license, self-hosted at
 * /public/hero-video.mp4, audio stripped, ~4MB faststart) with the
 * transparent-cutout brokerage logo floating over it. Autoplay muted
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
          src="/logo-transparent.png"
          alt="Real Estate Market Center"
          width={867}
          height={868}
          priority
        />
      </div>
      <div className="scroll-cue video-hero-cue">
        <span>Scroll</span>
        <span className="line" />
      </div>
    </section>
  );
}
