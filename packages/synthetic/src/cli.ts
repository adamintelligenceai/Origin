#!/usr/bin/env node
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { generateHarbourline } from "./generator.js";
import type { SyntheticVariant } from "./index.js";

const VALID_VARIANTS: SyntheticVariant[] = ["clean", "planted", "messy", "partial"];

function parseVariant(value: string | undefined): SyntheticVariant {
  if (value && VALID_VARIANTS.includes(value as SyntheticVariant)) {
    return value as SyntheticVariant;
  }
  return "planted";
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  let seed = 42;
  let variant: SyntheticVariant = "planted";
  let output = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "output");
  let scale = 1;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--seed" && args[i + 1]) {
      seed = Number(args[++i]);
    } else if (arg === "--variant" && args[i + 1]) {
      variant = parseVariant(args[++i]);
    } else if (arg === "--output" && args[i + 1]) {
      output = path.resolve(args[++i] ?? output);
    } else if (arg === "--scale" && args[i + 1]) {
      scale = Number(args[++i]);
    }
  }

  output = path.join(output, `seed-${seed}`, variant);
  await mkdir(output, { recursive: true });

  const result = await generateHarbourline({ seed, variant, outputDir: output, scale });

  console.log(`MarginShield synthetic generator`);
  console.log(`  Company: ${result.groundTruth.company} (${result.groundTruth.tag})`);
  console.log(`  Seed: ${seed}  Variant: ${variant}  Scale: ${scale}`);
  console.log(`  Lines: ${result.lineCount.toLocaleString()}`);
  console.log(`  T12M revenue (generated): A$${Math.round(result.t12mRevenue).toLocaleString()}`);
  console.log(
    `  Planted addressable margin: A$${Math.round(result.groundTruth.totals.addressable_margin).toLocaleString()}`,
  );
  console.log(`  Output: ${output}`);
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
  main().catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  });
}
