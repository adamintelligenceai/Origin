import type { AccountSnapshot } from "../api.js";
import { formatCurrency, formatSignedCurrency } from "../format.js";

interface Props {
  snapshot: AccountSnapshot;
}

export function SummaryCards({ snapshot }: Props): JSX.Element {
  const pnlPositive = snapshot.profitLoss >= 0;

  return (
    <section className="cards" aria-label="Account summary">
      <article className="card card--primary">
        <span className="card__label">Equity</span>
        <span className="card__value">{formatCurrency(snapshot.equity)}</span>
        <span className="card__meta">
          {snapshot.openPositions} open · {snapshot.pendingOrders} pending
        </span>
      </article>

      <article className="card">
        <span className="card__label">Available cash</span>
        <span className="card__value">
          {formatCurrency(snapshot.availableCash)}
        </span>
      </article>

      <article className="card">
        <span className="card__label">Total invested</span>
        <span className="card__value">
          {formatCurrency(snapshot.totalInvested)}
        </span>
      </article>

      <article className={`card ${pnlPositive ? "card--up" : "card--down"}`}>
        <span className="card__label">Profit / Loss</span>
        <span className="card__value">
          {formatSignedCurrency(snapshot.profitLoss)}
        </span>
      </article>
    </section>
  );
}
