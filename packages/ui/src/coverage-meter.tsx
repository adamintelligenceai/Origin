import { Percentage } from './percentage.js';

export function CoverageMeter({
  coverage,
  missingNote,
}: {
  coverage: number;
  missingNote?: string;
}) {
  const pct = Math.round(Math.max(0, Math.min(1, coverage)) * 100);
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-sm font-medium">Economic coverage</span>
        <span className="ms-tabular text-sm">
          <Percentage value={coverage} fractionDigits={0} />
        </span>
      </div>
      <div
        className="mt-2 h-2 w-full border border-[var(--ruling-soft)] bg-[var(--folio)]"
        role="meter"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Economic coverage"
      >
        <div style={{ width: `${pct}%`, height: '100%', background: 'var(--ink)' }} />
      </div>
      {missingNote ? <p className="mt-1 text-xs text-[var(--ink-2)]">{missingNote}</p> : null}
    </div>
  );
}
