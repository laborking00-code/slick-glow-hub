import { Button } from "@/components/ui/button";
import { Settings, Share2 } from "lucide-react";
import coverPhoto from "@/assets/profile-cover.jpg";

const ProfileHeader = () => {
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
            <Share2 className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-primary/10">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* User Info */}
      <div className="space-y-2">
        <div>
          <h2 className="text-2xl font-bold">Alex Rivera</h2>
          <p className="text-sm text-muted-foreground">@alexrivera</p>
        </div>
        <p className="text-sm text-foreground/80">
          Digital creator ✨ | Coffee enthusiast ☕ | Explorer 🌍
        </p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>🎯 Creator since 2021</span>
        </div>
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
