import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ShoppingCart, Target, Handshake, Calendar, Users, Brain, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Import images
import heroImage from "@/assets/hero-mentorship.jpg";
import youthImage from "@/assets/youth-mentorship.jpg";
import adultImage from "@/assets/adult-coaching.jpg";
import experiencesImage from "@/assets/live-experiences.jpg";
import productCleanser from "@/assets/product-cleanser.jpg";
import productSerum from "@/assets/product-serum.jpg";
import productBundle from "@/assets/product-bundle.jpg";

const Index = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", { email, firstName });
    // TODO: Client will integrate with email platform
    setEmail("");
    setFirstName("");
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section
        className="relative min-h-[70vh] md:min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-primary/60" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white fade-in">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Redefine Your Masculinity. Build Your Legacy.
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Principled mentorship, emotional intelligence coaching, and premium grooming aligned with the Four
            Pillars.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="hero">
              Explore Programs
            </Button>
            <Button size="lg" variant="hero">
              Shop Grooming
            </Button>
          </div>
        </div>
      </section>

      {/* Feel/Look/Be Sharp Section */}
      <section className="py-20 md:py-24 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 max-w-6xl mx-auto">
            {/* Feel Sharp */}
            <div className="flex flex-col items-center text-center">
              <Brain className="w-16 h-16 text-gold mb-6" strokeWidth={1.5} />
              <h3 className="text-3xl md:text-4xl font-heading font-semibold text-primary-foreground mb-4">
                Feel Sharp
              </h3>
              <p className="text-base text-primary-foreground/90 leading-relaxed mb-5 max-w-xs mx-auto">
                Inner state and emotional intelligence. Master your mind, regulate your emotions, and build unshakeable confidence from within.
              </p>
              <Link 
                to="/programs" 
                className="text-sm font-semibold text-gold hover:underline hover:brightness-110 transition-all"
              >
                Explore Emotional Intelligence →
              </Link>
            </div>

            {/* Look Sharp */}
            <div className="flex flex-col items-center text-center">
              <Sparkles className="w-16 h-16 text-gold mb-6" strokeWidth={1.5} />
              <h3 className="text-3xl md:text-4xl font-heading font-semibold text-primary-foreground mb-4">
                Look Sharp
              </h3>
              <p className="text-base text-primary-foreground/90 leading-relaxed mb-5 max-w-xs mx-auto">
                Refined presentation and grooming. Elevate your daily rituals with premium products designed for every stage of your journey.
              </p>
              <Link 
                to="/shop" 
                className="text-sm font-semibold text-gold hover:underline hover:brightness-110 transition-all"
              >
                Shop Essence Collection →
              </Link>
            </div>

            {/* Be Sharp */}
            <div className="flex flex-col items-center text-center">
              <TrendingUp className="w-16 h-16 text-gold mb-6" strokeWidth={1.5} />
              <h3 className="text-3xl md:text-4xl font-heading font-semibold text-primary-foreground mb-4">
                Be Sharp
              </h3>
              <p className="text-base text-primary-foreground/90 leading-relaxed mb-5 max-w-xs mx-auto">
                Impact and legacy building. Transform yourself, lead your family, and shape the next generation through intentional action.
              </p>
              <Link 
                to="/programs" 
                className="text-sm font-semibold text-gold hover:underline hover:brightness-110 transition-all"
              >
                Join the Programs →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Four Pillars Section */}
      <section className="py-20 md:py-32 bg-background" id="pillars">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-center mb-16 fade-in">
            Built on the Four Pillars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "INTEGRITY",
                description:
                  "Character over convenience. Your word is your bond. Build trust through consistent action. Choose principle over popularity, even when no one's watching.",
              },
              {
                title: "STRENGTH",
                description:
                  "Physical, mental, emotional resilience. True strength isn't domination—it's discipline. Train your body, fortify your mind, regulate your emotions.",
              },
              {
                title: "EMOTIONAL INTELLIGENCE",
                description:
                  "Self-awareness, empathy, regulation. Modern masculinity requires emotional fluency. Understand your triggers. Communicate your needs. Read the room.",
              },
              {
                title: "DISCIPLINE",
                description:
                  "Consistent action, delayed gratification. Motivation fades. Discipline endures. Wake up early. Show up daily. Small actions compound into legacy.",
              },
            ].map((pillar, index) => (
              <Card
                key={index}
                className="p-8 border-2 hover-lift hover-scale cursor-default bg-card"
              >
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mb-4">
                  <div className="w-6 h-6 rounded-full bg-gold" />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4">{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Discover the Framework
            </Button>
          </div>
        </div>
      </section>

      {/* Programs Overview Section - BEFORE PRODUCTS */}
      <section className="py-20 md:py-32 bg-muted" id="programs">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              Growth Through Mentorship & Coaching
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Structured programs teaching the Four Pillars. For boys becoming men, and men building legacies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                image: youthImage,
                icon: Handshake,
                title: "Youth Mentorship (Ages 10-17)",
                description:
                  "7-10 week cohorts teaching boys integrity, strength, emotional intelligence, and discipline. Give your son the role model he deserves.",
                cta: "Learn About Youth Programs",
              },
              {
                image: adultImage,
                icon: Target,
                title: "Adult Coaching (Ages 18+)",
                description:
                  "Group coaching + digital courses. Master emotional intelligence, build your legacy, lead with purpose.",
                cta: "Explore Adult Programs",
              },
              {
                image: experiencesImage,
                icon: Calendar,
                title: "Live Experiences",
                description:
                  "Weekend retreats. Pop-up workshops. Fatherhood forums. Transform in community.",
                cta: "View Upcoming Events",
              },
            ].map((program, index) => (
              <Card
                key={index}
                className="overflow-hidden hover-lift bg-card group"
              >
                <div className="relative h-[300px] overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-gold/90 flex items-center justify-center">
                    <program.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold mb-3">{program.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{program.description}</p>
                  <Button variant="hero" className="w-full">
                    {program.cta}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase Section - AFTER PROGRAMS */}
      <section className="py-20 md:py-32 bg-background" id="shop">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              Grooming That Aligns With Your Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Premium ingredients. Age-appropriate formulas. Every product reinforces the Four Pillars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                image: productCleanser,
                name: "Modern-G Hydrating Cleanser",
                age: "For Ages 25-34",
                price: "$28",
                benefit: "For men building careers and character. Your skin tells your story.",
              },
              {
                image: productSerum,
                name: "Poised-G Anti-Aging Serum",
                age: "For Ages 35-49",
                price: "$45",
                benefit: "Firms, brightens, protects. Because leadership shows on your face.",
              },
              {
                image: productBundle,
                name: "The Essentials Bundle",
                age: "Any Age",
                price: "$80",
                originalPrice: "$95",
                benefit: "Cleanser + Moisturizer + SPF. Everything you need to start strong.",
              },
            ].map((product, index) => (
              <Card
                key={index}
                className="overflow-hidden border hover-lift bg-card group"
              >
                <div className="relative h-[300px] overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-bronze font-semibold mb-1">{product.age}</p>
                  <h3 className="text-xl font-heading font-bold mb-2">{product.name}</h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-2xl font-bold text-gold">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{product.benefit}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Add to Cart
                    </Button>
                    <Button variant="link" size="sm">
                      Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              View Full Collection
            </Button>
          </div>
        </div>
      </section>

      {/* Parents & Mentors Promotion Section */}
      <section className="py-16 md:py-20 bg-[hsl(var(--muted))]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
            {/* Left Column - Content */}
            <div className="lg:col-span-3 fade-in">
              <h2 className="text-3xl md:text-4xl lg:text-[36px] font-heading font-bold text-primary mb-4 leading-tight">
                Parents: Raise Poised Young Men
              </h2>
              <p className="text-lg md:text-[18px] text-muted-foreground mb-6 leading-relaxed">
                Starter kits, first-shave guidance, and character-building programs for the young man in your life
              </p>

              {/* Value Bullets */}
              <div className="space-y-3 mb-8">
                {[
                  "Age-appropriate grooming kits for teens 13-18",
                  "Free downloadable guides: First shave, conversations, milestones",
                  "Youth leadership programs that build character"
                ].map((bullet, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-gold" />
                    </div>
                    <p className="text-base text-muted-foreground">{bullet}</p>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild
                  size="lg"
                  className="bg-gold hover:bg-gold/90 text-primary font-bold"
                >
                  <Link to="/for-moms-mentors">
                    Explore Parent Resources
                  </Link>
                </Button>
                <Button 
                  asChild
                  variant="link"
                  className="text-gold hover:text-gold/80 font-medium group"
                >
                  <Link to="/for-moms-mentors#first-shave">
                    Download First Shave Guide
                    <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">→</span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="lg:col-span-2 fade-in">
              <div className="relative">
                <img
                  src={youthImage}
                  alt="Parent and teen building confidence together"
                  className="w-full h-auto rounded-xl shadow-lg object-cover max-h-[400px]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 md:py-32 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Testimonial 1 */}
            <div className="fade-in">
              <div className="text-6xl text-gold mb-4">"</div>
              <p className="italic mb-4 text-lg">
                The Poised Young Gentleman program changed my son's life. He went from reactive to reflective. From
                isolated to connected. Worth every penny.
              </p>
              <p className="text-sm text-gold">— Marcus T., Parent, New Orleans</p>
            </div>

            {/* Testimonial 2 */}
            <div className="fade-in">
              <div className="text-6xl text-gold mb-4">"</div>
              <p className="italic mb-4 text-lg">
                David's coaching gave me tools I never learned growing up. Emotional intelligence isn't weakness—it's
                strategy. My relationships and career have transformed.
              </p>
              <p className="text-sm text-gold">— Andre W., 29, Legacy Series Participant</p>
            </div>

            {/* Metrics */}
            <div className="flex flex-col justify-center gap-6 fade-in">
              <div>
                <div className="text-4xl font-heading font-bold text-gold mb-1">500+</div>
                <div className="text-sm">Men & Boys Mentored</div>
              </div>
              <div>
                <div className="text-4xl font-heading font-bold text-gold mb-1">7-Week</div>
                <div className="text-sm">Youth Transformation</div>
              </div>
              <div>
                <div className="text-4xl font-heading font-bold text-gold mb-1">98%</div>
                <div className="text-sm">Satisfaction Rate</div>
              </div>
              <div>
                <div className="text-4xl font-heading font-bold text-gold mb-1">Est. 2023</div>
                <div className="text-sm">Growing Daily</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16 pt-16 border-t border-white/20">
            <p className="text-sm text-gold mb-4">Proud Partners</p>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <span>Son of a Saint</span>
              <span className="text-gold">•</span>
              <span>AmeriHealth Caritas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="py-20 md:py-24 bg-gold" id="contact">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-4 fade-in">
              Join the Movement. Stay Poised.
            </h2>
            <p className="text-lg text-primary/90 mb-8">
              Weekly insights on mentorship, emotional intelligence, grooming, and growth. Plus, get The 4 Pillars
              Starter Kit (free PDF).
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 bg-white text-primary border-primary/20"
              />
              <Input
                type="text"
                placeholder="First name (optional)"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="h-12 bg-white text-primary border-primary/20"
              />
              <Button type="submit" size="lg" variant="default" className="w-full bg-primary text-white hover:bg-primary/90">
                Get the Starter Kit
              </Button>
            </form>

            <p className="text-xs text-primary/70 mt-4">We respect your inbox. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
