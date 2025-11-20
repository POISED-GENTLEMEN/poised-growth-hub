import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { 
  Mail, 
  Phone, 
  Handshake, 
  CheckCircle, 
  School, 
  Heart, 
  Briefcase, 
  Users,
  Instagram,
  Linkedin,
  Facebook,
  Youtube
} from "lucide-react";
import partnershipSonOfSaint from "@/assets/partnership-son-of-saint.jpg";
import partnershipAmeriHealth from "@/assets/partnership-amerihealth.jpg";

const Contact = () => {
  const [generalForm, setGeneralForm] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
    newsletter: false
  });

  const [partnershipForm, setPartnershipForm] = useState({
    orgName: "",
    contactPerson: "",
    email: "",
    phone: "",
    orgType: "",
    participants: "",
    challenge: "",
    timeline: "",
    budget: "",
    hearAbout: ""
  });

  const [generalSubmitted, setGeneralSubmitted] = useState(false);
  const [partnershipSubmitted, setPartnershipSubmitted] = useState(false);

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralSubmitted(true);
    setTimeout(() => setGeneralSubmitted(false), 5000);
    setGeneralForm({
      name: "",
      email: "",
      phone: "",
      inquiryType: "",
      message: "",
      newsletter: false
    });
  };

  const handlePartnershipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPartnershipSubmitted(true);
    setTimeout(() => setPartnershipSubmitted(false), 5000);
    setPartnershipForm({
      orgName: "",
      contactPerson: "",
      email: "",
      phone: "",
      orgType: "",
      participants: "",
      challenge: "",
      timeline: "",
      budget: "",
      hearAbout: ""
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[30vh] bg-primary flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
            Let's Connect. Stay Poised.
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Questions about products, programs, or partnerships? We're here.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* General Inquiries */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold rounded-full mb-4">
                <Mail className="w-8 h-8 text-gold-foreground" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">General Questions</h3>
              <p className="text-muted-foreground mb-4">
                Product support, program information, or just want to say hello? Fill out the form below or email us directly.
              </p>
              <a 
                href="mailto:info@thepoisedgentlemen.com" 
                className="text-gold hover:text-gold/80 font-semibold transition-colors"
              >
                info@thepoisedgentlemen.com
              </a>
            </div>

            {/* Program Inquiries */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold rounded-full mb-4">
                <Phone className="w-8 h-8 text-gold-foreground" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">Ready to Enroll?</h3>
              <p className="text-muted-foreground mb-4">
                Questions about youth mentorship or adult coaching? Let's schedule a call to discuss your needs.
              </p>
              <a 
                href="tel:+15040000000" 
                className="text-gold hover:text-gold/80 font-semibold transition-colors block mb-2"
              >
                (504) XXX-XXXX
              </a>
              <Button className="bg-gold text-gold-foreground hover:bg-gold/90">
                Schedule a Call
              </Button>
            </div>

            {/* Partnerships */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold rounded-full mb-4">
                <Handshake className="w-8 h-8 text-gold-foreground" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">Partner With Us</h3>
              <p className="text-muted-foreground mb-4">
                Schools, nonprofits, brands, and organizations: let's collaborate to elevate male identity in your community.
              </p>
              <Button 
                asChild
                className="bg-gold text-gold-foreground hover:bg-gold/90"
              >
                <a href="#partnerships">Explore Partnerships</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* General Contact Form */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-8">
            Send Us a Message
          </h2>
          
          <Card className="max-w-2xl mx-auto p-8">
            {generalSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                <h3 className="text-2xl font-heading font-bold mb-2">Thank You!</h3>
                <p className="text-muted-foreground">We'll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleGeneralSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">
                    Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={generalForm.name}
                    onChange={(e) => setGeneralForm({ ...generalForm, name: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="email">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={generalForm.email}
                    onChange={(e) => setGeneralForm({ ...generalForm, email: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={generalForm.phone}
                    onChange={(e) => setGeneralForm({ ...generalForm, phone: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="inquiryType">
                    Inquiry Type <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    required
                    value={generalForm.inquiryType}
                    onValueChange={(value) => setGeneralForm({ ...generalForm, inquiryType: value })}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Question</SelectItem>
                      <SelectItem value="product">Product Support</SelectItem>
                      <SelectItem value="program">Program Information</SelectItem>
                      <SelectItem value="partnership">Partnership Inquiry</SelectItem>
                      <SelectItem value="press">Press/Media</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">
                    Message <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    required
                    rows={5}
                    value={generalForm.message}
                    onChange={(e) => setGeneralForm({ ...generalForm, message: e.target.value })}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="newsletter"
                    checked={generalForm.newsletter}
                    onCheckedChange={(checked) => 
                      setGeneralForm({ ...generalForm, newsletter: checked as boolean })
                    }
                  />
                  <Label htmlFor="newsletter" className="font-normal">
                    I'd like to join the newsletter
                  </Label>
                </div>

                <Button type="submit" className="w-full h-12 bg-gold text-gold-foreground hover:bg-gold/90">
                  Send Message
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  We typically respond within 24 hours during business hours.
                </p>
              </form>
            )}
          </Card>
        </div>
      </section>

      {/* Contact Info & Hours */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold mb-8">Get in Touch</h2>
            
            <div className="space-y-3 mb-8">
              <p className="text-lg">
                <strong>Email:</strong>{" "}
                <a href="mailto:info@thepoisedgentlemen.com" className="text-gold hover:text-gold/80">
                  info@thepoisedgentlemen.com
                </a>
              </p>
              <p className="text-lg">
                <strong>Phone:</strong>{" "}
                <a href="tel:+15040000000" className="text-gold hover:text-gold/80">
                  (504) XXX-XXXX
                </a>
              </p>
              <p className="text-lg">
                <strong>Location:</strong> New Orleans, LA
              </p>
              <p className="text-lg">
                <strong>Hours:</strong> Monday-Friday, 9am-6pm CST
              </p>
            </div>

            <div>
              <h3 className="text-xl font-heading font-bold mb-4">Follow Us</h3>
              <div className="flex justify-center gap-4">
                <a 
                  href="https://instagram.com/thepoisedgentlemen" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 bg-gold rounded-full hover:scale-110 transition-transform"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6 text-gold-foreground" />
                </a>
                <a 
                  href="https://linkedin.com/company/thepoisedgentlemen" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 bg-gold rounded-full hover:scale-110 transition-transform"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6 text-gold-foreground" />
                </a>
                <a 
                  href="https://youtube.com/@thepoisedgentlemen" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 bg-gold rounded-full hover:scale-110 transition-transform"
                  aria-label="YouTube"
                >
                  <Youtube className="w-6 h-6 text-gold-foreground" />
                </a>
                <a 
                  href="https://facebook.com/thepoisedgentlemen" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 bg-gold rounded-full hover:scale-110 transition-transform"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6 text-gold-foreground" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Opportunities */}
      <section id="partnerships" className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4 text-primary-foreground">
            Elevate Male Identity in Your Community
          </h2>
          <p className="text-lg text-center text-primary-foreground/90 mb-12 max-w-3xl mx-auto">
            We partner with schools, nonprofits, wellness centers, and brands committed to positive male development.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center text-primary-foreground">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-gold-foreground" />
              </div>
              <p className="font-semibold">Evidence-based curriculum (Positive Youth Development + SEL)</p>
            </div>
            
            <div className="text-center text-primary-foreground">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-gold-foreground" />
              </div>
              <p className="font-semibold">Customizable programming for your population</p>
            </div>
            
            <div className="text-center text-primary-foreground">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-gold-foreground" />
              </div>
              <p className="font-semibold">Measurable outcomes and reporting</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
            Who We Partner With
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Schools & Youth Organizations */}
            <Card className="p-8 hover-lift">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold rounded-full mb-4">
                <School className="w-8 h-8 text-gold-foreground" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4">For Schools & Youth Organizations</h3>
              <ul className="space-y-2 mb-6 text-muted-foreground">
                <li>• After-school programming (PYG cohorts)</li>
                <li>• Assembly presentations and workshops</li>
                <li>• Teacher professional development</li>
                <li>• Parent education series</li>
              </ul>
              <Button asChild className="w-full bg-gold text-gold-foreground hover:bg-gold/90">
                <a href="#partnership-form">Request Info</a>
              </Button>
            </Card>

            {/* Wellness Centers */}
            <Card className="p-8 hover-lift">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold rounded-full mb-4">
                <Heart className="w-8 h-8 text-gold-foreground" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4">For Wellness Centers & Therapy Practices</h3>
              <ul className="space-y-2 mb-6 text-muted-foreground">
                <li>• Men's groups facilitation training</li>
                <li>• Referral partnerships</li>
                <li>• Co-hosted events</li>
              </ul>
              <Button asChild className="w-full bg-gold text-gold-foreground hover:bg-gold/90">
                <a href="#partnership-form">Request Info</a>
              </Button>
            </Card>

            {/* Brands & Businesses */}
            <Card className="p-8 hover-lift">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold rounded-full mb-4">
                <Briefcase className="w-8 h-8 text-gold-foreground" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4">For Brands & Businesses</h3>
              <ul className="space-y-2 mb-6 text-muted-foreground">
                <li>• Corporate wellness programming</li>
                <li>• Leadership development workshops</li>
                <li>• Private label grooming products</li>
                <li>• Co-marketing opportunities</li>
              </ul>
              <Button asChild className="w-full bg-gold text-gold-foreground hover:bg-gold/90">
                <a href="#partnership-form">Request Info</a>
              </Button>
            </Card>

            {/* Community Organizations */}
            <Card className="p-8 hover-lift">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold rounded-full mb-4">
                <Users className="w-8 h-8 text-gold-foreground" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4">For Community Organizations</h3>
              <ul className="space-y-2 mb-6 text-muted-foreground">
                <li>• Custom curriculum for your members</li>
                <li>• Train-the-trainer certification (coming 2026)</li>
                <li>• Co-branding opportunities</li>
              </ul>
              <Button asChild className="w-full bg-gold text-gold-foreground hover:bg-gold/90">
                <a href="#partnership-form">Request Info</a>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Partnership Inquiry Form */}
      <section id="partnership-form" className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-8">
            Let's Explore a Partnership
          </h2>
          
          <Card className="max-w-2xl mx-auto p-8">
            {partnershipSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                <h3 className="text-2xl font-heading font-bold mb-2">Thank You!</h3>
                <p className="text-muted-foreground">We're excited to explore this partnership.</p>
              </div>
            ) : (
              <form onSubmit={handlePartnershipSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="orgName">
                    Organization Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="orgName"
                    type="text"
                    required
                    value={partnershipForm.orgName}
                    onChange={(e) => setPartnershipForm({ ...partnershipForm, orgName: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="contactPerson">
                    Contact Person <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="contactPerson"
                    type="text"
                    required
                    value={partnershipForm.contactPerson}
                    onChange={(e) => setPartnershipForm({ ...partnershipForm, contactPerson: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="partnerEmail">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="partnerEmail"
                      type="email"
                      required
                      value={partnershipForm.email}
                      onChange={(e) => setPartnershipForm({ ...partnershipForm, email: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  <div>
                    <Label htmlFor="partnerPhone">
                      Phone <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="partnerPhone"
                      type="tel"
                      required
                      value={partnershipForm.phone}
                      onChange={(e) => setPartnershipForm({ ...partnershipForm, phone: e.target.value })}
                      className="h-12"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="orgType">
                    Organization Type <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    required
                    value={partnershipForm.orgType}
                    onValueChange={(value) => setPartnershipForm({ ...partnershipForm, orgType: value })}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select organization type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="school">School/Educational Institution</SelectItem>
                      <SelectItem value="nonprofit">Nonprofit/Community Organization</SelectItem>
                      <SelectItem value="healthcare">Healthcare/Wellness Provider</SelectItem>
                      <SelectItem value="corporate">Corporate/Business</SelectItem>
                      <SelectItem value="brand">Brand/Retailer</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="participants">Number of participants/employees</Label>
                  <Input
                    id="participants"
                    type="text"
                    value={partnershipForm.participants}
                    onChange={(e) => setPartnershipForm({ ...partnershipForm, participants: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="challenge">
                    What challenge are you trying to solve? <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="challenge"
                    required
                    rows={4}
                    value={partnershipForm.challenge}
                    onChange={(e) => setPartnershipForm({ ...partnershipForm, challenge: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="timeline">Timeline for implementation</Label>
                  <Input
                    id="timeline"
                    type="text"
                    placeholder="e.g., Fall 2025, Q2 2026"
                    value={partnershipForm.timeline}
                    onChange={(e) => setPartnershipForm({ ...partnershipForm, timeline: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="budget">Budget range</Label>
                  <Select
                    value={partnershipForm.budget}
                    onValueChange={(value) => setPartnershipForm({ ...partnershipForm, budget: value })}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under5k">Under $5,000</SelectItem>
                      <SelectItem value="5k-15k">$5,000-$15,000</SelectItem>
                      <SelectItem value="15k-50k">$15,000-$50,000</SelectItem>
                      <SelectItem value="50k+">$50,000+</SelectItem>
                      <SelectItem value="unsure">Not sure yet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="hearAbout">How did you hear about us?</Label>
                  <Select
                    value={partnershipForm.hearAbout}
                    onValueChange={(value) => setPartnershipForm({ ...partnershipForm, hearAbout: value })}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google">Google Search</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="event">Event/Conference</SelectItem>
                      <SelectItem value="press">Press/Article</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full h-12 bg-gold text-gold-foreground hover:bg-gold/90">
                  Request Partnership Info
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  We'll review your inquiry and schedule a discovery call within 3 business days.
                </p>
              </form>
            )}
          </Card>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
            Partnership Success Stories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Son of a Saint */}
            <Card className="overflow-hidden hover-lift">
              <img 
                src={partnershipSonOfSaint} 
                alt="Son of a Saint youth mentorship program in action"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-heading font-bold mb-2">Son of a Saint</h3>
                <div className="space-y-3 mb-4">
                  <p><strong>Challenge:</strong> Fatherless boys needing male mentorship and life skills</p>
                  <p><strong>Solution:</strong> 8-week PYG cohort, modified curriculum</p>
                  <p><strong>Outcome:</strong> 15 boys graduated, improved emotional regulation, increased academic engagement</p>
                </div>
                <blockquote className="border-l-4 border-gold pl-4 italic text-muted-foreground">
                  "The Poised Gentlemen program gave our boys tools they'll use for life. David and his team brought integrity and intention to every session."
                  <footer className="mt-2 text-sm font-semibold text-foreground">
                    — Program Director, Son of a Saint
                  </footer>
                </blockquote>
              </div>
            </Card>

            {/* AmeriHealth Caritas */}
            <Card className="overflow-hidden hover-lift">
              <img 
                src={partnershipAmeriHealth} 
                alt="AmeriHealth Caritas wellness program participants"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-heading font-bold mb-2">AmeriHealth Caritas</h3>
                <div className="space-y-3 mb-4">
                  <p><strong>Challenge:</strong> Community wellness initiative for underserved men</p>
                  <p><strong>Solution:</strong> Adult coaching cohort + live workshops</p>
                  <p><strong>Outcome:</strong> 25 participants, 95% completion rate, measurable improvement in emotional intelligence</p>
                </div>
                <blockquote className="border-l-4 border-gold pl-4 italic text-muted-foreground">
                  "This partnership aligned perfectly with our mission. The Four Pillars Framework is practical, measurable, and transformative."
                  <footer className="mt-2 text-sm font-semibold text-foreground">
                    — Community Outreach Manager
                  </footer>
                </blockquote>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Press Kit */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Press & Media
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Interested in featuring The Poised Gentlemen? Download our press kit for logos, founder headshots, brand fact sheet, and media contact info.
            </p>
            
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <h3 className="text-xl font-heading font-bold mb-4">Downloadable Assets</h3>
              <ul className="space-y-2 text-left max-w-md mx-auto mb-6">
                <li>• High-res logo (PNG, white background and transparent)</li>
                <li>• Founder headshot (David Rachal III)</li>
                <li>• Brand fact sheet (PDF with company overview, mission/vision, key statistics)</li>
              </ul>
              
              <div className="border-t border-border pt-4 mb-4">
                <h4 className="font-semibold mb-2">Media Contact</h4>
                <p>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:press@thepoisedgentlemen.com" className="text-gold hover:text-gold/80">
                    press@thepoisedgentlemen.com
                  </a>
                </p>
              </div>
              
              <Button className="bg-gold text-gold-foreground hover:bg-gold/90">
                Download Press Kit
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Not Ready to Partner Yet?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore our programs or shop our values-aligned grooming products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
              <Link to="/programs">Explore Programs</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/shop">Shop Grooming</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
