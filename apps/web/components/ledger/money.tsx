import { formatMoney, type MoneyInput } from "@marginshield/ui";
import { cn } from "@/lib/utils";

export function Money({
  value,
  compact = false,
  className,
}: {
  value: MoneyInput;
  compact?: boolean;
  className?: string;
}) {
  const numeric = typeof value === "number" ? value : Number(value);
  return (
    <span className={cn("tabular-nums tracking-tight", numeric < 0 && "text-red-ink", className)}>
      {formatMoney(value, { compact })}
    </span>
  );
}
