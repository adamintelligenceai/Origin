'use client';

import { AppShell } from '../../components/AppShell';
import { useEnsureScan } from '../../components/useEnsureScan';
import { formatAud } from '@marginshield/ui';

export default function ProductsPage() {
  const result = useEnsureScan();
  const bySku = new Map<string, number>();
  for (const f of result.findings) {
    if (!f.sku) continue;
    bySku.set(f.sku, (bySku.get(f.sku) ?? 0) + Number(f.allocated_value));
  }
  const rows = [...bySku.entries()].sort((a, b) => b[1] - a[1]).slice(0, 30);
  return (
    <AppShell>
      <h1 className="font-display text-4xl">Products</h1>
      <table className="mt-6 w-full text-left text-sm">
        <thead>
          <tr className="ledger-rule">
            <th>SKU</th>
            <th className="text-right">Allocated findings</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([sku, amount]) => (
            <tr key={sku} className="ledger-rule">
              <td>{sku}</td>
              <td className="text-right">{formatAud(amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AppShell>
  );
}
