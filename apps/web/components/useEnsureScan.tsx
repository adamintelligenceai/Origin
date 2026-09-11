'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useScan } from './ScanProvider';
import { harbourlineDemoScan } from '../lib/harbourline';

export function useEnsureScan() {
  const { result, loadDemo, demo } = useScan();
  useEffect(() => {
    if (!result && !demo) {
      loadDemo();
    }
  }, [result, demo, loadDemo]);
  return result ?? harbourlineDemoScan();
}

export function DemoRedirect() {
  const { loadDemo, result, scanning } = useScan();
  const router = useRouter();
  useEffect(() => {
    loadDemo();
  }, [loadDemo]);
  useEffect(() => {
    if (result) router.replace('/overview');
  }, [result, router]);
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
      <p className="font-display text-4xl">Reconstructing Harbourline economics</p>
      <p className="text-ink-2">{scanning ? 'Ledger rows moving. Flags appearing.' : 'Preparing scan…'}</p>
      <p className="text-sm text-ink-2">Fictional demonstration company. Files stay in this browser.</p>
    </div>
  );
}
