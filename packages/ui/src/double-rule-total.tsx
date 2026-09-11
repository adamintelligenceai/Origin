import type { ReactNode } from 'react';
import { Money } from './money.js';

export function DoubleRuleTotal({
  label,
  amount,
  trailing,
}: {
  label: string;
  amount: number;
  trailing?: ReactNode;
}) {
  return (
    <div className="ms-double-rule flex items-baseline justify-between gap-4 py-2">
      <span className="font-medium">{label}</span>
      <span className="flex items-baseline gap-3">
        <Money amount={amount} />
        {trailing}
      </span>
    </div>
  );
}
