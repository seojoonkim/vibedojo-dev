-- ============================================
-- Chapter Quizzes Table
-- ============================================

-- Enable uuid extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE public.chapter_quizzes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  chapter_id TEXT REFERENCES public.chapters(id) ON DELETE CASCADE NOT NULL,
  question_ko TEXT NOT NULL,
  question_en TEXT,
  options JSONB NOT NULL,  -- Array of 5 options: [{"ko": "...", "en": "..."}, ...]
  correct_answer INTEGER NOT NULL CHECK (correct_answer BETWEEN 0 AND 4),  -- Index of correct option (0-4)
  order_index INTEGER NOT NULL,  -- Question order within chapter (1-5)
  explanation_ko TEXT,  -- Optional explanation for the correct answer
  explanation_en TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(chapter_id, order_index)
);

-- Index for fetching quizzes by chapter
CREATE INDEX idx_chapter_quizzes_chapter ON public.chapter_quizzes(chapter_id);

-- Enable RLS
ALTER TABLE public.chapter_quizzes ENABLE ROW LEVEL SECURITY;

-- Everyone can read quizzes
CREATE POLICY "Quizzes are viewable by everyone"
  ON public.chapter_quizzes FOR SELECT
  USING (true);

-- ============================================
-- Quiz Attempts Table (Optional - for tracking)
-- ============================================

CREATE TABLE public.quiz_attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  chapter_id TEXT REFERENCES public.chapters(id) ON DELETE CASCADE NOT NULL,
  score INTEGER NOT NULL,  -- Number of correct answers (0-5)
  passed BOOLEAN NOT NULL,  -- Whether user passed (5/5)
  answers JSONB NOT NULL,  -- User's answers: [{question_id, selected_answer, is_correct}]

  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id, chapter_id)  -- One attempt record per user per chapter (stores latest)
);

-- Index for fetching attempts
CREATE INDEX idx_quiz_attempts_user ON public.quiz_attempts(user_id);
CREATE INDEX idx_quiz_attempts_chapter ON public.quiz_attempts(chapter_id);

-- Enable RLS
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Users can view own attempts
CREATE POLICY "Users can view own quiz attempts"
  ON public.quiz_attempts FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert own attempts
CREATE POLICY "Users can insert own quiz attempts"
  ON public.quiz_attempts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update own attempts
CREATE POLICY "Users can update own quiz attempts"
  ON public.quiz_attempts FOR UPDATE
  USING (auth.uid() = user_id);
