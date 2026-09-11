import { describeHarbourline, parseSynthArgs } from "./index";

const options = parseSynthArgs(process.argv.slice(2));
const message = [
  describeHarbourline(),
  `seed=${options.seed}`,
  `variant=${options.variant}`,
  "Phase 2 will emit source files and ground_truth.json.",
].join("\n");

process.stdout.write(`${message}\n`);
