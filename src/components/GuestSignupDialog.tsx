import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface GuestSignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GuestSignupDialog = ({ open, onOpenChange }: GuestSignupDialogProps) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Join Us!</DialogTitle>
          <DialogDescription className="text-base pt-2">
            Sign up to unlock all features and start your glow journey
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-4">
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
            onClick={() => navigate("/auth")}
          >
            Sign Up Now
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => onOpenChange(false)}
          >
            Continue Browsing
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GuestSignupDialog;
