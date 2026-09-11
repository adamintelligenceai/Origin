export const ENGINE_VERSION = "0.1.0";
export const ENGINE_MAJOR_VERSION = "0.1";

export interface EngineConfig {
  materialityThreshold: number;
  reportingCurrency: string;
}

export const DEFAULT_ENGINE_CONFIG: EngineConfig = {
  materialityThreshold: 250,
  reportingCurrency: "AUD",
};

export function createRunHashInput(parts: Record<string, string>): string {
  const ordered = Object.keys(parts)
    .sort()
    .map((key) => `${key}:${parts[key]}`)
    .join("|");
  return ordered;
}
