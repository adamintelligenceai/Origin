export function RedInkBar({
  detectedShare,
  modelledShare,
  label,
}: {
  detectedShare: number;
  modelledShare: number;
  label: string;
}) {
  const detected = Math.max(0, Math.min(100, detectedShare));
  const modelled = Math.max(0, Math.min(100 - detected, modelledShare));
  return (
    <div className="space-y-2">
      <p className="text-sm text-ink-2">{label}</p>
      <div
        className="flex h-4 overflow-hidden rounded-sm border border-ruling-soft bg-ruling-soft"
        role="img"
        aria-label={`Detected leakage ${detected} percent, modelled opportunity ${modelled} percent`}
      >
        <div className="h-full bg-red-ink" style={{ width: `${detected}%` }} />
        <div className="h-full hatched-opportunity" style={{ width: `${modelled}%` }} />
      </div>
      <div className="flex gap-4 text-xs text-ink-2">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2 bg-red-ink" aria-hidden="true" />
          Detected leakage
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2 hatched-opportunity border border-red-ink" aria-hidden="true" />
          Modelled opportunity
        </span>
      </div>
    </div>
  );
}
