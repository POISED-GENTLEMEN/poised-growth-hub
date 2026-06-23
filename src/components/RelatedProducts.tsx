import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { essenceProducts, EssenceProduct } from "@/data/essenceProducts";
import { shopifyUrl, trackShopClick } from "@/lib/shopifyLinks";

// Map article slugs to related product slugs (must match @/data/essenceProducts).
const articleProductMap: Record<string, string[]> = {
  // Acne / grooming posts — no Essence match for the "Game Changer" line,
  // so we fall back to defaults below for those.
  "teen-boy-acne-roadmap": [
    "blue-harmony-inspired-by-bleu-de-chanel",
    "first-impression-inspired-by-bleu-de-chanel",
    "admirals-odyssey-inspired-by-nautica-voyage",
  ],
  "becoming-a-poised-gentleman-essential-steps-to-refinement": [
    "blue-harmony-inspired-by-bleu-de-chanel",
    "first-impression-inspired-by-bleu-de-chanel",
    "admirals-odyssey-inspired-by-nautica-voyage",
  ],
  "becoming-poised-gentleman-essential": [
    "blue-harmony-inspired-by-bleu-de-chanel",
    "first-impression-inspired-by-bleu-de-chanel",
    "admirals-odyssey-inspired-by-nautica-voyage",
  ],
  // Emotional intelligence / confidence posts
  "modern-gentleman-guide-emotional": [
    "admirals-odyssey-inspired-by-nautica-voyage",
    "blue-harmony-inspired-by-bleu-de-chanel",
    "first-impression-inspired-by-bleu-de-chanel",
  ],
  "the-poised-gentleman-the-modern-day-stoic": [
    "admirals-odyssey-inspired-by-nautica-voyage",
    "blue-harmony-inspired-by-bleu-de-chanel",
    "vigaros-inspired-by-versace-eros",
  ],
  "forged-not-fabricated": [
    "seven-figures-inspired-by-paco-rabanne-1-million",
    "vigaros-inspired-by-versace-eros",
    "first-impression-inspired-by-bleu-de-chanel",
  ],
  "poised-modern-masculinity": [
    "blue-harmony-inspired-by-bleu-de-chanel",
    "first-impression-inspired-by-bleu-de-chanel",
    "admirals-odyssey-inspired-by-nautica-voyage",
  ],
  // Father's day / gifting
  "fathers-day-gift": [
    "seven-figures-inspired-by-paco-rabanne-1-million",
    "james-saint-patrick-jsp-inspired-by-yves-saint-laurent",
    "l-y-creed-inspired-by-creed-aventus",
  ],
};

const defaultRelatedSlugs = [
  "blue-harmony-inspired-by-bleu-de-chanel",
  "first-impression-inspired-by-bleu-de-chanel",
  "vigaros-inspired-by-versace-eros",
];

interface RelatedProductsProps {
  articleSlug: string;
}

export const RelatedProducts = ({ articleSlug }: RelatedProductsProps) => {
  const slugs = articleProductMap[articleSlug] || defaultRelatedSlugs;
  const relatedProducts: EssenceProduct[] = slugs
    .map((s) => essenceProducts.find((p) => p.slug === s))
    .filter((p): p is EssenceProduct => p !== undefined)
    .slice(0, 3);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-border">
      <h2 className="text-2xl font-heading font-bold text-primary mb-2">Related Products</h2>
      <p className="text-muted-foreground mb-8">Explore products that complement this article</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {relatedProducts.map((product) => {
          const url = shopifyUrl(`/products/${product.slug}`, "codex_related_product");
          return (
            <div
              key={product.id}
              className="bg-background border border-border rounded-lg overflow-hidden transition-all duration-300 hover:border-[#C1A36C] hover:shadow-lg group"
            >
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackShopClick("codex_related_product", url)}
                className="block"
              >
                <div
                  className="aspect-square flex items-center justify-center"
                  style={{ backgroundColor: product.colorCode }}
                  aria-hidden
                >
                  <span className="text-white text-3xl font-heading font-bold tracking-wide drop-shadow">
                    {product.name}
                  </span>
                </div>
              </a>

              <div className="p-4">
                <div className="flex gap-2 mb-2">
                  <Badge
                    variant="outline"
                    className="text-xs bg-[#C1A36C]/10 text-[#C1A36C] border-[#C1A36C]/20"
                  >
                    {product.fragranceFamily}
                  </Badge>
                </div>

                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackShopClick("codex_related_product", url)}
                >
                  <h3 className="font-heading font-bold text-primary mb-1 hover:text-[#C1A36C] transition-colors">
                    {product.name}
                  </h3>
                </a>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {product.oneLiner}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">${product.price4oz}</span>
                  <Button
                    asChild
                    size="sm"
                    className="bg-[#C1A36C] text-primary hover:bg-[#C1A36C]/90"
                  >
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackShopClick("codex_related_product", url)}
                    >
                      Shop
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <Link to="/shop/">
          <Button variant="outline" className="border-[#C1A36C] text-[#C1A36C] hover:bg-[#C1A36C] hover:text-primary">
            View All Products
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default RelatedProducts;
