import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Dumbbell, Sparkles, TrendingUp, Apple } from "lucide-react";

interface SurveyQuestion {
  id: string;
  question: string;
  options: { value: string; label: string }[];
}

const surveyQuestions: Record<string, SurveyQuestion[]> = {
  body_goals: [
    {
      id: 'goal',
      question: 'What is your primary fitness goal?',
      options: [
        { value: 'cutting', label: 'Cutting - Lose fat while maintaining muscle' },
        { value: 'bulking', label: 'Bulking - Gain muscle mass' },
        { value: 'strength', label: 'Strength - Get stronger and more powerful' },
        { value: 'toning', label: 'Toning - Build lean, defined muscle' },
      ]
    },
    {
      id: 'experience',
      question: 'What is your training experience level?',
      options: [
        { value: 'beginner', label: 'Beginner - Less than 6 months' },
        { value: 'intermediate', label: 'Intermediate - 6 months to 2 years' },
        { value: 'advanced', label: 'Advanced - 2+ years' },
      ]
    },
    {
      id: 'preference',
      question: 'Where do you prefer to train?',
      options: [
        { value: 'gym', label: 'Gym - Full equipment access' },
        { value: 'home', label: 'Home - Minimal equipment' },
        { value: 'hybrid', label: 'Hybrid - Mix of both' },
      ]
    }
  ],
  skin_glow: [
    {
      id: 'concern',
      question: 'What is your primary skin concern?',
      options: [
        { value: 'acne', label: 'Acne & Breakouts' },
        { value: 'tan', label: 'Uneven Tone & Tanning' },
        { value: 'dryness', label: 'Dryness & Hydration' },
        { value: 'aging', label: 'Anti-Aging & Wrinkles' },
      ]
    },
    {
      id: 'skin_type',
      question: 'What is your skin type?',
      options: [
        { value: 'oily', label: 'Oily' },
        { value: 'dry', label: 'Dry' },
        { value: 'combination', label: 'Combination' },
        { value: 'sensitive', label: 'Sensitive' },
      ]
    },
    {
      id: 'budget',
      question: 'What is your budget for skincare?',
      options: [
        { value: 'budget', label: 'Budget-Friendly - Under $50/month' },
        { value: 'moderate', label: 'Moderate - $50-150/month' },
        { value: 'premium', label: 'Premium - $150+/month' },
      ]
    }
  ],
  level_up: [
    {
      id: 'career_stage',
      question: 'What stage are you at in your career?',
      options: [
        { value: 'student', label: 'Student - Exploring options' },
        { value: 'early', label: 'Early Career - 0-3 years' },
        { value: 'mid', label: 'Mid Career - 3-7 years' },
        { value: 'senior', label: 'Senior - 7+ years' },
      ]
    },
    {
      id: 'education',
      question: 'What is your current education focus?',
      options: [
        { value: 'tech', label: 'Technology & Engineering' },
        { value: 'business', label: 'Business & Finance' },
        { value: 'creative', label: 'Creative & Design' },
        { value: 'other', label: 'Other Field' },
      ]
    },
    {
      id: 'goal',
      question: 'What is your primary goal?',
      options: [
        { value: 'skills', label: 'Develop New Skills' },
        { value: 'promotion', label: 'Get Promoted' },
        { value: 'switch', label: 'Switch Careers' },
        { value: 'entrepreneurship', label: 'Start a Business' },
      ]
    }
  ],
  meals: [
    {
      id: 'goal',
      question: 'What is your primary nutrition goal?',
      options: [
        { value: 'cut', label: 'Cut - Lose fat while maintaining muscle' },
        { value: 'bulk', label: 'Bulk - Gain muscle mass' },
        { value: 'maintain', label: 'Maintain - Stay at current weight' },
        { value: 'performance', label: 'Performance - Optimize for athletics' },
      ]
    },
    {
      id: 'diet',
      question: 'Do you have dietary restrictions?',
      options: [
        { value: 'none', label: 'No restrictions' },
        { value: 'vegetarian', label: 'Vegetarian' },
        { value: 'vegan', label: 'Vegan' },
        { value: 'other', label: 'Other restrictions' },
      ]
    },
    {
      id: 'cooking',
      question: 'What is your cooking experience level?',
      options: [
        { value: 'beginner', label: 'Beginner - Simple meals only' },
        { value: 'intermediate', label: 'Intermediate - Can follow recipes' },
        { value: 'advanced', label: 'Advanced - Confident in the kitchen' },
      ]
    }
  ]
};

const achievementIcons = {
  body_goals: Dumbbell,
  skin_glow: Sparkles,
  level_up: TrendingUp,
  meals: Apple,
};

interface AchievementSurveyProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'body_goals' | 'skin_glow' | 'level_up' | 'meals';
  onComplete: (responses: Record<string, string>) => void;
}

const AchievementSurvey = ({ open, onOpenChange, type, onComplete }: AchievementSurveyProps) => {
  const questions = surveyQuestions[type];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const Icon = achievementIcons[type];

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(responses);
      onOpenChange(false);
      setCurrentQuestion(0);
      setResponses({});
    }
  };

  const isAnswered = responses[questions[currentQuestion]?.id];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Icon className="w-6 h-6 text-primary" />
            <span>Personalize Your Guide</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{questions[currentQuestion]?.question}</h3>
            
            <RadioGroup
              value={responses[questions[currentQuestion]?.id] || ''}
              onValueChange={(value) => setResponses(prev => ({
                ...prev,
                [questions[currentQuestion].id]: value
              }))}
            >
              {questions[currentQuestion]?.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2 glass-card p-3 rounded-lg cursor-pointer hover:border-primary transition-all">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Button 
            onClick={handleNext} 
            disabled={!isAnswered}
            className="w-full"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Survey'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AchievementSurvey;
