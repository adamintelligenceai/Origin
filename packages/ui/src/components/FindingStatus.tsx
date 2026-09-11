import type { ReactNode } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../lib/cn.js";

const statusVariants = cva("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", {
  variants: {
    status: {
      DETECTED: "bg-red-ink/10 text-red-ink",
      REVIEWED: "bg-manila/30 text-ink",
      VERIFIED: "bg-bank/10 text-bank",
      REJECTED: "bg-ruling-soft text-ruling",
      ACTION_PLANNED: "bg-ink/10 text-ink",
      IMPLEMENTED: "bg-bank/20 text-bank",
      REALIZED: "bg-bank/30 text-bank",
      CLOSED: "bg-ledger text-ink-2",
    },
  },
});

const LABELS = {
  DETECTED: "Detected",
  REVIEWED: "Reviewed",
  VERIFIED: "Verified",
  REJECTED: "Rejected",
  ACTION_PLANNED: "Action planned",
  IMPLEMENTED: "Implemented",
  REALIZED: "Realised",
  CLOSED: "Closed",
} as const;

export type FindingStatusValue = keyof typeof LABELS;

export interface FindingStatusProps {
  status: FindingStatusValue;
  className?: string;
}

export function FindingStatus({ status, className }: FindingStatusProps): ReactNode {
  return (
    <span className={cn(statusVariants({ status }), className)}>{LABELS[status] ?? status}</span>
  );
}
