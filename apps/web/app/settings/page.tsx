'use client';

import { AppShell } from '../../components/AppShell';
import { useScan } from '../../components/ScanProvider';
import { useState } from 'react';

export default function SettingsPage() {
  const { aiEnabled, setAiEnabled, wipe, demo, exportProject, importProject, result } = useScan();
  const [passphrase, setPassphrase] = useState('');
  const [includeRaw, setIncludeRaw] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  return (
    <AppShell>
      <h1 className="font-display text-4xl">Settings</h1>
      <ul className="mt-6 space-y-2 text-sm">
        <li>Mode {demo ? 'Harbourline demonstration' : result ? 'live scan' : 'empty'}</li>
      </ul>
      <label className="mt-6 flex items-center gap-2 text-sm">
        <input type="checkbox" checked={aiEnabled} onChange={(e) => setAiEnabled(e.target.checked)} />
        AI commentary (aggregates only; off by default for live scans)
      </label>
      <h2 className="mt-10 font-display text-2xl">Encrypted project</h2>
      <p className="mt-2 text-sm text-ink-2">
        `.msproj` uses Argon2id and AES-256-GCM. The passphrase never leaves this device. There is no recovery.
      </p>
      <div className="mt-4 max-w-md space-y-3 text-sm">
        <label className="block">
          Passphrase
          <input
            type="password"
            className="mt-1 w-full border border-ink bg-folio px-3 py-2"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
          />
        </label>
        <label className="flex gap-2">
          <input type="checkbox" checked={includeRaw} onChange={(e) => setIncludeRaw(e.target.checked)} />
          Include raw normalised tables (opt-in)
        </label>
        {includeRaw ? (
          <p className="text-red-ink">Raw tables make the file a complete copy of the scan dataset. Store it as carefully as the source files.</p>
        ) : null}
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="bg-ink px-4 py-2 text-folio"
            disabled={!result || !passphrase}
            onClick={() => {
              void exportProject(passphrase, includeRaw)
                .then(() => setMessage('Project downloaded.'))
                .catch((err: unknown) => setMessage(err instanceof Error ? err.message : 'Export failed'));
            }}
          >
            Download .msproj
          </button>
          <label className="border border-ink px-4 py-2">
            Open .msproj
            <input
              type="file"
              accept=".msproj,application/json"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                void importProject(file, passphrase)
                  .then(() => setMessage('Project opened locally.'))
                  .catch((err: unknown) => setMessage(err instanceof Error ? err.message : 'Open failed'));
              }}
            />
          </label>
        </div>
        {message ? <p>{message}</p> : null}
      </div>
      <button type="button" className="mt-10 border border-red-ink px-4 py-2 text-red-ink" onClick={wipe}>
        Delete local scan data
      </button>
    </AppShell>
  );
}
