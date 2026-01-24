-- ============================================
-- 4. Add 'review' type to posts and chapter_reviews table
-- ============================================

-- Update posts type constraint to include 'review'
ALTER TABLE public.posts
DROP CONSTRAINT IF EXISTS posts_type_check;

ALTER TABLE public.posts
ADD CONSTRAINT posts_type_check
CHECK (type IN ('question', 'discussion', 'showcase', 'review'));

-- Add rating columns to posts for reviews
ALTER TABLE public.posts
ADD COLUMN IF NOT EXISTS difficulty_rating INTEGER CHECK (difficulty_rating >= 1 AND difficulty_rating <= 5),
ADD COLUMN IF NOT EXISTS satisfaction_rating INTEGER CHECK (satisfaction_rating >= 1 AND satisfaction_rating <= 5);

-- Create chapter_reviews table for storing ratings (even without review text)
CREATE TABLE IF NOT EXISTS public.chapter_reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  chapter_id TEXT REFERENCES public.chapters(id) ON DELETE CASCADE NOT NULL,
  difficulty_rating INTEGER NOT NULL CHECK (difficulty_rating >= 1 AND difficulty_rating <= 5),
  satisfaction_rating INTEGER NOT NULL CHECK (satisfaction_rating >= 1 AND satisfaction_rating <= 5),
  post_id UUID REFERENCES public.posts(id) ON DELETE SET NULL,  -- Link to community post if review was written
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id, chapter_id)  -- One review per user per chapter
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_chapter_reviews_chapter ON public.chapter_reviews(chapter_id);
CREATE INDEX IF NOT EXISTS idx_chapter_reviews_user ON public.chapter_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_type_review ON public.posts(type) WHERE type = 'review';

-- Enable RLS
ALTER TABLE public.chapter_reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for chapter_reviews
CREATE POLICY "Users can view all chapter reviews"
  ON public.chapter_reviews FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own reviews"
  ON public.chapter_reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews"
  ON public.chapter_reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Grant permissions
GRANT ALL ON public.chapter_reviews TO authenticated;
GRANT SELECT ON public.chapter_reviews TO anon;
