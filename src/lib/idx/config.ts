import "server-only";

/**
 * Realcomp RAPI (IDX / RESO Web API) configuration.
 *
 * SERVER-ONLY. The client secret must never reach the browser bundle, so
 * nothing in src/lib/idx may be imported from a client component. The
 * `import "server-only"` above hard-errors at build time if anything in the
 * client graph pulls this in.
 *
 * Values are read lazily so that build steps which import an IDX route module
 * but never call it (e.g. `next build` collecting metadata) don't crash when
 * the env vars are absent on the build host — the error only surfaces if a
 * request actually tries to talk to Realcomp without credentials present,
 * which is the correct failure mode.
 */

export interface IdxConfig {
  tokenUrl: string;
  base: string;
  audience: string;
  clientId: string;
  clientSecret: string;
}

export function getIdxConfig(): IdxConfig {
  const tokenUrl = process.env.RCAPI_TOKEN_URL;
  const base = process.env.RCAPI_BASE;
  const audience = process.env.RCAPI_AUDIENCE;
  const clientId = process.env.RCAPI_CLIENT_ID;
  const clientSecret = process.env.RCAPI_CLIENT_SECRET;

  const missing = [
    ["RCAPI_TOKEN_URL", tokenUrl],
    ["RCAPI_BASE", base],
    ["RCAPI_AUDIENCE", audience],
    ["RCAPI_CLIENT_ID", clientId],
    ["RCAPI_CLIENT_SECRET", clientSecret],
  ]
    .filter(([, v]) => !v)
    .map(([k]) => k);

  if (missing.length > 0) {
    throw new Error(
      `Realcomp IDX is not configured: missing ${missing.join(", ")}. ` +
        `Set these in Vercel → Project Settings → Environment Variables ` +
        `(server-only, never NEXT_PUBLIC_).`
    );
  }

  return {
    tokenUrl: tokenUrl!,
    base: base!.replace(/\/+$/, ""),
    audience: audience!,
    clientId: clientId!,
    clientSecret: clientSecret!,
  };
}

/** True when all RAPI env vars are present — lets callers degrade gracefully
 *  (render nothing / a placeholder) instead of throwing on an unconfigured host. */
export function isIdxConfigured(): boolean {
  return Boolean(
    process.env.RCAPI_TOKEN_URL &&
      process.env.RCAPI_BASE &&
      process.env.RCAPI_AUDIENCE &&
      process.env.RCAPI_CLIENT_ID &&
      process.env.RCAPI_CLIENT_SECRET
  );
}
