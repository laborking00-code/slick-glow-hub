import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Sparkles, TrendingUp, Apple } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BodyGoalsGuide from "./guides/BodyGoalsGuide";
import SkinGlowGuide from "./guides/SkinGlowGuide";
import LevelUpGuide from "./guides/LevelUpGuide";
import MealsGuide from "./guides/MealsGuide";
import AchievementSurvey from "./AchievementSurvey";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AchievementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'body_goals' | 'skin_glow' | 'level_up' | 'meals';
  userId: string;
}

const achievementData = {
  body_goals: {
    icon: Dumbbell,
    title: "Body Goals",
    color: "text-accent",
  },
  skin_glow: {
    icon: Sparkles,
    title: "Skin Glow",
    color: "text-primary",
  },
  level_up: {
    icon: TrendingUp,
    title: "Level Up",
    color: "text-accent",
  },
  meals: {
    icon: Apple,
    title: "Meal Plans",
    color: "text-primary",
  },
};

const AchievementDialog = ({ open, onOpenChange, type, userId }: AchievementDialogProps) => {
  const achievement = achievementData[type];
  const Icon = achievement.icon;
  const { toast } = useToast();
  const [surveyResponses, setSurveyResponses] = useState<Record<string, string> | null>(null);
  const [showSurvey, setShowSurvey] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurveyResponses = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_achievements')
        .select('survey_responses')
        .eq('user_id', userId)
        .eq('achievement_type', type)
        .single();

      if (error) {
        console.error('Error fetching survey responses:', error);
        setLoading(false);
        return;
      }

      setSurveyResponses((data?.survey_responses as Record<string, string>) || null);
      setLoading(false);
    };

    if (open && userId) {
      fetchSurveyResponses();
    }
  }, [open, userId, type]);

  const handleSurveyComplete = async (responses: Record<string, string>) => {
    const { error } = await supabase
      .from('user_achievements')
      .upsert({
        user_id: userId,
        achievement_type: type,
        survey_responses: responses,
        level: 1,
        progress: 0,
      }, {
        onConflict: 'user_id,achievement_type'
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save survey responses",
        variant: "destructive",
      });
      return;
    }

    setSurveyResponses(responses);
    setShowSurvey(false);
  };

  const getGuideComponent = () => {
    if (!surveyResponses) return null;
    
    switch (type) {
      case 'body_goals':
        return <BodyGoalsGuide surveyResponses={surveyResponses} />;
      case 'skin_glow':
        return <SkinGlowGuide surveyResponses={surveyResponses} />;
      case 'level_up':
        return <LevelUpGuide surveyResponses={surveyResponses} />;
      case 'meals':
        return <MealsGuide surveyResponses={surveyResponses} />;
      default:
        return null;
    }
  };

  return (
    <>
      <AchievementSurvey
        open={showSurvey}
        onOpenChange={setShowSurvey}
        type={type}
        onComplete={handleSurveyComplete}
      />
      
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="glass-card max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <Icon className={`w-8 h-8 ${achievement.color}`} />
              <span className="gradient-text">{achievement.title}</span>
            </DialogTitle>
          </DialogHeader>

          {loading ? (
            <div className="py-12 text-center text-muted-foreground">
              Loading your personalized guide...
            </div>
          ) : !surveyResponses ? (
            <div className="space-y-4 py-8">
              <div className="text-center space-y-3">
                <Icon className={`w-16 h-16 ${achievement.color} mx-auto`} />
                <h3 className="text-lg font-semibold">Get Your Personalized Guide</h3>
                <p className="text-muted-foreground">
                  Answer 3 quick questions to receive a customized guide with product recommendations tailored to your specific goals.
                </p>
              </div>
              <button 
                onClick={() => setShowSurvey(true)}
                className="w-full glass-card p-4 rounded-lg hover:border-primary transition-all text-center"
              >
                <span className="font-medium">Start 3-Question Survey</span>
              </button>
            </div>
          ) : (
            <Tabs defaultValue="guide" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="guide">Your Personalized Guide</TabsTrigger>
                <TabsTrigger value="retake">Retake Survey</TabsTrigger>
              </TabsList>

              <TabsContent value="guide" className="mt-4">
                {getGuideComponent()}
              </TabsContent>

              <TabsContent value="retake" className="mt-4 space-y-4">
                <div className="glass-card p-4 space-y-3">
                  <h3 className="font-semibold">Current Responses</h3>
                  <div className="space-y-2 text-sm">
                    {Object.entries(surveyResponses).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-muted-foreground capitalize">{key.replace('_', ' ')}:</span>
                        <span className="font-medium capitalize">{value.replace('_', ' ')}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => setShowSurvey(true)}
                  className="w-full glass-card p-4 rounded-lg hover:border-primary transition-all"
                >
                  <span className="font-medium">Retake Survey</span>
                </button>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AchievementDialog;