import Link from "next/link";

const LEVELS = [
  { level: 1, title: "Associate", xp: "0 XP" },
  { level: 2, title: "Deputy Chief", xp: "100 XP" },
  { level: 3, title: "Chief of Staff", xp: "300 XP" },
  { level: 4, title: "Executive Chief", xp: "700 XP" },
  { level: 5, title: "Master Chief", xp: "1,500 XP" }
];

const ACHIEVEMENTS = [
  "First Move — first verified action",
  "Trusted Operator — ten verified actions",
  "Week Warrior — seven-day streak",
  "Time Liberator — one hour saved",
  "Inbox Zero — clear every pending decision in a day"
];

export default function ProgressPage() {
  return (
    <main>
      <p className="eyebrow">Chief progression</p>
      <h1>Verified work compounds.</h1>
      <p className="lede">
        Project Chief gamifies real outcomes, not chat volume. XP comes from verified external
        state, time saved, and streaks — all computed on your device.
      </p>
      <section className="trust">
        {LEVELS.map((item) => (
          <article key={item.level}>
            <span>Level {item.level}</span>
            <h2>{item.title}</h2>
            <p>Unlocked at {item.xp}. Progress bar tracks XP within the current tier.</p>
          </article>
        ))}
      </section>
      <section className="trust">
        <article>
          <span>Streaks</span>
          <h2>Daily verified momentum</h2>
          <p>Each day with a verified action extends your streak and adds bonus XP.</p>
        </article>
        <article>
          <span>Weekly goal</span>
          <h2>Seven verified actions</h2>
          <p>A simple cadence target for founding users building the Chief habit.</p>
        </article>
        <article>
          <span>Achievements</span>
          <h2>Ten unlockable badges</h2>
          <p>{ACHIEVEMENTS.join(" · ")}</p>
        </article>
      </section>
      <section className="trust">
        <article>
          <span>Private</span>
          <h2>No public leaderboard</h2>
          <p>Progress stays on your personal node. The cloud never sees prompts or source content.</p>
        </article>
        <article>
          <span>Try it</span>
          <h2>Desktop synthetic build</h2>
          <p>
            Approve a decision, watch Verified land, and see achievements unlock in the Progress
            tab.
          </p>
        </article>
        <article>
          <span>Buy</span>
          <h2>Founding access</h2>
          <p>
            <Link href="/waitlist">Join the waitlist</Link> or review{" "}
            <Link href="/pricing">founding pricing</Link>.
          </p>
        </article>
      </section>
    </main>
  );
}
