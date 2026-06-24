import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { z } from "zod";
import { Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCanonical } from "@/hooks/useCanonical";
import { trackEvent } from "@/lib/analytics";
import { supabase } from "@/integrations/supabase/client";

const PDF_URL = "https://xxwhtwryyoxlwwwfxido.supabase.co/storage/v1/object/public/Assets/PoisedGentlemen_ParentPlaybook_v2.pdf";

const REFERRAL_OPTIONS = [
  "United Way SELA",
  "Son of a Saint",
  "AmeriHealth Caritas",
  "Google Search",
  "Social Media",
  "Word of Mouth",
  "A Friend or Colleague",
  "Other",
];

const schema = z.object({
  first_name: z.string().trim().min(1, "First name is required").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  referral_source: z.string().min(1, "Please tell us how you heard about us"),
});

const insideItems = [
  {
    title: "The Discipline Conversation",
    desc: "How to talk to your son in a way he'll actually hear.",
  },
  {
    title: "Self-Presentation",
    desc: "Grooming habits, digital identity, and how he shows up in the world.",
  },
  {
    title: "Building Emotional Intelligence",
    desc: "Prompts and frameworks that open him up, not shut him down.",
  },
  {
    title: "Boundaries That Build Respect",
    desc: "The difference between rules and values.",
  },
  {
    title: "The Weekly Check-In",
    desc: "A 10-minute ritual that keeps you connected and keeps him growing.",
  },
];

const Playbook = () => {
  useCanonical();

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [referral, setReferral] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const parsed = schema.safeParse({
      first_name: firstName,
      email,
      referral_source: referral,
    });
    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message ?? "Please check your entries.");
      return;
    }

    setSubmitting(true);
    try {
      const { error: dbError } = await supabase.from("email_submissions").insert({
        first_name: parsed.data.first_name,
        email: parsed.data.email,
        category: "playbook-download",
        source: parsed.data.referral_source,
      });
      if (dbError) throw dbError;

      trackEvent("playbook_download_submit", {
        event_category: "conversion",
        referral_source: parsed.data.referral_source,
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>The Parent's Playbook | Poised Gentlemen</title>
        <meta
          name="description"
          content="Free download: Raising Poised Young Gentlemen — A Parent's Playbook. Five practical tools for raising confident, disciplined, emotionally intelligent boys."
        />
      </Helmet>
      <Header />

      {/* HERO */}
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-4">
            Free Resource
          </p>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">
            Raising Poised Young Gentlemen
          </h1>
          <p className="text-xl md:text-2xl italic font-heading text-primary-foreground/90 mb-6">
            A Parent's Playbook
          </p>
          <p className="text-base text-primary-foreground/70 leading-relaxed max-w-2xl mx-auto">
            Five practical tools for raising confident, disciplined, emotionally intelligent
            boys. Written for the parent who shows up — consistently.
          </p>
          <a
            href="#get-the-playbook"
            className="inline-block mt-10 text-gold text-sm uppercase tracking-widest hover:text-gold/80"
          >
            ↓ Get it below
          </a>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="py-20 md:py-24 bg-[#FAF8F4]">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-3 text-center">
            What You'll Get
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary text-center mb-12">
            Inside the Playbook
          </h2>
          <ol className="space-y-8">
            {insideItems.map((item, i) => (
              <li key={item.title} className="flex gap-5">
                <span className="text-3xl md:text-4xl font-heading font-bold text-gold leading-none flex-shrink-0 w-10">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg md:text-xl font-heading font-bold text-primary mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-foreground/75 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CAPTURE FORM */}
      <section id="get-the-playbook" className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-4 text-center">
            Get the Playbook Free
          </p>
          <h2 className="sr-only">Download the Parent's Playbook</h2>
          <Card className="max-w-[480px] mx-auto p-8 bg-background border-2 border-border shadow-md">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="first_name" className="text-sm font-semibold text-primary">
                    First Name
                  </Label>
                  <Input
                    id="first_name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Your first name"
                    required
                    maxLength={100}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-semibold text-primary">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    maxLength={255}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="referral" className="text-sm font-semibold text-primary">
                    How did you hear about us?
                  </Label>
                  <Select value={referral} onValueChange={setReferral}>
                    <SelectTrigger id="referral" className="mt-2">
                      <SelectValue placeholder="Select one..." />
                    </SelectTrigger>
                    <SelectContent>
                      {REFERRAL_OPTIONS.map((o) => (
                        <SelectItem key={o} value={o}>
                          {o}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {error && (
                  <p className="text-sm text-destructive" role="alert">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary text-gold hover:bg-primary/90 font-semibold"
                  size="lg"
                >
                  {submitting ? "Downloading..." : "Download the Playbook →"}
                </Button>
                <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                  No spam. Unsubscribe anytime. Your information is never sold.
                </p>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-gold/15 flex items-center justify-center mx-auto mb-5">
                  <Check className="w-7 h-7 text-gold" strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-heading font-bold text-primary mb-2">
                  You're all set.
                </h3>
                <p className="text-sm text-foreground/75 mb-6">
                  Your playbook is ready. Click below to download.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-gold text-primary hover:bg-gold/90 font-semibold"
                >
                  <a
                    href={PDF_URL}
                    download
                    onClick={() => trackEvent("playbook_download_click")}
                  >
                    <Download className="w-4 h-4" /> Download Now
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground mt-4">
                  A copy is also on its way to your inbox.
                </p>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* SOCIAL PROOF BAR */}
      <section className="bg-primary py-6 border-y border-gold/30">
        <div className="container mx-auto px-4">
          <h2 className="sr-only">Trust signals</h2>
          <p className="text-center text-sm md:text-base text-gold font-semibold tracking-wide">
            60+ Boys Served · 3 Active Partnerships · Library of Congress · ADA-Certified Programs
          </p>
        </div>
      </section>

      {/* PROGRAMS CTA */}
      <section className="py-20 md:py-24 bg-[#FAF8F4]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-3">
              Ready to Go Further
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary max-w-3xl mx-auto leading-tight">
              The playbook is the foundation. The program is the transformation.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <Card className="p-8 bg-background border-l-4 border-l-gold border-y border-r border-border">
              <h3 className="text-xl font-heading font-bold text-primary mb-2">
                Project Power
              </h3>
              <p className="text-sm text-foreground/75 leading-relaxed">
                ADA-certified health & wellness · Ages 5–12 · Co-ed
              </p>
            </Card>
            <Card className="p-8 bg-background border-l-4 border-l-gold border-y border-r border-border">
              <h3 className="text-xl font-heading font-bold text-primary mb-2">
                Poised Young Gentlemen
              </h3>
              <p className="text-sm text-foreground/75 leading-relaxed">
                12-week character development cohort · Boys 10–13 · Max 12 per cohort
              </p>
            </Card>
          </div>
          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-primary text-gold hover:bg-primary/90 font-semibold"
            >
              <Link
                to="/request-proposal"
                onClick={() => trackEvent("cta_request_proposal_playbook")}
              >
                Bring Poised Gentlemen to Your School or Org →
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Playbook;
