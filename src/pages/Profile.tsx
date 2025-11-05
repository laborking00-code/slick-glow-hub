import { Home, LogOut, ShoppingBag, Plus, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileStats from "@/components/profile/ProfileStats";
import GamificationSection from "@/components/profile/GamificationSection";
import RoutineSection from "@/components/profile/RoutineSection";
import ContentTabs from "@/components/profile/ContentTabs";
import CreatePostDialog from "@/components/profile/CreatePostDialog";
import GuestSignupDialog from "@/components/GuestSignupDialog";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

const Profile = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [guestSignupOpen, setGuestSignupOpen] = useState(false);

  const handleGuestAction = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      e.stopPropagation();
      setGuestSignupOpen(true);
    }
  };

  // Remove redirect - allow guest viewing

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-card border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <Home className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-bold">Profile</h1>
          <div className="flex gap-2">
            <Link to="/products">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <ShoppingBag className="w-5 h-5" />
              </Button>
            </Link>
            {user ? (
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-destructive/10"
                onClick={signOut}
              >
                <LogOut className="w-5 h-5" />
              </Button>
            ) : (
              <Link to="/auth">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover:bg-primary/10"
                >
                  <LogIn className="w-5 h-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-2xl space-y-6" onClick={handleGuestAction}>
        <div className={!user ? "pointer-events-none" : ""}>
          <ProfileHeader />
          <ProfileStats />
          <GamificationSection />
          <RoutineSection />
          <ContentTabs />
        </div>
      </main>

      {/* Fixed Create Button */}
      <Button
        size="lg"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg hover:shadow-xl neon-glow hover:scale-110 transition-all z-50 p-0"
        aria-label="Create new post"
        onClick={(e) => {
          if (!user) {
            handleGuestAction(e);
          } else {
            setCreateDialogOpen(true);
          }
        }}
      >
        <Plus className="w-6 h-6" />
      </Button>

      {/* Create Post Dialog */}
      {user && <CreatePostDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />}
      
      {/* Guest Signup Dialog */}
      <GuestSignupDialog open={guestSignupOpen} onOpenChange={setGuestSignupOpen} />
    </div>
  );
};

export default Profile;
