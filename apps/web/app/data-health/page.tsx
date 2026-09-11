'use client';

import { AppShell } from '../../components/AppShell';
import { useEnsureScan } from '../../components/useEnsureScan';
import { formatPct } from '@marginshield/ui';

export default function DataHealthPage() {
  const result = useEnsureScan();
  return (
    <AppShell>
      <h1 className="font-display text-4xl">Data health</h1>
      <ul className="mt-6 space-y-2 text-sm">
        <li>Economic coverage {result.headlines.coverage}%</li>
        <li>T12M net sales {result.headlines.t12m_net_sales}</li>
        <li>{result.sales_tieout_confirmed ? 'Sales tie-out confirmed' : 'Sales tie-out not confirmed'}</li>
        <li>Limited history {result.limited_history ? 'yes' : 'no'}</li>
        <li>Ambiguous duplicates {result.duplicates.length}</li>
        <li>Missing coverage components: {result.coverage.missing.join(', ') || 'none above 90%'}</li>
      </ul>
      <table className="mt-8 w-full text-left text-sm">
        <thead>
          <tr className="ledger-rule">
            <th>Component</th>
            <th className="text-right">Weight</th>
            <th className="text-right">Available</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(result.coverage.components).map(([key, row]) => (
            <tr key={key} className="ledger-rule">
              <td>{key.replaceAll('_', ' ')}</td>
              <td className="text-right tabular-nums">{row.weight}</td>
              <td className="text-right tabular-nums">{formatPct(row.available)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AppShell>
  );
}
