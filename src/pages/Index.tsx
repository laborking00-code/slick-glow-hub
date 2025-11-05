import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold gradient-text">Welcome!</h1>
        <p className="text-xl text-muted-foreground">Check out your profile</p>
        <Link to="/profile">
          <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
            <User className="w-5 h-5 mr-2" />
            View Profile
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
