import { CheckCircle2, Circle, Clock, Dumbbell, Apple, Pill, Sun } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const RoutineSection = () => {
  const [morningTasks, setMorningTasks] = useState([
    { id: 1, title: "Wake up & hydrate", completed: true, time: "6:00 AM" },
    { id: 2, title: "Meditation", completed: true, time: "6:15 AM" },
    { id: 3, title: "Cold shower", completed: false, time: "6:30 AM" },
    { id: 4, title: "Journal", completed: false, time: "6:45 AM" },
  ]);

  const [workoutTasks, setWorkoutTasks] = useState([
    { id: 1, title: "Warm up", completed: true, time: "7:00 AM" },
    { id: 2, title: "Strength training", completed: true, time: "7:15 AM" },
    { id: 3, title: "Cardio", completed: false, time: "7:45 AM" },
    { id: 4, title: "Cool down & stretch", completed: false, time: "8:15 AM" },
  ]);

  const [mealTasks, setMealTasks] = useState([
    { id: 1, title: "Breakfast - Protein shake", completed: true, time: "8:30 AM" },
    { id: 2, title: "Lunch - Chicken & rice", completed: true, time: "12:30 PM" },
    { id: 3, title: "Snack - Fruits & nuts", completed: false, time: "3:30 PM" },
    { id: 4, title: "Dinner - Salmon & veggies", completed: false, time: "7:00 PM" },
  ]);

  const [supplementTasks, setSupplementTasks] = useState([
    { id: 1, title: "Multivitamin", completed: true, time: "8:30 AM" },
    { id: 2, title: "Omega-3", completed: true, time: "12:30 PM" },
    { id: 3, title: "Vitamin D", completed: false, time: "3:30 PM" },
    { id: 4, title: "Magnesium", completed: false, time: "9:00 PM" },
  ]);

  const toggleTask = (id: number, type: string) => {
    const setters = {
      morning: setMorningTasks,
      workout: setWorkoutTasks,
      meal: setMealTasks,
      supplement: setSupplementTasks,
    };
    
    const tasks = {
      morning: morningTasks,
      workout: workoutTasks,
      meal: mealTasks,
      supplement: supplementTasks,
    };

    const setter = setters[type as keyof typeof setters];
    const taskList = tasks[type as keyof typeof tasks];
    
    setter(taskList.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const renderRoutine = (tasks: typeof morningTasks, type: string) => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const progress = (completedTasks / tasks.length) * 100;

    return (
      <div className="space-y-4">
        <div className="space-y-2 relative z-10">
          <div className="relative">
            <Progress value={progress} className="h-2 bg-muted/30" />
            <div className="absolute inset-0 h-2 rounded-full bg-gradient-to-r from-primary to-accent opacity-20 blur-sm" 
                 style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-muted-foreground text-center">
            {progress === 100 ? "🎉 All tasks completed!" : `${Math.round(progress)}% complete - ${completedTasks}/${tasks.length} tasks`}
          </p>
        </div>

        <div className="space-y-2 relative z-10">
          {tasks.map((task) => (
            <button
              key={task.id}
              onClick={() => toggleTask(task.id, type)}
              className="w-full glass-card p-4 rounded-xl hover:scale-[1.02] transition-all group relative overflow-hidden border border-white/5 hover:border-primary/30"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex items-center gap-3 relative z-10">
                {task.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0 group-hover:text-primary transition-colors group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]" />
                )}
                <div className="flex-1 text-left">
                  <p className={`text-sm font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{task.time}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="glass-card p-6 rounded-2xl space-y-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <div className="flex items-center justify-between relative z-10 mb-4">
        <h3 className="text-lg font-bold gradient-text">Daily Routines</h3>
      </div>

      <Tabs defaultValue="morning" className="relative z-10">
        <TabsList className="grid w-full grid-cols-4 glass-card">
          <TabsTrigger value="morning" className="flex items-center gap-2">
            <Sun className="w-4 h-4" />
            <span className="hidden sm:inline">Morning</span>
          </TabsTrigger>
          <TabsTrigger value="workout" className="flex items-center gap-2">
            <Dumbbell className="w-4 h-4" />
            <span className="hidden sm:inline">Workout</span>
          </TabsTrigger>
          <TabsTrigger value="meal" className="flex items-center gap-2">
            <Apple className="w-4 h-4" />
            <span className="hidden sm:inline">Meals</span>
          </TabsTrigger>
          <TabsTrigger value="supplement" className="flex items-center gap-2">
            <Pill className="w-4 h-4" />
            <span className="hidden sm:inline">Supplements</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="morning" className="mt-4">
          {renderRoutine(morningTasks, "morning")}
        </TabsContent>

        <TabsContent value="workout" className="mt-4">
          {renderRoutine(workoutTasks, "workout")}
        </TabsContent>

        <TabsContent value="meal" className="mt-4">
          {renderRoutine(mealTasks, "meal")}
        </TabsContent>

        <TabsContent value="supplement" className="mt-4">
          {renderRoutine(supplementTasks, "supplement")}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RoutineSection;
