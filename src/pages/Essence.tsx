import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Droplet, BookOpen, Sparkles, Compass, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedLinks from "@/components/RelatedLinks";
import { useCanonical } from "@/hooks/useCanonical";
import { ScentQuiz } from "@/components/ScentQuiz";
import { shopifyUrl, trackShopClick } from "@/lib/shopifyLinks";

const ESSENCE_SHOPIFY_URL = shopifyUrl(
  "/collections/essence-collection",
  "essence_hub"
);

const DESC =
  "Premium fragrance for men who lead with intention. The Essence Collection — 12 scents built on the principle that how you present yourself is a form of discipline.";

const setMeta = (selector: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    const m = selector.match(/\[(\w+)="([^"]+)"\]/);
    if (m) el.setAttribute(m[1], m[2]);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
};

const scents: { name: string; family: string; notes: string; color: string; handle: string }[] = [
  { name: "Buoyant", family: "Aquatic & Fresh", notes: "Marine Accord, Bergamot, Cedarwood.", color: "#077DFE", handle: "buoyant-inspired-by-giorgio-armani" },
  { name: "Admiral's Odyssey", family: "Aquatic & Fresh", notes: "Green Leaf, Apple, Mimosa.", color: "#1E90FF", handle: "admirals-odyssey-inspired-by-nautica-voyage" },
  { name: "Vigaros", family: "Aromatic & Spicy", notes: "Mint, Green Apple, Lemon.", color: "#4B2E5C", handle: "vigaros-inspired-by-versace-eros" },
  { name: "Urban Wisdom", family: "Aromatic & Spicy", notes: "Pear, Bergamot, Lavender.", color: "#6B3A8A", handle: "urban-wisdom-inspired-by-coach-for-men" },
  { name: "Poised Sauvage", family: "Aromatic & Spicy", notes: "Calabrian Bergamot, Sichuan Pepper.", color: "#8B5A8C", handle: "poised-sauvage-inspired-by-dior-sauvage" },
  { name: "Light Breeze", family: "Citrus & Bright", notes: "Mandarin, Grapefruit, Juniper.", color: "#D97E3A", handle: "light-breeze-inspired-by-dolce-gabbana-light-blue" },
  { name: "L.Y. Creed", family: "Citrus & Bright", notes: "Blackcurrant, Pineapple, Bergamot.", color: "#E8A838", handle: "l-y-creed-inspired-by-creed-aventus" },
  { name: "Blue Harmony", family: "Woody & Earthy", notes: "Grapefruit, Cedar, Sandalwood.", color: "#CFB040", handle: "blue-harmony-inspired-by-bleu-de-chanel" },
  { name: "First Impression", family: "Woody & Earthy", notes: "Violet Leaf, Mandarin, Cedarwood.", color: "#B8960C", handle: "first-impression-inspired-by-bleu-de-chanel" },
  { name: "JSP (James Saint Patrick)", family: "Woody & Earthy", notes: "Bergamot, Apple, Sage.", color: "#8B7355", handle: "james-saint-patrick-jsp-inspired-by-yves-saint-laurent" },
  { name: "Fighting Trim", family: "Fresh & Green", notes: "Rosemary, Pineapple, Bergamot.", color: "#7ED957", handle: "fighting-trim-inspired-by-chrome-azzaro" },
  { name: "Seven Figures", family: "Oriental & Warm", notes: "Grapefruit, Mint, Blood Mandarin.", color: "#FF0707", handle: "seven-figures-inspired-by-paco-rabanne-1-million" },
];

