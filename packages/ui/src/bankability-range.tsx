import { Money } from './money.js';

export function BankabilityRange({
  low,
  base,
  high,
}: {
  low: number;
  base: number;
  high: number;
}) {
  return (
    <div className="border border-[var(--bank)] bg-[var(--folio)] p-3" style={{ borderRadius: 'var(--radius-sm)' }}>
      <p className="text-xs uppercase tracking-wide text-[var(--bank)]">Expected bankable — base</p>
      <p className="mt-1 text-2xl font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
        <Money amount={base} />
      </p>
      <p className="mt-1 text-sm text-[var(--ink-2)]">
        Planning range <Money amount={low} />–<Money amount={high} />
      </p>
      <p className="mt-2 text-xs text-[var(--ink-2)]">
        Initial MarginShield assumption. Confirm with management.
      </p>
    </div>
  );
}
