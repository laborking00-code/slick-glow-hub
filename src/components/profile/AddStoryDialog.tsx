import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface AddStoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddStoryDialog = ({ open, onOpenChange }: AddStoryDialogProps) => {
  const { user } = useAuth();
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isCamera, setIsCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCamera(true);
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
    setIsCamera(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "story.jpg", { type: "image/jpeg" });
          setFile(file);
          setPreview(URL.createObjectURL(blob));
          stopCamera();
        }
      }, "image/jpeg", 0.95);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file || !user) return;

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("stories")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("stories")
        .getPublicUrl(fileName);

      const { error: insertError } = await (supabase as any)
        .from("stories")
        .insert({
          user_id: user.id,
          media_url: publicUrl,
          media_type: file.type.startsWith("video") ? "video" : "image",
          duration: 5,
        });

      if (insertError) throw insertError;

      toast.success("Story posted!");
      onOpenChange(false);
      setPreview(null);
      setFile(null);
    } catch (error) {
      console.error("Error uploading story:", error);
      toast.error("Failed to post story");
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    stopCamera();
    setPreview(null);
    setFile(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add to Story</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {preview ? (
            <div className="relative aspect-[9/16] bg-muted rounded-lg overflow-hidden">
              {file?.type.startsWith("video") ? (
                <video src={preview} className="w-full h-full object-cover" controls />
              ) : (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => { setPreview(null); setFile(null); }}
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : isCamera ? (
            <div className="relative aspect-[9/16] bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover mirror"
              />
              <Button
                onClick={capturePhoto}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full w-16 h-16"
              >
                <Camera className="w-6 h-6" />
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={startCamera}
                className="h-32 flex flex-col gap-2"
              >
                <Camera className="w-8 h-8" />
                <span>Camera</span>
              </Button>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <div className="h-32 flex flex-col gap-2 items-center justify-center border-2 border-dashed rounded-lg hover:border-primary transition-colors">
                  <Upload className="w-8 h-8" />
                  <span>Upload</span>
                </div>
              </label>
            </div>
          )}

          {preview && (
            <Button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full"
            >
              {uploading ? "Posting..." : "Post Story"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddStoryDialog;
