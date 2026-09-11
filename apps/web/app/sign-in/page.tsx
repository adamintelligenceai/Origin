import { MarketingShell } from '../../components/MarketingShell';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <MarketingShell>
      <article className="mx-auto max-w-md px-6 py-24">
        <h1 className="font-display text-4xl">Sign in</h1>
        <p className="mt-2 text-sm text-ink-2">MarginShield by Evidence Room</p>
        <form className="mt-8 space-y-4" method="post" action="/api/auth/magic">
          <label className="block text-sm">
            Work email
            <input name="email" type="email" required className="mt-1 w-full border border-ink bg-folio px-3 py-2" />
          </label>
          <button type="submit" className="w-full bg-ink px-4 py-2 text-folio">
            Email a magic link
          </button>
        </form>
        <p className="mt-6 text-sm">
          Or <Link href="/demo">run the demo scan</Link> without an account.
        </p>
      </article>
    </MarketingShell>
  );
}
