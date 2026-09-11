'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  decryptProject,
  defaultMethodConfig,
  encryptProject,
  prepareUploads,
  projectFromScan,
  runScan,
  type CanonicalDataset,
  type HealthIssue,
  type MethodConfig,
  type PreparedTable,
  type RecoveryEntry,
  type ScanResult,
  type SemanticConfirmation,
  type TableRole,
  DEFAULT_SEMANTICS,
} from '@marginshield/engine';
import type { Finding } from '@marginshield/engine';
import { harbourlineDemoBundle, harbourlineMessyFiles } from '../lib/harbourline';
import { runScanClient } from '../lib/runScanClient';

interface ScanState {
  result: ScanResult | null;
  dataset: CanonicalDataset | null;
  demo: boolean;
  scanning: boolean;
  selectedFinding: Finding | null;
  privacyLog: { time: string; method: string; destination: string; category: string; bytes: number }[];
  aiEnabled: boolean;
  setAiEnabled: (value: boolean) => void;
  wizardStep: 'files' | 'mapping' | 'health' | 'tieout' | 'done';
  setWizardStep: (step: ScanState['wizardStep']) => void;
  prepared: PreparedTable[];
  health: HealthIssue[];
  semantics: SemanticConfirmation;
  error: string | null;
  recovery: RecoveryEntry[];
  methodConfig: MethodConfig;
  loadDemo: () => void;
  loadMessyWizard: () => void;
  addFiles: (files: FileList | File[]) => Promise<void>;
  updateMapping: (tableName: string, source: string, target: string) => void;
  setTableRole: (tableName: string, role: TableRole) => void;
  setSemantics: (semantics: SemanticConfirmation) => void;
  previewHealth: () => Promise<void>;
  runCalculate: (knownSales?: string, confirmed?: boolean) => Promise<void>;
  recalculate: (config: MethodConfig) => void;
  selectFinding: (finding: Finding | null) => void;
  addToRecovery: (finding: Finding) => void;
  updateRecovery: (findingId: string, patch: Partial<RecoveryEntry>) => void;
  exportProject: (passphrase: string, includeRaw: boolean) => Promise<void>;
  importProject: (file: File, passphrase: string) => Promise<void>;
  wipe: () => void;
}

const Ctx = createContext<ScanState | null>(null);

