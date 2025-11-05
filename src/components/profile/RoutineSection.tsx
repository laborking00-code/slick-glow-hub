import { CheckCircle2, Circle, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

const RoutineSection = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Morning workout", completed: true, time: "6:00 AM" },
    { id: 2, title: "Create content", completed: true, time: "9:00 AM" },
    { id: 3, title: "Engage with followers", completed: false, time: "2:00 PM" },
    { id: 4, title: "Review analytics", completed: false, time: "5:00 PM" },
  ]);

  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = (completedTasks / tasks.length) * 100;

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="glass-card p-6 rounded-2xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Daily Routine</h3>
        <span className="text-sm text-muted-foreground">
          {completedTasks}/{tasks.length} completed
        </span>
      </div>

      <div className="space-y-2">
        <Progress value={progress} className="h-2" />
        <p className="text-xs text-muted-foreground text-center">
          {progress === 100 ? "🎉 All tasks completed!" : `${Math.round(progress)}% complete`}
        </p>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <button
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className="w-full glass-card p-4 rounded-xl hover:scale-[1.02] transition-all group"
          >
            <div className="flex items-center gap-3">
              {task.completed ? (
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0 group-hover:text-primary transition-colors" />
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

export default RoutineSection;
