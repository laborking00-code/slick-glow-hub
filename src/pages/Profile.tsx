import { Home, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileStats from "@/components/profile/ProfileStats";
import GamificationSection from "@/components/profile/GamificationSection";
import RoutineSection from "@/components/profile/RoutineSection";
import ContentTabs from "@/components/profile/ContentTabs";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

const Profile = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) return null;

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
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-destructive/10"
            onClick={signOut}
          >
            <LogOut className="w-5 h-5" />
          </Button>
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
    </div>
  );
};

export default Profile;
