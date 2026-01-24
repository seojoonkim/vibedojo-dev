-- ============================================
-- 5. Add new post types: tip, feedback, free
-- ============================================

-- Update posts type constraint to include new types
ALTER TABLE public.posts
DROP CONSTRAINT IF EXISTS posts_type_check;

ALTER TABLE public.posts
ADD CONSTRAINT posts_type_check
CHECK (type IN ('question', 'discussion', 'showcase', 'review', 'tip', 'feedback', 'free'));

-- Add chapter_question_id column to link posts to chapter questions
ALTER TABLE public.posts
ADD COLUMN IF NOT EXISTS chapter_question_id UUID REFERENCES public.chapter_questions(id) ON DELETE SET NULL;

-- Create index for chapter_question posts
CREATE INDEX IF NOT EXISTS idx_posts_chapter_question ON public.posts(chapter_question_id) WHERE chapter_question_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_posts_type ON public.posts(type);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON public.posts(created_at DESC);
