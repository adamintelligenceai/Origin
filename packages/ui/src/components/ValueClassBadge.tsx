import { cn } from '../lib/cn';

/** Mirrors @marginshield/schemas ValueClass exactly. */
export type ValueClass =
  | 'DETECTED_LEAKAGE'
  | 'POLICY_LEAKAGE'
  | 'MODELLED_MARGIN_OPPORTUNITY'
  | 'CASH_ENTITLEMENT'
  | 'OPPORTUNITY'
  | 'INSIGHT'
  | 'OVERLAY'
  | 'BILLING_RISK';

export type ValueClassBadgeProps = {
  valueClass: ValueClass;
  className?: string;
};

const META: Record<ValueClass, { label: string; className: string }> = {
  DETECTED_LEAKAGE: {
    label: 'Detected leakage',
    className: 'border-[var(--red-ink)] text-[var(--red-ink)] bg-[var(--folio)]',
  },
  POLICY_LEAKAGE: {
    label: 'Policy leakage',
    className: 'border-[var(--red-ink)] text-[var(--red-ink)] bg-[var(--folio)]',
  },
  MODELLED_MARGIN_OPPORTUNITY: {
    label: 'Modelled opportunity',
    className: 'border-[var(--modelled)] text-[var(--modelled)] bg-[var(--folio)] ms-modelled-hatch',
  },
  CASH_ENTITLEMENT: {
    label: 'Cash entitlement',
    className: 'border-[var(--bank)] text-[var(--bank)] bg-[var(--folio)]',
  },
  OPPORTUNITY: {
    label: 'Opportunity',
    className: 'border-[var(--ruling)] text-[var(--ink-2)] bg-[var(--folio)]',
  },
  INSIGHT: {
    label: 'Insight',
    className: 'border-[var(--ruling-soft)] text-[var(--ink-2)] bg-[var(--folio)]',
  },
  OVERLAY: {
    label: 'Overlay',
    className: 'border-[var(--ruling-soft)] text-[var(--ruling)] bg-[var(--folio)]',
  },
  BILLING_RISK: {
    label: 'Billing risk',
    className: 'border-[var(--manila)] text-[var(--serve)] bg-[var(--folio)]',
  },
};

export function ValueClassBadge({ valueClass, className }: ValueClassBadgeProps) {
  const meta = META[valueClass];
  return (
    <span
      className={cn(
        'inline-flex items-center border px-1.5 py-0.5 text-xs font-medium',
        meta.className,
        className,
      )}
    >
      {meta.label}
    </span>
  );
}
