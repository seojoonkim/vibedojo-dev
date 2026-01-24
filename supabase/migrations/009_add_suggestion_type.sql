-- ============================================
-- 9. Add suggestion post type
-- ============================================

-- Update posts type constraint to include suggestion type
ALTER TABLE public.posts
DROP CONSTRAINT IF EXISTS posts_type_check;

ALTER TABLE public.posts
ADD CONSTRAINT posts_type_check
CHECK (type IN ('question', 'discussion', 'showcase', 'review', 'tip', 'feedback', 'free', 'suggestion'));
