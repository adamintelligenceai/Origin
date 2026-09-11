import type { ReactNode } from "react";
import { cn } from "../lib/cn.js";

export interface PercentageProps {
  value: number;
  decimals?: number;
  className?: string;
}

export function Percentage({ value, decimals = 1, className }: PercentageProps): ReactNode {
  const formatted = `${(value * 100).toFixed(decimals)}%`;
  return <span className={cn("tabular-nums", className)}>{formatted}</span>;
}

export interface BasisPointsProps {
  value: number;
  className?: string;
}

export function BasisPoints({ value, className }: BasisPointsProps): ReactNode {
  const bps = Math.round(value * 10000);
  const sign = bps > 0 ? "+" : "";
  return (
    <span className={cn("tabular-nums", className)}>
      {sign}
      {bps} bps
    </span>
  );
}
