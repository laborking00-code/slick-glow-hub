-- Fix security: Set proper search_path for update_daily_streak function
CREATE OR REPLACE FUNCTION update_daily_streak()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- If last_active_date is yesterday, increment streak
  IF NEW.last_active_date = CURRENT_DATE - INTERVAL '1 day' THEN
    NEW.daily_streak := COALESCE(OLD.daily_streak, 0) + 1;
  -- If last_active_date is today, keep streak
  ELSIF NEW.last_active_date = CURRENT_DATE THEN
    NEW.daily_streak := COALESCE(OLD.daily_streak, 0);
  -- Otherwise, reset streak to 1
  ELSE
    NEW.daily_streak := 1;
  END IF;
  
  RETURN NEW;
END;
$$;