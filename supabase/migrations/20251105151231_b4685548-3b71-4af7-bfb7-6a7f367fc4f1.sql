-- Fix search_path for all functions by using CREATE OR REPLACE (which handles dependencies)
CREATE OR REPLACE FUNCTION award_points_on_follow()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles
  SET points = points + 1,
      glow_up_progress = glow_up_progress + 1
  WHERE id = NEW.follower_id;
  
  UPDATE public.profiles
  SET points = points + 1,
      glow_up_progress = glow_up_progress + 1
  WHERE id = NEW.following_id;
  
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION award_points_on_routine()
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

CREATE OR REPLACE FUNCTION award_points_on_post()
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

CREATE OR REPLACE FUNCTION award_points_on_purchase()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles
  SET points = points + 10,
      glow_up_progress = glow_up_progress + 10
  WHERE id = NEW.user_id;
  
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;