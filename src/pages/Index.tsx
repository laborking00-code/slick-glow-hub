import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/profile");
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-card border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-lg font-bold gradient-text">Slick Glow Hub</h1>
          <div className="flex gap-2">
            <Link to="/products">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <ShoppingBag className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <User className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="absolute inset-0 holographic opacity-10 pointer-events-none" />
        
        <div className="text-center space-y-6 relative z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-bold gradient-text animate-fade-in">
            Your Glow Up Journey
          </h1>
          <p className="text-xl text-muted-foreground animate-fade-in">
            Track routines, earn points, achieve your goals
          </p>
          <Link to="/auth">
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent neon-glow">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
