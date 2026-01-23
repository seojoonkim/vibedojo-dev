"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal, Award, Flame, Crown, Star, Zap, TrendingUp, Target } from "lucide-react";
import { BeltBadge } from "@/components/gamification/belt-badge";
import { cn } from "@/lib/utils";

interface LeaderboardUser {
  id: string;
  username: string;
  avatar_url: string | null;
  total_xp: number;
  streak_days: number;
}

// Mock data
const mockLeaderboard: LeaderboardUser[] = [
  { id: "1", username: "vibecoder123", avatar_url: null, total_xp: 2450, streak_days: 15 },
  { id: "2", username: "ai_master", avatar_url: null, total_xp: 2100, streak_days: 21 },
  { id: "3", username: "prompt_ninja", avatar_url: null, total_xp: 1850, streak_days: 8 },
  { id: "4", username: "cursor_pro", avatar_url: null, total_xp: 1600, streak_days: 12 },
  { id: "5", username: "newbie_dev", avatar_url: null, total_xp: 1200, streak_days: 5 },
  { id: "6", username: "code_learner", avatar_url: null, total_xp: 950, streak_days: 3 },
  { id: "7", username: "tech_thinker", avatar_url: null, total_xp: 700, streak_days: 7 },
  { id: "8", username: "vibe_starter", avatar_url: null, total_xp: 450, streak_days: 2 },
];

function getRankIcon(rank: number) {
  if (rank === 1) return <Crown className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />;
  if (rank === 2) return <Medal className="h-4 w-4 sm:h-5 sm:w-5 text-stone-300" />;
  if (rank === 3) return <Award className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />;
  return <span className="text-xs sm:text-sm font-bold text-stone-500">{rank}</span>;
}

function getRankStyle(rank: number) {
  if (rank === 1) return "border-yellow-500/60 bg-yellow-50 shadow-lg";
  if (rank === 2) return "border-stone-400/60 bg-stone-50 shadow-md";
  if (rank === 3) return "border-yellow-600/50 bg-yellow-50/50 shadow-md";
  return "border-stone-300 bg-white/90 hover:border-stone-400";
}

