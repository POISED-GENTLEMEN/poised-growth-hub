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
          <h1 className="font-heading text-4xl md:text-[56px] font-bold text-white mb-4">
            Poised Gentlemen Programs
          </h1>
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
              className={`px-5 py-2 rounded-full border border-gold tex
