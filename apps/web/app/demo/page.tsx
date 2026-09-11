'use client';

import { MarketingShell } from '../../components/MarketingShell';
import { DemoRedirect } from '../../components/useEnsureScan';

export default function DemoPage() {
  return (
    <MarketingShell>
      <DemoRedirect />
    </MarketingShell>
  );
}
