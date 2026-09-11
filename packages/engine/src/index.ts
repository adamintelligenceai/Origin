import { ENGINE_MAJOR_VERSION, ENGINE_VERSION, METHOD_VERSION } from "@marginshield/schemas";
import { makeFindingId } from "./finding-id";
import { canonicalJson, sha256Hex } from "./hash";
import { makeRunHash } from "./run-hash";
import { allocateSellTranches } from "./tranche";

export const engineIdentity = {
  engineVersion: ENGINE_VERSION,
  engineMajorVersion: ENGINE_MAJOR_VERSION,
  methodVersion: METHOD_VERSION,
} as const;

export { allocateSellTranches, canonicalJson, makeFindingId, makeRunHash, sha256Hex };
