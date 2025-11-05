import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2, Copy, Check } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ShareDialogProps {
  username: string;
  displayName: string;
}

const ShareDialog = ({ username, displayName }: ShareDialogProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  // Create profile URL (in production this would be your actual domain)
  const profileUrl = `${window.location.origin}/profile/${username}`;
  const shareText = `Check out ${displayName}'s Glow Up profile!`;
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Profile link copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive",
      });
    }
  };

  const socialNetworks = [
    {
      name: "Twitter",
      icon: "𝕏",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(profileUrl)}`,
      color: "hover:bg-black hover:text-white"
    },
    {
      name: "Facebook",
      icon: "f",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`,
      color: "hover:bg-[#1877F2] hover:text-white"
    },
    {
      name: "LinkedIn",
      icon: "in",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`,
      color: "hover:bg-[#0A66C2] hover:text-white"
    },
    {
      name: "WhatsApp",
      icon: "📱",
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + profileUrl)}`,
      color: "hover:bg-[#25D366] hover:text-white"
    },
    {
      name: "Telegram",
      icon: "✈️",
      url: `https://t.me/share/url?url=${encodeURIComponent(profileUrl)}&text=${encodeURIComponent(shareText)}`,
      color: "hover:bg-[#0088cc] hover:text-white"
    },
    {
      name: "Reddit",
      icon: "R",
      url: `https://reddit.com/submit?url=${encodeURIComponent(profileUrl)}&title=${encodeURIComponent(shareText)}`,
      color: "hover:bg-[#FF4500] hover:text-white"
    },
    {
      name: "TikTok",
      icon: "🎵",
      action: "copy",
      color: "hover:bg-black hover:text-white"
    },
    {
      name: "Instagram",
      icon: "📷",
      action: "copy",
      color: "hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 hover:text-white"
    },
  ];

  const handleShare = (network: typeof socialNetworks[0]) => {
    if (network.action === "copy") {
      copyToClipboard();
      toast({
        title: `Link copied for ${network.name}!`,
        description: `Open ${network.name} app and paste your profile link`,
      });
    } else {
      window.open(network.url, '_blank', 'width=600,height=400');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="flex-1 hover:scale-[1.02] transition-all">
          <Share2 className="w-4 h-4 mr-2" />
          Share Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card max-w-md">
        <DialogHeader>
          <DialogTitle className="gradient-text text-center">Share Your Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* QR Code Section */}
          <div className="flex flex-col items-center gap-3 p-4 glass-card rounded-lg">
            <h3 className="font-semibold text-sm">Scan to Join</h3>
            <div className="bg-white p-4 rounded-lg">
              <QRCodeCanvas 
                value={profileUrl} 
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Scan this QR code to view my profile
            </p>
          </div>

          {/* Copy Link Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Profile Link</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={profileUrl}
                readOnly
                className="flex-1 px-3 py-2 glass-card text-sm rounded-lg"
              />
              <Button
                size="sm"
                onClick={copyToClipboard}
                className="px-3"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Social Networks */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Share on Social Media</h3>
            <div className="grid grid-cols-4 gap-2">
              {socialNetworks.map((network) => (
                <Button
                  key={network.name}
                  variant="outline"
                  onClick={() => handleShare(network)}
                  className={`glass-card flex flex-col items-center gap-1 h-auto py-3 transition-all ${network.color}`}
                >
                  <span className="text-2xl">{network.icon}</span>
                  <span className="text-xs">{network.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center text-xs text-muted-foreground p-3 glass-card rounded-lg">
            💡 Invite friends to join and grow together!
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
