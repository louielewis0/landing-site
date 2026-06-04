/**
 * Shared empty / no-results panel for /crm surfaces. Used by the
 * leads table (2D) when filters return nothing, the activity
 * feed (2B / 2E) when there's nothing to show, and any other
 * "nothing here yet" terminal state. Brand-token only; no new
 * hues introduced.
 *
 * Icon + title + optional description + optional action. Icon
 * lives in a small gold-tinted disc that echoes the gate's lock
 * affordance — same visual vocabulary, different message.
 */
export default function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-bone/10 bg-bone/[0.02] py-16 px-8 text-center">
      {icon && (
        <div className="w-12 h-12 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/5 flex items-center justify-center mx-auto mb-5 text-[var(--gold-soft)]">
          {icon}
        </div>
      )}
      <p className="font-display text-2xl font-light text-bone mb-2">{title}</p>
      {description && (
        <p className="text-bone/55 text-[14px] max-w-md mx-auto mb-6 font-light">
          {description}
        </p>
      )}
      {action && (
        <div className="flex items-center justify-center">{action}</div>
      )}
    </div>
  );
}
