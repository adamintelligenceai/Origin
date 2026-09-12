import { describe, expect, it } from "vitest";
import { commitments, initialDecisions, meetings } from "../fixtures/synthetic.js";
import { answerChief } from "./briefing.js";

describe("chief briefing", () => {
  it("returns who the user is waiting on", () => {
    const answer = answerChief("Who am I waiting on?", initialDecisions, commitments, meetings);
    expect(answer.heading).toBe("Who you are waiting on");
    expect(answer.items[0]).toContain("Jordan Blake");
  });

  it("does not invent a long essay for tomorrow prep", () => {
    const answer = answerChief("Prepare me for tomorrow", initialDecisions, commitments, meetings);
    expect(answer.items.length).toBeGreaterThan(0);
    expect(answer.summary.length).toBeLessThan(180);
  });
});
