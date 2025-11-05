-- Update achievement types to replace fire_form with meals
ALTER TABLE public.user_achievements DROP CONSTRAINT IF EXISTS user_achievements_achievement_type_check;
ALTER TABLE public.user_achievements ADD CONSTRAINT user_achievements_achievement_type_check 
  CHECK (achievement_type IN ('body_goals', 'skin_glow', 'level_up', 'meals'));