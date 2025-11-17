import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAllProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Footer from "@/components/Footer";

const ShopifyShop = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts(250);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: ShopifyProduct) => {
    const variant = product.variants.edges[0].node;
    
    addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.priceV2,
      quantity: 1,
      selectedOptions: variant.selectedOptions,
      image: product.images.edges[0]?.node.url,
    });

    toast.success(`${product.title} added to cart`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Premium Grooming Collection | Poised Gentlemen</title>
        <meta name="description" content="Discover premium grooming products designed for the modern gentleman. Quality ingredients, age-appropriate formulas aligned with the Four Pillars of masculinity." />
        <meta property="og:title" content="Premium Grooming Collection | Poised Gentlemen" />
        <meta property="og:description" content="Elevate your grooming routine with our curated selection of premium products." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/shop`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Premium Grooming Collection | Poised Gentlemen" />
        <meta name="twitter:description" content="Premium grooming products for the modern gentleman." />
        <link rel="canonical" href={`${window.location.origin}/shop`} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-navy to-navy/95 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
            Premium Grooming Collection
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-8">
            Elevate your grooming routine with our curated selection
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground mb-6">
                No products available yet. Import your Shopify products to get started.
              </p>
              <Button asChild variant="hero">
                <a 
                  href="https://poised-growth-hub-rfqhl.myshopify.com/admin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Go to Shopify Admin
                </a>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                  <Link to={`/shop/${product.handle}`}>
                    <div className="aspect-square overflow-hidden bg-muted">
                      {product.images.edges[0] ? (
                        <img
                          src={product.images.edges[0].node.url}
                          alt={product.images.edges[0].node.altText || `${product.title} - Premium grooming product from Poised Gentlemen`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          No image
                        </div>
                      )}
                    </div>
                  </Link>
                  <CardContent className="p-4">
                    <Link to={`/shop/${product.handle}`}>
                      <h3 className="font-heading font-bold text-lg mb-2 hover:text-gold transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gold">
                        ${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                      </span>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ShopifyShop;
