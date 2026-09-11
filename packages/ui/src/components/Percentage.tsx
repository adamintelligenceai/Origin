import { cn } from '../lib/cn';

export type PercentageProps = {
  /** Ratio 0–1 or already-percent 0–100 when `asPercent` is true. */
  value: number;
  asPercent?: boolean;
  digits?: number;
  className?: string;
};

export function Percentage({
  value,
  asPercent = false,
  digits = 1,
  className,
}: PercentageProps) {
  const pct = asPercent ? value : value * 100;
  return (
    <span className={cn('ms-tabular font-mono text-[var(--ink)]', className)}>
      {pct.toFixed(digits)}%
    </span>
  );
}
