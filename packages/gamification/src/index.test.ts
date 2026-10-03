import type { ActionPlan, ActionReceipt, WorkItem } from "@project-chief/types";
import { describe, expect, it } from "vitest";
import { ACHIEVEMENTS, CHIEF_LEVELS, computeGamification } from "./index.js";

function receipt(id: string, at: string, planId = "plan-1"): ActionReceipt {
  return {
    id,
    actionPlanId: planId,
    startedAt: at,
    completedAt: at,
    connector: "mock",
    outcome: "verified",
    verification: { found: true, matches: true },
    inputHash: "in",
    outputHash: "out",
    privacy: {
      externalModelUsed: false,
      purpose: "test",
      categoriesSent: []
    }
  };
}

function plan(
  id: string,
  workItemId: string,
  consequence: ActionPlan["consequence"] = "medium"
): ActionPlan {
  return {
    id,
    workItemId,
    intent: "Test action",
    actionType: "email.draft",
    payload: { action: "Draft" },
    evidenceRefs: [],
    consequence,
    reversible: true,
    requiredAutonomy: 2,
    expectedPostcondition: {}
  };
}

function workItem(id: string, kind: WorkItem["kind"], status: WorkItem["status"]): WorkItem {
  return {
    id,
    kind,
    title: "Item",
    urgency: 0.5,
    importance: 0.5,
    confidence: 0.9,
    status,
    sourceRefs: []
  };
}

describe("computeGamification", () => {
  it("starts at Associate with no verified work", () => {
    const profile = computeGamification({
      receipts: [],
      plans: [],
      workItems: [],
      timeSavedMinutes: 0
    });
    expect(profile.level).toBe(1);
    expect(profile.levelTitle).toBe("Associate");
    expect(profile.xp).toBe(0);
    expect(profile.achievements).toHaveLength(0);
    expect(profile.nextAchievement?.id).toBe("first_verified");
  });

  it("awards XP and unlocks the first achievement", () => {
    const profile = computeGamification({
      receipts: [receipt("r1", "2026-10-03T08:00:00.000Z")],
      plans: [plan("plan-1", "w1", "high")],
      workItems: [workItem("w1", "follow_up", "verified")],
      timeSavedMinutes: 12,
      now: new Date("2026-10-03T09:00:00.000Z")
    });
    expect(profile.xp).toBeGreaterThan(0);
    expect(profile.achievements.some((item) => item.id === "first_verified")).toBe(true);
    expect(profile.verifiedTotal).toBe(1);
  });

  it("promotes to Deputy Chief after enough verified work", () => {
    const receipts: ActionReceipt[] = [];
    const plans: ActionPlan[] = [];
    const workItems: WorkItem[] = [];
    for (let index = 0; index < 5; index += 1) {
      const id = `w${index}`;
      receipts.push(receipt(`r${index}`, `2026-10-0${(index % 3) + 1}T08:00:00.000Z`, `p${index}`));
      plans.push(plan(`p${index}`, id, "high"));
      workItems.push(workItem(id, "follow_up", "verified"));
    }
    const profile = computeGamification({
      receipts,
      plans,
      workItems,
      timeSavedMinutes: 90,
      now: new Date("2026-10-03T09:00:00.000Z")
    });
    expect(profile.level).toBeGreaterThanOrEqual(2);
    expect(profile.achievements.some((item) => item.id === "hour_saved")).toBe(true);
  });

  it("tracks weekly progress from verified receipts", () => {
    const profile = computeGamification({
      receipts: [
        receipt("r1", "2026-10-01T08:00:00.000Z", "p1"),
        receipt("r2", "2026-10-03T08:00:00.000Z", "p2")
      ],
      plans: [plan("p1", "w1"), plan("p2", "w2")],
      workItems: [
        workItem("w1", "follow_up", "verified"),
        workItem("w2", "reply", "verified")
      ],
      timeSavedMinutes: 0,
      now: new Date("2026-10-03T09:00:00.000Z")
    });
    expect(profile.weeklyProgress).toBe(2);
    expect(profile.weeklyGoal).toBe(7);
  });
});

describe("catalogs", () => {
  it("defines five chief levels", () => {
    expect(CHIEF_LEVELS).toHaveLength(5);
  });

  it("defines ten achievements", () => {
    expect(ACHIEVEMENTS).toHaveLength(10);
  });
});
