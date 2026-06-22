import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Users,
  User,
  Briefcase,
  Rocket,
  MapPin,
  Clock,
  CheckCircle,
  ArrowRight,
  FileText,
  GraduationCap,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCanonical } from "@/hooks/useCanonical";

const Programs = () => {
  useCanonical();

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Programs | Poised Gentlemen</title>
        <meta
          name="description"
          content="Youth character development programs for boys 10–17 — from ADA-certified school engagements to 1-on-1 mentorship. Delivered in New Orleans and beyond."
        />
        <meta property="og:title" content="Programs | Poised Gentlemen" />
        <meta
          property="og:description"
          content="Youth character development programs for boys 10–17 — from ADA-certified school engagements to 1-on-1 mentorship. Delivered in New Orleans and beyond."
        />
        <meta property="og:url" content="https://poisedgentlemen.com/programs/" />
      </Helmet>

      <Header />

      {/* Hero */}
      <section className="relative bg-primary text-primary-foreground py-24 md:py-32">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Programs Built for Real Outcomes
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            From ADA-certified school engagements to one-on-one mentorship — structured
            character development for boys ages 10–17, delivered at no cost to schools and
            nonprofits through our grant and health-partner relationships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-gold text-primary hover:bg-gold/90 font-semibold w-full sm:w-auto"
            >
              <Link to="/schools/">Bring a Program to Your Organization</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/40 text-white hover:bg-white hover:text-primary w-full sm:w-auto"
            >
              <Link to="/schools/one-pager/">Download the One-Pager</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 1 — PROJECT POWER */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Badge className="mb-4 bg-gold/10 text-gold border-gold/20">Flagship Program</Badge>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-6">
              Project Power
            </h2>
            <p className="text-lg text-foreground/85 leading-relaxed mb-10 max-w-3xl">
              Our most accessible entry point. An ADA-certified character development program
              designed for boys ages 10–17 — deliverable in any school, nonprofit, or community
              organization as a single engagement or a multi-session series.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <Card className="p-6 border-2 border-gold/20">
                <MapPin className="w-8 h-8 text-gold mb-4" />
                <h3 className="font-heading font-bold text-lg mb-2">Any Setting</h3>
                <p className="text-sm text-muted-foreground">
                  Schools, community centers, faith-based organizations, or youth nonprofits —
                  we bring the curriculum to you.
                </p>
              </Card>
              <Card className="p-6 border-2 border-gold/20">
                <Clock className="w-8 h-8 text-gold mb-4" />
                <h3 className="font-heading font-bold text-lg mb-2">Flexible Format</h3>
                <p className="text-sm text-muted-foreground">
                  Single workshop or multi-session series. We adapt to your calendar and
                  capacity.
                </p>
              </Card>
              <Card className="p-6 border-2 border-gold/20">
                <Shield className="w-8 h-8 text-gold mb-4" />
                <h3 className="font-heading font-bold text-lg mb-2">Four Pillars Aligned</h3>
                <p className="text-sm text-muted-foreground">
                  Every session maps to Integrity, Strength, Emotional Intelligence, and
                  Discipline — our evidence-informed framework.
                </p>
              </Card>
            </div>

            <div className="bg-muted rounded-lg p-6 md:p-8 mb-10">
              <h3 className="font-heading font-bold text-xl mb-4">Cost to Your Organization</h3>
              <p className="text-3xl font-heading font-bold text-gold mb-2">Free</p>
              <p className="text-foreground/85 leading-relaxed max-w-2xl">
                Funded through our grant and health-partner relationships. We handle the
                curriculum, facilitation, and reporting — you handle the room and the boys.
              </p>
            </div>

            <Button
              asChild
              size="lg"
              className="bg-gold text-primary hover:bg-gold/90 font-semibold"
            >
              <Link to="/schools/">
                Bring Project Power to Your Organization
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 2 — POISED YOUNG GENTLEMEN */}
      <section className="py-20 md:py-28 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Badge className="mb-4 bg-primary text-primary-foreground">Cohort-Based</Badge>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-6">
              Poised Young Gentlemen
            </h2>
            <p className="text-lg text-foreground/85 leading-relaxed mb-10 max-w-3xl">
              A multi-week cohort program built on mentorship and the Four Pillars. Delivered in
              partnership with schools and youth organizations, PYG creates a structured
              environment where boys grow alongside peers — and alongside men who model what
              they are becoming.
            </p>

            <div className="space-y-4 mb-10 max-w-3xl">
              {[
                "Weekly group sessions with trained facilitators",
                "Mentor matching and one-on-one check-ins",
                "Rites of passage and public recognition",
                "Parent engagement and progress reporting",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-foreground/85">{item}</span>
                </div>
              ))}
            </div>

            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            >
              <Link to="/contact/?inquiry=pyg">
                Partner for PYG
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 3 — 1-ON-1 MENTORSHIP */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Badge className="mb-4 bg-gold/10 text-gold border-gold/20">For Parents</Badge>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-6">
              1-on-1 Mentorship
            </h2>
            <p className="text-lg text-foreground/85 leading-relaxed mb-8 max-w-3xl">
              Individual sessions for boys who need direct, one-on-one guidance. Whether your
              son is navigating a specific challenge or simply needs a consistent male role
              model outside the home, our mentors provide structured, judgment-free support.
            </p>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-4xl md:text-5xl font-heading font-bold text-gold">$75</span>
              <span className="text-lg text-muted-foreground">/ session</span>
            </div>

            <p className="text-sm text-muted-foreground mb-10">
              Designed for parents and guardians seeking intentional mentorship for their son.
            </p>

            <Button
              asChild
              size="lg"
              className="bg-gold text-primary hover:bg-gold/90 font-semibold"
            >
              <a href="#" target="_blank" rel="noopener noreferrer">
                Book a Mentorship Session
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              Cal.com booking integration coming soon. Contact us directly in the meantime.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4 — ADULT COACHING */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Badge className="mb-4 bg-gold text-primary">For Adult Men</Badge>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
              Adult Coaching
            </h2>
            <p className="text-lg text-primary-foreground/90 leading-relaxed mb-8 max-w-3xl">
              Personal development coaching for adult men seeking clarity, accountability, and
              growth in leadership, fatherhood, and emotional intelligence. Built on the same
              Four Pillars that guide our youth programs — now applied to the complexities of
              adult life.
            </p>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/40 text-white hover:bg-white hover:text-primary"
            >
              <Link to="/contact/">
                Learn More
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 5 — IN DEVELOPMENT */}
      <section className="py-20 md:py-28 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Coming Soon</Badge>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-6">
              In Development
            </h2>
            <p className="text-lg text-foreground/85 leading-relaxed mb-10 max-w-3xl">
              New initiatives expanding our reach and deepening our impact.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <Rocket className="w-8 h-8 text-gold mb-4" />
                <h3 className="font-heading font-bold text-xl mb-2">LYFE Program</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  In partnership with United Way SELA — a layered youth and family engagement
                  initiative bringing character development, mentorship, and resource navigation
                  into schools and community hubs.
                </p>
                <span className="text-xs font-semibold text-gold uppercase tracking-wide">
                  Partnership: United Way SELA
                </span>
              </Card>
              <Card className="p-6">
                <GraduationCap className="w-8 h-8 text-gold mb-4" />
                <h3 className="font-heading font-bold text-xl mb-2">Poised Pathfinders</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  A guided pathway for young men transitioning from youth programs into adult
                  mentorship, career readiness, and community leadership — ensuring continuity
                  from boyhood to manhood.
                </p>
                <span className="text-xs font-semibold text-gold uppercase tracking-wide">
                  In early design
                </span>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Partner CTA Banner */}
      <section className="py-20 md:py-28 bg-gold text-primary">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-8 leading-tight">
            Ready to Bring Character Development to Your Organization?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold w-full sm:w-auto"
            >
              <Link to="/schools/one-pager/">
                <FileText className="w-4 h-4 mr-2" />
                Download Our One-Pager
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full sm:w-auto"
            >
              <Link to="/contact/">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Programs;
