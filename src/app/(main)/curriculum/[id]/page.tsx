"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  BookOpen,
  Loader2,
  Award,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { getPartById } from "@/lib/curriculum-data";
import { ChapterQuestionsPanel, TextSelection, Question } from "@/components/chapter-questions-panel";
import { TextSelectionTooltip } from "@/components/text-selection-tooltip";
import { QuestionHighlightOverlay } from "@/components/question-highlight-overlay";

interface Chapter {
  id: string;
  title_ko: string;
  title_en: string;
  description_ko: string | null;
  description_en: string | null;
  part: number;
  order_index: number;
  xp_reward: number;
  content_url: string | null;
  content_url_ko: string | null;
}

interface ChapterProgress {
  status: "not_started" | "in_progress" | "completed";
  completed_at: string | null;
}

export default function ChapterDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [progress, setProgress] = useState<ChapterProgress | null>(null);
  const [prevChapter, setPrevChapter] = useState<Chapter | null>(null);
  const [nextChapter, setNextChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [markdownContent, setMarkdownContent] = useState<string | null>(null);
  const [contentLoading, setContentLoading] = useState(false);
  const [markdownTitle, setMarkdownTitle] = useState<string | null>(null);
  const [showQuestionsPanel, setShowQuestionsPanel] = useState(false);
  const [selectedText, setSelectedText] = useState<TextSelection | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [highlightedQuestionId, setHighlightedQuestionId] = useState<string | null>(null);
  const [showSubheader, setShowSubheader] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  const chapterId = params.id as string;

  useEffect(() => {
    async function fetchChapter() {
      const supabase = createClient();
      const formattedId = chapterId.padStart(2, "0");

      const { data: chapterData, error } = await supabase
        .from("chapters")
        .select("*")
        .eq("id", formattedId)
        .single();

      if (error || !chapterData) {
        setLoading(false);
        return;
      }

      setChapter(chapterData);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: progressData } = await supabase
          .from("progress")
          .select("status, completed_at")
          .eq("user_id", user.id)
          .eq("chapter_id", chapterData.id)
          .single();

        if (progressData) {
          setProgress(progressData);
        }
      }

      const currentOrder = chapterData.order_index;

      const { data: prevData } = await supabase
        .from("chapters")
        .select("*")
        .eq("order_index", currentOrder - 1)
        .maybeSingle();

      if (prevData) setPrevChapter(prevData);

      const { data: nextData } = await supabase
        .from("chapters")
        .select("*")
        .eq("order_index", currentOrder + 1)
        .maybeSingle();

      if (nextData) setNextChapter(nextData);

      setLoading(false);

      const contentUrl = chapterData.content_url_ko || chapterData.content_url;
      if (contentUrl) {
        setContentLoading(true);
        try {
          const response = await fetch(contentUrl);
          if (response.ok) {
            let text = await response.text();

            // H1 제목 추출 (예: "# Chapter 01: AI 코딩이란?")
            const h1Match = text.match(/^#\s+(.+?)(?:\n|$)/m);
            if (h1Match) {
              setMarkdownTitle(h1Match[1].trim());
              // H1 제거
              text = text.replace(/^#\s+.+?\n+/m, '');
            }

            // "English | 한국어" 언어 선택 라인 제거 (다양한 마크다운 형식 지원)
            text = text.replace(/\[English\]\([^)]+\)\s*\|\s*\*\*한국어\*\*\n*/g, '');
            text = text.replace(/\*\*English\*\*\s*\|\s*\[한국어\]\([^)]+\)\n*/g, '');
            text = text.replace(/\[English\]\([^)]+\)\s*\|\s*한국어\n*/g, '');
            text = text.replace(/English\s*\|\s*\[한국어\]\([^)]+\)\n*/g, '');
            text = text.replace(/English\s*\|\s*한국어\n*/g, '');
            // 언어 선택 라인 뒤의 구분선도 제거
            text = text.replace(/^---\n*/m, '');
            setMarkdownContent(text);
          }
        } catch (err) {
          console.error("Failed to fetch markdown content:", err);
        }
        setContentLoading(false);
      }
    }

    fetchChapter();
  }, [chapterId]);

  // 타이틀 영역 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      if (titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect();
        // 타이틀 영역이 sticky 헤더(메인헤더 56px + 서브헤더 약 44px = 100px) 아래로 완전히 가면 서브헤더 표시
        // 타이틀의 top이 헤더 영역 아래로 가면 서브헤더 표시
        setShowSubheader(rect.top < 56);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // 초기 상태 체크

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleComplete = async () => {
    if (!chapter || completing) return;

    setCompleting(true);
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setCompleting(false);
      return;
    }

    const { error: progressError } = await supabase.from("progress").upsert(
      {
        user_id: user.id,
        chapter_id: chapter.id,
        status: "completed",
        completed_at: new Date().toISOString(),
      },
      { onConflict: "user_id,chapter_id" }
    );

    if (progressError) {
      console.error("Failed to update progress:", progressError);
      setCompleting(false);
      return;
    }

    await supabase.from("xp_logs").insert({
      user_id: user.id,
      amount: chapter.xp_reward,
      reason: `Completed chapter ${chapter.id}: ${chapter.title_ko}`,
      source_type: "chapter",
      source_id: chapter.id,
    });

    await supabase.rpc("increment_xp", {
      user_id: user.id,
      amount: chapter.xp_reward,
    });

    setProgress({ status: "completed", completed_at: new Date().toISOString() });
    setCompleting(false);

    if (nextChapter) {
      router.push(`/curriculum/${nextChapter.id}`);
    }
  };

  const handleAskQuestion = useCallback((selection: TextSelection) => {
    setSelectedText(selection);
    setShowQuestionsPanel(true);
  }, []);

  const handleClearSelection = useCallback(() => {
    setSelectedText(null);
  }, []);

  // 하이라이트된 텍스트에 추가 질문하기
  const handleAddQuestionToText = useCallback((text: string) => {
    setSelectedText({
      text,
      contextBefore: "",
      contextAfter: "",
    });
    setShowQuestionsPanel(true);
  }, []);

  const handleQuestionClick = useCallback((questionId: string) => {
    setShowQuestionsPanel(true);
    setHighlightedQuestionId(questionId);
    // 3초 후 하이라이트 해제
    setTimeout(() => setHighlightedQuestionId(null), 3000);
  }, []);

  // 본문 내 텍스트로 스크롤하고 하이라이트하는 함수
  const handleScrollToText = useCallback((searchText: string) => {
    const container = document.querySelector(".curriculum-content");
    if (!container) return;

    // TreeWalker로 텍스트 노드 찾기
    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      null
    );

    let node: Text | null;
    let foundRange: Range | null = null;

    // 단일 노드에서 찾기
    while ((node = walker.nextNode() as Text | null)) {
      const text = node.textContent || "";
      const index = text.indexOf(searchText);
      if (index !== -1) {
        foundRange = document.createRange();
        foundRange.setStart(node, index);
        foundRange.setEnd(node, index + searchText.length);
        break;
      }
    }

    // 여러 노드에 걸친 텍스트 찾기 (못 찾은 경우)
    if (!foundRange) {
      const fullText = container.textContent || "";
      const searchIndex = fullText.indexOf(searchText);
      if (searchIndex === -1) return;

      let currentIndex = 0;
      let startNode: Text | null = null;
      let startOffset = 0;
      let endNode: Text | null = null;
      let endOffset = 0;

      const walker2 = document.createTreeWalker(
        container,
        NodeFilter.SHOW_TEXT,
        null
      );

      while ((node = walker2.nextNode() as Text | null)) {
        const nodeLength = node.textContent?.length || 0;
        const nodeStart = currentIndex;
        const nodeEnd = currentIndex + nodeLength;

        if (!startNode && searchIndex >= nodeStart && searchIndex < nodeEnd) {
          startNode = node;
          startOffset = searchIndex - nodeStart;
        }

        const searchEnd = searchIndex + searchText.length;
        if (startNode && searchEnd > nodeStart && searchEnd <= nodeEnd) {
          endNode = node;
          endOffset = searchEnd - nodeStart;
          break;
        }

        currentIndex = nodeEnd;
      }

      if (startNode && endNode) {
        foundRange = document.createRange();
        foundRange.setStart(startNode, startOffset);
        foundRange.setEnd(endNode, endOffset);
      }
    }

    if (!foundRange) return;

    // 하이라이트 span 만들기
    const highlightSpan = document.createElement("span");
    highlightSpan.className = "text-highlight-animation";

    try {
      foundRange.surroundContents(highlightSpan);
    } catch {
      // surroundContents가 실패할 수 있음 (여러 노드에 걸친 경우)
      // 이 경우 첫 번째 rect로만 스크롤
      const rects = foundRange.getClientRects();
      if (rects.length > 0) {
        const rect = rects[0];
        window.scrollTo({
          top: window.scrollY + rect.top - window.innerHeight / 3,
          behavior: "smooth",
        });
      }
      return;
    }

    // 해당 위치로 부드럽게 스크롤
    highlightSpan.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    // 5초 후 하이라이트 제거 (span 언래핑)
    setTimeout(() => {
      const parent = highlightSpan.parentNode;
      if (parent) {
        while (highlightSpan.firstChild) {
          parent.insertBefore(highlightSpan.firstChild, highlightSpan);
        }
        parent.removeChild(highlightSpan);
      }
    }, 5000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <Card className="max-w-sm mx-auto bg-white border-gray-200 shadow-sm">
          <CardContent className="py-10 text-center">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-7 w-7 text-gray-400" />
            </div>
            <h2 className="text-lg font-bold mb-2 text-gray-900">챕터를 찾을 수 없습니다</h2>
            <p className="text-gray-500 text-sm mb-5">
              요청하신 챕터가 존재하지 않습니다.
            </p>
            <Button asChild className="rounded-full h-10 px-5 text-sm bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500">
              <Link href="/curriculum">수련 과정으로 돌아가기</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isCompleted = progress?.status === "completed";
  const partInfo = getPartById(chapter.part);

  return (
    <div className="min-h-screen bg-[#22272e]">
      {/* Text Selection Tooltip */}
      <TextSelectionTooltip
        containerSelector=".curriculum-content"
        onAskQuestion={handleAskQuestion}
      />

      {/* Question Highlight Overlay */}
      {markdownContent && questions.length > 0 && (
        <QuestionHighlightOverlay
          containerSelector=".curriculum-content"
          questions={questions}
          onQuestionClick={handleQuestionClick}
          onAddQuestion={handleAddQuestionToText}
        />
      )}

      {/* Sticky Header - Single line (스크롤 시에만 나타남) */}
      <div
        className={`bg-[#161b22]/95 border-b border-[#3d444d] sticky top-14 z-40 backdrop-blur-lg transition-all duration-300 ease-out ${
          showSubheader
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="container py-2.5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <Link
                href="/curriculum"
                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#21262d] transition-colors shrink-0"
              >
                <ArrowLeft className="h-4 w-4 text-[#9198a1]" />
              </Link>
              <div className="flex items-center gap-2 min-w-0 overflow-hidden">
                <h1 className="text-sm font-medium text-[#e6edf3] truncate">
                  {markdownTitle || chapter.title_ko}
                </h1>
                {isCompleted && (
                  <CheckCircle className="h-4 w-4 text-violet-400 shrink-0" />
                )}
              </div>
            </div>

            {isCompleted ? (
              <div className="flex items-center gap-2 text-sm shrink-0">
                <span className="font-medium text-gray-400">+{chapter.xp_reward} XP</span>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center">
                    <CheckCircle className="h-2.5 w-2.5 text-white" />
                  </div>
                  <span className="text-xs font-medium text-emerald-500">Completed</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-sm shrink-0">
                <Award className="h-4 w-4 text-violet-400" />
                <span className="font-semibold text-violet-400">{chapter.xp_reward} XP</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container pt-1 pb-2 px-3 sm:px-4 lg:px-6">
        {/* Chapter Info - Non-sticky */}
        <div ref={titleRef} className="mb-2 max-w-7xl mx-auto">
          {/* Back button and Part info */}
          <div className="mb-2">
            <Link
              href="/curriculum"
              className="inline-flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300 transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>수련 과정으로 돌아가기</span>
            </Link>
            <div className="text-lg font-medium text-[#e6edf3] pl-[22px] mb-1">
              {partInfo ? `${partInfo.title.ko} - ${partInfo.subtitle.ko}` : `${chapter.part}단계 수련`}
            </div>
          </div>

          {/* Title */}
          <div className="flex items-center justify-between gap-4 pl-[22px] pb-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3]">{markdownTitle || chapter.title_ko}</h2>
            {isCompleted && (
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-lg font-normal text-gray-400">+{chapter.xp_reward} XP</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm font-medium text-emerald-500">Completed</span>
                </div>
              </div>
            )}
          </div>
          {!markdownTitle && <p className="text-sm text-[#9198a1] mt-1">{chapter.title_en}</p>}
        </div>

        <div className="flex gap-4 max-w-7xl mx-auto">
          {/* Main Content Area */}
          <div className="flex-1 min-w-0 transition-all duration-300">
            {/* Content */}
            <Card className="mb-5 bg-[#0d1117] border-0 rounded-xl sm:rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.3)] overflow-hidden py-0 gap-0">
              <CardContent className="p-4 sm:p-5 md:p-6 curriculum-content">
                {contentLoading ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <Loader2 className="h-8 w-8 animate-spin text-violet-400 mb-3" />
                    <span className="text-sm text-[#9198a1]">콘텐츠 로딩 중...</span>
                  </div>
                ) : markdownContent ? (
                  <div className="prose max-w-none [&>*:first-child]:mt-0">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                      {markdownContent}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-14 h-14 rounded-full bg-[#21262d] flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="h-7 w-7 text-[#9198a1]" />
                    </div>
                    <p className="text-[#e6edf3] text-sm mb-2">{chapter.description_ko}</p>
                    <p className="text-xs text-[#9198a1]">
                      학습 자료가 준비 중입니다.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Complete Button */}
            {!isCompleted && (
              <div className="mb-5 rounded-2xl bg-gradient-to-r from-violet-900/30 to-transparent border border-violet-500/30 p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-sm text-[#e6edf3] mb-1">🥋 수련을 완료하셨나요?</h3>
                    <p className="text-xs text-[#9198a1]">
                      완료 버튼을 눌러 <span className="text-violet-400 font-semibold">{chapter.xp_reward} XP</span>를 획득하세요!
                    </p>
                  </div>
                  <Button
                    onClick={handleComplete}
                    disabled={completing}
                    size="default"
                    className="rounded-full h-10 px-5 text-sm w-full sm:w-auto bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-500/30"
                  >
                    {completing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        처리 중...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        완료하기
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4">
              {prevChapter ? (
                <Link href={`/curriculum/${prevChapter.id}`} className="flex-1">
                  <Button variant="outline" className="w-full rounded-xl h-auto py-3 px-4 justify-start bg-[#21262d] border-[#3d444d] hover:bg-[#30363d] hover:border-[#484f58]">
                    <ArrowLeft className="h-4 w-4 mr-3 shrink-0 text-[#9198a1]" />
                    <div className="text-left min-w-0">
                      <div className="text-xs text-[#9198a1] mb-0.5">이전</div>
                      <div className="text-sm font-medium text-[#e6edf3] truncate">{prevChapter.title_ko}</div>
                    </div>
                  </Button>
                </Link>
              ) : (
                <div className="flex-1" />
              )}

              <Link href="/curriculum" className="flex-1">
                <Button className="w-full rounded-xl h-auto py-3 px-4 justify-between bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500">
                  <div className="flex-1 text-center min-w-0">
                    <div className="text-sm font-medium text-white">학습 마치기</div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 ml-4">
                    <div className="text-xs text-white/70">완료</div>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Button>
              </Link>
            </div>

            {/* Mobile Questions Panel Toggle */}
            <div className="lg:hidden mt-6">
              <Button
                variant="outline"
                className="w-full rounded-xl h-12 bg-[#21262d] border-[#3d444d] hover:bg-[#30363d] hover:border-[#484f58] text-[#e6edf3]"
                onClick={() => setShowQuestionsPanel(!showQuestionsPanel)}
              >
                <MessageSquare className="h-4 w-4 mr-2 text-violet-400" />
                질문 & 토론
                {questions.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-violet-500/20 text-violet-400 text-xs rounded-full">
                    {questions.length}
                  </span>
                )}
                {showQuestionsPanel ? (
                  <ChevronRight className="h-4 w-4 ml-auto" />
                ) : (
                  <ChevronLeft className="h-4 w-4 ml-auto" />
                )}
              </Button>
            </div>
          </div>

          {/* Questions Panel - Collapsible */}
          <div className="hidden lg:block w-[300px] shrink-0">
            <div className="sticky top-32 max-h-[calc(100vh-9rem)] flex flex-col">
              <div className={`bg-[#0d1117] shadow-[0_2px_20px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col transition-all duration-300 ${
                showQuestionsPanel ? "rounded-xl" : "rounded-xl"
              }`}>
                {/* Toggle Bar - Top */}
                <button
                  onClick={() => setShowQuestionsPanel(!showQuestionsPanel)}
                  className="flex items-center justify-between px-4 py-3 bg-[#0d1117] hover:bg-[#161b22] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-violet-400" />
                    <span className="text-sm font-medium text-[#e6edf3]">
                      질문 & 토론
                    </span>
                    <span className="text-xs text-[#6e7681]">({questions.length})</span>
                  </div>
                  <ChevronRight className={`h-4 w-4 text-[#6e7681] group-hover:text-[#9198a1] transition-transform duration-300 ${
                    showQuestionsPanel ? "rotate-90" : "-rotate-90"
                  }`} />
                </button>

                {/* Panel Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    showQuestionsPanel ? "flex-1 opacity-100" : "h-0 opacity-0"
                  }`}
                >
                  <div className="border-t border-[#3d444d]" />
                  <div className="p-4 overflow-y-auto max-h-[calc(100vh-12rem)]">
                    <ChapterQuestionsPanel
                      chapterId={chapterId}
                      selectedText={selectedText}
                      onClearSelection={handleClearSelection}
                      questions={questions}
                      onQuestionsChange={setQuestions}
                      highlightedQuestionId={highlightedQuestionId}
                      hideHeader
                      onScrollToText={handleScrollToText}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Questions Panel (Expandable) */}
        {showQuestionsPanel && (
          <div className="lg:hidden mt-4 max-w-7xl mx-auto">
            <Card className="bg-[#0d1117] border-0 rounded-xl shadow-[0_2px_20px_rgba(0,0,0,0.3)] overflow-hidden py-0">
              <CardContent className="p-4">
                <ChapterQuestionsPanel
                  chapterId={chapterId}
                  selectedText={selectedText}
                  onClearSelection={handleClearSelection}
                  questions={questions}
                  onQuestionsChange={setQuestions}
                  highlightedQuestionId={highlightedQuestionId}
                  onScrollToText={handleScrollToText}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
