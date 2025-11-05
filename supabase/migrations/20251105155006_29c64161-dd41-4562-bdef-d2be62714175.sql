-- Add daily streak tracking to profiles
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS last_active_date DATE,
ADD COLUMN IF NOT EXISTS daily_streak INTEGER DEFAULT 0;

-- Create function to update daily streak
CREATE OR REPLACE FUNCTION update_daily_streak()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update streak
DROP TRIGGER IF EXISTS update_streak_on_activity ON profiles;
CREATE TRIGGER update_streak_on_activity
  BEFORE UPDATE OF last_active_date ON profiles
  FOR EACH ROW
  WHEN (OLD.last_active_date IS DISTINCT FROM NEW.last_active_date)
  EXECUTE FUNCTION update_daily_streak();