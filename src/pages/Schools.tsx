import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CheckCircle,
  Shield,
  Users,
  Clock,
  FileText,
  ArrowRight,
  HeartPulse,
  GraduationCap,
  Award,
  BookOpen,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCanonical } from "@/hooks/useCanonical";
import HowItWorks from "@/components/HowItWorks";

const DESC =
  "Bring free, ADA-certified Project Power wellness programming to your school — plus our flagship Poised Method™ character pilot. Project Power is fully grant-funded; no cost to host.";

const setMeta = (selector: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    const m = selector.match(/\[(\w+)="([^"]+)"\]/);
    if (m) el.setAttribute(m[1], m[2]);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
};

const PrimaryCTA = () => (
  <div className="flex flex-col sm:flex-row gap-4 justify-center">
    <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
      <Link to="/schools/one-pager/">
        <FileText className="mr-2 h-5 w-5" />
        Download Our One-Pager
      </Link>
    </Button>
    <Button asChild size="lg" variant="outline">
      <Link to="/contact/">Contact Us Directly</Link>
    </Button>
  </div>
);

const Schools = () => {
  useCanonical("/schools/");

  useEffect(() => {
    document.title = "School & Organization Programs | Poised Gentlemen";
    setMeta('meta[name="description"]', DESC);
    setMeta('meta[property="og:title"]', "School & Organization Programs | Poised Gentlemen");
    setMeta('meta[property="og:description"]', DESC);
    setMeta('meta[property="og:url"]', "https://poisedgentlemen.com/schools/");
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-24 md:py-32">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Programs That Build Boys Into Young Men — Starting at No Cost
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            A youth mentorship program serving New Orleans and beyond — a character
            development program for schools, after-school programs, and nonprofits.
            ADA-certified wellness programming at no cost to your organization.
          </p>
          <PrimaryCTA />
        </div>
      </section>

      <HowItWorks />

      {/* Outcomes */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
            What Outcomes Change for Boys
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Our emotional intelligence program for boys is built around the Four
            Pillars — Integrity, Strength, Emotional Intelligence, and Discipline.
            Boys leave with measurable, documented growth.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                pillar: "Emotional Intelligence",
                text: "Boys complete the program with improved self-regulation, vocabulary for naming emotion, and documented conflict-resolution skills.",
              },
              {
                pillar: "Integrity",
                text: "Participants articulate a written personal code and demonstrate accountability through structured peer and facilitator review.",
              },
              {
                pillar: "Discipline",
                text: "Cohorts show measurable improvement in attendance, follow-through on commitments, and self-directed routine across the 12-week arc.",
              },
              {
                pillar: "Strength",
                text: "Boys exit with a documented sense of personal identity, a clearer answer to 'who am I becoming,' and tools to stand under social pressure.",
              },
            ].map((o) => (
              <Card key={o.pillar} className="p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2">
                      {o.pillar}
                    </h3>
                    <p className="text-muted-foreground">{o.text}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it runs */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
            How the Programs Run
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8">
              <HeartPulse className="h-10 w-10 text-secondary mb-4" />
              <h3 className="font-heading font-bold text-2xl mb-3">Project Power</h3>
              <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wide">
                ADA-Certified Wellness · Ages 5–12 · Co-Ed
              </p>
              <p className="mb-4">
                Delivered as a single engagement or short multi-session series.
                In-person, group-facilitated, age-appropriate by design.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2"><CheckCircle className="h-4 w-4 text-secondary mt-1 flex-shrink-0" /> Certified ADA Project Power Master Trainer on site</li>
                <li className="flex gap-2"><CheckCircle className="h-4 w-4 text-secondary mt-1 flex-shrink-0" /> Materials and curriculum provided</li>
                <li className="flex gap-2"><CheckCircle className="h-4 w-4 text-secondary mt-1 flex-shrink-0" /> Structured supervision and small-group ratios</li>
              </ul>
            </Card>

            <Card className="p-8 border-secondary/40">
              <GraduationCap className="h-10 w-10 text-secondary mb-4" />
              <h3 className="font-heading font-bold text-2xl mb-3">
                PYG — The Poised Method™ Pilot
              </h3>
              <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wide">
                Character Development · Boys 10–13 · Strict 12:1 Ratio
              </p>
              <p className="mb-4">
                A 12-week school pilot — 24 sessions, ~4 hours per week, cohorts of
                8–12 boys, across our five-phase transformation arc.
              </p>
              <div className="flex flex-wrap gap-2 mb-4 text-xs font-semibold">
                {["DISARM", "INSTALL", "ALIGN", "INTEGRATE", "MIRROR"].map((p) => (
                  <span key={p} className="px-2 py-1 bg-primary text-primary-foreground rounded">
                    {p}
                  </span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Mentorship program for middle school boys, built for sustained
                behavior change — not one-off assemblies.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Cost - PROMINENT */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Award className="h-12 w-12 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
            Zero Cost to Your School or Organization
          </h2>
          <p className="text-lg md:text-xl mb-6 leading-relaxed">
            There is <strong>no cost</strong> to your school or organization for
            Project Power. It's funded through our partnerships with the{" "}
            <strong>American Diabetes Association</strong> and other health and
            grant organizations.
          </p>
          <p className="text-lg mb-8 opacity-90">
            <strong>Your role:</strong> provide the space and the participants.
            <br />
            <strong>We bring:</strong> the program, the facilitator, and the
            materials — fully funded.
          </p>
          <p className="text-sm opacity-80 mb-8 italic">
            (Our flagship PYG pilot is a separate, paid program — ask us about it.)
          </p>
          <Button asChild size="lg" variant="outline" className="bg-background text-foreground">
            <Link to="/schools/one-pager/">
              Download Our One-Pager
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
            Who We Serve
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Schools (public, charter, parochial, independent)",
              "After-school programs",
              "Nonprofits serving youth",
              "Health and wellness organizations",
              "Government and community initiatives",
              "Faith-based youth programs",
            ].map((w) => (
              <div key={w} className="flex gap-3 items-start p-4 bg-muted/30 rounded">
                <Users className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <span>{w}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-start gap-4">
            <Shield className="h-10 w-10 text-secondary flex-shrink-0" />
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                Safety & Compliance
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Facilitated by a <strong>certified ADA Project Power Master
                Trainer</strong>. Age-appropriate by design: Project Power wellness
                for ages 5–12 (co-ed); the PYG character-development pilot for boys
                ages 10–13 at a strict 12:1 ratio. Small-group ratios and
                structured supervision throughout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
            Questions from School & Program Leaders
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="cost">
              <AccordionTrigger>What does it cost?</AccordionTrigger>
              <AccordionContent>
                Zero. Project Power is fully grant-funded through the American
                Diabetes Association and partner health organizations. There is no
                fee to your school or organization. (Our flagship PYG pilot is a
                separate, paid program.)
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="length">
              <AccordionTrigger>How long is the program?</AccordionTrigger>
              <AccordionContent>
                Project Power runs as a single engagement or a short multi-session
                series, scoped to your calendar. PYG runs as a 12-week pilot
                totaling roughly 4 hours per week.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="session">
              <AccordionTrigger>What does a typical session look like?</AccordionTrigger>
              <AccordionContent>
                In-person, group-facilitated, structured around a wellness or
                character-development objective. A certified trainer leads each
                session with full materials provided.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="size">
              <AccordionTrigger>How many students can participate?</AccordionTrigger>
              <AccordionContent>
                Project Power scales by site. PYG cohorts are deliberately small —
                8 to 12 boys at a strict 12:1 ratio to preserve depth.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="hours">
              <AccordionTrigger>Can we run it during school hours?</AccordionTrigger>
              <AccordionContent>
                Yes. We deliver during school hours, after school, or in weekend
                community settings depending on your context.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="materials">
              <AccordionTrigger>What materials are provided?</AccordionTrigger>
              <AccordionContent>
                All curriculum, facilitator guides, and participant materials are
                included. You provide the space and the participants; we bring
                everything else.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="outcomes">
              <AccordionTrigger>How do we measure outcomes?</AccordionTrigger>
              <AccordionContent>
                We use pre/post indicators tied to the Four Pillars, facilitator
                observation notes, and partner-organization reporting templates
                where applicable. A summary is shared with site leadership.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8">
            Trusted Partnerships
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <p className="font-heading font-bold text-lg">American Diabetes Association</p>
              <p className="text-sm text-muted-foreground mt-1">Project Power certification & funding partner</p>
            </Card>
            <Card className="p-6">
              <p className="font-heading font-bold text-lg">United Way SELA</p>
              <p className="text-sm text-muted-foreground mt-1">LYFE Program partner</p>
            </Card>
            <Card className="p-6">
              <BookOpen className="h-6 w-6 text-secondary mx-auto mb-2" />
              <p className="font-heading font-bold text-lg">The Codex</p>
              <p className="text-sm text-muted-foreground mt-1">
                <Link to="/codex" className="hover:underline">Library of Congress–referenced</Link>
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Ready to Bring This to Your School?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Download the one-pager to share with your leadership team — or reach
            out directly. We respond within one business day.
          </p>
          <PrimaryCTA />
          <p className="mt-8 text-sm opacity-75">
            Looking for the full program catalog? Visit{" "}
            <Link to="/programs/" className="underline">our programs page</Link>.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Schools;
