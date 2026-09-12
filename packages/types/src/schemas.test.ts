import { describe, expect, it } from "vitest";
import {
  actionPlanSchema,
  actionTypeSchema,
  autonomyLevelSchema,
  personSchema
} from "./schemas.js";

describe("canonical schemas", () => {
  it("keeps autonomy levels within the documented range", () => {
    expect(autonomyLevelSchema.options.map((option) => option.value)).toEqual([0, 1, 2, 3, 4]);
  });

  it("keeps action types stable for the permission engine", () => {
    expect(actionTypeSchema.options).toEqual([
      "email.draft",
      "email.send",
      "calendar.create",
      "calendar.update",
      "calendar.delete"
    ]);
  });

  it("rejects unknown action types", () => {
    const result = actionPlanSchema.safeParse({
      id: "plan-1",
      workItemId: "work-1",
      intent: "pay a vendor",
      actionType: "payments.send",
      payload: {},
      evidenceRefs: [],
      consequence: "high",
      reversible: false,
      requiredAutonomy: 3,
      expectedPostcondition: {}
    });
    expect(result.success).toBe(false);
  });

  it("models people as local graph records", () => {
    const parsed = personSchema.parse({
      id: "p1",
      displayName: "Jordan Blake",
      aliases: ["Jordan"],
      confidence: 0.9,
      provenance: []
    });
    expect(parsed.displayName).toBe("Jordan Blake");
  });
});
