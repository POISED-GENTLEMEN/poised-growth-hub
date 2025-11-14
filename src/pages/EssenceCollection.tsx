import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Droplet, Heart, Shield, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const fragranceCategories = [
  { id: "all", label: "All Fragrances" },
  { id: "aquatic", label: "Aquatic & Fresh" },
  { id: "woody", label: "Woody & Earthy" },
  { id: "aromatic", label: "Aromatic & Spicy" },
  { id: "citrus", label: "Citrus & Bright" },
  { id: "oriental", label: "Oriental & Warm" },
  { id: "fresh", label: "Fresh & Green" },
];

const products = [
  {
    id: 1,
    name: "Buoyant",
    family: "Aquatic/Fresh",
    category: "aquatic",
    color: "#077DFE",
    oneLiner: "Crisp marine lift with grounded cedarwood",
    topNotes: "Marine Accord, Bergamot, Cedarwood",
    badges: ["Office Ready", "Summer"],
    bestFor: "Daily office wear, casual outings, spring & summer",
    price: "$48",
    priceRange: "$48 - $72",
    slug: "buoyant",
    image: "/src/assets/product-buoyant.jpg",
  },
  {
    id: 2,
    name: "Vigaros",
    family: "Aromatic/Spicy",
    category: "aromatic",
    color: "#4B2E5C",
    oneLiner: "Mint and green apple over a confident base",
    topNotes: "Mint, Green Apple, Lemon",
    badges: ["Date Night", "Weekend"],
    bestFor: "Date nights, clubbing, fall & winter evenings",
    price: "$48",
    priceRange: "$48 - $72",
    slug: "vigaros",
    image: "/src/assets/product-vigaros.jpg",
  },
  {
    id: 3,
    name: "Light Breeze",
    family: "Citrus/Bright",
    category: "citrus",
    color: "#D97E3A",
    oneLiner: "Citrus-bright, coast-casual energy",
    topNotes: "Mandarin, Grapefruit, Juniper",
    badges: ["Weekend", "Summer"],
    bestFor: "Summer vacations, beach outings, casual daytime",
    price: "$48",
    priceRange: "$48 - $72",
    slug: "light-breeze",
    image: "/src/assets/product-light-breeze.jpg",
  },
  {
    id: 4,
    name: "Blue Harmony",
    family: "Woody/Earthy",
    category: "woody",
    color: "#CFB040",
    oneLiner: "Sophisticated woody aromatic elegance",
    topNotes: "Grapefruit, Cedar, Sandalwood",
    badges: ["Office Ready", "Date Night"],
    bestFor: "Business meetings, formal events, all-year-round",
    price: "$48",
    priceRange: "$48 - $72",
    slug: "blue-harmony",
    image: "/src/assets/product-blue-harmony.jpg",
  },
  {
    id: 5,
    name: "Urban Wisdom",
    family: "Aromatic/Spicy",
    category: "aromatic",
    color: "#4B2E5C",
    oneLiner: "Modern aromatic daily luxury",
    topNotes: "Pear, Bergamot, Lavender",
    badges: ["Office Ready", "Summer"],
    bestFor: "Daily office wear, casual outings, spring & summer",
    price: "$48",
    priceRange: "$48 - $72",
    slug: "urban-wisdom",
    image: "/src/assets/product-urban-wisdom.jpg",
  },
  {
    id: 6,
    name: "Fighting Trim",
    family: "Fresh/Green",
    category: "fresh",
    color: "#7ED957",
    oneLiner: "Athletic citrus aromatic edge",
    topNotes: "Rosemary, Pineapple, Bergamot",
    badges: ["Weekend", "Summer"],
    bestFor: "Post-workout, sporting events, active lifestyles",
    price: "$48",
    priceRange: "$48 - $72",
    slug: "fighting-trim",
    image: "/src/assets/product-fighting-trim.jpg",
  },
  {
    id: 7,
    name: "First Impression",
    family: "Woody/Earthy",
    category: "woody",
    color: "#CFB040",
    oneLiner: "Professional woody floral authority",
    topNotes: "Violet Leaf, Mandarin, Cedarwood",
    badges: ["Office Ready", "Date Night"],
    bestFor: "Office wear, formal events, fall & winter",
    price: "$48",
    priceRange: "$48 - $72",
    slug: "first-impression",
    image: "/src/assets/product-first-impression.jpg",
  },
  {
    id: 8,
    name: "JSP",
    family: "Woody/Earthy",
    category: "woody",
    color: "#CFB040",
    oneLiner: "Sophisticated woody elegance",
    topNotes: "Bergamot, Apple, Sage",
    badges: ["Date Night", "Winter"],
    bestFor: "Formal events, romantic evenings, fall & winter",
    price: "$48",
    priceRange: "$48 - $72",
    slug: "jsp",
    image: "/src/assets/product-jsp.jpg",
  },
  {
    id: 9,
    name: "Poised Sauvage",
    family: "Aromatic/Spicy",
    category: "aromatic",
    color: "#4B2E5C",
    oneLiner: "Bold woody spicy luxury",
    topNotes: "Calabrian Bergamot, Sichuan Pepper",
    badges: ["Date Night", "Winter"],
    bestFor: "Date nights, evening events, year-round versatility",
    price: "$48",
    priceRange: "$48 - $72",
    slug: "poised-sauvage",
    image: "/src/assets/product-poised-sauvage.jpg",
  },
  {
    id: 10,
    name: "Seven Figures",
    family: "Oriental/Warm",
    category: "oriental",
    color: "#FF0707",
    oneLiner: "Charismatic woody spicy dominance",
    topNotes: "Grapefruit, Mint, Blood Mandarin",
    badges: ["Date Night", "Winter"],
    bestFor: "Clubbing, parties, date nights, fall & winter",
    price: "$48",
    priceRange: "$48 - $72",
    slug: "seven-figures",
    image: "/src/assets/product-seven-figures.jpg",
  },
  {
    id: 11,
    name: "L.Y. Creed",
    family: "Citrus/Bright",
    category: "citrus",
    color: "#D97E3A",
    oneLiner: "Premium fruity chypre success",
    topNotes: "Blackcurrant, Pineapple, Bergamot",
    badges: ["Office Ready", "Summer"],
    bestFor: "High-end events, business meetings, spring & summer",
    price: "$48",
    priceRange: "$48 - $72",
    slug: "ly-creed",
    image: "/src/assets/product-ly-creed.jpg",
  },
  {
    id: 12,
    name: "Admiral's Odyssey",
    family: "Aquatic/Fresh",
    category: "aquatic",
    color: "#077DFE",
    oneLiner: "Fresh aquatic adventure",
    topNotes: "Green Leaf, Apple, Mimosa",
    badges: ["Weekend", "Summer"],
    bestFor: "Casual daytime, sports, summer adventures",
    price: "$48",
    priceRange: "$48 - $72",
    slug: "admirals-odyssey",
    image: "/src/assets/product-admirals-odyssey.jpg",
  },
];

