import { cn } from '../lib/cn';

export type FindingStatusValue =
  | 'DETECTED'
  | 'REVIEWED'
  | 'VERIFIED'
  | 'REJECTED'
  | 'ACTION_PLANNED'
  | 'IMPLEMENTED'
  | 'REALIZED'
  | 'CLOSED';

export type FindingStatusProps = {
  status: FindingStatusValue;
  className?: string;
};

const LABEL: Record<FindingStatusValue, string> = {
  DETECTED: 'Detected',
  REVIEWED: 'Reviewed',
  VERIFIED: 'Verified',
  REJECTED: 'Rejected',
  ACTION_PLANNED: 'Action planned',
  IMPLEMENTED: 'Implemented',
  REALIZED: 'Realized',
  CLOSED: 'Closed',
};

export function FindingStatus({ status, className }: FindingStatusProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center border border-[var(--ruling-soft)] bg-[var(--folio)] px-1.5 py-0.5 text-xs text-[var(--ink-2)]',
        className,
      )}
    >
      {LABEL[status]}
    </span>
  );
}
