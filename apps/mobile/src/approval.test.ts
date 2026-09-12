import { describe, expect, it } from "vitest";
import { briefingLine } from "./present.js";
import { resetRuntime } from "./session.js";

type State = "ready" | "confirm" | "executing" | "verified";

function nextState(state: State, event: "tap" | "swipe"): State {
  if (event === "swipe") {
    return state;
  }
  switch (state) {
    case "ready":
      return "confirm";
    case "confirm":
      return "executing";
    case "executing":
      return "verified";
    case "verified":
      return "verified";
    default: {
      const exhaustive: never = state;
      return exhaustive;
    }
  }
}

describe("mobile approval", () => {
  it("does not treat swipe as approval", () => {
    expect(nextState("ready", "swipe")).toBe("ready");
    expect(nextState("ready", "tap")).toBe("confirm");
  });

  it("builds the morning briefing from the runtime snapshot", async () => {
    const snapshot = await resetRuntime().boot();
    expect(briefingLine(snapshot)).toContain("decisions need you");
  });
});
