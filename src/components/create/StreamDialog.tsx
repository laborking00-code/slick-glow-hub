import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Radio, Square, Users, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface StreamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const StreamDialog = ({ open, onOpenChange }: StreamDialogProps) => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamTitle, setStreamTitle] = useState("");
  const [streamDescription, setStreamDescription] = useState("");
  const [viewerCount] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (open && !isStreaming) {
      startPreview();
    } else if (!open) {
      stopStream();
    }
    return () => stopStream();
  }, [open]);

  const startPreview = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: "user",
          width: { ideal: 1920 }, 
          height: { ideal: 1080 },
        },
        audio: true,
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast.error("Failed to access camera");
    }
  };

  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const startStreaming = () => {
    if (!streamTitle.trim()) {
      toast.error("Please add a title for your stream");
      return;
    }

    setIsStreaming(true);
    toast.success("Live stream started!");
  };

  const endStream = () => {
    setIsStreaming(false);
    stopStream();
    toast.success("Stream ended");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Radio className="w-5 h-5" />
            {isStreaming ? "Live Stream" : "Start Live Stream"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted={!isStreaming}
              className="w-full h-full object-cover mirror"
            />

            {isStreaming && (
              <div className="absolute top-4 left-4 flex items-center gap-4">
                <div className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full animate-pulse">
                  <div className="w-3 h-3 bg-white rounded-full" />
                  <span className="text-sm font-bold">LIVE</span>
                </div>
                <div className="flex items-center gap-2 bg-black/70 text-white px-3 py-1 rounded-full">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm font-medium">{viewerCount}</span>
                </div>
              </div>
            )}

            {isStreaming && streamTitle && (
              <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-3 rounded-lg">
                <h3 className="font-semibold">{streamTitle}</h3>
                {streamDescription && (
                  <p className="text-sm text-white/80 mt-1">{streamDescription}</p>
                )}
              </div>
            )}
          </div>

          {!isStreaming && (
            <>
              <Input
                placeholder="Stream title..."
                value={streamTitle}
                onChange={(e) => setStreamTitle(e.target.value)}
                className="text-lg font-semibold"
              />
              <Textarea
                placeholder="Description (optional)..."
                value={streamDescription}
                onChange={(e) => setStreamDescription(e.target.value)}
                className="min-h-20"
              />
            </>
          )}

          <div className="flex gap-2">
            {isStreaming ? (
              <Button
                onClick={endStream}
                variant="destructive"
                className="w-full"
              >
                <Square className="w-4 h-4 mr-2" />
                End Stream
              </Button>
            ) : (
              <Button
                onClick={startStreaming}
                className="w-full bg-red-500 hover:bg-red-600"
              >
                <Radio className="w-4 h-4 mr-2" />
                Go Live
              </Button>
            )}
          </div>

          {isStreaming && (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>Stream is live and ready for viewers</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StreamDialog;
