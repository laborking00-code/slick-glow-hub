import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Video } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface VideoPostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const VideoPostDialog = ({ open, onOpenChange }: VideoPostDialogProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [caption, setCaption] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [albumId, setAlbumId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    } else {
      toast({
        title: "Invalid file",
        description: "Please select a video file",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async () => {
    if (!user || !videoFile) return;

    setIsSubmitting(true);

    try {
      // Upload video to storage
      const fileExt = videoFile.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(fileName, videoFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("gallery")
        .getPublicUrl(fileName);

      // Create gallery item
      const { error: galleryError } = await supabase.from("gallery_items").insert({
        user_id: user.id,
        media_url: publicUrl,
        media_type: "video",
        caption: caption.trim() || null,
        album_id: albumId,
      });

      if (galleryError) throw galleryError;

      // Create post
      const { error: postError } = await supabase.from("posts").insert({
        user_id: user.id,
        content: caption.trim() || null,
        image_url: publicUrl,
        post_type: "video",
      });

      if (postError) throw postError;

      toast({
        title: "Success",
        description: "Video posted successfully",
      });

      setCaption("");
      setVideoFile(null);
      setVideoPreview("");
      setIsSubmitting(false);
      onOpenChange(false);
    } catch (error) {
      console.error("Error posting video:", error);
      toast({
        title: "Error",
        description: "Failed to post video",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card max-w-2xl">
        <DialogHeader>
          <DialogTitle className="gradient-text">Upload Video</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {videoPreview ? (
            <div className="aspect-video glass-card rounded-lg overflow-hidden">
              <video src={videoPreview} controls className="w-full h-full" />
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full aspect-video glass-card rounded-lg flex flex-col items-center justify-center gap-4 hover:bg-accent/20 transition-colors"
            >
              <Video className="w-16 h-16 text-muted-foreground" />
              <div className="text-center">
                <p className="font-medium">Click to upload video</p>
                <p className="text-sm text-muted-foreground">MP4, WebM, or OGG</p>
              </div>
            </button>
          )}

          <Textarea
            placeholder="Add a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="glass-card resize-none"
            rows={3}
          />

          <Button
            onClick={handleSubmit}
            disabled={!videoFile || isSubmitting}
            className="w-full bg-gradient-to-r from-primary to-accent neon-glow"
          >
            {isSubmitting ? "Uploading..." : "Post Video"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPostDialog;
