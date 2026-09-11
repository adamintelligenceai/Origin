import { MarketingShell } from '../../components/MarketingShell';

export default function BookPage() {
  return (
    <MarketingShell>
      <article className="mx-auto max-w-xl px-6 py-16">
        <h1 className="font-display text-5xl">Book a Margin Scan</h1>
        <p className="mt-3 text-ink-2">Leave a note. No transaction files are uploaded from this form.</p>
        <form className="mt-8 space-y-4" method="post" action="/api/leads">
          <label className="block text-sm">
            Name
            <input name="name" required className="mt-1 w-full border border-ink bg-folio px-3 py-2" />
          </label>
          <label className="block text-sm">
            Work email
            <input name="email" type="email" required className="mt-1 w-full border border-ink bg-folio px-3 py-2" />
          </label>
          <label className="block text-sm">
            Company
            <input name="company" className="mt-1 w-full border border-ink bg-folio px-3 py-2" />
          </label>
          <button type="submit" className="bg-ink px-4 py-2 text-folio">
            Request a conversation
          </button>
        </form>
      </article>
    </MarketingShell>
  );
}
