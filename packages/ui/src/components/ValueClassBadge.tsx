import type { ReactNode } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../lib/cn.js";

const valueClassVariants = cva(
  "inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium",
  {
    variants: {
      valueClass: {
        DETECTED_LEAKAGE: "border-red-ink bg-red-ink/10 text-red-ink",
        POLICY_LEAKAGE: "border-red-ink/70 bg-red-ink/5 text-red-ink",
        MODELLED_MARGIN_OPPORTUNITY:
          "border-red-ink/50 border-dashed bg-transparent text-red-ink",
        CASH_ENTITLEMENT: "border-bank bg-bank/10 text-bank",
        OPPORTUNITY: "border-manila bg-manila/20 text-ink-2",
        INSIGHT: "border-ruling-soft bg-ledger text-ink-2",
        OVERLAY: "border-ruling bg-folio text-ruling",
        BILLING_RISK: "border-red-ink bg-manila/40 text-red-ink",
      },
    },
  },
);

const LABELS = {
  DETECTED_LEAKAGE: "Detected leakage",
  POLICY_LEAKAGE: "Policy leakage",
  MODELLED_MARGIN_OPPORTUNITY: "Modelled opportunity",
  CASH_ENTITLEMENT: "Cash entitlement",
  OPPORTUNITY: "Opportunity",
  INSIGHT: "Insight",
  OVERLAY: "Overlay",
  BILLING_RISK: "Billing risk",
} as const;

export type ValueClassValue = keyof typeof LABELS;

export interface ValueClassBadgeProps {
  valueClass: ValueClassValue;
  className?: string;
}

export function ValueClassBadge({ valueClass, className }: ValueClassBadgeProps): ReactNode {
  return (
    <span className={cn(valueClassVariants({ valueClass }), className)}>
      {LABELS[valueClass] ?? valueClass}
    </span>
  );
}
