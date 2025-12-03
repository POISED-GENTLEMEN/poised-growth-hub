import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Award, Heart, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCanonical } from "@/hooks/useCanonical";

const MentorshipPrograms = () => {
  useCanonical();

  const programs = [
    {
      title: "Youth Mentorship",
      ages: "Ages 13-17",
      duration: "7-Week Program",
      description: "Transform young men through the Four Pillars framework. Build integrity, strength, emotional intelligence, and discipline.",
      features: [
        "Weekly group sessions",
        "One-on-one mentoring",
        "Parent involvement workshops",
        "Grooming basics education",
        "Leadership development",
      ],
      cta: "Learn More",
      link: "/programs",
      badge: "Most Popular",
    },
    {
      title: "Adult Coaching",
      ages: "Ages 18+",
      duration: "Ongoing",
      description: "Master emotional intelligence and personal development through group coaching and digital courses.",
      features: [
        "EQ Assessment & development",
        "Group coaching sessions",
        "Self-paced digital courses",
        "Community support",
        "Professional development",
      ],
      cta: "Explore Coaching",
      link: "/programs",
      badge: null,
    },
    {
      title: "Corporate Partnerships",
      ages: "Organizations",
      duration: "Custom",
      description: "Partner with us to bring mentorship programs to your community, school, or organization.",
      features: [
        "Custom program design",
        "Mentor training",
        "Impact measurement",
        "Community events",
        "Brand partnership opportunities",
      ],
      cta: "Partner With Us",
      link: "/programs/partners",
      badge: "For Organizations",
    },
  ];

  const stats = [
    { value: "500+", label: "Young Men Mentored" },
    { value: "50+", label: "Trained Mentors" },
    { value: "7", label: "Years of Impact" },
    { value: "4", label: "Core Pillars" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[#C1A36C]"></div>
        <div className="relative z-10 text-center px-4 py-20">
          <Badge className="mb-4 bg-[#C1A36C] text-primary border-0">Building Legacy Through Mentorship</Badge>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Mentorship Programs
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Transforming lives through principled mentorship, emotional intelligence, and the Four Pillars framework.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#C1A36C] text-primary hover:bg-[#C1A36C]/90">
              <Link to="/programs">View All Programs</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              <Link to="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-3xl md:text-4xl font-heading font-bold text-[#C1A36C]">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 px-4 md:px-8 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary text-center mb-4">
            Our Programs
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Choose the program that fits your journey toward becoming a Poised Gentleman.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {programs.map((program, idx) => (
              <div
                key={idx}
                className="bg-background border border-border rounded-lg p-8 transition-all duration-300 hover:border-[#C1A36C] hover:shadow-lg relative"
              >
                {program.badge && (
                  <Badge className="absolute -top-3 left-6 bg-[#C1A36C] text-primary border-0">
                    {program.badge}
                  </Badge>
                )}
                <div className="mb-6">
                  <h3 className="text-2xl font-heading font-bold text-primary mb-2">{program.title}</h3>
                  <div className="flex gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {program.ages}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {program.duration}
                    </span>
                  </div>
                </div>

                <p className="text-foreground mb-6">{program.description}</p>

                <ul className="space-y-2 mb-8">
                  {program.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-[#C1A36C] mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button asChild className="w-full bg-primary hover:bg-primary/90">
                  <Link to={program.link} className="flex items-center justify-center gap-2">
                    {program.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Four Pillars Section */}
      <section className="py-20 px-4 md:px-8 bg-[#F9F7F4]">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
            The Four Pillars
          </h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            Our mentorship framework is built on four essential pillars that guide every Poised Gentleman.
          </p>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Heart, title: "Integrity", desc: "Character over convenience" },
              { icon: Award, title: "Strength", desc: "Mental, emotional, physical resilience" },
              { icon: Users, title: "Emotional Intelligence", desc: "Self-awareness and regulation" },
              { icon: Calendar, title: "Discipline", desc: "Consistency over motivation" },
            ].map((pillar, idx) => (
              <div key={idx} className="bg-background rounded-lg p-6 border border-border">
                <pillar.icon className="w-10 h-10 text-[#C1A36C] mx-auto mb-4" />
                <h3 className="font-heading font-bold text-primary mb-2">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-primary text-white text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Take the first step toward becoming a Poised Gentleman today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#C1A36C] text-primary hover:bg-[#C1A36C]/90">
              <Link to="/eq-assessment">Take Free EQ Assessment</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MentorshipPrograms;
