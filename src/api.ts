import type { PortfolioResult } from "../server/etoro/service.js";

export type { PortfolioResult };
export type {
  AccountSnapshot,
  PositionSummary,
  MirrorSummary,
} from "../server/etoro/snapshot.js";

export async function fetchPortfolio(): Promise<PortfolioResult> {
  const response = await fetch("/api/portfolio");
  if (!response.ok) {
    throw new Error(`Failed to load portfolio (${response.status})`);
  }
  return (await response.json()) as PortfolioResult;
}
