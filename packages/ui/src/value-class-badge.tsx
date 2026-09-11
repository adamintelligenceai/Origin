export type ValueClass =
  | 'DETECTED_LEAKAGE'
  | 'POLICY_LEAKAGE'
  | 'MODELLED_MARGIN_OPPORTUNITY'
  | 'CASH_ENTITLEMENT'
  | 'OPPORTUNITY'
  | 'INSIGHT'
  | 'OVERLAY'
  | 'BILLING_RISK';

const LABELS: Record<ValueClass, string> = {
  DETECTED_LEAKAGE: 'Detected leakage',
  POLICY_LEAKAGE: 'Policy leakage',
  MODELLED_MARGIN_OPPORTUNITY: 'Modelled margin opportunity',
  CASH_ENTITLEMENT: 'Cash entitlement',
  OPPORTUNITY: 'Opportunity',
  INSIGHT: 'Insight',
  OVERLAY: 'Overlay',
  BILLING_RISK: 'Billing risk',
};

export function ValueClassBadge({ valueClass }: { valueClass: ValueClass }) {
  const isDetected =
    valueClass === 'DETECTED_LEAKAGE' || valueClass === 'POLICY_LEAKAGE';
  const isModelled = valueClass === 'MODELLED_MARGIN_OPPORTUNITY';
  const style = isDetected
    ? { background: 'var(--red-ink)', color: 'var(--folio)' }
    : isModelled
      ? {
          border: '1px dashed var(--red-ink)',
          color: 'var(--red-ink)',
          background: 'transparent',
        }
      : {
          border: '1px solid var(--ruling)',
          color: 'var(--ink-2)',
          background: 'var(--folio)',
        };

  return (
    <span
      className="inline-flex px-2 py-0.5 text-xs font-medium"
      style={{ ...style, borderRadius: 'var(--radius-sm)' }}
    >
      {LABELS[valueClass]}
    </span>
  );
}
