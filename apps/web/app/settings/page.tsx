'use client';

import { AppShell } from '../../components/AppShell';
import { useScan } from '../../components/ScanProvider';

export default function SettingsPage() {
  const { aiEnabled, wipe, demo } = useScan();
  return (
    <AppShell>
      <h1 className="font-display text-4xl">Settings</h1>
      <ul className="mt-6 space-y-2 text-sm">
        <li>AI commentary {aiEnabled ? 'on for demo aggregates' : 'off'}</li>
        <li>Mode {demo ? 'Harbourline demonstration' : 'live scan'}</li>
      </ul>
      <button type="button" className="mt-6 border border-red-ink px-4 py-2 text-red-ink" onClick={wipe}>
        Delete local scan data
      </button>
    </AppShell>
  );
}
