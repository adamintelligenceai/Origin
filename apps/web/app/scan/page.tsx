'use client';

import { AppShell } from '../../components/AppShell';
import { ScanWizard } from '../../components/ScanWizard';

export default function ScanPage() {
  return (
    <AppShell>
      <h1 className="font-display text-4xl">Scans</h1>
      <p className="mt-2 max-w-2xl text-sm text-ink-2">
        Upload → map → reconcile → calculate. Transaction files are processed in this browser. Raw rows are not posted to
        MarginShield.
      </p>
      <div className="mt-8">
        <ScanWizard />
      </div>
    </AppShell>
  );
}
