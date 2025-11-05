import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, Square, Play, X, RotateCcw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

interface ReelPostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ReelPostDialog = ({ open, onOpenChange }: ReelPostDialogProps) => {
  const { user } = useAuth();
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (open) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [open, facingMode]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode, 
          width: { ideal: 1080 }, 
          height: { ideal: 1920 },
          aspectRatio: 9/16
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

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const toggleCamera = () => {
    stopCamera();
    setFacingMode(prev => prev === "user" ? "environment" : "user");
  };

  const startRecording = () => {
    if (!streamRef.current) return;

    chunksRef.current = [];
    const mediaRecorder = new MediaRecorder(streamRef.current, {
      mimeType: 'video/webm;codecs=vp9',
    });

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setRecordedVideo(url);
      stopCamera();
    };

    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
    setIsRecording(true);

    // Auto-stop after 60 seconds (max reel length)
    setTimeout(() => {
      if (mediaRecorderRef.current?.state === "recording") {
        stopRecording();
      }
    }, 60000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const resetRecording = () => {
    setRecordedVideo(null);
    setCaption("");
    startCamera();
  };

  const handleUpload = async () => {
    if (!recordedVideo || !user) return;

    setUploading(true);
    try {
      const response = await fetch(recordedVideo);
      const blob = await response.blob();
      const file = new File([blob], `reel-${Date.now()}.webm`, { type: 'video/webm' });
      
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("profile-images")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("profile-images")
        .getPublicUrl(fileName);

      const { error: insertError } = await supabase
        .from("posts")
        .insert({
          user_id: user.id,
          content: caption,
          image_url: publicUrl,
          post_type: "reel",
        });

      if (insertError) throw insertError;

      toast.success("Reel posted!");
      onOpenChange(false);
      resetRecording();
    } catch (error) {
      console.error("Error uploading reel:", error);
      toast.error("Failed to post reel");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle>Create Reel</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 p-4">
          <div className="relative aspect-[9/16] bg-black rounded-lg overflow-hidden">
            {recordedVideo ? (
              <video
                src={recordedVideo}
                className="w-full h-full object-cover"
                controls
              />
            ) : (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover mirror"
              />
            )}

            {!recordedVideo && (
              <div className="absolute top-4 right-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleCamera}
                  className="bg-black/50 hover:bg-black/70 text-white rounded-full"
                >
                  <RotateCcw className="w-5 h-5" />
                </Button>
              </div>
            )}

            {!recordedVideo && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 items-center">
                {isRecording ? (
                  <Button
                    onClick={stopRecording}
                    className="rounded-full w-20 h-20 bg-red-500 hover:bg-red-600 p-0"
                  >
                    <Square className="w-8 h-8 fill-white" />
                  </Button>
                ) : (
                  <Button
                    onClick={startRecording}
                    className="rounded-full w-20 h-20 bg-red-500 hover:bg-red-600 p-0"
                  >
                    <div className="w-16 h-16 rounded-full bg-white" />
                  </Button>
                )}
              </div>
            )}

            {isRecording && (
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full animate-pulse">
                <div className="w-3 h-3 bg-white rounded-full" />
                <span className="text-sm font-medium">Recording</span>
              </div>
            )}
          </div>

          {recordedVideo && (
            <>
              <Textarea
                placeholder="Add a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="min-h-20"
              />

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={resetRecording}
                  className="flex-1"
                >
                  <X className="w-4 h-4 mr-2" />
                  Retake
                </Button>
                <Button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="flex-1"
                >
                  {uploading ? "Posting..." : "Post Reel"}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReelPostDialog;
