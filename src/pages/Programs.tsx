import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Users,
  Gamepad2,
  FileText,
  MessageCircle,
  Heart,
  Briefcase,
  GraduationCap,
  Star,
  ChevronDown,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ParentBadge from "@/components/ParentBadge";
import youthImage from "@/assets/youth-program-card.jpg";
import { youthProgramSchema } from "@/lib/validations";

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
  const [youthErrors, setYouthErrors] = useState<Record<string, string>>({});
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showAllModules, setShowAllModules] = useState(false);
  const [mentorTestimonial, setMentorTestimonial] = useState(0);
  const [activeSection, setActiveSection] = useState("overview");

  const testimonials = [
    {
      quote:
        "My son learned more about being a man in 7 weeks than in the last 2 years. The mentors are authentic, the curriculum is practical, and the impact is real.",
      author: "Jennifer K., Parent",
    },
    {
      quote:
        "I thought coaching was for people with problems. Turns out, it's for people who want to level up. Worth every penny.",
      author: "Darius L., 31, Mentor Training Graduate",
    },
  ];

  const handleYouthSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = youthProgramSchema.safeParse(youthForm);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as string] = issue.message;
        }
      });
      setYouthErrors(fieldErrors);
      return;
    }

    setYouthErrors({});
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

  const scrollToForms = () => {
    document.getElementById("inquiry-forms")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToYouthProgram = () => {
    document.getElementById("youth-program")?.scrollIntoView({ behavior: "smooth" });
    setActiveSection("pyg");
  };

  const scrollToMentorTraining = () => {
    document.getElementById("youth-mentorship")?.scrollIntoView({ behavior: "smooth" });
    setActiveSection("mentor");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section
        className="relative h-[350px] md:h-[450px] flex items-center justify-center text-center py-24 md:py-24 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #111827 0%, #1F2937 50%, #111827 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_#FBBF24_0,_transparent_60%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="font-heading text-4xl md:text-[56px] font-bold text-white mb-4">Poised Gentlemen Programs</h1>
          <p className="text-xl md:text-[28px] text-white/80 mb-4 max-w-3xl mx-auto">
            Building Character, Presence, and Purpose
          </p>
          <p className="text-base md:text-lg text-white/70 mb-8 max-w-[800px] mx-auto leading-relaxed">
            Comprehensive programs for youth development and mentor training. Whether you're raising a young man or
            guiding the next generation, we provide the structure, curriculum, and community you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" onClick={scrollToYouthProgram} className="w-full sm:w-auto">
              Youth Program (Ages 10–17)
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToMentorTraining}
              className="w-full sm:w-auto border-gold text-white hover:bg-gold hover:text-navy"
            >
              Mentor Training Program
            </Button>
          </div>
        </div>
      </section>

      {/* Sticky Jump-to Navigation */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-4 no-scrollbar snap-x snap-mandatory">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setActiveSection("overview");
              }}
              className={`px-5 py-2 rounded-full border border-gold text-navy whitespace-nowrap transition-all hover:bg-gold hover:text-white snap-start ${
                activeSection === "overview" ? "bg-gold text-white" : "bg-white"
              }`}
            >
              Overview
            </button>
            <button
              onClick={scrollToYouthProgram}
              className={`px-5 py-2 rounded-full border border-gold text-navy whitespace-nowrap transition-all hover:bg-gold hover:text-white snap-start ${
                activeSection === "pyg" ? "bg-gold text-white" : "bg-white"
              }`}
            >
              Poised Young Gentlemen
            </button>
            <button
              onClick={scrollToMentorTraining}
              className={`px-5 py-2 rounded-full border border-gold text-navy whitespace-nowrap transition-all hover:bg-gold hover:text-white snap-start ${
                activeSection === "mentor" ? "bg-gold text-white" : "bg-white"
              }`}
            >
              Mentor Training
            </button>
            <button
              onClick={() => {
                document.getElementById("organizations")?.scrollIntoView({ behavior: "smooth" });
                setActiveSection("organizations");
              }}
              className={`px-5 py-2 rounded-full border border-gold text-navy whitespace-nowrap transition-all hover:bg-gold hover:text-white snap-start ${
                activeSection === "organizations" ? "bg-gold text-white" : "bg-white"
              }`}
            >
              For Organizations
            </button>
            <button
              onClick={() => {
                document.getElementById("faqs")?.scrollIntoView({ behavior: "smooth" });
                setActiveSection("faqs");
              }}
              className={`px-5 py-2 rounded-full border border-gold text-navy whitespace-nowrap transition-all hover:bg-gold hover:text-white snap-start ${
                activeSection === "faqs" ? "bg-gold text-white" : "bg-white"
              }`}
            >
              FAQs
            </button>
          </div>
        </div>
      </div>

      {/* Program Comparison Table */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center text-navy mb-3">
            Which Program is Right for You?
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Compare our cohort-based youth program with our flexible mentor training experience.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Poised Young Gentlemen Column */}
            <Card className="border-2 border-gold/40 shadow-md bg-white/95">
              <CardHeader>
                <CardTitle className="font-heading text-2xl text-navy">Poised Young Gentlemen</CardTitle>
                <CardDescription className="text-gold font-semibold text-base">For Youth Ages 10–17</CardDescription>
                <p className="text-muted-foreground pt-4">
                  8–12 week in-person or hybrid program focused on character development, emotional intelligence, and
                  leadership for young men.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-bold text-navy mb-3">Key Features</h4>
                  <div className="space-y-2">
                    {[
                      "Hands-on workshops and activities",
                      "Group cohort experience",
                      "Mentorship and accountability",
                      "Certificate of completion",
                      "Facilitated by trained instructors",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-navy mb-3">Best For</h4>
                  <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                    <li>Schools and youth organizations</li>
                    <li>In-person group settings</li>
                    <li>Structured 8–12 week timeline</li>
                    <li>Ages 10–17</li>
                  </ul>
                </div>

                <Button variant="outline" size="lg" className="w-full" onClick={scrollToYouthProgram}>
                  Learn More About PYG
                </Button>
              </CardContent>
            </Card>

            {/* PYG Mentorship Training Column */}
            <Card className="border-2 border-gold/40 shadow-md bg-white/95">
              <CardHeader>
                <CardTitle className="font-heading text-2xl text-navy">PYG Mentorship Training</CardTitle>
                <CardDescription className="text-gold font-semibold text-base">For Parents & Mentors</CardDescription>
                <p className="text-muted-foreground pt-4">
                  Self-paced online course teaching proven strategies to mentor tweens and teens effectively through
                  interactive Kahoot! lessons.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-bold text-navy mb-3">Key Features</h4>
                  <div className="space-y-2">
                    {[
                      "Learn at your own pace",
                      "18 interactive modules",
                      "Downloadable resources",
                      "Optional certification",
                      "Community support",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-navy mb-3">Best For</h4>
                  <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                    <li>Parents of tweens/teens (ages 10–17)</li>
                    <li>Individual mentors and coaches</li>
                    <li>Self-paced learning</li>
                    <li>Online/remote access</li>
                  </ul>
                </div>

                <Button variant="outline" size="lg" className="w-full" onClick={scrollToMentorTraining}>
                  Enroll in Training
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-4">Our Program</h2>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-3xl mx-auto">
            Choose the path that fits your needs: hands-on youth development or flexible mentor training.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Youth Program Card */}
            <Card
              className="border-l-4 border-l-gold hover-lift w-full max-w-3xl mx-auto lg:col-span-2"
              id="youth-program"
            >
              <CardHeader>
                <div className="relative">
                  <img
                    src={youthImage}
                    alt="Youth mentorship session with mentor and teenage boy"
                    className="w-full h-64 object-cover rounded-t-lg mb-4"
                  />
                  <div className="absolute top-4 right-4">
                    <ParentBadge variant="parent-info" />
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-6 h-6 text-gold" />
                  <CardTitle className="font-heading text-2xl">Poised Young Gentleman (Ages 10–17)</CardTitle>
                </div>
                <CardDescription className="text-lg font-bold text-foreground">
                  Give Your Son the Role Model He Deserves
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  The Poised Young Gentleman (PYG) program is an 8–12 week cohort-based mentorship experience teaching
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
                      <span className="font-bold text-foreground">Group Cohort:</span> $350 per student (8-week session,
                      minimum 10 participants)
                    </li>
                  </ul>
                </div>

                <Button variant="hero" size="lg" className="w-full" asChild>
                  <Link to="/contact">Bring to My City</Link>
                </Button>
              </CardContent>
            </Card>

            {/* PYG Mentorship Training Program */}
            <section id="youth-mentorship" className="col-span-full">
              <div className="bg-[#F9F7F4] border-t-2 border-gold rounded-lg p-8 md:p-12">
                {/* Section Header */}
                <div className="text-center mb-12">
                  <Badge className="mb-4 bg-white text-navy border-gold">NEW PROGRAM</Badge>
                  <h2 className="font-heading text-3xl md:text-[44px] font-bold text-navy mb-4">
                    PYG Mentorship Training Program
                  </h2>
                  <p className="text-xl md:text-2xl text-muted-foreground mb-4">
                    Structured Curriculum for Parents, Mentors, and Youth Leaders
                  </p>
                  <p className="text-base md:text-lg text-muted-foreground max-w-[900px] mx-auto">
                    An interactive, gamified training program that equips you with proven strategies to mentor tweens
                    and teens effectively. Learn through engaging Kahoot! lessons, downloadable resources, and a
                    supportive community.
                  </p>
                </div>

                {/* Two-Column Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                  {/* Left Column */}
                  <div className="space-y-8">
                    {/* Program Overview */}
                    <div>
                      <h3 className="font-heading text-2xl font-bold text-navy mb-6">What You'll Learn</h3>
                      <div className="space-y-2">
                        {[
                          "Foundation: Understanding youth development stages",
                          "Communication: Active listening and meaningful conversations",
                          "Goal-Setting: SMART goals for tweens and teens",
                          "Emotional Intelligence: Teaching self-awareness and regulation",
                          "Conflict Resolution: Navigating difficult situations",
                          "Identity & Values: Helping youth discover who they are",
                        ].map((module, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                            <span className="text-base text-muted-foreground">{module}</span>
                          </div>
                        ))}

                        {showAllModules &&
                          [
                            "Decision-Making: Building critical thinking skills",
                            "Academic Success: Study habits and learning strategies",
                            "Social Skills: Building healthy relationships",
                            "Leadership Development: Cultivating influence and responsibility",
                            "Financial Literacy: Money management basics",
                            "Digital Citizenship: Navigating technology responsibly",
                            "Mental Health: Recognizing signs and providing support",
                            "Career Exploration: Discovering interests and pathways",
                            "Physical Wellness: Habits for lifelong health",
                            "Spiritual Growth: Purpose and meaning",
                            "Community Engagement: Service and giving back",
                            "Long-Term Planning: Setting up for future success",
                          ].map((module, index) => (
                            <div key={index + 6} className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                              <span className="text-base text-muted-foreground">{module}</span>
                            </div>
                          ))}

                        <button
                          onClick={() => setShowAllModules(!showAllModules)}
                          className="flex items-center gap-1 text-gold hover:text-gold/80 font-medium mt-4"
                        >
                          {showAllModules ? "Show Less" : "Show All 18 Modules"}
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${showAllModules ? "rotate-180" : ""}`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Format & Delivery */}
                    <div>
                      <h3 className="font-heading text-2xl font-bold text-navy mb-6">How It Works</h3>
                      <div className="space-y-4">
                        <Card className="bg-white border-l-4 border-l-gold">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <Gamepad2 className="w-8 h-8 text-gold shrink-0" />
                              <div>
                                <h4 className="font-bold text-navy mb-2">Interactive Kahoot! Lessons</h4>
                                <p className="text-sm text-muted-foreground">
                                  18 engaging Kahoot! modules that youth actually enjoy. Gamified learning makes complex
                                  topics fun and memorable.
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-white border-l-4 border-l-gold">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <FileText className="w-8 h-8 text-gold shrink-0" />
                              <div>
                                <h4 className="font-bold text-navy mb-2">Downloadable Resources</h4>
                                <p className="text-sm text-muted-foreground">
                                  Workbooks, goal-tracking templates, conversation starters, and session guides.
                                  Everything you need to implement immediately.
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-white border-l-4 border-l-gold">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <MessageCircle className="w-8 h-8 text-gold shrink-0" />
                              <div>
                                <h4 className="font-bold text-navy mb-2">Supportive Community</h4>
                                <p className="text-sm text-muted-foreground">
                                  Private online community for sharing wins, asking questions, and connecting with
                                  fellow mentors on the same journey.
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-8">
                    {/* Who This Is For */}
                    <div>
                      <h3 className="font-heading text-2xl font-bold text-navy mb-6">Perfect For</h3>
                      <div className="space-y-5">
                        <Card className="bg-white/50">
                          <CardContent className="p-6">
                            <Heart className="w-10 h-10 text-gold mb-3" />
                            <h4 className="text-xl font-bold text-navy mb-2">Parents of Tweens & Teens</h4>
                            <p className="text-muted-foreground mb-3">
                              Finally, a structured roadmap to guide meaningful conversations with your 10–17 year old.
                              Stop guessing, start mentoring with confidence.
                            </p>
                            <p className="text-sm italic text-muted-foreground">
                              "Turn dinner table small talk into life-changing guidance."
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="bg-white/50">
                          <CardContent className="p-6">
                            <Briefcase className="w-10 h-10 text-gold mb-3" />
                            <h4 className="text-xl font-bold text-navy mb-2">Professional Mentors</h4>
                            <p className="text-muted-foreground mb-3">
                              Proven curriculum with trackable outcomes. Gain professional development credentials and
                              ready-to-use tools that youth actually engage with.
                            </p>
                            <p className="text-sm italic text-muted-foreground">
                              "Transform your mentoring impact with gamified learning."
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="bg-white/50">
                          <CardContent className="p-6">
                            <GraduationCap className="w-10 h-10 text-gold mb-3" />
                            <h4 className="text-xl font-bold text-navy mb-2">Youth Organizations</h4>
                            <p className="text-muted-foreground mb-3">
                              Launch a complete mentorship program in 2 weeks. Built-in tracking for grant reporting,
                              zero curriculum development required.
                            </p>
                            <p className="text-sm italic text-muted-foreground">
                              "Scalable, turnkey program-in-a-box."
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing Tiers */}
                <div className="mb-16">
                  <h3 className="font-heading text-3xl font-bold text-navy text-center mb-3">Choose Your Path</h3>
                  <p className="text-center text-muted-foreground mb-8">Flexible options for every budget and goal</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Tier 1 - Core Course */}
                    <Card className="border-2 border-gold relative bg-white/95 shadow-md">
                      <Badge className="absolute -top-3 right-4 bg-gold text-white">MOST POPULAR</Badge>
                      <CardHeader>
                        <CardTitle className="font-heading text-2xl text-navy">Core Course</CardTitle>
                        <div className="pt-2">
                          <span className="text-4xl font-bold text-navy">$97</span>
                          <p className="text-sm text-muted-foreground">One-time payment</p>
                        </div>
                        <CardDescription className="pt-2">Perfect for parents and individual mentors</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          {[
                            "Complete 18-Kahoot course access",
                            "Downloadable workbooks & templates",
                            "Email support",
                            "Private community group access",
                            "Course completion certificate",
                            "Lifetime access to content",
                          ].map((feature, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                              <span className="text-sm text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                        <Button asChild variant="hero" size="lg" className="w-full">
                          <a
                            href="https://manage.kmail-lists.com/subscriptions/subscribe?a=WGTZM9&g=SaNybt"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Get Started
                          </a>
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Tier 2 - Community Access */}
                    <Card className="bg-white/95 shadow-sm">
                      <CardHeader>
                        <CardTitle className="font-heading text-2xl text-navy">Course + Community</CardTitle>
                        <div className="pt-2">
                          <span className="text-4xl font-bold text-navy">$197</span>
                          <p className="text-sm text-muted-foreground">One-time payment</p>
                        </div>
                        <CardDescription className="pt-2">For mentors seeking ongoing support</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          {[
                            "Everything in Core Course",
                            "Monthly live Q&A sessions",
                            "Peer mentorship matching",
                            "Advanced resource library",
                            "Priority email support",
                            "Quarterly skill-building workshops",
                          ].map((feature, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                              <span className="text-sm text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                        <Button asChild variant="outline" size="lg" className="w-full">
                          <a
                            href="https://manage.kmail-lists.com/subscriptions/subscribe?a=WGTZM9&g=VEySmX"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Join Community
                          </a>
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Tier 3 - Certification */}
                    <Card className="bg-white/95 shadow-sm">
                      <CardHeader>
                        <CardTitle className="font-heading text-2xl text-navy">Certification Program</CardTitle>
                        <div className="pt-2">
                          <span className="text-4xl font-bold text-navy">$497</span>
                          <p className="text-sm text-muted-foreground">One-time payment</p>
                        </div>
                        <CardDescription className="pt-2">
                          Professional credential + personalized coaching
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          {[
                            "Everything in Tier 2",
                            "Professional Mentor Certification",
                            "4 live group coaching calls",
                            "One-on-one coaching session (30 min)",
                            "Mentor toolkit with session guides",
                            "Lifetime content updates",
                            "Professional LinkedIn badge",
                          ].map((feature, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                              <span className="text-sm text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                        <Button asChild variant="outline" size="lg" className="w-full">
                          <a
                            href="https://manage.kmail-lists.com/subscriptions/subscribe?a=WGTZM9&g=U54fJp"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Get Certified
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  <p className="text-center text-sm text-muted-foreground mt-6">
                    Organization & School licenses (10-50 users) starting at $997.{" "}
                    <a href="/contact" className="text-gold hover:underline">
                      Request Organization Quote →
                    </a>
                  </p>
                </div>

                {/* Testimonials Section */}
                <div className="bg-white rounded-lg p-8 md:p-12 mb-16 shadow-sm">
                  <h3 className="font-heading text-3xl font-bold text-navy text-center mb-12">
                    What Mentors Are Saying
                  </h3>

                  <div className="max-w-3xl mx-auto">
                    <Card className="bg-[#F9F7F4] border-0">
                      <CardContent className="p-8">
                        <div className="flex justify-center mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                          ))}
                        </div>

                        {mentorTestimonial === 0 && (
                          <>
                            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                              "I was struggling to connect with my 14-year-old son. This course gave me the exact
                              conversation starters I needed. Now we have meaningful talks every week, and I can see him
                              opening up about his goals and fears. Game-changer for our relationship."
                            </p>
                            <div className="flex items-center justify-center gap-4">
                              <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center">
                                <span className="text-2xl font-bold text-gold">SM</span>
                              </div>
                              <div className="text-left">
                                <p className="font-bold text-navy">Sarah M.</p>
                                <p className="text-sm italic text-muted-foreground">
                                  Mother of teenage son, California
                                </p>
                              </div>
                            </div>
                          </>
                        )}

                        {mentorTestimonial === 1 && (
                          <>
                            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                              “As a mentor for several years, I’ve never encountered a program that sharpened my
                              perspective like the Poised Young Gentleman experience. Observing it gave me powerful
                              insights that will make me a better mentor—and I’m now actively seeking certification to
                              carry this mission forward.”
                            </p>
                            <div className="flex items-center justify-center gap-4">
                              <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center">
                                <span className="text-2xl font-bold text-gold">MT</span>
                              </div>
                              <div className="text-left">
                                <p className="font-bold text-navy">Adam S.</p>
                                <p className="text-sm italic text-muted-foreground">Son of a Saint Mentor</p>
                              </div>
                            </div>
                          </>
                        )}

                        {mentorTestimonial === 2 && (
                          <>
                            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                              "We launched this program across 25 mentors in our after-school program. Setup took less
                              than a week, and the built-in tracking makes grant reporting so much easier. Our mentors
                              love the structure, and the kids are more engaged than ever."
                            </p>
                            <div className="flex items-center justify-center gap-4">
                              <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center">
                                <span className="text-2xl font-bold text-gold">JL</span>
                              </div>
                              <div className="text-left">
                                <p className="font-bold text-navy">Dr. Jennifer Liu</p>
                                <p className="text-sm italic text-muted-foreground">
                                  Director, Youth Development Center
                                </p>
                              </div>
                            </div>
                          </>
                        )}

                        <div className="flex justify-center gap-2 mt-8">
                          {[0, 1, 2].map((index) => (
                            <button
                              key={index}
                              onClick={() => setMentorTestimonial(index)}
                              className={`w-2 h-2 rounded-full transition-all ${
                                mentorTestimonial === index ? "bg-gold w-8" : "bg-gold/30"
                              }`}
                              aria-label={`View testimonial ${index + 1}`}
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* FAQ Accordion */}
                <div className="mb-16" id="faqs">
                  <h3 className="font-heading text-3xl font-bold text-navy text-center mb-12">
                    Frequently Asked Questions
                  </h3>

                  <Accordion type="single" collapsible className="max-w-3xl mx-auto">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-lg font-bold text-navy text-left">
                        Is this only for parents, or can professional mentors use it too?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Both! The curriculum works for parents mentoring their own children AND for professional mentors
                        working with youth in schools, nonprofits, or community programs. We have pricing tiers designed
                        for each audience.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-lg font-bold text-navy text-left">
                        What age range does this program cover?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        The course is designed for mentoring youth ages 10–17 (tweens and teens). The principles apply
                        across this age range, with specific adaptations for younger vs. older adolescents included in
                        the modules.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-lg font-bold text-navy text-left">
                        How long does it take to complete the course?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        At your own pace! Most parents complete it in 4–6 weeks (about 2–3 hours per week). Professional
                        mentors often finish faster. All 18 Kahoot! modules are immediately accessible, and you have
                        lifetime access to go back and review.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                      <AccordionTrigger className="text-lg font-bold text-navy text-left">
                        Do I need any special technology or Kahoot! experience?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Nope! If you can click a button, you can do this course. Kahoot! is incredibly user-friendly.
                        All you need is a computer, tablet, or smartphone with internet access. No prior Kahoot!
                        experience required.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5">
                      <AccordionTrigger className="text-lg font-bold text-navy text-left">
                        What if I'm mentoring a child with special needs or unique circumstances?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        While the core curriculum covers typical youth development, the community forum is a great place
                        to get personalized advice for unique situations. Certification tier students also get 1-on-1
                        coaching where we can address specific challenges.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-6">
                      <AccordionTrigger className="text-lg font-bold text-navy text-left">
                        Is there a money-back guarantee?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Yes! We offer a 30-day satisfaction guarantee. If you complete the first 3 modules and feel this
                        isn't right for you, we'll refund your purchase—no questions asked. We're confident you'll find
                        value immediately.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* Final CTA Section */}
                <div className="bg-primary rounded-2xl p-8 md:p-16 text-center text-primary-foreground shadow-xl border border-gold/40">
                  <h3 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                    Ready to Transform Your Mentorship?
                  </h3>
                  <p className="text-xl text-primary-foreground/80 mb-8">
                    Join hundreds of parents and mentors building stronger connections with youth
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                    <div className="flex items-center gap-2">
                      <Users className="w-7 h-7 text-gold" />
                      <div className="text-left">
                        <p className="text-2xl font-bold text-gold">500+</p>
                        <p className="text-sm text-white/70">Mentors Trained</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                        ))}
                      </div>
                      <div className="text-left">
                        <p className="text-2xl font-bold text-gold">4.8/5</p>
                        <p className="text-sm text-white/70">Average Rating</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    <Button variant="hero" size="lg" className="text-lg px-8">
                      Enroll in Core Course - $97
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8"
                    >
                      Download Free Course Preview
                    </Button>
                  </div>

                  <div className="flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/70 mb-6">
                    <span>✓ 30-Day Money-Back Guarantee</span>
                    <span>✓ Lifetime Access Included</span>
                    <span>✓ Trusted by 300+ Organizations</span>
                  </div>

                  <p className="text-sm text-primary-foreground/60">
                    Questions? Email us at info@poisedgentlemen.com or{" "}
                    <a href="/contact" className="text-gold hover:underline">
                      schedule a free 15-min consultation
                    </a>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* Pricing Philosophy */}
      <section id="organizations" className="py-20 bg-muted">
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
            <div className="bg-background p-6 rounded-lg border border-gold/20">
              <h3 className="font-bold text-xl mb-2">Institutional Partnerships</h3>
              <p className="text-muted-foreground mb-4">
                Schools, nonprofits, and organizations can request custom quotes for group programming. Volume discounts
                available.
              </p>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact#partnership-form">Request Partnership Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Forms */}
      <section id="inquiry-forms" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Youth Program Inquiry Form */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-2xl">Youth Program Interest Form</CardTitle>
                <CardDescription>
                  Share a few details and we’ll follow up about bringing PYG to your city or organization.
                </CardDescription>
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
                    {youthErrors.parentName && (
                      <p className="text-xs text-destructive mt-1">{youthErrors.parentName}</p>
                    )}
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
                    {youthErrors.email && <p className="text-xs text-destructive mt-1">{youthErrors.email}</p>}
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
                    {youthErrors.phone && <p className="text-xs text-destructive mt-1">{youthErrors.phone}</p>}
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
                    {youthErrors.studentName && (
                      <p className="text-xs text-destructive mt-1">{youthErrors.studentName}</p>
                    )}
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
                    {youthErrors.studentAge && (
                      <p className="text-xs text-destructive mt-1">{youthErrors.studentAge}</p>
                    )}
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
                    {youthErrors.challenges && (
                      <p className="text-xs text-destructive mt-1">{youthErrors.challenges}</p>
                    )}
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
            Whether you're bringing PYG to your city or becoming a trained mentor yourself, the first step is reaching
            out. We're here to answer questions and find the right fit.
          </p>
          <div className="flex justify-center">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-10">
              <Link to="/contact">Let’s Talk</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Programs;
