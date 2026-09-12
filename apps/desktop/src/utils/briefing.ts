import type { MeetingPrepView, WrittenRoutine } from "@project-chief/runtime";
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
  meetings: SyntheticMeeting[],
  routines: WrittenRoutine[] = [],
  meetingPrep: MeetingPrepView[] = []
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
      items:
        routines.length > 0
          ? routines.map((item) => `${item.title} · written by ${item.writtenBy}`)
          : ["No written routines remain."],
      route: "today"
    };
  }

  const prep = meetingPrep[0];
  return {
    heading: "Prepared for tomorrow",
    summary: `${ready.length} decisions are waiting. ${conflicts.length} calendar conflict needs a choice.`,
    items: [
      ...ready.map((item) => item.title),
      ...conflicts.map((item) => item.conflict ?? item.title),
      ...(prep ? [`${prep.eventTitle} needs ${prep.documents.join(", ")}`] : [])
    ],
    route: "decisions"
  };
}
