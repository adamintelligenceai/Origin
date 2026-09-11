import Link from 'next/link';

export default function BookPage() {
  return (
    <main className="ms-ledger-bg min-h-screen px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-[var(--ink-2)]">
          ← MarginShield
        </Link>
        <h1 className="mt-6 text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
          Book a Margin Scan
        </h1>
        <p className="mt-3 text-[var(--ink-2)]">Booking integration lands with the commercial access layer (Phase 13).</p>
      </div>
    </main>
  );
}
