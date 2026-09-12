import type {
  SyntheticCommitment,
  SyntheticDecision,
  SyntheticMeeting
} from "../fixtures/synthetic.js";

export interface ChiefAnswer {
  heading: string;
  summary: string;
  items: string[];
  route: "decisions" | "commitments" | "today";
}

export function answerChief(
  query: string,
  decisions: SyntheticDecision[],
  commitments: SyntheticCommitment[],
  meetings: SyntheticMeeting[]
): ChiefAnswer {
  const text = query.trim().toLowerCase();
  const ready = decisions.filter((item) => item.state === "ready");
  const waiting = commitments.filter((item) => item.direction === "other_owes");
  const promised = commitments.filter((item) => item.direction === "user_owes");
  const conflicts = meetings.filter((item) => item.conflict);

  if (text.includes("waiting")) {
    return {
      heading: "Who you are waiting on",
      summary: `${waiting.length} open commitments owed to you.`,
      items: waiting.map((item) => `${item.person} · ${item.statement} · ${item.due}`),
      route: "commitments"
    };
  }
  if (text.includes("promised") || text.includes("owe")) {
    return {
      heading: "What you have promised",
      summary: `${promised.length} open commitments you still owe.`,
      items: promised.map((item) => `${item.person} · ${item.statement} · ${item.due}`),
      route: "commitments"
    };
  }
  if (text.includes("conflict")) {
    return {
      heading: "Conflicts next week",
      summary:
        conflicts[0]?.conflict ?? "No overlapping meetings were found in the local fixture set.",
      items: conflicts.map((item) => `${item.title} · ${item.when}`),
      route: "today"
    };
  }
  if (text.includes("routine")) {
    return {
      heading: "Routines stay written",
      summary: "Chief will not invent automation. Only routines you wrote down can run.",
      items: ["Sunday board-pack reminder · written by you"],
      route: "today"
    };
  }

  return {
    heading: "Prepared for tomorrow",
    summary: `${ready.length} decisions are waiting. ${conflicts.length} calendar conflict needs a choice.`,
    items: [
      ...ready.map((item) => item.title),
      ...conflicts.map((item) => item.conflict ?? item.title)
    ],
    route: "decisions"
  };
}
