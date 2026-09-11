import type { CSSProperties } from 'react';
import { formatPercent } from './format.js';

export function Percentage({
  value,
  fractionDigits = 1,
  className,
}: {
  value: number;
  fractionDigits?: number;
  className?: string;
}) {
  const style: CSSProperties = { fontVariantNumeric: 'tabular-nums' };
  return (
    <span className={className} style={style}>
      {formatPercent(value, fractionDigits)}
    </span>
  );
}
