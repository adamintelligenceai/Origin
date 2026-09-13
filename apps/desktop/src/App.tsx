import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  DecisionFilter,
  DecisionState,
  RouteName,
  SyntheticDecision,
  SyntheticMeeting,
  SyntheticReceipt
} from "./fixtures/synthetic.js";
import {
  CONNECTION_CATALOG,
  CONNECTION_GROUPS,
  connectionStatusLabel,
  fixtureConnections,
  type ChiefSnapshot,
  type ConnectionId,
  type ConnectionStatus,
  type MeetingPrepView,
  type WrittenRoutine
} from "@project-chief/runtime";
import { getRuntime, resetRuntime, wait } from "./runtime/session.js";
import {
  applySnapshot,
  commitmentsFromSnapshot,
  decisionsFromSnapshot,
  emptySnapshot,
  formatTimeSaved,
  meetingsFromSnapshot,
  peopleFromSnapshot,
  receiptsFromSnapshot
} from "./runtime/view-model.js";
import type { SyntheticCommitment, SyntheticPerson } from "./fixtures/synthetic.js";
import { answerChief, type ChiefAnswer } from "./utils/briefing.js";

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

const FILTERS: { id: DecisionFilter; label: string }[] = [
  { id: "now", label: "Now" },
  { id: "today", label: "Today" },
  { id: "week", label: "This week" },
  { id: "low", label: "Low risk" },
  { id: "consequential", label: "Consequential" }
];

