"use client";

import { Progress } from "@/components/ui/progress";
import { getXpForNextLevel, calculateLevel, LEVELS } from "@/lib/gamification";

interface XpProgressProps {
  xp: number;
  locale?: "ko" | "en";
  showDetails?: boolean;
}

export function XpProgress({ xp, locale = "ko", showDetails = true }: XpProgressProps) {
  const { current, needed, progress } = getXpForNextLevel(xp);
  const currentLevel = calculateLevel(xp);
  const nextLevelIndex = LEVELS.findIndex((l) => l.level === currentLevel.level) + 1;
  const nextLevel = LEVELS[nextLevelIndex];

  return (
    <div className="space-y-2">
      <Progress value={progress} className="h-2" />
      {showDetails && (
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{current.toLocaleString()} XP</span>
          {nextLevel ? (
            <span>
              {locale === "ko" ? "다음 레벨까지" : "Next level"}: {(needed - current).toLocaleString()} XP
            </span>
          ) : (
            <span>{locale === "ko" ? "최고 레벨 달성!" : "Max level reached!"}</span>
          )}
        </div>
      )}
    </div>
  );
}
