import type { ReactNode } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../lib/cn.js";

const riskVariants = cva("inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-xs font-medium", {
  variants: {
    band: {
      LOW: "bg-bank/10 text-bank",
      MEDIUM: "bg-manila/40 text-ink",
      HIGH: "bg-red-ink/10 text-red-ink",
    },
  },
});

export interface RiskIndicatorProps {
  score: number;
  band: "LOW" | "MEDIUM" | "HIGH";
  className?: string;
}

export function RiskIndicator({ score, band, className }: RiskIndicatorProps): ReactNode {
  return (
    <span
      className={cn(riskVariants({ band }), className)}
      title="Commercial risk indicator — not probability of customer churn"
    >
      <span className="tabular-nums">{score}</span>
      <span aria-hidden>·</span>
      <span>{band === "LOW" ? "Low" : band === "MEDIUM" ? "Medium" : "High"} risk</span>
    </span>
  );
}
