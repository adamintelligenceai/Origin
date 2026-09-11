import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn.js";

const gradeVariants = cva(
  "inline-flex h-6 min-w-6 items-center justify-center rounded border px-1.5 text-xs font-semibold tabular-nums",
  {
    variants: {
      grade: {
        A: "border-bank bg-bank/10 text-bank",
        B: "border-ruling bg-ledger text-ink",
        C: "border-manila bg-manila/30 text-ink-2",
      },
    },
    defaultVariants: { grade: "B" },
  },
);

export interface EvidenceGradeProps extends VariantProps<typeof gradeVariants> {
  grade: "A" | "B" | "C";
  className?: string;
}

export function EvidenceGrade({ grade, className }: EvidenceGradeProps): ReactNode {
  return (
    <span className={cn(gradeVariants({ grade }), className)} title={`Evidence grade ${grade}`}>
      {grade}
    </span>
  );
}
