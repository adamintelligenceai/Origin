import type { PositionSummary } from "../api.js";
import { formatCurrency, formatSignedCurrency } from "../format.js";

interface Props {
  positions: PositionSummary[];
}

export function PositionsTable({ positions }: Props): JSX.Element {
  return (
    <div className="panel">
      <h2 className="panel__title">Open positions</h2>
      {positions.length === 0 ? (
        <p className="panel__empty">No open positions.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Side</th>
              <th className="num">Leverage</th>
              <th className="num">Invested</th>
              <th className="num">Open rate</th>
              <th className="num">P / L</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position) => (
              <tr key={position.positionId}>
                <td>
                  <span className="ticker">
                    {position.symbol ?? `#${position.instrumentId}`}
                  </span>
                </td>
                <td>
                  <span className={`pill pill--${position.direction}`}>
                    {position.direction.toUpperCase()}
                  </span>
                </td>
                <td className="num">×{position.leverage}</td>
                <td className="num">{formatCurrency(position.invested)}</td>
                <td className="num">{position.openRate}</td>
                <td
                  className={`num ${
                    position.profitLoss >= 0 ? "text-up" : "text-down"
                  }`}
                >
                  {formatSignedCurrency(position.profitLoss)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