const Essence = () => {
  useCanonical("/essence/");
  const [quizOpen, setQuizOpen] = useState(false);

  useEffect(() => {
    document.title = "The Essence Collection | Poised Gentlemen";
    setMeta('meta[name="description"]', DESC);
    setMeta('meta[property="og:title"]', "The Essence Collection | Poised Gentlemen");
    setMeta('meta[property="og:description"]', DESC);
    setMeta('meta[property="og:url"]', "https://poisedgentlemen.com/essence/");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-24 md:py-32">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Droplet className="h-10 w-10 mx-auto mb-6 opacity-80" />
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
            Grooming as Discipline. Fragrance as Identity.
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
            The Essence Collection — premium fragrance for the man committed
            to refinement.
          </p>
        </div>
      </section>

      {/* What it is */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8">
            What the Essence Collection Is
          </h2>
          <div className="prose prose-lg max-w-none text-foreground space-y-5">
            <p className="leading-relaxed">
              Poised Gentlemen built the Essence Collection because grooming
              is not vanity — it is a daily practice of discipline and
              self-respect. The man who presents himself with intention is
              telling the world, and more importantly himself, that he is
              someone worth showing up for.
            </p>
            <p className="leading-relaxed">
              Each of the twelve scents is composed around one of the Four
              Pillars — Integrity, Strength, Emotional Intelligence,
              Discipline — and built for the rhythms of a real life: the
              early morning, the room you have to walk into, the long
              evening, the quiet moment that belongs only to you.
            </p>
            <p className="leading-relaxed">
              This is fragrance as identity. Not a mask. A signature.
            </p>
          </div>
        </div>
      </section>

      {/* The 12 Scents */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              The Twelve Scents
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Six fragrance families. Twelve signatures. Built for the
              gentleman who knows the difference between attention and
              presence.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {scents.map((s) => {
              const productUrl = shopifyUrl(`/products/${s.handle}`, "essence_product_card");
              return (
                <Card key={s.name} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                  <div
                    className="h-2"
                    style={{ backgroundColor: s.color }}
                    aria-hidden
                  />
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                      {s.family}
                    </p>
                    <h3 className="font-heading font-bold text-xl mb-2">
                      {s.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                      {s.notes}
                    </p>
                    <Button
                      asChild
                      size="sm"
                      className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    >
                      <a
                        href={productUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackShopClick("essence_product_card", productUrl)}
                        aria-label={`Shop ${s.name} on Shopify`}
                      >
                        Shop {s.name}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <a
                href={ESSENCE_SHOPIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackShopClick("essence_hub", ESSENCE_SHOPIFY_URL)}
              >
                Shop the Essence Collection
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Find Your Signature Scent — quiz launcher */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Compass className="h-10 w-10 mx-auto mb-5 text-secondary" />
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Find Your Signature Scent
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Six questions. Two minutes. We'll match you to the scents in the
            Essence Collection built for your lifestyle, your standard, and the
            rooms you walk into.
          </p>
          <Button
            size="lg"
            onClick={() => setQuizOpen(true)}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            Take the Scent Quiz
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Grooming routine editorial */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <Sparkles className="h-8 w-8 text-secondary mb-4" />
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Where Fragrance Fits in the Daily Routine
          </h2>
          <div className="space-y-5 text-foreground leading-relaxed">
            <p>
              The Poised Gentleman's routine is built around a simple
              principle: the first five minutes of your morning install the
              standard for the next sixteen hours. Fragrance is the last
              step — applied after grooming, after dressing, after intent
              has already been set.
            </p>
            <p>
              Two pulse points. Once. Walk out the door. The man who
              over-applies is asking the room for something; the man who
              applies correctly has already decided what the room is going
              to get.
            </p>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            <Link to="/codex/teen-grooming-routine/" className="group">
              <Card className="p-6 h-full hover:shadow-md transition-shadow">
                <BookOpen className="h-5 w-5 text-secondary mb-3" />
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                  From the Codex
                </p>
                <p className="font-heading font-semibold group-hover:text-secondary transition-colors">
                  The Teen Grooming Routine That Builds Habits, Not Just
                  Hygiene
                </p>
              </Card>
            </Link>
            <Link to="/codex/how-to-build-discipline/" className="group">
              <Card className="p-6 h-full hover:shadow-md transition-shadow">
                <BookOpen className="h-5 w-5 text-secondary mb-3" />
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                  From the Codex
                </p>
                <p className="font-heading font-semibold group-hover:text-secondary transition-colors">
                  How to Build Discipline: A Framework for Men and Boys
                </p>
              </Card>
            </Link>
            <Link to="/codex/modern-masculinity/" className="group">
              <Card className="p-6 h-full hover:shadow-md transition-shadow">
                <BookOpen className="h-5 w-5 text-secondary mb-3" />
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                  From the Codex
                </p>
                <p className="font-heading font-semibold group-hover:text-secondary transition-colors">
                  Defining Modern Masculinity: Poised vs. Stoic
                </p>
              </Card>
            </Link>
            <Link to="/codex/" className="group">
              <Card className="p-6 h-full hover:shadow-md transition-shadow bg-primary text-primary-foreground">
                <BookOpen className="h-5 w-5 mb-3" />
                <p className="text-xs uppercase tracking-wide opacity-75 mb-1">
                  Explore
                </p>
                <p className="font-heading font-semibold">
                  All Codex articles
                </p>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Choose Your Signature
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Twelve scents. One standard. Shop the full Essence Collection.
          </p>
          <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
            <a
              href={ESSENCE_SHOPIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackShopClick("essence_hub", ESSENCE_SHOPIFY_URL)}
            >
              Shop the Essence Collection
              <ExternalLink className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>

      <ScentQuiz open={quizOpen} onOpenChange={setQuizOpen} />

      <RelatedLinks variant="essence" />

      <Footer />
    </div>
  );
};

export default Essence;
