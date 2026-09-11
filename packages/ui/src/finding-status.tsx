export type FindingStatus =
  | 'DETECTED'
  | 'REVIEWED'
  | 'VERIFIED'
  | 'REJECTED'
  | 'ACTION_PLANNED'
  | 'IMPLEMENTED'
  | 'REALIZED'
  | 'CLOSED';

const LABELS: Record<FindingStatus, string> = {
  DETECTED: 'Detected',
  REVIEWED: 'Reviewed',
  VERIFIED: 'Verified',
  REJECTED: 'Rejected',
  ACTION_PLANNED: 'Action planned',
  IMPLEMENTED: 'Implemented',
  REALIZED: 'Realized',
  CLOSED: 'Closed',
};

export function FindingStatusBadge({ status }: { status: FindingStatus }) {
  return (
    <span
      className="inline-flex border border-[var(--ruling-soft)] px-2 py-0.5 text-xs text-[var(--ink-2)]"
      style={{ borderRadius: 'var(--radius-sm)' }}
    >
      {LABELS[status]}
    </span>
  );
}
