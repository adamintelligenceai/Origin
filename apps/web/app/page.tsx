import { brand } from "../config/brand";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-ruling-soft bg-folio px-6 py-4">
        <p className="text-lg font-semibold tracking-tight text-ink">{brand.productName}</p>
      </header>
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {brand.heroPromise}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-2">{brand.oneLine}</p>
        <p className="mt-4 text-sm text-ruling">
          Transaction files are processed locally on your computer. Every finding is traceable to
          the source.
        </p>
      </main>
      <footer className="border-t border-ruling-soft px-6 py-4 text-sm text-ink-2">
        {brand.lockup}
      </footer>
    </div>
  );
}
