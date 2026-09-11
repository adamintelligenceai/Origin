import { cn } from '../lib/cn';
import { Money } from './Money';

export type RedInkSegment = {
  id: string;
  label: string;
  amount: number;
  kind: 'detected' | 'modelled';
};

export type RedInkBarProps = {
  revenue: number;
  segments: RedInkSegment[];
  className?: string;
};

/**
 * Compact horizontal bleed preview: ink revenue band with red peel segments.
 * Full cinematic Bleed lives in the executive Overview.
 */
export function RedInkBar({ revenue, segments, className }: RedInkBarProps) {
  const totalLeak = segments.reduce((s, x) => s + Math.abs(x.amount), 0);
  const denom = Math.max(revenue, totalLeak, 1);

  return (
    <div className={cn('w-full', className)} role="img" aria-label="Commercial bleed preview">
      <div className="ms-bleed-band flex h-10 w-full overflow-hidden">
        <div
          className="h-full bg-[var(--ink)]"
          style={{ width: `${Math.max(8, ((revenue - totalLeak) / denom) * 100)}%` }}
          title="Retained contribution"
        />
        {segments.map((seg) => (
          <div
            key={seg.id}
            className={cn(
              'h-full border-l border-[var(--folio)]/30',
              seg.kind === 'detected' ? 'bg-[var(--red-ink)]' : 'bg-[var(--red-ink)] ms-modelled-hatch',
            )}
            style={{ width: `${(Math.abs(seg.amount) / denom) * 100}%` }}
            title={`${seg.label}: ${seg.amount}`}
          />
        ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--ink-2)]">
        {segments.map((seg) => (
          <li key={seg.id} className="flex items-center gap-1.5">
            <span
              className={cn(
                'inline-block h-2.5 w-2.5 border border-[var(--ink)]',
                seg.kind === 'detected' ? 'bg-[var(--red-ink)]' : 'bg-[var(--red-ink)] ms-modelled-hatch',
              )}
              aria-hidden
            />
            <span>{seg.label}</span>
            <Money value={seg.amount} compact tone={seg.kind === 'detected' ? 'detected' : 'modelled'} />
          </li>
        ))}
      </ul>
    </div>
  );
}
