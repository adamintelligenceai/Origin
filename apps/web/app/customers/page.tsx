'use client';

import Link from 'next/link';
import { AppShell } from '../../components/AppShell';
import { useEnsureScan } from '../../components/useEnsureScan';
import { formatAud } from '@marginshield/ui';

export default function CustomersPage() {
  const result = useEnsureScan();
  const rows = [...result.customers].sort((a, b) => Number(b.revenue) - Number(a.revenue));
  return (
    <AppShell>
      <h1 className="font-display text-4xl">Customers</h1>
      <table className="mt-6 w-full text-left text-sm">
        <thead>
          <tr className="ledger-rule">
            <th>Customer</th>
            <th className="text-right">Revenue</th>
            <th className="text-right">Detected</th>
            <th className="text-right">Modelled</th>
            <th>Risk</th>
          </tr>
        </thead>
        <tbody>
          {rows.slice(0, 40).map((c) => (
            <tr key={c.customer_id} className="ledger-rule">
              <td>
                <Link href={`/customers/${c.customer_id}`} className="underline">
                  {c.name}
                </Link>
              </td>
              <td className="text-right">{formatAud(c.revenue, true)}</td>
              <td className="text-right">{formatAud(c.detected_leakage, true)}</td>
              <td className="text-right">{formatAud(c.modelled_opportunity, true)}</td>
              <td>
                {c.risk_band} ({c.risk_score})
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AppShell>
  );
}
