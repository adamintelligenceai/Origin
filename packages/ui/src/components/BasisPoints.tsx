import { cn } from '../lib/cn';

export type BasisPointsProps = {
  /** Value in basis points (100 = 1%). */
  value: number;
  className?: string;
  showSign?: boolean;
};

export function BasisPoints({ value, className, showSign = false }: BasisPointsProps) {
  const sign = showSign && value > 0 ? '+' : '';
  return (
    <span className={cn('ms-tabular font-mono text-[var(--ink)]', className)}>
      {sign}
      {Math.round(value)} bps
    </span>
  );
}
