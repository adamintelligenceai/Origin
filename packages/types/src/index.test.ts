import { describe, expect, it } from "vitest";
import type { ActionType, AutonomyLevel } from "./index.js";

describe("domain type exports", () => {
  it("keeps autonomy levels within the documented range", () => {
    const levels: AutonomyLevel[] = [0, 1, 2, 3, 4];
    expect(levels).toHaveLength(5);
  });

  it("keeps action types stable for permission engine", () => {
    const actionTypes: ActionType[] = [
      "email.draft",
      "email.send",
      "calendar.create",
      "calendar.update",
      "calendar.delete"
    ];
    expect(actionTypes).toHaveLength(5);
  });
});
