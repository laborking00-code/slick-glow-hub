import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageSquare, Video, Film, Radio, Users, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TextPostDialog from "@/components/create/TextPostDialog";
import VideoPostDialog from "@/components/create/VideoPostDialog";
import ReelPostDialog from "@/components/create/ReelPostDialog";
import StreamDialog from "@/components/create/StreamDialog";
import VideoChatDialog from "@/components/create/VideoChatDialog";

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreatePostDialog = ({ open, onOpenChange }: CreatePostDialogProps) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  const [showTextDialog, setShowTextDialog] = useState(false);
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const [showReelDialog, setShowReelDialog] = useState(false);
  const [showStreamDialog, setShowStreamDialog] = useState(false);
  const [showVideoChatDialog, setShowVideoChatDialog] = useState(false);

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
        video: {
          facingMode: "user",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: { ideal: 60 },
        },
        audio: true,
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
    onOpenChange(false);
    
    switch (type) {
      case "text":
        setShowTextDialog(true);
        break;
      case "video":
        setShowVideoDialog(true);
        break;
      case "reel":
        setShowReelDialog(true);
        break;
      case "stream":
        setShowStreamDialog(true);
        break;
      case "chat":
        setShowVideoChatDialog(true);
        break;
    }
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
          <div className="bg-gradient-to-t from-black/90 to-transparent p-4 pb-6">
            <div className="flex justify-center items-center gap-3 max-w-xl mx-auto">
              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col gap-1 h-auto py-2 px-3 text-white hover:bg-white/10 transition-all"
                onClick={() => handleCreateType("text")}
              >
                <MessageSquare className="w-6 h-6" />
                <span className="text-xs">Text</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col gap-1 h-auto py-2 px-3 text-white hover:bg-white/10 transition-all"
                onClick={() => handleCreateType("video")}
              >
                <Video className="w-6 h-6" />
                <span className="text-xs">Video</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col gap-1 h-auto py-2 px-3 text-white hover:bg-white/10 transition-all"
                onClick={() => handleCreateType("reel")}
              >
                <Film className="w-6 h-6" />
                <span className="text-xs">Reel</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col gap-1 h-auto py-2 px-3 text-white hover:bg-white/10 transition-all"
                onClick={() => handleCreateType("stream")}
              >
                <Radio className="w-6 h-6" />
                <span className="text-xs">Stream</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col gap-1 h-auto py-2 px-3 text-white hover:bg-white/10 transition-all"
                onClick={() => handleCreateType("chat")}
              >
                <Users className="w-6 h-6" />
                <span className="text-xs">Chat</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>

      <TextPostDialog open={showTextDialog} onOpenChange={setShowTextDialog} />
      <VideoPostDialog open={showVideoDialog} onOpenChange={setShowVideoDialog} />
      <ReelPostDialog open={showReelDialog} onOpenChange={setShowReelDialog} />
      <StreamDialog open={showStreamDialog} onOpenChange={setShowStreamDialog} />
      <VideoChatDialog open={showVideoChatDialog} onOpenChange={setShowVideoChatDialog} />
    </Dialog>
  );
};

export default CreatePostDialog;
