import type { MirrorSummary } from "../api.js";
import { formatCurrency, formatSignedCurrency } from "../format.js";

interface Props {
  mirrors: MirrorSummary[];
}

export function MirrorsList({ mirrors }: Props): JSX.Element {
  return (
    <div className="panel">
      <h2 className="panel__title">Copy-trading mirrors</h2>
      {mirrors.length === 0 ? (
        <p className="panel__empty">Not copying any investors.</p>
      ) : (
        <ul className="mirrors">
          {mirrors.map((mirror) => (
            <li key={mirror.mirrorId} className="mirror">
              <div className="mirror__id">
                <span className="mirror__label">Investor</span>
                <span className="mirror__cid">#{mirror.parentCid}</span>
              </div>
              <div className="mirror__stats">
                <span>{formatCurrency(mirror.invested)}</span>
                <span
                  className={mirror.profitLoss >= 0 ? "text-up" : "text-down"}
                >
                  {formatSignedCurrency(mirror.profitLoss)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
