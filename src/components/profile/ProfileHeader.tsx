import { Button } from "@/components/ui/button";
import { Share2, MapPin, Heart, MessageCircle } from "lucide-react";
import coverPhoto from "@/assets/profile-cover.jpg";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import EditProfileDialog from "./EditProfileDialog";

const ProfileHeader = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const formatRelationshipStatus = (status: string) => {
    if (!status || status === "not_specified") return null;
    const statusMap: { [key: string]: string } = {
      single: "Single",
      in_relationship: "In a Relationship",
      engaged: "Engaged",
      married: "Married",
      complicated: "It's Complicated",
    };
    return statusMap[status] || status;
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden relative">
      {/* Cover Photo */}
      <div className="relative h-32 sm:h-40 overflow-hidden">
        <img 
          src={coverPhoto} 
          alt="Profile cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>
      
      {/* Holographic background effect */}
      <div className="absolute inset-0 holographic opacity-10 pointer-events-none" />
      
      {/* Content Container */}
      <div className="p-6 space-y-4 relative -mt-12">
        {/* Avatar and Actions */}
        <div className="flex items-start justify-between relative z-10">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary via-accent to-primary p-1 animate-scale-in animate-pulse-glow">
            <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Level Badge */}
          <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-accent to-primary text-white text-xs font-bold px-3 py-1 rounded-full neon-glow-accent">
            Lv. 42
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="hover:bg-primary/10">
            <MessageCircle className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-primary/10">
            <Share2 className="w-5 h-5" />
          </Button>
          <EditProfileDialog profile={profile} onProfileUpdated={fetchProfile} />
        </div>
      </div>

      {/* User Info */}
      <div className="space-y-3">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{profile?.display_name || "User"}</h2>
            <p className="text-sm text-muted-foreground">@{profile?.username || "user"}</p>
          </div>
        </div>

        {/* City, Relationship, Hobby, Career */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          {profile?.current_city && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{profile.current_city}</span>
            </div>
          )}
          {profile?.relationship_status && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Heart className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{formatRelationshipStatus(profile.relationship_status)}</span>
            </div>
          )}
          {profile?.hobby && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <span className="truncate">🎯 {profile.hobby}</span>
            </div>
          )}
          {profile?.career && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <span className="truncate">💼 {profile.career}</span>
            </div>
          )}
        </div>

        {profile?.bio && (
          <p className="text-sm text-foreground/80 pt-2 border-t border-white/5">
            {profile.bio}
          </p>
        )}
      </div>

        {/* Action Buttons */}
        <div className="flex gap-2 relative z-10">
          <Button className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all font-semibold neon-glow hover:scale-[1.02]">
            Edit Profile
          </Button>
          <Button variant="secondary" className="flex-1 hover:scale-[1.02] transition-all">
            Share Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
