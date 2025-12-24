import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ShoppingCart, Heart, Share2, Star, Check, ChevronRight, Minus, Plus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useShop } from "@/contexts/ShopContext";
import { toast } from "sonner";
import { fetchCollectionProducts, ShopifyProduct } from "@/lib/shopify";
import { useCanonical } from "@/hooks/useCanonical";
import DOMPurify from "dompurify";

const ProductDetail = () => {
  useCanonical();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useShop();
  
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    async function loadProduct() {
      if (!slug) return;
      
      try {
        setIsLoading(true);
        const products = await fetchCollectionProducts('essence-collection');
        const foundProduct = products.find(p => p.node.handle === slug);
        
        if (foundProduct) {
          setProduct(foundProduct);
          // Set first available variant as default
          if (foundProduct.node.variants.edges.length > 0) {
            setSelectedVariant(foundProduct.node.variants.edges[0].node.id);
          }
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadProduct();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Loading product...</p>
        </div>
      </div>
    );
  }

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

  const selectedVariantData = product.node.variants.edges.find(v => v.node.id === selectedVariant)?.node;
  const currentPrice = selectedVariantData ? parseFloat(selectedVariantData.price.amount) : 0;
  const imageUrl = product.node.images.edges[selectedImageIndex]?.node.url || product.node.images.edges[0]?.node.url || '/placeholder.svg';

  const handleAddToCart = () => {
    if (!selectedVariantData) return;
    
    const productForCart: any = {
      id: product.node.id,
      name: product.node.title,
      ageGroup: "Essence Collection",
      ageRange: "All Ages",
      category: "Cologne Balms",
      pillar: "Premium Fragrance",
      price: currentPrice,
      compareAtPrice: null,
      image: imageUrl,
      shortDescription: product.node.description.substring(0, 100),
      fullDescription: product.node.description,
      howToUse: ["Apply to pulse points"],
      stock: selectedVariantData.availableForSale ? 50 : 0,
      featured: false,
      quantity: quantity
    };
    
    addToCart(productForCart, quantity);
    toast.success(`Added ${product.node.title} to cart!`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.node.title,
        text: product.node.description.substring(0, 100),
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
          <span className="text-foreground">{product.node.title}</span>
        </div>
      </div>

      {/* Hero Section - Product Details */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Image Gallery */}
          <div>
            <div 
              className="aspect-square rounded-lg mb-4 overflow-hidden relative group bg-muted"
            >
              <img 
                src={imageUrl} 
                alt={`${product.node.title} - Premium fragrance product from the Poised Gentlemen Essence Collection`}
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
            {product.node.images.edges.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.node.images.edges.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIndex(i)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === i
                        ? "border-gold ring-2 ring-gold/30"
                        : "border-transparent hover:border-gold/50"
                    }`}
                  >
                    <img 
                      src={img.node.url} 
                      alt={img.node.altText || `${product.node.title} view ${i + 1}`} 
                      className="w-full h-full object-cover" 
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Info */}
          <div>
            <Badge className="mb-4 bg-gold/15 text-gold border-gold hover:bg-gold/20">
              ESSENCE COLLECTION
            </Badge>
            
            <h1 className="text-4xl font-bold mb-4 text-foreground">{product.node.title}</h1>
            
            <div 
              className="text-xl text-muted-foreground mb-6 prose prose-lg max-w-none prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-li:text-muted-foreground"
              dangerouslySetInnerHTML={{ 
                __html: DOMPurify.sanitize(product.node.descriptionHtml || product.node.description) 
              }} 
            />

            {/* Variant Selector */}
            {product.node.variants.edges.length > 1 && (
              <div className="border-t border-b border-border py-6 mb-6">
                <label className="block text-sm font-medium mb-2">Select Option</label>
                <div className="flex flex-wrap gap-3">
                  {product.node.variants.edges.map((variant) => (
                    <button
                      key={variant.node.id}
                      onClick={() => setSelectedVariant(variant.node.id)}
                      disabled={!variant.node.availableForSale}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        selectedVariant === variant.node.id
                          ? "border-gold bg-gold/10"
                          : "border-border hover:border-gold/50"
                      } ${!variant.node.availableForSale ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <div className="font-medium">{variant.node.title}</div>
                      <div className="text-sm text-muted-foreground">
                        ${parseFloat(variant.node.price.amount).toFixed(2)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price Display */}
            <div className="text-3xl font-bold mb-6">
              ${currentPrice.toFixed(2)}
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
            <div className="w-full">
              <Button 
                onClick={handleAddToCart}
                className="w-full whitespace-nowrap text-center mb-4 h-14 text-lg"
                variant="hero"
                disabled={!selectedVariantData?.availableForSale}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {selectedVariantData?.availableForSale ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>

            {/* Share Button */}
            <div className="w-full">
              <Button
                onClick={handleShare}
                variant="outline"
                className="w-full whitespace-nowrap text-center mb-6"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>

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


      {/* The Poised Difference */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">The Poised Difference</h2>
            <p className="text-lg leading-relaxed mb-8 opacity-90">
              Every Essence Collection cologne balm combines designer-inspired fragrances with therapeutic skincare. Made with organic shea butter, mango butter, and vitamin E for deep hydration and lasting scent.
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
                <p>• {product.node.variants.edges.length} variant{product.node.variants.edges.length > 1 ? 's' : ''} available</p>
                <p>• Cruelty-free & paraben-free formula</p>
                <p>• Made in USA with premium ingredients</p>
                <p>• Part of the Essence Collection</p>
                <p>• Long-lasting fragrance (4-6 hours)</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="ingredients">
              <AccordionTrigger className="text-lg font-bold">Description</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <div 
                  className="leading-relaxed prose max-w-none prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-li:text-muted-foreground"
                  dangerouslySetInnerHTML={{ 
                    __html: DOMPurify.sanitize(product.node.descriptionHtml || product.node.description) 
                  }} 
                />
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

      <Footer />
    </div>
  );
};

export default ProductDetail;
