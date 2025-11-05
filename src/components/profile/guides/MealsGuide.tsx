import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Apple, TrendingUp, TrendingDown } from "lucide-react";

const MealsGuide = () => {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="cut" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cut">Cutting (Fat Loss)</TabsTrigger>
          <TabsTrigger value="bulk">Bulking (Muscle Gain)</TabsTrigger>
        </TabsList>

        <TabsContent value="cut" className="space-y-4">
          <Card className="glass-card p-4 space-y-3">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Cutting Meal Plan</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Target: 500 calorie deficit | High protein, moderate carbs, healthy fats
            </p>

            <div className="space-y-2">
              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">Breakfast (450 cal)</p>
                <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                  <li>• 4 egg whites + 1 whole egg scrambled</li>
                  <li>• 1 cup oatmeal with berries</li>
                  <li>• Black coffee or green tea</li>
                  <li>📊 Protein: 30g | Carbs: 45g | Fat: 12g</li>
                </ul>
              </div>

              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">Snack (200 cal)</p>
                <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                  <li>• Greek yogurt (non-fat) with honey</li>
                  <li>• 15 almonds</li>
                  <li>📊 Protein: 20g | Carbs: 15g | Fat: 8g</li>
                </ul>
              </div>

              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">Lunch (500 cal)</p>
                <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                  <li>• 6oz grilled chicken breast</li>
                  <li>• Large mixed salad with vinaigrette</li>
                  <li>• 1/2 cup brown rice</li>
                  <li>📊 Protein: 45g | Carbs: 40g | Fat: 10g</li>
                </ul>
              </div>

              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">Pre-Workout (150 cal)</p>
                <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                  <li>• Banana</li>
                  <li>• Rice cake with peanut butter</li>
                  <li>📊 Protein: 5g | Carbs: 30g | Fat: 4g</li>
                </ul>
              </div>

              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">Dinner (550 cal)</p>
                <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                  <li>• 6oz salmon or lean beef</li>
                  <li>• Large portion of broccoli</li>
                  <li>• 1/2 cup quinoa</li>
                  <li>• Side salad</li>
                  <li>📊 Protein: 50g | Carbs: 35g | Fat: 18g</li>
                </ul>
              </div>

              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">Evening Snack (150 cal)</p>
                <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                  <li>• Casein protein shake</li>
                  <li>• OR cottage cheese</li>
                  <li>📊 Protein: 25g | Carbs: 5g | Fat: 2g</li>
                </ul>
              </div>
            </div>

            <div className="p-3 bg-primary/10 rounded-lg">
              <p className="font-medium text-xs">Daily Totals (2000 calories)</p>
              <p className="text-xs text-muted-foreground mt-1">
                Protein: 175g (35%) | Carbs: 170g (34%) | Fat: 54g (31%)
              </p>
            </div>
          </Card>

          <Card className="glass-card p-4 space-y-3">
            <h3 className="font-semibold">Cutting Tips</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>🔥 Drink 1 gallon of water daily</li>
              <li>🔥 Prioritize protein to maintain muscle</li>
              <li>🔥 Time carbs around workouts</li>
              <li>🔥 Track calories accurately (weigh food)</li>
              <li>🔥 Aim for 1-2 lbs weight loss per week</li>
              <li>🔥 Include 1 refeed day per week</li>
              <li>🔥 Avoid liquid calories (soda, juice)</li>
            </ul>
          </Card>
        </TabsContent>

        <TabsContent value="bulk" className="space-y-4">
          <Card className="glass-card p-4 space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              <h3 className="font-semibold">Bulking Meal Plan</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Target: 300-500 calorie surplus | High protein, high carbs, moderate fats
            </p>

            <div className="space-y-2">
              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">Breakfast (750 cal)</p>
                <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                  <li>• 4 whole eggs scrambled</li>
                  <li>• 1.5 cups oatmeal with banana and honey</li>
                  <li>• 2 slices whole wheat toast with peanut butter</li>
                  <li>• Glass of whole milk</li>
                  <li>📊 Protein: 40g | Carbs: 90g | Fat: 28g</li>
                </ul>
              </div>

              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">Mid-Morning Snack (400 cal)</p>
                <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                  <li>• Protein shake with whole milk</li>
                  <li>• Banana</li>
                  <li>• Handful of mixed nuts</li>
                  <li>📊 Protein: 35g | Carbs: 40g | Fat: 15g</li>
                </ul>
              </div>

              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">Lunch (800 cal)</p>
                <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                  <li>• 8oz chicken breast or lean beef</li>
                  <li>• 2 cups brown rice or pasta</li>
                  <li>• Mixed vegetables with olive oil</li>
                  <li>• Avocado slices</li>
                  <li>📊 Protein: 60g | Carbs: 90g | Fat: 22g</li>
                </ul>
              </div>

              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">Pre-Workout (350 cal)</p>
                <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                  <li>• 2 rice cakes with almond butter</li>
                  <li>• Banana</li>
                  <li>• Pre-workout supplement</li>
                  <li>📊 Protein: 10g | Carbs: 60g | Fat: 10g</li>
                </ul>
              </div>

              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">Post-Workout (450 cal)</p>
                <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                  <li>• Whey protein shake (2 scoops)</li>
                  <li>• 1 cup white rice or dextrose</li>
                  <li>• Creatine (5g)</li>
                  <li>📊 Protein: 50g | Carbs: 60g | Fat: 5g</li>
                </ul>
              </div>

              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">Dinner (850 cal)</p>
                <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                  <li>• 10oz salmon or steak</li>
                  <li>• 2 large sweet potatoes</li>
                  <li>• Large mixed salad with olive oil</li>
                  <li>• Side of beans or lentils</li>
                  <li>📊 Protein: 70g | Carbs: 85g | Fat: 28g</li>
                </ul>
              </div>

              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">Before Bed (400 cal)</p>
                <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                  <li>• Casein protein shake</li>
                  <li>• Cottage cheese with berries</li>
                  <li>• Handful of almonds</li>
                  <li>📊 Protein: 40g | Carbs: 25g | Fat: 15g</li>
                </ul>
              </div>
            </div>

            <div className="p-3 bg-accent/10 rounded-lg">
              <p className="font-medium text-xs">Daily Totals (4000 calories)</p>
              <p className="text-xs text-muted-foreground mt-1">
                Protein: 305g (31%) | Carbs: 450g (45%) | Fat: 123g (28%)
              </p>
            </div>
          </Card>

          <Card className="glass-card p-4 space-y-3">
            <h3 className="font-semibold">Bulking Tips</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>💪 Eat every 2-3 hours (6 meals/day)</li>
              <li>💪 Focus on calorie-dense foods</li>
              <li>💪 Post-workout meal is crucial</li>
              <li>💪 Gain 0.5-1 lb per week (lean bulk)</li>
              <li>💪 Track macros, not just calories</li>
              <li>💪 Sleep 8-9 hours for recovery</li>
              <li>💪 Stay hydrated (1 gallon+ water)</li>
            </ul>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="glass-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Apple className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Essential Nutrition Facts</h3>
        </div>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li>🥗 Protein: 0.8-1g per lb of body weight</li>
          <li>🥗 Carbs: 2-3g per lb for bulking, 1-1.5g for cutting</li>
          <li>🥗 Fats: 0.3-0.5g per lb body weight (never go below)</li>
          <li>🥗 Fiber: 25-35g daily for digestion</li>
          <li>🥗 Meal timing: Protein every 3-4 hours</li>
          <li>🥗 Pre-workout: Carbs + protein 1-2 hours before</li>
          <li>🥗 Post-workout: Fast-digesting carbs + protein within 30 min</li>
        </ul>
      </Card>

      <Card className="glass-card p-4">
        <h3 className="font-semibold mb-3">Top Muscle-Building Foods</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 glass-card rounded">Chicken Breast</div>
          <div className="p-2 glass-card rounded">Salmon</div>
          <div className="p-2 glass-card rounded">Lean Beef</div>
          <div className="p-2 glass-card rounded">Greek Yogurt</div>
          <div className="p-2 glass-card rounded">Eggs</div>
          <div className="p-2 glass-card rounded">Brown Rice</div>
          <div className="p-2 glass-card rounded">Sweet Potato</div>
          <div className="p-2 glass-card rounded">Oatmeal</div>
          <div className="p-2 glass-card rounded">Almonds</div>
          <div className="p-2 glass-card rounded">Avocado</div>
          <div className="p-2 glass-card rounded">Broccoli</div>
          <div className="p-2 glass-card rounded">Spinach</div>
        </div>
      </Card>
    </div>
  );
};

export default MealsGuide;