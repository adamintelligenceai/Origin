'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { useScan } from './ScanProvider';
import { EvidenceDrawer } from './EvidenceDrawer';
import { CommandPalette } from './CommandPalette';
import { PrivacyProof } from './PrivacyProof';

const NAV = [
  ['/scan', 'Scans'],
  ['/overview', 'Overview'],
  ['/bleed', 'The Bleed'],
  ['/app/checks', 'Checks'],
  ['/ledger', 'Leakage ledger'],
  ['/customers', 'Customers'],
  ['/products', 'Products'],
  ['/recovery', 'Recovery plan'],
  ['/reports', 'Reports'],
  ['/data-health', 'Data health'],
  ['/assumptions', 'Assumptions'],
  ['/settings', 'Settings'],
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const path = usePathname();
  const { demo } = useScan();
  return (
    <div className="min-h-screen bg-ledger text-ink">
      <div className="flex min-h-screen">
        <aside className="hidden w-56 shrink-0 border-r border-ruling-soft bg-folio md:block">
          <div className="px-4 py-5 font-display text-xl font-semibold">MarginShield</div>
          <nav className="flex flex-col gap-0.5 px-2 text-sm">
            {NAV.map(([href, label]) => {
              const active = path === href || path.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`px-3 py-2 ${active ? 'bg-ink text-folio' : 'text-ink-2 hover:bg-ruling-soft/60'}`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          {demo ? (
            <div className="bg-manila px-4 py-2 text-center text-sm">
              Fictional demonstration company — Harbourline Trade Supply Pty Ltd
            </div>
          ) : null}
          <header className="flex items-center justify-between border-b border-ruling-soft px-4 py-3 text-sm md:hidden">
            <span className="font-display text-lg font-semibold">MarginShield</span>
            <Link href="/overview">Menu</Link>
          </header>
          <div className="flex-1 px-4 py-6 md:px-8">{children}</div>
        </div>
      </div>
      <EvidenceDrawer />
      <CommandPalette />
      <PrivacyProof />
    </div>
  );
}
