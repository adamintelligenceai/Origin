import type { ReactNode } from "react";
import Link from "next/link";
import { brand } from "@/config/brand";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/app/scans", label: "Scans", ready: false },
  { href: "/app/overview", label: "Overview", ready: false },
  { href: "/app/bleed", label: "The Bleed", ready: false },
  { href: "/app/checks", label: "Checks", ready: false },
  { href: "/app/ledger", label: "Leakage ledger", ready: false },
  { href: "/app/customers", label: "Customers", ready: false },
  { href: "/app/products", label: "Products", ready: false },
  { href: "/app/recovery", label: "Recovery plan", ready: false },
  { href: "/app/reports", label: "Reports", ready: false },
  { href: "/app/data-health", label: "Data health", ready: false },
  { href: "/app/assumptions", label: "Assumptions", ready: false },
  { href: "/app/settings", label: "Settings", ready: false },
  { href: "/styleguide", label: "Ledger", ready: true },
] as const;

export function AppShell({
  children,
  currentPath = "/app/overview",
}: {
  children: ReactNode;
  currentPath?: string;
}) {
  return (
    <div className="flex min-h-full">
      <aside className="hidden w-56 shrink-0 flex-col bg-sidebar text-sidebar-foreground md:flex">
        <p className="px-4 py-5 font-display text-xl tracking-tight">{brand.productName}</p>
        <nav className="flex flex-1 flex-col gap-0.5 px-2 pb-6" aria-label="Application">
          {NAV.map((item) =>
            item.ready ? (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-sm px-3 py-2 text-sm hover:bg-sidebar-accent",
                  currentPath === item.href && "bg-sidebar-accent text-sidebar-primary",
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span
                key={item.href}
                className="rounded-sm px-3 py-2 text-sm text-sidebar-foreground/55"
                title="Available after the scan product is built"
              >
                {item.label}
              </span>
            ),
          )}
        </nav>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-ruling-soft bg-folio px-4 py-3 md:hidden">
          <p className="font-display text-lg">{brand.productName}</p>
        </header>
        <main className="flex-1 bg-ledger p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
