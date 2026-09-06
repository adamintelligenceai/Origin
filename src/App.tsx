import { useCallback, useEffect, useState } from "react";

import { fetchPortfolio, type PortfolioResult } from "./api.js";
import { SummaryCards } from "./components/SummaryCards.js";
import { PositionsTable } from "./components/PositionsTable.js";
import { MirrorsList } from "./components/MirrorsList.js";

type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; data: PortfolioResult };

export function App(): JSX.Element {
  const [state, setState] = useState<LoadState>({ status: "loading" });

  const load = useCallback(async () => {
    setState({ status: "loading" });
    try {
      const data = await fetchPortfolio();
      setState({ status: "ready", data });
    } catch (error) {
      setState({
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="app">
      <header className="app__header">
        <div className="brand">
          <span className="brand__mark">◎</span>
          <div>
            <h1 className="brand__name">Origin</h1>
            <p className="brand__tagline">eToro portfolio dashboard</p>
          </div>
        </div>
        <div className="app__actions">
          {state.status === "ready" && (
            <span
              className={`badge badge--${state.data.mode}`}
              title={`eToro environment: ${state.data.environment}`}
            >
              {state.data.mode === "demo" ? "Demo data" : "Live account"}
            </span>
          )}
          <button
            className="button"
            onClick={() => void load()}
            disabled={state.status === "loading"}
          >
            Refresh
          </button>
        </div>
      </header>

      <main className="app__main">
        {state.status === "loading" && (
          <div className="panel panel--muted">Loading portfolio…</div>
        )}

        {state.status === "error" && (
          <div className="panel panel--error">
            <strong>Could not load portfolio.</strong>
            <p>{state.message}</p>
            <button className="button" onClick={() => void load()}>
              Try again
            </button>
          </div>
        )}

        {state.status === "ready" && (
          <>
            <SummaryCards snapshot={state.data.snapshot} />
            <section className="grid">
              <PositionsTable positions={state.data.snapshot.positions} />
              <MirrorsList mirrors={state.data.snapshot.mirrors} />
            </section>
          </>
        )}
      </main>

      <footer className="app__footer">
        Built on the eToro Public API · single source of truth:{" "}
        <code>/trading/info/&#123;env&#125;/pnl</code>
      </footer>
    </div>
  );
}
