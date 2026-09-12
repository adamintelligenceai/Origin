import ReactDOM from "react-dom/client";
import "./styles.css";

const decisions = [
  {
    title: "Follow up on the requested proposal",
    detail: "You were told it would arrive Friday. Nothing matching it has arrived.",
    action: "Prepare follow-up",
    privacy: "On device"
  },
  {
    title: "Resolve tomorrow's calendar conflict",
    detail: "Two commitments overlap by 30 minutes. The later meeting has more flexibility.",
    action: "Review options",
    privacy: "On device"
  },
  {
    title: "Reply is ready",
    detail: "A response has been prepared from the latest thread. Sending requires your approval.",
    action: "Review draft",
    privacy: "External AI"
  }
];

function App() {
  return (
    <div className="shell">
      <aside>
        <div className="brand">PROJECT CHIEF</div>
        {[
          "Today",
          "Decisions",
          "Chief",
          "Commitments",
          "Activity",
          "People",
          "Routines",
          "Connections",
          "Privacy"
        ].map((x, i) => (
          <button key={x} className={i === 0 ? "nav active" : "nav"}>
            {x}
          </button>
        ))}
        <div className="local">● Personal node online</div>
      </aside>
      <main>
        <header>
          <div>
            <p className="eyebrow">Sunday · Private preview</p>
            <h1>Good morning.</h1>
            <p className="summary">
              3 decisions need you. 2 items are at risk. 6 actions were verified.
            </p>
          </div>
          <button className="ask">Ask Chief</button>
        </header>
        <section className="metrics">
          {[
            ["Needs you", "3"],
            ["At risk", "2"],
            ["Verified", "6"],
            ["Time saved", "1h 42m"]
          ].map(([k, v]) => (
            <div className="metric" key={k}>
              <span>{k}</span>
              <strong>{v}</strong>
            </div>
          ))}
        </section>
        <section>
          <div className="section-title">
            <h2>Needs you</h2>
            <span>Highest confidence first</span>
          </div>
          <div className="grid">
            {decisions.map((d) => (
              <article className="card" key={d.title}>
                <span className="privacy">{d.privacy}</span>
                <h3>{d.title}</h3>
                <p>{d.detail}</p>
                <div className="card-actions">
                  <button className="primary">{d.action}</button>
                  <button className="ghost">Dismiss</button>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="verified">
          <div className="section-title">
            <h2>Verified</h2>
            <span>Checked against the external system</span>
          </div>
          <div className="receipt">
            <div>
              <strong>Meeting updated</strong>
              <p>Calendar state confirmed at 08:42.</p>
            </div>
            <span className="check">✓ Verified</span>
          </div>
        </section>
      </main>
    </div>
  );
}

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element #root was not found");
}

ReactDOM.createRoot(root).render(<App />);
