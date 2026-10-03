export interface AchievementDefinition {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Achievement extends AchievementDefinition {
  unlockedAt: string;
}

export interface ChiefLevel {
  level: number;
  title: string;
  minXp: number;
}

export interface GamificationProfile {
  xp: number;
  level: number;
  levelTitle: string;
  xpInLevel: number;
  xpToNextLevel: number;
  xpProgress: number;
  streakDays: number;
  longestStreak: number;
  weeklyGoal: number;
  weeklyProgress: number;
  verifiedTotal: number;
  achievements: Achievement[];
  nextAchievement?: AchievementDefinition | undefined;
}