function LeaderboardRow({ user, rank, type }: { user: LeaderboardUser; rank: number; type: "xp" | "streak" }) {
  const isTopThree = rank <= 3;

  return (
    <div className={cn(
      "group relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border transition-all duration-300 rounded-sm",
      getRankStyle(rank),
      !isTopThree && "hover:bg-stone-50"
    )}>
      <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
        {getRankIcon(rank)}
      </div>

      <Avatar className={cn(
        "h-10 w-10 sm:h-12 sm:w-12 ring-2 transition-all",
        rank === 1 ? "ring-yellow-500/50" :
        rank === 2 ? "ring-stone-400/50" :
        rank === 3 ? "ring-yellow-600/50" :
        "ring-stone-300 group-hover:ring-stone-400"
      )}>
        <AvatarImage src={user.avatar_url || undefined} />
        <AvatarFallback className={cn(
          "text-white text-xs sm:text-sm font-bold",
          rank === 1 ? "bg-gradient-to-br from-yellow-400 to-yellow-600" :
          rank === 2 ? "bg-gradient-to-br from-stone-400 to-stone-600" :
          rank === 3 ? "bg-gradient-to-br from-yellow-500 to-yellow-700" :
          "bg-gradient-to-br from-stone-500 to-stone-700"
        )}>
          {user.username.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className={cn(
          "font-semibold text-sm sm:text-base truncate transition-colors",
          rank === 1 ? "text-yellow-700" :
          rank === 2 ? "text-stone-600" :
          rank === 3 ? "text-yellow-700" :
          "text-stone-700 group-hover:text-stone-800"
        )}>
          {user.username}
        </div>
        <BeltBadge xp={user.total_xp} size="sm" />
      </div>

      <div className="text-right shrink-0">
        {type === "xp" ? (
          <>
            <div className={cn(
              "font-bold text-base sm:text-lg flex items-center gap-1.5 justify-end",
              rank === 1 ? "text-yellow-600" :
              rank === 2 ? "text-stone-600" :
              rank === 3 ? "text-yellow-600" :
              "text-yellow-700"
            )}>
              <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
              {user.total_xp.toLocaleString()}
            </div>
            <div className="text-[10px] sm:text-xs text-stone-500">XP</div>
          </>
        ) : (
          <>
            <div className={cn(
              "font-bold text-base sm:text-lg flex items-center gap-1.5 justify-end",
              rank === 1 ? "text-orange-600" :
              rank === 2 ? "text-orange-500" :
              rank === 3 ? "text-orange-600" :
              "text-orange-600"
            )}>
              <Flame className="h-4 w-4 sm:h-5 sm:w-5" />
              {user.streak_days}
            </div>
            <div className="text-[10px] sm:text-xs text-stone-500">일 연속</div>
          </>
        )}
      </div>
    </div>
  );
}

export default function LeaderboardPage() {
  const [users] = useState<LeaderboardUser[]>(mockLeaderboard);
  const [activeTab, setActiveTab] = useState("xp");

  const sortedByXP = [...users].sort((a, b) => b.total_xp - a.total_xp);
  const sortedByStreak = [...users].sort((a, b) => b.streak_days - a.streak_days);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-100 to-stone-200 relative overflow-hidden">
      {/* Subtle warm glow background */}
      <div className="fixed top-10 right-20 w-72 h-72 bg-yellow-800/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-10 left-20 w-80 h-80 bg-stone-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Wood floor texture overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(139,90,43,0.2) 60px, rgba(139,90,43,0.2) 61px)`
      }} />

      {/* Decorative Kanji */}
      <div className="fixed top-24 left-8 text-[120px] sm:text-[180px] font-serif text-stone-400/[0.08] pointer-events-none select-none leading-none">
        榮
      </div>
      <div className="fixed bottom-16 right-8 text-[100px] sm:text-[150px] font-serif text-stone-400/[0.08] pointer-events-none select-none leading-none">
        譽
      </div>

      {/* Header */}
      <div className="relative border-b border-stone-300">
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent" />
        <div className="container relative py-8 sm:py-10">
          <div className="text-center mb-8 sm:mb-10">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-1 h-8 bg-gradient-to-b from-stone-500 to-stone-600 rounded-full" />
              <h1 className="text-xl sm:text-2xl font-bold text-stone-800">
                명예의 전당
              </h1>
              <div className="w-1 h-8 bg-gradient-to-b from-stone-600 to-stone-500 rounded-full" />
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">최고의 바이브 코더들</p>
          </div>

          {/* Top 3 Podium - Traditional Style */}
          <div className="relative bg-white/90 backdrop-blur-sm p-6 sm:p-8 border border-stone-300 max-w-lg mx-auto rounded-sm shadow-sm">
            <div className="grid grid-cols-3 gap-3 sm:gap-6 items-end">
              {/* 2nd place */}
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <Avatar className="relative h-14 w-14 sm:h-16 sm:w-16 ring-2 ring-stone-400">
                    <AvatarFallback className="bg-gradient-to-br from-stone-400 to-stone-600 text-white font-bold text-sm sm:text-base">
                      {sortedByXP[1]?.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 sm:w-7 sm:h-7 bg-stone-500 flex items-center justify-center text-white text-xs sm:text-sm font-bold rounded-sm">
                    2
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 text-center">
                  <div className="font-semibold text-[11px] sm:text-xs text-stone-600 truncate max-w-[80px] sm:max-w-[100px]">
                    {sortedByXP[1]?.username}
                  </div>
                  <div className="text-stone-700 font-bold text-sm sm:text-base mt-0.5">
                    {sortedByXP[1]?.total_xp.toLocaleString()} <span className="text-[10px] sm:text-xs">XP</span>
                  </div>
                </div>
                {/* Podium bar */}
                <div className="w-full h-16 sm:h-20 mt-3 bg-gradient-to-t from-stone-300 to-stone-200 border border-stone-300 rounded-t-sm" />
              </div>

              {/* 1st place */}
              <div className="flex flex-col items-center -mt-6 sm:-mt-8">
                <div className="mb-2">
                  <Crown className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500" />
                </div>
                <div className="relative group">
                  <Avatar className="relative h-16 w-16 sm:h-20 sm:w-20 ring-2 ring-yellow-500 shadow-lg">
                    <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-white font-bold text-base sm:text-lg">
                      {sortedByXP[0]?.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white text-sm sm:text-base font-bold rounded-sm">
                    1
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 text-center">
                  <div className="font-bold text-xs sm:text-sm text-yellow-700 truncate max-w-[90px] sm:max-w-[120px]">
                    {sortedByXP[0]?.username}
                  </div>
                  <div className="text-yellow-700 font-bold text-base sm:text-lg mt-0.5">
                    {sortedByXP[0]?.total_xp.toLocaleString()} <span className="text-xs sm:text-sm">XP</span>
                  </div>
                </div>
                {/* Podium bar */}
                <div className="w-full h-24 sm:h-28 mt-3 bg-gradient-to-t from-yellow-200 to-yellow-100 border border-yellow-300 rounded-t-sm shadow-md" />
              </div>

              {/* 3rd place */}
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <Avatar className="relative h-12 w-12 sm:h-14 sm:w-14 ring-2 ring-yellow-600/60">
                    <AvatarFallback className="bg-gradient-to-br from-yellow-500 to-yellow-700 text-white font-bold text-xs sm:text-sm">
                      {sortedByXP[2]?.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 sm:w-6 sm:h-6 bg-yellow-600 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold rounded-sm">
                    3
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 text-center">
                  <div className="font-semibold text-[10px] sm:text-xs text-yellow-700 truncate max-w-[70px] sm:max-w-[90px]">
                    {sortedByXP[2]?.username}
                  </div>
                  <div className="text-yellow-700 font-bold text-sm sm:text-base mt-0.5">
                    {sortedByXP[2]?.total_xp.toLocaleString()} <span className="text-[10px] sm:text-xs">XP</span>
                  </div>
                </div>
                {/* Podium bar */}
                <div className="w-full h-12 sm:h-14 mt-3 bg-gradient-to-t from-yellow-200/70 to-yellow-100/50 border border-yellow-300/80 rounded-t-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-xl mx-auto">
          {/* Traditional dojo styled tabs */}
          <TabsList className="bg-white/90 backdrop-blur-sm border border-stone-300 p-1 h-auto grid w-full grid-cols-2 mb-6 rounded-sm shadow-sm">
            <TabsTrigger
              value="xp"
              className="rounded-sm h-10 sm:h-11 text-xs sm:text-sm text-stone-500 hover:text-stone-700 data-[state=active]:bg-stone-800 data-[state=active]:text-white transition-all"
            >
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              XP 랭킹
            </TabsTrigger>
            <TabsTrigger
              value="streak"
              className="rounded-sm h-10 sm:h-11 text-xs sm:text-sm text-stone-500 hover:text-stone-700 data-[state=active]:bg-stone-800 data-[state=active]:text-white transition-all"
            >
              <Flame className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              연속 수련
            </TabsTrigger>
          </TabsList>

          <TabsContent value="xp" className="space-y-3 sm:space-y-4 mt-0">
            {sortedByXP.map((user, index) => (
              <LeaderboardRow key={user.id} user={user} rank={index + 1} type="xp" />
            ))}
          </TabsContent>

          <TabsContent value="streak" className="space-y-3 sm:space-y-4 mt-0">
            {sortedByStreak.map((user, index) => (
              <LeaderboardRow key={user.id} user={user} rank={index + 1} type="streak" />
            ))}
          </TabsContent>
        </Tabs>

        {/* Info card - Traditional style */}
        <div className="relative max-w-xl mx-auto mt-8 sm:mt-10 bg-white/90 backdrop-blur-sm p-5 sm:p-6 border border-stone-300 rounded-sm shadow-sm">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-yellow-100 border border-yellow-200 rounded-sm">
              <Star className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base text-stone-800">랭킹 시스템</h3>
              <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5">
                수련 완료, 퀴즈 정답, 광장 활동으로 XP를 획득하고 띠를 승급하세요!
              </p>
            </div>
          </div>
        </div>

        {/* How to earn XP section */}
        <div className="relative max-w-xl mx-auto mt-6 bg-white/90 backdrop-blur-sm p-5 sm:p-6 border border-stone-300 rounded-sm shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Target className="h-4 w-4 sm:h-5 sm:w-5 text-stone-600" />
            <h3 className="font-semibold text-sm sm:text-base text-stone-800">XP 획득 방법</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {[
              { label: "챕터 완료", xp: "+50 XP", icon: "📖" },
              { label: "퀴즈 정답", xp: "+10 XP", icon: "✅" },
              { label: "프로젝트 공유", xp: "+30 XP", icon: "🚀" },
              { label: "연속 수련", xp: "+5 XP/일", icon: "🔥" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-stone-50 border border-stone-200 rounded-sm hover:border-stone-300 transition-all"
              >
                <span className="text-base sm:text-lg">{item.icon}</span>
                <div>
                  <p className="text-[10px] sm:text-xs text-stone-500">{item.label}</p>
                  <p className="text-xs sm:text-sm font-bold text-yellow-700">{item.xp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative bottom element */}
        <div className="max-w-xl mx-auto mt-10">
          <div className="h-1 w-full bg-gradient-to-r from-stone-400/30 via-stone-500/50 to-stone-400/30 rounded-full" />
        </div>
      </div>
    </div>
  );
}
