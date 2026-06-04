import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service role key.
 *
 * Bypasses RLS. Only import from route handlers (src/app/api/**) or other
 * server-only modules. `import "server-only"` will hard-error at build
 * time if anything in the client bundle pulls this in.
 *
 * The client is created lazily on first call. Build steps that import
 * a route handler module but never call it (e.g. `next build` collecting
 * page metadata) won't crash if the env var is missing on the build host.
 * The error only surfaces if a request actually tries to use the client
 * without the key present — which is the correct failure mode.
 */

let _client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (_client) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is required");
  }
  if (!serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is required for server-side admin access"
    );
  }

  _client = createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
  return _client;
}
