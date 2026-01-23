import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/components/icons";
import { CURRICULUM_DATA, getAllChapters } from "@/lib/curriculum-data";

// "Chapter XX: " 접두사 제거 함수
function removeChapterPrefix(title: string): string {
  return title.replace(/^Chapter\s+\d+:\s*/, '');
}

export default async function CurriculumPage() {
  // Mock completed chapters - will be replaced with real data
  const completedChapterIds = ["01", "02", "03"];

  const getChapterStatus = (chapterId: string) => {
    if (completedChapterIds.includes(chapterId)) return "completed";
    const chapterIndex = getAllChapters().findIndex((c) => c.id === chapterId);
    if (chapterIndex === completedChapterIds.length) return "in_progress";
    return "not_started";
  };

  const totalChapters = getAllChapters().length;
  const progressPercent = Math.round((completedChapterIds.length / totalChapters) * 100);

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
      <div className="fixed top-1/4 left-4 text-[12rem] font-serif text-stone-400/[0.08] select-none pointer-events-none hidden lg:block">
        修
      </div>
      <div className="fixed bottom-1/4 right-4 text-[12rem] font-serif text-stone-400/[0.08] select-none pointer-events-none hidden lg:block">
        練
      </div>

      {/* Header */}
      <div className="relative border-b border-stone-300/60">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/5 to-transparent" />

        <div className="container relative py-8 sm:py-10">
          <div className="flex items-center justify-between gap-6 mb-5">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-12 bg-gradient-to-b from-yellow-700 to-yellow-900 rounded-full" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-stone-800">
                  수련 과정
                </h1>
                <p className="text-sm text-stone-500 mt-1">바이브코딩의 비기를 전수받으세요</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="hidden sm:flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-3 bg-white/80 border border-stone-300 rounded-sm shadow-sm">
                <Icons.bookOpen className="h-4 w-4 text-stone-600" />
                <span className="text-sm font-bold text-stone-700">{totalChapters}</span>
                <span className="text-xs text-stone-500">Chapters</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-3 bg-white/80 border border-stone-300 rounded-sm shadow-sm">
                <Icons.check className="h-4 w-4 text-stone-600" />
                <span className="text-sm font-bold text-stone-700">{completedChapterIds.length}</span>
                <span className="text-xs text-stone-500">완료</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-5 ml-5">
            <p className="text-stone-600 text-sm">
              <span className="text-yellow-800 font-bold">{completedChapterIds.length}</span>
              <span className="text-stone-500">/{totalChapters}장 완료</span>
              <span className="text-stone-700 font-medium ml-2">({progressPercent}%)</span>
            </p>
            <div className="bg-stone-300/50 h-3 flex-1 max-w-[300px] overflow-hidden border border-stone-400/30 rounded-sm relative">
              <div
                className="bg-gradient-to-r from-yellow-600 to-yellow-700 h-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container relative py-8 sm:py-10">
        <Tabs defaultValue="all" className="space-y-8">
          <TabsList className="bg-white/80 backdrop-blur-sm border border-stone-300 rounded-sm p-2 h-auto flex-wrap gap-2 shadow-sm">
            <TabsTrigger
              value="all"
              className="rounded-sm h-9 px-4 text-sm data-[state=active]:bg-stone-800 data-[state=active]:text-white text-stone-600 hover:text-stone-800 transition-all border-0"
            >
              전체 단계
            </TabsTrigger>
            {CURRICULUM_DATA.map((part) => (
              <TabsTrigger
                key={part.id}
                value={String(part.id)}
                className="rounded-sm h-9 px-4 text-sm data-[state=active]:bg-stone-800 data-[state=active]:text-white text-stone-600 hover:text-stone-800 transition-all border-0"
              >
                {part.id}단계
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="space-y-10 mt-8">
            {CURRICULUM_DATA.map((part, partIndex) => {
              const completedInPart = part.chapters.filter(c => completedChapterIds.includes(c.id)).length;
              const partProgress = Math.round((completedInPart / part.chapters.length) * 100);
              const isPartActive = part.chapters.some(c => getChapterStatus(c.id) === "in_progress");
              const isPartComplete = partProgress === 100;

              return (
                <div key={part.id} className="space-y-5">
                  {/* Part Header */}
                  <div className="relative bg-white/90 backdrop-blur-sm border border-stone-300 p-6 sm:p-7 rounded-sm shadow-sm hover:shadow-md transition-all">
                    {/* Part Number Badge */}
                    <div className={`absolute -top-3 -left-2 px-4 py-1.5 text-sm font-bold uppercase tracking-wider rounded-sm ${
                      isPartActive
                        ? 'bg-stone-800 text-white shadow-md'
                        : isPartComplete
                          ? 'bg-stone-600 text-white shadow-sm'
                          : 'bg-stone-400 text-white'
                    }`}>
                      Part {part.id}
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center justify-between gap-4 mb-3">
                        <h2 className={`text-xl sm:text-2xl font-bold ${
                          isPartActive
                            ? 'text-stone-800'
                            : isPartComplete
                              ? 'text-stone-700'
                              : 'text-stone-800'
                        }`}>
                          {part.subtitle.ko}
                        </h2>
                        {isPartComplete && (
                          <div className="flex items-center gap-1.5 px-3 py-1 bg-stone-100 border border-stone-300 rounded-sm">
                            <Icons.check className="h-4 w-4 text-stone-600" />
                            <span className="text-xs font-medium text-stone-600 uppercase tracking-wider">완료</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <p className="text-sm text-stone-500">{part.description.ko}</p>
                        <div className="flex items-center gap-4 shrink-0">
                          <span className="text-sm text-stone-500">{part.chapters.length} Chapters</span>
                          <span className="text-stone-400">·</span>
                          <div className="flex items-center gap-3">
                            <div className="w-28 h-2.5 bg-stone-200 overflow-hidden border border-stone-300/50 rounded-sm">
                              <div
                                className={`h-full transition-all ${isPartComplete ? 'bg-stone-500' : 'bg-yellow-700'}`}
                                style={{ width: `${partProgress}%` }}
                              />
                            </div>
                            <span className={`text-sm font-mono font-bold ${
                              isPartComplete ? 'text-stone-600' : isPartActive ? 'text-yellow-800' : 'text-stone-400'
                            }`}>
                              {completedInPart}/{part.chapters.length}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chapters */}
                  <div className="grid gap-4 pl-5">
                    {part.chapters.map((chapter, chapterIndex) => {
                      const status = getChapterStatus(chapter.id);
                      const isCompleted = status === "completed";
                      const isActive = status === "in_progress";
                      const isNotStarted = status === "not_started";

                      const ChapterContent = (
                        <div className={`relative transition-all duration-300 overflow-hidden flex group rounded-sm ${
                          isActive
                            ? 'bg-white/95 border-2 border-yellow-600/60 shadow-md'
                            : isCompleted
                              ? 'bg-white/90 border border-stone-400/50 shadow-sm'
                              : 'bg-stone-100/50 border border-stone-300/50 opacity-50'
                        } ${!isNotStarted ? 'hover:border-stone-500 hover:shadow-lg hover:-translate-y-0.5' : 'cursor-not-allowed'}`}>

                          {/* Chapter Number Area */}
                          <div className={`shrink-0 w-20 flex flex-col items-center justify-center text-center py-5 rounded-l-sm ${
                            isActive
                              ? 'bg-stone-800'
                              : isCompleted
                                ? 'bg-stone-600'
                                : 'bg-stone-300'
                          }`}>
                            {isNotStarted ? (
                              <Icons.lock className="h-6 w-6 text-stone-500" />
                            ) : (
                              <>
                                <span className={`text-[10px] font-medium uppercase tracking-wider ${isActive || isCompleted ? 'text-white/80' : 'text-stone-500'}`}>Chapter</span>
                                <span className={`text-2xl font-bold ${isActive ? 'text-white' : isCompleted ? 'text-white' : 'text-stone-500'}`}>{chapter.id}</span>
                              </>
                            )}
                          </div>

                          <div className="flex-1 flex items-center gap-4 p-5">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-3 flex-wrap">
                                <h3 className={`font-bold text-lg transition-colors ${
                                  isActive
                                    ? 'text-stone-800 group-hover:text-stone-900'
                                    : isCompleted
                                      ? 'text-stone-700 group-hover:text-stone-800'
                                      : 'text-stone-500'
                                }`}>
                                  {removeChapterPrefix(chapter.title.ko)}
                                </h3>
                                <span className={`text-base font-mono ${isActive || isCompleted ? 'text-stone-500' : 'text-stone-400'}`}>+{chapter.xpReward} XP</span>
                                {isCompleted && (
                                  <div className="flex items-center gap-1.5 px-2 py-0.5 bg-stone-100 border border-stone-300 rounded-sm">
                                    <Icons.check className="h-3 w-3 text-stone-600" />
                                    <span className="text-xs font-medium text-stone-600 uppercase tracking-wider">완료</span>
                                  </div>
                                )}
                                {isActive && (
                                  <Badge className="bg-stone-800 text-white border-0 text-xs h-6 font-medium animate-pulse rounded-sm">
                                    수련 중
                                  </Badge>
                                )}
                                {isNotStarted && (
                                  <span className="text-xs text-stone-500">이전 챕터를 먼저 완료하세요</span>
                                )}
                              </div>
                              {chapter.bullets && (
                                <ul className="space-y-1.5">
                                  {chapter.bullets.map((bullet, idx) => (
                                    <li key={idx} className={`text-sm flex items-start gap-2 ${
                                      isActive || isCompleted ? 'text-stone-600' : 'text-stone-400'
                                    }`}>
                                      <span className={`mt-0.5 ${isActive ? 'text-yellow-700' : isCompleted ? 'text-stone-500' : 'text-stone-400'}`}>•</span>
                                      <span>{bullet}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                            <div className="shrink-0 flex items-center justify-center">
                              {isNotStarted ? (
                                <Icons.lock className="h-6 w-6 text-stone-400" />
                              ) : (
                                <Icons.chevronRight className={`h-8 w-8 transition-all ${
                                  isActive
                                    ? 'text-stone-600 group-hover:text-stone-800 group-hover:translate-x-1'
                                    : isCompleted
                                      ? 'text-stone-400 group-hover:text-stone-600 group-hover:translate-x-1'
                                      : 'text-stone-300'
                                }`} />
                              )}
                            </div>
                          </div>
                        </div>
                      );

                      if (isNotStarted) {
                        return (
                          <div key={chapter.id}>
                            {ChapterContent}
                          </div>
                        );
                      }

                      return (
                        <Link
                          key={chapter.id}
                          href={`/curriculum/${chapter.id}`}
                          className="group block"
                        >
                          {ChapterContent}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </TabsContent>

          {CURRICULUM_DATA.map((part) => {
            const completedInPart = part.chapters.filter(c => completedChapterIds.includes(c.id)).length;
            const partProgress = Math.round((completedInPart / part.chapters.length) * 100);
            const isPartActive = part.chapters.some(c => getChapterStatus(c.id) === "in_progress");
            const isPartComplete = partProgress === 100;

            return (
              <TabsContent key={part.id} value={String(part.id)} className="mt-8">
                <div className="space-y-8">
                  {/* Part Header */}
                  <div className="relative bg-white/90 backdrop-blur-sm border border-stone-300 p-6 sm:p-7 rounded-sm shadow-sm">
                    {/* Part Number Badge */}
                    <div className={`absolute -top-3 -left-2 px-4 py-1.5 text-sm font-bold uppercase tracking-wider rounded-sm ${
                      isPartActive
                        ? 'bg-stone-800 text-white shadow-md'
                        : isPartComplete
                          ? 'bg-stone-600 text-white shadow-sm'
                          : 'bg-stone-400 text-white'
                    }`}>
                      Part {part.id}
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center justify-between gap-4 mb-3">
                        <h2 className={`text-xl sm:text-2xl font-bold ${
                          isPartActive
                            ? 'text-stone-800'
                            : isPartComplete
                              ? 'text-stone-700'
                              : 'text-stone-800'
                        }`}>
                          {part.subtitle.ko}
                        </h2>
                        {isPartComplete && (
                          <div className="flex items-center gap-1.5 px-3 py-1 bg-stone-100 border border-stone-300 rounded-sm">
                            <Icons.check className="h-4 w-4 text-stone-600" />
                            <span className="text-xs font-medium text-stone-600 uppercase tracking-wider">완료</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <p className="text-sm text-stone-500">{part.description.ko}</p>
                        <div className="flex items-center gap-4 shrink-0">
                          <span className="text-sm text-stone-500">{part.chapters.length} Chapters</span>
                          <span className="text-stone-400">·</span>
                          <div className="flex items-center gap-3">
                            <div className="w-28 h-2.5 bg-stone-200 overflow-hidden border border-stone-300/50 rounded-sm">
                              <div
                                className={`h-full transition-all ${isPartComplete ? 'bg-stone-500' : 'bg-yellow-700'}`}
                                style={{ width: `${partProgress}%` }}
                              />
                            </div>
                            <span className={`text-sm font-mono font-bold ${
                              isPartComplete ? 'text-stone-600' : isPartActive ? 'text-yellow-800' : 'text-stone-400'
                            }`}>
                              {completedInPart}/{part.chapters.length}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chapters Grid */}
                  <div className="grid gap-4">
                    {part.chapters.map((chapter) => {
                      const status = getChapterStatus(chapter.id);
                      const isCompleted = status === "completed";
                      const isActive = status === "in_progress";
                      const isNotStarted = status === "not_started";

                      const ChapterContent = (
                        <div className={`relative transition-all duration-300 overflow-hidden flex group rounded-sm ${
                          isActive
                            ? 'bg-white/95 border-2 border-yellow-600/60 shadow-md'
                            : isCompleted
                              ? 'bg-white/90 border border-stone-400/50 shadow-sm'
                              : 'bg-stone-100/50 border border-stone-300/50 opacity-50'
                        } ${!isNotStarted ? 'hover:border-stone-500 hover:shadow-lg hover:-translate-y-0.5' : 'cursor-not-allowed'}`}>

                          {/* Chapter Number Area */}
                          <div className={`shrink-0 w-20 flex flex-col items-center justify-center text-center py-5 rounded-l-sm ${
                            isActive
                              ? 'bg-stone-800'
                              : isCompleted
                                ? 'bg-stone-600'
                                : 'bg-stone-300'
                          }`}>
                            {isNotStarted ? (
                              <Icons.lock className="h-6 w-6 text-stone-500" />
                            ) : (
                              <>
                                <span className={`text-[10px] font-medium uppercase tracking-wider ${isActive || isCompleted ? 'text-white/80' : 'text-stone-500'}`}>Chapter</span>
                                <span className={`text-2xl font-bold ${isActive ? 'text-white' : isCompleted ? 'text-white' : 'text-stone-500'}`}>{chapter.id}</span>
                              </>
                            )}
                          </div>

                          <div className="flex-1 flex items-center gap-4 p-5">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-3 flex-wrap">
                                <h3 className={`font-bold text-lg transition-colors ${
                                  isActive
                                    ? 'text-stone-800 group-hover:text-stone-900'
                                    : isCompleted
                                      ? 'text-stone-700 group-hover:text-stone-800'
                                      : 'text-stone-500'
                                }`}>
                                  {removeChapterPrefix(chapter.title.ko)}
                                </h3>
                                <span className={`text-base font-mono ${isActive || isCompleted ? 'text-stone-500' : 'text-stone-400'}`}>+{chapter.xpReward} XP</span>
                                {isCompleted && (
                                  <div className="flex items-center gap-1.5 px-2 py-0.5 bg-stone-100 border border-stone-300 rounded-sm">
                                    <Icons.check className="h-3 w-3 text-stone-600" />
                                    <span className="text-xs font-medium text-stone-600 uppercase tracking-wider">완료</span>
                                  </div>
                                )}
                                {isActive && (
                                  <Badge className="bg-stone-800 text-white border-0 text-xs h-6 font-medium animate-pulse rounded-sm">
                                    수련 중
                                  </Badge>
                                )}
                                {isNotStarted && (
                                  <span className="text-xs text-stone-500">이전 챕터를 먼저 완료하세요</span>
                                )}
                              </div>
                              {chapter.bullets && (
                                <ul className="space-y-1.5">
                                  {chapter.bullets.map((bullet, idx) => (
                                    <li key={idx} className={`text-sm flex items-start gap-2 ${
                                      isActive || isCompleted ? 'text-stone-600' : 'text-stone-400'
                                    }`}>
                                      <span className={`mt-0.5 ${isActive ? 'text-yellow-700' : isCompleted ? 'text-stone-500' : 'text-stone-400'}`}>•</span>
                                      <span>{bullet}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                            <div className="shrink-0 flex items-center justify-center">
                              {isNotStarted ? (
                                <Icons.lock className="h-6 w-6 text-stone-400" />
                              ) : (
                                <Icons.chevronRight className={`h-8 w-8 transition-all ${
                                  isActive
                                    ? 'text-stone-600 group-hover:text-stone-800 group-hover:translate-x-1'
                                    : isCompleted
                                      ? 'text-stone-400 group-hover:text-stone-600 group-hover:translate-x-1'
                                      : 'text-stone-300'
                                }`} />
                              )}
                            </div>
                          </div>
                        </div>
                      );

                      if (isNotStarted) {
                        return (
                          <div key={chapter.id}>
                            {ChapterContent}
                          </div>
                        );
                      }

                      return (
                        <Link
                          key={chapter.id}
                          href={`/curriculum/${chapter.id}`}
                          className="group block"
                        >
                          {ChapterContent}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>

        {/* Decorative bottom element */}
        <div className="h-1 w-full bg-gradient-to-r from-stone-400/30 via-stone-500/50 to-stone-400/30 rounded-full mt-10" />
      </div>
    </div>
  );
}
