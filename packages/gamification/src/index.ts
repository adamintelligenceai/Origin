import type { ActionPlan, ActionReceipt, WorkItem } from "@project-chief/types";
import type {
  Achievement,
  AchievementDefinition,
  ChiefLevel,
  GamificationProfile
} from "./types.js";

export const CHIEF_LEVELS: ChiefLevel[] = [
  { level: 1, title: "Associate", minXp: 0 },
  { level: 2, title: "Deputy Chief", minXp: 100 },
  { level: 3, title: "Chief of Staff", minXp: 300 },
  { level: 4, title: "Executive Chief", minXp: 700 },
  { level: 5, title: "Master Chief", minXp: 1500 }
];

export const ACHIEVEMENTS: AchievementDefinition[] = [
  {
    id: "first_verified",
    title: "First Move",
    description: "Complete your first verified action.",
    icon: "◆"
  },
  {
    id: "ten_verified",
    title: "Trusted Operator",
    description: "Verify ten actions with external proof.",
    icon: "◈"
  },
  {
    id: "fifty_verified",
    title: "Delegation Master",
    description: "Verify fifty actions end to end.",
    icon: "◇"
  },
  {
    id: "week_streak",
    title: "Week Warrior",
    description: "Maintain a seven-day verified streak.",
    icon: "▲"
  },
  {
    id: "month_streak",
    title: "Relentless",
    description: "Maintain a thirty-day verified streak.",
    icon: "★"
  },
  {
    id: "hour_saved",
    title: "Time Liberator",
    description: "Save one hour of manual work.",
    icon: "◷"
  },
  {
    id: "five_hours",
    title: "Capacity Multiplier",
    description: "Save five hours of manual work.",
    icon: "◔"
  },
  {
    id: "inbox_zero",
    title: "Inbox Zero",
    description: "Clear every pending decision in one day.",
    icon: "○"
  },
  {
    id: "commitment_keeper",
    title: "Word Keeper",
    description: "Resolve five commitments.",
    icon: "◐"
  },
  {
    id: "meeting_master",
    title: "Meeting Master",
    description: "Verify ten meeting-prep actions.",
    icon: "◑"
  }
];

export interface GamificationInput {
  receipts: ActionReceipt[];
  plans: ActionPlan[];
  workItems: WorkItem[];
  timeSavedMinutes: number;
  now?: Date;
}

export function computeGamification(input: GamificationInput): GamificationProfile {
  const now = input.now ?? new Date();
  const verifiedReceipts = input.receipts.filter((item) => item.outcome === "verified");
  const verifiedTotal = verifiedReceipts.length;
  const xpFromActions = verifiedReceipts.reduce(
    (sum, receipt) => sum + xpForReceipt(receipt, input.plans),
    0
  );
  const xpFromTime = Math.min(input.timeSavedMinutes, 300);
  const streak = computeStreak(verifiedReceipts, now);
  const streakBonus = streak.current * 5;
  const xp = xpFromActions + xpFromTime + streakBonus;
  const levelInfo = levelForXp(xp);
  const achievements = unlockAchievements(input, verifiedReceipts, streak, now);
  const weekly = weeklyProgress(verifiedReceipts, now);
  const nextAchievement = nextLockedAchievement(achievements);

  return {
    xp,
    level: levelInfo.level,
    levelTitle: levelInfo.title,
    xpInLevel: xp - levelInfo.minXp,
    xpToNextLevel: levelInfo.nextMinXp - levelInfo.minXp,
    xpProgress: levelInfo.progress,
    streakDays: streak.current,
    longestStreak: streak.longest,
    weeklyGoal: 7,
    weeklyProgress: weekly,
    verifiedTotal,
    achievements,
    ...(nextAchievement ? { nextAchievement } : {})
  };
}

function xpForReceipt(receipt: ActionReceipt, plans: ActionPlan[]): number {
  const plan = plans.find((item) => item.id === receipt.actionPlanId);
  if (!plan) {
    return 25;
  }
  switch (plan.consequence) {
    case "high":
      return 40;
    case "low":
      return 15;
    case "medium":
    case "prohibited":
      return 25;
    default: {
      const exhaustive: never = plan.consequence;
      return exhaustive;
    }
  }
}

function levelForXp(xp: number): {
  level: number;
  title: string;
  minXp: number;
  nextMinXp: number;
  progress: number;
} {
  let current: ChiefLevel = CHIEF_LEVELS[0] ?? { level: 1, title: "Associate", minXp: 0 };
  for (const entry of CHIEF_LEVELS) {
    if (xp >= entry.minXp) {
      current = entry;
    }
  }
  const index = CHIEF_LEVELS.findIndex((item) => item.level === current.level);
  const next = CHIEF_LEVELS[index + 1];
  if (!next) {
    return {
      level: current.level,
      title: current.title,
      minXp: current.minXp,
      nextMinXp: current.minXp + 500,
      progress: 1
    };
  }
  const span = next.minXp - current.minXp;
  return {
    level: current.level,
    title: current.title,
    minXp: current.minXp,
    nextMinXp: next.minXp,
    progress: span === 0 ? 1 : Math.min(1, (xp - current.minXp) / span)
  };
}

