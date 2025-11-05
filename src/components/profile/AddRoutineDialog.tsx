import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AddRoutineDialogProps {
  onRoutineAdded: () => void;
}

const AddRoutineDialog = ({ onRoutineAdded }: AddRoutineDialogProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string>("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("routines").insert({
        user_id: user.id,
        title,
        category,
        time,
      });

      if (error) throw error;

      toast({
        title: "Routine added!",
        description: "+1 point earned",
      });

      setTitle("");
      setCategory("");
      setTime("");
      setOpen(false);
      onRoutineAdded();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-gradient-to-r from-primary to-accent neon-glow">
          <Plus className="w-4 h-4 mr-2" />
          Add Routine
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card">
        <DialogHeader>
          <DialogTitle className="gradient-text">Add New Routine</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Drink water"
              required
              className="glass-card"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger className="glass-card">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning</SelectItem>
                <SelectItem value="workout">Workout</SelectItem>
                <SelectItem value="meal">Meal</SelectItem>
                <SelectItem value="supplement">Supplement</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g., 8:00 AM"
              required
              className="glass-card"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-accent neon-glow"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Routine"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRoutineDialog;