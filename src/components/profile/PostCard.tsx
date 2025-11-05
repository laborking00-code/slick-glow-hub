import { useState } from "react";
import { Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PostCardProps {
  post: {
    id: string;
    content: string;
    image_url: string | null;
    post_type: string;
    created_at: string;
    user_id: string;
  };
  profile: any;
  likeCount: number;
  isLiked: boolean;
  onLikeToggle: () => void;
}

const PostCard = ({ post, profile, likeCount, isLiked, onLikeToggle }: PostCardProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleLike = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      if (isLiked) {
        await supabase
          .from("likes")
          .delete()
          .eq("user_id", user.id)
          .eq("post_id", post.id);
      } else {
        await supabase
          .from("likes")
          .insert({
            user_id: user.id,
            post_id: post.id,
          });

        toast({
          title: "Post liked!",
          description: "+1 point earned",
        });
      }

      onLikeToggle();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="glass-card p-4 space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent p-0.5">
          <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden">
            <img
              src={profile?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.username}`}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div>
          <p className="font-semibold text-sm">{profile?.display_name}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(post.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {post.content && (
        <p className="text-sm">{post.content}</p>
      )}

      {post.image_url && (
        <img
          src={post.image_url}
          alt="Post"
          className="w-full rounded-lg object-cover max-h-96"
        />
      )}

      <div className="flex items-center gap-4 pt-2 border-t border-white/5">
        <button
          onClick={handleLike}
          disabled={loading}
          className={`flex items-center gap-2 transition-all hover:scale-110 ${
            isLiked ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Heart
            className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`}
          />
          <span className="text-sm">{likeCount}</span>
        </button>
      </div>
    </Card>
  );
};

export default PostCard;