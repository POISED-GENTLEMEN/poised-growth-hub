import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import shopHero from "@/assets/shop-hero.jpg";
import productCleanser from "@/assets/product-cleanser.jpg";
import productSerum from "@/assets/product-serum.jpg";
import productBundle from "@/assets/product-bundle.jpg";
import productMoisturizer from "@/assets/product-moisturizer.jpg";
import productSpf from "@/assets/product-spf.jpg";
import productEyeCream from "@/assets/product-eye-cream.jpg";
import productBeardOil from "@/assets/product-beard-oil.jpg";

type AgeGroup = "all" | "genesis" | "modern" | "poised" | "legendary";

interface Product {
  id: string;
  name: string;
  ageGroup: AgeGroup;
  ageRange: string;
  price: number;
  originalPrice?: number;
  description: string;
  pillarConnection: string;
  image: string;
  features: string[];
}

const products: Product[] = [
  {
    id: "genesis-cleanser",
    name: "Genesis-G Hydrating Cleanser",
    ageGroup: "genesis",
    ageRange: "Ages 18-24",
    price: 24,
    description: "Gentle daily cleanser for young men building their foundation.",
    pillarConnection: "DISCIPLINE: Start your day with intentional self-care. Build the habit early.",
    image: productCleanser,
    features: ["Oil control", "Fights acne", "Refreshing formula", "Non-drying"]
  },
  {
    id: "genesis-moisturizer",
    name: "Genesis-G Daily Moisturizer",
    ageGroup: "genesis",
    ageRange: "Ages 18-24",
    price: 26,
    description: "Lightweight hydration that won't clog pores.",
    pillarConnection: "INTEGRITY: Choose quality over shortcuts. Your skin deserves better than drugstore basics.",
    image: productMoisturizer,
    features: ["Oil-free", "SPF 15", "Mattifying", "Quick-absorbing"]
  },
  {
    id: "modern-cleanser",
    name: "Modern-G Hydrating Cleanser",
    ageGroup: "modern",
    ageRange: "Ages 25-34",
    price: 28,
    description: "For men building careers and character. Your skin tells your story.",
    pillarConnection: "STRENGTH: Resilience starts with preparation. Protect what you're building.",
    image: productCleanser,
    features: ["Deep cleansing", "Anti-pollution", "Balancing", "Vitamin-enriched"]
  },
  {
    id: "modern-serum",
    name: "Modern-G Vitamin C Serum",
    ageGroup: "modern",
    ageRange: "Ages 25-34",
    price: 42,
    description: "Brighten, protect, and energize. Show up as your best self.",
    pillarConnection: "EMOTIONAL INTELLIGENCE: Self-care is self-awareness. Invest in the man you're becoming.",
    image: productSerum,
    features: ["Brightening", "Antioxidant-rich", "Even skin tone", "Morning boost"]
  },
  {
    id: "modern-spf",
    name: "Modern-G Daily Defense SPF 50",
    ageGroup: "modern",
    ageRange: "Ages 25-34",
    price: 32,
    description: "Non-negotiable protection. Daily discipline prevents future damage.",
    pillarConnection: "DISCIPLINE: Consistency compounds. Every day matters.",
    image: productSpf,
    features: ["Broad spectrum", "No white cast", "Water-resistant", "Lightweight"]
  },
  {
    id: "poised-serum",
    name: "Poised-G Anti-Aging Serum",
    ageGroup: "poised",
    ageRange: "Ages 35-49",
    price: 45,
    description: "Firms, brightens, protects. Because leadership shows on your face.",
    pillarConnection: "STRENGTH: Age with power. Wrinkles tell stories, but you control the narrative.",
    image: productSerum,
    features: ["Retinol alternative", "Firms skin", "Reduces fine lines", "Nighttime repair"]
  },
  {
    id: "poised-eye-cream",
    name: "Poised-G Eye Rescue Complex",
    ageGroup: "poised",
    ageRange: "Ages 35-49",
    price: 38,
    description: "Target fatigue, puffiness, and dark circles. Look as sharp as you feel.",
    pillarConnection: "EMOTIONAL INTELLIGENCE: Rest is strategy. Recovery is discipline. Show the world you're taking care of yourself.",
    image: productEyeCream,
    features: ["De-puffs", "Brightens dark circles", "Caffeine + peptides", "AM/PM use"]
  },
  {
    id: "legendary-serum",
    name: "Legendary-G Restore & Renew Serum",
    ageGroup: "legendary",
    ageRange: "Ages 50+",
    price: 52,
    description: "Advanced repair for men who've earned their wisdom. Honor your legacy.",
    pillarConnection: "INTEGRITY: You've built character. Now protect it. Quality over everything.",
    image: productSerum,
    features: ["Advanced peptides", "Deep hydration", "Collagen support", "Luxury formula"]
  },
  {
    id: "legendary-eye-cream",
    name: "Legendary-G Age-Defying Eye Treatment",
    ageGroup: "legendary",
    ageRange: "Ages 50+",
    price: 46,
    description: "Intensive care for eyes that have seen it all. Firm, lift, illuminate.",
    pillarConnection: "STRENGTH: Your eyes reflect your journey. Care for them with intention.",
    image: productEyeCream,
    features: ["Lifts sagging skin", "Reduces crow's feet", "Intensive moisture", "Luxury texture"]
  },
  {
    id: "beard-oil-all",
    name: "The Poised Beard Oil",
    ageGroup: "all",
    ageRange: "All Ages",
    price: 28,
    description: "Nourish, soften, and tame. For the beard that commands respect.",
    pillarConnection: "DISCIPLINE: A well-groomed beard is a daily commitment. Stay consistent.",
    image: productBeardOil,
    features: ["Natural oils", "Non-greasy", "Subtle scent", "Softens & conditions"]
  },
  {
    id: "essentials-bundle",
    name: "The Essentials Bundle",
    ageGroup: "all",
    ageRange: "Any Age",
    price: 65,
    originalPrice: 80,
    description: "Cleanser + Moisturizer + SPF. Everything you need to start strong.",
    pillarConnection: "INTEGRITY: Commit to the basics. Master the fundamentals before adding complexity.",
    image: productBundle,
    features: ["Complete routine", "Save $15", "Perfect for beginners", "Simplified skincare"]
  }
];

