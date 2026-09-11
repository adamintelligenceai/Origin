import { cn } from '../lib/cn';

export type RunHashProps = {
  hash: string;
  chars?: number;
  className?: string;
};

export function RunHash({ hash, chars = 12, className }: RunHashProps) {
  const short = hash.slice(0, chars);
  return (
    <code
      className={cn(
        'ms-tabular border border-[var(--ruling-soft)] bg-[var(--ledger)] px-1.5 py-0.5 font-mono text-xs text-[var(--ink-2)]',
        className,
      )}
      title={hash}
    >
      {short}
    </code>
  );
}
