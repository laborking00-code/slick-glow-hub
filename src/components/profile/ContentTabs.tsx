import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid3x3, Bookmark, Heart, FolderOpen, Play } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import PostCard from "./PostCard";
import GallerySection from "./GallerySection";
import StoriesSection from "./StoriesSection";

const ContentTabs = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [likes, setLikes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      setProfile(profileData);

      // Fetch posts
      const { data: postsData } = await supabase
        .from("posts")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setPosts(postsData || []);

      // Fetch all likes to count
      const { data: allLikesData } = await supabase
        .from("likes")
        .select("*");
      setLikes(allLikesData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getLikeCount = (postId: string) => {
    return likes.filter(like => like.post_id === postId).length;
  };

  const isPostLiked = (postId: string, userId: string) => {
    return likes.some(like => like.post_id === postId && like.user_id === userId);
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="w-full grid grid-cols-5 rounded-none h-14 bg-card/50">
          <TabsTrigger value="posts" className="gap-2">
            <Grid3x3 className="w-4 h-4" />
            Posts
          </TabsTrigger>
          <TabsTrigger value="stories" className="gap-2">
            <Play className="w-4 h-4" />
            Stories
          </TabsTrigger>
          <TabsTrigger value="gallery" className="gap-2">
            <FolderOpen className="w-4 h-4" />
            Gallery
          </TabsTrigger>
          <TabsTrigger value="saved" className="gap-2">
            <Bookmark className="w-4 h-4" />
            Saved
          </TabsTrigger>
          <TabsTrigger value="liked" className="gap-2">
            <Heart className="w-4 h-4" />
            Liked
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts" className="p-4 mt-0">
          <div className="space-y-4">
            {loading ? (
              <p className="text-center text-muted-foreground py-8">Loading posts...</p>
            ) : posts.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No posts yet</p>
            ) : (
              posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  profile={profile}
                  likeCount={getLikeCount(post.id)}
                  isLiked={isPostLiked(post.id, profile?.id)}
                  onLikeToggle={fetchData}
                />
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="stories" className="p-4 mt-0">
          <StoriesSection />
        </TabsContent>
        
        <TabsContent value="gallery" className="p-4 mt-0">
          <GallerySection />
        </TabsContent>
        
        <TabsContent value="saved" className="p-4 mt-0">
          <p className="text-center text-muted-foreground py-8">No saved posts yet</p>
        </TabsContent>
        
        <TabsContent value="liked" className="p-4 mt-0">
          <div className="space-y-4">
            {loading ? (
              <p className="text-center text-muted-foreground py-8">Loading...</p>
            ) : (
              posts
                .filter(post => isPostLiked(post.id, profile?.id))
                .map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    profile={profile}
                    likeCount={getLikeCount(post.id)}
                    isLiked={true}
                    onLikeToggle={fetchData}
                  />
                ))
            )}
            {!loading && posts.filter(post => isPostLiked(post.id, profile?.id)).length === 0 && (
              <p className="text-center text-muted-foreground py-8">No liked posts yet</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentTabs;
