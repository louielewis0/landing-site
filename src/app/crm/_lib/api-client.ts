"use client";

/**
 * Thin fetch wrapper for /api/dashboard/* routes. Centralizes:
 *   • passcode header injection (x-dashboard-auth)
 *   • content-type default (application/json)
 *   • error normalization (server's `error` payload string, or
 *     an "HTTP <status> <statusText>" fallback)
 *
 * Used by every new CRM data hook + form submitter under
 * /crm/*. The two existing hooks (use-leads, use-update-lead-
 * status) still inline their fetches — they pre-date this
 * wrapper and refactoring them isn't required for 2D. They can
 * migrate in a future polish pass.
 */
export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function apiFetch<T>(
  passcode: string,
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const res = await fetch(`/api/dashboard${path}`, {
    ...init,
    headers: {
      ...(init.headers ?? {}),
      "x-dashboard-auth": passcode,
      "content-type": "application/json",
    },
  });
  if (!res.ok) {
    const body = (await res
      .json()
      .catch(() => ({}) as Record<string, unknown>)) as Record<
      string,
      unknown
    >;
    const msg =
      typeof body.error === "string"
        ? body.error
        : `${res.status} ${res.statusText}`;
    throw new ApiError(msg, res.status);
  }
  return res.json() as Promise<T>;
}
