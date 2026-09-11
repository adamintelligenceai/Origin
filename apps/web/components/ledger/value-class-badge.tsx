import type { ValueClass } from "@marginshield/schemas";
import { assertNever } from "@marginshield/schemas";
import { cn } from "@/lib/utils";

function labelFor(valueClass: ValueClass): string {
  switch (valueClass) {
    case "DETECTED_LEAKAGE":
      return "Detected leakage";
    case "POLICY_LEAKAGE":
      return "Policy leakage";
    case "MODELLED_MARGIN_OPPORTUNITY":
      return "Modelled opportunity";
    case "CASH_ENTITLEMENT":
      return "Cash entitlement";
    case "OPPORTUNITY":
      return "Opportunity";
    case "INSIGHT":
      return "Insight";
    case "OVERLAY":
      return "Overlay";
    case "BILLING_RISK":
      return "Billing risk";
    default:
      return assertNever(valueClass);
  }
}

export function ValueClassBadge({ valueClass }: { valueClass: ValueClass }) {
  const modelled = valueClass === "MODELLED_MARGIN_OPPORTUNITY";
  const leakage = valueClass === "DETECTED_LEAKAGE" || valueClass === "POLICY_LEAKAGE";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-xs font-medium",
        leakage && "border-red-ink text-red-ink",
        modelled && "border-red-ink/70 text-red-ink",
        valueClass === "CASH_ENTITLEMENT" && "border-bank text-bank",
        valueClass === "BILLING_RISK" && "border-ink text-ink",
        !leakage &&
          !modelled &&
          valueClass !== "CASH_ENTITLEMENT" &&
          valueClass !== "BILLING_RISK" &&
          "border-ruling text-ink-2",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-2 rounded-full",
          leakage && "bg-red-ink",
          modelled && "hatched-opportunity border border-red-ink",
          valueClass === "CASH_ENTITLEMENT" && "bg-bank",
          valueClass === "BILLING_RISK" && "bg-ink",
          !leakage &&
            !modelled &&
            valueClass !== "CASH_ENTITLEMENT" &&
            valueClass !== "BILLING_RISK" &&
            "bg-ruling",
        )}
      />
      {labelFor(valueClass)}
    </span>
  );
}
