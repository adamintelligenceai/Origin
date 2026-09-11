'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const ITEMS: [string, string][] = [
  ['Overview', '/overview'],
  ['The Bleed', '/bleed'],
  ['Leakage ledger', '/ledger'],
  ['Customers', '/customers'],
  ['Assumptions', '/assumptions'],
  ['Privacy proof', '/settings'],
  ['Reports', '/reports'],
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-ink/40 pt-24">
      <div className="w-full max-w-lg bg-folio p-4">
        <p className="text-sm text-ink-2">Command palette</p>
        <ul className="mt-3 space-y-1">
          {ITEMS.map(([label, href]) => (
            <li key={href}>
              <Link href={href} className="block px-2 py-2 hover:bg-ruling-soft" onClick={() => setOpen(false)}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
