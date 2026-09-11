import { formatPercentage, type MoneyInput } from "@marginshield/ui";
import { cn } from "@/lib/utils";

export function Percentage({ value, className }: { value: MoneyInput; className?: string }) {
  return (
    <span className={cn("tabular-nums tracking-tight", className)}>{formatPercentage(value)}</span>
  );
}
