export function RedInkBar({
  detectedShare,
  modelledShare,
  label,
}: {
  detectedShare: number;
  modelledShare: number;
  label?: string;
}) {
  const detected = Math.max(0, Math.min(1, detectedShare)) * 100;
  const modelled = Math.max(0, Math.min(1, modelledShare)) * 100;
  return (
    <div aria-label={label ?? 'Leakage composition'}>
      <div className="flex h-3 w-full overflow-hidden border border-[var(--ruling-soft)] bg-[var(--folio)]">
        <div
          style={{ width: `${detected}%`, background: 'var(--red-ink)' }}
          title="Detected leakage"
        />
        <div
          className="ms-hatch"
          style={{ width: `${modelled}%`, background: 'transparent' }}
          title="Modelled margin opportunity"
        />
      </div>
      <p className="mt-1 text-xs text-[var(--ink-2)]">
        Solid red = detected leakage · Hatched = modelled opportunity
      </p>
    </div>
  );
}
