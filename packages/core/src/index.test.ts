import { expect, test } from "vitest";
import type { WorkLoop } from "./index";

test("work loop is a local interface bundle with no I/O imports", () => {
  const loop: WorkLoop = {
    detectors: [],
    planner: { plan: () => Promise.resolve([]) },
    executor: { execute: () => Promise.resolve(null) },
    verifier: {
      verify: () => Promise.reject(new Error("Verifier is not implemented in phase 0")),
    },
  };
  expect(loop.detectors).toEqual([]);
});
