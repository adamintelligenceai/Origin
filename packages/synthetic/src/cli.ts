#!/usr/bin/env node
import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: {
    seed: { type: "string", default: "42" },
    variant: { type: "string", default: "planted" },
    output: { type: "string", default: "./output" },
  },
});

console.log(
  `MarginShield synthetic generator — seed=${values.seed} variant=${values.variant} output=${values.output}`,
);
console.log("Full generator implemented in Phase 2.");
