import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Moon, Sun, Zap, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { ScentQuiz } from "@/components/ScentQuiz";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ParentGuideBanner } from "@/components/ParentGuideBanner";
import { useShop } from "@/contexts/ShopContext";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Shop = () => {
  const [quizOpen, setQuizOpen] = useState(false);
  const { products } = useShop();

  const scrollToCollections = () => {
    document.getElementById("collections")?.scrollIntoView({ behavior: "smooth" });
  };

  // Featured products from Essence Collection (first 6 products)
  const featuredProducts = products.slice(0, 6);

  const occasionCategories = [
    {
      title: "Office & Professional",
      icon: Briefcase,
      products: ["Buoyant", "Blue Harmony", "First Impression", "Urban Wisdom"],
      link: "/shop/essence-collection?filter=office",
    },
    {
      title: "Date Night & Evening",
      icon: Moon,
      products: ["Vigaros", "Seven Figures", "Poised Sauvage", "JSP"],
      link: "/shop/essence-collection?filter=date-night",
    },
    {
      title: "Weekend & Casual",
      icon: Sun,
      products: ["Light Breeze", "Admiral's Odyssey", "Fighting Trim"],
      link: "/shop/essence-collection?filter=weekend",
    },
    {
      title: "Athletic & Active",
      icon: Zap,
      products: ["Fighting Trim", "Admiral's Odyssey"],
      link: "/shop/essence-collection?filter=athletic",
    },
  ];

  const testimonials = [
    {
      rating: 5,
      quote: "Blue Harmony has become my signature scent. Professional yet inviting - perfect for the office.",
      name: "Marcus J.",
      age: 34,
      location: "Atlanta, GA",
      product: "Blue Harmony",
    },
    {
      rating: 5,
      quote: "The cologne balm format is genius. My skin feels amazing and the scent lasts all day.",
      name: "David R.",
      age: 28,
      location: "Chicago, IL",
      product: "Vigaros",
    },
    {
      rating: 5,
      quote: "Finally found a grooming brand that understands what modern men need. Quality and purpose.",
      name: "James T.",
      age: 42,
      location: "Houston, TX",
      product: "First Impression",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <ParentGuideBanner />

      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[#C1A36C]"></div>
        <div className="relative z-10 text-center px-4 py-[60px]">
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">The Poised Gentlemen Shop</h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Premium grooming essentials for the modern gentleman
          </p>
          <Button variant="hero" size="lg" onClick={scrollToCollections}>
            Explore Collections ↓
          </Button>
        </div>
      </section>

      {/* Collection Cards Section */}
      <section id="collections" className="py-20 px-4 md:px-8 bg-background">
        <div className="container mx-auto">
          <h2 className="text-4xl font-heading font-bold text-primary text-center mb-12">Explore Our Collections</h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Essence Collection Card */}
            <Link
              to="/shop/essence-collection"
              className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-[#C1A36C]"></div>
              <div className="relative z-10 p-12 md:p-16 min-h-[500px] flex flex-col justify-between">
                <div>
                  <Badge className="mb-4 bg-[#C1A36C] text-primary border-0">12 SIGNATURE FRAGRANCES</Badge>
                  <h3 className="text-4xl font-heading font-bold text-white mb-4">Essence Collection</h3>
                  <p className="text-white/90 text-lg mb-6">
                    Designer-inspired cologne balms that combine lasting fragrance with therapeutic skincare. Find your
                    signature scent across 12 unique profiles.
                  </p>
                  <div className="space-y-2 mb-8">
                    <div className="flex items-center gap-2 text-white">
                      <span className="text-[#C1A36C]">✓</span>
                      <span>4-6 hours lasting scent</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <span className="text-[#C1A36C]">✓</span>
                      <span>Deep hydration with organic ingredients</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <span className="text-[#C1A36C]">✓</span>
                      <span>Designer-inspired fragrances</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button className="w-full bg-[#C1A36C] text-primary hover:bg-[#C1A36C]/90 font-semibold transition-transform group-hover:scale-105">
                    Shop Essence Collection
                  </Button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setQuizOpen(true);
                    }}
                    className="w-full text-white hover:text-[#C1A36C] transition-colors text-center"
                  >
                    Take Scent Quiz →
                  </button>
                </div>
              </div>
            </Link>

            {/* Generations Collection Card */}
            <div className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-[#5C4B3A] via-[#8B7355] to-[#A0826D]"></div>
              <div className="relative z-10 p-12 md:p-16 min-h-[500px] flex flex-col justify-between">
                <div>
                  <Badge className="mb-4 bg-[#C1A36C] text-primary border-0">COMING SOON</Badge>
                  <h3 className="text-4xl font-heading font-bold text-white mb-4">Generations Collection</h3>
                  <p className="text-white/90 text-lg mb-6">
                    Heritage grooming products designed for father-son bonding and building legacy. Premium tools and
                    experiences for teaching the next generation.
                  </p>
                  <div className="space-y-2 mb-8">
                    <div className="flex items-center gap-2 text-white">
                      <span className="text-[#C1A36C]">✓</span>
                      <span>Heritage shaving tools</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <span className="text-[#C1A36C]">✓</span>
                      <span>Father-son gift sets</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <span className="text-[#C1A36C]">✓</span>
                      <span>Mentorship resources</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button size="lg" className="bg-gold hover:bg-gold/90 text-navy font-semibold px-8" asChild>
                    <a
                      href="https://manage.kmail-lists.com/subscriptions/subscribe?a=WGTZM9&g=WXDprR"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Join Waitlist
                    </a>
                  </Button>
                  <Link
                    to="/programs"
                    className="block w-full text-white hover:text-[#C1A36C] transition-colors text-center"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Occasion Section */}
      <section className="py-20 px-4 md:px-8 bg-[#F9F7F4]">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary text-center mb-12">
            Shop by Occasion
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {occasionCategories.map((category, idx) => (
              <Link
                key={idx}
                to={category.link}
                className="group bg-background border border-border rounded-lg p-6 transition-all duration-300 hover:border-[#C1A36C] hover:shadow-lg hover:-translate-y-1"
              >
                <category.icon className="w-12 h-12 text-[#C1A36C] mb-4" />
                <h3 className="text-xl font-heading font-bold text-primary mb-3">{category.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{category.products.join(", ")}</p>
                <span className="text-[#C1A36C] group-hover:underline">
                  Shop {category.title.split("&")[0].trim()} Scents →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 px-4 md:px-8 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary text-center mb-12">
            Bestsellers from Essence Collection
          </h2>

          <Carousel className="max-w-6xl mx-auto">
            <CarouselContent>
              {featuredProducts.map((product) => (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                  <Link to={`/products/${product.id}`} className="block group">
                    <div className="bg-background border border-border rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                      <div className="relative aspect-square mb-4 bg-muted rounded-md overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="flex gap-2 mb-3">
                        {product.badges?.slice(0, 2).map((badge, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs bg-[#C1A36C]/10 text-[#C1A36C] border-[#C1A36C]/20"
                          >
                            {badge}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="text-xl font-heading font-bold text-primary mb-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                      <p className="text-sm italic text-foreground mb-3 line-clamp-2">{product.shortDescription}</p>
                      <p className="text-lg font-bold text-primary mb-4">${product.price}</p>
                      <Button className="w-full bg-[#C1A36C] text-primary hover:bg-[#C1A36C]/90">View Details</Button>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>

      {/* Quiz CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-primary text-white text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Not Sure Which Scent is Right for You?</h2>
          <p className="text-lg text-white/90 mb-8">Take our 2-minute scent quiz for personalized recommendations</p>
          <Button
            size="lg"
            className="bg-[#C1A36C] text-primary hover:bg-[#C1A36C]/90 font-semibold"
            onClick={() => setQuizOpen(true)}
          >
            Take Scent Quiz
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 md:px-8 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary text-center mb-12">
            What Gentlemen Are Saying
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-muted rounded-lg p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#C1A36C] text-[#C1A36C]" />
                  ))}
                </div>
                <p className="text-foreground italic mb-6">"{testimonial.quote}"</p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-primary">
                    {testimonial.name}, {testimonial.age}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">{testimonial.location}</p>
                  <p className="text-sm text-[#C1A36C]">Using: {testimonial.product}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-4 md:px-8 bg-primary text-white text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8">Ready to Elevate Your Grooming?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#C1A36C] text-primary hover:bg-[#C1A36C]/90 font-semibold">
              <Link to="/shop/essence-collection">Shop Essence Collection</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              Join Generations Waitlist
            </Button>
          </div>
        </div>
      </section>

      {/* Scent Quiz Modal */}
      <ScentQuiz open={quizOpen} onOpenChange={setQuizOpen} />

      <Footer />
    </div>
  );
};

export default Shop;
