import type { CSSProperties } from 'react';
import { formatMoneyAUD } from './format.js';

export function Money({
  amount,
  fractionDigits = 0,
  className,
}: {
  amount: number;
  fractionDigits?: number;
  className?: string;
}) {
  const style: CSSProperties = { fontVariantNumeric: 'tabular-nums' };
  return (
    <span className={className} style={style}>
      {formatMoneyAUD(amount, fractionDigits)}
    </span>
  );
}
