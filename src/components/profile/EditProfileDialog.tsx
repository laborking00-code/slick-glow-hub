import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Upload, Camera } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface EditProfileDialogProps {
  profile: any;
  onProfileUpdated: () => void;
}

const EditProfileDialog = ({ profile, onProfileUpdated }: EditProfileDialogProps) => {
  const [open, setOpen] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [relationshipStatus, setRelationshipStatus] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [hobby, setHobby] = useState("");
  const [career, setCareer] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [coverPreview, setCoverPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || "");
      setBio(profile.bio || "");
      setRelationshipStatus(profile.relationship_status || "not_specified");
      setCurrentCity(profile.current_city || "");
      setHobby(profile.hobby || "");
      setCareer(profile.career || "");
      setAvatarPreview(profile.avatar_url || "");
      setCoverPreview(profile.cover_url || "");
    }
  }, [profile]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
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
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      let avatarUrl = profile?.avatar_url;
      let coverUrl = profile?.cover_url;

      // Upload avatar if changed
      if (avatarFile) {
        const uploadedUrl = await uploadImage(avatarFile, 'avatar');
        if (uploadedUrl) avatarUrl = uploadedUrl;
      }

      // Upload cover if changed
      if (coverFile) {
        const uploadedUrl = await uploadImage(coverFile, 'cover');
        if (uploadedUrl) coverUrl = uploadedUrl;
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          display_name: displayName,
          bio,
          relationship_status: relationshipStatus === "not_specified" ? null : relationshipStatus,
          current_city: currentCity,
          hobby,
          career,
          avatar_url: avatarUrl,
          cover_url: coverUrl,
        })
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "Profile updated!",
        description: "Your changes have been saved.",
      });

      setOpen(false);
      onProfileUpdated();
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-primary/10">
          <Settings className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card max-w-md">
        <DialogHeader>
          <DialogTitle className="gradient-text">Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Cover Photo Upload */}
          <div className="space-y-2">
            <Label>Cover Photo</Label>
            <div className="relative h-32 rounded-lg overflow-hidden bg-muted">
              {coverPreview ? (
                <img src={coverPreview} alt="Cover preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-primary/20 to-accent/20">
                  <Camera className="w-8 h-8 text-muted-foreground" />
                </div>
              )}
              <label className="absolute bottom-2 right-2 cursor-pointer">
                <div className="bg-background/80 backdrop-blur-sm p-2 rounded-full hover:bg-background transition-all">
                  <Upload className="w-4 h-4" />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Avatar Upload */}
          <div className="space-y-2">
            <Label>Profile Picture</Label>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden bg-muted">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-accent">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                )}
                <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 cursor-pointer transition-opacity">
                  <Upload className="w-5 h-5 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-xs text-muted-foreground">
                Click to upload a new profile picture
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your display name"
              className="glass-card"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself"
              className="glass-card min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="relationshipStatus">Relationship Status</Label>
            <Select value={relationshipStatus} onValueChange={setRelationshipStatus}>
              <SelectTrigger className="glass-card">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not_specified">Prefer not to say</SelectItem>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="in_relationship">In a Relationship</SelectItem>
                <SelectItem value="engaged">Engaged</SelectItem>
                <SelectItem value="married">Married</SelectItem>
                <SelectItem value="complicated">It's Complicated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">Current City</Label>
            <Input
              id="city"
              value={currentCity}
              onChange={(e) => setCurrentCity(e.target.value)}
              placeholder="e.g., Tokyo, Japan"
              className="glass-card"
            />
            <p className="text-xs text-muted-foreground">Enter any city in the world</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hobby">Hobby</Label>
            <Input
              id="hobby"
              value={hobby}
              onChange={(e) => setHobby(e.target.value)}
              placeholder="e.g., Photography"
              className="glass-card"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="career">Career</Label>
            <Input
              id="career"
              value={career}
              onChange={(e) => setCareer(e.target.value)}
              placeholder="e.g., Software Engineer"
              className="glass-card"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-accent neon-glow"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;