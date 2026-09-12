import type { ActionPlan, ActionReceipt, WorkItem } from "@project-chief/types";

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

export type WorkLoop = {
  detectors: Detector[];
  planner: Planner;
  executor: Executor;
  verifier: Verifier;
};
