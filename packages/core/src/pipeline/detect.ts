import type { Commitment, SourceRef, WorkItem } from "@project-chief/types";

const COMMITMENT_MARKERS = ["i will", "i'll", "i can send", "by friday", "due"];
const OWED_MARKERS = ["you promised", "waiting on", "still outstanding"];
const FOLLOW_UP_MARKERS = ["checking in", "any update", "follow up"];

export interface NormalizedSource {
  id: string;
  text: string;
  ref: SourceRef;
}

export function detectFromSources(sources: NormalizedSource[]): {
  commitments: Commitment[];
  workItems: WorkItem[];
} {
  const commitments: Commitment[] = [];
  const workItems: WorkItem[] = [];

  for (const source of sources) {
    const text = source.text.toLowerCase();
    if (COMMITMENT_MARKERS.some((marker) => text.includes(marker))) {
      commitments.push({
        id: `c-${source.id}`,
        direction: "user_owes",
        statement: source.text.slice(0, 140),
        status: "open",
        confidence: 0.72,
        sourceRefs: [source.ref]
      });
      workItems.push(workItem(`w-${source.id}`, "commitment", source.text, source.ref, 0.7));
    }
    if (OWED_MARKERS.some((marker) => text.includes(marker))) {
      commitments.push({
        id: `o-${source.id}`,
        direction: "other_owes",
        statement: source.text.slice(0, 140),
        status: "open",
        confidence: 0.8,
        sourceRefs: [source.ref]
      });
      workItems.push(workItem(`f-${source.id}`, "follow_up", source.text, source.ref, 0.82));
    }
    if (FOLLOW_UP_MARKERS.some((marker) => text.includes(marker))) {
      workItems.push(workItem(`u-${source.id}`, "follow_up", source.text, source.ref, 0.64));
    }
  }

  return { commitments, workItems };
}

function workItem(
  id: string,
  kind: WorkItem["kind"],
  title: string,
  ref: SourceRef,
  confidence: number
): WorkItem {
  return {
    id,
    kind,
    title: title.slice(0, 90),
    urgency: confidence,
    importance: 0.7,
    confidence,
    status: "detected",
    sourceRefs: [ref]
  };
}
