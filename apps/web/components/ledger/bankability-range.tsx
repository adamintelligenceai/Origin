import { formatMoney } from "@marginshield/ui";

export function BankabilityRange({ low, base, high }: { low: number; base: number; high: number }) {
  return (
    <div className="rounded-sm border border-bank/40 bg-folio px-3 py-2">
      <p className="font-display text-2xl tabular-nums text-bank">
        {formatMoney(base, { compact: true })}
      </p>
      <p className="text-xs text-ink-2">Expected bankable — base</p>
      <p className="mt-1 text-sm tabular-nums text-ink-2">
        Planning range {formatMoney(low, { compact: true })}–{formatMoney(high, { compact: true })}
      </p>
      <p className="mt-2 text-xs text-ink-2">
        Initial MarginShield assumption. Confirm with management.
      </p>
    </div>
  );
}
