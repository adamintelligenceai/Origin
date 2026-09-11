import type { ReactNode } from "react";
import { cn } from "../lib/cn.js";

export interface ShellProps {
  children: ReactNode;
  className?: string;
}

export function AppShell({ children, className }: ShellProps): ReactNode {
  return (
    <div className={cn("flex min-h-screen bg-folio text-ink", className)}>
      <aside className="hidden w-56 shrink-0 border-r border-ruling-soft bg-ledger lg:block">
        <div className="border-b border-ruling-soft px-4 py-5">
          <span className="font-display text-xl font-semibold text-ink">MarginShield</span>
          <p className="mt-1 text-xs text-ruling">by Evidence Room</p>
        </div>
        <nav className="px-2 py-4 text-sm text-ink-2" aria-label="Application">
          <ul className="space-y-1">
            {[
              "Overview",
              "The Bleed",
              "Checks",
              "Leakage ledger",
              "Customers",
              "Recovery plan",
              "Reports",
              "Data health",
              "Assumptions",
            ].map((item) => (
              <li key={item}>
                <span className="block rounded px-3 py-2 hover:bg-folio hover:text-ink">{item}</span>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}

export function MarketingShell({ children, className }: ShellProps): ReactNode {
  return (
    <div className={cn("min-h-screen bg-folio text-ink", className)}>
      <header className="border-b border-ruling-soft bg-ledger">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="font-display text-2xl font-semibold tracking-tight">MarginShield</span>
          <span className="text-xs text-ruling">by Evidence Room</span>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
