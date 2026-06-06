import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { checkDashboardAuth } from "@/lib/dashboard-auth";

/**
 * POST   /api/dashboard/playbook/completion  → mark a task complete
 * DELETE /api/dashboard/playbook/completion  → unmark a task
 *
 * Body for both: { task_id: string }
 *
 * UPSERT semantics on the POST — re-checking an already-checked task
 * is a no-op (task_id is UNIQUE). DELETE removes the row entirely so
 * an unchecked task vanishes from the streak/progress totals.
 */

type Body = { task_id?: unknown };

async function readTaskId(req: NextRequest): Promise<string | null> {
  const body = (await req.json().catch(() => ({}))) as Body;
  if (typeof body.task_id !== "string" || !body.task_id.trim()) return null;
  return body.task_id.trim();
}

export async function POST(req: NextRequest) {
  if (!checkDashboardAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const taskId = await readTaskId(req);
  if (!taskId) {
    return NextResponse.json(
      { error: "task_id is required" },
      { status: 400 },
    );
  }

  const sb = getSupabaseAdmin();
  // UPSERT on the UNIQUE task_id — duplicate POSTs are idempotent.
  const { data, error } = await sb
    .from("playbook_completions")
    .upsert(
      { task_id: taskId, completed_at: new Date().toISOString() },
      { onConflict: "task_id", ignoreDuplicates: false },
    )
    .select("id, task_id, completed_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ completion: data }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  if (!checkDashboardAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const taskId = await readTaskId(req);
  if (!taskId) {
    return NextResponse.json(
      { error: "task_id is required" },
      { status: 400 },
    );
  }

  const sb = getSupabaseAdmin();
  const { error } = await sb
    .from("playbook_completions")
    .delete()
    .eq("task_id", taskId);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
