import { cn } from '../lib/cn';

export type MoneyProps = {
  /** Dollar amount as number (AUD). */
  value: number;
  compact?: boolean;
  className?: string;
  tone?: 'default' | 'detected' | 'modelled' | 'bank' | 'muted';
};

function formatCompact(n: number): string {
  const neg = n < 0;
  const abs = Math.abs(n);
  let body: string;
  if (abs >= 1_000_000) body = `A$${(abs / 1_000_000).toFixed(2).replace(/\.?0+$/, '')}m`;
  else if (abs >= 1_000) body = `A$${Math.round(abs / 1_000)}k`;
  else body = `A$${Math.round(abs)}`;
  return neg ? `-${body}` : body;
}

function formatFull(n: number): string {
  const neg = n < 0;
  const abs = Math.abs(n);
  const whole = Math.floor(abs);
  const cents = Math.round((abs - whole) * 100)
    .toString()
    .padStart(2, '0');
  const wholeStr = whole.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return neg ? `(A$${wholeStr}.${cents})` : `A$${wholeStr}.${cents}`;
}

const TONE: Record<NonNullable<MoneyProps['tone']>, string> = {
  default: 'text-[var(--ink)]',
  detected: 'text-[var(--red-ink)]',
  modelled: 'text-[var(--modelled)]',
  bank: 'text-[var(--bank)]',
  muted: 'text-[var(--ink-2)]',
};

export function Money({ value, compact = false, className, tone = 'default' }: MoneyProps) {
  return (
    <span className={cn('ms-tabular font-mono', TONE[tone], className)}>
      {compact ? formatCompact(value) : formatFull(value)}
    </span>
  );
}
