import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Building2, Users, Briefcase, CheckCircle, Download, Calendar, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCanonical } from "@/hooks/useCanonical";
import { programPartnerSchema } from "@/lib/validations";

const ProgramPartners = () => {
  useCanonical();
  const [partnerForm, setPartnerForm] = useState({
    organizationName: "",
    name: "",
    email: "",
    phone: "",
    organizationType: "",
    participantCount: "",
    implementationModel: [] as string[],
    timeline: "",
    additionalInfo: "",
  });
  const [partnerErrors, setPartnerErrors] = useState<Record<string, string>>({});

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = programPartnerSchema.safeParse(partnerForm);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as string] = issue.message;
        }
      });
      setPartnerErrors(fieldErrors);
      return;
    }
    
    setPartnerErrors({});
    alert("Thank you! We'll respond within 2 business days to discuss your partnership opportunity.");
    setPartnerForm({
      organizationName: "",
      name: "",
      email: "",
      phone: "",
      organizationType: "",
      participantCount: "",
      implementationModel: [],
      timeline: "",
      additionalInfo: "",
    });
  };

  const handleCheckboxChange = (value: string) => {
    setPartnerForm(prev => ({
      ...prev,
      implementationModel: prev.implementationModel.includes(value)
        ? prev.implementationModel.filter(v => v !== value)
        : [...prev.implementationModel, value]
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-24 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Partner With Poised Gentlemen
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/80 mb-8 max-w-3xl mx-auto">
            Bring character development and leadership training to your organization
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <span className="px-4 py-2 bg-primary-foreground/10 rounded-full text-sm font-medium">
              Schools & Universities
            </span>
            <span className="px-4 py-2 bg-primary-foreground/10 rounded-full text-sm font-medium">
              Youth Organizations
            </span>
            <span className="px-4 py-2 bg-primary-foreground/10 rounded-full text-sm font-medium">
              Mentorship Programs
            </span>
            <span className="px-4 py-2 bg-primary-foreground/10 rounded-full text-sm font-medium">
              Corporate CSR Initiatives
            </span>
          </div>

          <Button variant="hero" size="lg" asChild>
            <a href="#inquiry-form">
              <Calendar className="mr-2" />
              Schedule a Partnership Call
            </a>
          </Button>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
            Who We Serve
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover-lift">
              <CardHeader>
                <Building2 className="w-12 h-12 text-gold mb-4" />
                <CardTitle className="text-xl">Schools</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">K-12 Schools & Universities</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Character development programs</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">After-school enrichment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Father-son engagement events</span>
                  </li>
                </ul>
                <Button variant="link" className="p-0" asChild>
                  <a href="#curriculum">View School Programs →</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <Users className="w-12 h-12 text-gold mb-4" />
                <CardTitle className="text-xl">Organizations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Youth Organizations & Nonprofits</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Boys & Girls Clubs</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Big Brothers Big Sisters</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Faith-based youth groups</span>
                  </li>
                </ul>
                <Button variant="link" className="p-0" asChild>
                  <a href="#curriculum">View Org Programs →</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <Briefcase className="w-12 h-12 text-gold mb-4" />
                <CardTitle className="text-xl">Corporate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Corporate Social Responsibility</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Community investment programs</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Employee volunteer initiatives</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Youth mentorship sponsorships</span>
                  </li>
                </ul>
                <Button variant="link" className="p-0" asChild>
                  <a href="#curriculum">View Corporate Options →</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Proven 8-Week Curriculum
            </h2>
            <p className="text-xl text-muted-foreground">
              Turn boys into young men of character
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Week 1-2: Foundational Discipline</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Emotional awareness</li>
                  <li>• Self-regulation techniques</li>
                  <li>• Daily ritual building</li>
                  <li className="font-semibold mt-3">Deliverable: Personal discipline charter</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Week 3-4: Presence & Communication</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Body language mastery</li>
                  <li>• Confident public speaking</li>
                  <li>• Active listening skills</li>
                  <li className="font-semibold mt-3">Deliverable: Recorded 3-minute speech</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Week 5-6: Social Refinement</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Modern etiquette</li>
                  <li>• Professional introductions</li>
                  <li>• Digital presence & reputation</li>
                  <li className="font-semibold mt-3">Deliverable: Professional profile setup</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Week 7-8: Legacy Building</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Values identification</li>
                  <li>• Goal-setting framework</li>
                  <li>• Impact planning</li>
                  <li className="font-semibold mt-3">Deliverable: Personal legacy statement</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg">
              <Download className="mr-2" />
              Download Full Curriculum Overview
            </Button>
          </div>
        </div>
      </section>

      {/* Implementation Models */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
            Flexible Implementation Options
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-lg">In-Person Cohort</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm mb-4">
                  <li>• 8 weekly 90-minute sessions</li>
                  <li>• Maximum 20 participants</li>
                  <li>• Certified instructor provided</li>
                  <li>• All materials included</li>
                </ul>
                <p className="font-bold text-gold text-lg">Starting at $3,500</p>
                <p className="text-xs text-muted-foreground">per cohort</p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-lg">Hybrid Program</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm mb-4">
                  <li>• 4 in-person + 4 virtual sessions</li>
                  <li>• Self-paced digital modules</li>
                  <li>• Monthly group check-ins</li>
                  <li>• Video library access</li>
                </ul>
                <p className="font-bold text-gold text-lg">Starting at $2,200</p>
                <p className="text-xs text-muted-foreground">per cohort</p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-lg">Digital License</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm mb-4">
                  <li>• Full curriculum access</li>
                  <li>• Your staff facilitates</li>
                  <li>• Training & support included</li>
                  <li>• Unlimited participants (1 year)</li>
                </ul>
                <p className="font-bold text-gold text-lg">Starting at $1,800</p>
                <p className="text-xs text-muted-foreground">annually</p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-lg">Custom Program</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm mb-4">
                  <li>• Tailored to your needs</li>
                  <li>• Choose topics & duration</li>
                  <li>• One-time workshops to full semester</li>
                  <li>• Pricing based on scope</li>
                </ul>
                <p className="font-bold text-gold text-lg">Contact for quote</p>
                <p className="text-xs text-muted-foreground">&nbsp;</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
            What's Included
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Program Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                    <span>Facilitator guide & lesson plans</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                    <span>Student workbooks (print or digital)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                    <span>Video content library</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                    <span>Assessment & progress tools</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                    <span>Parent communication templates</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                    <span>Certificate templates</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                    <span>Branded program materials</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ongoing Support</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                    <span>Facilitator training (2-hour session)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                    <span>Monthly implementation check-ins</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                    <span>Access to program updates</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                    <span>Parent engagement resources</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                    <span>Success metrics dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                    <span>Community of partner organizations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                    <span>Troubleshooting support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Measurable Outcomes */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
            Results That Matter
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <p className="text-4xl font-bold text-gold mb-2">89%</p>
                <p className="text-sm font-medium mb-1">of participants report increased confidence</p>
                <p className="text-xs text-muted-foreground">Source: 2024 PYG Impact Study</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <p className="text-4xl font-bold text-gold mb-2">76%</p>
                <p className="text-sm font-medium mb-1">improvement in communication skills</p>
                <p className="text-xs text-muted-foreground">Measured via pre/post assessments</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <p className="text-4xl font-bold text-gold mb-2">92%</p>
                <p className="text-sm font-medium mb-1">of parents notice positive behavior change</p>
                <p className="text-xs text-muted-foreground">Based on parent surveys</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <p className="text-4xl font-bold text-gold mb-2">$4.8</p>
                <p className="text-sm font-medium mb-1">ROI per dollar invested</p>
                <p className="text-xs text-muted-foreground">Based on long-term youth development metrics</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Implementation Logistics */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
            Implementation Logistics
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="timeline">
              <AccordionTrigger className="text-lg font-semibold">
                How long does implementation take?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Initial setup takes 2-3 weeks including facilitator training. First cohort can launch within 30 days of contract signing.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="staff">
              <AccordionTrigger className="text-lg font-semibold">
                What staff involvement is required?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Minimal. One facilitator for 90 minutes weekly if using our instructor model. Your staff can facilitate with our 2-hour training.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="participants">
              <AccordionTrigger className="text-lg font-semibold">
                How many participants per cohort?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We recommend 12-20 for optimal engagement. Smaller groups (8-12) and larger groups (up to 25) are possible.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="technology">
              <AccordionTrigger className="text-lg font-semibold">
                What technology is needed?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                For hybrid/digital: Internet access, projector/screen for videos, basic video conferencing for virtual sessions. All content provided.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="success">
              <AccordionTrigger className="text-lg font-semibold">
                How do you measure success?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Pre/post surveys, parent feedback forms, facilitator assessments, participant self-evaluations, behavior tracking metrics.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="customization">
              <AccordionTrigger className="text-lg font-semibold">
                Can we customize the curriculum?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes. We offer full customization for organizations with specific needs or cultural considerations.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Partner Testimonials */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
            What Partners Say
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-gold text-xl">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "We've run leadership programs for 15 years. The Poised Young Gentlemen curriculum is the most comprehensive and culturally relevant we've found. Our boys ask when the next session is."
                </p>
                <p className="font-semibold">Dr. James Mitchell</p>
                <p className="text-sm text-muted-foreground">Principal, Riverside Academy</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-gold text-xl">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "The structure and measurable outcomes made it easy to get board approval. The impact on our mentees has been remarkable—not just grooming, but genuine character growth."
                </p>
                <p className="font-semibold">Big Brothers Big Sisters</p>
                <p className="text-sm text-muted-foreground">Metro Detroit Chapter</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-gold text-xl">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "This partnership elevated our CSR impact beyond check-writing. Employees volunteer as mentors and witness real transformation. Incredible ROI."
                </p>
                <p className="font-semibold">Marcus Thompson</p>
                <p className="text-sm text-muted-foreground">CSR Director, Fortune 500 Company</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partnership Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
            Partnership Process
          </h2>

          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold text-gold-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">Initial Consultation</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Schedule a 30-minute call
              </p>
              <p className="text-sm text-muted-foreground">
                Discuss your goals & audience
              </p>
              <p className="text-xs text-gold font-semibold mt-2">Day 1</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold text-gold-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">Custom Proposal</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Receive tailored program plan
              </p>
              <p className="text-sm text-muted-foreground">
                Review pricing & implementation
              </p>
              <p className="text-xs text-gold font-semibold mt-2">Within 5 business days</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold text-gold-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">Agreement & Onboarding</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Contract signing
              </p>
              <p className="text-sm text-muted-foreground">
                Facilitator training scheduled
              </p>
              <p className="text-xs text-gold font-semibold mt-2">Week 2</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold text-gold-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">Launch & Support</h3>
              <p className="text-sm text-muted-foreground mb-2">
                First cohort begins
              </p>
              <p className="text-sm text-muted-foreground">
                Ongoing support provided
              </p>
              <p className="text-xs text-gold font-semibold mt-2">Week 4+</p>
            </div>
          </div>
        </div>
      </section>

      {/* Downloadable Resources */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
            Downloadable Resources
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <Download className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="font-semibold mb-2">PYG Program Overview</h3>
                <p className="text-sm text-muted-foreground mb-4">2-page summary (PDF)</p>
                <Button variant="outline" size="sm" className="w-full">
                  Download
                </Button>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <Download className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Implementation Guide</h3>
                <p className="text-sm text-muted-foreground mb-4">8-page detailed logistics (PDF)</p>
                <Button variant="outline" size="sm" className="w-full">
                  Download
                </Button>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <Download className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Sample Lesson Plan</h3>
                <p className="text-sm text-muted-foreground mb-4">One complete lesson (PDF)</p>
                <Button variant="outline" size="sm" className="w-full">
                  Download
                </Button>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <Download className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Parent Template</h3>
                <p className="text-sm text-muted-foreground mb-4">Communication template (DOCX)</p>
                <Button variant="outline" size="sm" className="w-full">
                  Download
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partnership Inquiry Form */}
      <section id="inquiry-form" className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Start a Conversation
            </h2>
            <p className="text-muted-foreground">
              We'll respond within 2 business days
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="organizationName">Organization Name *</Label>
                    <Input
                      id="organizationName"
                      required
                      value={partnerForm.organizationName}
                      onChange={(e) => setPartnerForm({ ...partnerForm, organizationName: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="name">Your Name & Title *</Label>
                    <Input
                      id="name"
                      required
                      value={partnerForm.name}
                      onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={partnerForm.email}
                      onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={partnerForm.phone}
                      onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="organizationType">Organization Type *</Label>
                    <select
                      id="organizationType"
                      required
                      value={partnerForm.organizationType}
                      onChange={(e) => setPartnerForm({ ...partnerForm, organizationType: e.target.value })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">Select type</option>
                      <option value="school">School</option>
                      <option value="nonprofit">Nonprofit</option>
                      <option value="corporate">Corporate</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="participantCount">Estimated Participant Count *</Label>
                    <select
                      id="participantCount"
                      required
                      value={partnerForm.participantCount}
                      onChange={(e) => setPartnerForm({ ...partnerForm, participantCount: e.target.value })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">Select range</option>
                      <option value="10-25">10-25</option>
                      <option value="25-50">25-50</option>
                      <option value="50-100">50-100</option>
                      <option value="100+">100+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label className="mb-2 block">Preferred Implementation Model</Label>
                  <div className="space-y-2">
                    {['In-person', 'Hybrid', 'Digital', 'Custom'].map((model) => (
                      <label key={model} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={partnerForm.implementationModel.includes(model)}
                          onChange={() => handleCheckboxChange(model)}
                          className="rounded border-input"
                        />
                        <span className="text-sm">{model}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="timeline">Timeline *</Label>
                  <select
                    id="timeline"
                    required
                    value={partnerForm.timeline}
                    onChange={(e) => setPartnerForm({ ...partnerForm, timeline: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Select timeline</option>
                    <option value="within-30">Within 30 days</option>
                    <option value="1-3-months">1-3 months</option>
                    <option value="3-6-months">3-6 months</option>
                    <option value="6+-months">6+ months</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    rows={4}
                    value={partnerForm.additionalInfo}
                    onChange={(e) => setPartnerForm({ ...partnerForm, additionalInfo: e.target.value })}
                    placeholder="Tell us more about your goals and any specific needs..."
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" variant="hero">
                  Request Partnership Info
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  We'll respond within 2 business days
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Ready to Make an Impact?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can bring character development to your organization
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <a href="#inquiry-form">
                <Phone className="mr-2" />
                Schedule a Call
              </a>
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Download className="mr-2" />
              Download Program Overview
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProgramPartners;
