import { CheckCircle2, Circle, Clock, Dumbbell, Apple, Pill, Sun } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AddRoutineDialog from "./AddRoutineDialog";

interface Routine {
  id: string;
  title: string;
  time: string;
  completed: boolean;
  category: string;
}

const RoutineSection = () => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchRoutines = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("routines")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setRoutines(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutines();
  }, []);

  const toggleTask = async (id: string, completed: boolean) => {
    try {
      const { error } = await supabase
        .from("routines")
        .update({ completed: !completed })
        .eq("id", id);

      if (error) throw error;

      setRoutines(routines.map(r => 
        r.id === id ? { ...r, completed: !r.completed } : r
      ));
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const renderRoutine = (category: string) => {
    const categoryRoutines = routines.filter(r => r.category === category);
    const completedTasks = categoryRoutines.filter(r => r.completed).length;
    const progress = categoryRoutines.length > 0 
      ? (completedTasks / categoryRoutines.length) * 100 
      : 0;

    return (
      <div className="space-y-4">
        <div className="space-y-2 relative z-10">
          <div className="relative">
            <Progress value={progress} className="h-2 bg-muted/30" />
            <div className="absolute inset-0 h-2 rounded-full bg-gradient-to-r from-primary to-accent opacity-20 blur-sm" 
                 style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-muted-foreground text-center">
            {progress === 100 && categoryRoutines.length > 0
              ? "🎉 All tasks completed!" 
              : `${Math.round(progress)}% complete - ${completedTasks}/${categoryRoutines.length} tasks`}
          </p>
        </div>

        <div className="space-y-2 relative z-10">
          {categoryRoutines.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-8">
              No routines yet. Add your first one!
            </p>
          ) : (
            categoryRoutines.map((task) => (
              <button
                key={task.id}
                onClick={() => toggleTask(task.id, task.completed)}
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
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="glass-card p-6 rounded-2xl space-y-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <div className="flex items-center justify-between relative z-10 mb-4">
        <h3 className="text-lg font-bold gradient-text">Daily Routines</h3>
        <AddRoutineDialog onRoutineAdded={fetchRoutines} />
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
          {renderRoutine("morning")}
        </TabsContent>

        <TabsContent value="workout" className="mt-4">
          {renderRoutine("workout")}
        </TabsContent>

        <TabsContent value="meal" className="mt-4">
          {renderRoutine("meal")}
        </TabsContent>

        <TabsContent value="supplement" className="mt-4">
          {renderRoutine("supplement")}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RoutineSection;
