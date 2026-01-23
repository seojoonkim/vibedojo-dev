import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { CURRICULUM_DATA, getAllChapters, getTotalXP } from "@/lib/curriculum-data";
import { BELTS } from "@/lib/belt-system";

export default function CoursesPage() {
  const totalChapters = getAllChapters().length;
  const totalParts = CURRICULUM_DATA.length;
  const totalXP = getTotalXP();

  // Part별 아이콘 매핑
  const partIcons: Record<number, React.ComponentType<{ className?: string }>> = {
    1: Icons.sparkles,
    2: Icons.target,
    3: Icons.rocket,
    4: Icons.zap,
    5: Icons.brain,
    6: Icons.link,
  };

  // Part별 색상
  const partColors: Record<number, { text: string; icon: string; iconBg: string }> = {
    1: { text: "text-violet-700", icon: "text-violet-500", iconBg: "bg-violet-100" },
    2: { text: "text-blue-700", icon: "text-blue-500", iconBg: "bg-blue-100" },
    3: { text: "text-emerald-700", icon: "text-emerald-500", iconBg: "bg-emerald-100" },
    4: { text: "text-amber-700", icon: "text-amber-500", iconBg: "bg-amber-100" },
    5: { text: "text-rose-700", icon: "text-rose-500", iconBg: "bg-rose-100" },
    6: { text: "text-indigo-700", icon: "text-indigo-500", iconBg: "bg-indigo-100" },
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-700/50 bg-gradient-to-r from-slate-950 to-slate-900">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5 group">
            <Icons.vibedojoSymbol className="w-8 h-8 group-hover:drop-shadow-[0_0_12px_rgba(139,92,246,0.6)] transition-all" />
            <span className="text-lg text-white tracking-tighter font-black">VibeDojo</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-full h-8 px-4 text-xs font-medium border-slate-600 text-gray-300 hover:bg-slate-800 hover:text-white bg-transparent"
            >
              <Link href="/login">로그인</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="rounded-full h-8 px-4 text-xs font-medium bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white"
            >
              <Link href="/signup">입문하기</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-12 px-4 bg-gradient-to-b from-violet-50 to-[#fafafa]">
        <div className="container max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 text-xs font-medium mb-4">
            <Icons.scroll className="h-3.5 w-3.5" />
            VibeDojo 수련 과정
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            바이브코딩 마스터가 되기 위한{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
              체계적인 수련 과정
            </span>
          </h1>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            AI와 함께 코딩하는 방법을 처음부터 끝까지 배웁니다.
            흰띠 입문생에서 검은띠 마스터까지, 단계별로 성장하세요.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-violet-600">{totalParts}</div>
              <div className="text-xs text-gray-500">과정</div>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <div className="text-center">
              <div className="text-2xl font-bold text-violet-600">{totalChapters}</div>
              <div className="text-xs text-gray-500">챕터</div>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <div className="text-center">
              <div className="text-2xl font-bold text-violet-600">{totalXP.toLocaleString()}</div>
              <div className="text-xs text-gray-500">총 XP</div>
            </div>
          </div>

          {/* Belt Preview */}
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-xs text-gray-500 mr-2">수련 완료 시 도달 가능:</span>
            {BELTS.slice(0, 5).map((belt, index) => (
              <div
                key={belt.id}
                className={`w-6 h-3 rounded-full ${belt.bgColor}`}
                style={{ boxShadow: index === 0 ? "none" : `0 1px 4px ${belt.color}30` }}
                title={belt.nameKo}
              />
            ))}
            <span className="text-xs text-gray-400 ml-1">...</span>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-8 px-4">
        <div className="container max-w-4xl">
          <div className="space-y-6">
            {CURRICULUM_DATA.map((part) => {
              const IconComponent = partIcons[part.id] || Icons.bookOpen;
              const colors = partColors[part.id] || partColors[1];
              const partTotalXP = part.chapters.reduce((sum, ch) => sum + ch.xpReward, 0);

              return (
                <div
                  key={part.id}
                  className="rounded-2xl bg-white overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
                >
                  {/* Part Header */}
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-xl ${colors.iconBg} flex items-center justify-center`}>
                          <IconComponent className={`h-5 w-5 ${colors.icon}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs font-semibold ${colors.text}`}>Part {part.id}</span>
                            <span className="text-xs text-gray-400">·</span>
                            <span className="text-xs text-gray-500">{part.chapters.length}개 챕터</span>
                          </div>
                          <h2 className="text-lg font-bold text-gray-900">{part.title.ko}</h2>
                          <p className="text-sm text-gray-600 mt-0.5">{part.description.ko}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs font-semibold text-violet-600">{partTotalXP} XP</div>
                      </div>
                    </div>
                  </div>

                  {/* Chapters */}
                  <div className="bg-gray-50/50 px-5 py-3">
                    {part.chapters.map((chapter, index) => (
                      <div
                        key={chapter.id}
                        className={`flex items-center gap-3 py-2.5 ${
                          index !== part.chapters.length - 1 ? "border-b border-gray-100/80" : ""
                        }`}
                      >
                        <div className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-xs font-semibold text-gray-500">
                          {chapter.id}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium text-gray-900">{chapter.title.ko}</div>
                          <div className="text-[11px] text-gray-500">{chapter.title.en}</div>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-violet-600 font-medium shrink-0">
                          <Icons.award className="h-3 w-3" />
                          {chapter.xpReward} XP
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-gradient-to-b from-[#fafafa] to-gray-100">
        <div className="container max-w-xl text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            수련을 시작할 준비가 되셨나요?
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            완전 무료로 바이브코딩 마스터의 길을 걸어보세요.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button
              asChild
              variant="outline"
              className="rounded-full h-10 px-6 text-sm border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Link href="/">
                <Icons.arrowLeft className="mr-2 h-4 w-4" />
                도장 입구로
              </Link>
            </Button>
            <Button
              asChild
              className="rounded-full h-10 px-6 text-sm font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-500/25"
            >
              <Link href="/signup">
                VibeDojo 입문하기
                <Icons.swords className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-5 sm:py-6 px-4 bg-gradient-to-r from-slate-950 to-slate-900 border-t border-slate-700/50">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <Icons.vibedojoSymbol className="w-6 h-6 sm:w-7 sm:h-7" />
            <span className="font-semibold text-xs sm:text-sm text-gray-200">
              VibeDojo
            </span>
          </div>
          <div className="flex flex-col items-center gap-0.5 sm:gap-1 order-last sm:order-none">
            <p className="text-xs sm:text-sm text-gray-500">
              © 2025 VibeDojo. All rights reserved.
            </p>
            <p className="text-xs sm:text-sm text-gray-400">
              Powered by{" "}
              <Link
                href="https://www.hashed.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400/80 hover:text-violet-400 transition-colors font-medium"
              >
                #Hashed
              </Link>
            </p>
          </div>
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Icons.github className="h-4 w-4" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
