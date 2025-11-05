import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Video, VideoOff, Mic, MicOff, PhoneOff, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface VideoChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const VideoChatDialog = ({ open, onOpenChange }: VideoChatDialogProps) => {
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [username, setUsername] = useState("");
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (open && !isInCall) {
      startLocalVideo();
    } else if (!open) {
      stopCall();
    }
    return () => stopCall();
  }, [open]);

  const startLocalVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: "user",
          width: { ideal: 1280 }, 
          height: { ideal: 720 },
        },
        audio: true,
      });
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast.error("Failed to access camera");
    }
  };

  const stopCall = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const startCall = () => {
    if (!username.trim()) {
      toast.error("Please enter a username to call");
      return;
    }

    setIsInCall(true);
    toast.success(`Calling ${username}...`);
  };

  const endCall = () => {
    setIsInCall(false);
    stopCall();
    toast.success("Call ended");
    onOpenChange(false);
  };

  const toggleMute = () => {
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach(track => {
        track.enabled = isMuted;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      streamRef.current.getVideoTracks().forEach(track => {
        track.enabled = isVideoOff;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Video className="w-5 h-5" />
            Video Chat
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative grid grid-cols-2 gap-4">
            {/* Remote video (larger) */}
            <div className="col-span-2 relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
              {isInCall ? (
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
                  <div className="text-center">
                    <UserPlus className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Waiting to connect...</p>
                  </div>
                </div>
              )}

              {/* Local video (smaller, overlay) */}
              <div className="absolute bottom-4 right-4 w-48 aspect-video bg-black rounded-lg overflow-hidden border-2 border-white/20">
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover mirror"
                />
              </div>

              {isInCall && (
                <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full">
                  <span className="text-sm font-medium">Connected with {username}</span>
                </div>
              )}
            </div>
          </div>

          {!isInCall && (
            <Input
              placeholder="Enter username to call..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && startCall()}
            />
          )}

          <div className="flex gap-2 justify-center">
            {isInCall ? (
              <>
                <Button
                  variant={isMuted ? "destructive" : "outline"}
                  size="icon"
                  onClick={toggleMute}
                  className="rounded-full w-12 h-12"
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </Button>
                <Button
                  variant={isVideoOff ? "destructive" : "outline"}
                  size="icon"
                  onClick={toggleVideo}
                  className="rounded-full w-12 h-12"
                >
                  {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={endCall}
                  className="rounded-full w-12 h-12"
                >
                  <PhoneOff className="w-5 h-5" />
                </Button>
              </>
            ) : (
              <Button
                onClick={startCall}
                className="bg-green-500 hover:bg-green-600"
              >
                <Video className="w-4 h-4 mr-2" />
                Start Call
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoChatDialog;
