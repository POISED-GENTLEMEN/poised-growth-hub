import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ShoppingCart, Heart, Share2, Star, Check, ChevronRight, Minus, Plus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useShop } from "@/contexts/ShopContext";
import { getProductBySlug, getRelatedProducts } from "@/data/essenceProducts";
import { toast } from "sonner";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useShop();
  const product = slug ? getProductBySlug(slug) : undefined;
  
  const [selectedSize, setSelectedSize] = useState<"4oz" | "8oz">("4oz");
  const [isSubscription, setIsSubscription] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <Button onClick={() => navigate("/shop/essence-collection")}>
            Return to Essence Collection
          </Button>
        </div>
      </div>
    );
  }

  const currentPrice = selectedSize === "4oz" ? product.price4oz : product.price8oz;
  const subscriptionSavings = currentPrice * 0.15;
  const finalPrice = isSubscription ? currentPrice - subscriptionSavings : currentPrice;
  const relatedProducts = getRelatedProducts(product);

  const handleAddToCart = () => {
    const productForCart: any = {
      id: parseInt(product.id),
      name: `${product.name} - ${selectedSize}`,
      ageGroup: "Essence Collection",
      ageRange: "All Ages",
      category: "Cologne Balms",
      pillar: product.fragranceFamily,
      price: Number(finalPrice.toFixed(2)),
      compareAtPrice: isSubscription ? currentPrice : null,
      image: "/placeholder.svg",
      shortDescription: product.oneLiner,
      fullDescription: product.scentExperience,
      howToUse: [product.howToUse],
      stock: 50,
      featured: false,
      quantity: quantity
    };
    
    addToCart(productForCart, quantity);
    toast.success(`Added ${product.name} to cart!`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.oneLiner,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/shop" className="hover:text-gold transition-colors">Shop</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/shop/essence-collection" className="hover:text-gold transition-colors">Essence Collection</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      {/* Hero Section - Product Details */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Image Gallery */}
          <div>
            <div 
              className="aspect-square rounded-lg mb-4 overflow-hidden relative group"
              style={{ backgroundColor: `${product.colorCode}20` }}
            >
              <img 
                src="/placeholder.svg" 
                alt={`${product.name} cologne balm in ${product.colorName} packaging`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
              >
                <Heart className={`w-6 h-6 ${isFavorite ? 'fill-gold text-gold' : 'text-gray-400'}`} />
              </button>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i}
                  className="aspect-square rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-gold transition-colors"
                  style={{ backgroundColor: `${product.colorCode}20` }}
                >
                  <img src="/placeholder.svg" alt={`${product.name} view ${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div>
            <Badge className="mb-4 bg-gold/15 text-gold border-gold hover:bg-gold/20">
              ESSENCE COLLECTION
            </Badge>
            
            <h1 className="text-4xl font-bold mb-4 text-foreground">{product.name}</h1>
            
            <Badge 
              variant="outline" 
              className="mb-4 text-gold border-gold"
            >
              {product.fragranceFamily}
            </Badge>
            
            <p className="text-xl italic text-muted-foreground mb-6">
              {product.oneLiner}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>
              <span className="text-foreground font-medium">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>

            {/* Occasion Badges */}
            <div className="flex gap-2 mb-6">
              {product.occasions.map((occasion) => (
                <Badge key={occasion} className="bg-gold/15 text-gold border-gold hover:bg-gold/20">
                  {occasion}
                </Badge>
              ))}
            </div>

            {/* Price & Size Selector */}
            <div className="border-t border-b border-border py-6 mb-6">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Size</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setSelectedSize("4oz")}
                    className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                      selectedSize === "4oz" 
                        ? "border-gold bg-gold/10" 
                        : "border-border hover:border-gold/50"
                    }`}
                  >
                    <div className="font-bold">4oz</div>
                    <div className="text-sm text-muted-foreground">${product.price4oz}</div>
                  </button>
                  <button
                    onClick={() => setSelectedSize("8oz")}
                    className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                      selectedSize === "8oz" 
                        ? "border-gold bg-gold/10" 
                        : "border-border hover:border-gold/50"
                    }`}
                  >
                    <div className="font-bold">8oz</div>
                    <div className="text-sm text-muted-foreground">${product.price8oz}</div>
                  </button>
                </div>
              </div>

              {/* Subscription Toggle */}
              <div className="mb-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isSubscription}
                    onChange={(e) => setIsSubscription(e.target.checked)}
                    className="w-5 h-5 accent-gold"
                  />
                  <span className="font-medium">Subscribe & Save 15%</span>
                  {isSubscription && (
                    <Badge className="bg-gold text-white">Save ${subscriptionSavings.toFixed(2)}</Badge>
                  )}
                </label>
              </div>

              {/* Price Display */}
              <div className="text-3xl font-bold mb-4">
                ${finalPrice.toFixed(2)}
                {isSubscription && (
                  <span className="text-lg text-muted-foreground line-through ml-3">
                    ${currentPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-accent transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-6 font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-accent transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button 
              onClick={handleAddToCart}
              className="w-full mb-4 h-14 text-lg"
              variant="hero"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {isSubscription ? "Start Subscription" : "Add to Cart"}
            </Button>

            {/* Share Button */}
            <Button
              onClick={handleShare}
              variant="outline"
              className="w-full mb-6"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>

            {/* Purchase Benefits */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-gold" />
                <span>Free shipping on orders $75+</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-gold" />
                <span>30-day satisfaction guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-gold" />
                <span>Cruelty-free & paraben-free</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-gold" />
                <span>Made in USA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fragrance Profile Section */}
      <section className="bg-accent py-16">
        <div className="container mx-auto px-4">
          <div className="bg-background p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Fragrance Profile</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold mb-2">Fragrance Family</h3>
                <p className="text-muted-foreground">{product.fragranceFamily}</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Color Code</h3>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-full border-2 border-border"
                    style={{ backgroundColor: product.colorCode }}
                  />
                  <span className="text-muted-foreground">{product.colorName} ({product.colorCode})</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="border-l-4 border-gold pl-4">
                <h3 className="font-bold mb-1">Top Notes</h3>
                <p className="text-muted-foreground">{product.topNotes}</p>
              </div>
              {product.heartNotes && (
                <div className="border-l-4 border-gold pl-4">
                  <h3 className="font-bold mb-1">Heart Notes</h3>
                  <p className="text-muted-foreground">{product.heartNotes}</p>
                </div>
              )}
              <div className="border-l-4 border-gold pl-4">
                <h3 className="font-bold mb-1">Base Notes</h3>
                <p className="text-muted-foreground">{product.baseNotes}</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3">Scent Experience</h3>
              <p className="text-muted-foreground leading-relaxed">{product.scentExperience}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Best For Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Best For</h2>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          {product.bestFor.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
              <span className="text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Premium Skincare Benefits */}
      <section className="bg-accent py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Premium Skincare Benefits</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h3 className="text-xl font-bold mb-6">Key Ingredients</h3>
              <div className="space-y-4">
                {product.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-gold mt-2" />
                    <span className="text-muted-foreground">{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6">Benefits</h3>
              <div className="space-y-4">
                {product.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">How to Use</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            {product.howToUse}
          </p>
        </div>
      </section>

      {/* The Poised Difference */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">The Poised Difference</h2>
            <p className="text-lg leading-relaxed mb-8 opacity-90">
              {product.poisedDifference}
            </p>
            <Link to="/about">
              <Button variant="hero" size="lg">
                Learn About Our Four Pillars
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Product Details Accordion */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible>
            <AccordionItem value="details">
              <AccordionTrigger className="text-lg font-bold">Product Details</AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2">
                <p>• Available in 4oz and 8oz sizes</p>
                <p>• Cruelty-free & paraben-free formula</p>
                <p>• Made in USA with premium ingredients</p>
                <p>• Part of the {product.colorName} Collection</p>
                <p>• Long-lasting fragrance (4-6 hours)</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="ingredients">
              <AccordionTrigger className="text-lg font-bold">Full Ingredients</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p className="mb-4">Complete transparency in every balm:</p>
                {product.ingredients.map((ingredient, index) => (
                  <p key={index}>• {ingredient}</p>
                ))}
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="shipping">
              <AccordionTrigger className="text-lg font-bold">Shipping & Returns</AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2">
                <p>• Free shipping on orders $75+</p>
                <p>• Standard shipping: 5-7 business days</p>
                <p>• 30-day satisfaction guarantee</p>
                <p>• Easy returns and exchanges</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="care">
              <AccordionTrigger className="text-lg font-bold">Care Instructions</AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2">
                <p>• Store in cool, dry place away from direct sunlight</p>
                <p>• Shelf life: 12-18 months when properly stored</p>
                <p>• Keep lid tightly closed when not in use</p>
                <p>• For external use only</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-accent py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">You May Also Like</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link 
                  key={relatedProduct.id}
                  to={`/products/${relatedProduct.slug}`}
                  className="group"
                >
                  <div className="bg-background rounded-lg overflow-hidden border border-border hover:shadow-xl transition-all hover:-translate-y-1">
                    <div 
                      className="aspect-square relative"
                      style={{ backgroundColor: `${relatedProduct.colorCode}20` }}
                    >
                      <img 
                        src="/placeholder.svg" 
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div 
                        className="absolute top-3 left-3 w-8 h-8 rounded-full border-2 border-white"
                        style={{ backgroundColor: relatedProduct.colorCode }}
                      />
                    </div>
                    <div className="p-4">
                      <Badge variant="outline" className="mb-2 text-xs">
                        {relatedProduct.fragranceFamily}
                      </Badge>
                      <h3 className="font-bold mb-2 group-hover:text-gold transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-sm text-muted-foreground italic mb-3 line-clamp-2">
                        {relatedProduct.oneLiner}
                      </p>
                      <p className="font-bold">${relatedProduct.price4oz}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ProductDetail;
