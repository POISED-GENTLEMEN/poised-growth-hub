import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  CheckCircle2,
  Star,
  Shield,
  Download,
  MessageCircle,
  Clock,
  HelpCircle,
  Target,
  Heart,
  Handshake,
  Brain,
  Users,
  TrendingUp,
  Award,
  Book,
  DollarSign,
  Smartphone,
  HeartHandshake,
  Briefcase,
  Sparkles,
  Lightbulb,
  Gamepad2,
  FileText,
  Play,
  Quote,
  Mail,
  Phone,
} from "lucide-react";
import mentorImage from "@/assets/youth-mentorship.jpg";

const MentorTraining = () => {
  const [expandedCurriculum, setExpandedCurriculum] = useState(false);

  const modules = [
    { icon: MessageCircle, title: "Active Listening" },
    { icon: Target, title: "SMART Goals" },
    { icon: Heart, title: "Emotional Intelligence" },
    { icon: Handshake, title: "Conflict Resolution" },
    { icon: Brain, title: "Identity & Values" },
    { icon: Lightbulb, title: "Decision-Making" },
    { icon: Book, title: "Academic Success" },
    { icon: Users, title: "Social Skills" },
    { icon: Award, title: "Leadership Development" },
    { icon: DollarSign, title: "Financial Literacy" },
    { icon: Smartphone, title: "Digital Citizenship" },
    { icon: HeartHandshake, title: "Mental Health" },
    { icon: Briefcase, title: "Career Exploration" },
    { icon: TrendingUp, title: "Physical Wellness" },
    { icon: Sparkles, title: "Spiritual Growth" },
    { icon: Users, title: "Community Engagement" },
    { icon: Target, title: "Long-Term Planning" },
    { icon: Brain, title: "Critical Thinking" },
  ];

  const pricingTiers = [
    {
      name: "Core Course",
      price: "$97",
      billing: "One-time payment",
      description: "Perfect for parents and individual mentors",
      featured: true,
      features: [
        "Complete 18-Kahoot course access",
        "Downloadable workbooks & templates",
        "Email support",
        "Private community group access",
        "Course completion certificate",
        "Lifetime access to content",
      ],
      cta: "Get Started",
      link: "/contact",
    },
    {
      name: "Course + Community",
      price: "$197",
      billing: "One-time payment",
      description: "For mentors seeking ongoing support",
      featured: false,
      features: [
        "Everything in Core Course",
        "Monthly live Q&A sessions",
        "Peer mentorship matching",
        "Advanced resource library",
        "Priority email support",
        "Quarterly skill-building workshops",
      ],
      cta: "Join Community",
      link: "/contact",
    },
    {
      name: "Certification Program",
      price: "$497",
      billing: "One-time payment",
      description: "Professional credential + personalized coaching",
      featured: false,
      features: [
        "Everything in Tier 2",
        "Professional Mentor Certification",
        "4 live group coaching calls",
        "One-on-one coaching session (30 min)",
        "Mentor toolkit with session guides",
        "Lifetime content updates",
        "Professional LinkedIn badge",
      ],
      cta: "Get Certified",
      link: "/contact",
    },
  ];

  const testimonials = [
    {
      before: "I was struggling to connect with my 15-year-old daughter. Every conversation felt like pulling teeth, and I could feel us drifting apart.",
      after: "After completing Module 3 on Active Listening, our conversations completely shifted. I learned to ask open-ended questions and truly listen without jumping to solutions.",
      result: "We now have weekly 'check-in' dinners, and she actually opens up about school stress and friend drama. Our relationship is stronger than ever.",
      name: "Jennifer R.",
      role: "Mother of 2",
      rating: 5,
    },
    {
      before: "As a youth coach, I had the passion but lacked structure. I felt like I was making it up as I went along, with no way to track progress.",
      after: "The goal-setting templates from Module 4 transformed how I work with kids. Now every session has a purpose, and we're documenting wins along the way.",
      result: "My mentees are achieving their goals at 3x the rate, and I can PROVE it to my organization. This has opened doors for funding and expansion.",
      name: "Marcus T.",
      role: "Big Brothers Big Sisters",
      rating: 5,
    },
    {
      before: "We needed a scalable mentorship curriculum for our after-school program but couldn't afford to develop one from scratch.",
      after: "We deployed this across 30 mentors in 2 weeks. The training was so intuitive that our volunteers were implementing strategies immediately.",
      result: "Engagement is up 60%, and our grant reports practically write themselves now. The ROI has been incredible—this program paid for itself in 3 months.",
      name: "Dr. Lisa Chen",
      role: "Youth Center Director",
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: "Is this only for parents, or can professional mentors use it too?",
      answer: "Both! The curriculum works for parents mentoring their own children AND for professional mentors working with youth in schools, nonprofits, or community programs. We have pricing tiers designed for each audience.",
    },
    {
      question: "What age range does this program cover?",
      answer: "The course is designed for mentoring youth ages 10-17 (tweens and teens). The principles apply across this age range, with specific adaptations for younger vs. older adolescents included in the modules.",
    },
    {
      question: "How long does it take to complete the course?",
      answer: "At your own pace! Most parents complete it in 4-6 weeks (about 2-3 hours per week). Professional mentors often finish faster. All 18 Kahoot! modules are immediately accessible, and you have lifetime access to go back and review.",
    },
    {
      question: "Do I need any special technology or Kahoot! experience?",
      answer: "Nope! If you can click a button, you can do this course. Kahoot! is incredibly user-friendly. All you need is a computer, tablet, or smartphone with internet access. No prior Kahoot! experience required.",
    },
    {
      question: "What if I'm mentoring a child with special needs or unique circumstances?",
      answer: "While the core curriculum covers typical youth development, the community forum is a great place to get personalized advice for unique situations. Certification tier students also get 1-on-1 coaching where we can address specific challenges.",
    },
    {
      question: "Is there a money-back guarantee?",
      answer: "Yes! We offer a 30-day satisfaction guarantee. If you complete the first 3 modules and feel this isn't right for you, we'll refund your purchase—no questions asked. We're confident you'll find value immediately.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex flex-col md:flex-row">
        {/* Left Side - Image */}
        <div className="relative w-full md:w-1/2 h-[300px] md:h-auto">
          <img
            src={mentorImage}
            alt="Parent mentoring teen with structured guidance"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/40 to-transparent" />
        </div>

        {/* Right Side - Content */}
        <div className="w-full md:w-1/2 bg-navy text-white px-8 md:px-16 py-12 md:py-20 flex flex-col justify-center">
          <Badge className="mb-4 w-fit bg-white text-navy">NEW TRAINING PROGRAM</Badge>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            The Structured Mentorship Roadmap
          </h1>
          <p className="text-2xl md:text-3xl text-gold mb-4">
            Help Your Teen Thrive in 10 Weeks
          </p>
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
            Finally, a step-by-step system to guide meaningful conversations with your tween or teen. 
            Stop guessing, start mentoring with confidence.
          </p>

          {/* Trust Indicators */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-gold" />
              <span className="text-white">500+ Parents & Mentors Trained</span>
            </div>
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-gold" />
              <span className="text-white">4.8★ Average Rating (127 reviews)</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-gold" />
              <span className="text-white">30-Day Money-Back Guarantee</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-gold text-navy hover:bg-gold/90 text-base font-bold">
              <Link to="/contact">Enroll in Core Course - $97</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-navy">
              <Link to="#pricing">Download Free Preview</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Problem/Agitation Section */}
      <section className="py-16 md:py-20 bg-light-gold px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center text-navy mb-12">
            Does This Sound Familiar?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <Card className="bg-white">
              <CardHeader>
                <MessageCircle className="w-12 h-12 text-gold mb-4" />
                <CardTitle className="text-xl text-navy">Conversations Go Nowhere</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  You try to talk about goals and future, but all you get are one-word answers and eye rolls. 
                  You want to connect, but don't know how.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <HelpCircle className="w-12 h-12 text-gold mb-4" />
                <CardTitle className="text-xl text-navy">You Feel Unprepared</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Parenting books are generic. You need specific strategies for THIS stage, THIS generation, 
                  and YOUR unique kid. You're winging it and you know it.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <Clock className="w-12 h-12 text-gold mb-4" />
                <CardTitle className="text-xl text-navy">No Time to Research</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Between work, life, and everything else, when do you have hours to read books or piece together 
                  advice from blogs? You need a system that just works.
                </p>
              </CardContent>
            </Card>
          </div>

          <p className="text-center text-lg italic text-muted-foreground">
            You're not alone. Thousands of parents feel this exact same way.
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 md:py-20 bg-white px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-center text-navy mb-4">
            Introducing: Youth Mentorship Training
          </h2>
          <p className="text-xl md:text-2xl text-center text-muted-foreground mb-12">
            The only structured, gamified program for mentoring tweens and teens
          </p>

          {/* Video/Image Placeholder */}
          <div className="relative max-w-4xl mx-auto mb-16 rounded-lg overflow-hidden shadow-2xl">
            <img
              src={mentorImage}
              alt="Course dashboard overview"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-navy/60 flex items-center justify-center">
              <div className="text-center text-white">
                <Play className="w-20 h-20 mx-auto mb-4 text-gold" />
                <p className="text-lg">Watch Course Overview (2:30)</p>
              </div>
            </div>
          </div>

          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            18 engaging modules covering everything from communication to career exploration
          </p>

          {/* Three Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white">
              <CardHeader>
                <CheckCircle2 className="w-10 h-10 text-gold mb-4" />
                <CardTitle className="text-xl text-navy">Proven Curriculum</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  18 modules based on youth development research, mentorship best practices, and real-world 
                  testing with 500+ families.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <Gamepad2 className="w-10 h-10 text-gold mb-4" />
                <CardTitle className="text-xl text-navy">Engaging Format</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Interactive quizzes keep you engaged (and if you share with your teen, THEY'LL actually 
                  want to participate too).
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <FileText className="w-10 h-10 text-gold mb-4" />
                <CardTitle className="text-xl text-navy">Immediate Application</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Downloadable conversation starters, goal trackers, and session guides. Implement what you 
                  learn TODAY.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-16 md:py-20 bg-navy text-white px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            What's Inside the Program
          </h2>
          <p className="text-xl text-center text-gray-300 mb-12">
            18 interactive modules covering every aspect of youth mentorship
          </p>

          {/* Module Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {modules.map((module, index) => {
              const IconComponent = module.icon;
              return (
                <div
                  key={index}
                  className="group p-4 border border-white/20 rounded-lg hover:border-gold hover:shadow-lg transition-all cursor-pointer"
                >
                  <IconComponent className="w-8 h-8 text-gold mb-2 mx-auto" />
                  <p className="text-sm font-semibold text-center">{module.title}</p>
                </div>
              );
            })}
          </div>

          {/* Expandable Curriculum Details */}
          <div className="text-center">
            <Button
              variant="outline"
              className="border-gold text-gold hover:bg-gold hover:text-navy"
              onClick={() => setExpandedCurriculum(!expandedCurriculum)}
            >
              {expandedCurriculum ? "Hide" : "See"} Full Curriculum Details ↓
            </Button>
          </div>

          {expandedCurriculum && (
            <div className="mt-8 space-y-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="module-1" className="border-white/20">
                  <AccordionTrigger className="text-white hover:text-gold">
                    Module 1: Foundation - Understanding Youth Development
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Learn the psychological and emotional stages of adolescent development. Understand what's 
                    normal, what's concerning, and how to adapt your approach for different ages.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="module-2" className="border-white/20">
                  <AccordionTrigger className="text-white hover:text-gold">
                    Module 2: Communication - Active Listening
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Master the art of truly hearing what your teen is saying (and not saying). Practical techniques 
                    for asking open-ended questions and creating safe spaces for dialogue.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="module-3" className="border-white/20">
                  <AccordionTrigger className="text-white hover:text-gold">
                    Module 3: Goal-Setting - SMART Goals Framework
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Help teens set and achieve meaningful goals. Includes downloadable templates and tracking 
                    systems that keep them accountable without being pushy.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <p className="text-center text-gray-400 text-sm">
                + 15 more detailed modules covering emotional intelligence, conflict resolution, leadership, 
                financial literacy, and more
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 bg-light-gold px-4 scroll-mt-32">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-center text-navy mb-4">
            Choose Your Path
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-12">
            Flexible options for every budget and goal
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {pricingTiers.map((tier, index) => (
              <Card
                key={index}
                className={`relative ${tier.featured ? "border-2 border-gold shadow-xl" : ""}`}
              >
                {tier.featured && (
                  <Badge className="absolute -top-3 right-4 bg-gold text-white">
                    MOST POPULAR
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl text-navy">{tier.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-navy">{tier.price}</span>
                    <p className="text-sm text-muted-foreground mt-1">{tier.billing}</p>
                  </div>
                  <CardDescription className="mt-2">{tier.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className={`w-full ${
                      tier.featured
                        ? "bg-gold text-navy hover:bg-gold/90"
                        : "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white"
                    }`}
                  >
                    <Link to={tier.link}>{tier.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-gold" />
                <span className="text-sm font-semibold">30-Day Money-Back Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-gold" />
                <span className="text-sm font-semibold">Secure Payment</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Organization & School licenses (10-50 users) starting at $997.{" "}
              <Link to="/contact" className="text-gold hover:underline font-semibold">
                Request Organization Quote →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 bg-white px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center text-navy mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-12">
            Real results from real mentors
          </p>

          <div className="space-y-12">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-light-gold">
                <CardContent className="p-8">
                  <Quote className="w-12 h-12 text-gold mb-4" />
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="font-semibold text-navy mb-2">Before:</p>
                      <p className="text-muted-foreground italic">{testimonial.before}</p>
                    </div>
                    
                    <div>
                      <p className="font-semibold text-navy mb-2">After:</p>
                      <p className="text-muted-foreground italic">{testimonial.after}</p>
                    </div>
                    
                    <div>
                      <p className="font-semibold text-navy mb-2">Result:</p>
                      <p className="text-gold font-semibold">{testimonial.result}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <p className="font-bold text-navy">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-light-gold px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center text-navy mb-12">
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg px-6 border-none">
                <AccordionTrigger className="text-left text-lg font-semibold text-navy hover:text-gold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 md:py-24 bg-navy text-white px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Ready to Transform Your Mentorship?
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Join 500+ parents and mentors building stronger connections with youth
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12">
            <div className="text-center">
              <p className="text-3xl font-bold text-gold">500+</p>
              <p className="text-gray-300">Mentors Trained</p>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1 justify-center mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-gray-300">4.8/5 Average Rating</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="bg-gold text-navy hover:bg-gold/90 text-lg font-bold px-12">
              <Link to="/contact">Enroll in Core Course - $97</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-navy">
              <Link to="/contact">Schedule Free Consultation</Link>
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-gold" />
              <span className="text-sm">30-Day Money-Back Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-gold" />
              <span className="text-sm">Lifetime Access Included</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6 text-gold" />
              <span className="text-sm">Trusted by 300+ Organizations</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
            <span>Questions?</span>
            <a href="mailto:support@poisedlegacy.com" className="flex items-center gap-1 text-gold hover:underline">
              <Mail className="w-4 h-4" />
              Email us
            </a>
            <span>or</span>
            <Link to="/contact" className="flex items-center gap-1 text-gold hover:underline">
              <Phone className="w-4 h-4" />
              Schedule a call
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MentorTraining;