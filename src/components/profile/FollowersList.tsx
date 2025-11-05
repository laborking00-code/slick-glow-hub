import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, UserMinus } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface FollowersListProps {
  defaultTab?: "followers" | "following";
}

const FollowersList = ({ defaultTab = "followers" }: FollowersListProps) => {
  const [followers, setFollowers] = useState<any[]>([]);
  const [following, setFollowing] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFollowData();
  }, []);

  const fetchFollowData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch followers
      const { data: followersData } = await supabase
        .from("follows")
        .select("follower_id, profiles!follows_follower_id_fkey(id, username, display_name, avatar_url)")
        .eq("following_id", user.id);

      // Fetch following
      const { data: followingData } = await supabase
        .from("follows")
        .select("following_id, profiles!follows_following_id_fkey(id, username, display_name, avatar_url)")
        .eq("follower_id", user.id);

      setFollowers(followersData?.map((f: any) => f.profiles) || []);
      setFollowing(followingData?.map((f: any) => f.profiles) || []);
    } catch (error) {
      console.error("Error fetching follow data:", error);
    } finally {
      setLoading(false);
    }
  };
  const UserCard = ({ user, isFollowing }: { user: any; isFollowing?: boolean }) => (
    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors group">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent p-0.5">
        <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden">
          <img 
            src={user.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`} 
            alt={user.display_name || user.username} 
            className="w-full h-full object-cover" 
          />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm truncate">{user.display_name || user.username}</p>
        <p className="text-xs text-muted-foreground truncate">@{user.username}</p>
      </div>
      {isFollowing !== undefined && (
        <Button
          size="sm"
          variant={isFollowing ? "secondary" : "default"}
          className={isFollowing ? "" : "bg-gradient-to-r from-primary to-accent hover:opacity-90"}
        >
          {isFollowing ? (
            <>
              <UserMinus className="w-3 h-3 mr-1" />
              Following
            </>
          ) : (
            <>
              <UserPlus className="w-3 h-3 mr-1" />
              Follow
            </>
          )}
        </Button>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Loading...
      </div>
    );
  }

  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="followers">Followers ({followers.length})</TabsTrigger>
        <TabsTrigger value="following">Following ({following.length})</TabsTrigger>
      </TabsList>
      
      <TabsContent value="followers" className="mt-0">
        <ScrollArea className="h-[300px] pr-4">
          {followers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No followers yet
            </div>
          ) : (
            <div className="space-y-2">
              {followers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          )}
        </ScrollArea>
      </TabsContent>
      
      <TabsContent value="following" className="mt-0">
        <ScrollArea className="h-[300px] pr-4">
          {following.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Not following anyone yet
            </div>
          ) : (
            <div className="space-y-2">
              {following.map((user) => (
                <UserCard key={user.id} user={user} isFollowing={true} />
              ))}
            </div>
          )}
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
};

export default FollowersList;
