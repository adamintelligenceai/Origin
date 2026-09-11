import { CHECK_META } from '@marginshield/schemas';

export const metadata = { title: 'Checks' };

export default function ChecksPage() {
  const checks = Object.entries(CHECK_META);
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Checks</h1>
      <p className="mt-3 text-ink-2">
        Each check asks a precise commercial question and returns a classified finding with evidence
        grade — never a black-box score.
      </p>
      <div className="mt-8 space-y-3">
        {checks.map(([id, meta]) => (
          <div key={id} className="border border-ruling-soft bg-folio p-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-semibold">{id}</span>
              <span className="text-xs uppercase tracking-[0.14em] text-ruling">{meta.family}</span>
            </div>
            <p className="mt-2 text-sm text-ink-2">{meta.question}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
