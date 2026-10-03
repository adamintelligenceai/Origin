/**
 * Wire types for the eToro PnL endpoint (`GET /trading/info/{env}/pnl`).
 *
 * The endpoint is misleadingly named: it returns the entire account state in a
 * single `clientPortfolio` object. Field casing here mirrors the wire format
 * exactly (capital-suffix identifiers such as `instrumentID`), and is only
 * translated to Origin's domain shape at the snapshot boundary.
 */

export interface EtoroPosition {
  positionID: number;
  instrumentID: number;
  isBuy: boolean;
  leverage: number;
  /** Amount of account currency committed as margin. */
  amount: number;
  units: number;
  openRate: number;
  /**
   * Live PnL is nested and can be absent for closed/historical positions.
   * The inner key is `pnL` (lowercase n, capital L).
   */
  unrealizedPnL?: {
    pnL: number;
  };
}

export interface EtoroMirror {
  mirrorID: number;
  parentCID: number;
  amount: number;
  unrealizedPnL?: {
    pnL: number;
  };
}

export interface EtoroOrder {
  orderID: number;
  instrumentID: number;
  isBuy: boolean;
  amount: number;
  rate: number;
}

export interface EtoroClientPortfolio {
  credit: number;
  positions: EtoroPosition[];
  mirrors: EtoroMirror[];
  orders: EtoroOrder[];
  ordersForOpen: EtoroOrder[];
}

export interface EtoroPnlResponse {
  clientPortfolio: EtoroClientPortfolio;
}
