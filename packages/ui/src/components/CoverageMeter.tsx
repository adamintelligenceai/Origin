import { cn } from '../lib/cn';
import { Percentage } from './Percentage';

export type CoverageMeterProps = {
  /** 0–100 */
  coverage: number;
  label?: string;
  className?: string;
};

export function CoverageMeter({ coverage, label = 'Economic coverage', className }: CoverageMeterProps) {
  const clamped = Math.max(0, Math.min(100, coverage));
  const tone =
    clamped >= 85 ? 'bg-[var(--bank)]' : clamped >= 60 ? 'bg-[var(--manila)]' : 'bg-[var(--red-ink)]';

  return (
    <div className={cn('w-full', className)}>
      <div className="mb-1 flex justify-between text-xs text-[var(--ink-2)]">
        <span>{label}</span>
        <Percentage value={clamped} asPercent digits={0} />
      </div>
      <div
        className="h-2 border border-[var(--ruling-soft)] bg-[var(--ledger)]"
        role="meter"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div className={cn('h-full', tone)} style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}
