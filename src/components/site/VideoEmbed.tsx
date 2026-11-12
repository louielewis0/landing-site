const BASE = "https://marketcenterrealty.com";

export type VideoEmbedData = {
  /** Public path to the self-hosted mp4, e.g. "/videos/most-expensive.mp4" */
  src: string;
  /** Public path to the poster/thumbnail image, e.g. "/videos/most-expensive.png" */
  poster: string;
  title: string;
  description: string;
  uploadDate: string; // ISO date, e.g. "2026-11-11" (normalized to a full datetime w/ timezone below)
  durationISO: string; // ISO 8601, e.g. "PT1M1S"
};

/**
 * Google's VideoObject requires uploadDate to be a full ISO 8601 datetime WITH a
 * timezone. A bare "YYYY-MM-DD" triggers GSC's "missing a timezone" / "invalid
 * datetime" warnings, so pad a date-only value to noon Eastern (-05:00).
 */
function normalizeUploadDate(value: string): string {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T12:00:00-05:00` : value;
}

/**
 * Renders a self-hosted video player plus VideoObject structured data, turning
 * the host page into a proper "watch page" Google can index — so the page can
 * win a video thumbnail in search results (and the video is crawlable without
 * depending on YouTube).
 */
export default function VideoEmbed({ src, poster, title, description, uploadDate, durationISO }: VideoEmbedData) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: title,
    description,
    thumbnailUrl: [`${BASE}${poster}`],
    uploadDate: normalizeUploadDate(uploadDate),
    duration: durationISO,
    contentUrl: `${BASE}${src}`,
    publisher: {
      "@type": "Organization",
      name: "Real Estate Market Center",
      logo: { "@type": "ImageObject", url: `${BASE}/mcr-logo-color-3d.png` },
    },
  };
  return (
    <section className="bg-cream" style={{ padding: "6px 0 44px" }}>
      <div className="container" style={{ maxWidth: 860 }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <video
          controls
          preload="none"
          poster={poster}
          aria-label={title}
          style={{
            width: "100%",
            aspectRatio: "16 / 9",
            borderRadius: 16,
            border: "1px solid var(--line)",
            background: "#000",
            display: "block",
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
