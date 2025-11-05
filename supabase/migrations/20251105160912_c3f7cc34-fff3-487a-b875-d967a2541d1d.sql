-- Create products table for sellable PDF guides
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL,
  achievement_type TEXT,
  image_url TEXT,
  pdf_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Products are viewable by everyone
CREATE POLICY "Products are viewable by everyone"
ON public.products
FOR SELECT
USING (true);

-- Only admins can insert/update/delete products (for now, no one can)
-- Later you can add admin roles

-- Create trigger for updated_at
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample products
INSERT INTO public.products (name, description, price, category, achievement_type, featured) VALUES
('Complete Body Transformation Guide', 'Comprehensive 12-week workout program with meal plans, progress tracking, and form guides for all fitness levels', 49.99, 'fitness', 'body_goals', true),
('Advanced Strength Training Protocol', 'Professional powerlifting program with periodization, deload weeks, and competition prep strategies', 39.99, 'fitness', 'body_goals', false),
('Home Workout Mastery', 'No-equipment bodyweight training guide with progressive calisthenics and mobility work', 29.99, 'fitness', 'body_goals', false),
('Clear Skin Blueprint', 'Complete skincare system with product recommendations, routines, and ingredient guides for all skin types', 34.99, 'skincare', 'skin_glow', true),
('Anti-Aging Skincare Masterclass', 'Science-backed anti-aging protocols with retinol guides, peptide serums, and preventive strategies', 44.99, 'skincare', 'skin_glow', false),
('Meal Prep Mastery', 'Complete nutrition guide with 200+ recipes, macro calculators, and grocery shopping templates', 39.99, 'nutrition', 'meals', true),
('Athlete Performance Nutrition', 'Sports nutrition guide with timing protocols, supplement stacks, and recovery strategies', 49.99, 'nutrition', 'meals', false),
('Career Acceleration Blueprint', 'Complete career guide with resume templates, interview scripts, salary negotiation, and networking strategies', 59.99, 'career', 'level_up', true),
('Tech Career Roadmap', 'Software engineering career guide with coding interview prep, system design, and portfolio building', 69.99, 'career', 'level_up', false),
('Entrepreneurship Playbook', 'Zero to launch startup guide with business plans, pitch decks, and funding strategies', 79.99, 'career', 'level_up', false);