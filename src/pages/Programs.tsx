import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, Target, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/programs-hero.jpg";
import youthImage from "@/assets/youth-program-card.jpg";
import adultImage from "@/assets/adult-program-card.jpg";
import liveImage from "@/assets/live-experiences-card.jpg";

const Programs = () => {
  const [youthForm, setYouthForm] = useState({
    parentName: "",
    email: "",
    phone: "",
    studentName: "",
    studentAge: "",
    challenges: "",
    startDate: "",
    referralSource: "",
  });

  const [adultForm, setAdultForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    location: "",
    challenge: "",
    success: "",
    tier: "",
    referralSource: "",
  });

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote:
        "This program gave me a framework I didn't know I needed. Emotional intelligence isn't just a buzzword—it's a skill you can learn. My marriage has never been better.",
      author: "Michael P., 42, Legacy Series",
    },
    {
      quote:
        "My son learned more about being a man in 7 weeks than in the last 2 years. The mentors are authentic, the curriculum is practical, and the impact is real.",
      author: "Jennifer K., Parent",
    },
    {
      quote:
        "I thought coaching was for people with problems. Turns out, it's for people who want to level up. Worth every penny.",
      author: "Darius L., 31, Foundation Tier",
    },
  ];

  const handleYouthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Youth Program Inquiry:", youthForm);
    alert("Thank you! We'll respond within 24 hours to discuss next steps.");
    setYouthForm({
      parentName: "",
      email: "",
      phone: "",
      studentName: "",
      studentAge: "",
      challenges: "",
      startDate: "",
      referralSource: "",
    });
  };

  const handleAdultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adult Program Application:", adultForm);
    alert("Thank you! We'll review your application and schedule a call within 48 hours.");
    setAdultForm({
      name: "",
      email: "",
      phone: "",
      age: "",
      location: "",
      challenge: "",
      success: "",
      tier: "",
      referralSource: "",
    });
  };

  const scrollToForms = () => {
    document.getElementById("inquiry-forms")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section
        className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(27, 43, 58, 0.7), rgba(27, 43, 58, 0.7)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6">
            Transform Your Life. Master the Four Pillars.
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Structured mentorship and coaching for boys becoming men, and men building legacies.
          </p>
          <Button variant="hero" size="lg" onClick={scrollToForms}>
            Find Your Program
          </Button>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-4">Choose Your Path</h2>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-3xl mx-auto">
            From youth development to adult mastery, we meet you where you are.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Youth Program Card */}
            <Card className="border-l-4 border-l-gold hover-lift">
              <CardHeader>
                <img
                  src={youthImage}
                  alt="Youth mentorship session with mentor and teenage boy"
                  className="w-full h-64 object-cover rounded-t-lg mb-4"
                />
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-6 h-6 text-gold" />
                  <CardTitle className="font-heading text-2xl">Poised Young Gentleman (Ages 10-17)</CardTitle>
                </div>
                <CardDescription className="text-lg font-bold text-foreground">
                  Give Your Son the Role Model He Deserves
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  The Poised Young Gentleman (PYG) program is a 7-10 week cohort-based mentorship experience teaching
                  boys the Four Pillars through hands-on activities, emotional intelligence exercises, and real-world
                  challenges.
                </p>

                <div>
                  <h4 className="font-bold mb-3">What's Included</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <span>Weekly 90-minute group sessions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <span>Age-appropriate curriculum (Integrity, Strength, EQ, Discipline)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <span>Positive Youth Development + Trauma-Informed approach</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <span>Rites of passage experiences (community service, public speaking)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <span>Parent coaching and progress reports</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <span>Graduation ceremony with certificate</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-3">Outcomes</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <span>Increased self-awareness and emotional regulation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <span>Improved communication with family and peers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <span>Stronger sense of purpose and identity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <span>Practical life skills (grooming, etiquette, conflict resolution)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm italic text-muted-foreground mb-2">
                    "My 12-year-old son was withdrawn and angry. After PYG, he's confident, respectful, and actually
                    talks to me about his feelings. This program is a game-changer."
                  </p>
                  <p className="text-sm font-bold">— Sharon R., Parent</p>
                </div>

                <div>
                  <h4 className="font-bold mb-3">Investment</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>
                      <span className="font-bold text-foreground">Group Cohort:</span> $350 per student (7-week session)
                    </li>
                    <li>
                      <span className="font-bold text-foreground">Private 1:1 Mentorship:</span> $125/session (limited
                      availability)
                    </li>
                    <li>
                      <span className="font-bold text-foreground">Guardian Coaching Add-On:</span> $100 (3 sessions)
                    </li>
                  </ul>
                </div>

                <Button variant="hero" size="lg" className="w-full" onClick={scrollToForms}>
                  Enroll Your Son
                </Button>
              </CardContent>
            </Card>

            {/* Adult Program Card */}
            <Card className="border-l-4 border-l-gold hover-lift" id="adult">
              <CardHeader>
                <img
                  src={adultImage}
                  alt="Adult men's group coaching session"
                  className="w-full h-64 object-cover rounded-t-lg mb-4"
                />
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-6 h-6 text-gold" />
                  <CardTitle className="font-heading text-2xl">Poised Legacy Series (Ages 18+)</CardTitle>
                </div>
                <CardDescription className="text-lg font-bold text-foreground">
                  Master the Four Pillars. Lead with Purpose.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  A tiered coaching experience for men committed to growth. Group cohorts, digital courses, and optional
                  1:1 sessions focused on emotional intelligence, legacy planning, and refined presence.
                </p>

                <div>
                  <h4 className="font-bold mb-4">Program Tiers</h4>

                  <div className="space-y-4">
                    <div className="border-l-2 border-gold pl-4">
                      <h5 className="font-bold text-gold mb-2">FOUNDATION (Group Coaching)</h5>
                      <ul className="space-y-1 text-sm text-muted-foreground mb-2">
                        <li>• 8-week cohort (12-15 men max)</li>
                        <li>• Weekly 2-hour sessions (Zoom or in-person in New Orleans)</li>
                        <li>• Digital course access</li>
                        <li>• Four Pillars workbook and assessments</li>
                        <li>• Private community forum</li>
                      </ul>
                      <p className="font-bold text-foreground">Investment: $497</p>
                    </div>

                    <div className="border-l-2 border-gold pl-4">
                      <h5 className="font-bold text-gold mb-2">MASTERY (Group + 1:1 Coaching)</h5>
                      <ul className="space-y-1 text-sm text-muted-foreground mb-2">
                        <li>• Everything in Foundation</li>
                        <li>• 4 private 1:1 coaching sessions (60 min each)</li>
                        <li>• Personalized legacy plan</li>
                        <li>• Direct access to David Rachal III via Voxer</li>
                      </ul>
                      <p className="font-bold text-foreground">Investment: $1,497</p>
                    </div>

                    <div className="border-l-2 border-gold pl-4">
                      <h5 className="font-bold text-gold mb-2">LEGACY (Premium Immersion)</h5>
                      <ul className="space-y-1 text-sm text-muted-foreground mb-2">
                        <li>• Everything in Mastery</li>
                        <li>• Quarterly in-person retreat</li>
                        <li>• Annual 1:1 strategy session</li>
                        <li>• Lifetime community access</li>
                        <li>• First access to new programs and events</li>
                      </ul>
                      <p className="font-bold text-foreground">Investment: $3,997/year</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-3">Curriculum Topics</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <span>Emotional intelligence and self-regulation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <span>Communication and conflict resolution</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <span>Financial discipline and legacy planning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <span>Health and fitness</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <span>Style and presence</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <span>Fatherhood and mentorship</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <span>Career strategy and leadership</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm italic text-muted-foreground mb-2">
                    "I've invested thousands in courses and coaches. The Poised Legacy Series is the only program that
                    actually integrated everything—mindset, health, relationships, money. I'm a different man now."
                  </p>
                  <p className="text-sm font-bold">— Kevin D., 34, Business Owner</p>
                </div>

                <Button variant="hero" size="lg" className="w-full" onClick={scrollToForms}>
                  Start Your Journey
                </Button>
              </CardContent>
            </Card>

            {/* Live Experiences Card */}
            <Card className="border-l-4 border-l-gold hover-lift">
              <CardHeader>
                <img
                  src={liveImage}
                  alt="Men's retreat and workshop experience"
                  className="w-full h-64 object-cover rounded-t-lg mb-4"
                />
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-6 h-6 text-gold" />
                  <CardTitle className="font-heading text-2xl">Live Experiences</CardTitle>
                </div>
                <CardDescription className="text-lg font-bold text-foreground">
                  Transform in Community. Level Up Together.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  Weekend retreats, pop-up workshops, and themed forums for men seeking immersive growth experiences.
                </p>

                <div>
                  <h4 className="font-bold mb-4">Upcoming Events</h4>

                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <h5 className="font-bold text-gold mb-2">Weekend Warrior Retreat</h5>
                      <p className="text-sm text-muted-foreground mb-2">March 14-16, 2026 | Northshore, Louisiana</p>
                      <p className="text-sm mb-2">
                        Two days of physical challenges, emotional intelligence workshops, and brotherhood. Includes
                        lodging, meals, and course materials.
                      </p>
                      <p className="font-bold mb-1">Investment: $697</p>
                      <p className="text-sm text-success">Spots Remaining: 8 of 20</p>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <h5 className="font-bold text-gold mb-2">Fatherhood Forum</h5>
                      <p className="text-sm text-muted-foreground mb-2">Monthly | 2nd Saturday | New Orleans</p>
                      <p className="text-sm mb-2">
                        Open discussion for fathers navigating modern parenting. Guest speakers, peer support, and
                        practical tools.
                      </p>
                      <p className="font-bold mb-1">Investment: Free (donation-based)</p>
                      <p className="text-sm text-muted-foreground">Next Date: December 14, 2025</p>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <h5 className="font-bold text-gold mb-2">Style & Presence Masterclass</h5>
                      <p className="text-sm text-muted-foreground mb-2">January 25, 2026 | 9am-1pm | New Orleans</p>
                      <p className="text-sm mb-2">
                        Wardrobe audit, grooming tutorial, body language coaching. Walk out looking and feeling like a
                        leader.
                      </p>
                      <p className="font-bold mb-1">Investment: $297</p>
                      <p className="text-sm text-muted-foreground">Limited to: 10 men</p>
                    </div>
                  </div>
                </div>

                <Button variant="hero" size="lg" className="w-full">
                  View All Events
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Philosophy */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-6">
            Transparent Pricing, No Hidden Fees
          </h2>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-lg text-muted-foreground">
              We believe growth should be accessible but not cheap. Our pricing reflects the depth of curriculum,
              quality of mentorship, and commitment to outcomes. Payment plans available for all programs. Scholarships
              available for youth programs (apply separately).
            </p>
            <div className="bg-background p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-2">Institutional Partnerships</h3>
              <p className="text-muted-foreground mb-4">
                Schools, nonprofits, and organizations can request custom quotes for group programming. Volume discounts
                available.
              </p>
              <Button variant="outline" size="lg">
                Request Partnership Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Forms */}
      <section id="inquiry-forms" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Youth Program Inquiry Form */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-2xl">Enroll Your Son in PYG</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleYouthSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="parentName">
                      Parent/Guardian Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="parentName"
                      type="text"
                      required
                      value={youthForm.parentName}
                      onChange={(e) => setYouthForm({ ...youthForm, parentName: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  <div>
                    <Label htmlFor="youthEmail">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="youthEmail"
                      type="email"
                      required
                      value={youthForm.email}
                      onChange={(e) => setYouthForm({ ...youthForm, email: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  <div>
                    <Label htmlFor="youthPhone">
                      Phone <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="youthPhone"
                      type="tel"
                      required
                      value={youthForm.phone}
                      onChange={(e) => setYouthForm({ ...youthForm, phone: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  <div>
                    <Label htmlFor="studentName">
                      Student Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="studentName"
                      type="text"
                      required
                      value={youthForm.studentName}
                      onChange={(e) => setYouthForm({ ...youthForm, studentName: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  <div>
                    <Label htmlFor="studentAge">
                      Student Age <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="studentAge"
                      type="number"
                      min="10"
                      max="17"
                      required
                      value={youthForm.studentAge}
                      onChange={(e) => setYouthForm({ ...youthForm, studentAge: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  <div>
                    <Label htmlFor="challenges">
                      What challenges is your son facing? <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="challenges"
                      required
                      rows={3}
                      value={youthForm.challenges}
                      onChange={(e) => setYouthForm({ ...youthForm, challenges: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="startDate">Preferred Start Date</Label>
                    <Input
                      id="startDate"
                      type="text"
                      placeholder="e.g., January 2026"
                      value={youthForm.startDate}
                      onChange={(e) => setYouthForm({ ...youthForm, startDate: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  <div>
                    <Label htmlFor="youthReferral">How did you hear about us?</Label>
                    <select
                      id="youthReferral"
                      value={youthForm.referralSource}
                      onChange={(e) => setYouthForm({ ...youthForm, referralSource: e.target.value })}
                      className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="">Select one</option>
                      <option value="google">Google Search</option>
                      <option value="social">Social Media</option>
                      <option value="referral">Referral</option>
                      <option value="partner">Partner Organization</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full">
                    Submit Inquiry
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    We'll respond within 24 hours to discuss next steps.
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Adult Program Application Form */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-2xl">Apply for Legacy Series</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAdultSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="adultName">
                      Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="adultName"
                      type="text"
                      required
                      value={adultForm.name}
                      onChange={(e) => setAdultForm({ ...adultForm, name: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  <div>
                    <Label htmlFor="adultEmail">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="adultEmail"
                      type="email"
                      required
                      value={adultForm.email}
                      onChange={(e) => setAdultForm({ ...adultForm, email: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  <div>
                    <Label htmlFor="adultPhone">
                      Phone <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="adultPhone"
                      type="tel"
                      required
                      value={adultForm.phone}
                      onChange={(e) => setAdultForm({ ...adultForm, phone: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  <div>
                    <Label htmlFor="adultAge">
                      Age <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="adultAge"
                      type="number"
                      min="18"
                      required
                      value={adultForm.age}
                      onChange={(e) => setAdultForm({ ...adultForm, age: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">
                      Location (City, State) <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="location"
                      type="text"
                      required
                      placeholder="e.g., New Orleans, LA"
                      value={adultForm.location}
                      onChange={(e) => setAdultForm({ ...adultForm, location: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  <div>
                    <Label htmlFor="challenge">
                      Current Biggest Challenge <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="challenge"
                      required
                      rows={2}
                      value={adultForm.challenge}
                      onChange={(e) => setAdultForm({ ...adultForm, challenge: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="success">
                      What does success look like for you in 6 months? <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="success"
                      required
                      rows={3}
                      value={adultForm.success}
                      onChange={(e) => setAdultForm({ ...adultForm, success: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="tier">
                      Which tier interests you? <span className="text-destructive">*</span>
                    </Label>
                    <select
                      id="tier"
                      required
                      value={adultForm.tier}
                      onChange={(e) => setAdultForm({ ...adultForm, tier: e.target.value })}
                      className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="">Select one</option>
                      <option value="foundation">Foundation ($497)</option>
                      <option value="mastery">Mastery ($1,497)</option>
                      <option value="legacy">Legacy ($3,997/year)</option>
                      <option value="unsure">Not Sure</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="adultReferral">How did you hear about us?</Label>
                    <select
                      id="adultReferral"
                      value={adultForm.referralSource}
                      onChange={(e) => setAdultForm({ ...adultForm, referralSource: e.target.value })}
                      className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="">Select one</option>
                      <option value="google">Google Search</option>
                      <option value="social">Social Media</option>
                      <option value="referral">Referral</option>
                      <option value="partner">Partner Organization</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full">
                    Submit Application
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    We'll review your application and schedule a call within 48 hours.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-12">What Participants Say</h2>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-2xl italic mb-6">"{testimonials[currentTestimonial].quote}"</p>
              <p className="font-bold text-gold text-lg">— {testimonials[currentTestimonial].author}</p>
            </div>
            <div className="flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-gold" : "bg-primary-foreground/30"
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gold">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-primary mb-8 max-w-3xl mx-auto">
            Whether you're enrolling your son or investing in your own growth, the first step is reaching out. We're
            here to answer questions and find the right fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={scrollToForms}>
              Enroll Your Son
            </Button>
            <Button variant="default" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={scrollToForms}>
              Apply for Coaching
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Programs;
