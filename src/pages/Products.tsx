import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Star, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  achievement_type: string | null;
  featured: boolean;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchProducts();
  }, [user, navigate]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("featured", { ascending: false })
        .order("price", { ascending: true });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: "all", label: "All Products" },
    { value: "fitness", label: "Fitness" },
    { value: "skincare", label: "Skincare" },
    { value: "nutrition", label: "Nutrition" },
    { value: "career", label: "Career" },
  ];

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const featuredProducts = products.filter(p => p.featured);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 holographic opacity-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Premium Glow Up Guides
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional PDF guides to accelerate your transformation journey
          </p>
        </div>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold">Featured Guides</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredProducts.map((product) => (
                <Card key={product.id} className="glass-card p-4 border-primary/50 hover:border-primary transition-all">
                  <Badge className="mb-2">Featured</Badge>
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">
                      ${product.price}
                    </span>
                    <Button size="sm" className="neon-glow">
                      <ShoppingBag className="w-4 h-4 mr-1" />
                      Buy Now
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Products with Category Filter */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5" />
            <TabsList className="glass-card">
              {categories.map((cat) => (
                <TabsTrigger key={cat.value} value={cat.value}>
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((cat) => (
            <TabsContent key={cat.value} value={cat.value} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="glass-card p-6 hover:border-primary/50 transition-all">
                    <div className="mb-4">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline">{product.category}</Badge>
                        {product.featured && (
                          <Badge className="bg-primary">Featured</Badge>
                        )}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {product.description}
                      </p>
                    </div>

                    <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        📄 Comprehensive PDF guide
                      </div>
                      <div className="flex items-center gap-2">
                        ✅ Lifetime access
                      </div>
                      <div className="flex items-center gap-2">
                        🎯 Personalized strategies
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-border">
                      <span className="text-3xl font-bold text-primary">
                        ${product.price}
                      </span>
                      <Button className="neon-glow">
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Purchase
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Guarantee Section */}
        <Card className="glass-card p-6 mt-12 border-primary/30">
          <h3 className="text-xl font-bold mb-4 text-center">Our Guarantee</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div className="text-center">
              <p className="font-semibold text-foreground mb-1">Instant Access</p>
              <p>Download immediately after purchase</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-foreground mb-1">Expert Crafted</p>
              <p>Created by industry professionals</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-foreground mb-1">Lifetime Updates</p>
              <p>Get all future updates for free</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Products;
