import { useState } from "react";
import { useShop } from "@/contexts/ShopContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Check, Plus, Minus, ShieldCheck, Award, Truck, Heart, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import shopHero from "@/assets/shop-hero.jpg";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GenerationsCollection } from "@/components/GenerationsCollection";
import { ScentQuiz } from "@/components/ScentQuiz";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ParentGuideBanner } from "@/components/ParentGuideBanner";

const Shop = () => {
  const { products, addToCart, setSelectedProduct, setIsModalOpen, selectedProduct, isModalOpen } = useShop();
  const [modalQuantity, setModalQuantity] = useState(1);
  const [quizOpen, setQuizOpen] = useState(false);

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
      <Header />
      <ParentGuideBanner />
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

      {/* Mission Statement Section */}
      <section className="py-12 bg-muted text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold mb-6 text-foreground">
            Not Sure Where to Start?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Take our quick 2-minute quiz to discover your ideal signature scent based on your lifestyle, preferences, and occasions. Get personalized product recommendations instantly.
          </p>
          <Button
            onClick={() => setQuizOpen(true)}
            size="lg"
            className="bg-gold text-gold-foreground hover:bg-gold/90 h-14 px-8 text-lg"
          >
            <Compass className="w-5 h-5 mr-2" />
            Find Your Signature Scent
          </Button>
        </div>
      </section>

      {/* The Generations Collection - Tabbed Interface */}
      <GenerationsCollection />

      {/* Scent Discovery Quiz Modal */}
      <ScentQuiz open={quizOpen} onOpenChange={setQuizOpen} />

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

                {/* Product Badges */}
                {selectedProduct.badges && selectedProduct.badges.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedProduct.badges.map((badge, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold text-gold text-[11px] font-semibold uppercase tracking-wider transition-colors hover:bg-gold hover:text-primary-foreground"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}

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

      <Footer />
    </div>
  );
};

export default Shop;