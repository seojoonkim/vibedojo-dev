-- ============================================
-- Add increment_xp RPC function
-- This function safely increments a user's XP
-- ============================================

CREATE OR REPLACE FUNCTION public.increment_xp(user_id UUID, amount INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE public.profiles
  SET
    total_xp = COALESCE(total_xp, 0) + amount,
    updated_at = NOW()
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.increment_xp(UUID, INTEGER) TO authenticated;

-- ============================================
-- Add RLS policy for xp_logs INSERT
-- ============================================

CREATE POLICY "Users can insert own XP logs"
  ON public.xp_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);
