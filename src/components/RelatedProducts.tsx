import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useShop, Product } from "@/contexts/ShopContext";

// Map article slugs to related product names
const articleProductMap: Record<string, string[]> = {
  // Acne/grooming posts
  "teen-boy-acne-roadmap": ["Game Changer", "Clear Path", "Genesis Gentle"],
  "becoming-a-poised-gentleman-essential-steps-to-refinement": ["Blue Harmony", "First Impression", "Admiral's Odyssey"],
  "becoming-poised-gentleman-essential": ["Blue Harmony", "First Impression", "Admiral's Odyssey"],
  
  // Emotional intelligence / confidence posts
  "modern-gentleman-guide-emotional": ["Admiral's Odyssey", "Blue Harmony", "First Impression"],
  "the-poised-gentleman-the-modern-day-stoic": ["Admiral's Odyssey", "Blue Harmony", "Vigaros"],
  "forged-not-fabricated": ["Seven Figures", "Vigaros", "First Impression"],
  "poised-modern-masculinity": ["Blue Harmony", "First Impression", "Admiral's Odyssey"],
  
  // Father's day / gifting
  "fathers-day-gift": ["Seven Figures", "Distinguished", "Legendary"],
};

// Default products for posts without specific mapping
const defaultRelatedProducts = ["Blue Harmony", "First Impression", "Vigaros"];

interface RelatedProductsProps {
  articleSlug: string;
}

export const RelatedProducts = ({ articleSlug }: RelatedProductsProps) => {
  const { products, addToCart } = useShop();

  // Get product names for this article
  const relatedProductNames = articleProductMap[articleSlug] || defaultRelatedProducts;

  // Find matching products (partial match on name)
  const relatedProducts = relatedProductNames
    .map(name => products.find(p => p.name.toLowerCase().includes(name.toLowerCase())))
    .filter((p): p is Product => p !== undefined)
    .slice(0, 3);

  // If we don't have enough matches, fill with featured products
  if (relatedProducts.length < 3) {
    const featuredFallbacks = products
      .filter(p => p.featured && !relatedProducts.includes(p))
      .slice(0, 3 - relatedProducts.length);
    relatedProducts.push(...featuredFallbacks);
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-12 border-t border-border">
      <h2 className="text-2xl font-heading font-bold text-primary mb-2">Related Products</h2>
      <p className="text-muted-foreground mb-8">Explore products that complement this article</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {relatedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-background border border-border rounded-lg overflow-hidden transition-all duration-300 hover:border-[#C1A36C] hover:shadow-lg group"
          >
            <Link to={`/products/${product.id}`} className="block">
              <div className="aspect-square bg-muted overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
            </Link>

            <div className="p-4">
              {product.badges && product.badges.length > 0 && (
                <div className="flex gap-2 mb-2">
                  {product.badges.slice(0, 1).map((badge, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="text-xs bg-[#C1A36C]/10 text-[#C1A36C] border-[#C1A36C]/20"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
              )}

              <Link to={`/products/${product.id}`}>
                <h3 className="font-heading font-bold text-primary mb-1 hover:text-[#C1A36C] transition-colors">
                  {product.name}
                </h3>
              </Link>

              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {product.shortDescription}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                
                <Button
                  size="sm"
                  className="bg-[#C1A36C] text-primary hover:bg-[#C1A36C]/90"
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product, 1);
                  }}
                >
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link to="/shop/essence-collection">
          <Button variant="outline" className="border-[#C1A36C] text-[#C1A36C] hover:bg-[#C1A36C] hover:text-primary">
            View All Products
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default RelatedProducts;
