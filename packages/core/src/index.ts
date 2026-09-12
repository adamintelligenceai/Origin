import type { ActionPlan, ActionReceipt, WorkItem } from "@project-chief/types";
import { dedupeWorkItems } from "./dedup.js";
import { composeMeetingPrep, composeMorningBriefing } from "./pipeline/briefing.js";
import {
  detectFromNormalized,
  detectFromSources,
  type NormalizedSource
} from "./pipeline/detect.js";
import { normalize } from "./pipeline/normalize.js";
import { observe } from "./pipeline/observe.js";
import { proposeActionPlan } from "./pipeline/plan.js";
import { isActionable, scoreWorkItem } from "./pipeline/score.js";
import type { RawObservation } from "./types.js";

export interface Detector {
  detect(): Promise<WorkItem[]>;
}

export interface Planner {
  plan(item: WorkItem): Promise<ActionPlan[]>;
}

export interface Executor {
  execute(plan: ActionPlan): Promise<unknown>;
}

export interface Verifier {
  verify(plan: ActionPlan, executionResult: unknown): Promise<ActionReceipt>;
}

export interface WorkLoop {
  detectors: Detector[];
  planner: Planner;
  executor: Executor;
  verifier: Verifier;
}

export function runObservedPipeline(raw: readonly RawObservation[]) {
  const observed = observe(raw);
  const normalized = normalize(observed);
  const detected = detectFromNormalized(normalized);
  const workItems = dedupeWorkItems(detected.workItems)
    .filter((item) => isActionable(item))
    .sort((left, right) => scoreWorkItem(right) - scoreWorkItem(left));
  return {
    commitments: detected.commitments,
    workItems,
    plans: workItems.map(proposeActionPlan),
    briefing: composeMorningBriefing(workItems, detected.commitments),
    meetingPrep: composeMeetingPrep(workItems),
    observations: normalized
  };
}

export function runProactivePipeline(sources: NormalizedSource[]) {
  const detected = detectFromSources(sources);
  const workItems = dedupeWorkItems(detected.workItems)
    .filter((item) => isActionable(item))
    .sort((left, right) => scoreWorkItem(right) - scoreWorkItem(left));
  return {
    commitments: detected.commitments,
    workItems,
    plans: workItems.map(proposeActionPlan),
    briefing: composeMorningBriefing(workItems, detected.commitments),
    meetingPrep: composeMeetingPrep(workItems)
  };
}

export { composeMeetingPrep, composeMorningBriefing } from "./pipeline/briefing.js";
export {
  detectFromNormalized,
  detectFromSources,
  type NormalizedSource
} from "./pipeline/detect.js";
export { normalize } from "./pipeline/normalize.js";
export { observe } from "./pipeline/observe.js";
export { dedupeWorkItems } from "./dedup.js";
export { proposeActionPlan } from "./pipeline/plan.js";
export { isActionable, scoreWorkItem } from "./pipeline/score.js";
export type { NormalizedObservation, RawObservation } from "./types.js";
