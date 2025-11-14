import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Download, ArrowRight, MessageCircle, Shield, Mountain, Users, Star, ChevronRight } from "lucide-react";

const ForMomsMentors = () => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    document.title = "For Moms & Mentors | The Poised Gentlemen";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Empower the young men in your life with confidence, discipline, and refined presence. Starter kits, guides, and programs for parents and mentors."
      );
    }
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="container mx-auto px-4 pt-6 pb-4">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link to="/" className="text-foreground hover:text-gold transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-muted-foreground">
            <ChevronRight className="w-4 h-4" />
          </li>
          <li aria-current="page" className="text-gold font-medium">
            Moms & Mentors
          </li>
        </ol>
      </nav>
      
      {/* Hero Section */}
      <section className="bg-[#F9F7F4] py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6">
            For Moms & Mentors
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Empower the young men in your life with confidence, discipline, and refined presence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
              <Download className="w-5 h-5 mr-2" />
              Download First Shave Guide
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/programs">Explore Youth Programs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Section 1: Why Grooming Matters */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-6">
                More Than Grooming—It's Character Building
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Teaching young men to care for their appearance builds discipline, self-respect, and confidence that extends far beyond the mirror. The habits they form today shape the leaders they become tomorrow.
              </p>
              <blockquote className="border-l-4 border-gold pl-6 italic text-xl text-primary font-medium">
                "Grooming isn't vanity—it's self-respect made visible."
              </blockquote>
            </div>
            <div className="space-y-6">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <img 
                  src="/placeholder.svg" 
                  alt="Teen practicing grooming routine" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-1 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm font-semibold text-primary">78% of teens report increased confidence after establishing grooming routine</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm font-semibold text-primary">First impressions form in 7 seconds</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm font-semibold text-primary">Daily rituals build consistency and discipline</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Starter Kits */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary text-center mb-12">
            Age-Appropriate Starter Collections
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Kit 1: Ages 13-15 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4">
                  <img src="/placeholder.svg" alt="Fresh Start Kit" className="w-full h-full object-cover" />
                </div>
                <CardTitle className="text-2xl">Ages 13-15</CardTitle>
                <CardDescription className="text-lg font-bold text-gold">The Fresh Start Kit - $35</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                  <li>• Light Breeze mini fragrance</li>
                  <li>• Basic face wash</li>
                  <li>• Gentle moisturizer</li>
                  <li>• Beginner's grooming guide</li>
                </ul>
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/shop">Shop Fresh Start Kit</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Kit 2: Ages 16-18 */}
            <Card className="hover:shadow-lg transition-shadow border-gold border-2">
              <CardHeader>
                <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4">
                  <img src="/placeholder.svg" alt="Confidence Builder" className="w-full h-full object-cover" />
                </div>
                <CardTitle className="text-2xl">Ages 16-18</CardTitle>
                <CardDescription className="text-lg font-bold text-gold">The Confidence Builder - $68</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                  <li>• Buoyant 50ml fragrance</li>
                  <li>• Premium face care</li>
                  <li>• First shave tools</li>
                  <li>• First shave guide + video access</li>
                </ul>
                <Button className="w-full bg-gold text-gold-foreground hover:bg-gold/90" asChild>
                  <Link to="/shop">Shop Confidence Builder</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Kit 3: Ages 18+ */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4">
                  <img src="/placeholder.svg" alt="Young Gentleman's Collection" className="w-full h-full object-cover" />
                </div>
                <CardTitle className="text-2xl">Ages 18+</CardTitle>
                <CardDescription className="text-lg font-bold text-gold">The Young Gentleman's Collection - $125</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                  <li>• Choice of signature scent</li>
                  <li>• Full grooming set</li>
                  <li>• Poised Starter Kit PDF</li>
                  <li>• 1-month Codex access</li>
                </ul>
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/shop">Shop Young Gentleman</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 3: First Shave Guide */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img src="/placeholder.svg" alt="First shave supplies" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-6">
                Guide Him Through His First Shave
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                This milestone doesn't have to be intimidating
              </p>
              <ul className="space-y-3 mb-8 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-gold mr-2">✓</span>
                  <span>When to start (signs to look for)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">✓</span>
                  <span>Essential supplies checklist</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">✓</span>
                  <span>Step-by-step technique</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">✓</span>
                  <span>Common mistakes to avoid</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">✓</span>
                  <span>Building the habit</span>
                </li>
              </ul>
              <div className="space-y-4">
                <Button size="lg" className="w-full md:w-auto bg-gold text-gold-foreground hover:bg-gold/90">
                  <Download className="w-5 h-5 mr-2" />
                  Download Free First Shave Guide
                </Button>
                <Button size="lg" variant="outline" className="w-full md:w-auto md:ml-4" asChild>
                  <Link to="/shop">Shop First Shave Kits</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Conversations That Matter */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary text-center mb-12">
            How to Talk About Masculinity & Grooming
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageCircle className="w-12 h-12 text-gold mb-4" />
                <CardTitle className="text-xl">Starting the Conversation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Scripts for introducing grooming without embarrassment</p>
                <Link to="/codex" className="text-gold hover:underline inline-flex items-center">
                  Read Article <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="w-12 h-12 text-gold mb-4" />
                <CardTitle className="text-xl">Modern Masculinity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Helping him understand strength, kindness, and discipline</p>
                <Link to="/codex" className="text-gold hover:underline inline-flex items-center">
                  Read Article <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Mountain className="w-12 h-12 text-gold mb-4" />
                <CardTitle className="text-xl">Building Confidence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">From awkward to assured: the transformation timeline</p>
                <Link to="/codex" className="text-gold hover:underline inline-flex items-center">
                  Read Article <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="w-12 h-12 text-gold mb-4" />
                <CardTitle className="text-xl">Navigating Peer Pressure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Tools for helping him stand firm in values</p>
                <Link to="/codex" className="text-gold hover:underline inline-flex items-center">
                  Read Article <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 5: Poised Young Gentlemen Program */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                The Poised Young Gentlemen Program
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-6">
                8-week character & leadership development
              </p>
              <p className="text-lg text-primary-foreground/90 mb-8 leading-relaxed">
                A structured program for ages 14-18 combining emotional intelligence, presence, etiquette, and legacy-building. Perfect for schools, youth organizations, and mentorship groups.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-gold mr-3">✓</span>
                  <span>Age-appropriate curriculum</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3">✓</span>
                  <span>Builds confidence & social skills</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3">✓</span>
                  <span>Includes grooming fundamentals</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3">✓</span>
                  <span>Parent progress updates</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3">✓</span>
                  <span>Certificate of completion</span>
                </li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <Card className="bg-background text-foreground">
                <CardHeader>
                  <CardTitle className="text-2xl">Program Snapshot</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-semibold">Duration:</span>
                    <span>8 Weeks</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-semibold">Ages:</span>
                    <span>14-18 Years</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-semibold">Format:</span>
                    <span>Group or Individual</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-semibold">Price:</span>
                    <span className="text-gold font-bold">Inquire for details</span>
                  </div>
                  <div className="space-y-3 pt-4">
                    <Button size="lg" className="w-full bg-gold text-gold-foreground hover:bg-gold/90" asChild>
                      <Link to="/programs">Learn About Programs</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="w-full" asChild>
                      <Link to="/contact">Request Info</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Parent Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary text-center mb-12">
            What Parents & Mentors Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-4">
                  "I was skeptical about the 'grooming = character' connection, but after seeing my son's transformation—not just appearance but confidence and responsibility—I'm a believer."
                </p>
                <p className="font-semibold text-primary">Sarah M.</p>
                <p className="text-sm text-muted-foreground">Mother of 16-year-old</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-4">
                  "The Poised Young Gentlemen program gave my nephew tools he'll use for life. The grooming aspect was just the entry point to deeper conversations about respect and self-worth."
                </p>
                <p className="font-semibold text-primary">Marcus T.</p>
                <p className="text-sm text-muted-foreground">Mentor & Uncle</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-4">
                  "As a single mom raising boys, I felt overwhelmed by the 'guy stuff.' The First Shave Guide and starter kits made this milestone beautiful instead of stressful."
                </p>
                <p className="font-semibold text-primary">Jennifer L.</p>
                <p className="text-sm text-muted-foreground">Mother of two sons</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 7: Resources for Parents */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary text-center mb-12">
            Resources for Parents
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Free Resources */}
            <div>
              <h3 className="text-2xl font-bold text-primary mb-6">Free Resources</h3>
              <div className="space-y-4">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-primary mb-1">Signs Your Son Is Ready for His First Shave</h4>
                      <p className="text-sm text-muted-foreground">Downloadable checklist</p>
                    </div>
                    <Download className="w-6 h-6 text-gold" />
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-primary mb-1">Age-Appropriate Grooming Milestones</h4>
                      <p className="text-sm text-muted-foreground">Comprehensive guide</p>
                    </div>
                    <Download className="w-6 h-6 text-gold" />
                  </CardContent>
                </Card>

                <Link to="/codex">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-primary mb-1">Toxic Masculinity vs. Disciplined Strength</h4>
                        <p className="text-sm text-muted-foreground">Article from The Codex</p>
                      </div>
                      <ArrowRight className="w-6 h-6 text-gold" />
                    </CardContent>
                  </Card>
                </Link>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-primary mb-1">How to Set Up a Young Man's Grooming Station</h4>
                      <p className="text-sm text-muted-foreground">Video tutorial</p>
                    </div>
                    <ArrowRight className="w-6 h-6 text-gold" />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Recommended Products */}
            <div>
              <h3 className="text-2xl font-bold text-primary mb-6">Recommended Products</h3>
              <div className="space-y-4">
                <Link to="/shop">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-primary mb-2">Face care for sensitive/young skin</h4>
                      <p className="text-sm text-muted-foreground mb-3">Gentle, non-irritating formulas perfect for beginners</p>
                      <span className="text-gold font-semibold inline-flex items-center">
                        Shop Now <ArrowRight className="w-4 h-4 ml-2" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>

                <Link to="/shop">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-primary mb-2">Beginner-friendly fragrances</h4>
                      <p className="text-sm text-muted-foreground mb-3">Light, age-appropriate scents that build confidence</p>
                      <span className="text-gold font-semibold inline-flex items-center">
                        Shop Now <ArrowRight className="w-4 h-4 ml-2" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>

                <Link to="/shop">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-primary mb-2">First shave safety razor kit</h4>
                      <p className="text-sm text-muted-foreground mb-3">Everything needed for that milestone moment</p>
                      <span className="text-gold font-semibold inline-flex items-center">
                        Shop Now <ArrowRight className="w-4 h-4 ml-2" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>

                <Link to="/shop">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-primary mb-2">Grooming organizer/caddy</h4>
                      <p className="text-sm text-muted-foreground mb-3">Keep his grooming station tidy and organized</p>
                      <span className="text-gold font-semibold inline-flex items-center">
                        Shop Now <ArrowRight className="w-4 h-4 ml-2" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: FAQ for Parents */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary text-center mb-12">
            FAQ for Parents
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">What age should I start teaching grooming?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Basic hygiene habits can begin around age 10-12, with more advanced grooming (facial hair management, cologne use) typically starting around 13-15. The key is to watch for natural developmental milestones and introduce concepts gradually, making them feel natural rather than forced.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">How do I make it 'cool' not embarrassing?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Frame grooming as a sign of maturity and self-respect, not vanity. Connect it to things he cares about—confidence in social situations, making good impressions, or even athletic performance. Use role models he admires and emphasize that the most successful men take pride in their presentation.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">What if he resists or thinks it's unnecessary?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Start small with one simple habit (like face washing) and connect it to something he values. Avoid nagging or making it a power struggle. Sometimes peer influence or seeing results in others can be more effective than parental pressure. Our program materials include conversation starters that help make the case without pressure.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">Which products are safe for teen skin?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Teen skin tends to be more sensitive and prone to breakouts, so look for non-comedogenic, fragrance-free, or gentle formulas. Our Young-G line is specifically designed for younger skin, avoiding harsh chemicals while still being effective. Start with basics: cleanser, moisturizer, and sunscreen.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">How does grooming connect to character?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Grooming routines teach discipline, consistency, delayed gratification, and self-respect—all foundational character traits. When a young man learns to care for his appearance, he's practicing the same skills needed for any long-term goal: showing up daily, paying attention to details, and taking pride in outcomes. It's a gateway to broader life discipline.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-left">Can mothers effectively teach grooming to sons?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Absolutely. While having male role models is valuable, mothers can effectively teach grooming fundamentals—especially when equipped with good resources and guidance. Our materials are designed to help parents of any gender navigate these conversations confidently. What matters most is consistency, encouragement, and leading by example with your own self-care habits.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-[#F9F7F4]">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-6">
            Start His Journey Today
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Whether you're looking for the right starter kit, guidance on milestone moments, or a comprehensive program, we're here to help.
          </p>
          <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
              Get the Guide
            </Button>
          </form>
          <p className="text-sm text-muted-foreground">
            PDF guide + monthly parenting tips from The Codex
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ForMomsMentors;
