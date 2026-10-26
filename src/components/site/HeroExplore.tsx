import { Search } from "lucide-react";
import BgVideo from "./BgVideo";

/**
 * HeroExplore — the reworked homepage hero (DOBI-inspired, dark cinematic,
 * on Real Estate Market Center's navy / cream / burnt-orange palette).
 *
 * Differences from the old TemplateHero:
 *   - No giant centered logo (the simple wordmark lives top-left in the nav).
 *   - A search bar is the centerpiece: "Start Exploring Homes that Check Every
 *     Box" → a City / Area / Region / Zip field that submits to /homes.
 *   - A heavier cinematic shade so the luxury-home footage reads as a backdrop
 *     and the headline + search stay legible (WCAG contrast on the glass input).
 *
 * The search is a plain GET <form> so it works without client JS and is
 * crawlable/shareable (/homes?location=Birmingham).
 */
export default function HeroExplore() {
  return (
    <section className="hx-hero">
      <BgVideo srcMp4="/hero-luxury.mp4" poster="/hero-luxury-poster.jpg" />
      <div className="hx-hero-shade" aria-hidden />

      <div className="hx-hero-inner">
        <div className="hx-eyebrow">Real Estate Market Center &middot; Metro Detroit</div>

        <h1 className="hx-title">
          Start exploring homes
          <br />
          that <em>check every box.</em>
        </h1>

        <form className="hx-search" action="/homes" method="get" role="search">
          <label htmlFor="hx-location" className="hx-sr-only">
            Search by city, area, region, or ZIP code
          </label>
          <Search className="hx-search-icon" width={19} height={19} aria-hidden />
          <input
            id="hx-location"
            name="location"
            type="text"
            autoComplete="off"
            placeholder="City, Area, Region or Zip Code"
            className="hx-search-input"
          />
          <button type="submit" className="hx-search-btn">
            Search
          </button>
        </form>

        <p className="hx-sub">
          Live luxury listings across Birmingham, Bloomfield Hills, Troy, Rochester
          &amp; all of Metro Detroit.
        </p>
      </div>
    </section>
  );
}