function computeStreak(
  receipts: ActionReceipt[],
  now: Date
): { current: number; longest: number } {
  const days = new Set(
    receipts
      .map((item) => dayKey(new Date(item.completedAt ?? item.startedAt)))
      .filter(Boolean)
  );
  if (days.size === 0) {
    return { current: 0, longest: 0 };
  }

  let current = 0;
  const cursor = new Date(now);
  cursor.setHours(0, 0, 0, 0);
  while (days.has(dayKey(cursor))) {
    current += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  const sorted = [...days].sort();
  let longest = 0;
  let run = 0;
  let previous: string | undefined;
  for (const day of sorted) {
    if (previous && dayDiff(previous, day) === 1) {
      run += 1;
    } else {
      run = 1;
    }
    longest = Math.max(longest, run);
    previous = day;
  }

  return { current, longest };
}

function weeklyProgress(receipts: ActionReceipt[], now: Date): number {
  const start = startOfWeek(now);
  return receipts.filter((item) => {
    const at = new Date(item.completedAt ?? item.startedAt);
    return at >= start;
  }).length;
}

function unlockAchievements(
  input: GamificationInput,
  verifiedReceipts: ActionReceipt[],
  streak: { current: number; longest: number },
  now: Date
): Achievement[] {
  const unlocked: Achievement[] = [];
  const push = (id: string, at: string) => {
    const definition = ACHIEVEMENTS.find((item) => item.id === id);
    if (!definition || unlocked.some((item) => item.id === id)) {
      return;
    }
    unlocked.push({ ...definition, unlockedAt: at });
  };

  if (verifiedReceipts[0]) {
    push("first_verified", verifiedReceipts[0].completedAt ?? verifiedReceipts[0].startedAt);
  }
  if (verifiedReceipts.length >= 10) {
    const tenth = verifiedReceipts[9];
    if (tenth) {
      push("ten_verified", tenth.completedAt ?? tenth.startedAt);
    }
  }
  if (verifiedReceipts.length >= 50) {
    const fiftieth = verifiedReceipts[49];
    if (fiftieth) {
      push("fifty_verified", fiftieth.completedAt ?? fiftieth.startedAt);
    }
  }
  if (streak.longest >= 7 || streak.current >= 7) {
    push("week_streak", now.toISOString());
  }
  if (streak.longest >= 30 || streak.current >= 30) {
    push("month_streak", now.toISOString());
  }
  if (input.timeSavedMinutes >= 60) {
    push("hour_saved", now.toISOString());
  }
  if (input.timeSavedMinutes >= 300) {
    push("five_hours", now.toISOString());
  }
  if (inboxZero(input.workItems, now)) {
    push("inbox_zero", now.toISOString());
  }
  const resolvedCommitments = input.workItems.filter(
    (item) => item.kind === "commitment" && item.status === "verified"
  ).length;
  if (resolvedCommitments >= 5) {
    push("commitment_keeper", now.toISOString());
  }
  const meetingPrep = verifiedReceipts.filter((receipt) => {
    const plan = input.plans.find((item) => item.id === receipt.actionPlanId);
    const workItem = input.workItems.find((item) => item.id === plan?.workItemId);
    return workItem?.kind === "meeting_prep";
  });
  if (meetingPrep.length >= 10) {
    const tenth = meetingPrep[9];
    if (tenth) {
      push("meeting_master", tenth.completedAt ?? tenth.startedAt);
    }
  }

  return unlocked.sort(
    (left, right) => new Date(left.unlockedAt).getTime() - new Date(right.unlockedAt).getTime()
  );
}

function nextLockedAchievement(unlocked: Achievement[]): AchievementDefinition | undefined {
  const ids = new Set(unlocked.map((item) => item.id));
  return ACHIEVEMENTS.find((item) => !ids.has(item.id));
}

function inboxZero(workItems: WorkItem[], now: Date): boolean {
  const today = dayKey(now);
  const pending = workItems.filter(
    (item) =>
      item.status !== "verified" &&
      item.status !== "dismissed" &&
      item.status !== "failed"
  );
  const verifiedToday = workItems.some(
    (item) => item.status === "verified" && dayKey(now) === today
  );
  return verifiedToday && pending.length === 0;
}

function dayKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function dayDiff(left: string, right: string): number {
  const start = new Date(left).getTime();
  const end = new Date(right).getTime();
  return Math.round((end - start) / 86_400_000);
}

function startOfWeek(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  const day = copy.getDay();
  const offset = day === 0 ? 6 : day - 1;
  copy.setDate(copy.getDate() - offset);
  return copy;
}

export function formatXp(xp: number): string {
  return xp.toLocaleString();
}

export function streakLabel(days: number): string {
  if (days <= 0) {
    return "Start today";
  }
  if (days === 1) {
    return "1 day";
  }
  return `${days} days`;
}

export type {
  Achievement,
  AchievementDefinition,
  ChiefLevel,
  GamificationProfile
} from "./types.js";
