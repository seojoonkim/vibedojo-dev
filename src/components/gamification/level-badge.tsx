"use client";

import { cn } from "@/lib/utils";
import { calculateLevel, type Level } from "@/lib/gamification";

interface LevelBadgeProps {
  xp: number;
  locale?: "ko" | "en";
  size?: "sm" | "md" | "lg";
  showName?: boolean;
}

export function LevelBadge({ xp, locale = "ko", size = "md", showName = true }: LevelBadgeProps) {
  const level = calculateLevel(xp);

  const sizeClasses = {
    sm: "h-6 w-6 text-xs",
    md: "h-8 w-8 text-sm",
    lg: "h-12 w-12 text-lg",
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "rounded-full flex items-center justify-center font-bold text-white",
          level.color,
          sizeClasses[size]
        )}
      >
        {level.level}
      </div>
      {showName && (
        <span className="font-medium">{level.name[locale]}</span>
      )}
    </div>
  );
}
