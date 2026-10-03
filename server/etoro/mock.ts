import type { EtoroClientPortfolio } from "./types.js";

/**
 * Deterministic sample portfolio used in demo mode. Mirrors the wire shape of
 * a real `clientPortfolio` so the same snapshot code path is exercised without
 * network access or credentials.
 */
export function mockClientPortfolio(): EtoroClientPortfolio {
  return {
    credit: 4250.75,
    positions: [
      {
        positionID: 1001,
        instrumentID: 1001, // AAPL
        isBuy: true,
        leverage: 1,
        amount: 1500,
        units: 8.12,
        openRate: 184.6,
        unrealizedPnL: { pnL: 212.34 },
      },
      {
        positionID: 1002,
        instrumentID: 100000, // BTC
        isBuy: true,
        leverage: 2,
        amount: 1200,
        units: 0.031,
        openRate: 38250.0,
        unrealizedPnL: { pnL: -87.9 },
      },
      {
        positionID: 1003,
        instrumentID: 1004, // MSFT
        isBuy: false,
        leverage: 5,
        amount: 800,
        units: 2.03,
        openRate: 372.15,
        // Closed leg: no live PnL object.
      },
    ],
    mirrors: [
      {
        mirrorID: 5001,
        parentCID: 900123,
        amount: 2000,
        unrealizedPnL: { pnL: 143.02 },
      },
    ],
    orders: [],
    ordersForOpen: [
      {
        orderID: 7001,
        instrumentID: 1003, // TSLA
        isBuy: true,
        amount: 500,
        rate: 210.0,
      },
    ],
  };
}
