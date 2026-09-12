import { useCallback, useEffect, useMemo, useState } from "react";
import {
  commitments,
  initialDecisions,
  initialReceipts,
  people,
  type DecisionState,
  type RouteName,
  type SyntheticDecision,
  type SyntheticReceipt
} from "./fixtures/synthetic.js";
import { approveDecision } from "./utils/runtime.js";

const ROUTES: { id: RouteName; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "decisions", label: "Decisions" },
  { id: "chief", label: "Chief" },
  { id: "commitments", label: "Commitments" },
  { id: "activity", label: "Activity" },
  { id: "people", label: "People" },
  { id: "routines", label: "Routines" },
  { id: "connections", label: "Connections" },
  { id: "privacy", label: "Privacy" }
];

type Filter = "now" | "today" | "week" | "low" | "consequential";

export default function App() {
  const [route, setRoute] = useState<RouteName>("today");
  const [decisions, setDecisions] = useState(initialDecisions);
  const [receipts, setReceipts] = useState(initialReceipts);
  const [openReceipt, setOpenReceipt] = useState<SyntheticReceipt | undefined>(initialReceipts[0]);
  const [filter, setFilter] = useState<Filter>("today");
  const [chief, setChief] = useState("");
  const [focus, setFocus] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 280);
    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const visible = useMemo(
    () => decisions.filter((item) => item.filter.includes(filter) && item.state !== "dismissed"),
    [decisions, filter]
  );

  const onApprove = useCallback(
    async (id: string) => {
      const current = decisions.find((item) => item.id === id);
      if (!current || current.state === "executing" || current.state === "verified") return;
      setDecisions((items) =>
        items.map((item) => (item.id === id ? { ...item, state: "executing" } : item))
      );
      try {
        const result = await approveDecision(current, 640);
        setDecisions((items) =>
          items.map((item) => (item.id === id ? { ...item, state: result.state } : item))
        );
        setReceipts((items) => [result.receipt, ...items]);
        setOpenReceipt(result.receipt);
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : "Approval failed");
      }
    },
    [decisions]
  );

  const onDismiss = useCallback((id: string) => {
    setDecisions((items) =>
      items.map((item) => (item.id === id ? { ...item, state: "dismissed" } : item))
    );
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const index = Number(event.key) - 1;
      if (index >= 0 && index < ROUTES.length) {
        const next = ROUTES[index];
        if (next) setRoute(next.id);
      }
      if (event.key === "j")
        setFocus((value) => Math.min(value + 1, Math.max(visible.length - 1, 0)));
      if (event.key === "k") setFocus((value) => Math.max(value - 1, 0));
      if (event.key === "Escape") setOpenReceipt(undefined);
      const current = visible[focus];
      if (event.key === "a" && current) void onApprove(current.id);
      if (event.key === "d" && current) onDismiss(current.id);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [focus, onApprove, onDismiss, visible]);

  const needsYou = decisions.filter((item) => item.state === "ready").length;
  const verified = decisions.filter((item) => item.state === "verified").length + 6;

  return (
    <div className="shell">
      <aside>
        <div className="brand">PROJECT CHIEF</div>
        {ROUTES.map((item, index) => (
          <button
            key={item.id}
            className={route === item.id ? "nav active" : "nav"}
            onClick={() => {
              setRoute(item.id);
            }}
          >
            <span className="hotkey">{index + 1}</span>
            {item.label}
          </button>
        ))}
        <div className="local">● Personal node online</div>
      </aside>
      <main>
        {error ? <p className="banner">{error}</p> : null}
        {loading ? (
          <Empty title="Preparing the morning." body="Reading local fixtures only." />
        ) : null}
        {!loading && route === "today" ? (
          <Today
            decisions={decisions.filter((item) => item.state !== "dismissed")}
            needsYou={needsYou}
            verified={verified}
            focus={focus}
            onApprove={(id) => void onApprove(id)}
            onDismiss={onDismiss}
          />
        ) : null}
        {!loading && route === "decisions" ? (
          <Decisions
            filter={filter}
            setFilter={setFilter}
            decisions={visible}
            focus={focus}
            onApprove={(id) => void onApprove(id)}
            onDismiss={onDismiss}
          />
        ) : null}
        {!loading && route === "chief" ? (
          <Chief
            value={chief}
            onChange={setChief}
            onAsk={() => {
              setRoute("decisions");
            }}
          />
        ) : null}
        {!loading && route === "commitments" ? <Commitments /> : null}
        {!loading && route === "activity" ? (
          <Activity receipts={receipts} onOpen={setOpenReceipt} />
        ) : null}
        {!loading && route === "people" ? <People /> : null}
        {!loading && route === "routines" ? (
          <Empty
            title="No routines are running."
            body="Chief will only automate what you write down."
          />
        ) : null}
        {!loading && route === "connections" ? <Connections /> : null}
        {!loading && route === "privacy" ? <Privacy /> : null}
      </main>
      {openReceipt ? (
        <ReceiptDrawer
          receipt={openReceipt}
          onClose={() => {
            setOpenReceipt(undefined);
          }}
        />
      ) : null}
    </div>
  );
}

