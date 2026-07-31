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
    <div className="crm-glass rounded-2xl py-16 px-8 text-center">
      {icon && (
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--gold)]/15 to-[#A78BFA]/10 border border-white/10 flex items-center justify-center mx-auto mb-5 text-[var(--gold-soft)]">
          {icon}
        </div>
      )}
      <p className="text-lg font-semibold text-[#191a1c] mb-2">{title}</p>
      {description && (
        <p className="text-white/55 text-[14px] max-w-md mx-auto mb-6">
          {description}
        </p>
      )}
      {action && (
        <div className="flex items-center justify-center">{action}</div>
      )}
    </div>
  );
}
