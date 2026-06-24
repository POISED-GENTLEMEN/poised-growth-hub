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
    "12 young men completed our inaugural PYG cohort — May 2026",
    "ADA-certified programming — Louisiana Regions 2 & 9",
    "The Poised Gentlemen Codex — Library of Congress catalogued",
    "Nonprofit formation complete — Juneteenth 2026",
    "United Way SELA — active partnership in development",
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
          content="Character development programs for boys built on Integrity, Strength, Emotional Intelligence, and Discipline. For schools, organizations, and families in Louisiana and beyond."
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
              Character development programs for boys — built on Integrity,
              Strength, Emotional Intelligence, and Discipline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Lane A — Schools & Organizations */}
            <Card className="p-8 bg-background text-foreground border-2 border-gold flex flex-col">
              <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-4">
                For Schools & Organizations
              </p>
              <div className="flex flex-col gap-3 mb-6">
                <Button
                  asChild
                  size="lg"
                  className="bg-gold text-primary hover:bg-gold/90 font-semibold w-full"
                >
                  <Link
                    to="/proposal"
                    onClick={() => trackEvent("cta_request_proposal_hero")}
                  >
                    Request a Program Proposal
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-gold text-primary hover:bg-gold hover:text-primary font-semibold w-full bg-transparent"
                >
                  <Link
                    to="/contact"
                    onClick={() => trackEvent("cta_book_fit_call_hero")}
                  >
                    Book a 15-Minute Fit Call
                  </Link>
                </Button>
              </div>
              <ul className="space-y-3 flex-1">
                {[
                  "ADA-certified programming for ages 5–12",
                  "Character development cohort for boys 10–13",
                  "Clear outcomes. Simple implementation.",
                ].map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-foreground/85">
                    <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" strokeWidth={2} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Lane B — For Parents */}
            <Card className="p-8 bg-primary text-primary-foreground border-2 border-primary-foreground/30 flex flex-col">
              <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-4">
                For Parents
              </p>
              <div className="flex flex-col gap-3 mb-6">
                <Button
                  asChild
                  size="lg"
                  className="bg-gold text-primary hover:bg-gold/90 font-semibold w-full"
                >
                  <Link
                    to="/pyg"
                    onClick={() => trackEvent("cta_explore_pyg_hero")}
                  >
                    Explore Poised Young Gentlemen
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-gold text-gold hover:bg-gold hover:text-primary font-semibold w-full bg-transparent"
                >
                  <Link
                    to="/project-power"
                    onClick={() => trackEvent("cta_learn_project_power_hero")}
                  >
                    Learn About Project Power
                  </Link>
                </Button>
              </div>
              <ul className="space-y-3 flex-1">
                {[
                  "Ages 5–12: ADA-certified health & wellness (co-ed)",
                  "Ages 10–13: 12-week character development for boys",
                  "Confidence, discipline, emotional control",
                ].map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-primary-foreground/90">
                    <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" strokeWidth={2} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* PROOF STRIP */}
      <section className="bg-[#0D1B2A] text-primary-foreground py-8 border-y border-gold/30">
        <div className="container mx-auto px-4">
          <h2 className="sr-only">Verified Credentials</h2>
          <ul className="flex flex-col md:flex-row justify-center items-center gap-y-4 md:gap-x-8 text-sm md:text-base text-center">
            {proofItems.map((item) => (
              <li key={item} className="text-gold font-semibold">
                {item}
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
                  <Link to="/proposal" onClick={() => trackEvent(t.event)}>
                    Request a Proposal
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">
            We&apos;ll recommend the right tier after a short fit call.
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

      {/* INSTITUTIONAL CONVERSION SECTION */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary">
              Bring Poised Gentlemen to Your School or Organization
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-4 leading-relaxed">
              We partner with schools, youth organizations, and community programs to deliver character development that sticks. Our programs are structured, measurable, and built for the settings where boys actually are.
            </p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                n: "1",
                title: "Tell us your setting",
                desc: "You submit a proposal request describing your organization and population.",
              },
              {
                n: "2",
                title: "We recommend a program format",
                desc: "We match you with the right program track and delivery model.",
              },
              {
                n: "3",
                title: "We deliver and measure progress",
                desc: "You receive clear reporting your stakeholders can use.",
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

          {/* Program Track Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                label: "Project Power",
                body: "ADA-certified health & wellness programming. Ages 5–12. Co-ed. Per-cohort delivery.",
                event: "cta_request_proposal_project_power",
                cta: "Request a Proposal",
              },
              {
                label: "Poised Young Gentlemen (PYG)",
                body: "12-week character development cohort. Boys 10–13. Maximum 12 participants per cohort.",
                event: "cta_request_proposal_pyg",
                cta: "Request a Proposal",
              },
              {
                label: "Custom Partnership",
                body: "Tailored programming designed around your organization's specific population, setting, and goals.",
                event: "cta_request_proposal_custom",
                cta: "Start a Conversation",
              },
            ].map((c) => (
              <Card
                key={c.label}
                className="p-8 bg-primary text-primary-foreground border-2 border-gold/40 flex flex-col"
              >
                <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-3">
                  {c.label}
                </p>
                <p className="text-sm text-primary-foreground/85 mb-8 flex-1 leading-relaxed">
                  {c.body}
                </p>
                <Button
                  asChild
                  className="bg-gold text-primary hover:bg-gold/90 font-semibold w-full"
                >
                  <Link to="/proposal" onClick={() => trackEvent(c.event)}>
                    {c.cta}
                  </Link>
                </Button>
              </Card>
            ))}
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
