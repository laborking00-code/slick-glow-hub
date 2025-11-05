import { Button } from "@/components/ui/button";
import { MessageCircle, Camera, Upload, Video, MapPin, Heart } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import EditProfileDialog from "./EditProfileDialog";
import ShareDialog from "./ShareDialog";
import { useToast } from "@/hooks/use-toast";

const ProfileHeader = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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

  const uploadImage = async (file: File, folder: string): Promise<string | null> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${folder}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('profile-images')
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading:', error);
      return null;
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 50MB for videos, 10MB for images)
    const maxSize = file.type.startsWith('video/') ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: `Max size is ${file.type.startsWith('video/') ? '50MB for videos' : '10MB for images'}`,
        variant: "destructive",
      });
      return;
    }

    setUploadingAvatar(true);
    try {
      const url = await uploadImage(file, 'avatar');
      if (url) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { error } = await supabase
          .from('profiles')
          .update({ avatar_url: url })
          .eq('id', user.id);

        if (error) throw error;

        toast({
          title: "Profile picture updated!",
          description: "Your new photo has been saved.",
        });

        fetchProfile();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 100MB for videos, 10MB for images)
    const maxSize = file.type.startsWith('video/') ? 100 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: `Max size is ${file.type.startsWith('video/') ? '100MB for videos' : '10MB for images'}`,
        variant: "destructive",
      });
      return;
    }

    setUploadingCover(true);
    try {
      const url = await uploadImage(file, 'cover');
      if (url) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { error } = await supabase
          .from('profiles')
          .update({ cover_url: url })
          .eq('id', user.id);

        if (error) throw error;

        toast({
          title: "Cover photo updated!",
          description: "Your new cover has been saved.",
        });

        fetchProfile();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploadingCover(false);
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

  // Calculate level: 1 level per 100 points, max level 10
  const calculateLevel = (glowUpProgress: number) => {
    return Math.min(Math.floor((glowUpProgress || 0) / 100) + 1, 10);
  };

  const userLevel = calculateLevel(profile?.glow_up_progress || 0);

  const isVideo = (url: string) => {
    if (!url) return false;
    return url.match(/\.(mp4|webm|ogg|mov)$/i) !== null;
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden relative">
      {/* Cover Photo */}
      <div className="relative h-32 sm:h-40 overflow-hidden group">
        {profile?.cover_url ? (
          isVideo(profile.cover_url) ? (
            <video 
              src={profile.cover_url} 
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img 
              src={profile.cover_url} 
              alt="Profile cover" 
              className="w-full h-full object-cover"
            />
          )
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/30 via-accent/20 to-primary/30 relative">
            <div className="absolute inset-0 holographic opacity-20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        
        {/* Hover overlay for cover upload OR default prompt */}
        <div className={`absolute inset-0 bg-black/60 ${profile?.cover_url ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'} transition-opacity flex items-center justify-center`}>
          <label className="cursor-pointer">
            <div className="flex flex-col items-center gap-2 text-white">
              <div className="flex gap-2">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all hover:scale-110">
                  <Camera className="w-6 h-6" />
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all hover:scale-110">
                  <Video className="w-6 h-6" />
                </div>
              </div>
              <span className="text-sm font-semibold">
                {uploadingCover ? 'Uploading...' : profile?.cover_url ? 'Change Cover' : 'Add Cover Photo/Video'}
              </span>
              {!profile?.cover_url && (
                <span className="text-xs text-white/80">Click to upload</span>
              )}
            </div>
            <input
              ref={coverInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleCoverChange}
              className="hidden"
              disabled={uploadingCover}
            />
          </label>
        </div>
      </div>
      
      {/* Holographic background effect */}
      <div className="absolute inset-0 holographic opacity-10 pointer-events-none" />
      
      {/* Content Container */}
      <div className="p-6 space-y-4 relative -mt-12">
        {/* Avatar and Actions */}
        <div className="flex items-start justify-between relative z-10">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary via-accent to-primary p-1 animate-scale-in animate-pulse-glow shadow-lg">
            <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden">
              {profile?.avatar_url ? (
                isVideo(profile.avatar_url) ? (
                  <video 
                    src={profile.avatar_url} 
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img 
                    src={profile.avatar_url} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                )
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 holographic opacity-30" />
                </div>
              )}
            </div>
          </div>
          
          {/* Hover overlay for avatar upload OR default prompt */}
          <label className={`absolute inset-0 flex items-center justify-center rounded-full cursor-pointer transition-opacity ${profile?.avatar_url ? 'bg-black/70 opacity-0 group-hover:opacity-100' : 'bg-black/60 opacity-100'}`}>
            <div className="text-white flex flex-col items-center gap-1">
              {profile?.avatar_url ? (
                <>
                  <Upload className="w-5 h-5" />
                  <span className="text-[10px] font-medium">
                    {uploadingAvatar ? 'Uploading...' : 'Change'}
                  </span>
                </>
              ) : (
                <>
                  <div className="flex gap-1 mb-1">
                    <Camera className="w-4 h-4" />
                    <Video className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-semibold">
                    {uploadingAvatar ? 'Uploading...' : 'Add Photo/Video'}
                  </span>
                </>
              )}
            </div>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleAvatarChange}
              className="hidden"
              disabled={uploadingAvatar}
            />
          </label>
          
          {/* Level Badge */}
          <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-accent to-primary text-white text-xs font-bold px-3 py-1 rounded-full neon-glow-accent shadow-lg">
            Lv. {userLevel}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Link to="/messages">
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <MessageCircle className="w-5 h-5" />
            </Button>
          </Link>
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
          <EditProfileDialog profile={profile} onProfileUpdated={fetchProfile} />
          <ShareDialog 
            username={profile?.username || 'user'} 
            displayName={profile?.display_name || 'User'} 
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
