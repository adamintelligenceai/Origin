import { cn } from '../lib/cn';
import { Money } from './Money';

export type BankabilityRangeProps = {
  low: number;
  base: number;
  high: number;
  className?: string;
};

export function BankabilityRange({ low, base, high, className }: BankabilityRangeProps) {
  const span = Math.max(high - low, 1);
  const basePos = ((base - low) / span) * 100;

  return (
    <div className={cn('w-full', className)}>
      <div className="relative h-3 border border-[var(--bank)] bg-[var(--folio)]">
        <div
          className="absolute inset-y-0 left-0 bg-[var(--bank)]/15"
          style={{ width: '100%' }}
          aria-hidden
        />
        <div
          className="absolute top-1/2 h-4 w-0.5 -translate-y-1/2 bg-[var(--bank)]"
          style={{ left: `${basePos}%` }}
          title="Base"
        />
      </div>
      <div className="mt-2 flex justify-between text-xs text-[var(--ink-2)]">
        <span>
          Low <Money value={low} compact tone="muted" />
        </span>
        <span className="font-medium text-[var(--bank)]">
          Base <Money value={base} compact tone="bank" />
        </span>
        <span>
          High <Money value={high} compact tone="muted" />
        </span>
      </div>
    </div>
  );
}
