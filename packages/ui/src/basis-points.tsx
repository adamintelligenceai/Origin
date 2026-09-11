import type { CSSProperties } from 'react';
import { formatBasisPoints } from './format.js';

export function BasisPoints({ bps, className }: { bps: number; className?: string }) {
  const style: CSSProperties = { fontVariantNumeric: 'tabular-nums' };
  return (
    <span className={className} style={style}>
      {formatBasisPoints(bps)}
    </span>
  );
}
