import type { ReactNode } from "react";
import { cn } from "../lib/cn.js";

export interface RunHashProps {
  hash: string;
  className?: string;
}

export function RunHash({ hash, className }: RunHashProps): ReactNode {
  const display = hash.length > 16 ? `${hash.slice(0, 16)}…` : hash;

  return (
    <code
      className={cn(
        "inline-flex items-center rounded border border-ruling-soft bg-ledger px-2 py-0.5 font-mono text-xs text-ink-2",
        className,
      )}
      title={hash}
    >
      {display}
    </code>
  );
}
