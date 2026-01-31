-- ============================================
-- Discord Integration
-- Adds discord_id/discord_username to profiles
-- and discord_link_codes table for account linking
-- ============================================

-- Add discord columns to profiles
ALTER TABLE public.profiles ADD COLUMN discord_id VARCHAR(20) UNIQUE;
ALTER TABLE public.profiles ADD COLUMN discord_username VARCHAR(50);

-- Index for looking up users by discord_id
CREATE INDEX idx_profiles_discord_id ON public.profiles(discord_id) WHERE discord_id IS NOT NULL;

-- ============================================
-- Link codes table for temporary verification
-- ============================================
CREATE TABLE public.discord_link_codes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  code VARCHAR(6) NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_discord_link_codes_code ON public.discord_link_codes(code) WHERE NOT used;
CREATE INDEX idx_discord_link_codes_user ON public.discord_link_codes(user_id);

-- RLS
ALTER TABLE public.discord_link_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own link codes"
  ON public.discord_link_codes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own link codes"
  ON public.discord_link_codes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own link codes"
  ON public.discord_link_codes FOR DELETE
  USING (auth.uid() = user_id);
