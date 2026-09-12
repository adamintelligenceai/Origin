import {
  actionTypeSchema,
  type ActionPlan,
  type ActionType,
  type Consequence
} from "@project-chief/types";

export const MUTATING_ACTION_TYPES: readonly ActionType[] = [
  "email.send",
  "calendar.create",
  "calendar.update",
  "calendar.delete"
];

export const PROHIBITED_INTENT_MARKERS = [
  "payment",
  "purchase",
  "wire transfer",
  "account closure",
  "delete all mail",
  "medical prescription",
  "legal filing",
  "password",
  "ignore previous instructions"
] as const;

export function isKnownActionType(value: unknown): value is ActionType {
  return actionTypeSchema.safeParse(value).success;
}

export function isMutatingAction(actionType: ActionType): boolean {
  return MUTATING_ACTION_TYPES.includes(actionType);
}

export function defaultConsequence(actionType: ActionType): Consequence {
  switch (actionType) {
    case "email.draft":
      return "low";
    case "email.send":
    case "calendar.create":
    case "calendar.update":
      return "medium";
    case "calendar.delete":
      return "high";
    default: {
      const exhaustive: never = actionType;
      return exhaustive;
    }
  }
}

export function defaultRequiredAutonomy(actionType: ActionType): ActionPlan["requiredAutonomy"] {
  return isMutatingAction(actionType) ? 3 : 2;
}

export function containsProhibitedIntent(intent: string): boolean {
  const lowered = intent.toLowerCase();
  return PROHIBITED_INTENT_MARKERS.some((marker) => lowered.includes(marker));
}
