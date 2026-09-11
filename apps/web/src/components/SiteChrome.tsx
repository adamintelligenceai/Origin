import Link from 'next/link';
import { brand } from '@/config/commercial';

export function SiteHeader() {
  return (
    <header className="border-b border-ruling-soft bg-folio/90 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="font-semibold tracking-tight text-ink text-lg">
          {brand.lockup}
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-ink-2 md:flex">
          <Link href="/method">Method</Link>
          <Link href="/checks">Checks</Link>
          <Link href="/privacy-by-design">Privacy</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/about">About</Link>
        </nav>
        <div className="flex items-center gap-3 text-sm">
          <Link href="/demo" className="text-ink-2 hover:text-ink">
            Demo
          </Link>
          <Link
            href="/book"
            className="border border-ink bg-ink px-3 py-1.5 text-folio hover:bg-ink-2"
          >
            Book a Margin Scan
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-ruling-soft bg-folio">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-ink-2 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <div className="font-medium text-ink">{brand.product}</div>
          <div>{brand.attribution}</div>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/legal/privacy">Privacy</Link>
          <Link href="/legal/terms">Terms</Link>
          <Link href="/privacy-by-design">Privacy by design</Link>
          <Link href="/method">Method</Link>
        </div>
      </div>
    </footer>
  );
}
