import type { OriginConfig } from "../config.js";
import { EtoroClient } from "./client.js";
import { mockClientPortfolio } from "./mock.js";
import { computeSnapshot, type AccountSnapshot } from "./snapshot.js";

export interface PortfolioResult {
  mode: "demo" | "live";
  environment: "demo" | "real";
  snapshot: AccountSnapshot;
}

/**
 * A tiny static instrument map for demo purposes. In live mode this would be
 * resolved via `/market-data/instruments`; here it just makes the UI readable.
 */
const DEMO_INSTRUMENT_NAMES: Record<number, string> = {
  1001: "AAPL",
  1003: "TSLA",
  1004: "MSFT",
  100000: "BTC",
};

/**
 * Resolve the current account snapshot. In demo mode this returns deterministic
 * mock data; in live mode it calls the eToro PnL endpoint with real credentials.
 */
export async function getPortfolio(
  config: OriginConfig,
): Promise<PortfolioResult> {
  if (config.demoMode || config.auth === null) {
    return {
      mode: "demo",
      environment: config.etoroEnv,
      snapshot: computeSnapshot(mockClientPortfolio(), DEMO_INSTRUMENT_NAMES),
    };
  }

  const client = new EtoroClient({
    baseUrl: config.apiBaseUrl,
    auth: config.auth,
  });
  const { clientPortfolio } = await client.getPnl(config.etoroEnv);

  return {
    mode: "live",
    environment: config.etoroEnv,
    snapshot: computeSnapshot(clientPortfolio),
  };
}
