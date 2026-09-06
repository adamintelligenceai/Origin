import type { EtoroClientPortfolio } from "./types.js";

/** Origin's domain shape for a single open position. */
export interface PositionSummary {
  positionId: number;
  instrumentId: number;
  symbol?: string;
  direction: "buy" | "sell";
  leverage: number;
  invested: number;
  openRate: number;
  profitLoss: number;
}

export interface MirrorSummary {
  mirrorId: number;
  parentCid: number;
  invested: number;
  profitLoss: number;
}

/** Aggregated, display-ready account snapshot. */
export interface AccountSnapshot {
  availableCash: number;
  totalInvested: number;
  profitLoss: number;
  equity: number;
  openPositions: number;
  pendingOrders: number;
  positions: PositionSummary[];
  mirrors: MirrorSummary[];
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/**
 * Derive an account snapshot from a raw `clientPortfolio`.
 *
 * Formulas (account currency):
 *  - Available Cash  = credit
 *  - Total Invested  = Σ position.amount + Σ mirror.amount   (margin committed)
 *  - Profit / Loss   = Σ position.unrealizedPnL.pnL + Σ mirror.unrealizedPnL.pnL
 *  - Equity          = Available Cash + Total Invested + Profit / Loss
 *
 * `unrealizedPnL` is optional-chained because it is absent for closed or
 * historical entries.
 */
export function computeSnapshot(
  portfolio: EtoroClientPortfolio,
  instrumentNames: Record<number, string> = {},
): AccountSnapshot {
  const positions: PositionSummary[] = portfolio.positions.map((p) => ({
    positionId: p.positionID,
    instrumentId: p.instrumentID,
    symbol: instrumentNames[p.instrumentID],
    direction: p.isBuy ? "buy" : "sell",
    leverage: p.leverage,
    invested: round2(p.amount),
    openRate: p.openRate,
    profitLoss: round2(p.unrealizedPnL?.pnL ?? 0),
  }));

  const mirrors: MirrorSummary[] = portfolio.mirrors.map((m) => ({
    mirrorId: m.mirrorID,
    parentCid: m.parentCID,
    invested: round2(m.amount),
    profitLoss: round2(m.unrealizedPnL?.pnL ?? 0),
  }));

  const totalInvested = round2(
    positions.reduce((sum, p) => sum + p.invested, 0) +
      mirrors.reduce((sum, m) => sum + m.invested, 0),
  );

  const profitLoss = round2(
    positions.reduce((sum, p) => sum + p.profitLoss, 0) +
      mirrors.reduce((sum, m) => sum + m.profitLoss, 0),
  );

  const availableCash = round2(portfolio.credit);
  const equity = round2(availableCash + totalInvested + profitLoss);

  return {
    availableCash,
    totalInvested,
    profitLoss,
    equity,
    openPositions: positions.length,
    pendingOrders: portfolio.ordersForOpen.length + portfolio.orders.length,
    positions,
    mirrors,
  };
}
