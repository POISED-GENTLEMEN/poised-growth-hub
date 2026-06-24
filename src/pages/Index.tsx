import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Check, Shield, Dumbbell, Brain, Target } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCanonical } from "@/hooks/useCanonical";
import { trackEvent } from "@/lib/analytics";

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
        "Character development and wellness programs for boys built on Integrity, Strength, Emotional Intelligence, and Discipline.",
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

  const proofItems = [
    "SOAS MOU — $6,310 engagement",
    "May 2026 cohort completed — 12 participants + Family Showcase",
    "ADA-certified facilitator credential",
    "Library of Congress catalogued book — LCCN 2026934416",
    "PGI incorporation effective Juneteenth 2026",
  ];

  const tiers = [
    {
      label: "Organizations",
      price: "$2,500–$4,500 / year",
      subline: null as string | null,
      line: "Youth orgs, libraries, community partners",
      event: "cta_request_proposal_org",
    },
    {
      label: "Schools",
      price: "$8,500–$12,000 / year",
      subline: null as string | null,
      line: "School campuses and charter networks",
      event: "cta_request_proposal_school",
    },
    {
      label: "Individuals",
      price: "$600–$1,800",
      subline: "$75/session · 2 sessions/week minimum",
      line: "Independent mentors and families",
      event: "cta_request_proposal_individual",
    },
  ];

  const partners = [
    "United Way SELA",
    "Son of a Saint",
    "AmeriHealth Caritas Louisiana",
  ];

  const pillars = [
    { icon: Shield, title: "Integrity", desc: "Character over convenience — doing right when no one is watching." },
    { icon: Dumbbell, title: "Strength", desc: "Mental, emotional, and physical resilience built through practice." },
    { icon: Brain, title: "Emotional Intelligence", desc: "Self-awareness, regulation, and the ability to lead from clarity." },
    { icon: Target, title: "Discipline", desc: "Consistency over motivation — the daily rituals that build men." },
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Poised Gentlemen | Character Development for Boys</title>
        <meta
          name="description"
          content="Character development and wellness programs for boys built on Integrity, Strength, Emotional Intelligence, and Discipline. For schools, organizations, and families."
        />
      </Helmet>
      <Header />

      {/* HERO */}
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Build Men. Build Communities.
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
              Character development and wellness programming for youth — built on Integrity,
              Strength, Emotional Intelligence, and Discipline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Lane A — Schools & Organizations */}
            <Card className="p-8 bg-background text-foreground border-2 border-gold flex flex-col">
              <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-3">
                For Schools & Organizations
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Procurement-ready licensing options",
                  "ADA-certified facilitation available",
                  "Clear implementation. Measurable outcomes.",
                ].map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-foreground/85">
                    <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" strokeWidth={2} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                size="lg"
                className="bg-gold text-primary hover:bg-gold/90 font-semibold w-full"
              >
                <Link
                  to="/request-proposal"
                  onClick={() => trackEvent("cta_request_proposal_hero")}
                >
                  Request a Program Proposal
                </Link>
              </Button>
            </Card>

            {/* Lane B — Parents & Families */}
            <Card className="p-8 bg-primary text-primary-foreground border-2 border-primary-foreground/30 flex flex-col">
              <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-3">
                For Parents & Families
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Poised Young Gentlemen — boys ages 10–13",
                  "Project Power — ages 5–12, co-ed",
                  "Confidence, discipline, emotional intelligence",
                ].map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-primary-foreground/90">
                    <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" strokeWidth={2} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-gold text-gold hover:bg-gold hover:text-primary font-semibold w-full bg-transparent"
              >
                <a href="#programs" onClick={() => trackEvent("cta_explore_programs_click")}>
                  Explore Programs for Your Son
                </a>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* PROOF STRIP */}
      <section className="bg-[#0D1B2A] text-primary-foreground py-8 border-y border-gold/30">
        <div className="container mx-auto px-4">
          <h2 className="sr-only">Verified Credentials</h2>
          <ul className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-sm md:text-base">
            {proofItems.map((item, i) => (
              <li key={item} className="flex items-center gap-3">
                <span className="text-gold font-semibold">{item}</span>
                {i < proofItems.length - 1 && (
                  <span className="hidden md:inline text-gold/40" aria-hidden="true">
                    •
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PARTNER BANNER */}
      <section className="py-10 bg-muted border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="sr-only">Trusted Partners</h2>
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-4">
            Trusted Partners
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-3 md:gap-x-16">
            {partners.map((p) => (
              <span key={p} className="text-sm md:text-base font-heading text-primary text-center">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* LICENSING OPTIONS */}
      <section id="programs" className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary">
              Licensing Options
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((t) => (
              <Card
                key={t.label}
                className="p-8 bg-primary text-primary-foreground border-2 border-gold/40 flex flex-col"
              >
                <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-3">
                  {t.label}
                </p>
                <p className="text-2xl font-heading font-bold mb-2">{t.price}</p>
                {t.subline && (
                  <p className="text-xs text-gold/90 mb-2">{t.subline}</p>
                )}
                <p className="text-sm text-primary-foreground/85 mb-8 flex-1">{t.line}</p>
                <Button
                  asChild
                  className="bg-gold text-primary hover:bg-gold/90 font-semibold w-full"
                >
                  <Link to="/request-proposal" onClick={() => trackEvent(t.event)}>
                    Request a Proposal
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">
            We'll recommend the right tier after a short fit call.
          </p>
        </div>
      </section>

      {/* FOUR PILLARS */}
      <section className="py-20 md:py-24 bg-muted">
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
              <Card key={title} className="p-8 border-2 hover:border-gold transition-colors text-center bg-background">
                <Icon className="w-10 h-10 text-gold mx-auto mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-heading font-bold mb-3 text-primary">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* INSTITUTIONAL CONVERSION BLOCK */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary">
              Bring Poised Gentlemen to Your Setting
            </h2>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                n: "1",
                title: "Tell us your setting",
                desc: "Submit a proposal request describing your organization and population.",
              },
              {
                n: "2",
                title: "We recommend a program format",
                desc: "We match you with the right program and delivery model.",
              },
              {
                n: "3",
                title: "We deliver and measure",
                desc: "You receive clear progress reporting your stakeholders can use.",
              },
            ].map((s) => (
              <li key={s.n} className="list-none">
                <Card className="p-8 h-full border-2 border-border hover:border-gold transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gold text-primary font-heading font-bold flex items-center justify-center mb-4">
                    {s.n}
                  </div>
                  <h3 className="text-lg font-heading font-bold mb-2 text-primary">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </Card>
              </li>
            ))}
          </ol>

          <div className="max-w-3xl mx-auto mb-10 space-y-6">
            {[
              {
                q: "What ages do you serve?",
                a: "Poised Young Gentlemen serves boys ages 10–13. Project Power serves youth ages 5–12, co-ed. Contact us if you have a population outside these ranges — we can discuss options.",
              },
              {
                q: "How does licensing work?",
                a: "We offer three tiers based on your organization type and scale. The proposal process identifies the right fit. No commitment required to start the conversation.",
              },
              {
                q: "How fast can we start?",
                a: "Most programs launch 3–4 weeks after a signed agreement. Submit a proposal and we'll walk you through the timeline on our fit call.",
              },
            ].map((f) => (
              <div key={f.q} className="border-l-4 border-gold pl-5">
                <h3 className="font-heading font-bold text-primary mb-1">{f.q}</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-gold text-primary hover:bg-gold/90 font-semibold"
            >
              <Link
                to="/request-proposal"
                onClick={() => trackEvent("cta_request_proposal_institutional_block")}
              >
                Request a Program Proposal
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* START HERE — INTERNAL HUB */}
      <section className="py-20 md:py-24 bg-muted">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary">
              Start Here
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Poised Young Gentlemen (PYG)",
                desc: "Our 12-week character development cohort for boys ages 10–13. Built for small groups. Built for lasting change.",
                to: "/pyg",
                event: "hub_pyg_click",
                label: "Explore PYG",
              },
              {
                title: "The Poised Gentlemen Codex",
                desc: "The foundational text behind the Poised Method. Available in print, ebook, and Audible.",
                to: "/codex",
                event: "hub_codex_click",
                label: "Explore the Codex",
              },
              {
                title: "The Essence Collection",
                desc: "Grooming products built for the modern gentleman. Fragrance, skincare, and character in every product.",
                to: "/essence",
                event: "hub_essence_click",
                label: "Explore Essence",
              },
            ].map((c) => (
              <Card key={c.title} className="p-8 bg-background border-2 border-border hover:border-gold transition-colors flex flex-col">
                <h3 className="text-xl font-heading font-bold mb-3 text-primary">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{c.desc}</p>
                <Button
                  asChild
                  variant="outline"
                  className="border-gold text-primary hover:bg-gold hover:text-primary w-full"
                >
                  <Link to={c.to} onClick={() => trackEvent(c.event)}>
                    {c.label}
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>

  );
};

export default Index;
