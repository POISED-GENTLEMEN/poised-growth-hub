import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield, Dumbbell, Brain, Target } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCanonical } from "@/hooks/useCanonical";
import codexCover from "@/assets/book-hardcover.jpg";

const Index = () => {
  useCanonical();

  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Poised Gentlemen",
      url: "https://poisedgentlemen.com",
      logo: "https://poisedgentlemen.com/favicon.ico",
      description:
        "ADA-certified character development programs for boys ages 10–17, delivered to schools, nonprofits, and community organizations at no cost.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "New Orleans",
        addressRegion: "LA",
        addressCountry: "US",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "david@risetopurpose.org",
        telephone: "+1-504-484-9037",
        contactType: "partnerships",
      },
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

  const partners = [
    "American Diabetes Association",
    "Son of a Saint",
    "AmeriHealth Caritas Louisiana",
    "United Way SELA",
  ];

  const pillars = [
    { icon: Shield, title: "Integrity", desc: "Character over convenience — doing right when no one is watching." },
    { icon: Dumbbell, title: "Strength", desc: "Mental, emotional, and physical resilience built through practice." },
    { icon: Brain, title: "Emotional Intelligence", desc: "Self-awareness, regulation, and the ability to lead from clarity." },
    { icon: Target, title: "Discipline", desc: "Consistency over motivation — the daily rituals that build men." },
  ];

  const programs = [
    {
      name: "Project Power",
      desc: "ADA-certified youth health and wellness programming — healthy habits, nutrition, movement, and emotional regulation — delivered to your school or organization at no cost, funded through our grant and health-partner relationships and paired with the Four Pillars.",
    },
    {
      name: "Poised Young Gentlemen (PYG)",
      desc: "Our flagship school pilot — The Poised Method™ Pilot Edition. 24 sessions over 12 weeks, cohorts of 8–12 boys ages 10–13 at a strict 12:1 ratio, built on the Four Pillars and measured with the Poised Relational Index. A trademark-protected preview of the full Method, with a pilot-to-contract pathway.",
    },
    {
      name: "1-on-1 Mentorship",
      desc: "Individual sessions for boys who need direct guidance.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* HERO */}
      <section className="relative bg-primary text-primary-foreground py-24 md:py-32">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Build Men. Build Communities.
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Poised Gentlemen builds boys ages 10–17 into young men of integrity, strength, emotional
            intelligence, and discipline. Start with ADA-certified wellness programming — delivered to
            your school at no cost — then go deeper with our flagship Poised Method™ school pilot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-gold text-primary hover:bg-gold/90 font-semibold w-full sm:w-auto">
              <Link to="/schools/">Partner With Us</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/40 text-white hover:bg-white hover:text-primary w-full sm:w-auto"
            >
              <Link to="/essence/">Explore the Essence Collection</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CREDIBILITY BAR */}
      <section className="py-8 bg-muted border-y border-border">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-4">
            Trusted Partners
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 md:gap-x-12">
            {partners.map((p) => (
              <span key={p} className="text-sm md:text-base font-heading text-primary text-center">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-primary">What We Do</h2>
          <p className="text-lg text-foreground/85 leading-relaxed">
            Poised Gentlemen runs <Link to="/programs/" className="text-gold underline underline-offset-4 hover:no-underline">youth character development programs</Link> in
            New Orleans and beyond for boys 10–17 — from ADA-certified school wellness programming to
            cohort-based mentorship and one-on-one guidance. For adults, we provide mentorship coaching
            that extends the same principles into leadership, fatherhood, and personal growth. We also treat
            grooming as a discipline practice — a daily ritual that reinforces presence and self-respect.
            Everything we build rests on the Four Pillars: Integrity, Strength, Emotional Intelligence, and
            Discipline.
          </p>
        </div>
      </section>

      {/* PROBLEM / STAKES */}
      <section className="py-20 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
            Underserved ≠ Underpowered
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
            Too many boys in under-resourced schools and communities are written off before they're
            trained. They aren't failing — they're untrained. Poised Gentlemen fills that gap with
            structured character development that schools and nonprofits couldn't otherwise afford,
            funded through our grant and health-partner relationships.
          </p>
        </div>
      </section>

      {/* FOUR PILLARS */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 text-primary">
              The Four Pillars
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The framework that shapes every program we deliver.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {pillars.map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="p-8 border-2 hover:border-gold transition-colors text-center">
                <Icon className="w-10 h-10 text-gold mx-auto mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-heading font-bold mb-3 text-primary">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS OVERVIEW */}
      <section className="py-20 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 text-primary">
              Our Programs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three pathways. One framework. Built for boys and the organizations that serve them.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {programs.map((p) => (
              <Card key={p.name} className="p-8 bg-card flex flex-col">
                <h3 className="text-xl font-heading font-bold mb-3 text-primary">{p.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{p.desc}</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/programs/">Learn More</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF / IMPACT */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-6">Impact</p>
          <p className="text-2xl md:text-4xl font-heading font-bold text-primary leading-tight">
            12 young men. 6 weeks. One ceremony that changed how they see themselves.
          </p>
        </div>
      </section>

      {/* THE CODEX */}
      <section className="py-20 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-4">The Codex</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
            The Poised Gentlemen Codex
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            The written framework behind every program — a field manual on the Four Pillars for the men
            living them and the boys learning them.
          </p>
          <Button asChild size="lg" className="bg-gold text-primary hover:bg-gold/90 font-semibold">
            <Link to="/codex/">Get the Book</Link>
          </Button>
        </div>
      </section>

      {/* PARTNER CTA BANNER */}
      <section className="py-20 md:py-28 bg-gold text-primary">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-8 leading-tight">
            Bring ADA-Certified Programming to Your School — At No Cost
          </h2>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
            <Link to="/schools/one-pager/">Download Our One-Pager</Link>
          </Button>
        </div>
      </section>

      {/* ESSENCE COLLECTION TEASER */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-3">
            Also From Poised Gentlemen
          </p>
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-4">
            The Essence Collection
          </h3>
          <p className="text-base text-muted-foreground mb-6 max-w-2xl mx-auto">
            Premium fragrance for the man committed to refinement.
          </p>
          <Button asChild variant="outline">
            <Link to="/essence/">Explore Essence →</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
