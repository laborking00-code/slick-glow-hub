import { useState, useEffect, useRef } from "react";
import { Home, Send, Search, MoreVertical, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import StartConversationDialog from "@/components/messages/StartConversationDialog";

interface Profile {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
}

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  read: boolean;
  created_at: string;
}

interface Conversation {
  profile: Profile;
  lastMessage: Message | null;
  unreadCount: number;
}

const Messages = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Profile | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showStartDialog, setShowStartDialog] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load conversations
  useEffect(() => {
    if (!user) return;

    const loadConversations = async () => {
      // Get all messages involving the current user
      const { data: allMessages, error } = await supabase
        .from("messages")
        .select("*")
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading messages:", error);
        return;
      }

      // Get unique user IDs from conversations
      const userIds = new Set<string>();
      allMessages?.forEach((msg) => {
        const otherId = msg.sender_id === user.id ? msg.receiver_id : msg.sender_id;
        userIds.add(otherId);
      });

      // Load profiles for all conversation partners
      const { data: profiles } = await supabase
        .from("profiles")
        .select("*")
        .in("id", Array.from(userIds));

      // Build conversations list
      const convos: Conversation[] = (profiles || []).map((profile) => {
        const convMessages = allMessages?.filter(
          (msg) =>
            (msg.sender_id === profile.id && msg.receiver_id === user.id) ||
            (msg.receiver_id === profile.id && msg.sender_id === user.id)
        );
        
        const unreadCount = convMessages?.filter(
          (msg) => msg.receiver_id === user.id && !msg.read
        ).length || 0;

        return {
          profile,
          lastMessage: convMessages?.[0] || null,
          unreadCount,
        };
      });

      // Sort by last message time
      convos.sort((a, b) => {
        const aTime = a.lastMessage?.created_at || "";
        const bTime = b.lastMessage?.created_at || "";
        return bTime.localeCompare(aTime);
      });

      setConversations(convos);
    };

    loadConversations();

    // Subscribe to new messages
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
        },
        () => {
          loadConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  // Load messages for selected conversation
  useEffect(() => {
    if (!user || !selectedConversation) return;

    const loadMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .or(
          `and(sender_id.eq.${user.id},receiver_id.eq.${selectedConversation.id}),and(sender_id.eq.${selectedConversation.id},receiver_id.eq.${user.id})`
        )
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error loading messages:", error);
        return;
      }

      setMessages(data || []);

      // Mark messages as read
      const unreadIds = data
        ?.filter((msg) => msg.receiver_id === user.id && !msg.read)
        .map((msg) => msg.id);

      if (unreadIds && unreadIds.length > 0) {
        await supabase
          .from("messages")
          .update({ read: true })
          .in("id", unreadIds);
      }
    };

    loadMessages();
  }, [selectedConversation, user]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !selectedConversation) return;

    const { error } = await supabase.from("messages").insert({
      sender_id: user.id,
      receiver_id: selectedConversation.id,
      content: newMessage.trim(),
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
      return;
    }

    setNewMessage("");
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.profile.display_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.profile.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <nav className="sticky top-0 z-50 glass-card border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <Home className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-bold gradient-text">Messages</h1>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-primary/10"
            onClick={() => setShowStartDialog(true)}
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        {/* Conversations Sidebar */}
        <div className="w-full md:w-80 border-r glass-card flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 glass-card"
              />
            </div>
          </div>

          <ScrollArea className="flex-1">
            {filteredConversations.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <p>No messages yet</p>
                <p className="text-sm mt-2">Start a conversation!</p>
              </div>
            ) : (
              filteredConversations.map((conv) => (
                <button
                  key={conv.profile.id}
                  onClick={() => setSelectedConversation(conv.profile)}
                  className={`w-full p-4 flex gap-3 hover:bg-accent/50 transition-colors border-b ${
                    selectedConversation?.id === conv.profile.id ? "bg-accent/30" : ""
                  }`}
                >
                  <Avatar className="w-12 h-12 border-2 border-primary/20">
                    {conv.profile.avatar_url ? (
                      <img
                        src={conv.profile.avatar_url}
                        alt={conv.profile.display_name || conv.profile.username}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/30 to-accent/30 holographic flex items-center justify-center text-xl font-bold">
                        {(conv.profile.display_name || conv.profile.username).charAt(0).toUpperCase()}
                      </div>
                    )}
                  </Avatar>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex justify-between items-baseline">
                      <p className="font-semibold truncate">
                        {conv.profile.display_name || conv.profile.username}
                      </p>
                      {conv.unreadCount > 0 && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {conv.lastMessage?.content || "No messages yet"}
                    </p>
                  </div>
                </button>
              ))
            )}
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b glass-card flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 border-2 border-primary/20">
                    {selectedConversation.avatar_url ? (
                      <img
                        src={selectedConversation.avatar_url}
                        alt={selectedConversation.display_name || selectedConversation.username}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/30 to-accent/30 holographic flex items-center justify-center font-bold">
                        {(selectedConversation.display_name || selectedConversation.username).charAt(0).toUpperCase()}
                      </div>
                    )}
                  </Avatar>
                  <div>
                    <h2 className="font-semibold">
                      {selectedConversation.display_name || selectedConversation.username}
                    </h2>
                    <p className="text-xs text-muted-foreground">@{selectedConversation.username}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => {
                    const isMe = msg.sender_id === user?.id;
                    return (
                      <div
                        key={msg.id}
                        className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                            isMe
                              ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                              : "glass-card"
                          }`}
                        >
                          <p className="break-words">{msg.content}</p>
                          <p className={`text-xs mt-1 ${isMe ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                            {new Date(msg.created_at).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t glass-card">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 glass-card"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="bg-gradient-to-r from-primary to-accent neon-glow"
                    disabled={!newMessage.trim()}
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <p className="text-xl mb-2">Select a conversation</p>
                <p className="text-sm">Choose a message to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <StartConversationDialog
        open={showStartDialog}
        onOpenChange={setShowStartDialog}
        onSelectUser={(profile) => setSelectedConversation(profile)}
      />
    </div>
  );
};

export default Messages;
