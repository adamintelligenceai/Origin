'use client';

import { AppShell } from '../../components/AppShell';
import { Bleed } from '../../components/Bleed';
import { useEnsureScan } from '../../components/useEnsureScan';

export default function BleedPage() {
  const result = useEnsureScan();
  return (
    <AppShell>
      <Bleed result={result} />
    </AppShell>
  );
}
