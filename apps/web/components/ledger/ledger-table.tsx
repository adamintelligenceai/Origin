import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function LedgerTable({
  caption,
  children,
  className,
}: {
  caption: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full border-collapse text-sm">
        <caption className="mb-3 text-left text-sm text-ink-2">{caption}</caption>
        {children}
      </table>
    </div>
  );
}

export function LedgerHead({ children }: { children: ReactNode }) {
  return (
    <thead className="border-b-2 border-ink text-left text-xs font-medium uppercase tracking-wide text-ink-2">
      {children}
    </thead>
  );
}

export function LedgerBody({ children }: { children: ReactNode }) {
  return <tbody className="[&_tr]:border-b [&_tr]:border-ruling-soft">{children}</tbody>;
}

export function DoubleRuleTotal({ label, children }: { label: string; children: ReactNode }) {
  return (
    <tr className="border-t-2 border-double border-ink">
      <th scope="row" className="py-3 text-left font-semibold text-ink">
        {label}
      </th>
      <td className="py-3 text-right font-semibold tabular-nums">{children}</td>
    </tr>
  );
}