const EssenceCollection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const scrollToGrid = () => {
    document.getElementById("product-grid")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center bg-gradient-to-br from-[#1B2B3A] to-[#2C3E50] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto animate-fade-in">
          <Badge className="mb-4 bg-gold text-white border-0 text-xs uppercase tracking-wider">
            Essence Collection
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4">
            Poised Essence Collection
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-4">
            12 Signature Cologne Balms - Fragrance Meets Premium Skincare
          </p>
          <p className="text-base md:text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Designer-inspired fragrances combined with therapeutic body care. Each cologne balm
            delivers 4-6 hours of lasting scent plus deep hydration from organic shea butter, mango
            butter, and vitamin E.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-gold hover:bg-gold/90 text-navy font-semibold">
              Take Scent Quiz
            </Button>
            <button
              onClick={scrollToGrid}
              className="text-white hover:text-gold transition-colors font-medium flex items-center gap-2"
            >
              Shop All 12 Fragrances
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Collection Overview Section */}
      <section className="py-16 md:py-20 px-4 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
              Find Your Signature Scent
            </h2>
            <p className="text-lg text-muted-foreground">
              12 unique fragrances for every occasion, season, and presence
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {fragranceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full border-2 font-medium transition-all hover:scale-105 ${
                  selectedCategory === category.id
                    ? "bg-gold border-gold text-white"
                    : "bg-background border-gold text-navy hover:bg-gold/5"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div id="product-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-card border border-border rounded-lg p-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
              >
                {/* Product Image */}
                <div className="relative aspect-square mb-4 overflow-hidden rounded-md bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-32 h-32 rounded-full opacity-20"
                      style={{ backgroundColor: product.color }}
                    ></div>
                  </div>
                  {/* Color Badge */}
                  <div
                    className="absolute top-3 left-3 w-8 h-8 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: product.color }}
                  ></div>
                </div>

                {/* Occasion Badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {product.badges.slice(0, 2).map((badge) => (
                    <span
                      key={badge}
                      className="px-2 py-1 bg-gold/10 border border-gold/30 text-gold text-[11px] font-semibold uppercase rounded-full"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Product Info */}
                <h3 className="text-xl font-bold text-foreground mb-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{product.family}</p>
                <p className="text-sm italic text-muted-foreground mb-2 line-clamp-2">
                  "{product.oneLiner}"
                </p>
                <p className="text-xs text-muted-foreground/80 mb-3">
                  Top: {product.topNotes}
                </p>

                {/* Price */}
                <p className="text-lg font-bold text-navy mb-4">{product.priceRange}</p>

                {/* CTA Button */}
                <Link to={`/products/${product.slug}`}>
                  <Button
                    className="w-full bg-gold hover:bg-gold/90 text-navy font-semibold"
                    size="sm"
                  >
                    View Details
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Benefits Section */}
      <section className="py-20 px-4 bg-[#F9F7F4]">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy text-center mb-12">
            Why Choose Essence Collection?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Benefit 1 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Droplet className="w-12 h-12 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Designer-Inspired Fragrances</h3>
              <p className="text-muted-foreground leading-relaxed">
                Each cologne balm delivers 4-6 hours of lasting scent inspired by premium designer
                fragrances. Find your signature across 12 unique profiles.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Heart className="w-12 h-12 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Therapeutic Skincare</h3>
              <p className="text-muted-foreground leading-relaxed">
                Organic shea butter, mango butter, and vitamin E provide deep hydration and
                anti-aging benefits. Cologne and moisturizer in one premium product.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Shield className="w-12 h-12 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">USA-Made Quality</h3>
              <p className="text-muted-foreground leading-relaxed">
                Cruelty-free, paraben-free, and crafted with clean ingredients. Every balm is made
                in the USA with ethical production practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scent Quiz CTA Section */}
      <section className="py-20 px-4 bg-[#1B2B3A] text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Not Sure Which Scent is Right for You?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Take our 2-minute scent quiz and get personalized recommendations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gold hover:bg-gold/90 text-navy font-semibold">
              Take the Scent Quiz
            </Button>
          </div>
          <button
            onClick={scrollToGrid}
            className="mt-6 text-gray-300 hover:text-white transition-colors text-sm"
          >
            Or browse all 12 fragrances above ↑
          </button>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy text-center mb-12">
            Essence Collection FAQs
          </h2>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold text-navy text-left hover:text-gold">
                What makes Essence Collection cologne balms different?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Our cologne balms combine designer-inspired fragrances with therapeutic skincare.
                You get 4-6 hours of lasting scent plus deep hydration from organic shea butter,
                mango butter, and vitamin E. It's cologne and moisturizer in one premium product.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-semibold text-navy text-left hover:text-gold">
                How do I choose the right fragrance?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Take our Scent Quiz for personalized recommendations, or browse by occasion:
                Office-ready (Buoyant, Blue Harmony), Date Night (Vigaros, Seven Figures), Weekend
                (Light Breeze, Admiral's Odyssey), or Athletic (Fighting Trim).
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-semibold text-navy text-left hover:text-gold">
                What sizes are available?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Most fragrances come in 4oz ($48) and 8oz ($72) sizes. The 4oz lasts 2-3 months with
                daily use, while 8oz provides 4-6 months of daily grooming.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-semibold text-navy text-left hover:text-gold">
                Are these suitable for sensitive skin?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Yes! Our balms are formulated with skin-safe, non-irritating ingredients. They're
                paraben-free, cruelty-free, and contain soothing aloe vera. We always recommend
                patch testing if you have known sensitivities.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-4 bg-[#F9F7F4]">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-heading font-bold text-navy mb-8">
            Ready to Discover Your Signature?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={scrollToGrid}
              size="lg"
              className="bg-gold hover:bg-gold/90 text-navy font-semibold"
            >
              Shop Essence Collection
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-gold text-navy hover:bg-gold/5 font-semibold"
            >
              Take Scent Quiz
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EssenceCollection;
