import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, X, Check, Leaf, TrendingUp, Heart, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import shopHero from "@/assets/shop-hero.jpg";
import productCleanser from "@/assets/product-cleanser.jpg";
import productSerum from "@/assets/product-serum.jpg";
import productBundle from "@/assets/product-bundle.jpg";
import productMoisturizer from "@/assets/product-moisturizer.jpg";
import productSpf from "@/assets/product-spf.jpg";
import productEyeCream from "@/assets/product-eye-cream.jpg";
import productBeardOil from "@/assets/product-beard-oil.jpg";
import productGenesisGentle from "@/assets/product-genesis-gentle.jpg";
import productBigG from "@/assets/product-big-g.jpg";
import productYoungG from "@/assets/product-young-g.jpg";
import productDistinguished from "@/assets/product-distinguished.jpg";
import productLegendaryCream from "@/assets/product-legendary-cream.jpg";

type AgeGroup = "all" | "genesis" | "big" | "young" | "graduate" | "modern" | "poised" | "distinguished" | "legendary";

interface Product {
  id: string;
  name: string;
  ageGroup: AgeGroup;
  ageRange: string;
  price: number;
  originalPrice?: number;
  description: string;
  pillarConnection: string;
  pillarBadge: string;
  image: string;
  features: string[];
  ingredients?: string[];
  howToUse?: string[];
  fullIngredients?: string;
  stock: number;
}

