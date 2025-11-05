import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useDailyStreak } from "@/hooks/useDailyStreak";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import FollowersList from "./FollowersList";

const ProfileStats = () => {
  const [postCount, setPostCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTab, setDialogTab] = useState<"followers" | "following">("followers");
  const { streak } = useDailyStreak();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get post count
      const { count: posts } = await supabase
        .from("posts")
        .select("*", { count: 'exact', head: true })
        .eq("user_id", user.id);
      setPostCount(posts || 0);

      // Get follower count
      const { count: followers } = await supabase
        .from("follows")
        .select("*", { count: 'exact', head: true })
        .eq("following_id", user.id);
      setFollowerCount(followers || 0);

      // Get following count
      const { count: following } = await supabase
        .from("follows")
        .select("*", { count: 'exact', head: true })
        .eq("follower_id", user.id);
      setFollowingCount(following || 0);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleStatClick = (label: string) => {
    if (label === "Followers") {
      setDialogTab("followers");
      setDialogOpen(true);
    } else if (label === "Following") {
      setDialogTab("following");
      setDialogOpen(true);
    }
  };

  const stats = [
    { label: "Posts", value: postCount, clickable: false },
    { label: "Followers", value: followerCount, clickable: true },
    { label: "Following", value: followingCount, clickable: true },
    { label: "Day Streak", value: streak, clickable: false, emoji: "🔥" },
  ];

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="glass-card max-w-md">
          <DialogHeader>
            <DialogTitle>
              {dialogTab === "followers" ? "Followers" : "Following"}
            </DialogTitle>
          </DialogHeader>
          <FollowersList defaultTab={dialogTab} />
        </DialogContent>
      </Dialog>

      <div className="glass-card p-6 rounded-2xl">
        <div className="grid grid-cols-4 gap-4">
          {stats.map((stat) => (
            <button
              key={stat.label}
              onClick={() => handleStatClick(stat.label)}
              className={`group text-center space-y-1 transition-transform ${
                stat.clickable ? 'hover:scale-105 cursor-pointer' : 'cursor-default'
              }`}
            >
              <div className="text-2xl font-bold gradient-text">
                {stat.emoji && <span className="mr-1">{stat.emoji}</span>}
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfileStats;
