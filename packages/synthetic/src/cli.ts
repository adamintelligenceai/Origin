import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describeHarbourline, generateHarbourline, parseSynthArgs } from "./index";

const options = parseSynthArgs(process.argv.slice(2));
const result = generateHarbourline(options);
const repoRoot = fileURLToPath(new URL("../../..", import.meta.url));
const outDir = join(repoRoot, "synth-output", options.variant);
mkdirSync(outDir, { recursive: true });
for (const file of result.files) {
  writeFileSync(join(outDir, file.name), file.contents);
}
writeFileSync(
  join(outDir, "ground_truth.json"),
  `${JSON.stringify(result.groundTruth, null, 2)}\n`,
);

process.stdout.write(
  [
    describeHarbourline(),
    `seed=${options.seed}`,
    `variant=${options.variant}`,
    `files=${outDir}`,
    `t12mSalesAud=${result.groundTruth.t12mSalesAud}`,
    `plantedTotal=${result.groundTruth.totals.totalAddressable}`,
  ].join("\n") + "\n",
);
