import { Dumbbell, Sparkles, TrendingUp, Flame, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import AchievementDialog from "./AchievementDialog";

type AchievementType = 'body_goals' | 'skin_glow' | 'level_up' | 'fire_form';

const GamificationSection = () => {
  const [profile, setProfile] = useState<any>(null);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementType | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      setProfile(data);

      // Fetch achievements
      const { data: achievementsData } = await supabase
        .from("user_achievements")
        .select("*")
        .eq("user_id", user.id);

      setAchievements(achievementsData || []);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAchievementLevel = (type: AchievementType) => {
    const achievement = achievements.find(a => a.achievement_type === type);
    return achievement?.level || 1;
  };

  const getAchievementProgress = (type: AchievementType) => {
    return profile?.glow_up_progress || 0;
  };

  const achievementsList = [
    { type: 'body_goals' as AchievementType, icon: Dumbbell, label: "Body Goals", color: "text-accent" },
    { type: 'skin_glow' as AchievementType, icon: Sparkles, label: "Skin Glow", color: "text-primary" },
    { type: 'level_up' as AchievementType, icon: TrendingUp, label: "Level Up", color: "text-accent" },
    { type: 'fire_form' as AchievementType, icon: Flame, label: "Fire Form", color: "text-primary" },
  ];

  const glowUpProgress = profile ? (profile.glow_up_progress / 1000) * 100 : 0;
  const totalPoints = profile?.points || 0;

  const openAchievement = (type: AchievementType) => {
    setSelectedAchievement(type);
    setDialogOpen(true);
  };

  return (
    <div className="glass-card p-6 rounded-2xl space-y-6">
      {/* Points Display */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold gradient-text">Total Points</span>
          <span className="text-2xl font-bold gradient-text">{totalPoints}</span>
        </div>
      </div>

      {/* Glow Up Progress */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold">Glow Up Progress</span>
          <span className="text-muted-foreground">{profile?.glow_up_progress || 0} / 1000</span>
        </div>
        <div className="relative">
          <Progress value={glowUpProgress} className="h-3" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20 rounded-full" />
        </div>
        <p className="text-xs text-muted-foreground text-center">
          {profile?.glow_up_progress >= 1000 
            ? "🎉 Glow Up Complete!" 
            : `${1000 - (profile?.glow_up_progress || 0)} points until complete`}
        </p>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="text-sm font-semibold mb-3 gradient-text">Glow Up Achievements</h3>
        <div className="grid grid-cols-4 gap-3">
          {achievementsList.map((achievement) => {
            const level = getAchievementLevel(achievement.type);
            return (
              <button
                key={achievement.type}
                onClick={() => openAchievement(achievement.type)}
                className="glass-card p-3 rounded-xl hover:scale-105 transition-transform group relative"
              >
                <div className="absolute top-1 right-1 bg-primary text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                  {level}
                </div>
                <achievement.icon className={`w-6 h-6 mx-auto ${achievement.color} group-hover:animate-pulse`} />
                <p className="text-xs mt-2 text-center text-muted-foreground group-hover:text-foreground transition-colors">
                  {achievement.label}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {selectedAchievement && (
        <AchievementDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          type={selectedAchievement}
          currentLevel={getAchievementLevel(selectedAchievement)}
          progress={getAchievementProgress(selectedAchievement)}
        />
      )}

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
