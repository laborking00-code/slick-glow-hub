import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Dumbbell, Clock, Target } from "lucide-react";

const BodyGoalsGuide = () => {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="male" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="male">Male Workouts</TabsTrigger>
          <TabsTrigger value="female">Female Workouts</TabsTrigger>
        </TabsList>

        <TabsContent value="male" className="space-y-4">
          <Card className="glass-card p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Muscle Building Program</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">5-Day Split for Maximum Gains</p>
              
              <div className="space-y-2 mt-3">
                <div className="p-3 glass-card rounded-lg">
                  <p className="font-medium">Monday - Chest & Triceps</p>
                  <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                    <li>• Bench Press: 4 sets x 8-10 reps</li>
                    <li>• Incline Dumbbell Press: 3 sets x 10-12 reps</li>
                    <li>• Cable Flyes: 3 sets x 12-15 reps</li>
                    <li>• Tricep Dips: 3 sets x 10-12 reps</li>
                    <li>• Tricep Pushdowns: 3 sets x 12-15 reps</li>
                  </ul>
                </div>

                <div className="p-3 glass-card rounded-lg">
                  <p className="font-medium">Tuesday - Back & Biceps</p>
                  <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                    <li>• Deadlifts: 4 sets x 6-8 reps</li>
                    <li>• Pull-ups: 3 sets x 8-10 reps</li>
                    <li>• Barbell Rows: 3 sets x 10-12 reps</li>
                    <li>• Barbell Curls: 3 sets x 10-12 reps</li>
                    <li>• Hammer Curls: 3 sets x 12-15 reps</li>
                  </ul>
                </div>

                <div className="p-3 glass-card rounded-lg">
                  <p className="font-medium">Wednesday - Rest or Cardio</p>
                  <p className="text-xs text-muted-foreground mt-1">Light cardio or active recovery</p>
                </div>

                <div className="p-3 glass-card rounded-lg">
                  <p className="font-medium">Thursday - Legs</p>
                  <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                    <li>• Squats: 4 sets x 8-10 reps</li>
                    <li>• Leg Press: 3 sets x 12-15 reps</li>
                    <li>• Romanian Deadlifts: 3 sets x 10-12 reps</li>
                    <li>• Leg Curls: 3 sets x 12-15 reps</li>
                    <li>• Calf Raises: 4 sets x 15-20 reps</li>
                  </ul>
                </div>

                <div className="p-3 glass-card rounded-lg">
                  <p className="font-medium">Friday - Shoulders & Arms</p>
                  <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                    <li>• Overhead Press: 4 sets x 8-10 reps</li>
                    <li>• Lateral Raises: 3 sets x 12-15 reps</li>
                    <li>• Face Pulls: 3 sets x 15-20 reps</li>
                    <li>• EZ Bar Curls: 3 sets x 10-12 reps</li>
                    <li>• Skull Crushers: 3 sets x 10-12 reps</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                <p className="font-medium text-xs flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Pro Tips for Bulking
                </p>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                  <li>• Eat 300-500 calories above maintenance</li>
                  <li>• Aim for 1g protein per lb of body weight</li>
                  <li>• Progressive overload every week</li>
                  <li>• Get 7-9 hours of sleep</li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="female" className="space-y-4">
          <Card className="glass-card p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Toning & Strength Program</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">4-Day Full Body Split</p>
              
              <div className="space-y-2 mt-3">
                <div className="p-3 glass-card rounded-lg">
                  <p className="font-medium">Monday - Lower Body Power</p>
                  <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                    <li>• Squats: 4 sets x 10-12 reps</li>
                    <li>• Hip Thrusts: 4 sets x 12-15 reps</li>
                    <li>• Walking Lunges: 3 sets x 12 each leg</li>
                    <li>• Leg Curls: 3 sets x 12-15 reps</li>
                    <li>• Calf Raises: 3 sets x 15-20 reps</li>
                  </ul>
                </div>

                <div className="p-3 glass-card rounded-lg">
                  <p className="font-medium">Tuesday - Upper Body</p>
                  <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                    <li>• Push-ups: 3 sets x 10-15 reps</li>
                    <li>• Dumbbell Rows: 3 sets x 12 each arm</li>
                    <li>• Shoulder Press: 3 sets x 10-12 reps</li>
                    <li>• Tricep Dips: 3 sets x 10-12 reps</li>
                    <li>• Bicep Curls: 3 sets x 12-15 reps</li>
                  </ul>
                </div>

                <div className="p-3 glass-card rounded-lg">
                  <p className="font-medium">Wednesday - Rest or Active Recovery</p>
                  <p className="text-xs text-muted-foreground mt-1">Yoga, stretching, or light cardio</p>
                </div>

                <div className="p-3 glass-card rounded-lg">
                  <p className="font-medium">Thursday - Lower Body Volume</p>
                  <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                    <li>• Romanian Deadlifts: 3 sets x 12 reps</li>
                    <li>• Bulgarian Split Squats: 3 sets x 10 each leg</li>
                    <li>• Leg Press: 3 sets x 15 reps</li>
                    <li>• Glute Kickbacks: 3 sets x 15 each leg</li>
                    <li>• Ab Wheel Rollouts: 3 sets x 10-12 reps</li>
                  </ul>
                </div>

                <div className="p-3 glass-card rounded-lg">
                  <p className="font-medium">Friday - Full Body Circuit</p>
                  <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                    <li>• Goblet Squats: 3 sets x 15 reps</li>
                    <li>• Dumbbell Chest Press: 3 sets x 12 reps</li>
                    <li>• Lat Pulldowns: 3 sets x 12 reps</li>
                    <li>• Plank: 3 sets x 45-60 seconds</li>
                    <li>• Mountain Climbers: 3 sets x 20 reps</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                <p className="font-medium text-xs flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Pro Tips for Toning
                </p>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                  <li>• Focus on compound movements</li>
                  <li>• Maintain slight caloric deficit</li>
                  <li>• High protein (0.8-1g per lb)</li>
                  <li>• Add 2-3 cardio sessions weekly</li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="glass-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-5 h-5 text-accent" />
          <h3 className="font-semibold">General Guidelines</h3>
        </div>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li>• Warm up for 5-10 minutes before each workout</li>
          <li>• Rest 60-90 seconds between sets</li>
          <li>• Track your weights and aim to increase progressively</li>
          <li>• Stay hydrated throughout your workout</li>
          <li>• Stretch for 5-10 minutes after training</li>
        </ul>
      </Card>
    </div>
  );
};

export default BodyGoalsGuide;