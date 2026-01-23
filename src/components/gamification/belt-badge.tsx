"use client";

import { getBeltByXp, getBeltProgress, getNextBelt, getXpToNextBelt, BELTS, type Belt } from "@/lib/belt-system";
import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";

interface BeltBadgeProps {
  xp: number;
  size?: "sm" | "md" | "lg";
  showProgress?: boolean;
  className?: string;
}

export function BeltBadge({ xp, size = "md", showProgress = false, className }: BeltBadgeProps) {
  const belt = getBeltByXp(xp);
  const progress = getBeltProgress(xp);
  const nextBelt = getNextBelt(belt);

  const sizeClasses = {
    sm: "h-4 text-[10px] px-1.5",
    md: "h-5 text-[11px] px-2",
    lg: "h-6 text-xs px-2.5",
  };

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div
        className={cn(
          "inline-flex items-center rounded-full font-medium",
          sizeClasses[size],
          `belt-${belt.id}`
        )}
      >
        <span className="truncate">{belt.nameKo} {belt.rank}</span>
      </div>
      {showProgress && nextBelt && (
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${progress}%`,
                backgroundColor: belt.color,
              }}
            />
          </div>
          <span>{progress}%</span>
        </div>
      )}
    </div>
  );
}

interface BeltDisplayProps {
  xp: number;
  className?: string;
}

export function BeltDisplay({ xp, className }: BeltDisplayProps) {
  const belt = getBeltByXp(xp);
  const progress = getBeltProgress(xp);
  const nextBelt = getNextBelt(belt);

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-2 rounded-sm"
            style={{ backgroundColor: belt.color }}
          />
          <span className="text-xs font-medium">{belt.nameKo} {belt.rank}</span>
        </div>
        {nextBelt && (
          <span className="text-[10px] text-muted-foreground">
            다음: {nextBelt.nameKo} {nextBelt.rank}
          </span>
        )}
      </div>
      {nextBelt && (
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              backgroundColor: belt.color,
            }}
          />
        </div>
      )}
      <p className="text-[10px] text-muted-foreground">{belt.description}</p>
    </div>
  );
}

interface BeltProgressCardProps {
  xp: number;
  className?: string;
}

export function BeltProgressCard({ xp, className }: BeltProgressCardProps) {
  const currentBelt = getBeltByXp(xp);
  const nextBelt = getNextBelt(currentBelt);
  const progress = getBeltProgress(xp);
  const xpToNext = getXpToNextBelt(xp);
  const currentBeltIndex = BELTS.findIndex(b => b.id === currentBelt.id);

  return (
    <div className={cn(
      "relative bg-white/90 backdrop-blur-sm p-6 sm:p-7 border border-stone-300 rounded-sm shadow-sm",
      className
    )}>
      {/* Header with XP */}
      <div className="flex items-center justify-between mb-6 sm:mb-7">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="relative p-3 bg-yellow-100 border border-yellow-200 rounded-sm">
            <Zap className="h-7 sm:h-9 w-7 sm:w-9 text-yellow-600 fill-yellow-600" />
          </div>
          <div>
            <p className="text-xs sm:text-sm text-stone-500 uppercase tracking-wider">총 경험치</p>
            <p className="text-2xl sm:text-3xl font-bold text-stone-800">
              {xp.toLocaleString()} <span className="text-sm sm:text-base text-stone-500">XP</span>
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="inline-flex items-center gap-3">
            <div
              className={cn(
                "w-10 sm:w-12 h-6 sm:h-7 rounded-sm flex items-center justify-center border border-stone-300",
                currentBelt.bgColor
              )}
            >
              <span className={cn(
                "text-[10px] sm:text-xs font-bold",
                currentBelt.id === 'white' ? 'text-stone-500' : currentBelt.id === 'black' ? 'text-white' : 'text-stone-700'
              )}>
                {currentBelt.rank}
              </span>
            </div>
            <span className="text-sm sm:text-base font-semibold text-stone-700">{currentBelt.nameKo}</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-2">{currentBelt.description}</p>
        </div>
      </div>

      {/* Next Belt Progress */}
      {nextBelt && (
        <div className="mb-6 sm:mb-7">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs sm:text-sm text-stone-500 uppercase tracking-wider">다음 띠까지</span>
            <span className="text-xs sm:text-sm font-medium text-stone-700">
              {xpToNext.toLocaleString()} XP 남음
            </span>
          </div>
          <div className="relative h-3 sm:h-4 bg-stone-200 overflow-hidden border border-stone-300/50 rounded-sm">
            {/* Progress bar */}
            <div
              className="absolute inset-y-0 left-0 transition-all duration-500 rounded-sm"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${currentBelt.color}, ${nextBelt.color})`,
              }}
            />
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs sm:text-sm text-stone-500">
              {currentBelt.nameKo} {currentBelt.rank} <span className="text-stone-400">{currentBelt.minXp.toLocaleString()} XP</span>
            </span>
            <span
              className="text-xs sm:text-sm font-medium"
              style={{ color: nextBelt.color }}
            >
              {nextBelt.nameKo} {nextBelt.rank} <span className="opacity-70">{nextBelt.minXp.toLocaleString()} XP</span>
            </span>
          </div>
        </div>
      )}

      {/* All Belts Overview */}
      <div>
        <p className="text-xs sm:text-sm text-stone-500 mb-4 sm:mb-5 uppercase tracking-wider">VibeDojo 띠 등급 체계</p>
        <div className="flex items-start gap-1 sm:gap-1.5">
          {BELTS.map((belt, index) => {
            const isCurrentOrPast = index <= currentBeltIndex;
            const isCurrent = belt.id === currentBelt.id;

            return (
              <div
                key={belt.id}
                className="group relative flex-1 flex flex-col items-center"
              >
                <div
                  className={cn(
                    "w-full h-5 sm:h-6 rounded-sm flex items-center justify-center transition-all border",
                    belt.bgColor,
                    isCurrent ? "border-stone-600 ring-1 ring-stone-500/50" : "border-stone-300",
                    !isCurrentOrPast && "opacity-40"
                  )}
                >
                  <span className={cn(
                    "text-[8px] sm:text-[10px] font-bold",
                    belt.id === 'white' ? 'text-stone-500' : belt.id === 'black' ? 'text-white' : 'text-stone-700'
                  )}>
                    {belt.rank}
                  </span>
                </div>
                {/* Belt name */}
                <span className={cn(
                  "text-[8px] sm:text-[10px] mt-2 text-center",
                  isCurrent ? "text-stone-700 font-medium" : "text-stone-400"
                )}>
                  {belt.nameKo}
                </span>
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-white border border-stone-300 shadow-md rounded-sm text-xs sm:text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  <span style={{ color: belt.color }}>{belt.nameKo} {belt.rank}</span>
                  <span className="text-stone-500 ml-1">{belt.minXp.toLocaleString()}+ XP</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
