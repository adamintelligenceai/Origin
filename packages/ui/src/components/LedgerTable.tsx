import type { ReactNode } from "react";
import { cn } from "../lib/cn.js";

export interface LedgerTableProps {
  children: ReactNode;
  className?: string;
  caption?: string;
}

export function LedgerTable({ children, className, caption }: LedgerTableProps): ReactNode {
  return (
    <div className={cn("overflow-x-auto border border-ruling-soft bg-folio", className)}>
      <table className="w-full min-w-[480px] border-collapse text-sm">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        {children}
      </table>
    </div>
  );
}

export function LedgerTableHead({ children }: { children: ReactNode }): ReactNode {
  return (
    <thead>
      <tr className="border-b-2 border-ink bg-ledger text-left text-xs font-semibold uppercase tracking-wide text-ink-2">
        {children}
      </tr>
    </thead>
  );
}

export function LedgerTableBody({ children }: { children: ReactNode }): ReactNode {
  return <tbody className="divide-y divide-ruling-soft">{children}</tbody>;
}

export function LedgerTableRow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}): ReactNode {
  return (
    <tr className={cn("hover:bg-ledger/60 focus-within:bg-ledger/80", className)}>{children}</tr>
  );
}

export function LedgerTableCell({
  children,
  className,
  align = "left",
  numeric = false,
}: {
  children: ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
  numeric?: boolean;
}): ReactNode {
  return (
    <td
      className={cn(
        "px-4 py-2.5 text-ink",
        align === "right" && "text-right",
        align === "center" && "text-center",
        numeric && "tabular-nums",
        className,
      )}
    >
      {children}
    </td>
  );
}

export function LedgerTableHeaderCell({
  children,
  className,
  align = "left",
}: {
  children: ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
}): ReactNode {
  return (
    <th
      scope="col"
      className={cn(
        "px-4 py-3 font-semibold",
        align === "right" && "text-right",
        align === "center" && "text-center",
        className,
      )}
    >
      {children}
    </th>
  );
}
