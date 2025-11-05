-- Add hobby and career to profiles
ALTER TABLE public.profiles 
ADD COLUMN hobby TEXT,
ADD COLUMN career TEXT;

-- Create achievements table to track unlocked achievements
CREATE TABLE public.user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  achievement_type TEXT NOT NULL CHECK (achievement_type IN ('body_goals', 'skin_glow', 'level_up', 'fire_form')),
  level INTEGER DEFAULT 1 NOT NULL,
  progress INTEGER DEFAULT 0 NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  UNIQUE(user_id, achievement_type)
);

ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own achievements" 
  ON public.user_achievements FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own achievements" 
  ON public.user_achievements FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own achievements" 
  ON public.user_achievements FOR UPDATE 
  USING (auth.uid() = user_id);