-- ============================================
-- Chapter Question Likes
-- ============================================

CREATE TABLE public.chapter_question_likes (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  question_id UUID REFERENCES public.chapter_questions(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  PRIMARY KEY (user_id, question_id)
);

-- Add likes_count column to chapter_questions
ALTER TABLE public.chapter_questions
ADD COLUMN likes_count INTEGER DEFAULT 0;

-- Index for faster lookups
CREATE INDEX idx_chapter_question_likes_question ON public.chapter_question_likes(question_id);

-- RLS
ALTER TABLE public.chapter_question_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Chapter question likes are viewable by everyone"
  ON public.chapter_question_likes FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can like questions"
  ON public.chapter_question_likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove own likes"
  ON public.chapter_question_likes FOR DELETE
  USING (auth.uid() = user_id);
