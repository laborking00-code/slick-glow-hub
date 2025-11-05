import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Story {
  id: string;
  user_id: string;
  media_url: string;
  media_type: string;
  duration: number;
  created_at: string;
  expires_at: string;
  profile?: {
    display_name: string;
    avatar_url: string;
  };
}

const StoriesSection = () => {
  const { user } = useAuth();
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (user) {
      loadStories();
    }
  }, [user]);

  useEffect(() => {
    if (selectedStory) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + (100 / (selectedStory.duration * 10));
        });
      }, 100);

      return () => clearInterval(timer);
    }
  }, [selectedStory]);

  const loadStories = async () => {
    const { data, error } = await supabase
      .from("stories")
      .select(`
        *,
        profile:profiles(display_name, avatar_url)
      `)
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading stories:", error);
      return;
    }

    setStories(data || []);
  };

  const recordView = async (storyId: string) => {
    if (!user) return;

    await supabase
      .from("story_views")
      .insert({
        story_id: storyId,
        viewer_id: user.id,
      })
      .select()
      .single();
  };

  const handleStoryClick = (story: Story, index: number) => {
    setSelectedStory(story);
    setCurrentIndex(index);
    setProgress(0);
    recordView(story.id);
  };

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      const nextStory = stories[currentIndex + 1];
      setSelectedStory(nextStory);
      setCurrentIndex(currentIndex + 1);
      setProgress(0);
      recordView(nextStory.id);
    } else {
      setSelectedStory(null);
      setProgress(0);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevStory = stories[currentIndex - 1];
      setSelectedStory(prevStory);
      setCurrentIndex(currentIndex - 1);
      setProgress(0);
      recordView(prevStory.id);
    }
  };

  const groupedStories = stories.reduce((acc, story) => {
    if (!acc[story.user_id]) {
      acc[story.user_id] = [];
    }
    acc[story.user_id].push(story);
    return acc;
  }, {} as Record<string, Story[]>);

  if (!user) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Sign in to view stories
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No active stories
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-4 p-4">
        {Object.entries(groupedStories).map(([userId, userStories]) => {
          const firstStory = userStories[0];
          return (
            <button
              key={userId}
              onClick={() => handleStoryClick(firstStory, stories.indexOf(firstStory))}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary via-accent to-primary p-0.5">
                  <Avatar className="w-full h-full border-2 border-background">
                    <AvatarImage src={firstStory.profile?.avatar_url} />
                    <AvatarFallback>
                      {firstStory.profile?.display_name?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <span className="text-xs text-center line-clamp-2 group-hover:text-primary transition-colors">
                {firstStory.profile?.display_name || "User"}
              </span>
            </button>
          );
        })}
      </div>

      <Dialog open={!!selectedStory} onOpenChange={() => setSelectedStory(null)}>
        <DialogContent className="max-w-lg p-0 bg-black border-none">
          {selectedStory && (
            <div className="relative w-full h-[600px]">
              {/* Progress bar */}
              <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 p-2">
                {stories
                  .filter((s) => s.user_id === selectedStory.user_id)
                  .map((_, i) => (
                    <div key={i} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white transition-all"
                        style={{
                          width: i === currentIndex ? `${progress}%` : i < currentIndex ? "100%" : "0%",
                        }}
                      />
                    </div>
                  ))}
              </div>

              {/* Header */}
              <div className="absolute top-4 left-2 right-2 z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={selectedStory.profile?.avatar_url} />
                    <AvatarFallback>
                      {selectedStory.profile?.display_name?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-white text-sm font-medium">
                    {selectedStory.profile?.display_name || "User"}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedStory(null)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Media */}
              <div className="w-full h-full flex items-center justify-center">
                {selectedStory.media_type === "video" ? (
                  <video
                    src={selectedStory.media_url}
                    className="w-full h-full object-contain"
                    autoPlay
                    muted
                  />
                ) : (
                  <img
                    src={selectedStory.media_url}
                    alt="Story"
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              {/* Navigation */}
              <button
                onClick={handlePrevious}
                className="absolute left-0 top-0 bottom-0 w-1/3"
                disabled={currentIndex === 0}
              />
              <button
                onClick={handleNext}
                className="absolute right-0 top-0 bottom-0 w-1/3"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StoriesSection;
