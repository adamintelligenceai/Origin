import type { Commitment, WorkItem } from "@project-chief/types";
import { scoreWorkItem } from "./score.js";

export function composeMorningBriefing(items: WorkItem[], commitments: Commitment[]): string {
  const needsYou = items.filter(
    (item) => item.status === "needs_approval" || item.status === "prepared"
  );
  const owed = commitments.filter(
    (item) => item.direction === "other_owes" && item.status === "open"
  );
  return `${needsYou.length} decisions need you. ${owed.length} people owe you a response.`;
}

export function composeMeetingPrep(items: WorkItem[]): string {
  const prep = items
    .filter((item) => item.kind === "meeting_prep")
    .sort((left, right) => scoreWorkItem(right) - scoreWorkItem(left));
  if (prep[0]) {
    return `Prepare: ${prep[0].title}`;
  }
  return "No meeting prep is waiting.";
}
