import { describe, expect, it } from "vitest";
import { ChiefRuntime } from "@project-chief/runtime";
import {
  commitmentsFromSnapshot,
  decisionsFromSnapshot,
  meetingsFromSnapshot
} from "../runtime/view-model.js";
import { answerChief } from "./briefing.js";

describe("chief briefing", () => {
  it("returns who the user is waiting on from the runtime snapshot", async () => {
    const runtime = new ChiefRuntime();
    const snapshot = await runtime.boot();
    const answer = answerChief(
      "Who am I waiting on?",
      decisionsFromSnapshot(snapshot),
      commitmentsFromSnapshot(snapshot),
      meetingsFromSnapshot(snapshot),
      snapshot.routines,
      snapshot.meetingPrep
    );
    expect(answer.heading).toBe("Who you are waiting on");
    expect(answer.items[0]).toContain("Jordan Blake");
  });

  it("does not invent a long essay for tomorrow prep", async () => {
    const runtime = new ChiefRuntime();
    const snapshot = await runtime.boot();
    const answer = answerChief(
      "Prepare me for tomorrow",
      decisionsFromSnapshot(snapshot),
      commitmentsFromSnapshot(snapshot),
      meetingsFromSnapshot(snapshot),
      snapshot.routines,
      snapshot.meetingPrep
    );
    expect(answer.items.length).toBeGreaterThan(0);
    expect(answer.summary.length).toBeLessThan(180);
  });
});
