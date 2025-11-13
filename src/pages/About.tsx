import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Shield, Dumbbell, Heart, Target } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/about-hero.jpg";
import davidProfessional from "@/assets/david-rachal-professional.jpg";
import davidTeam from "@/assets/team-david.jpg";
import kimberlyTeam from "@/assets/team-kimberly.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-[#1B2B3A]/70" />
        <div className="relative z-10 text-center px-6">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-4">
            We're Rewriting the Masculinity Playbook
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            One man. One boy. One Four Pillars conversation at a time.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  David Rachal III founded The Poised Gentlemen in 2023 after more than a decade 
                  of youth leadership and witnessing a crisis: boys and men lack roadmaps for 
                  emotional intelligence, character development, and refined presence.
                </p>
                <p>
                  Raised in New Orleans, David understood early that masculinity wasn't about 
                  bravado—it was about integrity, strength, emotional fluency, and discipline. 
                  After earning his MBA and working in corporate leadership, he felt called to 
                  bridge the gap between traditional male development and modern emotional intelligence.
                </p>
                <p>
                  The Four Pillars Framework was born from research in Positive Youth Development, 
                  Trauma-Informed Care, and Social-Emotional Learning—combined with real-world 
                  mentorship experience. It's not just theory. It's a teachable, repeatable system 
                  that works for boys, men, and institutions.
                </p>
                <p>
                  Today, The Poised Gentlemen serves 500+ individuals annually through youth 
                  mentorship, adult coaching, grooming products, and partnerships with organizations 
                  like Son of a Saint and AmeriHealth Caritas.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src={davidProfessional} 
                alt="David Rachal III, Founder of The Poised Gentlemen"
                className="rounded-lg shadow-xl max-w-md w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-6 bg-muted">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-12">
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
              Our Mission
            </h3>
            <p className="text-xl text-muted-foreground">
              To redefine masculinity by cultivating character, emotional intelligence, 
              and refined presence across generations.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
              Our Vision
            </h3>
            <p className="text-xl text-muted-foreground">
              A world where every boy has a mentor, every man has a framework, and masculinity 
              is synonymous with integrity.
            </p>
          </div>
        </div>
      </section>

      {/* Four Pillars Deep Dive Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
              The Four Pillars Framework
            </h2>
            <p className="text-xl text-muted-foreground">
              A teachable, repeatable system for personal evolution.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="integrity" className="border border-border rounded-lg px-6 data-[state=open]:border-l-[5px] data-[state=open]:border-l-[#D4AF37]">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-[#D4AF37]" />
                  <span className="font-heading text-xl font-bold">
                    INTEGRITY — Character Over Convenience
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-4 pt-4">
                <p>
                  Integrity means alignment—your actions match your values, even when no one's 
                  watching. It's choosing principle over popularity, truth over trends. Your word 
                  is your bond, and your choices define your character.
                </p>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Research Basis:</h4>
                  <p>
                    Studies show that character strengths (like honesty, courage, and fairness) 
                    predict long-term life satisfaction more than intelligence or talent. Integrity 
                    builds trust, strengthens relationships, and creates opportunities.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">In Practice:</h4>
                  <p>
                    A man with integrity admits his mistakes, keeps his commitments, and treats 
                    everyone with respect—from the CEO to the janitor. He does what's right, not 
                    what's easy.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">For Youth:</h4>
                  <p>
                    We teach boys that integrity starts small: returning extra change, telling 
                    the truth when it's hard, standing up for others. Small acts of integrity 
                    compound into character.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="strength" className="border border-border rounded-lg px-6 data-[state=open]:border-l-[5px] data-[state=open]:border-l-[#D4AF37]">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <Dumbbell className="h-6 w-6 text-[#D4AF37]" />
                  <span className="font-heading text-xl font-bold">
                    STRENGTH — Physical, Mental, Emotional Resilience
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-4 pt-4">
                <p>
                  True strength isn't about domination—it's discipline. Physical fitness, mental 
                  fortitude, and emotional regulation create a foundation for leadership. Strength 
                  means knowing when to stand firm and when to be flexible.
                </p>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Research Basis:</h4>
                  <p>
                    Physical exercise improves mental health, cognitive function, and emotional 
                    regulation. Mental resilience (grit) predicts success across domains. Emotional 
                    strength allows leaders to stay calm under pressure.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">In Practice:</h4>
                  <p>
                    A strong man trains his body, fortifies his mind through learning and challenge, 
                    and regulates his emotions instead of exploding or shutting down. He persists 
                    through failure and adapts to change.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">For Youth:</h4>
                  <p>
                    We teach boys that strength is saying no to peer pressure, asking for help when 
                    needed, and persisting through difficulty. Strength is built through consistent 
                    effort, not isolated achievements.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="emotional-intelligence" className="border border-border rounded-lg px-6 data-[state=open]:border-l-[5px] data-[state=open]:border-l-[#D4AF37]">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <Heart className="h-6 w-6 text-[#D4AF37]" />
                  <span className="font-heading text-xl font-bold">
                    EMOTIONAL INTELLIGENCE — Self-Awareness, Empathy, Regulation
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-4 pt-4">
                <p>
                  Modern masculinity requires emotional fluency. Understand your triggers. 
                  Communicate your needs. Read the room. Empathy isn't weakness—it's strategic 
                  awareness. Master your emotions or they'll master you.
                </p>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Research Basis:</h4>
                  <p>
                    EQ predicts career success, relationship quality, and mental health outcomes. 
                    Men with higher EQ report greater life satisfaction and stronger social networks. 
                    Emotional intelligence can be learned and practiced.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">In Practice:</h4>
                  <p>
                    An emotionally intelligent man names his feelings, considers others' perspectives, 
                    and chooses responses instead of reacting. He communicates clearly, listens 
                    actively, and resolves conflict constructively.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">For Youth:</h4>
                  <p>
                    We teach boys to identify emotions (not just "mad" or "fine"), express needs 
                    clearly, and practice empathy through perspective-taking exercises. Emotional 
                    intelligence is taught through role-play, reflection, and real-world practice.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="discipline" className="border border-border rounded-lg px-6 data-[state=open]:border-l-[5px] data-[state=open]:border-l-[#D4AF37]">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <Target className="h-6 w-6 text-[#D4AF37]" />
                  <span className="font-heading text-xl font-bold">
                    DISCIPLINE — Consistent Action, Delayed Gratification
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-4 pt-4">
                <p>
                  Motivation fades. Discipline endures. Small, consistent actions compound into 
                  legacy. Wake up early. Show up daily. Choose the hard right over the easy wrong. 
                  Discipline over motivation, always.
                </p>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Research Basis:</h4>
                  <p>
                    Self-control and delayed gratification predict academic achievement, financial 
                    stability, and health outcomes decades later (famous "marshmallow test"). 
                    Discipline is a skill that can be strengthened through practice.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">In Practice:</h4>
                  <p>
                    A disciplined man builds systems, not willpower. He automates good habits, 
                    eliminates temptations, and stays consistent. He understands that excellence 
                    is a habit, not an event.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">For Youth:</h4>
                  <p>
                    We teach boys that discipline starts with small wins: making your bed, finishing 
                    homework before gaming, practicing a skill for 15 minutes daily. These small 
                    actions build the neural pathways for lifelong discipline.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-center text-foreground mb-12">
            Meet the Team
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* David Rachal III */}
            <div className="text-center">
              <img 
                src={davidTeam}
                alt="David Rachal III, Founder & Lead Coach"
                className="w-48 h-48 rounded-full mx-auto mb-6 object-cover shadow-lg"
              />
              <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                David Rachal III, MBA
              </h3>
              <p className="text-[#D4AF37] font-semibold mb-4">
                Founder & Lead Coach
              </p>
              <p className="text-muted-foreground max-w-md mx-auto">
                10+ years in youth leadership. MBA. Creator of the Four Pillars Framework. 
                Passionate about bridging generations through intentional mentorship. Based in 
                New Orleans, David has mentored 500+ individuals and partnered with leading 
                organizations to redefine masculinity.
              </p>
            </div>

            {/* Kimberly N. Beshears */}
            <div className="text-center">
              <img 
                src={kimberlyTeam}
                alt="Kimberly N. Beshears, Trauma-Informed Curriculum Advisor"
                className="w-48 h-48 rounded-full mx-auto mb-6 object-cover shadow-lg"
              />
              <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                Kimberly N. Beshears
              </h3>
              <p className="text-[#D4AF37] font-semibold mb-4">
                Trauma-Informed Curriculum Advisor
              </p>
              <p className="text-muted-foreground max-w-md mx-auto">
                Expert in trauma-informed care and youth development. Ensures all programming 
                centers healing and safety. Kimberly brings decades of experience in 
                social-emotional learning and positive youth development.
              </p>
            </div>
          </div>

          {/* Digital Team Mention */}
          <div className="mt-16 text-center max-w-3xl mx-auto">
            <h4 className="font-heading text-xl font-bold text-foreground mb-4">
              Powered by Innovation
            </h4>
            <p className="text-muted-foreground">
              Our digital assistants—Penn, Buddy, Milli, and Gigi—help power personalized 
              learning experiences and program logistics, ensuring every participant receives 
              tailored support.
            </p>
          </div>
        </div>
      </section>

      {/* Partnerships & Impact Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-center text-foreground mb-12">
            Partnerships & Impact
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* In Development */}
            <div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                In Development
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-[#D4AF37] mt-1">•</span>
                  <span>Poised Mentor Certification (launching 2026)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4AF37] mt-1">•</span>
                  <span>National accreditation for youth curriculum</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4AF37] mt-1">•</span>
                  <span>B Corp certification (in progress)</span>
                </li>
              </ul>
            </div>

            {/* Current Partners */}
            <div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                Current Partners
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-[#D4AF37] mt-1">•</span>
                  <span>Son of a Saint (youth mentorship)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4AF37] mt-1">•</span>
                  <span>AmeriHealth Caritas (community wellness)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4AF37] mt-1">•</span>
                  <span>Black-owned brand collaborations</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Community Impact Stats */}
          <div className="bg-[#1B2B3A] rounded-lg p-8 text-white">
            <h3 className="font-heading text-2xl font-bold text-center mb-8">
              Community Impact
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">500+</div>
                <div className="text-sm">Individuals Mentored Since 2023</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">98%</div>
                <div className="text-sm">Participant Satisfaction Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">5+</div>
                <div className="text-sm">Local Organization Partnerships</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">2023</div>
                <div className="text-sm">Founded in New Orleans</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 bg-[#D4AF37]">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-[#1B2B3A] mb-6">
            Ready to Join the Movement?
          </h2>
          <p className="text-xl text-[#1B2B3A] mb-8">
            Whether you're looking for mentorship, coaching, or grooming products aligned 
            with your values, we're here to serve.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-[#1B2B3A] text-white hover:bg-[#1B2B3A]/90"
            >
              <Link to="/programs">Explore Programs</Link>
            </Button>
            <Button 
              asChild
              size="lg"
              className="bg-[#1B2B3A] text-white hover:bg-[#1B2B3A]/90"
            >
              <Link to="/shop">Shop Grooming</Link>
            </Button>
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-[#1B2B3A] text-[#1B2B3A] hover:bg-[#1B2B3A] hover:text-white"
            >
              <Link to="/contact">Partner With Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
