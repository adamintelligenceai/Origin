import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-folio">
      <header className="border-b border-ruling-soft bg-ledger px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span className="font-display text-2xl font-semibold tracking-tight text-ink">
            MarginShield
          </span>
          <nav className="flex gap-6 text-sm text-ink-2">
            <Link href="/method" className="hover:text-ink">
              Method
            </Link>
            <Link href="/demo" className="hover:text-ink">
              Demo
            </Link>
            <Link href="/pricing" className="hover:text-ink">
              Pricing
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-sm text-ruling">Commercial margin control</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-tight text-ink md:text-6xl">
          Protect every point of margin.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-ink-2">
          Find evidence-backed leakage and commercial margin opportunities across every customer and
          product—without replacing your ERP.
        </p>
        <p className="mt-4 text-sm text-ruling">
          Transaction files are processed locally on your computer. Every finding is traceable to the
          source.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/demo"
            className="rounded bg-ink px-6 py-3 text-sm font-medium text-folio hover:bg-ink-2"
          >
            Run the demo scan
          </Link>
          <Link
            href="/book"
            className="rounded border border-ruling-soft bg-folio px-6 py-3 text-sm font-medium text-ink hover:bg-ledger"
          >
            Book a Margin Scan
          </Link>
        </div>
      </section>

      <footer className="border-t border-ruling-soft px-6 py-8 text-center text-sm text-ruling">
        MarginShield by Evidence Room
      </footer>
    </main>
  );
}
