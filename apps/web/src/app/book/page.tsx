export const metadata = { title: 'Book a Margin Scan' };

export default function BookPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-12 md:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Book a Margin Scan</h1>
      <p className="mt-3 text-ink-2">
        Tell us about your distribution business. We&apos;ll confirm whether a MarginShield scan is
        a fit — using the exports you already produce.
      </p>
      <form className="mt-8 space-y-4" action="/api/leads" method="post">
        <Field label="Name" name="name" required />
        <Field label="Work email" name="email" type="email" required />
        <Field label="Company" name="company" required />
        <Field label="Approximate annual revenue (AUD)" name="revenue" />
        <label className="block text-sm">
          <span className="text-ink-2">What prompted you to look?</span>
          <textarea
            name="notes"
            rows={4}
            className="mt-1 w-full border border-ruling-soft bg-folio px-3 py-2"
          />
        </label>
        <button type="submit" className="border border-ink bg-ink px-4 py-2 text-folio">
          Request a conversation
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm">
      <span className="text-ink-2">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-1 w-full border border-ruling-soft bg-folio px-3 py-2"
      />
    </label>
  );
}
