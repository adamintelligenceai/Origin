import type { ReactNode } from "react";
import { cn } from "../lib/cn.js";
import { Money } from "./Money.js";

export interface BleedSegment {
  label: string;
  amount: number;
  variant: "detected" | "modelled" | "bankable";
}

export interface RedInkBarProps {
  segments: BleedSegment[];
  totalRevenue: number;
  className?: string;
}

export function RedInkBar({ segments, totalRevenue, className }: RedInkBarProps): ReactNode {
  const maxWidth = Math.max(totalRevenue, ...segments.map((s) => s.amount));

  return (
    <div className={cn("space-y-3", className)} role="img" aria-label="Commercial economics bleed">
      <div className="relative h-8 overflow-hidden rounded-sm bg-ink">
        <div className="absolute inset-y-0 left-0 w-full bg-ink" aria-hidden />
      </div>
      <div className="space-y-2">
        {segments.map((segment) => {
          const widthPct = Math.min(100, (segment.amount / maxWidth) * 100);
          const barClass =
            segment.variant === "detected"
              ? "bg-red-ink"
              : segment.variant === "modelled"
                ? "border-2 border-dashed border-red-ink bg-red-ink/20"
                : "border-2 border-bank bg-transparent";

          return (
            <div key={segment.label} className="flex items-center gap-3">
              <div className="w-36 shrink-0 text-xs text-ink-2">{segment.label}</div>
              <div className="relative h-5 flex-1 rounded-sm bg-ruling-soft/40">
                <div
                  className={cn("absolute inset-y-0 left-0 rounded-sm", barClass)}
                  style={{ width: `${widthPct}%` }}
                />
              </div>
              <Money amount={segment.amount} compact className="w-20 text-right text-sm" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
