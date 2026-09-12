import type { ChiefSnapshot } from "@project-chief/runtime";

export function briefingLine(snapshot: ChiefSnapshot): string {
  const needsYou = snapshot.workItems.filter(
    (item) => item.status === "needs_approval" || item.status === "prepared"
  ).length;
  const atRisk = snapshot.workItems.filter((item) => item.kind === "calendar_conflict").length;
  const verified = snapshot.workItems.filter((item) => item.status === "verified").length;
  return `${needsYou} decisions need you. ${atRisk} ${atRisk === 1 ? "item is" : "items are"} at risk. ${verified} ${verified === 1 ? "action was" : "actions were"} verified.`;
}

export function primaryDecision(snapshot: ChiefSnapshot) {
  return (
    snapshot.workItems.find((item) => item.kind === "calendar_conflict") ?? snapshot.workItems[0]
  );
}

export function followUp(snapshot: ChiefSnapshot) {
  return snapshot.workItems.find((item) => item.title.includes("Follow up"));
}
