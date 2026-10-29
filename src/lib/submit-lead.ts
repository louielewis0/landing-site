/**
 * submitLead — client-side helper that posts a lead to /api/lead (admin insert
 * + in-code alert) instead of writing to Supabase directly with the anon key.
 *
 * Returns the same `{ error }` shape the old `supabase.from("leads").insert()`
 * call returned, so form components only swap the call, not their error
 * handling: `const { error } = await submitLead({ ... })`.
 */
export async function submitLead(
  payload: Record<string, unknown>
): Promise<{ error: { message: string } | null }> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      return { error: { message: data.error || "Something went wrong." } };
    }
    return { error: null };
  } catch (e) {
    return {
      error: { message: e instanceof Error ? e.message : "Network error." },
    };
  }
}
