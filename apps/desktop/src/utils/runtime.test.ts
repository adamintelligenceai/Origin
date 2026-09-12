import { describe, expect, it } from "vitest";
import { initialDecisions } from "../fixtures/synthetic.js";
import { approveDecision, planForDecision } from "./runtime.js";

describe("desktop approval runtime", () => {
  it("binds approval to the current proposed action", () => {
    const decision = initialDecisions[0];
    if (!decision) throw new Error("missing fixture");
    const first = planForDecision(decision);
    const edited = planForDecision({ ...decision, action: "A different draft" });
    expect(JSON.stringify(first.payload)).not.toEqual(JSON.stringify(edited.payload));
  });

  it("verifies a low-risk preparation without treating it as sent", async () => {
    const decision = initialDecisions[0];
    if (!decision) throw new Error("missing fixture");
    const result = await approveDecision(decision, 1);
    expect(result.state).toBe("verified");
    expect(result.receipt.permission).toContain("A2");
  });

  it("requires A3 for a calendar mutation", async () => {
    const decision = initialDecisions[1];
    if (!decision) throw new Error("missing fixture");
    const result = await approveDecision(decision, 1);
    expect(result.state).toBe("verified");
    expect(result.receipt.permission).toContain("A3");
  });
});
