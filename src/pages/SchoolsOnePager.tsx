import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { CheckCircle, FileText, Award, BookOpen, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedLinks from "@/components/RelatedLinks";
import { useCanonical } from "@/hooks/useCanonical";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import onePagerAsset from "@/assets/schools-one-pager.pdf.asset.json";

const DESC =
  "Download a one-page overview of Poised Gentlemen programs for schools and youth organizations — featuring Project Power, ADA-certified and delivered at no cost to your organization.";

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

const schema = z.object({
  firstName: z.string().trim().min(1, "First name required").max(100),
  organization: z.string().trim().min(1, "Organization required").max(200),
  email: z.string().trim().email("Valid email required").max(255),
  role: z.string().min(1, "Please select a role"),
});

const SchoolsOnePager = () => {
  useCanonical("/schools/one-pager/");
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Get the Poised Gentlemen One-Pager | Schools & Organizations";
    setMeta('meta[name="description"]', DESC);
    setMeta('meta[property="og:title"]', "Get the Poised Gentlemen One-Pager");
    setMeta('meta[property="og:description"]', DESC);
    setMeta('meta[property="og:url"]', "https://poisedgentlemen.com/schools/one-pager/");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ firstName, organization, email, role });
    if (!parsed.success) {
      toast({
        title: "Please check the form",
        description: parsed.error.issues[0]?.message ?? "Invalid input",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("email_submissions").insert({
        email: parsed.data.email,
        first_name: parsed.data.firstName,
        category: "schools-one-pager",
        source: JSON.stringify({
          organization: parsed.data.organization,
          role: parsed.data.role,
        }),
      });
      if (error) throw error;

      const submissionId = `${Date.now()}-${parsed.data.email}`;
      const pdfUrl = `${window.location.origin}${onePagerAsset.url}`;

      // Email the requester the PDF link (don't block UX on email failure)
      void supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "schools-one-pager-delivery",
          recipientEmail: parsed.data.email,
          idempotencyKey: `schools-one-pager-delivery-${submissionId}`,
          templateData: {
            firstName: parsed.data.firstName,
            organization: parsed.data.organization,
            pdfUrl,
          },
        },
      });

      // Internal notification to David
      void supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "schools-one-pager-internal",
          idempotencyKey: `schools-one-pager-internal-${submissionId}`,
          templateData: {
            firstName: parsed.data.firstName,
            organization: parsed.data.organization,
            email: parsed.data.email,
            role: parsed.data.role,
            submittedAt: new Date().toISOString(),
          },
        },
      });

      window.open(onePagerAsset.url, "_blank", "noopener,noreferrer");
      navigate("/schools/one-pager/thank-you/");
    } catch (err) {
      console.error(err);
      toast({
        title: "Submission failed",
        description: "Please try again or email david@risetopurpose.org directly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Everything You Need to Make the Case Internally
          </h1>
          <p className="text-lg opacity-90">
            One page. Built for your principal, board, or executive director.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Value */}
            <div>
              <h2 className="text-2xl font-heading font-bold mb-6">What's Inside</h2>
              <ul className="space-y-4 mb-8">
                {[
                  "Program overview and the Four Pillars framework",
                  "How Project Power delivery works — at no cost to your organization",
                  "Partner and certification credentials",
                  "How to get started — first steps and timeline",
                ].map((b) => (
                  <li key={b} className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-1" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Trust signals */}
              <div className="space-y-3 pt-6 border-t">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Trusted by
                </p>
                <div className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    <strong>ADA-Certified</strong> — Project Power Master Trainer
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <BookOpen className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    <strong>Library of Congress</strong> — The Codex referenced
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    <strong>United Way SELA</strong> — LYFE Program partner
                  </span>
                </div>
              </div>
            </div>

            {/* Form */}
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="h-8 w-8 text-secondary" />
                <h2 className="text-2xl font-heading font-bold">Get the One-Pager</h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    maxLength={100}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="organization">Organization name</Label>
                  <Input
                    id="organization"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    maxLength={200}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={255}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="School Administrator">School Administrator</SelectItem>
                      <SelectItem value="Program Director">Program Director</SelectItem>
                      <SelectItem value="Nonprofit Leader">Nonprofit Leader</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  disabled={submitting}
                >
                  {submitting ? "Sending..." : "Send Me the One-Pager"}
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  We'll also follow up within 1 business day. No spam. Stay Poised.
                </p>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SchoolsOnePager;
