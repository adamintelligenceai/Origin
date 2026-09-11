import type { ReactNode } from "react";
import { cn } from "../lib/cn.js";
import { Money } from "./Money.js";

export interface BankabilityRangeProps {
  low: number;
  base: number;
  high: number;
  className?: string;
}

export function BankabilityRange({ low, base, high, className }: BankabilityRangeProps): ReactNode {
  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-xs text-ruling">Planning range</span>
        <span className="text-sm tabular-nums text-ink-2">
          <Money amount={low} compact /> – <Money amount={high} compact />
        </span>
      </div>
      <div className="flex items-baseline gap-2">
        <Money amount={base} className="text-2xl font-semibold text-bank" compact />
        <span className="text-xs text-ruling">base case</span>
      </div>
      <p className="text-xs text-ruling">
        Initial MarginShield assumption. Confirm with management.
      </p>
    </div>
  );
}
