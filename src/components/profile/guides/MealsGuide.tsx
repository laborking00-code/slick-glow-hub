import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Apple, TrendingUp, TrendingDown, Target, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MealsGuideProps {
  surveyResponses: Record<string, string>;
}

const MealsGuide = ({ surveyResponses }: MealsGuideProps) => {
  const { goal, diet, cooking } = surveyResponses;

  const getRecommendedProducts = () => {
    const products = [];
    
    if (goal === 'cut') {
      products.push({
        name: 'Complete Weight Loss PDF Guide',
        description: 'Custom cutting meal plans, calorie calculators, and macro tracking',
        price: '$29.99',
        link: '#',
        featured: true
      });
      products.push({
        name: 'Digital Food Scale Pro',
        description: 'Accurate macro tracking with nutrition database',
        price: '$24.99',
        link: '#'
      });
    }
    
    if (goal === 'bulk') {
      products.push({
        name: 'Mass Gainer Meal Plan Bundle',
        description: '4000+ calorie meal plans and bulking recipes',
        price: '$34.99',
        link: '#',
        featured: true
      });
      products.push({
        name: 'Premium Whey Protein 5lb',
        description: '25g protein per serving, multiple flavors',
        price: '$54.99',
        link: '#'
      });
    }
    
    if (goal === 'performance') {
      products.push({
        name: 'Athlete Performance Nutrition Guide',
        description: 'Pre/post workout nutrition and supplement timing',
        price: '$39.99',
        link: '#'
      });
    }
    
    if (diet === 'vegan' || diet === 'vegetarian') {
      products.push({
        name: `${diet === 'vegan' ? 'Vegan' : 'Vegetarian'} Protein Cookbook`,
        description: '100+ high-protein plant-based recipes',
        price: '$24.99',
        link: '#'
      });
    }
    
    return products;
  };

  const getMealPlan = () => {
    const isVegan = diet === 'vegan';
    const isVegetarian = diet === 'vegetarian' || isVegan;
    
    if (goal === 'cut') {
      return {
        title: 'Cutting Meal Plan (2000 cal)',
        description: '500 calorie deficit | High protein, moderate carbs',
        meals: [
          {
            name: 'Breakfast (450 cal)',
            foods: isVegan 
              ? ['Tofu scramble with veggies', 'Oatmeal with berries', 'Green tea']
              : isVegetarian
              ? ['4 egg whites + 1 whole egg', 'Oatmeal with berries', 'Black coffee']
              : ['4 egg whites + 1 whole egg', 'Oatmeal with berries', 'Black coffee'],
            macros: 'Protein: 30g | Carbs: 45g | Fat: 12g'
          },
          {
            name: 'Lunch (500 cal)',
            foods: isVegan
              ? ['Lentil quinoa bowl', 'Mixed greens', 'Tahini dressing']
              : isVegetarian
              ? ['Greek yogurt parfait', 'Chickpea salad', 'Hummus']
              : ['6oz chicken breast', 'Large salad', '1/2 cup brown rice'],
            macros: 'Protein: 45g | Carbs: 40g | Fat: 10g'
          },
          {
            name: 'Dinner (550 cal)',
            foods: isVegan
              ? ['Tempeh stir-fry', 'Quinoa', 'Steamed broccoli']
              : isVegetarian
              ? ['Paneer tikka', 'Quinoa', 'Roasted vegetables']
              : ['6oz salmon', 'Broccoli', '1/2 cup quinoa'],
            macros: 'Protein: 50g | Carbs: 35g | Fat: 18g'
          },
        ],
        totalMacros: 'Protein: 175g (35%) | Carbs: 170g (34%) | Fat: 54g (31%)'
      };
    }

    if (goal === 'bulk') {
      return {
        title: 'Bulking Meal Plan (4000 cal)',
        description: '500 calorie surplus | High protein, high carbs',
        meals: [
          {
            name: 'Breakfast (750 cal)',
            foods: isVegan
              ? ['Protein oats with banana', 'Peanut butter toast', 'Protein shake']
              : isVegetarian
              ? ['4 whole eggs', 'Oatmeal with honey', 'Protein shake']
              : ['4 whole eggs', '1.5 cups oatmeal', 'Peanut butter toast'],
            macros: 'Protein: 40g | Carbs: 90g | Fat: 28g'
          },
          {
            name: 'Lunch (800 cal)',
            foods: isVegan
              ? ['Seitan bowl', '2 cups rice', 'Avocado', 'Beans']
              : isVegetarian
              ? ['Paneer curry', '2 cups rice', 'Lentils', 'Naan']
              : ['8oz chicken', '2 cups rice', 'Vegetables', 'Avocado'],
            macros: 'Protein: 60g | Carbs: 90g | Fat: 22g'
          },
          {
            name: 'Dinner (850 cal)',
            foods: isVegan
              ? ['Tofu steak', '2 sweet potatoes', 'Quinoa', 'Nuts']
              : isVegetarian
              ? ['Lentil shepherd pie', 'Sweet potato', 'Greek yogurt']
              : ['10oz steak', '2 sweet potatoes', 'Salad'],
            macros: 'Protein: 70g | Carbs: 85g | Fat: 28g'
          },
          {
            name: 'Post-Workout (450 cal)',
            foods: ['Protein shake (2 scoops)', 'Banana', 'Oats'],
            macros: 'Protein: 50g | Carbs: 60g | Fat: 5g'
          },
        ],
        totalMacros: 'Protein: 305g (31%) | Carbs: 450g (45%) | Fat: 123g (28%)'
      };
    }

    return {
      title: 'Maintenance Meal Plan (2500 cal)',
      description: 'Balanced nutrition for weight maintenance',
      meals: [
        {
          name: 'Breakfast (600 cal)',
          foods: ['Balanced breakfast', 'Fruit', 'Coffee'],
          macros: 'Protein: 35g | Carbs: 60g | Fat: 20g'
        },
        {
          name: 'Lunch (650 cal)',
          foods: ['Protein source', 'Complex carbs', 'Vegetables'],
          macros: 'Protein: 45g | Carbs: 55g | Fat: 22g'
        },
        {
          name: 'Dinner (700 cal)',
          foods: ['Lean protein', 'Carbs', 'Healthy fats'],
          macros: 'Protein: 50g | Carbs: 60g | Fat: 25g'
        },
      ],
      totalMacros: 'Protein: 180g | Carbs: 230g | Fat: 85g'
    };
  };

  const recommendedProducts = getRecommendedProducts();
  const mealPlan = getMealPlan();

  return (
    <div className="space-y-4">
      {/* Personalized Header */}
      <Card className="glass-card p-4 border-primary/50">
        <div className="space-y-2">
          <h3 className="font-semibold flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Your Personalized Nutrition Plan
          </h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Goal: {goal}</Badge>
            <Badge variant="outline">Diet: {diet}</Badge>
            <Badge variant="outline">Cooking Level: {cooking}</Badge>
          </div>
        </div>
      </Card>

      {/* Recommended Products */}
      {recommendedProducts.length > 0 && (
        <Card className="glass-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <ShoppingBag className="w-5 h-5 text-accent" />
            <h3 className="font-semibold">Recommended Nutrition Products</h3>
          </div>
          <div className="space-y-3">
            {recommendedProducts.map((product, idx) => (
              <div key={idx} className={`p-3 glass-card rounded-lg ${product.featured ? 'border-2 border-primary' : ''}`}>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-sm">{product.name}</h4>
                  <span className="text-primary font-semibold text-sm">{product.price}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{product.description}</p>
                {product.featured && (
                  <Badge className="text-xs">Perfect for {goal}ing</Badge>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      <Tabs defaultValue="plan" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="plan">Meal Plan</TabsTrigger>
          <TabsTrigger value="tips">Nutrition Tips</TabsTrigger>
          <TabsTrigger value="recipes">Quick Recipes</TabsTrigger>
        </TabsList>

        <TabsContent value="plan" className="space-y-4">
          <Card className="glass-card p-4 space-y-3">
            <div className="flex items-center gap-2">
              {goal === 'cut' ? (
                <TrendingDown className="w-5 h-5 text-primary" />
              ) : (
                <TrendingUp className="w-5 h-5 text-accent" />
              )}
              <h3 className="font-semibold">{mealPlan.title}</h3>
            </div>
            <p className="text-xs text-muted-foreground">{mealPlan.description}</p>

            <div className="space-y-2">
              {mealPlan.meals.map((meal, idx) => (
                <div key={idx} className="p-3 glass-card rounded-lg">
                  <p className="font-medium text-sm">{meal.name}</p>
                  <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                    {meal.foods.map((food, i) => (
                      <li key={i}>• {food}</li>
                    ))}
                    <li className="text-primary font-medium mt-2">📊 {meal.macros}</li>
                  </ul>
                </div>
              ))}
            </div>

            <div className="p-3 bg-primary/10 rounded-lg">
              <p className="font-medium text-xs">Daily Totals</p>
              <p className="text-xs text-muted-foreground mt-1">{mealPlan.totalMacros}</p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="space-y-4">
          <Card className="glass-card p-4">
            <h3 className="font-semibold mb-3">Tips for {goal}ing</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              {goal === 'cut' && (
                <>
                  <li>🔥 Track calories accurately - weigh your food</li>
                  <li>🔥 Drink 1 gallon of water daily to stay full</li>
                  <li>🔥 Prioritize protein to preserve muscle</li>
                  <li>🔥 Aim for 1-2 lbs loss per week max</li>
                  <li>🔥 Include 1 refeed day per week</li>
                  <li>🔥 Time carbs around your workouts</li>
                </>
              )}
              {goal === 'bulk' && (
                <>
                  <li>💪 Eat every 2-3 hours (6 meals daily)</li>
                  <li>💪 Focus on calorie-dense whole foods</li>
                  <li>💪 Post-workout meal is most important</li>
                  <li>💪 Gain 0.5-1 lb per week for lean bulk</li>
                  <li>💪 Track macros, not just calories</li>
                  <li>💪 Sleep 8-9 hours for muscle recovery</li>
                </>
              )}
              {goal === 'maintain' && (
                <>
                  <li>⚖️ Focus on nutrient-dense whole foods</li>
                  <li>⚖️ Maintain consistent meal timing</li>
                  <li>⚖️ Listen to hunger cues</li>
                  <li>⚖️ Allow flexibility with 80/20 rule</li>
                </>
              )}
              {goal === 'performance' && (
                <>
                  <li>⚡ Time nutrition around training sessions</li>
                  <li>⚡ Prioritize carbs before/after workouts</li>
                  <li>⚡ Stay hydrated - drink during exercise</li>
                  <li>⚡ Consider supplements: creatine, caffeine</li>
                </>
              )}
            </ul>
          </Card>

          <Card className="glass-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <Apple className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Universal Nutrition Rules</h3>
            </div>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>🥗 Protein: 0.8-1g per lb of body weight</li>
              <li>🥗 Eat protein every 3-4 hours for muscle</li>
              <li>🥗 Pre-workout: Carbs + protein 1-2 hours before</li>
              <li>🥗 Post-workout: Fast carbs + protein within 30 min</li>
              <li>🥗 Fiber: 25-35g daily for gut health</li>
              <li>🥗 Hydration: Drink half your bodyweight (lbs) in oz</li>
            </ul>
          </Card>

          {diet !== 'none' && (
            <Card className="glass-card p-4">
              <h3 className="font-semibold mb-3">Tips for {diet} Diet</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                {(diet === 'vegan' || diet === 'vegetarian') && (
                  <>
                    <li>🌱 Combine plant proteins (rice + beans) for complete amino acids</li>
                    <li>🌱 Supplement B12, Vitamin D, and Omega-3s</li>
                    <li>🌱 Focus on legumes, tofu, tempeh, seitan for protein</li>
                    <li>🌱 Iron absorption: Pair with Vitamin C sources</li>
                  </>
                )}
              </ul>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="recipes" className="space-y-4">
          <Card className="glass-card p-4">
            <h3 className="font-semibold mb-3">Quick High-Protein Recipes</h3>
            <div className="space-y-3">
              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">Overnight Protein Oats</p>
                <p className="text-xs text-muted-foreground mt-1">
                  1 cup oats, 1 scoop protein powder, 1 cup milk, berries, peanut butter
                </p>
                <p className="text-xs text-primary font-medium mt-1">Macros: 45g P | 60g C | 15g F</p>
              </div>
              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">Chicken Rice Bowl</p>
                <p className="text-xs text-muted-foreground mt-1">
                  6oz grilled chicken, 1 cup brown rice, veggies, teriyaki sauce
                </p>
                <p className="text-xs text-primary font-medium mt-1">Macros: 50g P | 55g C | 8g F</p>
              </div>
              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">Salmon & Sweet Potato</p>
                <p className="text-xs text-muted-foreground mt-1">
                  6oz salmon, 1 large sweet potato, asparagus, olive oil
                </p>
                <p className="text-xs text-primary font-medium mt-1">Macros: 45g P | 50g C | 18g F</p>
              </div>
              {(diet === 'vegan' || diet === 'vegetarian') && (
                <>
                  <div className="p-3 glass-card rounded-lg">
                    <p className="font-medium text-sm">Tofu Scramble Bowl</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      1 block firm tofu, veggies, turmeric, nutritional yeast, toast
                    </p>
                    <p className="text-xs text-primary font-medium mt-1">Macros: 35g P | 45g C | 15g F</p>
                  </div>
                  <div className="p-3 glass-card rounded-lg">
                    <p className="font-medium text-sm">Lentil Curry</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      2 cups cooked lentils, coconut milk, curry spices, rice
                    </p>
                    <p className="text-xs text-primary font-medium mt-1">Macros: 25g P | 75g C | 12g F</p>
                  </div>
                </>
              )}
            </div>
          </Card>

          <Card className="glass-card p-4">
            <h3 className="font-semibold mb-3">Snack Ideas</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="p-2 glass-card rounded">
                <p className="font-medium text-xs">Greek Yogurt + Berries</p>
                <p className="text-xs text-muted-foreground">20g protein</p>
              </div>
              <div className="p-2 glass-card rounded">
                <p className="font-medium text-xs">Protein Shake</p>
                <p className="text-xs text-muted-foreground">25g protein</p>
              </div>
              <div className="p-2 glass-card rounded">
                <p className="font-medium text-xs">Almonds (1/4 cup)</p>
                <p className="text-xs text-muted-foreground">8g protein</p>
              </div>
              <div className="p-2 glass-card rounded">
                <p className="font-medium text-xs">Tuna + Crackers</p>
                <p className="text-xs text-muted-foreground">30g protein</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MealsGuide;
