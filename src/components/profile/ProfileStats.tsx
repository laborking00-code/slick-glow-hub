import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const ProfileStats = () => {
  const [postCount, setPostCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

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

  const stats = [
    { label: "Posts", value: postCount },
    { label: "Followers", value: followerCount },
    { label: "Following", value: followingCount },
  ];

  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <button
            key={stat.label}
            className="group text-center space-y-1 hover:scale-105 transition-transform"
          >
            <div className="text-2xl font-bold gradient-text">
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileStats;
