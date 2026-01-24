-- ============================================
-- 10. Allow public read access to xp_logs for leaderboard
-- ============================================

-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Users can view own XP logs" ON public.xp_logs;

-- Create a new policy that allows everyone to view all XP logs
CREATE POLICY "XP logs are viewable by everyone"
  ON public.xp_logs FOR SELECT
  USING (true);
