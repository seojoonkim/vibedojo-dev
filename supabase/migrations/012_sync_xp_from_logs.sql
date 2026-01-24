-- ============================================
-- 12. Sync profiles.total_xp from xp_logs table
-- This migration recalculates total_xp for all users
-- based on their xp_logs entries
-- ============================================

-- Update total_xp for all users based on their xp_logs
UPDATE public.profiles p
SET total_xp = COALESCE(
  (SELECT SUM(amount) FROM public.xp_logs WHERE user_id = p.id),
  0
),
updated_at = NOW();

-- Verify the sync (optional: check in Supabase dashboard)
-- SELECT p.id, p.username, p.total_xp,
--        COALESCE((SELECT SUM(amount) FROM xp_logs WHERE user_id = p.id), 0) as calculated_xp
-- FROM profiles p;
