-- Add survey_responses column to user_achievements table
ALTER TABLE public.user_achievements 
ADD COLUMN survey_responses jsonb DEFAULT NULL;

-- Add comment to explain the structure
COMMENT ON COLUMN public.user_achievements.survey_responses IS 'Stores survey responses as JSON object with question keys and answer values';