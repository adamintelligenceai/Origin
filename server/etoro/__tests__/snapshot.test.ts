import { describe, expect, it } from "vitest";

import { mockClientPortfolio } from "../mock.js";
import { computeSnapshot } from "../snapshot.js";
import type { EtoroClientPortfolio } from "../types.js";

describe("computeSnapshot", () => {
  it("aggregates cash, invested, P/L and equity from the mock portfolio", () => {
    const snapshot = computeSnapshot(mockClientPortfolio(), { 1001: "AAPL" });

    // positions: 1500 + 1200 + 800; mirrors: 2000
    expect(snapshot.totalInvested).toBe(5500);
    // P/L: 212.34 - 87.9 + 0 (closed leg) + 143.02
    expect(snapshot.profitLoss).toBe(267.46);
    expect(snapshot.availableCash).toBe(4250.75);
    // equity = cash + invested + pnl
    expect(snapshot.equity).toBe(4250.75 + 5500 + 267.46);
    expect(snapshot.openPositions).toBe(3);
    expect(snapshot.pendingOrders).toBe(1);
    expect(snapshot.positions[0].symbol).toBe("AAPL");
  });

  it("treats a missing unrealizedPnL (closed leg) as zero P/L", () => {
    const portfolio: EtoroClientPortfolio = {
      credit: 100,
      positions: [
        {
          positionID: 1,
          instrumentID: 1,
          isBuy: true,
          leverage: 1,
          amount: 500,
          units: 1,
          openRate: 10,
          // no unrealizedPnL
        },
      ],
      mirrors: [],
      orders: [],
      ordersForOpen: [],
    };

    const snapshot = computeSnapshot(portfolio);
    expect(snapshot.profitLoss).toBe(0);
    expect(snapshot.equity).toBe(600);
    expect(snapshot.positions[0].direction).toBe("buy");
  });
});
