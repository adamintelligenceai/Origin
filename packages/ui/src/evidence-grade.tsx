export type EvidenceGrade = 'A' | 'B' | 'C';

const LABELS: Record<EvidenceGrade, string> = {
  A: 'Grade A — documentary',
  B: 'Grade B — calculated',
  C: 'Grade C — modelled',
};

export function EvidenceGradeBadge({ grade }: { grade: EvidenceGrade }) {
  return (
    <span
      title={LABELS[grade]}
      className="ms-tabular inline-flex items-center border border-[var(--ruling)] px-2 py-0.5 text-xs font-medium"
      style={{ borderRadius: 'var(--radius-sm)' }}
    >
      Evidence {grade}
    </span>
  );
}
