"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function CoverageMeter({ coverage, missing }: { coverage: number; missing: string[] }) {
  const clamped = Math.max(0, Math.min(100, coverage));
  return (
    <Tooltip>
      <TooltipTrigger className="block w-full text-left">
        <div className="space-y-1">
          <div className="flex items-baseline justify-between text-sm">
            <span>Economic coverage</span>
            <span className="tabular-nums">{clamped}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-sm bg-ruling-soft">
            <div className="h-full bg-ink" style={{ width: `${clamped}%` }} />
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        Coverage measures available input completeness, not model confidence.
        {missing.length > 0 ? ` Missing: ${missing.join(", ")}.` : " All components present."}
      </TooltipContent>
    </Tooltip>
  );
}
