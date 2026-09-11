import type { FindingStatus as Status } from "@marginshield/schemas";
import { assertNever } from "@marginshield/schemas";
import { cn } from "@/lib/utils";

function labelFor(status: Status): string {
  switch (status) {
    case "DETECTED":
      return "Detected";
    case "REVIEWED":
      return "Reviewed";
    case "VERIFIED":
      return "Verified";
    case "REJECTED":
      return "Rejected";
    case "ACTION_PLANNED":
      return "Action planned";
    case "IMPLEMENTED":
      return "Implemented";
    case "REALIZED":
      return "Realized";
    case "CLOSED":
      return "Closed";
    default:
      return assertNever(status);
  }
}

export function FindingStatus({ status }: { status: Status }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-sm border border-ruling-soft bg-ledger px-2 py-0.5 text-xs text-ink-2",
        status === "VERIFIED" && "border-bank text-bank",
        status === "REJECTED" && "border-red-ink text-red-ink",
        status === "REALIZED" && "border-bank bg-folio text-bank",
      )}
    >
      {labelFor(status)}
    </span>
  );
}
