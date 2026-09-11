export type RiskBand = 'LOW' | 'MEDIUM' | 'HIGH';

const LABELS: Record<RiskBand, string> = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
};

export function RiskIndicator({ band, score }: { band: RiskBand; score: number }) {
  return (
    <div
      className="inline-flex flex-col border border-[var(--ruling)] px-3 py-2"
      style={{ borderRadius: 'var(--radius-sm)' }}
      title="Commercial risk indicator — not a probability the customer leaves"
    >
      <span className="text-xs text-[var(--ink-2)]">Commercial risk indicator</span>
      <span className="ms-tabular text-sm font-medium">
        {LABELS[band]} · {Math.round(score)}
      </span>
    </div>
  );
}
