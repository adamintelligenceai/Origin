import { MarketingShell } from "@/components/shell/marketing-shell";

export default function BookPlaceholder() {
  return (
    <MarketingShell>
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-4xl">Book a Margin Scan</h1>
        <p className="mt-4 text-ink-2">
          Booking and Stripe checkout are implemented in the commercial access phase. No payment is
          taken from this page.
        </p>
      </main>
    </MarketingShell>
  );
}
