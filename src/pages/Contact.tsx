import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Mail, Phone, CheckCircle, Building2, Users, Newspaper } from "lucide-react";
import { useCanonical } from "@/hooks/useCanonical";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

type Segment = "school" | "parent" | "press" | "other" | "";

const segmentLabels: Record<string, string> = {
  school: "School or Organization",
  parent: "Parent or Guardian",
  press: "Press or Media",
  other: "Other",
};

const Contact = () => {
  useCanonical();

  const [segment, setSegment] = useState<Segment>("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    orgName: "",
    role: "",
    programInterest: "",
    groupSize: "",
    timeline: "",
    childAge: "",
    interest: "",
    outlet: "",
  });

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const fieldErrors: Record<string, string> = {};

    if (!segment) {
      fieldErrors.segment = "Please select who you're reaching out as";
    }

    if (!form.name.trim()) {
      fieldErrors.name = "Name is required";
    } else if (form.name.length > 100) {
      fieldErrors.name = "Name must be less than 100 characters";
    }

    if (!form.email.trim()) {
      fieldErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      fieldErrors.email = "Please enter a valid email address";
    }

    if (segment === "school") {
      if (!form.phone.trim()) {
        fieldErrors.phone = "Phone is required for school and organization inquiries";
      } else if (!/^\+?[\d\s\-()]+$/.test(form.phone)) {
        fieldErrors.phone = "Please enter a valid phone number";
      }
      if (!form.orgName.trim()) fieldErrors.orgName = "Organization name is required";
      if (!form.role.trim()) fieldErrors.role = "Your role is required";
      if (!form.programInterest) fieldErrors.programInterest = "Please select a program";
      if (!form.groupSize) fieldErrors.groupSize = "Please select a group size";
      if (!form.timeline) fieldErrors.timeline = "Please select a timeline";
    }

    if (segment === "parent") {
      if (!form.childAge.trim()) fieldErrors.childAge = "Child's age is required";
      if (!form.interest) fieldErrors.interest = "Please select an interest";
    }

    if (segment === "press") {
      if (!form.outlet.trim()) fieldErrors.outlet = "Outlet / publication is required";
    }

    if (!form.message.trim()) {
      fieldErrors.message = "Message is required";
    } else if (form.message.length < 10) {
      fieldErrors.message = "Message must be at least 10 characters";
    } else if (form.message.length > 2000) {
      fieldErrors.message = "Message must be less than 2000 characters";
    }

    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    const details: Record<string, string> = {};
    if (segment === "school") {
      details.orgName = form.orgName;
      details.role = form.role;
      details.programInterest = form.programInterest;
      details.groupSize = form.groupSize;
      details.timeline = form.timeline;
    } else if (segment === "parent") {
      details.childAge = form.childAge;
      details.interest = form.interest;
    } else if (segment === "press") {
      details.outlet = form.outlet;
    }

    const { error } = await supabase.from("contact_submissions").insert({
      segment,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      details,
    });

    setSubmitting(false);

    if (error) {
      setErrors({ submit: "Something went wrong. Please try again or email us directly." });
      return;
    }

    setSubmitted(true);
    setForm({
      name: "",
      email: "",
      phone: "",
      message: "",
      orgName: "",
      role: "",
      programInterest: "",
      groupSize: "",
      timeline: "",
      childAge: "",
      interest: "",
      outlet: "",
    });
    setSegment("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Contact | Poised Gentlemen</title>
        <meta
          name="description"
          content="Start a conversation with Poised Gentlemen — partnership inquiries, mentorship bookings, press, and more."
        />
        <link rel="canonical" href="https://poisedgentlemen.com/contact" />
        <meta property="og:title" content="Contact | Poised Gentlemen" />
        <meta
          property="og:description"
          content="Start a conversation with Poised Gentlemen — partnership inquiries, mentorship bookings, press, and more."
        />
        <meta property="og:url" content="https://poisedgentlemen.com/contact" />
      </Helmet>

      <Header />

      {/* Hero */}
      <section className="relative bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Start the Conversation
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
            Partnership inquiries, mentorship bookings, press — whatever brought you here, we will respond within 1–2 business days.
          </p>
        </div>
      </section>

      {/* Contact Info Bar */}
      <section className="bg-muted border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center">
            <a
              href="mailto:david@risetopurpose.org"
              className="flex items-center gap-2 text-foreground hover:text-gold transition-colors font-medium"
            >
              <Mail className="w-5 h-5 text-gold" />
              david@risetopurpose.org
            </a>
            <span className="hidden sm:inline text-muted-foreground">|</span>
            <a
              href="tel:+15044849037"
              className="flex items-center gap-2 text-foreground hover:text-gold transition-colors font-medium"
            >
              <Phone className="w-5 h-5 text-gold" />
              504-484-9037
            </a>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="p-8 md:p-10">
            {submitted ? (
              <div className="text-center py-10">
                <CheckCircle className="w-16 h-16 text-success mx-auto mb-6" />
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-primary">
                  Thank You
                </h2>
                <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
                  We'll respond within 1–2 business days. Stay Poised.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Segment Selector */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    I'm reaching out as a... <span className="text-destructive">*</span>
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {([
                      { value: "school", label: "School or Organization", icon: Building2 },
                      { value: "parent", label: "Parent or Guardian", icon: Users },
                      { value: "press", label: "Press or Media", icon: Newspaper },
                      { value: "other", label: "Other", icon: Mail },
                    ] as const).map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => {
                          setSegment(value);
                          setErrors((prev) => {
                            const next = { ...prev };
                            delete next.segment;
                            return next;
                          });
                        }}
                        className={`flex items-center gap-3 p-4 rounded-lg border-2 text-left transition-all ${
                          segment === value
                            ? "border-gold bg-gold/5 text-primary"
                            : "border-border hover:border-gold/50 text-foreground"
                        }`}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium">{label}</span>
                      </button>
                    ))}
                  </div>
                  {errors.segment && (
                    <p className="text-sm text-destructive mt-2">{errors.segment}</p>
                  )}
                </div>

                {/* Contextual Note */}
                {segment === "school" && (
                  <div className="bg-muted p-5 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Project Power</strong> is delivered at no cost to your organization — funded through our grant and health-partner relationships. Our flagship PYG pilot (<strong>The Poised Method™</strong>) is a paid program; tell us what you're after and we'll send pricing.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      <Link
                        to="/schools/"
                        className="text-sm font-semibold text-gold hover:text-gold/80 transition-colors"
                      >
                        Explore School Programs →
                      </Link>
                      <Link
                        to="/schools/one-pager/"
                        className="text-sm font-semibold text-gold hover:text-gold/80 transition-colors"
                      >
                        Download One-Pager →
                      </Link>
                    </div>
                  </div>
                )}

                {/* Common Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">
                      Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className={`h-12 mt-1.5 ${errors.name ? "border-destructive" : ""}`}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive mt-1.5">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className={`h-12 mt-1.5 ${errors.email ? "border-destructive" : ""}`}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive mt-1.5">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">
                    Phone {segment === "school" && <span className="text-destructive">*</span>}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className={`h-12 mt-1.5 ${errors.phone ? "border-destructive" : ""}`}
                    placeholder={segment === "school" ? "Required" : "Optional"}
                  />
                  {errors.phone && (
                    <p className="text-xs text-destructive mt-1.5">{errors.phone}</p>
                  )}
                </div>

                {/* School / Organization Fields */}
                {segment === "school" && (
                  <div className="space-y-6 border-t border-border pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="orgName">
                          Organization Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="orgName"
                          value={form.orgName}
                          onChange={(e) => updateField("orgName", e.target.value)}
                          className={`h-12 mt-1.5 ${errors.orgName ? "border-destructive" : ""}`}
                        />
                        {errors.orgName && (
                          <p className="text-xs text-destructive mt-1.5">{errors.orgName}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="role">
                          Your Role <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="role"
                          value={form.role}
                          onChange={(e) => updateField("role", e.target.value)}
                          className={`h-12 mt-1.5 ${errors.role ? "border-destructive" : ""}`}
                          placeholder="e.g. Principal, Counselor, Program Director"
                        />
                        {errors.role && (
                          <p className="text-xs text-destructive mt-1.5">{errors.role}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="programInterest">
                        Program of Interest <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={form.programInterest}
                        onValueChange={(value) => updateField("programInterest", value)}
                      >
                        <SelectTrigger
                          id="programInterest"
                          className={`h-12 mt-1.5 ${errors.programInterest ? "border-destructive" : ""}`}
                        >
                          <SelectValue placeholder="Select a program" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="project-power">Project Power (ADA-certified wellness)</SelectItem>
                          <SelectItem value="pyg">PYG / The Poised Method™ (character pilot)</SelectItem>
                          <SelectItem value="lyfe">LYFE Program</SelectItem>
                          <SelectItem value="other">Other / Not sure yet</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.programInterest && (
                        <p className="text-xs text-destructive mt-1.5">{errors.programInterest}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="groupSize">
                          Approx. Group Size <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={form.groupSize}
                          onValueChange={(value) => updateField("groupSize", value)}
                        >
                          <SelectTrigger
                            id="groupSize"
                            className={`h-12 mt-1.5 ${errors.groupSize ? "border-destructive" : ""}`}
                          >
                            <SelectValue placeholder="Select group size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10-25">10–25</SelectItem>
                            <SelectItem value="25-50">25–50</SelectItem>
                            <SelectItem value="50-100">50–100</SelectItem>
                            <SelectItem value="100+">100+</SelectItem>
                            <SelectItem value="unsure">Not sure yet</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.groupSize && (
                          <p className="text-xs text-destructive mt-1.5">{errors.groupSize}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="timeline">
                          Timeline <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={form.timeline}
                          onValueChange={(value) => updateField("timeline", value)}
                        >
                          <SelectTrigger
                            id="timeline"
                            className={`h-12 mt-1.5 ${errors.timeline ? "border-destructive" : ""}`}
                          >
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Immediate (within 30 days)</SelectItem>
                            <SelectItem value="next-quarter">Next quarter</SelectItem>
                            <SelectItem value="next-semester">Next semester</SelectItem>
                            <SelectItem value="flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.timeline && (
                          <p className="text-xs text-destructive mt-1.5">{errors.timeline}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Parent or Guardian Fields */}
                {segment === "parent" && (
                  <div className="space-y-6 border-t border-border pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="childAge">
                          Child's Age <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="childAge"
                          value={form.childAge}
                          onChange={(e) => updateField("childAge", e.target.value)}
                          className={`h-12 mt-1.5 ${errors.childAge ? "border-destructive" : ""}`}
                          placeholder="e.g. 12"
                        />
                        {errors.childAge && (
                          <p className="text-xs text-destructive mt-1.5">{errors.childAge}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="interest">
                          Interest <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={form.interest}
                          onValueChange={(value) => updateField("interest", value)}
                        >
                          <SelectTrigger
                            id="interest"
                            className={`h-12 mt-1.5 ${errors.interest ? "border-destructive" : ""}`}
                          >
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mentorship">1-on-1 Mentorship</SelectItem>
                            <SelectItem value="program">Youth Program (PYG)</SelectItem>
                            <SelectItem value="products">Products / Grooming</SelectItem>
                            <SelectItem value="other">Something else</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.interest && (
                          <p className="text-xs text-destructive mt-1.5">{errors.interest}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Press or Media Fields */}
                {segment === "press" && (
                  <div className="space-y-6 border-t border-border pt-6">
                    <div>
                      <Label htmlFor="outlet">
                        Outlet / Publication <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="outlet"
                        value={form.outlet}
                        onChange={(e) => updateField("outlet", e.target.value)}
                        className={`h-12 mt-1.5 ${errors.outlet ? "border-destructive" : ""}`}
                        placeholder="e.g. The Times-Picayune, NPR, local news station"
                      />
                      {errors.outlet && (
                        <p className="text-xs text-destructive mt-1.5">{errors.outlet}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Message — All Segments */}
                <div>
                  <Label htmlFor="message">
                    Message <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    className={`mt-1.5 ${errors.message ? "border-destructive" : ""}`}
                    placeholder="Tell us what you're looking for..."
                  />
                  {errors.message && (
                    <p className="text-xs text-destructive mt-1.5">{errors.message}</p>
                  )}
                </div>

                {errors.submit && (
                  <p className="text-sm text-destructive text-center">{errors.submit}</p>
                )}

                <Button
                  type="submit"
                  disabled={submitting || !segment}
                  className="w-full h-12 bg-gold text-gold-foreground hover:bg-gold/90 font-semibold"
                >
                  {submitting ? "Sending..." : "Send Inquiry"}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  We typically respond within 1–2 business days.
                </p>
              </form>
            )}
          </Card>
        </div>
      </section>

      {/* Direct Contact */}
      <section className="py-16 md:py-20 bg-muted">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-6">
            Prefer to Reach Out Directly?
          </h2>
          <div className="space-y-3 text-lg">
            <p>
              <Mail className="w-5 h-5 inline-block text-gold mr-2" />
              <a
                href="mailto:david@risetopurpose.org"
                className="text-gold hover:text-gold/80 font-semibold transition-colors"
              >
                david@risetopurpose.org
              </a>
            </p>
            <p>
              <Phone className="w-5 h-5 inline-block text-gold mr-2" />
              <a
                href="tel:+15044849037"
                className="text-gold hover:text-gold/80 font-semibold transition-colors"
              >
                504-484-9037
              </a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
