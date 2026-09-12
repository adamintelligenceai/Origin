import type { WorkItem } from "@project-chief/types";

export function dedupeWorkItems(items: WorkItem[]): WorkItem[] {
  const seen = new Map<string, WorkItem>();
  for (const item of items) {
    const key = `${item.kind}:${item.title.toLowerCase()}`;
    const existing = seen.get(key);
    if (!existing || scoreKey(item) > scoreKey(existing)) {
      seen.set(key, item);
    }
  }
  return [...seen.values()];
}

function scoreKey(item: WorkItem): number {
  return item.confidence + item.urgency + item.importance;
}
