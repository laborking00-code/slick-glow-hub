import { Award, Star, Trophy, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const GamificationSection = () => {
  const achievements = [
    { icon: Trophy, label: "Top Creator", color: "text-accent" },
    { icon: Star, label: "5K Club", color: "text-primary" },
    { icon: Zap, label: "Streak Master", color: "text-accent" },
    { icon: Award, label: "Verified", color: "text-primary" },
  ];

  return (
    <div className="glass-card p-6 rounded-2xl space-y-6">
      {/* XP Progress */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold">Level 42</span>
          <span className="text-muted-foreground">8,540 / 10,000 XP</span>
        </div>
        <div className="relative">
          <Progress value={85.4} className="h-3" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20 rounded-full" />
        </div>
        <p className="text-xs text-muted-foreground text-center">
          1,460 XP until Level 43 🎯
        </p>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Achievements</h3>
        <div className="grid grid-cols-4 gap-3">
          {achievements.map((achievement, index) => (
            <button
              key={index}
              className="glass-card p-3 rounded-xl hover:scale-105 transition-transform group"
            >
              <achievement.icon className={`w-6 h-6 mx-auto ${achievement.color} group-hover:animate-pulse`} />
              <p className="text-xs mt-2 text-center text-muted-foreground group-hover:text-foreground transition-colors">
                {achievement.label}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Daily Streak */}
      <div className="glass-card p-4 rounded-xl bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm font-semibold">Daily Streak</p>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </div>
          </div>
          <div className="text-2xl font-bold gradient-text">
            47 🔥
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamificationSection;
