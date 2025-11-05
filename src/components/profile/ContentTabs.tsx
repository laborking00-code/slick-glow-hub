import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid3x3, Bookmark, Heart } from "lucide-react";

const ContentTabs = () => {
  const mockPosts = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    image: `https://images.unsplash.com/photo-${1500000000000 + i * 100000000}?w=400&h=400&fit=crop`,
    likes: Math.floor(Math.random() * 10000),
  }));

  const PostGrid = () => (
    <div className="grid grid-cols-3 gap-1">
      {mockPosts.map((post) => (
        <button
          key={post.id}
          className="aspect-square relative group overflow-hidden rounded-lg"
        >
          <img
            src={post.image}
            alt={`Post ${post.id}`}
            className="w-full h-full object-cover transition-transform group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="flex items-center gap-2 text-white">
              <Heart className="w-5 h-5 fill-white" />
              <span className="font-semibold">{post.likes.toLocaleString()}</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="w-full grid grid-cols-3 rounded-none h-14 bg-card/50">
          <TabsTrigger value="posts" className="gap-2">
            <Grid3x3 className="w-4 h-4" />
            Posts
          </TabsTrigger>
          <TabsTrigger value="saved" className="gap-2">
            <Bookmark className="w-4 h-4" />
            Saved
          </TabsTrigger>
          <TabsTrigger value="liked" className="gap-2">
            <Heart className="w-4 h-4" />
            Liked
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts" className="p-4 mt-0">
          <PostGrid />
        </TabsContent>
        
        <TabsContent value="saved" className="p-4 mt-0">
          <PostGrid />
        </TabsContent>
        
        <TabsContent value="liked" className="p-4 mt-0">
          <PostGrid />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentTabs;
