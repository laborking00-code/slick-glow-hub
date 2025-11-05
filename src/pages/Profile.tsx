import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileStats from "@/components/profile/ProfileStats";
import GamificationSection from "@/components/profile/GamificationSection";
import FollowersList from "@/components/profile/FollowersList";
import ContentTabs from "@/components/profile/ContentTabs";

const Profile = () => {
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
          <div className="w-10" />
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
        <ProfileHeader />
        <ProfileStats />
        <GamificationSection />
        <FollowersList />
        <ContentTabs />
      </main>
    </div>
  );
};

export default Profile;
