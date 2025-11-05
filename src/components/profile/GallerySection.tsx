import { useState, useEffect } from "react";
import { Plus, FolderOpen, Image as ImageIcon, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface Album {
  id: string;
  title: string;
  cover_url: string | null;
  created_at: string;
}

interface GalleryItem {
  id: string;
  media_url: string;
  media_type: string;
  caption: string | null;
  album_id: string | null;
  created_at: string;
}

const GallerySection = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [showCreateAlbum, setShowCreateAlbum] = useState(false);
  const [newAlbumTitle, setNewAlbumTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadAlbums();
      loadGalleryItems();
    }
  }, [user]);

  const loadAlbums = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("albums")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading albums:", error);
      return;
    }

    setAlbums(data || []);
  };

  const loadGalleryItems = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("gallery_items")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading gallery items:", error);
      return;
    }

    setGalleryItems(data || []);
    setLoading(false);
  };

  const createAlbum = async () => {
    if (!user || !newAlbumTitle.trim()) return;

    const { error } = await supabase.from("albums").insert({
      user_id: user.id,
      title: newAlbumTitle.trim(),
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create album",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Album created successfully",
    });

    setNewAlbumTitle("");
    setShowCreateAlbum(false);
    loadAlbums();
  };

  const getAlbumItems = (albumId: string) => {
    return galleryItems.filter((item) => item.album_id === albumId);
  };

  const getUnorganizedItems = () => {
    return galleryItems.filter((item) => !item.album_id);
  };

  return (
    <div className="space-y-6">
      {/* Albums Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold gradient-text">Gallery</h2>
        <Button
          onClick={() => setShowCreateAlbum(true)}
          className="bg-gradient-to-r from-primary to-accent neon-glow"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Album
        </Button>
      </div>

      {/* Albums Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Unorganized Items */}
        {getUnorganizedItems().length > 0 && (
          <div
            className="glass-card rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setSelectedAlbum(null)}
          >
            <div className="aspect-square bg-gradient-to-br from-muted/50 to-muted/20 flex items-center justify-center">
              <FolderOpen className="w-12 h-12 text-muted-foreground" />
            </div>
            <div className="p-3">
              <p className="font-semibold">Unorganized</p>
              <p className="text-sm text-muted-foreground">
                {getUnorganizedItems().length} items
              </p>
            </div>
          </div>
        )}

        {/* Albums */}
        {albums.map((album) => {
          const items = getAlbumItems(album.id);
          const coverItem = items[0];

          return (
            <div
              key={album.id}
              className="glass-card rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setSelectedAlbum(album)}
            >
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20">
                {coverItem ? (
                  coverItem.media_type === "video" ? (
                    <video
                      src={coverItem.media_url}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={coverItem.media_url}
                      alt={album.title}
                      className="w-full h-full object-cover"
                    />
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="font-semibold truncate">{album.title}</p>
                <p className="text-sm text-muted-foreground">
                  {items.length} items
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {loading ? (
        <p className="text-center text-muted-foreground py-8">
          Loading gallery...
        </p>
      ) : albums.length === 0 && galleryItems.length === 0 ? (
        <div className="glass-card rounded-xl p-12 text-center">
          <FolderOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-medium mb-2">No albums yet</p>
          <p className="text-muted-foreground mb-6">
            Create your first album to organize your photos and videos
          </p>
          <Button
            onClick={() => setShowCreateAlbum(true)}
            className="bg-gradient-to-r from-primary to-accent neon-glow"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Album
          </Button>
        </div>
      ) : null}

      {/* Create Album Dialog */}
      <Dialog open={showCreateAlbum} onOpenChange={setShowCreateAlbum}>
        <DialogContent className="glass-card">
          <DialogHeader>
            <DialogTitle className="gradient-text">Create New Album</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="album-title">Album Title</Label>
              <Input
                id="album-title"
                value={newAlbumTitle}
                onChange={(e) => setNewAlbumTitle(e.target.value)}
                placeholder="Enter album title..."
                className="glass-card"
              />
            </div>
            <Button
              onClick={createAlbum}
              disabled={!newAlbumTitle.trim()}
              className="w-full bg-gradient-to-r from-primary to-accent neon-glow"
            >
              Create Album
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Album View Dialog */}
      {selectedAlbum && (
        <Dialog open={!!selectedAlbum} onOpenChange={() => setSelectedAlbum(null)}>
          <DialogContent className="glass-card max-w-4xl">
            <DialogHeader>
              <DialogTitle className="gradient-text">
                {selectedAlbum.title}
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[60vh]">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
                {getAlbumItems(selectedAlbum.id).map((item) => (
                  <div
                    key={item.id}
                    className="glass-card rounded-lg overflow-hidden aspect-square"
                  >
                    {item.media_type === "video" ? (
                      <video
                        src={item.media_url}
                        className="w-full h-full object-cover"
                        controls
                      />
                    ) : (
                      <img
                        src={item.media_url}
                        alt={item.caption || "Gallery item"}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default GallerySection;