const products: Product[] = [
  {
    id: "genesis-gentle",
    name: "Genesis-G Gentle Care",
    ageGroup: "genesis",
    ageRange: "Ages 0-2",
    price: 22,
    description: "Ultra-gentle cleansing for delicate infant skin. Tear-free formula. The gentlest start to a lifetime of care.",
    pillarConnection: "INTEGRITY: From day one, choose quality. Your child deserves the best foundation.",
    pillarBadge: "Integrity",
    image: productGenesisGentle,
    features: ["Tear-free", "Hypoallergenic", "Pediatrician tested", "Fragrance-free"],
    ingredients: ["Chamomile Extract", "Aloe Vera", "Vitamin E"],
    howToUse: ["Apply small amount to damp skin", "Gently lather", "Rinse thoroughly with warm water", "Pat dry with soft towel"],
    fullIngredients: "Water, Glycerin, Aloe Barbadensis Leaf Juice, Chamomile Extract, Vitamin E, Natural Preservatives",
    stock: 45
  },
  {
    id: "big-g-foundation",
    name: "Big-G Foundation Builder",
    ageGroup: "big",
    ageRange: "Ages 3-9",
    price: 24,
    description: "Fun, gentle cleansing for growing boys. Builds healthy habits early. Make grooming fun, not a chore.",
    pillarConnection: "DISCIPLINE: Start the habit young. Consistency builds character.",
    pillarBadge: "Discipline",
    image: productBigG,
    features: ["Gentle formula", "Kid-friendly scent", "Easy pump bottle", "No harsh chemicals"],
    ingredients: ["Green Tea Extract", "Coconut Oil", "Shea Butter"],
    howToUse: ["Pump 1-2 times into hands", "Rub hands together", "Apply to face and neck", "Rinse well"],
    fullIngredients: "Water, Coconut Oil, Shea Butter, Green Tea Extract, Natural Fragrance, Gentle Preservatives",
    stock: 38
  },
  {
    id: "young-g-acne",
    name: "Young-G Acne Defense System",
    ageGroup: "young",
    ageRange: "Ages 10-17",
    price: 35,
    description: "Gentle yet effective. Clears breakouts while teaching grooming discipline. Clear skin starts with consistent care.",
    pillarConnection: "DISCIPLINE: Show up daily. Consistency compounds. Your skin reflects your commitment.",
    pillarBadge: "Discipline",
    image: productYoungG,
    features: ["Fights acne", "Non-drying", "Teen-approved", "Balanced formula"],
    ingredients: ["Salicylic Acid 2%", "Tea Tree Oil", "Niacinamide", "Zinc"],
    howToUse: ["Wash face morning and night", "Apply to damp skin", "Massage for 30 seconds", "Rinse and pat dry", "Follow with oil-free moisturizer"],
    fullIngredients: "Water, Salicylic Acid 2%, Tea Tree Oil, Niacinamide, Zinc Oxide, Natural Preservatives",
    stock: 3
  },
  {
    id: "graduate-cleanser",
    name: "Graduate-G Independence Cleanser",
    ageGroup: "graduate",
    ageRange: "Ages 18-24",
    price: 28,
    description: "Your first step into manhood. Build your foundation with intention. Discipline over motivation.",
    pillarConnection: "INTEGRITY: Choose quality over shortcuts. Your skin deserves better than drugstore basics.",
    pillarBadge: "Integrity",
    image: productCleanser,
    features: ["Oil control", "Fights acne", "Refreshing", "Daily use"],
    ingredients: ["Charcoal", "Glycolic Acid", "Aloe Vera"],
    howToUse: ["Wet face with warm water", "Apply dime-sized amount", "Massage in circles for 30 seconds", "Rinse thoroughly", "Pat dry"],
    fullIngredients: "Water, Activated Charcoal, Glycolic Acid, Aloe Barbadensis, Natural Preservatives",
    stock: 52
  },
  {
    id: "modern-cleanser",
    name: "Modern-G Hydrating Cleanser",
    ageGroup: "modern",
    ageRange: "Ages 25-34",
    price: 28,
    description: "Removes impurities without stripping natural oils. Ideal for daily use. Your skin tells your story—make it one of consistency.",
    pillarConnection: "STRENGTH: Resilience starts with preparation. Protect what you're building.",
    pillarBadge: "Strength",
    image: productCleanser,
    features: ["Deep cleansing", "Anti-pollution", "Balancing", "Vitamin-enriched"],
    ingredients: ["Hyaluronic Acid", "Vitamin B5", "Green Tea"],
    howToUse: ["Use morning and evening", "Apply to wet face", "Massage gently", "Rinse with cool water"],
    fullIngredients: "Water, Hyaluronic Acid, Vitamin B5, Green Tea Extract, Natural Preservatives",
    stock: 67
  },
  {
    id: "modern-serum",
    name: "Modern-G Vitamin C Serum",
    ageGroup: "modern",
    ageRange: "Ages 25-34",
    price: 42,
    description: "Brighten, protect, and energize. Show up as your best self.",
    pillarConnection: "EMOTIONAL INTELLIGENCE: Self-care is self-awareness. Invest in the man you're becoming.",
    pillarBadge: "Emotional Intelligence",
    image: productSerum,
    features: ["Brightening", "Antioxidant-rich", "Even skin tone", "Morning boost"],
    stock: 34
  },
  {
    id: "poised-serum",
    name: "Poised-G Anti-Aging Serum",
    ageGroup: "poised",
    ageRange: "Ages 35-49",
    price: 45,
    description: "Firms skin, reduces fine lines, brightens complexion. Leadership shows on your face. Protect your presence.",
    pillarConnection: "STRENGTH: Age with power. Wrinkles tell stories, but you control the narrative.",
    pillarBadge: "Strength",
    image: productSerum,
    features: ["Retinol alternative", "Firms skin", "Reduces fine lines", "Nighttime repair"],
    ingredients: ["Bakuchiol", "Peptide Complex", "Vitamin E"],
    howToUse: ["Apply at night after cleansing", "Use 2-3 drops", "Massage into face and neck", "Allow to absorb before moisturizer"],
    fullIngredients: "Water, Bakuchiol, Peptide Complex, Vitamin E, Hyaluronic Acid, Natural Preservatives",
    stock: 28
  },
  {
    id: "distinguished-cream",
    name: "Distinguished-G Wisdom Cream",
    ageGroup: "distinguished",
    ageRange: "Ages 50-64",
    price: 48,
    description: "Rich, restorative moisture for mature skin. Experience shows. Care for it with intention.",
    pillarConnection: "INTEGRITY: You've earned your wisdom. Honor it with quality care.",
    pillarBadge: "Integrity",
    image: productDistinguished,
    features: ["Deep hydration", "Firms skin", "Reduces age spots", "Luxury texture"],
    ingredients: ["Retinol", "Collagen Peptides", "Shea Butter"],
    howToUse: ["Apply morning and night", "Use on clean, dry skin", "Massage upward motions", "Focus on problem areas"],
    fullIngredients: "Water, Retinol, Collagen Peptides, Shea Butter, Vitamin C, Natural Preservatives",
    stock: 19
  },
  {
    id: "legendary-cream",
    name: "Legendary-G Age Perfection Cream",
    ageGroup: "legendary",
    ageRange: "Ages 65+",
    price: 52,
    description: "Deeply nourishing. Repairs and protects mature skin. Wisdom earned, skin cared for. Legacy looks good on you.",
    pillarConnection: "INTEGRITY: Quality at every age. Your legacy deserves the finest care.",
    pillarBadge: "Integrity",
    image: productLegendaryCream,
    features: ["Intensive repair", "Maximum moisture", "Elder excellence", "Premium formula"],
    ingredients: ["Advanced Peptides", "Ceramides", "Gold Flake Extract"],
    howToUse: ["Apply generously twice daily", "Use gentle upward strokes", "Let absorb for 2 minutes", "Layer with serum for best results"],
    fullIngredients: "Water, Advanced Peptide Complex, Ceramides, 24K Gold Extract, Hyaluronic Acid, Luxury Preservatives",
    stock: 12
  },
  {
    id: "poised-eye-cream",
    name: "Poised-G Eye Rescue Complex",
    ageGroup: "poised",
    ageRange: "Ages 35-49",
    price: 38,
    description: "Target fatigue, puffiness, and dark circles. Look as sharp as you feel.",
    pillarConnection: "EMOTIONAL INTELLIGENCE: Rest is strategy. Recovery is discipline.",
    pillarBadge: "Emotional Intelligence",
    image: productEyeCream,
    features: ["De-puffs", "Brightens dark circles", "Caffeine + peptides", "AM/PM use"],
    stock: 41
  },
  {
    id: "beard-oil-all",
    name: "The Poised Beard Oil",
    ageGroup: "all",
    ageRange: "All Ages",
    price: 28,
    description: "Nourish, soften, and tame. For the beard that commands respect.",
    pillarConnection: "DISCIPLINE: A well-groomed beard is a daily commitment. Stay consistent.",
    pillarBadge: "Discipline",
    image: productBeardOil,
    features: ["Natural oils", "Non-greasy", "Subtle scent", "Softens & conditions"],
    stock: 55
  },
  {
    id: "essentials-bundle",
    name: "The Essentials Bundle",
    ageGroup: "all",
    ageRange: "Any Age",
    price: 65,
    originalPrice: 80,
    description: "Cleanser + Moisturizer + SPF. Everything you need to start strong. Build your routine, build your discipline.",
    pillarConnection: "All Four Pillars: Commit to the basics. Master the fundamentals before adding complexity.",
    pillarBadge: "All Four Pillars",
    image: productBundle,
    features: ["Complete routine", "Save $15", "Perfect for beginners", "Simplified skincare"],
    stock: 23
  }
];

