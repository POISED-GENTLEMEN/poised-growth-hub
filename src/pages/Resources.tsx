import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ShoppingCart, Target, Handshake, Calendar, Users, Brain, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { newsletterSchema } from "@/lib/validations";
import { useShop } from "@/contexts/ShopContext";

// Import images
import heroImage from "@/assets/hero-mentorship.jpg";
import youthImage from "@/assets/youth-mentorship.jpg";
import adultImage from "@/assets/adult-coaching.jpg";
import experiencesImage from "@/assets/live-experiences.jpg";

const Index = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [errors, setErrors] = useState<{ email?: string; firstName?: string }>({});
  const { products, addToCart } = useShop();

  // Filter for specific products to display
  const featuredProducts = products
    .filter(
      (p) =>
        p.name.toLowerCase().includes("fresh start") ||
        p.name.toLowerCase().includes("buoyant") ||
        p.name.toLowerCase().includes("body wash")
    )
    .slice(0, 3);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = newsletterSchema.safeParse({ email, firstName });
    if (!result.success) {
      const fieldErrors: { email?: string; firstName?: string } = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as "email" | "firstName"] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setEmail("");
    setFirstName("");
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* ---------------- HERO SECTION ---------------- */}
      <section
        className="relative min-h-[70vh] md:min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-primary/60" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white fade-in">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Redefine Your Masculinity. Build Your Legacy.
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Principled mentorship, emotional intelligence coaching, and premium grooming aligned with the Four Pillars.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="hero" asChild>
              <Link to="/programs">Explore Programs</Link>
            </Button>
            <Button size="lg" variant="hero" asChild>
              <Link to="/shop">Shop Grooming</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ---------------- FEEL / LOOK / BE SHARP ---------------- */}
      <section className="py-20 md:py-24 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-
