import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Target, Brain, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { newsletterSchema } from "@/lib/validations";
import { useShop } from "@/contexts/ShopContext";
import { useCanonical } from "@/hooks/useCanonical";

// Images
import heroImage from "@/assets/hero-mentorship-new.png";
import youthImage from "@/assets/youth-mentorship.jpg";
import adultImage from "@/assets/adult-coaching.jpg";

const Index = () => {
  useCanonical();

  // Add JSON-LD structured data for Organization
  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Poised Gentlemen",
      url: "https://poisedgentlemen.com",
      logo: "https://poisedgentlemen.com/favicon.ico",
      description:
        "Youth mentorship, adult coaching, and premium grooming aligned with the Four Pillars: Integrity, Strength, Emotional Intelligence, Discipline.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "New Orleans",
        addressRegion: "LA",
        addressCountry: "US",
      },
      sameAs: ["https://x.com/ThePoisedGentlemen"],
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(jsonLd);
    script.id = "organization-jsonld";
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById("organization-jsonld");
      if (existing) existing.remove();
    };
  }, []);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [errors, setErrors] = useState<{ email?: string; firstName?: string }>({});
  const { products, addToCart } = useShop();

  const featuredProducts = products
    .filter((p) => {
      const name = p.name.toLowerCase().trim();
      return name.includes("fresh") || name.includes("buoyant") || name.includes("body");
    })
    .slice(0, 3);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = newsletterSchema.safeParse({ email, firstName });

    if (!result.success) {
      const fieldErrors: { email?: string; firstName?: string } = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as "email" | "firstName"] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setEmail("");
    setFirstName("");
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* HERO */}
      <section
        className="relative min-h-[70vh] md:min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-primary/60" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Redefine Your Masculinity. Build Your Legacy.
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Principled mentorship for today's men—and those raising the next generation. Aligned with the Four Pillars.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="hero" className="w-full sm:w-auto" asChild>
              <Link to="/codex">Explore The Codex</Link>
            </Button>

            <Button size="lg" variant="hero" className="w-full sm:w-auto" asChild>
              <Link to="/programs">View Programs</Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary"
              asChild
            >
              <Link to="/shop">Shop Grooming</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* TAGLINE BAND */}
      <section className="py-6 bg-gold">
        <div className="container mx-auto px-4">
          <p className="text-center text-gold-foreground font-heading font-bold text-lg md:text-xl tracking-wide">
            Refined standards. Grounded character. Generational impact.
          </p>
        </div>
      </section>

      {/* FEEL / LOOK / BE SHARP - Now links to Codex */}
      <section className="py-20 md:py-24 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <Brain className="w-16 h-16 text-gold mb-6" strokeWidth={1.5} />
              <h3 className="text-3xl md:text-4xl font-heading text-primary-foreground mb-4">Feel Sharp</h3>
              <p className="text-base text-primary-foreground/90 mb-5 max-w-xs mx-auto">
                Emotional intelligence and internal clarity.
              </p>
              <Link to="/codex" className="text-sm font-semibold text-gold hover:underline">
                Explore EQ Resources →
              </Link>
            </div>

            <div className="flex flex-col items-center text-center">
              <Sparkles className="w-16 h-16 text-gold mb-6" strokeWidth={1.5} />
              <h3 className="text-3xl md:text-4xl font-heading text-primary-foreground mb-4">Look Sharp</h3>
              <p className="text-base text-primary-foreground/90 mb-5 max-w-xs mx-auto">
                Refined grooming and daily rituals.
              </p>
              <Link to="/codex" className="text-sm font-semibold text-gold hover:underline">
                Explore Grooming Guides →
              </Link>
            </div>

            <div className="flex flex-col items-center text-center">
              <TrendingUp className="w-16 h-16 text-gold mb-6" strokeWidth={1.5} />
              <h3 className="text-3xl md:text-4xl font-heading text-primary-foreground mb-4">Be Sharp</h3>
              <p className="text-base text-primary-foreground/90 mb-5 max-w-xs mx-auto">
                Legacy building and intentional leadership.
              </p>
              <Link to="/codex" className="text-sm font-semibold text-gold hover:underline">
                Explore Leadership Guides →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOUR PILLARS - Start Here Path */}
      <section className="py-20 md:py-32 bg-background" id="pillars">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Built on the Four Pillars</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              A teachable, repeatable framework for character development and personal evolution.
            </p>
            <Button asChild variant="outline" size="lg">
              <Link to="/codex">Start with the Four Pillars →</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              { title: "INTEGRITY", description: "Character over convenience.", link: "/about#pillars" },
              { title: "STRENGTH", description: "Mental, emotional, physical resilience.", link: "/about#pillars" },
              {
                title: "EMOTIONAL INTELLIGENCE",
                description: "Self-awareness and regulation.",
                link: "/eq-assessment",
              },
              { title: "DISCIPLINE", description: "Consistency over motivation.", link: "/about#pillars" },
            ].map((pillar, i) => (
              <Link key={i} to={pillar.link}>
                <Card className="p-8 border-2 bg-card hover:border-gold transition-colors cursor-pointer">
                  <h3 className="text-2xl font-heading font-bold mb-4">{pillar.title}</h3>
                  <p className="text-muted-foreground">{pillar.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="py-20 md:py-32 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              Structured Mentorship Rooted in the Four Pillars
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Structured programs teaching the Four Pillars.
            </p>
          </div>

          <Card className="overflow-visible bg-card max-w-7xl mx-auto">
            <div className="relative h-[300px] overflow-hidden">
              <img src={adultImage} alt="Adult Coaching" className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-gold/90 flex items-center justify-center">
                <Target className="h-6 w-6 text-primary" />
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-heading font-bold mb-3">Adult Coaching (18+)</h3>
              <p className="text-muted-foreground mb-6">
                Group coaching + digital courses to master emotional intelligence.
              </p>

              <div className="w-full">
                <Button variant="hero" className="w-full whitespace-nowrap text-center">
                  Explore Adult Programs
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* PRODUCT SHOWCASE */}
      <section className="py-20 md:py-32 bg-background" id="shop">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              Grooming as Discipline.<p></p> Grooming as Presence.
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Premium ingredients. Purpose-driven formulas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden border bg-card">
                  <div className="relative h-[300px] bg-muted">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="p-6">
                    <p className="text-sm text-bronze font-semibold mb-1">{product.ageRange}</p>
                    <h3 className="text-xl font-heading font-bold mb-2">{product.name}</h3>

                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-2xl font-bold text-gold">${product.price}</span>
                      {product.compareAtPrice && (
                        <span className="text-sm text-muted-foreground line-through">${product.compareAtPrice}</span>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.shortDescription}</p>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => addToCart(product)}>
                        Add to Cart
                      </Button>

                      <Button variant="link" size="sm" asChild>
                        <Link to={`/products/${product.id}`}>Details</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center text-muted-foreground py-12">Loading products...</div>
            )}

            {/* FULL WIDTH CTA CARD */}
            <Link to="/shop/essence-collection" className="col-span-1 md:col-span-3">
              <Card className="overflow-visible border-2 border-gold bg-gradient-to-br from-primary via-primary to-gold/20">
                <div className="p-12 md:p-16 text-center">
                  <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">View Full Collection</h3>
                  <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
                    Explore our complete range of premium grooming essentials.
                  </p>

                  <div className="w-full">
                    <Button
                      size="lg"
                      className="w-full whitespace-nowrap text-center bg-gold text-primary hover:bg-gold/90"
                    >
                      Shop All Products →
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* PARENTS SECTION */}
      <section className="py-16 md:py-20 bg-[hsl(var(--muted))]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
            <div className="lg:col-span-3">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
                Parents: Raise Poised Young Men
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Starter kits, first-shave guidance, and youth leadership.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  "Age-appropriate grooming kits for teens 13–18",
                  "Free downloadable guides",
                  "Youth leadership programs",
                ].map((bullet, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-gold/20 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-gold rounded-full" />
                    </div>
                    <p className="text-base text-muted-foreground">{bullet}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full">
                  <Button
                    asChild
                    size="lg"
                    className="w-full whitespace-nowrap text-center bg-gold text-primary hover:bg-gold/90"
                  >
                    <Link to="/for-moms-mentors#resources">Explore Parent Resources</Link>
                  </Button>
                </div>

                <Button asChild variant="link" className="text-gold group">
                  <Link to="/for-moms-mentors#first-shave">
                    Download First Shave Guide
                    <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-2">
              <img
                src={youthImage}
                alt="Parent and teen"
                className="w-full h-auto rounded-xl shadow-lg object-cover max-h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF - Tagged Testimonials + Credibility Block */}
      <section className="py-20 md:py-32 bg-primary text-white">
        <div className="container mx-auto px-4">
          {/* Credibility Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Standards + Framework + Outcomes</h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              Our Four Pillars curriculum is built on Positive Youth Development, Trauma-Informed Care, and
              Social-Emotional Learning best practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Testimonial 1 - Tagged with Pillar */}
            <div>
              <div className="inline-block bg-gold/20 text-gold text-xs font-semibold px-3 py-1 rounded-full mb-4">
                Discipline
              </div>
              <div className="text-5xl text-gold mb-4">"</div>
              <p className="italic text-lg mb-4">
                The Poised Young Gentleman program changed my son's life. He now wakes up early and takes ownership of
                his day.
              </p>
              <p className="text-sm text-gold">— Marcus T., Parent</p>
            </div>

            {/* Testimonial 2 - Tagged with Pillar */}
            <div>
              <div className="inline-block bg-gold/20 text-gold text-xs font-semibold px-3 py-1 rounded-full mb-4">
                Emotional Intelligence
              </div>
              <div className="text-5xl text-gold mb-4">"</div>
              <p className="italic text-lg mb-4">
                Emotional intelligence isn't weakness — it's strategy. This program gave me the vocabulary and tools.
              </p>
              <p className="text-sm text-gold">— Andre W., 29</p>
            </div>

            {/* Stats - Grounded Claims */}
            <div className="flex flex-col gap-6">
              <div>
                <div className="text-4xl font-heading font-bold text-gold">500+</div>
                <p className="text-sm">Individuals Mentored Since 2023</p>
              </div>
              <div>
                <div className="text-4xl font-heading font-bold text-gold">8-Week</div>
                <p className="text-sm">Youth Curriculum Program</p>
              </div>
              <div>
                <div className="text-4xl font-heading font-bold text-gold">98%</div>
                <p className="text-sm">Participant Satisfaction (Self-Reported)</p>
              </div>
              <div>
                <div className="text-4xl font-heading font-bold text-gold">Est. 2023</div>
                <p className="text-sm">Founded in New Orleans, LA</p>
              </div>
            </div>
          </div>

          {/* Partners + Codex Link */}
          <div className="text-center mt-16 pt-16 border-t border-white/20">
            <p className="text-sm text-gold mb-4">Proud Partners</p>
            <div className="flex flex-wrap justify-center gap-8 text-sm mb-8">
              <span>Son of a Saint</span>
              <span className="text-gold">•</span>
              <span>AmeriHealth Caritas</span>
            </div>
            <Button
              asChild
              variant="outline"
              className="border-gold text-gold hover:bg-gold hover:text-gold-foreground"
            >
              <Link to="/codex">Explore Our Methods in The Codex →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20 md:py-24 bg-gold" id="contact">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-4">
              Enter Codex. Live with Poise.
            </h2>
            <p className="text-lg text-primary/90 mb-8">Weekly insights + free 4 Pillars Starter Kit.</p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                  }}
                  className={`h-12 bg-white text-primary border-primary/20 ${errors.email ? "border-destructive" : ""}`}
                />
                {errors.email && <p className="text-xs text-destructive mt-1 text-left">{errors.email}</p>}
              </div>

              <div>
                <Input
                  type="text"
                  placeholder="First name (optional)"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    if (errors.firstName) setErrors((p) => ({ ...p, firstName: undefined }));
                  }}
                  className={`h-12 bg-white text-primary border-primary/20 ${
                    errors.firstName ? "border-destructive" : ""
                  }`}
                />
                {errors.firstName && <p className="text-xs text-destructive mt-1 text-left">{errors.firstName}</p>}
              </div>

              <div className="w-full">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full whitespace-nowrap text-center bg-primary text-white hover:bg-primary/90"
                >
                  Get the Starter Kit
                </Button>
              </div>
            </form>

            <p className="text-xs text-primary/70 mt-4">Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
