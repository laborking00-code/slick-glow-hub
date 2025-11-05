import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageSquare, Video, Film, Radio, Users, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreatePostDialog = ({ open, onOpenChange }: CreatePostDialogProps) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [open]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast({
        title: "Camera access denied",
        description: "Please allow camera access to create posts",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handleCreateType = (type: string) => {
    toast({
      title: `Creating ${type}`,
      description: "This feature is coming soon!",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full w-full h-full p-0 m-0 border-0 bg-black">
        <div className="relative w-full h-full flex flex-col">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
            onClick={() => onOpenChange(false)}
          >
            <X className="w-6 h-6" />
          </Button>

          {/* Camera View */}
          <div className="flex-1 relative bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom Actions Bar */}
          <div className="bg-gradient-to-t from-black/90 to-transparent p-6 pb-8">
            <div className="flex justify-around items-center max-w-2xl mx-auto">
              <Button
                variant="ghost"
                size="lg"
                className="flex flex-col gap-2 h-auto py-3 px-6 text-white hover:bg-white/10 hover:scale-110 transition-all"
                onClick={() => handleCreateType("Text Post")}
              >
                <MessageSquare className="w-8 h-8" />
                <span className="text-xs font-medium">Text</span>
              </Button>

              <Button
                variant="ghost"
                size="lg"
                className="flex flex-col gap-2 h-auto py-3 px-6 text-white hover:bg-white/10 hover:scale-110 transition-all"
                onClick={() => handleCreateType("Video Post")}
              >
                <Video className="w-8 h-8" />
                <span className="text-xs font-medium">Video</span>
              </Button>

              <Button
                variant="ghost"
                size="lg"
                className="flex flex-col gap-2 h-auto py-3 px-6 text-white hover:bg-white/10 hover:scale-110 transition-all"
                onClick={() => handleCreateType("Reel")}
              >
                <Film className="w-8 h-8" />
                <span className="text-xs font-medium">Reel</span>
              </Button>

              <Button
                variant="ghost"
                size="lg"
                className="flex flex-col gap-2 h-auto py-3 px-6 text-white hover:bg-white/10 hover:scale-110 transition-all"
                onClick={() => handleCreateType("Stream")}
              >
                <Radio className="w-8 h-8" />
                <span className="text-xs font-medium">Stream</span>
              </Button>

              <Button
                variant="ghost"
                size="lg"
                className="flex flex-col gap-2 h-auto py-3 px-6 text-white hover:bg-white/10 hover:scale-110 transition-all"
                onClick={() => handleCreateType("Video Chat")}
              >
                <Users className="w-8 h-8" />
                <span className="text-xs font-medium">Chat</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;
