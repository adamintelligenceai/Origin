import { cn } from '../lib/cn';

export type RiskBand = 'LOW' | 'MEDIUM' | 'HIGH';

export type RiskIndicatorProps = {
  band: RiskBand;
  className?: string;
};

const META: Record<RiskBand, { label: string; className: string }> = {
  LOW: { label: 'Low commercial risk', className: 'border-[var(--bank)] text-[var(--bank)]' },
  MEDIUM: {
    label: 'Medium commercial risk',
    className: 'border-[var(--manila)] text-[var(--serve)]',
  },
  HIGH: {
    label: 'High commercial risk',
    className: 'border-[var(--red-ink)] text-[var(--red-ink)]',
  },
};

export function RiskIndicator({ band, className }: RiskIndicatorProps) {
  const meta = META[band];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 border bg-[var(--folio)] px-1.5 py-0.5 text-xs font-medium',
        meta.className,
        className,
      )}
    >
      <span
        className={cn(
          'h-1.5 w-1.5',
          band === 'LOW' && 'bg-[var(--bank)]',
          band === 'MEDIUM' && 'bg-[var(--manila)]',
          band === 'HIGH' && 'bg-[var(--red-ink)]',
        )}
        aria-hidden
      />
      {meta.label}
    </span>
  );
}
