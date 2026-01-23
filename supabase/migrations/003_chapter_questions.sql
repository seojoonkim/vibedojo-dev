-- ============================================
-- Chapter Questions (Google Docs style comments)
-- ============================================

CREATE TABLE public.chapter_questions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  chapter_id TEXT REFERENCES public.chapters(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,

  -- 선택된 텍스트 및 위치 정보
  selected_text TEXT NOT NULL,           -- 선택한 원본 텍스트
  context_before TEXT,                   -- 선택 텍스트 앞 컨텍스트 (위치 특정용)
  context_after TEXT,                    -- 선택 텍스트 뒤 컨텍스트

  -- 질문 내용
  question TEXT NOT NULL,

  -- 상태
  is_resolved BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 질문에 대한 답변
CREATE TABLE public.chapter_question_replies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  question_id UUID REFERENCES public.chapter_questions(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  is_accepted BOOLEAN DEFAULT FALSE,     -- 채택된 답변

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_chapter_questions_chapter ON public.chapter_questions(chapter_id);
CREATE INDEX idx_chapter_questions_user ON public.chapter_questions(user_id);
CREATE INDEX idx_chapter_question_replies_question ON public.chapter_question_replies(question_id);

-- RLS
ALTER TABLE public.chapter_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapter_question_replies ENABLE ROW LEVEL SECURITY;

-- Questions policies
CREATE POLICY "Chapter questions are viewable by everyone"
  ON public.chapter_questions FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create questions"
  ON public.chapter_questions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own questions"
  ON public.chapter_questions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own questions"
  ON public.chapter_questions FOR DELETE
  USING (auth.uid() = user_id);

-- Replies policies
CREATE POLICY "Question replies are viewable by everyone"
  ON public.chapter_question_replies FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create replies"
  ON public.chapter_question_replies FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own replies"
  ON public.chapter_question_replies FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own replies"
  ON public.chapter_question_replies FOR DELETE
  USING (auth.uid() = user_id);
