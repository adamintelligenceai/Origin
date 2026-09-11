export default function DemoPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-display text-4xl font-semibold text-ink">Demo scan</h1>
      <p className="mt-4 text-ink-2">
        Harbourline Trade Supply Pty Ltd —{' '}
        <span className="font-medium text-ink">Fictional demonstration company</span>
      </p>
      <p className="mt-6 rounded-lg border border-ruling-soft bg-ledger/50 p-6 text-sm text-ink-2">
        The full browser-local scan workflow will be available after Phase 3. This foundation build
        confirms the monorepo, design tokens and shared calculation packages are in place.
      </p>
    </main>
  );
}
