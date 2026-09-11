import type { ReactNode } from "react";
import { cn } from "../lib/cn.js";
import { Money } from "./Money.js";

export interface DoubleRuleTotalProps {
  label: string;
  amount: number;
  className?: string;
}

export function DoubleRuleTotal({ label, amount, className }: DoubleRuleTotalProps): ReactNode {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-t-4 border-double border-ink px-4 py-3 bg-ledger",
        className,
      )}
    >
      <span className="text-sm font-semibold text-ink">{label}</span>
      <Money amount={amount} className="text-base font-semibold" />
    </div>
  );
}
