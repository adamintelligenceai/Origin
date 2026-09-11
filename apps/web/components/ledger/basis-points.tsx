import { formatBasisPoints, type MoneyInput } from "@marginshield/ui";
import { cn } from "@/lib/utils";

export function BasisPoints({ value, className }: { value: MoneyInput; className?: string }) {
  return (
    <span className={cn("tabular-nums tracking-tight", className)}>{formatBasisPoints(value)}</span>
  );
}
