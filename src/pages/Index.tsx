import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="absolute inset-0 holographic opacity-10 pointer-events-none" />
      
      <div className="text-center space-y-6 relative z-10">
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
  );
};

export default Index;
