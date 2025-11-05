import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, UserMinus } from "lucide-react";

const FollowersList = () => {
  const followers = [
    { id: 1, name: "Sarah Chen", username: "@sarahc", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah", following: false },
    { id: 2, name: "Mike Johnson", username: "@mikej", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike", following: true },
    { id: 3, name: "Emma Wilson", username: "@emmaw", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma", following: false },
    { id: 4, name: "David Lee", username: "@davidl", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david", following: true },
    { id: 5, name: "Lisa Anderson", username: "@lisaa", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa", following: false },
  ];

  const following = followers.filter(f => f.following);
  const notFollowing = followers.filter(f => !f.following);

  const UserCard = ({ user }: { user: typeof followers[0] }) => (
    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors group">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent p-0.5">
        <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden">
          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm truncate">{user.name}</p>
        <p className="text-xs text-muted-foreground truncate">{user.username}</p>
      </div>
      <Button
        size="sm"
        variant={user.following ? "secondary" : "default"}
        className={user.following ? "" : "bg-gradient-to-r from-primary to-accent hover:opacity-90"}
      >
        {user.following ? (
          <>
            <UserMinus className="w-3 h-3 mr-1" />
            Following
          </>
        ) : (
          <>
            <UserPlus className="w-3 h-3 mr-1" />
            Follow
          </>
        )}
      </Button>
    </div>
  );

  return (
    <div className="glass-card p-6 rounded-2xl">
      <Tabs defaultValue="followers" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="followers">Followers</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>
        
        <TabsContent value="followers" className="mt-0">
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-2">
              {followers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="following" className="mt-0">
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-2">
              {following.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FollowersList;
