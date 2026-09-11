import { cn } from '../lib/cn';

export type EvidenceGradeProps = {
  grade: 'A' | 'B' | 'C';
  className?: string;
};

const LABEL: Record<EvidenceGradeProps['grade'], string> = {
  A: 'Document-backed',
  B: 'Supported',
  C: 'Derived',
};

export function EvidenceGrade({ grade, className }: EvidenceGradeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 border px-1.5 py-0.5 text-xs font-medium',
        grade === 'A' && 'border-[var(--bank)] text-[var(--bank)] bg-[var(--folio)]',
        grade === 'B' && 'border-[var(--ruling)] text-[var(--ink-2)] bg-[var(--folio)]',
        grade === 'C' && 'border-[var(--manila)] text-[var(--serve)] bg-[var(--folio)]',
        className,
      )}
      title={LABEL[grade]}
    >
      <span aria-hidden className="font-mono">
        {grade}
      </span>
      <span className="sr-only">Evidence grade {grade}: {LABEL[grade]}</span>
      <span className="hidden sm:inline">{LABEL[grade]}</span>
    </span>
  );
}
