import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings } from "lucide-react";
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
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || "");
      setBio(profile.bio || "");
      setRelationshipStatus(profile.relationship_status || "");
      setCurrentCity(profile.current_city || "");
      setHobby(profile.hobby || "");
      setCareer(profile.career || "");
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("profiles")
        .update({
          display_name: displayName,
          bio,
          relationship_status: relationshipStatus,
          current_city: currentCity,
          hobby,
          career,
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
                <SelectItem value="">Prefer not to say</SelectItem>
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