const ageGroups = [
  { id: "all" as AgeGroup, label: "All Products", range: "Shop Everything" },
  { id: "genesis" as AgeGroup, label: "Genesis-G", range: "Ages 0-2 - Gentle Start" },
  { id: "big" as AgeGroup, label: "Big-G", range: "Ages 3-9 - Foundation Building" },
  { id: "young" as AgeGroup, label: "Young-G", range: "Ages 10-17 - Coming of Age" },
  { id: "graduate" as AgeGroup, label: "Graduate-G", range: "Ages 18-24 - Independence" },
  { id: "modern" as AgeGroup, label: "Modern-G", range: "Ages 25-34 - Career & Character" },
  { id: "poised" as AgeGroup, label: "Poised-G", range: "Ages 35-49 - Leadership & Legacy" },
  { id: "distinguished" as AgeGroup, label: "Distinguished-G", range: "Ages 50-64 - Wisdom Years" },
  { id: "legendary" as AgeGroup, label: "Legendary-G", range: "Ages 65+ - Elder Excellence" }
];

const Shop = () => {
  const [selectedAge, setSelectedAge] = useState<AgeGroup>("all");
  const [cart, setCart] = useState<{ id: string; quantity: number }[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterSticky, setIsFilterSticky] = useState(false);
  const [showCartPreview, setShowCartPreview] = useState(false);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsFilterSticky(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = selectedAge === "all" 
    ? products 
    : products.filter(p => p.ageGroup === selectedAge || p.ageGroup === "all");

  const addToCart = (productId: string) => {
    setAddingToCart(productId);
    setTimeout(() => {
      const existingItem = cart.find(item => item.id === productId);
      if (existingItem) {
        setCart(cart.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      } else {
        setCart([...cart, { id: productId, quantity: 1 }]);
      }
      setAddingToCart(null);
      setShowCartPreview(true);
      setTimeout(() => setShowCartPreview(false), 3000);
      console.log("Added to cart:", productId);
      // TODO: Client will integrate Shopify Buy Button here
    }, 500);
  };

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const cartTotal = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Cart Preview Notification */}
      {showCartPreview && (
        <div className="fixed top-20 right-4 z-50 bg-success text-white px-6 py-4 rounded-lg shadow-lg animate-in slide-in-from-right">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5" />
            <span className="font-semibold">Added to cart!</span>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <section 
        className="relative h-[40vh] md:h-[50vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${shopHero})` }}
      >
        <div className="absolute inset-0 bg-primary/60"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary-foreground mb-4">
            Grooming for Every Stage of Your Journey
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground mb-6">
            From Genesis to Legendary. Premium ingredients, age-appropriate formulas, aligned with the Four Pillars.
          </p>
          <Button 
            size="lg" 
            variant="hero"
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Shop by Age
          </Button>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 md:py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="font-heading font-bold text-2xl md:text-3xl mb-6">
              More Than Grooming. A Daily Ritual of Discipline.
            </h3>
            <p className="text-lg text-muted-foreground mb-4">
              Every Poised Essence product is designed to support your journey through the Four Pillars. 
              When you care for your skin, you practice <strong>discipline</strong>. When you choose quality 
              ingredients, you demonstrate <strong>integrity</strong>. When you show up for yourself daily, 
              you build <strong>strength</strong>. Your grooming routine is <strong>emotional intelligence</strong> in action.
            </p>
            <Link to="/programs" className="text-gold hover:underline font-semibold inline-flex items-center gap-2">
              Learn about our mentorship programs →
            </Link>
          </div>
        </div>
      </section>

      {/* Age Group Filter - Sticky */}
      <section 
        id="products" 
        className={`py-8 bg-background border-b transition-all ${isFilterSticky ? 'sticky top-0 z-40 shadow-md' : ''}`}
      >
        <div className="container mx-auto px-4">
          {/* Desktop Tabs */}
          <div className="hidden lg:flex flex-wrap justify-center gap-3">
            {ageGroups.map(group => (
              <button
                key={group.id}
                onClick={() => setSelectedAge(group.id)}
                className={`px-5 py-3 rounded-md font-semibold transition-all text-sm ${
                  selectedAge === group.id
                    ? 'bg-gold text-primary hover:bg-gold/90'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                <div>{group.label}</div>
                <div className="text-xs opacity-80">{group.range}</div>
              </button>
            ))}
          </div>

          {/* Mobile Dropdown */}
          <div className="lg:hidden">
            <Select value={selectedAge} onValueChange={(value) => setSelectedAge(value as AgeGroup)}>
              <SelectTrigger className="w-full bg-background border-2 h-14 text-base font-semibold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background z-50">
                {ageGroups.map(group => (
                  <SelectItem key={group.id} value={group.id} className="text-base py-3">
                    <div>
                      <div className="font-semibold">{group.label}</div>
                      <div className="text-xs text-muted-foreground">{group.range}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <Card key={product.id} className="overflow-hidden hover-lift transition-all border-border">
                <div className="aspect-square relative overflow-hidden bg-muted">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover-scale transition-transform"
                  />
                  {product.originalPrice && (
                    <div className="absolute top-4 right-4 bg-success text-white px-3 py-1 rounded-full text-sm font-bold">
                      Save ${product.originalPrice - product.price}
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-gold/90 text-primary px-3 py-1 rounded-full text-xs font-bold">
                    {product.pillarBadge}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="text-sm text-gold font-semibold mb-2">{product.ageRange}</div>
                  <h3 className="font-heading font-bold text-xl mb-2">{product.name}</h3>
                  
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold text-gold">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{product.description}</p>

                  <div className="flex gap-2">
                    <Button 
                      className="flex-1"
                      variant="default"
                      onClick={() => addToCart(product.id)}
                      disabled={addingToCart === product.id || product.stock === 0}
                    >
                      {addingToCart === product.id ? (
                        "Adding..."
                      ) : product.stock === 0 ? (
                        "Out of Stock"
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Quick Add
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="px-4"
                      onClick={() => openProductModal(product)}
                    >
                      Details
                    </Button>
                  </div>

                  {product.stock > 0 && product.stock < 10 && (
                    <p className="text-xs text-destructive mt-2 font-semibold">
                      Limited Stock - Only {product.stock} remaining
                    </p>
                  )}
                  {product.stock >= 10 && (
                    <p className="text-xs text-success mt-2 font-semibold">In Stock</p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-muted/50 border-y">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-success" />
              <span className="font-semibold">Cruelty-Free</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-success" />
              <span className="font-semibold">Premium Ingredients</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-success" />
              <span className="font-semibold">Satisfaction Guaranteed</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-success" />
              <span className="font-semibold">Free Shipping Over $50</span>
            </div>
          </div>
        </div>
      </section>

      {/* Values & Benefits */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-12">
            Why Poised Essence?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-3">Premium Ingredients</h3>
              <p className="text-primary-foreground/90">
                We source the best. No cheap fillers, no harmful chemicals. Your skin deserves quality.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-3">Age-Appropriate Formulas</h3>
              <p className="text-primary-foreground/90">
                Your skin changes. Your routine should too. From Genesis-G to Legendary-G, we meet you where you are.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-3">Mission-Aligned</h3>
              <p className="text-primary-foreground/90">
                Every purchase supports mentorship programs for underserved boys. Groom with purpose.
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link to="/about">
              <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Learn About Our Mission
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA - Balanced */}
      <section className="py-16 md:py-20 bg-gold">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-6">
              Build Your Routine. Build Your Discipline.
            </h2>
            <p className="text-lg text-primary mb-8">
              Great grooming is just the beginning. Pair your Poised Essence routine with structured mentorship 
              or coaching to truly master the Four Pillars.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="default" 
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Continue Shopping
              </Button>
              <Link to="/programs">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full">
                  Explore Programs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background">
          {selectedProduct && (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left: Image */}
              <div className="space-y-4">
                <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-4 justify-center">
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-success" />
                    <span>Cruelty-Free</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-success" />
                    <span>Premium Quality</span>
                  </div>
                </div>
              </div>

              {/* Right: Details */}
              <div className="space-y-6">
                <div>
                  <div className="text-sm text-gold font-semibold mb-2">{selectedProduct.ageRange}</div>
                  <h2 className="font-heading font-bold text-3xl mb-4">{selectedProduct.name}</h2>
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-3xl font-bold text-gold">${selectedProduct.price}</span>
                    {selectedProduct.originalPrice && (
                      <span className="text-xl text-muted-foreground line-through">${selectedProduct.originalPrice}</span>
                    )}
                  </div>
                  <p className="text-base text-muted-foreground mb-4">{selectedProduct.description}</p>

                  {selectedProduct.stock > 0 ? (
                    <p className="text-sm font-semibold text-success mb-4">
                      {selectedProduct.stock < 10 
                        ? `Limited Stock - Only ${selectedProduct.stock} remaining` 
                        : 'In Stock'}
                    </p>
                  ) : (
                    <p className="text-sm font-semibold text-destructive mb-4">Out of Stock</p>
                  )}
                </div>

                <div className="bg-gold/10 border border-gold/30 p-4 rounded-md">
                  <p className="text-xs font-semibold mb-1 text-gold">Four Pillars Connection:</p>
                  <p className="text-sm italic">{selectedProduct.pillarConnection}</p>
                </div>

                {selectedProduct.ingredients && (
                  <div>
                    <h3 className="font-semibold mb-2">Key Ingredients:</h3>
                    <ul className="space-y-1 text-sm">
                      {selectedProduct.ingredients.map((ingredient, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5"></span>
                          <span>{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedProduct.howToUse && (
                  <div>
                    <h3 className="font-semibold mb-2">How to Use:</h3>
                    <ol className="space-y-1 text-sm list-decimal list-inside">
                      {selectedProduct.howToUse.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}

                <div className="space-y-3 pt-4 border-t">
                  <Button 
                    size="lg" 
                    className="w-full"
                    onClick={() => {
                      addToCart(selectedProduct.id);
                      setIsModalOpen(false);
                    }}
                    disabled={selectedProduct.stock === 0}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {selectedProduct.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </Button>
                  <p className="text-sm text-center text-muted-foreground">
                    Free shipping on orders over $50
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Shop;
