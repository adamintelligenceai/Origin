import type { ReactNode } from "react";
import Link from "next/link";
import { brand } from "@/config/brand";

export function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b border-ruling-soft bg-folio">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="font-display text-xl tracking-tight text-ink">
            {brand.productName}
          </Link>
          <nav className="flex items-center gap-4 text-sm text-ink-2" aria-label="Marketing">
            <Link href="/styleguide" className="hover:text-ink">
              Ledger
            </Link>
            <Link href="/demo" className="hover:text-ink">
              Run the demo scan
            </Link>
          </nav>
        </div>
      </header>
      <div className="flex-1">{children}</div>
      <footer className="border-t border-ruling-soft bg-folio">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-ink-2 sm:flex-row sm:justify-between">
          <p>{brand.lockup}</p>
          <p>Transaction files are processed locally on your computer.</p>
        </div>
      </footer>
    </div>
  );
}
