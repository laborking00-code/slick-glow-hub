import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Dumbbell, Clock, Target, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BodyGoalsGuideProps {
  surveyResponses: Record<string, string>;
}

const BodyGoalsGuide = ({ surveyResponses }: BodyGoalsGuideProps) => {
  const { goal, experience, preference } = surveyResponses;

  const getRecommendedProducts = () => {
    const products = [];
    
    if (goal === 'strength') {
      products.push({
        name: 'Iron Core Weight Vest',
        description: 'Adjustable 20-40lb weighted vest for progressive overload',
        price: '$89.99',
        link: '#'
      });
      products.push({
        name: 'Resistance Band Set Pro',
        description: 'Heavy-duty bands for strength training at home or gym',
        price: '$34.99',
        link: '#'
      });
    }
    
    if (goal === 'cutting') {
      products.push({
        name: 'Weight Loss Guide PDF',
        description: 'Complete cutting program with meal plans and workout routines',
        price: '$29.99',
        link: '#',
        featured: true
      });
      products.push({
        name: 'Digital Body Scale Pro',
        description: 'Track weight, body fat %, muscle mass, and more',
        price: '$49.99',
        link: '#'
      });
    }
    
    if (goal === 'bulking') {
      products.push({
        name: 'Mass Gainer Protocol',
        description: 'Premium whey protein blend for muscle building',
        price: '$54.99',
        link: '#'
      });
    }
    
    if (preference === 'home') {
      products.push({
        name: 'Adjustable Dumbbell Set',
        description: '5-52.5 lbs per dumbbell, space-saving design',
        price: '$299.99',
        link: '#'
      });
    }
    
    return products;
  };

  const getWorkoutPlan = () => {
    if (goal === 'strength') {
      return {
        title: 'Strength Training Program',
        description: 'Focus on progressive overload with compound movements',
        workouts: [
          {
            day: 'Day 1 - Lower Body Power',
            exercises: [
              'Barbell Squats: 5 sets x 3-5 reps (heavy)',
              'Romanian Deadlifts: 4 sets x 5 reps',
              'Bulgarian Split Squats: 3 sets x 6 each leg',
              'Weighted Calf Raises: 4 sets x 8 reps',
            ]
          },
          {
            day: 'Day 2 - Upper Body Power',
            exercises: [
              'Bench Press: 5 sets x 3-5 reps (heavy)',
              'Barbell Rows: 4 sets x 5 reps',
              'Overhead Press: 4 sets x 5 reps',
              'Weighted Pull-ups: 3 sets x 5-8 reps',
            ]
          },
          {
            day: 'Day 3 - Rest',
            exercises: ['Active recovery or complete rest']
          },
          {
            day: 'Day 4 - Lower Body Strength',
            exercises: [
              'Deadlifts: 5 sets x 3 reps (heavy)',
              'Front Squats: 4 sets x 6 reps',
              'Leg Press: 3 sets x 8 reps',
              'Nordic Curls: 3 sets x 6-8 reps',
            ]
          },
        ]
      };
    }
    
    if (goal === 'cutting') {
      return {
        title: 'Fat Loss Training Program',
        description: 'High-intensity workouts to preserve muscle while cutting',
        workouts: [
          {
            day: 'Day 1 - Full Body Circuit',
            exercises: [
              'Squats: 4 sets x 10 reps',
              'Push-ups: 4 sets x 12 reps',
              'Lunges: 3 sets x 12 each leg',
              'Rows: 4 sets x 10 reps',
              'Plank: 3 sets x 60 seconds',
            ]
          },
          {
            day: 'Day 2 - HIIT Cardio',
            exercises: [
              '30 seconds sprint, 30 seconds walk (20 minutes)',
              'Jump rope intervals: 10 rounds',
              'Mountain climbers: 3 sets x 20 reps',
            ]
          },
        ]
      };
    }

    // Default bulking/toning program
    return {
      title: 'Muscle Building Program',
      description: '5-Day Split for Maximum Gains',
      workouts: [
        {
          day: 'Monday - Chest & Triceps',
          exercises: [
            'Bench Press: 4 sets x 8-10 reps',
            'Incline Dumbbell Press: 3 sets x 10-12 reps',
            'Cable Flyes: 3 sets x 12-15 reps',
            'Tricep Dips: 3 sets x 10-12 reps',
            'Tricep Pushdowns: 3 sets x 12-15 reps',
          ]
        },
        {
          day: 'Tuesday - Back & Biceps',
          exercises: [
            'Deadlifts: 4 sets x 6-8 reps',
            'Pull-ups: 3 sets x 8-10 reps',
            'Barbell Rows: 3 sets x 10-12 reps',
            'Barbell Curls: 3 sets x 10-12 reps',
            'Hammer Curls: 3 sets x 12-15 reps',
          ]
        },
      ]
    };
  };

  const workoutPlan = getWorkoutPlan();
  const recommendedProducts = getRecommendedProducts();

  return (
    <div className="space-y-4">
      {/* Personalized Header */}
      <Card className="glass-card p-4 border-primary/50">
        <div className="space-y-2">
          <h3 className="font-semibold flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Your Personalized Plan
          </h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Goal: {goal}</Badge>
            <Badge variant="outline">Level: {experience}</Badge>
            <Badge variant="outline">Training: {preference}</Badge>
          </div>
        </div>
      </Card>

      {/* Recommended Products */}
      {recommendedProducts.length > 0 && (
        <Card className="glass-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <ShoppingBag className="w-5 h-5 text-accent" />
            <h3 className="font-semibold">Recommended Products</h3>
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
                  <Badge className="text-xs">Featured for {goal}</Badge>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Workout Plan */}
      <Tabs defaultValue="plan" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="plan">Your Workout Plan</TabsTrigger>
          <TabsTrigger value="tips">Pro Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="plan" className="space-y-4">
          <Card className="glass-card p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">{workoutPlan.title}</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">{workoutPlan.description}</p>
              
              <div className="space-y-2 mt-3">
                {workoutPlan.workouts.map((workout, idx) => (
                  <div key={idx} className="p-3 glass-card rounded-lg">
                    <p className="font-medium">{workout.day}</p>
                    <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                      {workout.exercises.map((exercise, exIdx) => (
                        <li key={exIdx}>• {exercise}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="space-y-4">
          <Card className="glass-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-accent" />
              <h3 className="font-semibold">Pro Tips for {goal}</h3>
            </div>
            <ul className="text-sm text-muted-foreground space-y-2">
              {goal === 'cutting' && (
                <>
                  <li>• Maintain 300-500 calorie deficit</li>
                  <li>• Keep protein high (1g per lb) to preserve muscle</li>
                  <li>• Add 3-4 cardio sessions weekly</li>
                  <li>• Track your weight weekly, not daily</li>
                  <li>• Stay hydrated - drink 1 gallon of water daily</li>
                </>
              )}
              {goal === 'bulking' && (
                <>
                  <li>• Eat 300-500 calories above maintenance</li>
                  <li>• Aim for 1g protein per lb of body weight</li>
                  <li>• Progressive overload every week</li>
                  <li>• Get 7-9 hours of sleep for recovery</li>
                  <li>• Limit cardio to preserve energy for lifting</li>
                </>
              )}
              {goal === 'strength' && (
                <>
                  <li>• Focus on low reps (3-5) with heavy weight</li>
                  <li>• Rest 3-5 minutes between sets</li>
                  <li>• Master form before adding weight</li>
                  <li>• Use the Iron Core Weight Vest for progressive overload</li>
                  <li>• Track your 1RM and aim to beat it monthly</li>
                </>
              )}
              {goal === 'toning' && (
                <>
                  <li>• Focus on compound movements</li>
                  <li>• Maintain slight caloric deficit</li>
                  <li>• High protein (0.8-1g per lb)</li>
                  <li>• Add 2-3 cardio sessions weekly</li>
                  <li>• Consistency is key - train 4-5x per week</li>
                </>
              )}
            </ul>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BodyGoalsGuide;