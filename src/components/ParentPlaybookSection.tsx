import { useState } from "react";
import { z } from "zod";
import { Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";

const PDF_URL =
  "https://xxwhtwryyoxlwwwfxido.supabase.co/storage/v1/object/public/Assets/PoisedGentlemen_ParentPlaybook_v2.pdf";

const schema = z.object({
  first_name: z.string().trim().min(1, "First name is required").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
});

const bullets = [
  "How to talk to your son about discipline",
  "Grooming basics that build confidence",
  "Emotional intelligence prompts that actually work",
  "Boundaries that build respect, not resentment",
  "A weekly check-in template based on the Four Pillars",
];

const ParentPlaybookSection = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!consent) {
      setError("Please agree to receive emails to continue.");
      return;
    }

    const parsed = schema.safeParse({ first_name: firstName, email });
    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message ?? "Please check your entries.");
      return;
    }

    setSubmitting(true);
    try {
      // Store in Supabase for attribution
      await supabase.from("email_submissions").insert({
        first_name: parsed.data.first_name,
        email: parsed.data.email,
        category: "parent_playbook",
        source: "homepage_parent_playbook_section",
      });

      // Create HubSpot contact with tag
      const { error: fnError } = await supabase.functions.invoke(
        "hubspot-create-contact",
        {
          body: {
            first_name: parsed.data.first_name,
            email: parsed.data.email,
            tag: "parent_playbook",
          },
        },
      );
      if (fnError) console.warn("HubSpot sync issue:", fnError);

      trackEvent("lead_parent_playbook_submit", {
        event_category: "conversion",
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
    <section id="parent-playbook" className="py-20 md:py-24 bg-[#FAF8F4]">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">
          <div>
            <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-3">
              Free Download
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4 leading-tight">
              Parent Playbook — Free Download
            </h2>
            <p className="text-base text-foreground/75 leading-relaxed mb-6">
              A practical guide for parents of boys ages 5–13. Five tools for building
              confidence, discipline, and emotional intelligence at home.
            </p>
            <ul className="space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex gap-3 text-sm text-foreground/85">
                  <Check
                    className="w-5 h-5 text-gold flex-shrink-0 mt-0.5"
                    strokeWidth={2}
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <Card className="p-8 bg-background border-2 border-border shadow-md">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label
                    htmlFor="pp_first_name"
                    className="text-sm font-semibold text-primary"
                  >
                    First Name
                  </Label>
                  <Input
                    id="pp_first_name"
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
                  <Label
                    htmlFor="pp_email"
                    className="text-sm font-semibold text-primary"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="pp_email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    maxLength={255}
                    className="mt-2"
                  />
                </div>
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="pp_consent"
                    checked={consent}
                    onCheckedChange={(v) => setConsent(v === true)}
                    className="mt-0.5"
                  />
                  <Label
                    htmlFor="pp_consent"
                    className="text-xs text-foreground/75 leading-relaxed font-normal"
                  >
                    I agree to receive emails from Poised Gentlemen. Unsubscribe anytime.
                  </Label>
                </div>

                {error && (
                  <p className="text-sm text-destructive" role="alert">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={submitting}
                  size="lg"
                  className="w-full bg-primary text-gold hover:bg-primary/90 font-semibold"
                >
                  {submitting ? "Sending..." : "Get the Parent Playbook"}
                </Button>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-gold/15 flex items-center justify-center mx-auto mb-5">
                  <Check className="w-7 h-7 text-gold" strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-heading font-bold text-primary mb-2">
                  Check your inbox. Stay Poised.
                </h3>
                <p className="text-sm text-foreground/75 mb-6">
                  Your playbook is ready below.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-gold text-primary hover:bg-gold/90 font-semibold"
                >
                  <a
                    href={PDF_URL}
                    download
                    onClick={() => trackEvent("parent_playbook_download_click")}
                  >
                    <Download className="w-4 h-4" /> Download Your Playbook
                  </a>
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ParentPlaybookSection;
