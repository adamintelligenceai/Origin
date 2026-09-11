import { MarketingShell } from "@/components/shell/marketing-shell";

export default function DemoPlaceholder() {
  return (
    <MarketingShell>
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-4xl">Demo scan</h1>
        <p className="mt-4 text-ink-2">
          The Harbourline demo scan is wired to the local engine in later phases. This page is a
          route placeholder so the marketing call-to-action is not a dead control.
        </p>
      </main>
    </MarketingShell>
  );
}