const ageGroups = [
  { id: "all" as AgeGroup, label: "All Products", range: "Shop Everything" },
  { id: "genesis" as AgeGroup, label: "Genesis-G", range: "Ages 18-24" },
  { id: "modern" as AgeGroup, label: "Modern-G", range: "Ages 25-34" },
  { id: "poised" as AgeGroup, label: "Poised-G", range: "Ages 35-49" },
  { id: "legendary" as AgeGroup, label: "Legendary-G", range: "Ages 50+" }
];

const Shop = () => {
  const [selectedAge, setSelectedAge] = useState<AgeGroup>("all");
  const [cart, setCart] = useState<string[]>([]);

  const filteredProducts = selectedAge === "all" 
    ? products 
    : products.filter(p => p.ageGroup === selectedAge || p.ageGroup === "all");

  const addToCart = (productId: string) => {
    setCart([...cart, productId]);
    console.log("Added to cart:", productId);
    // TODO: Client will integrate Shopify Buy Button here
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
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

      {/* Age Group Filter */}
      <section id="products" className="py-8 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {ageGroups.map(group => (
              <button
                key={group.id}
                onClick={() => setSelectedAge(group.id)}
                className={`px-6 py-3 rounded-md font-semibold transition-all ${
                  selectedAge === group.id
                    ? 'bg-gold text-primary hover:bg-gold/90'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                <div className="text-sm md:text-base">{group.label}</div>
                <div className="text-xs opacity-80">{group.range}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <Card key={product.id} className="overflow-hidden hover-lift transition-all">
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

                  <div className="bg-muted p-4 rounded-md mb-4">
                    <p className="text-xs font-semibold mb-1 text-gold">Four Pillars Connection:</p>
                    <p className="text-sm italic">{product.pillarConnection}</p>
                  </div>

                  <ul className="text-sm space-y-1 mb-6">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex gap-2">
                    <Button 
                      className="flex-1"
                      variant="default"
                      onClick={() => addToCart(product.id)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button variant="outline" className="px-4">
                      Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Balanced CTA Section */}
      <section className="py-16 md:py-20 bg-gold">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-6">
              Grooming Is Just One Piece of Your Growth
            </h2>
            <p className="text-lg text-primary mb-8">
              Premium products support your journey, but true transformation happens through mentorship, 
              coaching, and community. Explore our programs designed to help you master the Four Pillars.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/programs">
                <Button size="lg" variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Explore Programs
                </Button>
              </Link>
              <Link to="/">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Learn About The Four Pillars
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Poised Essence */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-12">
            Why Choose Poised Essence?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-heading font-bold text-xl mb-3">Age-Appropriate Formulas</h3>
              <p className="text-muted-foreground">
                Your skin's needs change over time. We meet you where you are with targeted solutions for every decade.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-heading font-bold text-xl mb-3">Premium Ingredients</h3>
              <p className="text-muted-foreground">
                Cruelty-free, paraben-free, sulfate-free. We use only high-quality ingredients that deliver results without compromise.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-heading font-bold text-xl mb-3">Mission-Driven</h3>
              <p className="text-muted-foreground">
                Every purchase supports our youth mentorship programs. When you invest in yourself, you invest in the next generation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;
