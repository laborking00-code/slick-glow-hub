import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Profile {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
}

interface StartConversationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectUser: (profile: Profile) => void;
}

const StartConversationDialog = ({
  open,
  onOpenChange,
  onSelectUser,
}: StartConversationDialogProps) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [followers, setFollowers] = useState<Profile[]>([]);
  const [following, setFollowing] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || !open) return;

    const loadConnections = async () => {
      setLoading(true);

      // Load followers
      const { data: followersData } = await supabase
        .from("follows")
        .select("follower_id, profiles!follows_follower_id_fkey(*)")
        .eq("following_id", user.id);

      // Load following
      const { data: followingData } = await supabase
        .from("follows")
        .select("following_id, profiles!follows_following_id_fkey(*)")
        .eq("follower_id", user.id);

      setFollowers(
        followersData?.map((f: any) => f.profiles).filter(Boolean) || []
      );
      setFollowing(
        followingData?.map((f: any) => f.profiles).filter(Boolean) || []
      );
      setLoading(false);
    };

    loadConnections();
  }, [user, open]);

  const allUsers = [...new Map([...followers, ...following].map(item => [item.id, item])).values()];

  const filteredUsers = allUsers.filter((profile) =>
    profile.display_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectUser = (profile: Profile) => {
    onSelectUser(profile);
    onOpenChange(false);
    setSearchQuery("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card">
        <DialogHeader>
          <DialogTitle className="gradient-text">Start Conversation</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search followers and following..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 glass-card"
            />
          </div>

          <ScrollArea className="h-[400px]">
            {loading ? (
              <div className="p-8 text-center text-muted-foreground">
                Loading...
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <p>No connections found</p>
                <p className="text-sm mt-2">Follow users to start messaging</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredUsers.map((profile) => (
                  <button
                    key={profile.id}
                    onClick={() => handleSelectUser(profile)}
                    className="w-full p-3 flex items-center gap-3 hover:bg-accent/50 transition-colors rounded-lg"
                  >
                    <Avatar className="w-12 h-12 border-2 border-primary/20">
                      {profile.avatar_url ? (
                        <img
                          src={profile.avatar_url}
                          alt={profile.display_name || profile.username}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/30 to-accent/30 holographic flex items-center justify-center text-xl font-bold">
                          {(profile.display_name || profile.username)
                            .charAt(0)
                            .toUpperCase()}
                        </div>
                      )}
                    </Avatar>
                    <div className="flex-1 text-left">
                      <p className="font-semibold">
                        {profile.display_name || profile.username}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        @{profile.username}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StartConversationDialog;
