import type { RiskBand } from "@marginshield/schemas";
import { cn } from "@/lib/utils";

export function RiskIndicator({ score, band }: { score: number; band: RiskBand }) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-ink">Commercial risk indicator</p>
      <p
        className={cn(
          "text-sm font-medium",
          band === "LOW" && "text-bank",
          band === "MEDIUM" && "text-ink-2",
          band === "HIGH" && "text-red-ink",
        )}
      >
        {band.charAt(0) + band.slice(1).toLowerCase()} · {score}
      </p>
      <p className="text-xs text-ink-2">Heuristic, not a probability the customer leaves.</p>
    </div>
  );
}