export default function App() {
  const [route, setRoute] = useState<RouteName>("today");
  const [decisions, setDecisions] = useState<SyntheticDecision[]>([]);
  const [receipts, setReceipts] = useState<SyntheticReceipt[]>([]);
  const [commitments, setCommitments] = useState(commitmentsFromSnapshot(emptySnapshot()));
  const [people, setPeople] = useState(peopleFromSnapshot(emptySnapshot()));
  const [meetings, setMeetings] = useState(meetingsFromSnapshot(emptySnapshot()));
  const [routines, setRoutines] = useState<WrittenRoutine[]>([]);
  const [meetingPrep, setMeetingPrep] = useState<MeetingPrepView[]>([]);
  const [timeSavedMinutes, setTimeSavedMinutes] = useState(0);
  const [openReceipt, setOpenReceipt] = useState<SyntheticReceipt | undefined>();
  const [filter, setFilter] = useState<DecisionFilter>("today");
  const [chief, setChief] = useState("");
  const [answer, setAnswer] = useState<ChiefAnswer | undefined>();
  const [focus, setFocus] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [status, setStatus] = useState("Personal node online");
  const [editingId, setEditingId] = useState<string | undefined>();
  const [draftAction, setDraftAction] = useState("");
  const [wiped, setWiped] = useState(false);
  const [confirmWipe, setConfirmWipe] = useState(false);
  const [exportNote, setExportNote] = useState<string | undefined>();
  const [connections, setConnections] =
    useState<Record<ConnectionId, ConnectionStatus>>(fixtureConnections);

  const visible = useMemo(
    () => decisions.filter((item) => item.filter.includes(filter) && item.state !== "dismissed"),
    [decisions, filter]
  );

  useEffect(() => {
    setFocus((value) => Math.min(value, Math.max(visible.length - 1, 0)));
  }, [visible.length]);

  const apply = useCallback((snapshot: ChiefSnapshot) => {
    applySnapshot(snapshot, setDecisions, setReceipts, setCommitments, setPeople, setMeetings);
    setRoutines(snapshot.routines);
    setMeetingPrep(snapshot.meetingPrep);
    setTimeSavedMinutes(snapshot.timeSavedMinutes);
    setConnections(snapshot.connections);
    setExportNote(snapshot.exportNote);
    setWiped(snapshot.wiped);
  }, []);

  useEffect(() => {
    const runtime = resetRuntime();
    void runtime.boot().then((snapshot) => {
      apply(snapshot);
      setLoading(false);
    });
  }, [apply]);

  const onApprove = useCallback(
    async (id: string) => {
      const current = decisions.find((item) => item.id === id);
      if (!current || current.state === "executing" || current.state === "verified") return;
      setStatus("Executing");
      setDecisions((items) =>
        items.map((item) => (item.id === id ? { ...item, state: "executing" } : item))
      );
      try {
        await wait(80);
        const snapshot = await getRuntime().approve(id);
        apply(snapshot);
        const nextReceipts = receiptsFromSnapshot(snapshot);
        setOpenReceipt(nextReceipts[0]);
        const next = decisionsFromSnapshot(snapshot).find((item) => item.id === id);
        setStatus(next?.state === "verified" ? "Verified" : "Needs attention");
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : "Approval failed");
      }
    },
    [apply, decisions]
  );

  const onDismiss = useCallback(
    (id: string) => {
      apply(getRuntime().dismiss(id));
      setStatus("Dismissed");
    },
    [apply]
  );

  const onEdit = useCallback((decision: SyntheticDecision) => {
    setEditingId(decision.id);
    setDraftAction(decision.action);
  }, []);

  const onSaveEdit = useCallback(() => {
    if (!editingId) return;
    apply(getRuntime().editAction(editingId, draftAction));
    setEditingId(undefined);
    setStatus("Proposed action updated. Approval will bind to the new hash.");
  }, [apply, draftAction, editingId]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
        return;
      }
      const index = Number(event.key) - 1;
      if (index >= 0 && index < ROUTES.length) {
        const next = ROUTES[index];
        if (next) setRoute(next.id);
      }
      if (event.key === "j")
        setFocus((value) => Math.min(value + 1, Math.max(visible.length - 1, 0)));
      if (event.key === "k") setFocus((value) => Math.max(value - 1, 0));
      if (event.key === "Escape") {
        setOpenReceipt(undefined);
        setEditingId(undefined);
      }
      const current = visible[focus];
      if (event.key === "a" && current) void onApprove(current.id);
      if (event.key === "d" && current) onDismiss(current.id);
      if (event.key === "e" && current) onEdit(current);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [focus, onApprove, onDismiss, onEdit, visible]);

  const askChief = useCallback(
    (query: string) => {
      const next = answerChief(
        query || "Prepare me for tomorrow",
        decisions,
        commitments,
        meetings,
        routines,
        meetingPrep
      );
      setAnswer(next);
      setChief(query);
      setRoute("chief");
    },
    [commitments, decisions, meetingPrep, meetings, routines]
  );

  const wipeDevice = useCallback(() => {
    void getRuntime()
      .wipe()
      .then((snapshot) => {
        apply(snapshot);
        setOpenReceipt(undefined);
        setAnswer(undefined);
        setConfirmWipe(false);
        setStatus("Secure wipe completed. The database key is gone.");
      });
  }, [apply]);

  const needsYou = decisions.filter((item) => item.state === "ready").length;
  const verifiedCount = decisions.filter((item) => item.state === "verified").length;
  const atRiskCount = decisions.filter((item) => item.atRisk && item.state !== "dismissed").length;
  const weekday = new Intl.DateTimeFormat("en-AU", { weekday: "long" }).format(new Date());

  return (
    <div className="shell">
      <a className="skip" href="#content">
        Skip to content
      </a>
      <aside>
        <div className="brand">PROJECT CHIEF</div>
        {ROUTES.map((item, index) => (
          <button
            key={item.id}
            className={route === item.id ? "nav active" : "nav"}
            {...(route === item.id ? { "aria-current": "page" as const } : {})}
            aria-label={item.label}
            onClick={() => {
              setRoute(item.id);
            }}
          >
            <span className="hotkey">{index + 1}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
        <div className="local">● {status}</div>
      </aside>
      <main id="content">
        <p className="sr-only" aria-live="polite">
          {status}
        </p>
        {error ? <p className="banner">{error}</p> : null}
        {loading ? (
          <Empty title="Preparing the morning." body="Reading the local node." />
        ) : null}
        {!loading && wiped && route === "today" ? (
          <Empty
            title="This device is empty."
            body="The local key was deleted. Nothing private can be recovered from the service cloud."
          />
        ) : null}
        {!loading && !wiped && route === "today" ? (
          <Today
            weekday={weekday}
            meetings={meetings}
            meetingPrep={meetingPrep}
            decisions={decisions.filter((item) => item.state !== "dismissed")}
            needsYou={needsYou}
            atRiskCount={atRiskCount}
            verified={verifiedCount}
            timeSaved={formatTimeSaved(timeSavedMinutes)}
            focus={focus}
            editingId={editingId}
            draftAction={draftAction}
            onDraftAction={setDraftAction}
            onApprove={(id) => void onApprove(id)}
            onDismiss={onDismiss}
            onEdit={onEdit}
            onSaveEdit={onSaveEdit}
            onAsk={() => {
              askChief("Prepare me for tomorrow");
            }}
          />
        ) : null}
        {!loading && route === "decisions" ? (
          <Decisions
            filter={filter}
            setFilter={setFilter}
            decisions={visible}
            focus={focus}
            editingId={editingId}
            draftAction={draftAction}
            onDraftAction={setDraftAction}
            onApprove={(id) => void onApprove(id)}
            onDismiss={onDismiss}
            onEdit={onEdit}
            onSaveEdit={onSaveEdit}
          />
        ) : null}
        {!loading && route === "chief" ? (
          <Chief
            value={chief}
            answer={answer}
            onChange={setChief}
            onAsk={() => {
              askChief(chief || "Prepare me for tomorrow");
            }}
            onPrompt={askChief}
          />
        ) : null}
        {!loading && route === "commitments" ? (
          <Commitments wiped={wiped} commitments={commitments} />
        ) : null}
        {!loading && route === "activity" ? (
          <Activity receipts={receipts} onOpen={setOpenReceipt} />
        ) : null}
        {!loading && route === "people" ? <People wiped={wiped} people={people} /> : null}
        {!loading && route === "routines" ? <Routines wiped={wiped} routines={routines} /> : null}
        {!loading && route === "connections" ? (
          <Connections
            connections={connections}
            onRevoke={(id) => {
              void getRuntime()
                .revoke(id)
                .then((snapshot) => {
                  apply(snapshot);
                  setStatus("Connection revoked on this device.");
                });
            }}
            onPair={(id) => {
              void getRuntime()
                .pair(id)
                .then((snapshot) => {
                  apply(snapshot);
                  setStatus("Paired on this device. Tokens stay in the local vault.");
                });
            }}
            onRevokeAll={() => {
              void getRuntime()
                .revokeAll()
                .then((snapshot) => {
                  apply(snapshot);
                  setStatus("Every connector token was dropped.");
                });
            }}
          />
        ) : null}
        {!loading && route === "privacy" ? (
          <Privacy
            exportNote={exportNote}
            confirmWipe={confirmWipe}
            onExport={() => {
              const snapshot = getRuntime().exportEncrypted();
              setExportNote(
                snapshot.exportNote ??
                  "Encrypted bundle written locally. The service cloud never received it."
              );
            }}
            onAskWipe={() => {
              setConfirmWipe(true);
            }}
            onConfirmWipe={wipeDevice}
            onRevokeAll={() => {
              void getRuntime()
                .revokeAll()
                .then((snapshot) => {
                  apply(snapshot);
                  setRoute("connections");
                });
            }}
          />
        ) : null}
      </main>
      {openReceipt ? (
        <ReceiptDrawer
          receipt={openReceipt}
          onClose={() => {
            setOpenReceipt(undefined);
          }}
          onUndo={() => {
            void getRuntime()
              .reverse(openReceipt.id)
              .then((snapshot) => {
                apply(snapshot);
                setOpenReceipt(undefined);
                setStatus("Reversed. External state was checked again.");
              })
              .catch((caught: unknown) => {
                setError(caught instanceof Error ? caught.message : "Reverse failed");
              });
          }}
        />
      ) : null}
    </div>
  );
}

function Today({
  weekday,
  meetings,
  meetingPrep,
  decisions,
  needsYou,
  atRiskCount,
  verified,
  timeSaved,
  focus,
  editingId,
  draftAction,
  onDraftAction,
  onApprove,
  onDismiss,
  onEdit,
  onSaveEdit,
  onAsk
}: {
  weekday: string;
  meetings: SyntheticMeeting[];
  meetingPrep: MeetingPrepView[];
  decisions: SyntheticDecision[];
  needsYou: number;
  atRiskCount: number;
  verified: number;
  timeSaved: string;
  focus: number;
  editingId: string | undefined;
  draftAction: string;
  onDraftAction: (value: string) => void;
  onApprove: (id: string) => void;
  onDismiss: (id: string) => void;
  onEdit: (decision: SyntheticDecision) => void;
  onSaveEdit: () => void;
  onAsk: () => void;
}) {
  const ready = decisions.filter(
    (item) => (item.state === "ready" || item.state === "executing") && !item.atRisk
  );
  const risk = decisions.filter(
    (item) => item.atRisk && item.state !== "verified" && item.state !== "dismissed"
  );
  const done = decisions.filter((item) => item.state === "verified");
  return (
    <>
      <header>
        <div>
          <p className="eyebrow">{weekday} · Private preview</p>
          <h1>Good morning.</h1>
          <p className="summary">
            {needsYou} {needsYou === 1 ? "decision needs" : "decisions need"} you. {atRiskCount}{" "}
            {atRiskCount === 1 ? "item is" : "items are"} at risk. {verified}{" "}
            {verified === 1 ? "action was" : "actions were"} verified.
          </p>
        </div>
        <button className="ask" onClick={onAsk}>
          Ask Chief
        </button>
      </header>
      <section className="metrics">
        {[
          ["Needs you", String(needsYou)],
          ["At risk", String(atRiskCount)],
          ["Verified", String(verified)],
          ["Time saved", timeSaved]
        ].map(([label, value]) => (
          <div className="metric" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </section>
      <section className="meetings">
        {meetings.map((meeting) => (
          <article className="row" key={meeting.id}>
            <div>
              <strong>{meeting.title}</strong>
              <p>
                {meeting.when}
                {meeting.conflict ? ` · ${meeting.conflict}` : ""}
              </p>
            </div>
            <span className="privacy">Calendar</span>
          </article>
        ))}
        {meetingPrep.map((prep) => (
          <article className="row" key={prep.eventTitle}>
            <div>
              <strong>Tomorrow's meeting needs these three documents</strong>
              <p>
                {prep.eventTitle} · {prep.when} · {prep.documents.join(", ")}
              </p>
            </div>
            <span className="privacy">Prep</span>
          </article>
        ))}
      </section>
      <DecisionGrid
        title="Needs you"
        hint="Highest confidence first"
        decisions={ready}
        focus={focus}
        editingId={editingId}
        draftAction={draftAction}
        onDraftAction={onDraftAction}
        onApprove={onApprove}
        onDismiss={onDismiss}
        onEdit={onEdit}
        onSaveEdit={onSaveEdit}
      />
      {risk.length > 0 ? (
        <DecisionGrid
          title="At risk"
          hint="Only high-confidence, time-relevant items"
          decisions={risk}
          focus={-1}
          editingId={editingId}
          draftAction={draftAction}
          onDraftAction={onDraftAction}
          onApprove={onApprove}
          onDismiss={onDismiss}
          onEdit={onEdit}
          onSaveEdit={onSaveEdit}
        />
      ) : null}
      {done.length > 0 ? (
        <DecisionGrid
          title="Completed"
          hint="Verified external result, not model intention"
          decisions={done}
          focus={-1}
          editingId={undefined}
          draftAction={draftAction}
          onDraftAction={onDraftAction}
          onApprove={onApprove}
          onDismiss={onDismiss}
          onEdit={onEdit}
          onSaveEdit={onSaveEdit}
        />
      ) : null}
    </>
  );
}

function Decisions({
  filter,
  setFilter,
  decisions,
  focus,
  editingId,
  draftAction,
  onDraftAction,
  onApprove,
  onDismiss,
  onEdit,
  onSaveEdit
}: {
  filter: DecisionFilter;
  setFilter: (value: DecisionFilter) => void;
  decisions: SyntheticDecision[];
  focus: number;
  editingId: string | undefined;
  draftAction: string;
  onDraftAction: (value: string) => void;
  onApprove: (id: string) => void;
  onDismiss: (id: string) => void;
  onEdit: (decision: SyntheticDecision) => void;
  onSaveEdit: () => void;
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
        {FILTERS.map((item) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={filter === item.id}
            className={filter === item.id ? "chip active" : "chip"}
            onClick={() => {
              setFilter(item.id);
            }}
          >
            {item.label}
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
          editingId={editingId}
          draftAction={draftAction}
          onDraftAction={onDraftAction}
          onApprove={onApprove}
          onDismiss={onDismiss}
          onEdit={onEdit}
          onSaveEdit={onSaveEdit}
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
  editingId,
  draftAction,
  onDraftAction,
  onApprove,
  onDismiss,
  onEdit,
  onSaveEdit
}: {
  title: string;
  hint: string;
  decisions: SyntheticDecision[];
  focus: number;
  editingId: string | undefined;
  draftAction: string;
  onDraftAction: (value: string) => void;
  onApprove: (id: string) => void;
  onDismiss: (id: string) => void;
  onEdit: (decision: SyntheticDecision) => void;
  onSaveEdit: () => void;
}) {
  return (
    <section>
      <div className="section-title">
        <h2>{title}</h2>
        <span>{hint}</span>
      </div>
      <div className="grid">
        {decisions.map((decision, index) => (
          <article
            className={index === focus ? "card focused" : "card"}
            key={`${title}-${decision.id}`}
          >
            <div className="card-meta">
              <span className="privacy">{decision.privacy}</span>
              <span className={`risk ${decision.consequence}`}>
                {decision.consequence} risk
              </span>
            </div>
            <h3>{decision.title}</h3>
            <p>{decision.detail}</p>
            <p className="proposed">Proposed: {decision.action}</p>
            <div className="chips">
              {decision.evidence.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            {editingId === decision.id ? (
              <div className="edit-row">
                <textarea
                  aria-label="Edit proposed action"
                  value={draftAction}
                  onChange={(event) => {
                    onDraftAction(event.target.value);
                  }}
                />
                <button className="primary" onClick={onSaveEdit}>
                  Save action
                </button>
              </div>
            ) : null}
            <DecisionActions
              decision={decision}
              onApprove={onApprove}
              onDismiss={onDismiss}
              onEdit={onEdit}
            />
          </article>
        ))}
      </div>
    </section>
  );
}

function DecisionActions({
  decision,
  onApprove,
  onDismiss,
  onEdit
}: {
  decision: SyntheticDecision;
  onApprove: (id: string) => void;
  onDismiss: (id: string) => void;
  onEdit: (decision: SyntheticDecision) => void;
}) {
  return (
    <div className="card-actions">
      <button
        className="primary"
        disabled={decision.state === "executing" || decision.state === "verified"}
        onClick={() => {
          onApprove(decision.id);
        }}
      >
        {actionLabel(decision.state)}
      </button>
      <button
        className="ghost"
        disabled={decision.state === "verified"}
        onClick={() => {
          onEdit(decision);
        }}
      >
        Edit
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
  answer,
  onChange,
  onAsk,
  onPrompt
}: {
  value: string;
  answer: ChiefAnswer | undefined;
  onChange: (value: string) => void;
  onAsk: () => void;
  onPrompt: (query: string) => void;
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
        aria-label="Ask Chief"
        onChange={(event) => {
          onChange(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") onAsk();
        }}
      />
      <div className="chips">
        {[
          "Prepare me for tomorrow",
          "Who am I waiting on?",
          "What have I promised?",
          "Clear routine follow-ups",
          "Find conflicts next week"
        ].map((item) => (
          <button
            key={item}
            className="chip"
            onClick={() => {
              onPrompt(item);
            }}
          >
            {item}
          </button>
        ))}
      </div>
      {answer ? (
        <section className="brief">
          <div className="section-title">
            <h2>{answer.heading}</h2>
            <span>Structured work, not an essay</span>
          </div>
          <p className="summary">{answer.summary}</p>
          {answer.items.map((item, index) => (
            <article className="row" key={`${index}-${item}`}>
              <strong>{item}</strong>
            </article>
          ))}
        </section>
      ) : (
        <Empty
          title="Ask for the next useful move."
          body="Replies become work items. Chief will not write a briefing novel."
        />
      )}
    </>
  );
}

function Commitments({
  wiped,
  commitments
}: {
  wiped: boolean;
  commitments: SyntheticCommitment[];
}) {
  if (wiped) {
    return <Empty title="No commitments remain." body="Local records were wiped with the key." />;
  }
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
                      {item.person} · {item.source} · {item.due} · Follow up ready
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

function People({ wiped, people }: { wiped: boolean; people: SyntheticPerson[] }) {
  if (wiped) {
    return (
      <Empty title="The local graph is gone." body="People records lived only on this device." />
    );
  }
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

function Routines({ wiped, routines }: { wiped: boolean; routines: WrittenRoutine[] }) {
  if (wiped) {
    return (
      <Empty title="No routines remain." body="Chief will only automate what you write down." />
    );
  }
  return (
    <>
      <header>
        <div>
          <p className="eyebrow">Written only</p>
          <h1>Routines.</h1>
          <p className="summary">Chief will only automate what you write down.</p>
        </div>
      </header>
      {routines.map((routine) => (
        <article className="row" key={routine.id}>
          <div>
            <strong>{routine.title}</strong>
            <p>
              {routine.trigger} · written by {routine.writtenBy}
            </p>
          </div>
          <span className="privacy">{routine.status}</span>
        </article>
      ))}
    </>
  );
}

function Connections({
  connections,
  onRevoke,
  onPair,
  onRevokeAll
}: {
  connections: Record<ConnectionId, ConnectionStatus>;
  onRevoke: (id: ConnectionId) => void;
  onPair: (id: ConnectionId) => void;
  onRevokeAll: () => void;
}) {
  return (
    <>
      <header>
        <div>
          <p className="eyebrow">Sources</p>
          <h1>Connections.</h1>
          <p className="summary">
            Phone, SMS, missed calls and social stay on the paired device. Work tokens never leave
            the vault. Posting stays behind A3.
          </p>
        </div>
        <button className="ghost" onClick={onRevokeAll}>
          Revoke all
        </button>
      </header>
      {CONNECTION_GROUPS.map((group) => (
        <section className="connection-group" key={group.id}>
          <h2>{group.label}</h2>
          <p>{group.hint}</p>
          <div className="connection-grid">
            {CONNECTION_CATALOG.filter((item) => item.group === group.id).map((item) => (
              <article className="connection-card" key={item.id}>
                <div>
                  <strong>{item.label}</strong>
                  <p>{item.detail}</p>
                </div>
                <ConnectionAction
                  group={group.id}
                  status={connections[item.id]}
                  onRevoke={() => {
                    onRevoke(item.id);
                  }}
                  onPair={() => {
                    onPair(item.id);
                  }}
                />
              </article>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

function ConnectionAction({
  group,
  status,
  onRevoke,
  onPair
}: {
  group: (typeof CONNECTION_GROUPS)[number]["id"];
  status: ConnectionStatus;
  onRevoke: () => void;
  onPair: () => void;
}) {
  const badge =
    status === "connected" && group === "this_device" ? "Paired" : connectionStatusLabel(status);
  switch (status) {
    case "connected":
      return (
        <div className="connection-actions">
          <span className="privacy">{badge}</span>
          <button className="ghost" onClick={onRevoke}>
            Revoke
          </button>
        </div>
      );
    case "revoked":
    case "available":
      return (
        <div className="connection-actions">
          <span className="privacy">{badge}</span>
          <button className="ghost" onClick={onPair}>
            Pair
          </button>
        </div>
      );
    default: {
      const exhaustive: never = status;
      return exhaustive;
    }
  }
}

function Privacy({
  exportNote,
  confirmWipe,
  onExport,
  onAskWipe,
  onConfirmWipe,
  onRevokeAll
}: {
  exportNote: string | undefined;
  confirmWipe: boolean;
  onExport: () => void;
  onAskWipe: () => void;
  onConfirmWipe: () => void;
  onRevokeAll: () => void;
}) {
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
            "Phone, SMS, mail, calendar notes, Life Graph, receipts and the database key stay local."
          ],
          [
            "Connected accounts",
            "Phone, SMS and social stay on this device. Work tokens never leave the vault."
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
          ]
        ].map(([title, body]) => (
          <article className="card" key={title}>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
        <article className="card">
          <h3>Export</h3>
          <p>Writes an encrypted bundle on this machine. Nothing is uploaded.</p>
          <button className="ghost" onClick={onExport}>
            Export encrypted bundle
          </button>
          {exportNote ? <p className="proposed">{exportNote}</p> : null}
        </article>
        <article className="card">
          <h3>Wipe</h3>
          <p>Deletes the database key. There is no server-held recovery copy.</p>
          {confirmWipe ? (
            <button className="primary" onClick={onConfirmWipe}>
              Confirm wipe
            </button>
          ) : (
            <button className="ghost" onClick={onAskWipe}>
              Wipe this device
            </button>
          )}
        </article>
        <article className="card">
          <h3>Revoke all connections</h3>
          <p>Drops every connector token stored in the local vault.</p>
          <button className="ghost" onClick={onRevokeAll}>
            Revoke all
          </button>
        </article>
      </div>
    </>
  );
}

function ReceiptDrawer({
  receipt,
  onClose,
  onUndo
}: {
  receipt: SyntheticReceipt;
  onClose: () => void;
  onUndo: () => void;
}) {
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
      <div className="card-actions">
        {receipt.reversible ? (
          <button className="ghost" onClick={onUndo}>
            Undo
          </button>
        ) : null}
        <button className="ghost" onClick={onClose}>
          Close
        </button>
      </div>
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
