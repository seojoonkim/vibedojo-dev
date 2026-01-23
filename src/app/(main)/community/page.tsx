"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageSquare,
  Heart,
  Eye,
  Plus,
  HelpCircle,
  Lightbulb,
  Rocket,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

interface Post {
  id: string;
  title: string;
  content: string;
  category: "discussion" | "question" | "showcase" | "tip";
  created_at: string;
  view_count: number;
  author: {
    username: string;
    avatar_url: string | null;
  };
  _count: {
    comments: number;
    likes: number;
  };
}

const categoryIcons = {
  discussion: MessageSquare,
  question: HelpCircle,
  showcase: Rocket,
  tip: Lightbulb,
};

const categoryLabels = {
  discussion: "토론",
  question: "질문",
  showcase: "프로젝트",
  tip: "팁 공유",
};

const categoryColors = {
  discussion: "bg-stone-100 text-stone-600 border-stone-300",
  question: "bg-yellow-50 text-yellow-700 border-yellow-200",
  showcase: "bg-stone-100 text-stone-700 border-stone-300",
  tip: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

// Mock data
const mockPosts: Post[] = [
  {
    id: "1",
    title: "바이브 코딩으로 첫 프로젝트 완성했어요!",
    content: "Part 1을 끝내고 간단한 Todo 앱을 만들어봤는데 생각보다 재밌네요...",
    category: "showcase",
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    view_count: 42,
    author: { username: "vibecoder123", avatar_url: null },
    _count: { comments: 5, likes: 12 },
  },
  {
    id: "2",
    title: "Cursor에서 .cursorrules 설정 질문이요",
    content: "Chapter 3에서 나오는 .cursorrules 파일 설정하는데 잘 안되는데...",
    category: "question",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    view_count: 28,
    author: { username: "newbie_dev", avatar_url: null },
    _count: { comments: 8, likes: 3 },
  },
  {
    id: "3",
    title: "AI 코딩 시대, 우리는 어떻게 준비해야 할까요?",
    content: "바이브 코딩을 배우면서 느낀 점들을 공유하고 싶어요...",
    category: "discussion",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    view_count: 156,
    author: { username: "tech_thinker", avatar_url: null },
    _count: { comments: 23, likes: 45 },
  },
  {
    id: "4",
    title: "효과적인 프롬프트 작성 팁 모음",
    content: "제가 바이브 코딩하면서 모은 프롬프트 작성 팁들을 공유합니다...",
    category: "tip",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    view_count: 234,
    author: { username: "prompt_master", avatar_url: null },
    _count: { comments: 15, likes: 67 },
  },
];

function formatTimeAgo(date: string) {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "방금 전";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}분 전`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}시간 전`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}일 전`;
  return new Date(date).toLocaleDateString("ko-KR");
}

function PostCard({ post }: { post: Post }) {
  const Icon = categoryIcons[post.category];

  return (
    <div className="group relative px-5 sm:px-6 py-5 border-b border-stone-200 hover:bg-stone-50/50 transition-all duration-300 cursor-pointer">
      <div className="relative flex gap-4 sm:gap-5">
        <Avatar className="h-10 w-10 sm:h-11 sm:w-11 shrink-0 ring-2 ring-stone-200 group-hover:ring-stone-300 transition-all">
          <AvatarImage src={post.author.avatar_url || undefined} />
          <AvatarFallback className="bg-stone-700 text-white text-[10px] sm:text-xs font-bold">
            {post.author.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-[13px] flex-wrap">
            <span className="font-semibold text-stone-700 group-hover:text-stone-900 transition-colors">{post.author.username}</span>
            <span className="text-stone-400">·</span>
            <span className="text-stone-500">{formatTimeAgo(post.created_at)}</span>
            <Badge
              variant="outline"
              className={`${categoryColors[post.category]} rounded-sm text-[9px] sm:text-[10px] h-5 px-1.5 font-medium border ml-1`}
            >
              <Icon className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5" />
              {categoryLabels[post.category]}
            </Badge>
          </div>

          <p className="text-xs sm:text-[13px] text-stone-600 mt-2 leading-relaxed">
            <span className="font-medium text-stone-800 group-hover:text-stone-900 transition-colors">{post.title}</span>
            {post.content && <span className="text-stone-500"> — {post.content}</span>}
          </p>

          <div className="flex items-center gap-5 sm:gap-7 mt-4 text-stone-400">
            <div className="flex items-center gap-1.5 hover:text-stone-600 transition-colors group/btn cursor-pointer">
              <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="text-[10px] sm:text-xs">{post._count.comments}</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-stone-600 transition-colors group/btn cursor-pointer">
              <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="text-[10px] sm:text-xs">{post._count.likes}</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-stone-600 transition-colors group/btn cursor-pointer">
              <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="text-[10px] sm:text-xs">{post.view_count}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CommunityPage() {
  const [posts] = useState<Post[]>(mockPosts);
  const [activeTab, setActiveTab] = useState("all");

  const filteredPosts = activeTab === "all" ? posts : posts.filter((post) => post.category === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-100 to-stone-200 relative overflow-hidden">
      {/* Warm ambient glow - softer ochre tones */}
      <div className="fixed top-20 left-10 w-[400px] h-[400px] bg-yellow-800/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="fixed bottom-20 right-10 w-[450px] h-[450px] bg-stone-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Wood floor texture overlay - subtle horizontal lines */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(139,90,43,0.2) 60px, rgba(139,90,43,0.2) 61px)`
      }} />

      {/* Decorative Kanji - softer brown tones */}
      <div className="fixed top-32 right-8 text-[120px] sm:text-[180px] font-serif text-stone-400/[0.08] pointer-events-none select-none leading-none">
        広
      </div>
      <div className="fixed bottom-20 left-8 text-[100px] sm:text-[150px] font-serif text-stone-400/[0.08] pointer-events-none select-none leading-none">
        場
      </div>

      {/* Header */}
      <div className="relative border-b border-stone-300/60">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/5 to-transparent" />
        <div className="container relative py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-12 bg-gradient-to-b from-yellow-700 to-yellow-900 rounded-full" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-stone-800">
                  광장
                </h1>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">바이브 코더들의 소통 공간</p>
              </div>
            </div>
            <Button className="rounded-sm h-10 sm:h-11 px-5 sm:px-6 text-xs sm:text-sm font-semibold bg-stone-800 hover:bg-stone-700 text-white border-0 shadow-md transition-all">
              <Plus className="h-4 w-4 mr-2" />
              새 글 작성
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
            {[
              { icon: Sparkles, label: "게시글", value: posts.length, color: "stone" },
              { icon: HelpCircle, label: "질문", value: posts.filter((p) => p.category === "question").length, color: "yellow" },
              { icon: Rocket, label: "프로젝트", value: posts.filter((p) => p.category === "showcase").length, color: "stone" },
              { icon: MessageSquare, label: "댓글", value: posts.reduce((acc, p) => acc + p._count.comments, 0), color: "emerald" },
            ].map((stat, index) => (
              <div
                key={index}
                className="relative bg-white/90 backdrop-blur-sm p-4 sm:p-5 border border-stone-300 rounded-sm shadow-sm hover:shadow-md hover:border-stone-400 transition-all group"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div
                    className={`w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-sm ${
                      stat.color === "stone" ? "bg-stone-100 text-stone-600" :
                      stat.color === "yellow" ? "bg-yellow-50 text-yellow-700" :
                      "bg-emerald-50 text-emerald-600"
                    }`}
                  >
                    <stat.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-stone-500 uppercase tracking-wider">{stat.label}</p>
                    <p className="text-base sm:text-lg font-bold text-stone-800">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-8 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Traditional dojo styled tabs */}
          <TabsList className="bg-white/80 backdrop-blur-sm border border-stone-300 p-2 h-auto flex flex-wrap gap-2 mb-6 rounded-sm shadow-sm">
            {[
              { value: "all", label: "전체", icon: null },
              { value: "discussion", label: "토론", icon: MessageSquare },
              { value: "question", label: "질문", icon: HelpCircle },
              { value: "showcase", label: "프로젝트", icon: Rocket },
              { value: "tip", label: "팁", icon: Lightbulb },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-sm h-8 sm:h-9 text-[10px] sm:text-xs px-3 sm:px-4 text-stone-600 hover:text-stone-800 data-[state=active]:bg-stone-800 data-[state=active]:text-white transition-all"
              >
                {tab.icon && <tab.icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1 sm:mr-1.5" />}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            {filteredPosts.length === 0 ? (
              <div className="py-20 text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-5 bg-stone-100 border border-stone-300 rounded-sm">
                  <MessageSquare className="h-6 w-6 sm:h-7 sm:w-7 text-stone-400" />
                </div>
                <p className="text-stone-500 text-sm mb-5">아직 게시글이 없습니다.</p>
                <Button className="rounded-sm h-10 px-5 text-sm bg-stone-800 hover:bg-stone-700 text-white shadow-md">
                  <Plus className="h-4 w-4 mr-2" />첫 글 작성하기
                </Button>
              </div>
            ) : (
              <div className="relative bg-white/90 backdrop-blur-sm border border-stone-300 overflow-hidden rounded-sm shadow-sm">
                {filteredPosts.map((post) => <PostCard key={post.id} post={post} />)}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Trending Topics Section */}
        <div className="mt-10 relative bg-white/90 backdrop-blur-sm p-6 sm:p-7 border border-stone-300 rounded-sm shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-stone-600" />
            <h2 className="text-sm sm:text-base font-semibold text-stone-800">인기 토픽</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {["#바이브코딩", "#Cursor팁", "#프로젝트공유", "#AI코딩", "#프롬프트엔지니어링", "#초보자질문"].map((tag, index) => (
              <span
                key={index}
                className="px-3 py-2 text-[10px] sm:text-xs bg-stone-100 text-stone-600 border border-stone-300 rounded-sm hover:bg-stone-200 hover:border-stone-400 transition-all cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Active Users */}
        <div className="mt-6 relative bg-white/90 backdrop-blur-sm p-6 sm:p-7 border border-stone-300 rounded-sm shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <Users className="h-4 w-4 sm:h-5 sm:w-5 text-stone-600" />
            <h2 className="text-sm sm:text-base font-semibold text-stone-800">활발한 수련생</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {["V", "A", "P", "C", "N"].map((initial, index) => (
                <Avatar key={index} className="h-8 w-8 sm:h-9 sm:w-9 ring-2 ring-white hover:z-10 hover:ring-stone-300 transition-all cursor-pointer">
                  <AvatarFallback className="bg-stone-700 text-white text-[10px] sm:text-xs font-bold">
                    {initial}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-xs sm:text-sm text-stone-500">+23명이 활동 중</span>
          </div>
        </div>
      </div>

      {/* Decorative bottom element */}
      <div className="container pb-10">
        <div className="h-1 w-full bg-gradient-to-r from-stone-400/30 via-stone-500/50 to-stone-400/30 rounded-full" />
      </div>
    </div>
  );
}
