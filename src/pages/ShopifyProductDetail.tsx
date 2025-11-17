import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getProductByHandle, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Loader2, ChevronLeft, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import Footer from "@/components/Footer";

const ShopifyProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantId, setSelectedVariantId] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!handle) return;
      
      try {
        const data = await getProductByHandle(handle);
        setProduct(data);
        if (data && data.variants.edges.length > 0) {
          setSelectedVariantId(data.variants.edges[0].node.id);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button asChild variant="hero">
            <Link to="/shop">Back to Shop</Link>
          </Button>
        </div>
      </div>
    );
  }

  const selectedVariant = product.variants.edges.find(
    edge => edge.node.id === selectedVariantId
  )?.node || product.variants.edges[0].node;

  const handleAddToCart = () => {
    addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.priceV2,
      quantity,
      selectedOptions: selectedVariant.selectedOptions,
      image: product.images.edges[selectedImage]?.node.url,
    });

    toast.success(`${product.title} added to cart`);
  };

  // Generate SEO-optimized content
  const metaTitle = `${product.title} | Premium Grooming by Poised Gentlemen`;
  const metaDescription = product.description 
    ? `${product.description.slice(0, 155)}...` 
    : `Shop ${product.title} - Premium grooming product designed for the modern gentleman. Quality ingredients, purposeful formulation.`;
  
  const productPrice = selectedVariant?.priceV2.amount || product.priceRange.minVariantPrice.amount;
  const currencyCode = selectedVariant?.priceV2.currencyCode || product.priceRange.minVariantPrice.currencyCode;

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": product.description,
    "image": product.images.edges.map(edge => edge.node.url),
    "brand": {
      "@type": "Brand",
      "name": "Poised Gentlemen"
    },
    "offers": {
      "@type": "Offer",
      "price": productPrice,
      "priceCurrency": currencyCode,
      "availability": selectedVariant?.availableForSale ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "url": `${window.location.origin}/shop/${product.handle}`
    }
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`${window.location.origin}/shop/${product.handle}`} />
        {product.images.edges[0] && (
          <meta property="og:image" content={product.images.edges[0].node.url} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        {product.images.edges[0] && (
          <meta name="twitter:image" content={product.images.edges[0].node.url} />
        )}
        <link rel="canonical" href={`${window.location.origin}/shop/${product.handle}`} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8" aria-label="Breadcrumb">
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link to="/shop" className="text-muted-foreground hover:text-foreground">
            Shop
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">{product.title}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="aspect-square rounded-lg overflow-hidden bg-muted mb-4">
              {product.images.edges[selectedImage] ? (
                <img
                  src={product.images.edges[selectedImage].node.url}
                  alt={product.images.edges[selectedImage].node.altText || `${product.title} - Premium grooming product for the modern gentleman`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No image
                </div>
              )}
            </div>
            {product.images.edges.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.edges.map((edge, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-gold' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={edge.node.url}
                      alt={edge.node.altText || `${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3">
                {product.title}
              </h1>
              <div 
                className="text-lg text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gold">
                {currencyCode === 'USD' ? '$' : currencyCode}{parseFloat(productPrice).toFixed(2)}
              </span>
              {!selectedVariant?.availableForSale && (
                <span className="text-sm text-destructive font-semibold">Out of Stock</span>
              )}
            </div>

            {/* Variants */}
            {product.options.map((option) => (
              <div key={option.name} className="mb-6">
                <label className="block text-sm font-semibold mb-3">{option.name}</label>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value) => {
                    const variant = product.variants.edges.find(edge =>
                      edge.node.selectedOptions.some(opt => 
                        opt.name === option.name && opt.value === value
                      )
                    );
                    
                    return (
                      <Button
                        key={value}
                        variant={selectedVariantId === variant?.node.id ? "default" : "outline"}
                        onClick={() => variant && setSelectedVariantId(variant.node.id)}
                        disabled={!variant?.node.availableForSale}
                      >
                        {value}
                      </Button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3">Quantity</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button 
              size="lg" 
              className="w-full mb-4" 
              variant="hero"
              onClick={handleAddToCart}
              disabled={!selectedVariant.availableForSale}
            >
              {selectedVariant.availableForSale ? 'Add to Cart' : 'Out of Stock'}
            </Button>

            <Button asChild variant="outline" className="w-full">
              <Link to="/shop">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShopifyProductDetail;
