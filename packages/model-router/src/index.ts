export type ModelTask =
  "classification" | "extraction" | "draft" | "planning" | "high_value_reasoning";

export type ModelTier = "local" | "economy" | "standard" | "frontier";

export function routeModel(task: ModelTask, sensitivity: "low" | "medium" | "high"): ModelTier {
  if (task === "classification" || task === "extraction") {
    return sensitivity === "high" ? "local" : "economy";
  }
  if (task === "draft" || task === "planning") return "standard";
  return "frontier";
}
