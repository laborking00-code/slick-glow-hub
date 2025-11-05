import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Sparkles, TrendingUp, Flame, Lock } from "lucide-react";

interface AchievementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'body_goals' | 'skin_glow' | 'level_up' | 'fire_form';
  currentLevel: number;
  progress: number;
}

const achievementData = {
  body_goals: {
    icon: Dumbbell,
    title: "Body Goals",
    color: "text-accent",
    levels: [
      { level: 1, name: "Beginner Gains", requirement: 0, reward: "Weight tracking unlocked" },
      { level: 2, name: "Muscle Builder", requirement: 100, reward: "Body composition tracker" },
      { level: 3, name: "Transformation", requirement: 250, reward: "Progress photos comparison" },
      { level: 4, name: "Beast Mode", requirement: 500, reward: "Advanced workout plans" },
      { level: 5, name: "Elite Physique", requirement: 1000, reward: "Personal trainer AI" },
    ]
  },
  skin_glow: {
    icon: Sparkles,
    title: "Skin Glow",
    color: "text-primary",
    levels: [
      { level: 1, name: "Fresh Start", requirement: 0, reward: "Basic skincare routine" },
      { level: 2, name: "Clearing Up", requirement: 100, reward: "Acne tracker & tips" },
      { level: 3, name: "Natural Glow", requirement: 250, reward: "Tan level monitor" },
      { level: 4, name: "Radiant Skin", requirement: 500, reward: "UV protection alerts" },
      { level: 5, name: "Flawless", requirement: 1000, reward: "Premium skincare recommendations" },
    ]
  },
  level_up: {
    icon: TrendingUp,
    title: "Level Up",
    color: "text-accent",
    levels: [
      { level: 1, name: "Getting Started", requirement: 0, reward: "Daily challenges unlocked" },
      { level: 2, name: "Consistent", requirement: 100, reward: "Streak bonuses" },
      { level: 3, name: "Dedicated", requirement: 250, reward: "Premium badges" },
      { level: 4, name: "Expert", requirement: 500, reward: "Custom goals" },
      { level: 5, name: "Master", requirement: 1000, reward: "VIP status" },
    ]
  },
  fire_form: {
    icon: Flame,
    title: "Fire Form",
    color: "text-primary",
    levels: [
      { level: 1, name: "Warming Up", requirement: 0, reward: "Energy tracking" },
      { level: 2, name: "On Fire", requirement: 100, reward: "Metabolism booster tips" },
      { level: 3, name: "Peak Performance", requirement: 250, reward: "Meal prep guides" },
      { level: 4, name: "Unstoppable", requirement: 500, reward: "Performance analytics" },
      { level: 5, name: "Legend", requirement: 1000, reward: "Hall of Fame entry" },
    ]
  },
};

const AchievementDialog = ({ open, onOpenChange, type, currentLevel, progress }: AchievementDialogProps) => {
  const achievement = achievementData[type];
  const Icon = achievement.icon;
  const currentLevelData = achievement.levels[currentLevel - 1];
  const nextLevelData = achievement.levels[currentLevel];
  const progressToNext = nextLevelData ? (progress / nextLevelData.requirement) * 100 : 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Icon className={`w-8 h-8 ${achievement.color}`} />
            <span className="gradient-text">{achievement.title}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Level */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Current Level: {currentLevelData.name}</h3>
              <Badge variant="outline" className="gradient-text">
                Level {currentLevel}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              🎁 {currentLevelData.reward}
            </p>
            
            {nextLevelData && (
              <>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress to Level {nextLevelData.level}</span>
                    <span className="text-muted-foreground">{progress} / {nextLevelData.requirement}</span>
                  </div>
                  <Progress value={progressToNext} className="h-2" />
                </div>
              </>
            )}
          </div>

          {/* All Levels */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">All Levels</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {achievement.levels.map((level) => {
                const isUnlocked = currentLevel >= level.level;
                const isCurrent = currentLevel === level.level;
                
                return (
                  <div
                    key={level.level}
                    className={`glass-card p-3 rounded-lg ${
                      isCurrent ? 'border-primary border-2' : ''
                    } ${!isUnlocked ? 'opacity-50' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      {isUnlocked ? (
                        <Icon className={`w-5 h-5 ${achievement.color}`} />
                      ) : (
                        <Lock className="w-5 h-5 text-muted-foreground" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm">{level.name}</h4>
                          <Badge variant={isUnlocked ? "default" : "secondary"} className="text-xs">
                            Lv {level.level}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {level.reward}
                        </p>
                        {!isUnlocked && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Requires {level.requirement} points
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AchievementDialog;