export function ScanProvider({ children }: { children: ReactNode }) {
  const [result, setResult] = useState<ScanResult | null>(null);
  const [dataset, setDataset] = useState<CanonicalDataset | null>(null);
  const [demo, setDemo] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [selectedFinding, setSelectedFinding] = useState<Finding | null>(null);
  const [aiEnabled, setAiEnabled] = useState(false);
  const [wizardStep, setWizardStep] = useState<ScanState['wizardStep']>('files');
  const [prepared, setPrepared] = useState<PreparedTable[]>([]);
  const [health, setHealth] = useState<HealthIssue[]>([]);
  const [semantics, setSemantics] = useState<SemanticConfirmation>(DEFAULT_SEMANTICS);
  const [sourceTexts, setSourceTexts] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [recovery, setRecovery] = useState<RecoveryEntry[]>([]);
  const [methodConfig, setMethodConfig] = useState<MethodConfig>(defaultMethodConfig);

  const loadDemo = useCallback(() => {
    setScanning(true);
    setError(null);
    window.setTimeout(() => {
      const bundle = harbourlineDemoBundle();
      setDataset(bundle.dataset);
      setResult(bundle.result);
      setMethodConfig(bundle.dataset.method_config);
      setDemo(true);
      setAiEnabled(true);
      setScanning(false);
      setWizardStep('done');
    }, 2400);
  }, []);

  const loadMessyWizard = useCallback(() => {
    setError(null);
    const files = harbourlineMessyFiles();
    const preparedTables = prepareUploads(Object.entries(files).map(([name, text]) => ({ name, text })));
    setPrepared(preparedTables);
    setSourceTexts(files);
    setDemo(true);
    setWizardStep('mapping');
  }, []);

  const addFiles = useCallback(async (list: FileList | File[]) => {
    setError(null);
    const incoming = [...list];
    const uploads: { name: string; text?: string; buffer?: ArrayBuffer }[] = [];
    const texts: Record<string, string> = { ...sourceTexts };
    for (const file of incoming) {
      if (file.name.toLowerCase().endsWith('.csv')) {
        const text = await file.text();
        uploads.push({ name: file.name, text });
        texts[file.name] = text;
      } else {
        const buffer = await file.arrayBuffer();
        uploads.push({ name: file.name, buffer });
      }
    }
    try {
      const next = prepareUploads(uploads);
      setPrepared((prev) => [...prev.filter((row) => !next.some((n) => n.name === row.name)), ...next]);
      setSourceTexts(texts);
      setDemo(false);
      setWizardStep('mapping');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'File rejected');
    }
  }, [sourceTexts]);

  const updateMapping = useCallback((tableName: string, source: string, target: string) => {
    setPrepared((prev) =>
      prev.map((row) =>
        row.name === tableName ? { ...row, mapping: { ...row.mapping, [source]: target } } : row,
      ),
    );
  }, []);

  const setTableRole = useCallback((tableName: string, role: TableRole) => {
    setPrepared((prev) => prev.map((row) => (row.name === tableName ? { ...row, role } : row)));
  }, []);

  const previewHealth = useCallback(async () => {
    setScanning(true);
    setError(null);
    try {
      const output = await runScanClient({
        tables: prepared,
        semantics,
        method_config: methodConfig,
        sales_tieout_confirmed: false,
        source_texts: sourceTexts,
      });
      setDataset(output.dataset);
      setHealth(output.health);
      setWizardStep('health');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Health preview failed');
    } finally {
      setScanning(false);
    }
  }, [prepared, semantics, methodConfig, sourceTexts]);

  const runCalculate = useCallback(
    async (knownSales?: string, confirmed = true) => {
      setScanning(true);
      setError(null);
      try {
        const output = await runScanClient({
          tables: prepared,
          semantics,
          method_config: methodConfig,
          sales_tieout_confirmed: confirmed,
          known_sales_total: knownSales,
          source_texts: sourceTexts,
        });
        setDataset(output.dataset);
        setResult(output.result);
        setHealth(output.health);
        setWizardStep('done');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Scan failed');
      } finally {
        setScanning(false);
      }
    },
    [prepared, semantics, methodConfig, sourceTexts],
  );

  const recalculate = useCallback(
    (config: MethodConfig) => {
      if (!dataset) return;
      const next: CanonicalDataset = { ...structuredClone(dataset), method_config: config };
      setMethodConfig(config);
      setDataset(next);
      setResult(runScan(next));
    },
    [dataset],
  );

  const wipe = useCallback(() => {
    setResult(null);
    setDataset(null);
    setDemo(false);
    setSelectedFinding(null);
    setAiEnabled(false);
    setWizardStep('files');
    setPrepared([]);
    setHealth([]);
    setSourceTexts({});
    setRecovery([]);
    setError(null);
    setMethodConfig(defaultMethodConfig());
  }, []);

  const addToRecovery = useCallback((finding: Finding) => {
    setRecovery((prev) => {
      if (prev.some((row) => row.finding_id === finding.finding_id)) return prev;
      return [...prev, { finding_id: finding.finding_id, status: 'ACTION_PLANNED', owner: '', realized_confirmed: false }];
    });
  }, []);

  const updateRecovery = useCallback((findingId: string, patch: Partial<RecoveryEntry>) => {
    setRecovery((prev) => prev.map((row) => (row.finding_id === findingId ? { ...row, ...patch } : row)));
  }, []);

  const exportProject = useCallback(
    async (passphrase: string, includeRaw: boolean) => {
      if (!result || !dataset) throw new Error('No scan to export');
      const envelope = await encryptProject(
        projectFromScan(result, {
          mapping: dataset.mapping_profile,
          method_config: dataset.method_config,
          outcomes: recovery,
          dataset: includeRaw ? dataset : undefined,
        }),
        passphrase,
      );
      const blob = new Blob([JSON.stringify(envelope)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'marginshield.msproj';
      a.click();
      URL.revokeObjectURL(url);
    },
    [result, dataset, recovery],
  );

  const importProject = useCallback(async (file: File, passphrase: string) => {
    const envelope = JSON.parse(await file.text());
    const payload = await decryptProject(envelope, passphrase);
    setMethodConfig(payload.method_config);
    setRecovery(payload.outcomes);
    if (payload.dataset) {
      setDataset(payload.dataset);
      setResult(runScan({ ...payload.dataset, method_config: payload.method_config }));
    } else {
      setResult({
        run_hash: payload.run_hash,
        engine_version: payload.engine_version,
        method_version: payload.method_version,
        period: payload.period,
        reporting_currency: 'AUD',
        headlines: payload.headlines,
        coverage: { score: payload.headlines.coverage, components: {} as ScanResult['coverage']['components'], missing: [] },
        findings: payload.findings,
        evidence: payload.evidence,
        waterfall: {
          gross_list_value: '0.0000',
          invoice_revenue: payload.headlines.t12m_net_sales,
          pocket_revenue: '0.0000',
          true_landed_cost: '0.0000',
          pocket_contribution: '0.0000',
          economic_contribution: '0.0000',
        },
        customers: [],
        sales_tieout_confirmed: true,
        limited_history: false,
        duplicates: [],
      });
    }
    setWizardStep('done');
  }, []);

  const value = useMemo<ScanState>(
    () => ({
      result,
      dataset,
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
      setAiEnabled,
      wizardStep,
      setWizardStep,
      prepared,
      health,
      semantics,
      error,
      recovery,
      methodConfig,
      loadDemo,
      loadMessyWizard,
      addFiles,
      updateMapping,
      setTableRole,
      setSemantics,
      previewHealth,
      runCalculate,
      recalculate,
      selectFinding: setSelectedFinding,
      addToRecovery,
      updateRecovery,
      exportProject,
      importProject,
      wipe,
    }),
    [
      result,
      dataset,
      demo,
      scanning,
      selectedFinding,
      aiEnabled,
      wizardStep,
      prepared,
      health,
      semantics,
      error,
      recovery,
      methodConfig,
      loadDemo,
      loadMessyWizard,
      addFiles,
      updateMapping,
      setTableRole,
      previewHealth,
      runCalculate,
      recalculate,
      addToRecovery,
      updateRecovery,
      exportProject,
      importProject,
      wipe,
    ],
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
