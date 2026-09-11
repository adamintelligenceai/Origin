import type { ReactNode } from "react";
import * as Progress from "@radix-ui/react-progress";
import { cn } from "../lib/cn.js";

export interface CoverageMeterProps {
  percentage: number;
  label?: string;
  tooltip?: string;
  className?: string;
}

export function CoverageMeter({
  percentage,
  label = "Economic coverage",
  tooltip,
  className,
}: CoverageMeterProps): ReactNode {
  const clamped = Math.max(0, Math.min(100, percentage));

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-ink" title={tooltip}>
          {label}
        </span>
        <span className="text-sm font-semibold tabular-nums text-ink">{clamped}%</span>
      </div>
      <Progress.Root
        className="relative h-2 w-full overflow-hidden rounded-full bg-ruling-soft"
        value={clamped}
        max={100}
        aria-label={`${label}: ${clamped} percent`}
      >
        <Progress.Indicator
          className="h-full rounded-full bg-bank transition-all duration-300"
          style={{ width: `${clamped}%` }}
        />
      </Progress.Root>
      {tooltip ? <p className="text-xs text-ruling">{tooltip}</p> : null}
    </div>
  );
}
