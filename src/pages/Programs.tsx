import { useEffect } from "react";
import { Link } from "react-router-dom";
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
  HeartPulse,
  TrendingUp,
  Award,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCanonical } from "@/hooks/useCanonical";

const PROGRAMS_DESC =
  "Programs for boys 10–17 — from our ADA-certified Project Power wellness engagements to the PYG character-development cohort and 1-on-1 mentorship. Delivered in New Orleans and beyond.";

const setMeta = (selector: string, attr: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    const [, key, name] = selector.match(/\[(\w+)="([^"]+)"\]/) ?? [];
    if (key && name) el.setAttribute(key, name);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

const Programs = () => {
  useCanonical();

  useEffect(() => {
    document.title = "Programs | Poised Gentlemen";
    setMeta('meta[name="description"]', "content", PROGRAMS_DESC);
    setMeta('meta[property="og:title"]', "content", "Programs | Poised Gentlemen");
    setMeta('meta[property="og:description"]', "content", PROGRAMS_DESC);
    setMeta('meta[property="og:url"]', "content", "https://poisedgentlemen.com/programs/");
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative bg-primary text-primary-foreground py-24 md:py-32">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Programs Built for Real Outcomes
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            From ADA-certified school wellness engagements to our flagship Poised Method™ pilot
            and one-on-one mentorship — structured character development for boys and young men,
            delivered in New Orleans and beyond.
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
            <Badge className="mb-4 bg-gold/10 text-gold border-gold/20">Flagship Wellness Program</Badge>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-6">
              Project Power
            </h2>
            <p className="text-lg text-foreground/85 leading-relaxed mb-10 max-w-3xl">
              An ADA-certified youth health and wellness program — healthy habits, nutrition, physical
              activity, and emotional regulation — delivered by an ADA Project Power Master Trainer,
              integrated with the Poised Gentlemen Four Pillars.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <Card className="p-6 border-2 border-gold/20">
                <HeartPulse className="w-8 h-8 text-gold mb-4" />
                <h3 className="font-heading font-bold text-lg mb-2">ADA-Certified Curriculum</h3>
                <p className="text-sm text-muted-foreground">
                  Evidence-based wellness programming in healthy habits, nutrition, movement, and
                  emotional regulation — delivered with fidelity.
                </p>
              </Card>
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
                  Single engagement or multi-session series. We adapt to your calendar and capacity.
                </p>
              </Card>
            </div>

            <div className="bg-muted rounded-lg p-6 md:p-8 mb-10">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-xl mb-4">Who It Serves</h3>
                  <p className="text-foreground/85 leading-relaxed mb-4">
                    Ages 5–12, co-ed (boys and girls). Deliverable in any school, nonprofit, or
                    community organization as a single engagement or a multi-session series.
                  </p>
                  <h3 className="font-heading font-bold text-xl mb-4">Cost to Your Organization</h3>
                  <p className="text-3xl font-heading font-bold text-gold mb-2">Free</p>
                  <p className="text-foreground/85 leading-relaxed max-w-2xl">
                    Funded through grant and health partnerships. We handle the curriculum,
                    facilitation, and reporting — you handle the room and the participants.
                  </p>
                </div>
              </div>
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
            <Badge className="mb-4 bg-primary text-primary-foreground">Flagship Pilot</Badge>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-6">
              Poised Young Gentlemen — The Poised Method™ Pilot Edition
            </h2>
            <p className="text-lg text-foreground/85 leading-relaxed mb-10 max-w-3xl">
              A 12-week school pilot: 24 sessions over 12 weeks (~4 hours/week). Cohorts of 8–12 boys,
              ages 10–13, at a strict 12:1 mentor-to-participant ratio. A trademark-protected preview
              of The Poised Method™ — full program fidelity, focused runway. It is a preview of the
              Method, never the Method itself.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <Card className="p-6 border-2 border-primary/20">
                <Users className="w-8 h-8 text-gold mb-4" />
                <h3 className="font-heading font-bold text-lg mb-2">Cohort Structure</h3>
                <p className="text-sm text-muted-foreground">
                  8–12 boys per cohort. Ages 10–13. Strict 12:1 mentor-to-participant ratio for
                  intensive, individualized growth.
                </p>
              </Card>
              <Card className="p-6 border-2 border-primary/20">
                <Award className="w-8 h-8 text-gold mb-4" />
                <h3 className="font-heading font-bold text-lg mb-2">Integrated System</h3>
                <p className="text-sm text-muted-foreground">
                  Built on the Four Pillars: The Poised Method™ and the Young-G Protocol™, with
                  an embedded Strength-pillar engine.
                </p>
              </Card>
              <Card className="p-6 border-2 border-primary/20">
                <TrendingUp className="w-8 h-8 text-gold mb-4" />
                <h3 className="font-heading font-bold text-lg mb-2">Measured Progress</h3>
                <p className="text-sm text-muted-foreground">
                  The Poised Relational Index (PRI v2.0) at baseline, a Week-7 midpoint snapshot,
                  and final — schools see proof mid-pilot, not just at graduation.
                </p>
              </Card>
            </div>

            <div className="bg-background rounded-lg p-6 md:p-8 mb-10 border border-border">
              <h3 className="font-heading font-bold text-xl mb-6">Five-Phase Transformation Arc</h3>
              <div className="space-y-5">
                {[
                  {
                    phase: "DISARM",
                    desc: "Brotherhood, safety, and baseline — establishing trust and shared purpose before growth work begins.",
                  },
                  {
                    phase: "INSTALL",
                    desc: "The Four Pillars as daily practice. The Starter Kit Ceremony marks commitment to the journey ahead.",
                  },
                  {
                    phase: "ALIGN",
                    desc: "Body–mind alignment — integrating physical awareness, emotional regulation, and intentional action.",
                  },
                  {
                    phase: "INTEGRATE",
                    desc: "Leadership, ownership, and participant-led rituals — boys begin modeling the work for each other.",
                  },
                  {
                    phase: "MIRROR",
                    desc: "Archetype Reveal, family showcase, and the Brotherhood Oath — a public rite of passage that anchors transformation.",
                  },
                ].map(({ phase, desc }) => (
                  <div key={phase} className="flex items-start gap-4">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-heading font-bold text-sm shrink-0">
                      {phase[0]}
                    </span>
                    <div>
                      <h4 className="font-heading font-bold text-lg text-primary">{phase}</h4>
                      <p className="text-sm text-foreground/80 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary/5 rounded-lg p-6 md:p-8 mb-10 border border-primary/10">
              <h3 className="font-heading font-bold text-xl mb-4">Pilot-to-Contract Pathway</h3>
              <p className="text-foreground/85 leading-relaxed max-w-3xl mb-4">
                100% of the pilot fee credits toward a full 36-week contract signed within 60 days,
                with G-Level continuity and priority scheduling.
              </p>
              <p className="text-sm text-muted-foreground">
                Outcomes are framed as supported associations, not clinical claims.
              </p>
            </div>

            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            >
              <Link to="/contact/?inquiry=pyg">
                Bring the PYG Pilot to Your School
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
              Individual sessions for boys who need direct, one-on-one guidance. Whether your son
              is navigating a specific challenge or simply needs a consistent male role model
              outside the home, our mentors provide structured, judgment-free support.
            </p>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-4xl md:text-5xl font-heading font-bold text-gold">$75</span>
              <span className="text-lg text-muted-foreground">/ session</span>
            </div>

            <p className="text-sm text-muted-foreground mb-10">
              For parents and guardians.
            </p>

            <Button
              asChild
              size="lg"
              className="bg-gold text-primary hover:bg-gold/90 font-semibold"
            >
              <a href="https://cal.com/david-rachal-iii" target="_blank" rel="noopener noreferrer">
                Book a Mentorship Session
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
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
