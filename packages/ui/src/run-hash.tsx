export function RunHash({ hash }: { hash: string }) {
  return (
    <code
      className="ms-tabular break-all border border-[var(--ruling-soft)] bg-[var(--folio)] px-2 py-1 text-xs"
      style={{ borderRadius: 'var(--radius-sm)' }}
      title="Deterministic run hash"
    >
      {hash}
    </code>
  );
}
