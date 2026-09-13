import type { SourceRef, WorkItem } from "@project-chief/types";

export type ObservationKind =
  | "email"
  | "calendar_event"
  | "manual"
  | "sms"
  | "missed_call"
  | "social_message";

export interface RawObservation {
  id: string;
  provider: SourceRef["provider"];
  providerId: string;
  kind: ObservationKind;
  capturedAt: string;
  payload: Record<string, unknown>;
}

export type SignalType =
  "commitment" | "follow_up" | "meeting_soon" | "unanswered" | "calendar_conflict";

export interface ObservationSignal {
  type: SignalType;
  text: string;
  confidence: number;
  dueAt?: string | undefined;
  counterparty?: string | undefined;
}

export interface NormalizedObservation {
  id: string;
  kind: Exclude<ObservationKind, "manual">;
  title: string;
  body?: string | undefined;
  startsAt?: string | undefined;
  endsAt?: string | undefined;
  participants: string[];
  sourceRef: SourceRef;
  signals: ObservationSignal[];
}

export interface ScoredWorkItemCandidate {
  id: string;
  kind: WorkItem["kind"];
  title: string;
  urgency: number;
  importance: number;
  confidence: number;
  sourceRefs: SourceRef[];
  dedupeKey: string;
}

export interface ProactiveEngineConfig {
  minConfidence: number;
  minUrgency: number;
  meetingPrepLeadMinutes: number;
  morningBriefingHourLocal: number;
}

export const DEFAULT_PROACTIVE_CONFIG: ProactiveEngineConfig = {
  minConfidence: 0.55,
  minUrgency: 0.2,
  meetingPrepLeadMinutes: 120,
  morningBriefingHourLocal: 8
};

export interface MorningBriefing {
  generatedAt: string;
  headline: string;
  sections: { title: string; items: string[] }[];
  workItemIds: string[];
}

export interface MeetingPrepBrief {
  eventTitle: string;
  startsAt: string;
  attendees: string[];
  relatedThreads: string[];
  suggestedActions: string[];
  workItemId: string;
}

export interface ProactivePlan {
  workItems: WorkItem[];
  morningBriefing?: MorningBriefing | undefined;
  meetingPreps: MeetingPrepBrief[];
}
