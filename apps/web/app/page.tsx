import { MarketingShell } from "@/components/shell/marketing-shell";
import { brand } from "@/config/brand";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <MarketingShell>
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-20">
        <h1 className="font-display text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
          {brand.heroPromise}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-2">{brand.oneLine}</p>
        <p className="mt-4 text-sm text-ink-2">
          Transaction files are processed locally on your computer. Every finding is traceable to
          the source.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/demo">Run the demo scan</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/book">Book a Margin Scan</Link>
          </Button>
        </div>
      </main>
    </MarketingShell>
  );
}
