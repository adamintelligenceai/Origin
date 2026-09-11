'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Finding, ScanResult } from '@marginshield/engine';
import { harbourlineDemoScan } from '../lib/harbourline';

interface ScanState {
  result: ScanResult | null;
  demo: boolean;
  scanning: boolean;
  selectedFinding: Finding | null;
  privacyLog: { time: string; method: string; destination: string; category: string; bytes: number }[];
  aiEnabled: boolean;
  loadDemo: () => void;
  selectFinding: (finding: Finding | null) => void;
  wipe: () => void;
}

const Ctx = createContext<ScanState | null>(null);

export function ScanProvider({ children }: { children: ReactNode }) {
  const [result, setResult] = useState<ScanResult | null>(null);
  const [demo, setDemo] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [selectedFinding, setSelectedFinding] = useState<Finding | null>(null);
  const [aiEnabled, setAiEnabled] = useState(false);

  const loadDemo = useCallback(() => {
    setScanning(true);
    window.setTimeout(() => {
      const scan = harbourlineDemoScan();
      setResult(scan);
      setDemo(true);
      setAiEnabled(true);
      setScanning(false);
    }, 2400);
  }, []);

  const wipe = useCallback(() => {
    setResult(null);
    setDemo(false);
    setSelectedFinding(null);
    setAiEnabled(false);
  }, []);

  const value = useMemo<ScanState>(
    () => ({
      result,
      demo,
      scanning,
      selectedFinding,
      privacyLog: [
        {
          time: new Date().toISOString(),
          method: 'GET',
          destination: windowLocation(),
          category: 'same-origin document',
          bytes: 0,
        },
      ],
      aiEnabled,
      loadDemo,
      selectFinding: setSelectedFinding,
      wipe,
    }),
    [result, demo, scanning, selectedFinding, aiEnabled, loadDemo, wipe],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

function windowLocation(): string {
  if (typeof window === 'undefined') return 'https://localhost';
  return window.location.origin;
}

export function useScan(): ScanState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('ScanProvider missing');
  return ctx;
}
