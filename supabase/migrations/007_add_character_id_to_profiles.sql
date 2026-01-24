-- ============================================
-- Add character_id column to profiles table
-- ============================================

ALTER TABLE public.profiles
ADD COLUMN character_id TEXT DEFAULT 'panda';
