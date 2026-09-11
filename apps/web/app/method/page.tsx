import Link from 'next/link';

export default function MethodPage() {
  return (
    <main className="ms-ledger-bg min-h-screen px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-[var(--ink-2)]">
          ← MarginShield
        </Link>
        <h1 className="mt-6 text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
          Method
        </h1>
        <p className="mt-3 text-[var(--ink-2)]">MarginShield reconstructs transaction economics, classifies findings by evidence, and plans bankable actions. Full method pages land in Phase 12.</p>
      </div>
    </main>
  );
}
