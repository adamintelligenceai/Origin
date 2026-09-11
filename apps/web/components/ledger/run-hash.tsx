import { formatRunHash } from "@marginshield/ui";

export function RunHash({ hash }: { hash: string }) {
  return (
    <code className="rounded-sm bg-ledger px-1.5 py-0.5 font-mono text-xs text-ink-2" title={hash}>
      {formatRunHash(hash)}
    </code>
  );
}
