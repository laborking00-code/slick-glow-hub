import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Sparkles, Sun, Droplet, ShoppingBag, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SkinGlowGuideProps {
  surveyResponses: Record<string, string>;
}

const SkinGlowGuide = ({ surveyResponses }: SkinGlowGuideProps) => {
  const { concern, skin_type, budget } = surveyResponses;

  const getRecommendedProducts = () => {
    const products = [];
    
    if (concern === 'acne') {
      products.push({
        name: 'Clear Skin System Bundle',
        description: 'Complete acne treatment kit: cleanser, toner, and spot treatment',
        price: budget === 'budget' ? '$39.99' : '$79.99',
        link: '#'
      });
      products.push({
        name: 'Salicylic Acid Serum 2%',
        description: 'Penetrates pores to clear acne and prevent breakouts',
        price: '$24.99',
        link: '#',
        featured: true
      });
    }
    
    if (concern === 'tan' || concern === 'aging') {
      products.push({
        name: 'Vitamin C Brightening Serum',
        description: 'Reduces dark spots and evens skin tone with 20% Vitamin C',
        price: '$49.99',
        link: '#',
        featured: concern === 'tan'
      });
      products.push({
        name: 'SPF 50 Mineral Sunscreen',
        description: 'Broad spectrum protection against UV damage and tanning',
        price: '$32.99',
        link: '#'
      });
    }
    
    if (concern === 'dryness') {
      products.push({
        name: 'Hyaluronic Acid Hydration Boost',
        description: 'Intense hydration serum holds 1000x its weight in water',
        price: '$36.99',
        link: '#',
        featured: true
      });
      products.push({
        name: 'Rich Moisture Barrier Cream',
        description: 'Ceramide-rich formula locks in hydration all day',
        price: '$44.99',
        link: '#'
      });
    }
    
    if (budget === 'premium') {
      products.push({
        name: 'Retinol Night Treatment 1%',
        description: 'Anti-aging powerhouse for wrinkles and texture',
        price: '$89.99',
        link: '#'
      });
    }
    
    return products;
  };

  const getPersonalizedRoutine = () => {
    const morningSteps = [
      {
        step: 'Step 1: Cleanser',
        description: skin_type === 'oily' 
          ? 'Foaming gel cleanser with salicylic acid' 
          : skin_type === 'dry'
          ? 'Cream-based gentle cleanser with ceramides'
          : 'pH-balanced gentle cleanser for all skin types',
      },
      {
        step: 'Step 2: Toner',
        description: skin_type === 'oily'
          ? 'Mattifying toner with witch hazel'
          : 'Hydrating toner with hyaluronic acid',
      },
      {
        step: 'Step 3: Treatment Serum',
        description: concern === 'acne'
          ? 'Niacinamide 10% for oil control and acne'
          : concern === 'tan' || concern === 'aging'
          ? 'Vitamin C 15-20% for brightening'
          : 'Hyaluronic acid for hydration',
      },
      {
        step: 'Step 4: Moisturizer',
        description: skin_type === 'oily'
          ? 'Oil-free gel moisturizer'
          : skin_type === 'dry'
          ? 'Rich cream with shea butter'
          : 'Lightweight lotion for combination skin',
      },
      {
        step: 'Step 5: SPF 50 Sunscreen',
        description: 'MOST IMPORTANT! Apply generously every morning',
      },
    ];

    const nightSteps = [
      {
        step: 'Step 1: Oil Cleanser',
        description: 'Remove SPF and makeup thoroughly',
      },
      {
        step: 'Step 2: Water-Based Cleanser',
        description: 'Double cleanse for deep clean',
      },
      {
        step: 'Step 3: Treatment (3x/week)',
        description: concern === 'acne'
          ? 'BHA exfoliant or retinol for acne control'
          : concern === 'aging'
          ? 'Retinol 0.5-1% for anti-aging'
          : concern === 'tan'
          ? 'AHA exfoliant for brightening'
          : 'Gentle exfoliant',
      },
      {
        step: 'Step 4: Hydrating Serum',
        description: 'Hyaluronic acid or peptide serum',
      },
      {
        step: 'Step 5: Night Cream',
        description: 'Richer moisturizer for overnight repair',
      },
    ];

    return { morningSteps, nightSteps };
  };

  const recommendedProducts = getRecommendedProducts();
  const { morningSteps, nightSteps } = getPersonalizedRoutine();

  return (
    <div className="space-y-4">
      {/* Personalized Header */}
      <Card className="glass-card p-4 border-primary/50">
        <div className="space-y-2">
          <h3 className="font-semibold flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Your Personalized Skincare Plan
          </h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Concern: {concern}</Badge>
            <Badge variant="outline">Skin Type: {skin_type}</Badge>
            <Badge variant="outline">Budget: {budget}</Badge>
          </div>
        </div>
      </Card>

      {/* Recommended Products */}
      {recommendedProducts.length > 0 && (
        <Card className="glass-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <ShoppingBag className="w-5 h-5 text-accent" />
            <h3 className="font-semibold">Recommended Products for {concern}</h3>
          </div>
          <div className="space-y-3">
            {recommendedProducts.map((product, idx) => (
              <div key={idx} className={`p-3 glass-card rounded-lg ${product.featured ? 'border-2 border-primary' : ''}`}>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-sm">{product.name}</h4>
                  <span className="text-primary font-semibold text-sm">{product.price}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{product.description}</p>
                {product.featured && (
                  <Badge className="text-xs">Best for {concern}</Badge>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      <Tabs defaultValue="routine" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="routine">Your Daily Routine</TabsTrigger>
          <TabsTrigger value="tips">Pro Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="routine" className="space-y-4">
          <Card className="glass-card p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Morning Routine</h3>
            </div>
            <div className="space-y-2">
              {morningSteps.map((item, idx) => (
                <div key={idx} className="p-3 glass-card rounded-lg">
                  <p className="font-medium text-sm">{item.step}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="glass-card p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Droplet className="w-5 h-5 text-accent" />
              <h3 className="font-semibold">Evening Routine</h3>
            </div>
            <div className="space-y-2">
              {nightSteps.map((item, idx) => (
                <div key={idx} className="p-3 glass-card rounded-lg">
                  <p className="font-medium text-sm">{item.step}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="space-y-4">
          <Card className="glass-card p-4">
            <h3 className="font-semibold mb-3">Tips for {skin_type} skin with {concern}</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              {concern === 'acne' && (
                <>
                  <li>✨ Never pop pimples - causes scarring</li>
                  <li>✨ Change pillowcases 2-3x per week</li>
                  <li>✨ Avoid touching your face throughout the day</li>
                  <li>✨ Use non-comedogenic products only</li>
                  <li>✨ Be patient - results take 6-8 weeks</li>
                </>
              )}
              {concern === 'tan' && (
                <>
                  <li>✨ Wear SPF 50 EVERY day, even indoors</li>
                  <li>✨ Reapply sunscreen every 2 hours outdoors</li>
                  <li>✨ Use Vitamin C serum in the morning</li>
                  <li>✨ Exfoliate 2-3x per week with AHA</li>
                  <li>✨ Results visible in 4-6 weeks with consistency</li>
                </>
              )}
              {concern === 'dryness' && (
                <>
                  <li>✨ Drink 8+ glasses of water daily</li>
                  <li>✨ Use a humidifier in dry climates</li>
                  <li>✨ Apply moisturizer on damp skin</li>
                  <li>✨ Avoid hot showers - use lukewarm water</li>
                  <li>✨ Use overnight sleeping masks 2-3x/week</li>
                </>
              )}
              {concern === 'aging' && (
                <>
                  <li>✨ Retinol is the gold standard - start slow</li>
                  <li>✨ SPF prevents 80% of premature aging</li>
                  <li>✨ Get 7-9 hours of quality sleep</li>
                  <li>✨ Stay hydrated for plump skin</li>
                  <li>✨ Results from retinol take 12 weeks</li>
                </>
              )}
              <li>✨ Consistency is more important than expensive products</li>
              <li>✨ Patch test all new products first</li>
            </ul>
          </Card>

          <Card className="glass-card p-4">
            <h3 className="font-semibold mb-3">Universal Skincare Tips</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>💧 Never sleep with makeup on</li>
              <li>💧 Get 7-9 hours of quality sleep</li>
              <li>💧 Manage stress through meditation/exercise</li>
              <li>💧 Eat foods rich in omega-3s and antioxidants</li>
              <li>💧 Less is more - don't over-exfoliate</li>
            </ul>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SkinGlowGuide;
