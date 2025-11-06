import { ShoppingBag, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileStats from "@/components/profile/ProfileStats";
import GamificationSection from "@/components/profile/GamificationSection";
import RoutineSection from "@/components/profile/RoutineSection";
import ContentTabs from "@/components/profile/ContentTabs";
import CreatePostDialog from "@/components/profile/CreatePostDialog";
import { useState } from "react";

const Profile = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-card border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-lg font-bold">Profile</h1>
          <Link to="/products">
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <ShoppingBag className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
        <ProfileHeader />
        <ProfileStats />
        <GamificationSection />
        <RoutineSection />
        <ContentTabs />
      </main>

      {/* Fixed Create Button */}
      <Button
        size="lg"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg hover:shadow-xl neon-glow hover:scale-110 transition-all z-50 p-0"
        aria-label="Create new post"
        onClick={() => setCreateDialogOpen(true)}
      >
        <Plus className="w-6 h-6" />
      </Button>

      {/* Create Post Dialog */}
      <CreatePostDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
    </div>
  );
};

export default Profile;