function Today({
  decisions,
  needsYou,
  verified,
  focus,
  onApprove,
  onDismiss
}: {
  decisions: SyntheticDecision[];
  needsYou: number;
  verified: number;
  focus: number;
  onApprove: (id: string) => void;
  onDismiss: (id: string) => void;
}) {
  return (
    <>
      <header>
        <div>
          <p className="eyebrow">Sunday · Private preview</p>
          <h1>Good morning.</h1>
          <p className="summary">
            {needsYou} decisions need you. 2 items are at risk. {verified} actions were verified.
          </p>
        </div>
        <button className="ask">Ask Chief</button>
      </header>
      <section className="metrics">
        {[
          ["Needs you", String(needsYou)],
          ["At risk", "2"],
          ["Verified", String(verified)],
          ["Time saved", "1h 42m"]
        ].map(([label, value]) => (
          <div className="metric" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </section>
      <DecisionGrid
        title="Needs you"
        hint="Highest confidence first"
        decisions={decisions}
        focus={focus}
        onApprove={onApprove}
        onDismiss={onDismiss}
      />
    </>
  );
}

function Decisions({
  filter,
  setFilter,
  decisions,
  focus,
  onApprove,
  onDismiss
}: {
  filter: Filter;
  setFilter: (value: Filter) => void;
  decisions: SyntheticDecision[];
  focus: number;
  onApprove: (id: string) => void;
  onDismiss: (id: string) => void;
}) {
  return (
    <>
      <header>
        <div>
          <p className="eyebrow">Approval queue</p>
          <h1>Decisions.</h1>
          <p className="summary">
            Approve binds a local token to the action hash. Nothing is marked done until
            verification.
          </p>
        </div>
      </header>
      <div className="filters" role="tablist">
        {(["now", "today", "week", "low", "consequential"] as const).map((item) => (
          <button
            key={item}
            className={filter === item ? "chip active" : "chip"}
            onClick={() => {
              setFilter(item);
            }}
          >
            {item}
          </button>
        ))}
      </div>
      {decisions.length === 0 ? (
        <Empty
          title="Nothing needs your decision."
          body="Chief will hold the next item until it is worth interrupting you."
        />
      ) : (
        <DecisionGrid
          title="Ready to approve"
          hint="A3 for anything that leaves the device"
          decisions={decisions}
          focus={focus}
          onApprove={onApprove}
          onDismiss={onDismiss}
        />
      )}
    </>
  );
}

function DecisionGrid({
  title,
  hint,
  decisions,
  focus,
  onApprove,
  onDismiss
}: {
  title: string;
  hint: string;
  decisions: SyntheticDecision[];
  focus: number;
  onApprove: (id: string) => void;
  onDismiss: (id: string) => void;
}) {
  return (
    <section>
      <div className="section-title">
        <h2>{title}</h2>
        <span>{hint}</span>
      </div>
      <div className="grid">
        {decisions.map((decision, index) => (
          <article className={index === focus ? "card focused" : "card"} key={decision.id}>
            <div className="card-meta">
              <span className="privacy">{decision.privacy}</span>
              <span className={`risk ${decision.consequence}`}>{decision.consequence}</span>
            </div>
            <h3>{decision.title}</h3>
            <p>{decision.detail}</p>
            <div className="chips">
              {decision.evidence.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <DecisionActions decision={decision} onApprove={onApprove} onDismiss={onDismiss} />
          </article>
        ))}
      </div>
    </section>
  );
}

function DecisionActions({
  decision,
  onApprove,
  onDismiss
}: {
  decision: SyntheticDecision;
  onApprove: (id: string) => void;
  onDismiss: (id: string) => void;
}) {
  const label = actionLabel(decision.state);
  return (
    <div className="card-actions">
      <button
        className="primary"
        disabled={decision.state === "executing" || decision.state === "verified"}
        onClick={() => {
          onApprove(decision.id);
        }}
      >
        {label}
      </button>
      <button
        className="ghost"
        onClick={() => {
          onDismiss(decision.id);
        }}
      >
        Dismiss
      </button>
    </div>
  );
}

function actionLabel(state: DecisionState): string {
  switch (state) {
    case "ready":
      return "Approve";
    case "executing":
      return "Executing";
    case "verified":
      return "Verified";
    case "attention":
      return "Needs attention";
    case "dismissed":
      return "Dismissed";
    default: {
      const exhaustive: never = state;
      return exhaustive;
    }
  }
}

function Chief({
  value,
  onChange,
  onAsk
}: {
  value: string;
  onChange: (value: string) => void;
  onAsk: () => void;
}) {
  return (
    <>
      <header>
        <div>
          <p className="eyebrow">Chief</p>
          <h1>What should I take care of?</h1>
        </div>
      </header>
      <input
        className="ask-input"
        value={value}
        placeholder="Prepare me for tomorrow"
        onChange={(event) => {
          onChange(event.target.value);
        }}
      />
      <div className="chips">
        {[
          "Prepare me for tomorrow",
          "Who am I waiting on?",
          "What have I promised?",
          "Find conflicts next week"
        ].map((item) => (
          <button key={item} className="chip" onClick={onAsk}>
            {item}
          </button>
        ))}
      </div>
    </>
  );
}

function Commitments() {
  return (
    <>
      <header>
        <div>
          <p className="eyebrow">Promises</p>
          <h1>Commitments.</h1>
        </div>
      </header>
      <div className="split">
        {(["I owe", "Owed to me"] as const).map((column) => (
          <section key={column}>
            <div className="section-title">
              <h2>{column}</h2>
            </div>
            {commitments
              .filter((item) =>
                column === "I owe"
                  ? item.direction === "user_owes"
                  : item.direction === "other_owes"
              )
              .map((item) => (
                <article className="row" key={item.id}>
                  <div>
                    <strong>{item.statement}</strong>
                    <p>
                      {item.person} · {item.source} · {item.due}
                    </p>
                  </div>
                  <span className="privacy">{item.status}</span>
                </article>
              ))}
          </section>
        ))}
      </div>
    </>
  );
}

function Activity({
  receipts,
  onOpen
}: {
  receipts: SyntheticReceipt[];
  onOpen: (receipt: SyntheticReceipt) => void;
}) {
  if (receipts.length === 0) {
    return (
      <Empty
        title="Chief hasn't verified any work yet."
        body="Receipts appear after the external system is checked."
      />
    );
  }
  return (
    <>
      <header>
        <div>
          <p className="eyebrow">Ledger</p>
          <h1>Activity.</h1>
          <p className="summary">Detected → Prepared → Approved → Executed → Verified</p>
        </div>
      </header>
      {receipts.map((receipt) => (
        <button
          className="receipt"
          key={receipt.id}
          onClick={() => {
            onOpen(receipt);
          }}
        >
          <div>
            <strong>{receipt.title}</strong>
            <p>{receipt.result}</p>
          </div>
          <span className="check">✓ {receipt.at}</span>
        </button>
      ))}
    </>
  );
}

function People() {
  return (
    <>
      <header>
        <div>
          <p className="eyebrow">Graph</p>
          <h1>People.</h1>
        </div>
      </header>
      <div className="grid">
        {people.map((person) => (
          <article className="card" key={person.id}>
            <span className="privacy">{person.relationship}</span>
            <h3>{person.name}</h3>
            <p>{person.openItems} open items</p>
          </article>
        ))}
      </div>
    </>
  );
}

function Connections() {
  return (
    <>
      <header>
        <div>
          <p className="eyebrow">Sources</p>
          <h1>Connections.</h1>
          <p className="summary">
            Read-only Google connectors stay on this device. Mutation is behind A3.
          </p>
        </div>
      </header>
      <article className="row">
        <div>
          <strong>Google Calendar</strong>
          <p>calendar.readonly · synthetic fixture</p>
        </div>
        <span className="privacy">On device</span>
      </article>
      <article className="row">
        <div>
          <strong>Gmail</strong>
          <p>gmail.readonly · founder dogfood mode</p>
        </div>
        <span className="privacy">On device</span>
      </article>
    </>
  );
}

function Privacy() {
  return (
    <>
      <header>
        <div>
          <p className="eyebrow">Trust</p>
          <h1>Privacy.</h1>
        </div>
        <span className="badge">On this device</span>
      </header>
      <div className="grid">
        {[
          [
            "On this device",
            "Email, calendar notes, Life Graph, receipts and the database key stay local."
          ],
          [
            "Connected accounts",
            "Calendar and Gmail use minimum scopes. Refresh tokens never leave the vault."
          ],
          [
            "External AI routes",
            "Task-bounded excerpts only. Each call writes a local privacy receipt."
          ],
          [
            "Device sync",
            "Cloud relay is ciphertext plus routing metadata. No plaintext recovery escrow."
          ],
          [
            "What our service cloud stores",
            "Account, plan, device public keys, push routing, content-free telemetry."
          ],
          [
            "Export / wipe / revoke",
            "Export writes an encrypted bundle. Wipe deletes the key. Revoke drops every token."
          ]
        ].map(([title, body]) => (
          <article className="card" key={title}>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </>
  );
}

function ReceiptDrawer({ receipt, onClose }: { receipt: SyntheticReceipt; onClose: () => void }) {
  return (
    <aside className="drawer" aria-label="Action receipt">
      <p className="eyebrow">Receipt</p>
      <h2>{receipt.title}</h2>
      <dl>
        <dt>Why</dt>
        <dd>{receipt.why}</dd>
        <dt>Evidence</dt>
        <dd>{receipt.evidence}</dd>
        <dt>Permission</dt>
        <dd>{receipt.permission}</dd>
        <dt>External result</dt>
        <dd>{receipt.result}</dd>
        <dt>Model route</dt>
        <dd>{receipt.provider}</dd>
      </dl>
      <button className="ghost" onClick={onClose}>
        Close
      </button>
    </aside>
  );
}

function Empty({ title, body }: { title: string; body: string }) {
  return (
    <section className="empty">
      <h2>{title}</h2>
      <p>{body}</p>
    </section>
  );
}
