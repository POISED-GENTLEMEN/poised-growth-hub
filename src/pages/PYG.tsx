import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCanonical } from "@/hooks/useCanonical";
import { trackEvent } from "@/lib/analytics";

const PYG = () => {
  useCanonical();

  const highlights = [
    "12-week structured cohort",
    "Boys ages 10–13",
    "Small group format (8–12 boys, 12:1 ratio)",
    "Built on the Four Pillars: Integrity, Strength, Emotional Intelligence, Discipline",
    "Measured with the Poised Relational Index",
    "Family Showcase at completion",
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Poised Young Gentlemen (PYG) | Poised Gentlemen</title>
        <meta
          name="description"
          content="Poised Young Gentlemen is a 12-week character development cohort for boys ages 10–13. Small groups, structured curriculum, measurable outcomes."
        />
      </Helmet>
      <Header />

      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-sm uppercase tracking-widest text-gold font-semibold mb-4">
            Flagship Cohort Program
          </p>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Poised Young Gentlemen
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
            A 12-week character development cohort for boys ages 10–13. Built for small groups.
            Built for lasting change.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-8 text-center">
            What's Included
          </h2>
          <Card className="p-8 border-2">
            <ul className="space-y-4">
              {highlights.map((h) => (
                <li key={h} className="flex gap-3 text-foreground/85">
                  <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" strokeWidth={2} />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-6">
            Bring PYG to Your School or Organization
          </h2>
          <Button
            asChild
            size="lg"
            className="bg-gold text-primary hover:bg-gold/90 font-semibold"
          >
            <Link
              to="/request-proposal"
              onClick={() => trackEvent("cta_request_proposal_pyg")}
            >
              Request a Program Proposal
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PYG;
