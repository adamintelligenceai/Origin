import type { EvidenceGrade as Grade } from "@marginshield/schemas";
import { cn } from "@/lib/utils";

const LABELS: Record<Grade, string> = {
  A: "Grade A — documentary",
  B: "Grade B — calculated",
  C: "Grade C — modelled",
};

export function EvidenceGrade({ grade }: { grade: Grade }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-1.5 py-0.5 text-xs font-medium",
        grade === "A" && "border-bank text-bank",
        grade === "B" && "border-ink-2 text-ink-2",
        grade === "C" && "border-ink-2 text-ink-2",
      )}
      title={LABELS[grade]}
    >
      <span aria-hidden="true">{grade}</span>
      <span className="sr-only">{LABELS[grade]}</span>
    </span>
  );
}
