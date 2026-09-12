import type { WorkItem } from "@project-chief/types";

export function scoreWorkItem(item: WorkItem): number {
  return item.urgency * 0.45 + item.importance * 0.4 + item.confidence * 0.15;
}

export function isActionable(item: WorkItem, minimumConfidence = 0.55): boolean {
  return item.confidence >= minimumConfidence && item.status !== "dismissed";
}
