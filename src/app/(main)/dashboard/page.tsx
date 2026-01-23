import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { BeltProgressCard } from "@/components/gamification/belt-badge";
import { Icons } from "@/components/icons";
import { CURRICULUM_DATA, getAllChapters } from "@/lib/curriculum-data";
import { CharacterDisplay } from "@/components/dashboard/character-display";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Mock data - will be replaced with real data
  const userStats = {
    displayName: user?.email?.split("@")[0] || "수련생",
    characterId: "panda",
    totalXp: 350,
    currentStreak: 3,
    completedChapters: 3,
  };

  const totalChapters = getAllChapters().length;
  const progressPercent = Math.round(
    (userStats.completedChapters / totalChapters) * 100
  );

  const nextChapterId = String(userStats.completedChapters + 1).padStart(2, "0");

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-100 to-stone-200 relative overflow-hidden">
      {/* Warm ambient glow - softer ochre tones */}
      <div className="fixed top-20 left-1/4 w-[500px] h-[500px] bg-yellow-800/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-20 right-1/4 w-[400px] h-[400px] bg-stone-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Wood floor texture overlay - subtle horizontal lines */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(139,90,43,0.2) 60px, rgba(139,90,43,0.2) 61px)`
      }} />

      {/* Decorative Kanji - softer brown tones */}
      <div className="fixed top-1/3 left-4 text-[10rem] font-serif text-stone-400/[0.08] select-none pointer-events-none hidden lg:block">
        道
      </div>
      <div className="fixed top-1/3 right-4 text-[10rem] font-serif text-stone-400/[0.08] select-none pointer-events-none hidden lg:block">
        場
      </div>

      {/* Hero - Character & XP in 1:2 horizontal layout */}
      <div className="relative border-b border-stone-300/60">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/5 to-transparent" />

        <div className="container relative py-8 sm:py-10">
          {/* Welcome Message */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-12 bg-gradient-to-b from-yellow-700 to-yellow-900 rounded-full" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-stone-800">
                  <span className="text-yellow-800">{userStats.displayName}</span> 수련생님, 환영합니다!
                </h1>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">오늘도 무공을 갈고닦으러 오셨군요</p>
              </div>
            </div>
            {/* Quick Stats */}
            <div className="hidden sm:flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-3 bg-white/80 border border-stone-300 rounded-sm shadow-sm">
                <Icons.flame className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-bold text-stone-700">{userStats.currentStreak}일</span>
                <span className="text-xs text-stone-500">연속</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-3 bg-white/80 border border-stone-300 rounded-sm shadow-sm">
                <Icons.zap className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-bold text-stone-700">{userStats.totalXp}</span>
                <span className="text-xs text-stone-500">XP</span>
              </div>
            </div>
          </div>

          {/* 1:2 Layout - Character : XP Progress */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Character Card - 1 portion */}
            <div className="relative bg-white/90 backdrop-blur-sm border border-stone-300 p-5 sm:p-6 rounded-sm shadow-sm hover:border-yellow-700/50 hover:shadow-lg transition-all duration-300">
              <CharacterDisplay
                initialCharacterId={userStats.characterId}
                displayName={userStats.displayName}
                totalXp={userStats.totalXp}
              />
            </div>

            {/* XP & Belt Progress - 2 portions */}
            <div className="md:col-span-2">
              <BeltProgressCard xp={userStats.totalXp} className="h-full hover:border-yellow-700/50 hover:shadow-lg transition-all duration-300" />
            </div>
          </div>
        </div>
      </div>

      <div className="container relative py-8 sm:py-10 space-y-8">
        {/* Curriculum Section Header */}
        <div className="flex items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-12 bg-gradient-to-b from-yellow-700 to-yellow-900 rounded-full" />
                <h2 className="text-xl sm:text-2xl font-bold text-stone-800">수련 과정</h2>
              </div>
              <div className="flex items-center gap-2 bg-white/80 border border-stone-300 px-4 py-2 rounded-sm shadow-sm">
                <Icons.flame className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-bold text-stone-700">{userStats.currentStreak}일 연속 수련중</span>
              </div>
            </div>
            <div className="flex items-center gap-5 ml-5">
              <p className="text-stone-600 text-sm">
                <span className="text-yellow-800 font-bold">{userStats.completedChapters}</span>
                <span className="text-stone-500">/{totalChapters}장 완료</span>
                <span className="text-stone-700 font-medium ml-2">({progressPercent}%)</span>
              </p>
              <div className="bg-stone-300/50 h-3 flex-1 max-w-[250px] overflow-hidden border border-stone-400/30 rounded-sm relative">
                <div
                  className="bg-gradient-to-r from-yellow-600 to-yellow-700 h-full transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
          <Button asChild size="lg" className="rounded-sm h-11 sm:h-12 px-6 sm:px-8 text-sm font-bold bg-stone-800 hover:bg-stone-700 text-white border-0 shadow-lg transition-all duration-300">
            <Link href={`/curriculum/${nextChapterId}`}>
              수련하기
              <Icons.swords className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Curriculum List - All 6 parts (2 columns) */}
        <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2">
          {CURRICULUM_DATA.map((part, index) => {
            const completedInPart = Math.min(
              userStats.completedChapters -
                CURRICULUM_DATA.slice(0, part.id - 1).reduce((sum, p) => sum + p.chapters.length, 0),
              part.chapters.length
            );
            const partProgress = Math.max(0, Math.round((completedInPart / part.chapters.length) * 100));
            const isActive = completedInPart >= 0 && completedInPart < part.chapters.length;
            const isCompleted = partProgress === 100;
            const isLocked = completedInPart < 0;

            return (
              <Link
                key={part.id}
                href={`/curriculum?part=${part.id}`}
                className="block group"
              >
                <div className={`relative h-full transition-all duration-300 backdrop-blur-sm border p-6 sm:p-7 rounded-sm ${
                  isActive
                    ? 'bg-white/95 border-yellow-700/50 shadow-md'
                    : isCompleted
                      ? 'bg-stone-50/90 border-stone-400/50 shadow-sm'
                      : 'bg-stone-100/50 border-stone-300/50 opacity-70'
                } hover:border-stone-500 hover:shadow-lg hover:-translate-y-1`}>

                  {/* Part Number Badge */}
                  <div className={`absolute -top-3 -left-2 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm ${
                    isActive
                      ? 'bg-stone-800 text-white shadow-md'
                      : isCompleted
                        ? 'bg-stone-600 text-white shadow-sm'
                        : 'bg-stone-400 text-white'
                  }`}>
                    Part {part.id}
                  </div>

                  <div className="flex-1 min-w-0 mt-3">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className={`font-bold text-base transition-colors ${
                        isActive
                          ? 'text-stone-800 group-hover:text-stone-900'
                          : isCompleted
                            ? 'text-stone-700 group-hover:text-stone-800'
                            : 'text-stone-500 group-hover:text-stone-600'
                      }`}>
                        {part.subtitle.ko}
                      </h3>
                      {isCompleted && (
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-stone-200 border border-stone-300 rounded-sm">
                          <Icons.check className="h-3 w-3 text-stone-600" />
                          <span className="text-[10px] text-stone-600 font-medium uppercase tracking-wider">완료</span>
                        </div>
                      )}
                      {isActive && (
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-yellow-100 border border-yellow-300 rounded-sm">
                          <span className="text-[10px] text-yellow-800 font-medium uppercase tracking-wider">진행중</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-stone-500 mb-4 group-hover:text-stone-600 transition-colors">
                      {part.description.ko}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-2 bg-stone-200 overflow-hidden border border-stone-300/50 rounded-sm relative">
                        <div
                          className={`h-full transition-all ${isCompleted ? 'bg-stone-500' : 'bg-yellow-700'}`}
                          style={{ width: `${partProgress}%` }}
                        />
                      </div>
                      <span className={`text-sm font-mono font-bold shrink-0 ${
                        isCompleted ? 'text-stone-600' : isActive ? 'text-yellow-800' : 'text-stone-400'
                      }`}>
                        {Math.max(0, completedInPart)}/{part.chapters.length}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Key Visual Banner */}
        <div className="relative overflow-hidden border border-stone-400/50 rounded-sm shadow-lg group hover:border-stone-500 transition-all duration-300">
          <div className="relative h-48 sm:h-64 md:h-72 bg-stone-700">
            <Image
              src="/images/bg.jpg"
              alt="VibeDojo Key Visual"
              fill
              className="object-cover object-center opacity-60 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-800/90 via-stone-800/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-800/60 via-transparent to-transparent" />

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 text-6xl font-serif text-stone-400/20 select-none">武</div>

            <div className="absolute bottom-8 sm:bottom-10 left-6 sm:left-8">
              <p className="text-stone-100 text-lg sm:text-2xl md:text-3xl font-bold mb-3">
                바이브 코딩의 도장, 준비됐나요?
              </p>
              <p className="text-stone-300 text-sm sm:text-base md:text-lg mb-5">
                AI와 함께 코딩 무술을 익히고 검은띠에 도전하세요
              </p>
              <Button asChild className="rounded-sm px-6 py-2.5 bg-white/20 border border-white/30 text-white hover:bg-white/30 hover:border-white/50 transition-all duration-300">
                <Link href="/curriculum">
                  커리큘럼 보기
                  <Icons.chevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
