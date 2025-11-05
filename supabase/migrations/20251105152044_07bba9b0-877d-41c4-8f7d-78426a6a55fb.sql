-- Add relationship_status and current_city to profiles
ALTER TABLE public.profiles 
ADD COLUMN relationship_status TEXT,
ADD COLUMN current_city TEXT;

-- Create likes table
CREATE TABLE public.likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  UNIQUE(user_id, post_id)
);

ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Likes are viewable by everyone" 
  ON public.likes FOR SELECT 
  USING (true);

CREATE POLICY "Users can like posts" 
  ON public.likes FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike posts" 
  ON public.likes FOR DELETE 
  USING (auth.uid() = user_id);

-- Function to award points on like
CREATE OR REPLACE FUNCTION award_points_on_like()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles
  SET points = points + 1,
      glow_up_progress = glow_up_progress + 1
  WHERE id = NEW.user_id;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_like_award_points
  AFTER INSERT ON public.likes
  FOR EACH ROW
  EXECUTE FUNCTION award_points_on_like();