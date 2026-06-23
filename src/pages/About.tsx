import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Dumbbell, Brain, Target } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCanonical } from "@/hooks/useCanonical";
import dr3Headshot from "@/assets/dr3-headshot.png";

const About = () => {
  useCanonical();

  const pillars = [
    {
      icon: Shield,
      title: "Integrity",
      desc: "Character over convenience — doing what is right when no one is watching. It is the foundation of trust, and trust is the currency of every relationship a man will build.",
    },
    {
      icon: Dumbbell,
      title: "Strength",
      desc: "Mental, emotional, and physical resilience built through consistent practice. Strength is not domination — it is the capacity to carry responsibility without breaking.",
    },
    {
      icon: Brain,
      title: "Emotional Intelligence",
      desc: "Self-awareness, regulation, and the ability to lead from clarity. A boy who can name what he feels and choose his response becomes a man others can rely on.",
    },
    {
      icon: Target,
      title: "Discipline",
      desc: "Consistency over motivation — the daily rituals that compound into character. Discipline is what remains when inspiration fades and the work still needs doing.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>About | Poised Gentlemen</title>
        <meta
          name="description"
          content="The story behind Poised Gentlemen — a builder, a mission, and a framework for turning boys into men of character."
        />
        <link rel="canonical" href="https://poisedgentlemen.com/about" />
        <meta property="og:title" content="About | Poised Gentlemen" />
        <meta
          property="og:description"
          content="The story behind Poised Gentlemen — a builder, a mission, and a framework for turning boys into men of character."
        />
        <meta property="og:url" content="https://poisedgentlemen.com/about" />
      </Helmet>

      <Header />

      {/* HERO */}
      <section className="relative bg-primary text-primary-foreground py-24 md:py-32">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            A Builder and a Disruptor
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Building men while disrupting the patterns that broke them.
          </p>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-4">
                Founder & CEO, Rise to Purpose LLC
              </p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
                David Rachal III
              </h2>
              <div className="space-y-5 text-foreground/85 leading-relaxed">
                <p>
                  David Rachal III (DR3) is not here to tell stories. He is here to build systems
                  that turn boys into men of character — and to disrupt the cycles that leave young
                  men untrained, unsupported, and underestimated.
                </p>
                <p>
                  As an <strong>ADA Master Trainer</strong>, he has delivered certified wellness
                  programming to schools and community organizations across New Orleans and beyond. As
                  the author of the <strong>Poised Gentlemen Codex</strong> — a Library of
                  Congress-cataloged framework — he has codified the Four Pillars into a teachable,
                  repeatable system that holds up under real pressure.
                </p>
                <p>
                  New Orleans is not just where he works. It is where the standard was set — a city
                  of culture, pressure, pride, and presence. If a boy can learn to carry himself with
                  integrity here, he can carry himself anywhere.
                </p>
                <p className="text-xl font-semibold text-primary border-l-4 border-gold pl-4 py-2">
                  This is not biography. It is credibility.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src={dr3Headshot}
                alt="David Rachal III, Founder & CEO of Rise to Purpose LLC"
                className="rounded-2xl max-w-md w-full border-4 border-gold shadow-[0_0_40px_rgba(212,175,55,0.35)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* THE TWO ENTITIES */}
      <section className="py-20 md:py-24 bg-muted">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-4">
              The Two Entities
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              One mission. Two structures. Each serving a different lane of access.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 md:p-10 border-2 border-gold/30 hover:border-gold transition-colors">
              <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                Rise to Purpose LLC
              </h3>
              <p className="text-sm uppercase tracking-wider text-gold font-semibold mb-6">
                The For-Profit Delivery Arm
              </p>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Rise to Purpose LLC is the for-profit delivery arm of Poised Gentlemen. It
                  contracts with schools, nonprofits, health organizations, and government programs
                  to deliver character-development and ADA-certified wellness programming.
                </p>
                <p>
                  Host organizations pay nothing. Programming is funded through stipends from grant
                  and health-partner relationships — making it possible for under-resourced schools
                  and community groups to receive structured character development they could not
                  otherwise afford.
                </p>
                <p className="text-foreground font-medium">
                  If you are a school administrator, counselor, or community leader, this is your
                  entry point.
                </p>
              </div>
            </Card>

            <Card className="p-8 md:p-10 border-2 border-primary/20 hover:border-primary transition-colors">
              <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                Poised Gentlemen Institute (PGI)
              </h3>
              <p className="text-sm uppercase tracking-wider text-gold font-semibold mb-6">
                The Nonprofit Arm — In Formation
              </p>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Poised Gentlemen Institute is our nonprofit arm, currently in formation. PGI
                  exists to expand access to character development programming through grants,
                  donations, and fiscal partnerships — ensuring that no boy is excluded because of
                  where he lives or what his school can afford.
                </p>
                <p>
                  PGI partners with United Way SELA as fiscal partner for the LYFE program,
                  broadening the reach of social-emotional learning and wellness initiatives
                  throughout Southeast Louisiana.
                </p>
                <p className="text-foreground font-medium">
                  If you are a funder, donor, or mission-aligned organization, this is your
                  entry point.
                </p>
              </div>
            </Card>
          </div>
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
              The framework that shapes every program, product, and principle we stand on.
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

      {/* MISSION STATEMENT */}
      <section className="py-20 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-6">Mission</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 leading-tight">
            What Changes for a Boy Who Completes a Poised Gentlemen Program
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
            We serve boys ages 10–17 in under-resourced schools and communities — the boys who are
            often written off before they are ever trained. A boy who completes a Poised Gentlemen
            program does not walk away with a certificate. He walks away with a default setting:
            composure under pressure, clarity in conflict, and the quiet confidence that comes from
            knowing who he is and what he stands for. He has been taught — not told — how to lead
            himself. And when a boy learns to lead himself, he becomes the kind of man others can
            follow.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 md:py-28 bg-gold text-primary">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 leading-tight">
            Ready to Partner With Us?
          </h2>
          <p className="text-lg md:text-xl text-primary/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Bring ADA-certified wellness and character-development programming to your school or
            organization — at no cost to your budget.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          >
            <Link to="/schools/">Partner With Us</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
