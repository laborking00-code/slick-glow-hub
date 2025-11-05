import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Sparkles, Sun, Droplet } from "lucide-react";

const SkinGlowGuide = () => {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="routine" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="routine">Daily Routine</TabsTrigger>
          <TabsTrigger value="products">Product Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="routine" className="space-y-4">
          <Card className="glass-card p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Morning Routine</h3>
            </div>
            <div className="space-y-2">
              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">Step 1: Cleanser</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Use a gentle, pH-balanced cleanser. Massage onto damp skin for 60 seconds, rinse with lukewarm water.
                </p>
              </div>

              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">Step 2: Toner</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Apply hydrating toner with cotton pad or pat directly onto skin. Helps balance pH and prep for serums.
                </p>
              </div>

              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">Step 3: Vitamin C Serum</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Apply 3-4 drops to face and neck. Brightens skin, reduces hyperpigmentation, and provides antioxidant protection.
                </p>
              </div>

              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">Step 4: Moisturizer</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Use lightweight, non-comedogenic moisturizer. Lock in hydration and create protective barrier.
                </p>
              </div>

              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">Step 5: SPF 30+ Sunscreen</p>
                <p className="text-xs text-muted-foreground mt-1">
                  MOST IMPORTANT STEP! Apply generously 15 minutes before sun exposure. Reapply every 2 hours.
                </p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Droplet className="w-5 h-5 text-accent" />
              <h3 className="font-semibold">Evening Routine</h3>
            </div>
            <div className="space-y-2">
              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">Step 1: Oil Cleanser</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Remove makeup and sunscreen with oil-based cleanser. Massage for 2 minutes to break down products.
                </p>
              </div>

              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">Step 2: Water-Based Cleanser</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Follow with gentle foaming cleanser. Double cleansing ensures all impurities are removed.
                </p>
              </div>

              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">Step 3: Treatment (2-3x/week)</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Use chemical exfoliant (AHA/BHA) or retinol. Start slow to build tolerance. Never use together.
                </p>
              </div>

              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">Step 4: Hydrating Serum</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Apply hyaluronic acid or niacinamide serum. Helps with hydration and reducing inflammation.
                </p>
              </div>

              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">Step 5: Night Cream</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Use richer moisturizer at night. Skin repairs itself while you sleep, so provide extra nourishment.
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card className="glass-card p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Acne-Prone Skin</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium">Cleanser</p>
                <p className="text-xs text-muted-foreground">Look for: Salicylic Acid, Tea Tree Oil, Benzoyl Peroxide</p>
              </div>
              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium">Treatment</p>
                <p className="text-xs text-muted-foreground">Look for: Niacinamide 5-10%, Azelaic Acid, Retinoids</p>
              </div>
              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium">Moisturizer</p>
                <p className="text-xs text-muted-foreground">Look for: Oil-free, non-comedogenic, lightweight gel formulas</p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-accent" />
              <h3 className="font-semibold">Anti-Aging / Dull Skin</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium">Serum</p>
                <p className="text-xs text-muted-foreground">Look for: Vitamin C 15-20%, Retinol 0.3-1%, Peptides</p>
              </div>
              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium">Eye Cream</p>
                <p className="text-xs text-muted-foreground">Look for: Caffeine, Hyaluronic Acid, Vitamin K</p>
              </div>
              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium">Sunscreen</p>
                <p className="text-xs text-muted-foreground">Look for: Broad spectrum SPF 50, Zinc Oxide, Titanium Dioxide</p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Droplet className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Dry / Dehydrated Skin</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium">Essence/Toner</p>
                <p className="text-xs text-muted-foreground">Look for: Hyaluronic Acid, Glycerin, Ceramides</p>
              </div>
              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium">Moisturizer</p>
                <p className="text-xs text-muted-foreground">Look for: Rich creams with Shea Butter, Squalane, Ceramides</p>
              </div>
              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium">Sleeping Mask</p>
                <p className="text-xs text-muted-foreground">Look for: Overnight hydration masks 2-3x per week</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="glass-card p-4">
        <h3 className="font-semibold mb-3">Universal Tips for Glowing Skin</h3>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li>✨ Drink 8+ glasses of water daily</li>
          <li>✨ Get 7-9 hours of quality sleep</li>
          <li>✨ Change pillowcases 2x per week</li>
          <li>✨ Never sleep with makeup on</li>
          <li>✨ Eat foods rich in omega-3s and antioxidants</li>
          <li>✨ Manage stress through meditation or exercise</li>
          <li>✨ Patch test new products before full application</li>
        </ul>
      </Card>
    </div>
  );
};

export default SkinGlowGuide;