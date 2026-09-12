import type { Commitment, SourceRef, WorkItem } from "@project-chief/types";
import type { NormalizedObservation } from "../types.js";

const COMMITMENT_MARKERS = ["i will", "i'll", "i can send", "by friday", "due"];
const OWED_MARKERS = ["you promised", "waiting on", "still outstanding"];
const FOLLOW_UP_MARKERS = ["checking in", "any update", "follow up"];
const REPLY_READY_MARKERS = ["reply is ready", "draft is ready"];

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
    if (
      FOLLOW_UP_MARKERS.some((marker) => text.includes(marker)) &&
      !REPLY_READY_MARKERS.some((marker) => text.includes(marker))
    ) {
      workItems.push(workItem(`u-${source.id}`, "follow_up", source.text, source.ref, 0.64));
    }
  }

  return { commitments, workItems };
}

export function detectFromNormalized(observations: readonly NormalizedObservation[]): {
  commitments: Commitment[];
  workItems: WorkItem[];
} {
  const sources: NormalizedSource[] = observations.map((observation) => ({
    id: observation.id,
    text: `${observation.title} ${observation.body ?? ""}`,
    ref: observation.sourceRef
  }));
  const detected = detectFromSources(sources);
  const titles = new Map(observations.map((item) => [item.id, item.title]));
  detected.workItems = detected.workItems.map((item) => ({
    ...item,
    title: titles.get(item.sourceRefs[0]?.sourceId ?? "") ?? item.title
  }));
  const events = observations
    .filter((item) => item.kind === "calendar_event" && item.startsAt && item.endsAt)
    .sort((left, right) => (left.startsAt ?? "").localeCompare(right.startsAt ?? ""));
  for (let index = 1; index < events.length; index += 1) {
    const previous = events[index - 1];
    const current = events[index];
    if (
      previous?.endsAt &&
      current?.startsAt &&
      previous.endsAt > current.startsAt &&
      previous.startsAt &&
      previous.startsAt <= current.startsAt
    ) {
      detected.workItems.push({
        id: `conflict-${previous.id}-${current.id}`,
        kind: "calendar_conflict",
        title: "Resolve tomorrow's calendar conflict",
        urgency: 0.9,
        importance: 0.85,
        confidence: 0.88,
        status: "needs_approval",
        sourceRefs: [previous.sourceRef, current.sourceRef]
      });
    }
  }
  for (const observation of observations) {
    const haystack = `${observation.title} ${observation.body ?? ""}`.toLowerCase();
    if (REPLY_READY_MARKERS.some((marker) => haystack.includes(marker))) {
      detected.workItems.push({
        id: `reply-${observation.id}`,
        kind: "reply",
        title: observation.title || "Reply is ready",
        urgency: 0.7,
        importance: 0.75,
        confidence: 0.8,
        status: "needs_approval",
        sourceRefs: [observation.sourceRef]
      });
    }
  }
  return detected;
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
