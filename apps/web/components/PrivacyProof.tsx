'use client';

import { useState } from 'react';
import { useScan } from './ScanProvider';

export function PrivacyProof({ variant = 'inline' }: { variant?: 'inline' | 'mobile' }) {
  const { privacyLog, aiEnabled, wipe } = useScan();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className={
          variant === 'mobile'
            ? 'border border-ink bg-folio px-2 py-1 text-xs md:hidden'
            : 'w-full border border-ink bg-folio px-3 py-2 text-left text-sm'
        }
        onClick={() => setOpen(true)}
      >
        Privacy Proof
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
          <div className="max-h-[80vh] w-full max-w-xl overflow-auto bg-folio p-6">
            <h2 className="font-display text-2xl">Privacy Proof</h2>
            <p className="mt-2 text-sm text-ink-2">
              Application network activity initiated by MarginShield. This does not represent every browser or network
              operation outside application control.
            </p>
            <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div>Raw-row uploads</div>
              <div className="tabular-nums">0</div>
              <div>AI commentary</div>
              <div>{aiEnabled ? 'On (demo aggregates)' : 'Off'}</div>
              <div>Customer identifiers sent to AI</div>
              <div className="tabular-nums">0</div>
              <div>Transaction rows sent to AI</div>
              <div className="tabular-nums">0</div>
            </dl>
            <h3 className="mt-4 font-display text-lg">Allowed destinations</h3>
            <p className="text-sm">Same origin only for scan processing.</p>
            <table className="mt-4 w-full text-left text-sm">
              <thead>
                <tr className="ledger-rule">
                  <th>Time</th>
                  <th>Method</th>
                  <th>Destination</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {privacyLog.map((row) => (
                  <tr key={row.time} className="ledger-rule">
                    <td>{row.time.slice(11, 19)}</td>
                    <td>{row.method}</td>
                    <td>{row.destination}</td>
                    <td>{row.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6 flex gap-3">
              <button type="button" className="bg-red-ink px-3 py-2 text-folio" onClick={wipe}>
                Delete local scan data
              </button>
              <button type="button" className="border border-ink px-3 py-2" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
