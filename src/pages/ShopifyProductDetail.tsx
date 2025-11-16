import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-8">
          <Link to="/shop" className="text-muted-foreground hover:text-gold">
            Shop
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">{product.title}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="aspect-square rounded-lg overflow-hidden bg-muted mb-4">
              {product.images.edges[selectedImage] ? (
                <img
                  src={product.images.edges[selectedImage].node.url}
                  alt={product.images.edges[selectedImage].node.altText || product.title}
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
          <div>
            <h1 className="font-heading text-4xl font-bold mb-4">{product.title}</h1>
            <div className="text-3xl font-bold text-gold mb-6">
              ${parseFloat(selectedVariant.priceV2.amount).toFixed(2)}
            </div>

            <div className="prose prose-sm mb-8" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />

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
