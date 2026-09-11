import { formatAud } from '@marginshield/ui';
import { MarketingShell } from '../../components/MarketingShell';

export default function StyleguidePage() {
  return (
    <MarketingShell>
      <article className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="font-display text-5xl">Ledger styleguide</h1>
        <p className="mt-3 text-ink-2">Industrial distributor + accountant&apos;s ledger. Tokens only.</p>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {['ledger', 'folio', 'ink', 'ink-2', 'ruling', 'red-ink', 'bank', 'manila'].map((name) => (
            <div key={name} className="border border-ruling-soft p-3">
              <div className="mb-2 h-10" style={{ background: `var(--color-${name})` }} />
              <div className="text-xs">{name}</div>
            </div>
          ))}
        </div>
        <p className="mt-8 font-display text-4xl">{formatAud(796000, true)} detected · hatched modelled</p>
        <div className="mt-4 h-6 bg-red-ink" />
        <div className="hatched mt-2 h-6 border border-dashed border-red-ink" />
        <div className="mt-2 h-6 border-2 border-bank" />
      </article>
    </MarketingShell>
  );
}
