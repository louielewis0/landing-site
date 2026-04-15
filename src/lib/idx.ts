// ┌──────────────────────────────────────────────────────────────────────┐
// │  Showcase IDX integration.                                           │
// │                                                                      │
// │  SETUP (one time):                                                   │
// │  1. Subscribe at https://showcaseidx.com  (~$70/mo)                  │
// │  2. In your Showcase IDX dashboard, find your Account ID             │
// │     (Settings → Account → it's a short numeric or slug ID)           │
// │  3. Add the Account ID to your environment:                          │
// │     - Local dev:  add to .env.local                                  │
// │     - Vercel:     Settings → Environment Variables                   │
// │                                                                      │
// │     NEXT_PUBLIC_SHOWCASE_IDX_ACCOUNT_ID=your-account-id              │
// │                                                                      │
// │  4. Also update your Showcase IDX dashboard so the "Lead Routing"    │
// │     sends every lead email + form submission to:                     │
// │     realestatemarketmedia@gmail.com                                  │
// │     (Showcase IDX → Settings → Lead Capture → Routing)               │
// │                                                                      │
// │  Once configured, the IDX script loads globally and every widget     │
// │  (Search, Hotsheet, Featured, Map) renders real MLS data.            │
// └──────────────────────────────────────────────────────────────────────┘

export const idx = {
  /** Showcase IDX account ID — set via NEXT_PUBLIC_SHOWCASE_IDX_ACCOUNT_ID. */
  accountId: process.env.NEXT_PUBLIC_SHOWCASE_IDX_ACCOUNT_ID ?? "",

  /** Whether IDX is configured and should render widgets. */
  get enabled() {
    return this.accountId.length > 0;
  },

  /** Showcase IDX CDN script URL. */
  scriptSrc: "https://cdn.showcaseidx.com/plugin/showcaseidx-plugin.js",

  /**
   * Default Metro Detroit filter applied to all widgets.
   * Adjust to your MLS's exact city / county names if different.
   */
  defaultSearch: {
    cities: [
      "Troy",
      "Rochester Hills",
      "Birmingham",
      "Bloomfield Hills",
      "Sterling Heights",
      "Royal Oak",
      "Detroit",
      "Warren",
      "Farmington Hills",
    ],
    state: "MI",
  },
} as const;
