import { describe, expect, it } from "vitest";

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
});
