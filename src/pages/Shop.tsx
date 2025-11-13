import { useState } from "react";
import { useShop } from "@/contexts/ShopContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Check, Plus, Minus, ShieldCheck, Award, Truck, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import shopHero from "@/assets/shop-hero.jpg";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ageGroups = [
  { id: "all", label: "All Products" },
  { id: "Genesis-G", label: "Genesis-G", age: "0-2" },
  { id: "Big-G", label: "Big-G", age: "3-9" },
  { id: "Young-G", label: "Young-G", age: "10-17" },
  { id: "Graduate-G", label: "Graduate-G", age: "18-24" },
  { id: "Modern-G", label: "Modern-G", age: "25-34" },
  { id: "Poised-G", label: "Poised-G", age: "35-49" },
  { id: "Distinguished-G", label: "Distinguished-G", age: "50-64" },
  { id: "Legendary-G", label: "Legendary-G", age: "65+" },
];

const Shop = () => {
  const { products, addToCart, setSelectedProduct, setIsModalOpen, selectedProduct, isModalOpen } = useShop();
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [addingToCart, setAddingToCart] = useState<number | null>(null);
  const [modalQuantity, setModalQuantity] = useState(1);

  const filteredProducts = activeFilter === "all" 
    ? products 
    : products.filter(p => p.ageGroup === activeFilter || p.ageGroup === "all");

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "newest") return b.id - a.id;
    return b.featured ? 1 : -1;
  });

  const handleQuickAdd = async (product: any) => {
    setAddingToCart(product.id);
    setTimeout(() => {
      addToCart(product, 1);
      setAddingToCart(null);
    }, 500);
  };

  const handleViewDetails = (product: any) => {
    setSelectedProduct(product);
    setModalQuantity(1);
    setIsModalOpen(true);
  };

  const handleAddToCartFromModal = () => {
    if (selectedProduct) {
      addToCart(selectedProduct, modalQuantity);
      setIsModalOpen(false);
    }
  };

  const StockIndicator = ({ stock }: { stock: number }) => {
    if (stock === 0) {
      return (
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <span className="w-2 h-2 bg-muted-foreground rounded-full"></span>
          Out of Stock
        </div>
      );
    }
    
    if (stock < 5) {
      return (
        <div className="text-destructive flex items-center gap-2 text-sm">
          <span className="w-2 h-2 bg-destructive rounded-full animate-pulse"></span>
          Only {stock} left in stock!
        </div>
      );
    }
    
    return (
      <div className="text-success flex items-center gap-2 text-sm">
        <Check className="w-4 h-4" />
        In Stock
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section 
        className="relative h-[40vh] md:h-[50vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${shopHero})` }}
      >
        <div className="absolute inset-0 bg-primary/70"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4">
            Grooming for Every Stage of Your Journey
          </h1>
          <p className="text-lg md:text-xl text-white mb-8 max-w-3xl mx-auto">
            From Genesis to Legendary. Premium ingredients, age-appropriate formulas, aligned with the Four Pillars.
          </p>
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => document.getElementById('age-filters')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Shop by Age
          </Button>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-heading font-bold text-primary mb-4">
              More Than Grooming. A Daily Ritual of Discipline.
            </h3>
            <p className="text-foreground leading-relaxed mb-6">
              Every Poised Essence product is designed to support your journey through the Four Pillars. 
              When you care for your skin, you practice <strong>discipline</strong>. When you choose quality ingredients, 
              you demonstrate <strong>integrity</strong>. When you show up for yourself daily, you build <strong>strength</strong>. 
              Your grooming routine is emotional intelligence in action.
            </p>
            <Link to="/programs" className="text-gold hover:underline font-medium">
              Learn about our mentorship programs →
            </Link>
          </div>
        </div>
      </section>

      {/* Age Group Filters */}
      <section id="age-filters" className="sticky top-16 z-40 bg-background border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
            {ageGroups.map(group => (
              <button
                key={group.id}
                onClick={() => setActiveFilter(group.id)}
                className={`px-6 py-3 rounded-full font-body font-semibold whitespace-nowrap transition-all ${
                  activeFilter === group.id
                    ? 'bg-gold text-gold-foreground'
                    : 'bg-muted text-foreground hover:bg-gold/20'
                }`}
              >
                {group.label}
                {group.age && <span className="text-xs ml-1">({group.age})</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Sort & Results */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <p className="text-muted-foreground">
            Showing <strong>{sortedProducts.length}</strong> products
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-input rounded-lg px-4 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {sortedProducts.map(product => (
            <div
              key={product.id}
              className="bg-card border border-border rounded-lg overflow-hidden hover-lift"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover hover-scale"
                />
                <Badge className="absolute top-4 left-4 bg-gold/90 text-gold-foreground">
                  {product.pillar}
                </Badge>
                {product.bestseller && (
                  <Badge className="absolute top-4 right-4 bg-success text-success-foreground">
                    Bestseller
                  </Badge>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-card-foreground mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  For Ages {product.ageRange}
                </p>
                <div className="flex items-center gap-2 mb-3">
                  {product.compareAtPrice ? (
                    <>
                      <span className="text-muted-foreground line-through">
                        ${product.compareAtPrice}
                      </span>
                      <span className="text-2xl font-bold text-gold">
                        ${product.price}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        Save ${product.compareAtPrice - product.price}
                      </Badge>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-gold">
                      ${product.price}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {product.shortDescription}
                </p>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleQuickAdd(product)}
                    disabled={product.stock === 0 || addingToCart === product.id}
                  >
                    {addingToCart === product.id ? (
                      <Check className="w-4 h-4 text-success" />
                    ) : (
                      'Quick Add'
                    )}
                  </Button>
                  <Button
                    variant="link"
                    size="sm"
                    className="text-gold"
                    onClick={() => handleViewDetails(product)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-8 py-12 border-t border-border">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-10 h-10 text-gold" />
            <span className="text-muted-foreground font-medium">Cruelty-Free</span>
          </div>
          <div className="flex items-center gap-3">
            <Award className="w-10 h-10 text-gold" />
            <span className="text-muted-foreground font-medium">Premium Ingredients</span>
          </div>
          <div className="flex items-center gap-3">
            <Heart className="w-10 h-10 text-gold" />
            <span className="text-muted-foreground font-medium">Satisfaction Guaranteed</span>
          </div>
          <div className="flex items-center gap-3">
            <Truck className="w-10 h-10 text-gold" />
            <span className="text-muted-foreground font-medium">Free Shipping Over $50</span>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left: Image */}
              <div>
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full rounded-lg"
                />
              </div>

              {/* Right: Details */}
              <div>
                <Badge className="bg-gold text-gold-foreground mb-2">
                  {selectedProduct.pillar}
                </Badge>
                <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
                  {selectedProduct.name}
                </h2>
                <p className="text-muted-foreground mb-4">
                  For Ages {selectedProduct.ageRange}
                </p>

                <div className="flex items-center gap-3 mb-4">
                  {selectedProduct.compareAtPrice ? (
                    <>
                      <span className="text-muted-foreground line-through text-xl">
                        ${selectedProduct.compareAtPrice}
                      </span>
                      <span className="text-4xl font-bold text-gold">
                        ${selectedProduct.price}
                      </span>
                      <Badge variant="secondary">
                        Save ${selectedProduct.compareAtPrice - selectedProduct.price}
                      </Badge>
                    </>
                  ) : (
                    <span className="text-4xl font-bold text-gold">
                      ${selectedProduct.price}
                    </span>
                  )}
                </div>

                <StockIndicator stock={selectedProduct.stock} />

                <p className="text-foreground mt-4 mb-6">
                  {selectedProduct.fullDescription}
                </p>

                <Accordion type="single" collapsible className="mb-6">
                  <AccordionItem value="pillars">
                    <AccordionTrigger className="font-semibold">
                      How This Supports Your Journey
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">
                        {selectedProduct.pillar === 'Discipline' && 
                          "Discipline starts with daily rituals. This product makes showing up for yourself effortless. Every day, you choose consistency over convenience. That's integrity in action."}
                        {selectedProduct.pillar === 'Strength' && 
                          "True strength isn't just physical. Taking care of yourself shows mental and emotional resilience. This product supports your strength journey inside and out."}
                        {selectedProduct.pillar === 'Emotional Intelligence' && 
                          "Self-care is self-awareness. Using quality products shows you understand your worth and needs. This is emotional intelligence in practice."}
                        {selectedProduct.pillar === 'Integrity' && 
                          "Your grooming choices reflect your values. Choosing clean, quality ingredients shows character over convenience. Your word—and your routine—is your bond."}
                        {selectedProduct.pillar === 'All Four Pillars' && 
                          "This bundle embodies all Four Pillars: Discipline through daily use, Strength in self-investment, Emotional Intelligence in self-care, and Integrity in choosing quality."}
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  {selectedProduct.ingredients && (
                    <AccordionItem value="ingredients">
                      <AccordionTrigger className="font-semibold">
                        Key Ingredients
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          {selectedProduct.ingredients.map((ing, idx) => (
                            <li key={idx} className="text-muted-foreground">
                              <strong className="text-foreground">{ing.name}:</strong> {ing.benefit}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  {selectedProduct.included && (
                    <AccordionItem value="included">
                      <AccordionTrigger className="font-semibold">
                        What's Included
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-1">
                          {selectedProduct.included.map((item, idx) => (
                            <li key={idx} className="text-muted-foreground flex items-center gap-2">
                              <Check className="w-4 h-4 text-success" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  <AccordionItem value="usage">
                    <AccordionTrigger className="font-semibold">
                      How to Use
                    </AccordionTrigger>
                    <AccordionContent>
                      <ol className="space-y-2 list-decimal list-inside">
                        {selectedProduct.howToUse.map((step, idx) => (
                          <li key={idx} className="text-muted-foreground">
                            {step}
                          </li>
                        ))}
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Quantity & Add to Cart */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                      className="p-3 hover:bg-muted transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-6 py-3 font-semibold">{modalQuantity}</span>
                    <button
                      onClick={() => setModalQuantity(Math.min(selectedProduct.stock, modalQuantity + 1))}
                      className="p-3 hover:bg-muted transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <Button
                    variant="hero"
                    size="lg"
                    className="flex-1"
                    onClick={handleAddToCartFromModal}
                    disabled={selectedProduct.stock === 0}
                  >
                    Add to Cart — ${(selectedProduct.price * modalQuantity).toFixed(2)}
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground text-center">
                  Free shipping on orders $50+
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Shop;