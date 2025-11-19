import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ParentBadge from "@/components/ParentBadge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock, FileText, BookOpen, Award, Heart } from "lucide-react";
import articleFeatured from "@/assets/article-featured.jpg";
import articleGrooming from "@/assets/article-grooming.jpg";
import articleEq from "@/assets/article-eq.jpg";
import articleFatherhood from "@/assets/article-fatherhood.jpg";
import articleDiscipline from "@/assets/article-discipline.jpg";
import articleStrength from "@/assets/article-strength.jpg";
import articleIngredients from "@/assets/article-ingredients.jpg";
import articleLegacy from "@/assets/article-legacy.jpg";
import articleMentorship from "@/assets/article-mentorship.jpg";
import articleProfessional from "@/assets/article-professional.jpg";
import articleStoic from "@/assets/article-stoic.jpg";
import articleTeenAcne from "@/assets/article-teen-acne.jpg";
import articleForged from "@/assets/article-forged-story.jpg";
import articleModernMasculinity from "@/assets/article-modern-masculinity.jpg";
import articlePoisedSteps from "@/assets/article-poised-steps.jpg";
import articleEmotionalBlueprint from "@/assets/article-emotional-blueprint.jpg";
import articleFathersDay from "@/assets/article-fathers-day-2025.jpg";

type Category =
  | "All Articles"
  | "Four Pillars"
  | "Presence & Etiquette"
  | "Masculinity FAQs"
  | "Mindfulness";

interface Article {
  id: number;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: Category;
  image: string;
  readTime: number;
  author?: string;
  pillar: string;
  isParentResource?: boolean;
  url: string; // link back to Shopify blog
}

const articles: Article[] = [
  {
    id: 1,
    slug: "the-poised-gentleman-the-modern-day-stoic",
    title: "The Poised Gentleman: The Modern Day Stoic",
    date: "August 26, 2024", // from blog
    excerpt:
      "How modern Stoic principles like self-mastery, integrity, and emotional resilience shape the Poised Gentleman.",
    category: "Mindfulness",
    image: articleStoic,
    readTime: 8,
    author: "David Rachal III",
    pillar: "Integrity",
    url: "https://poisedgentlemen.com/blogs/news/the-poised-gentleman-the-modern-day-stoic",
  },
  {
    id: 2,
    slug: "conquering-teen-boy-acne-odor-parents-roadmap",
    title: "Conquering Teen Boy Acne & Odor: A Parent’s Roadmap",
    date: "June 26, 2025",
    excerpt:
      "A practical guide to helping teen boys handle acne, body odor, and grooming in a way that protects their confidence.",
    category: "Presence & Etiquette",
    image: articleTeenAcne,
    readTime: 10,
    author: "David Rachal III",
    pillar: "Discipline",
    isParentResource: true,
    url: "https://poisedgentlemen.com/blogs/news/conquering-teen-boy-acne-odor-parents-roadmap",
  },
  {
    id: 3,
    slug: "forged-not-fabricated-my-story-behind-the-poised-gentleman",
    title: "Forged, Not Fabricated: My Story Behind The Poised Gentleman",
    date: "June 17, 2025",
    excerpt:
      "David’s personal story of how hardship, not comfort, forged the standards behind The Poised Gentleman.",
    category: "Four Pillars",
    image: articleForged,
    readTime: 7,
    author: "David Rachal III",
    pillar: "All Four Pillars",
    url: "https://poisedgentlemen.com/blogs/news/forged-not-fabricated-my-story-behind-the-poised-gentleman",
  },
  {
    id: 4,
    slug: "poised-modern-masculinity",
    title: "Modern Masculinity: How to Become a Poised Gentleman Today",
    date: "May 14, 2025",
    excerpt:
      "An eight-dimension framework for style, discipline, emotional intelligence, and influence in modern masculinity.",
    category: "Masculinity FAQs",
    image: articleModernMasculinity,
    readTime: 9,
    author: "David Rachal III",
    pillar: "All Four Pillars",
    url: "https://poisedgentlemen.com/blogs/news/poised-modern-masculinity",
  },
  {
    id: 5,
    slug: "becoming-poised-gentleman-essential",
    title: "Becoming a Poised Gentleman: Essential Steps to Refinement",
    date: "August 25, 2024",
    excerpt:
      "Ten essential steps—from emotional intelligence to culture and contribution—for men serious about refinement.",
    category: "Four Pillars",
    image: articlePoisedSteps,
    readTime: 11,
    author: "David Rachal III",
    pillar: "All Four Pillars",
    url: "https://poisedgentlemen.com/blogs/news/becoming-poised-gentleman-essential",
  },
  {
    id: 6,
    slug: "modern-gentlemen-guide-emotional",
    title:
      "The Modern Gentleman’s Blueprint to Emotional Mastery: Why Vulnerability is a Strength, Not a Setback",
    date: "November 5, 2025",
    excerpt:
      "Men’s Mental Health Month deep dive on why emotional command—not suppression—is the new standard for strength.",
    category: "Mindfulness",
    image: articleEmotionalBlueprint,
    readTime: 9,
    author: "David Rachal III",
    pillar: "Emotional Intelligence",
    url: "https://poisedgentlemen.com/blogs/news/modern-gentlemen-guide-emotional",
  },
  {
    id: 7,
    slug: "best-fathers-day-gift",
    title:
      "The Best Father’s Day Gift Bundles for 2025: A Gift He'll Never Forget",
    date: "June 1, 2025",
    excerpt:
      "Limited-run Father’s Day bundles pairing bold moisturizers with premium tees for the men who always show up.",
    category: "Presence & Etiquette",
    image: articleFathersDay,
    readTime: 5,
    author: "David Rachal III",
    pillar: "Discipline",
    url: "https://poisedgentlemen.com/blogs/news/best-fathers-day-gift",
  },
];

interface Download {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const downloads: Download[] = [
  {
    id: 1,
    title: "The 4 Pillars Starter Kit",
    description: "20-page guide with self-assessment, 30-day challenge, and journal prompts.",
    icon: <FileText className="w-8 h-8 text-gold" />,
  },
  {
    id: 2,
    title: "Grooming Routine by Age",
    description: "Age-specific product recommendations and morning/evening routine templates.",
    icon: <BookOpen className="w-8 h-8 text-gold" />,
  },
  {
    id: 3,
    title: "Conversation Starters for Fathers & Sons",
    description: "50+ questions to spark meaningful dialogue and build trust.",
    icon: <Heart className="w-8 h-8 text-gold" />,
  },
  {
    id: 4,
    title: "EQ Self-Assessment",
    description: "25-question assessment with scoring guide and development areas.",
    icon: <Award className="w-8 h-8 text-gold" />,
  },
];

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All Articles");
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [selectedDownload, setSelectedDownload] = useState<Download | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", newsletter: false });

  // SEO: Update page title and meta description
  useEffect(() => {
    document.title = "The Codex | The Poised Gentlemen";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "The Poised Gentleman's Codex — comprehensive guides on the Four Pillars, emotional intelligence, style, etiquette, and building your legacy.",
      );
    }

    // Cleanup: Reset to default on unmount
    return () => {
      document.title = "The Poised Gentlemen | Mentorship & Grooming for Modern Men";
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          "Youth mentorship, adult coaching, and premium grooming aligned with the Four Pillars: Integrity, Strength, Emotional Intelligence, Discipline. New Orleans.",
        );
      }
    };
  }, []);

  const categories: Category[] = [
    "All Articles",
    "Four Pillars",
    "Presence & Etiquette",
    "Masculinity FAQs",
    "Mindfulness",
  ];

  const filteredArticles =
    activeCategory === "All Articles" ? articles : articles.filter((article) => article.category === activeCategory);

  const handleDownloadClick = (download: Download) => {
    setSelectedDownload(download);
    setDownloadModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Download requested:", { ...formData, resource: selectedDownload?.title });
    alert(`Check your inbox! "${selectedDownload?.title}" is on the way.`);
    setDownloadModalOpen(false);
    setFormData({ name: "", email: "", newsletter: false });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[35vh] bg-primary flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary-foreground mb-5">The Codex</h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Guides on style, emotional intelligence, etiquette, and legacy.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <Link to="#" className="block group">
            <div className="relative overflow-hidden rounded-lg hover-scale">
              <img
                src={articleFeatured}
                alt="The Four Pillars Framework discussion"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-primary-foreground">
                <Badge className="mb-4 bg-gold text-gold-foreground">Four Pillars</Badge>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                  The Four Pillars Explained: Your Framework for Modern Masculinity
                </h2>
                <p className="text-lg mb-4 text-primary-foreground/90">
                  Deep dive into Integrity, Strength, Emotional Intelligence, and Discipline. Learn how this teachable
                  system transforms lives.
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span>David Rachal III</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />8 min read
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Category Filters */}
      <section className="sticky top-16 z-30 bg-muted border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className={activeCategory === category ? "bg-gold text-gold-foreground hover:bg-gold/90" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <Link key={article.id} to="#" className="block group">
                <article className="bg-card rounded-lg border border-border overflow-hidden hover-lift">
                  <div className="relative overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <Badge className="bg-gold text-gold-foreground">{article.pillar}</Badge>
                      {article.isParentResource && <ParentBadge variant="parent-resource" />}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-heading font-bold mb-2 text-card-foreground group-hover:text-gold transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {article.readTime} min
                      </span>
                      <span className="text-gold font-semibold">Read More →</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Free Downloads Section */}
      <section className="py-16 bg-gold">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4 text-gold-foreground">
            Free Resources
          </h2>
          <p className="text-center text-gold-foreground/80 mb-12 max-w-2xl mx-auto">
            Download our guides, workbooks, and tools to accelerate your journey through the Four Pillars.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {downloads.map((download) => (
              <div
                key={download.id}
                className="bg-primary rounded-lg p-6 text-primary-foreground hover:scale-105 transition-transform cursor-pointer"
                onClick={() => handleDownloadClick(download)}
              >
                <div className="mb-4">{download.icon}</div>
                <h4 className="text-xl font-heading font-bold mb-2">{download.title}</h4>
                <p className="text-primary-foreground/80 mb-4">{download.description}</p>
                <Button
                  variant="outline"
                  className="w-full border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  Download Free PDF
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
              Never Miss an Article
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8">
              Get weekly insights on mentorship, emotional intelligence, grooming, and growth. Delivered every
              Wednesday.
            </p>

            <form
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                const email = (e.target as HTMLFormElement).email.value;
                console.log("Newsletter signup:", email);
                alert("Thanks for subscribing! Check your inbox for confirmation.");
                (e.target as HTMLFormElement).reset();
              }}
            >
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="flex-1 bg-background text-foreground"
              />
              <Button type="submit" className="bg-gold text-gold-foreground hover:bg-gold/90">
                Subscribe
              </Button>
            </form>

            <p className="text-sm text-primary-foreground/70 mt-4">We respect your inbox. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Ready to Take Action?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Knowledge is just the beginning. Join our programs or shop our values-aligned products.
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

      {/* Download Modal */}
      <Dialog open={downloadModalOpen} onOpenChange={setDownloadModalOpen}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>Download: {selectedDownload?.title}</DialogTitle>
            <DialogDescription>Enter your details to receive this free resource via email.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">First Name *</Label>
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="newsletter"
                checked={formData.newsletter}
                onCheckedChange={(checked) => setFormData({ ...formData, newsletter: checked as boolean })}
              />
              <Label htmlFor="newsletter" className="text-sm font-normal">
                I agree to receive The Poised Gentlemen newsletter
              </Label>
            </div>

            <Button type="submit" className="w-full bg-gold text-gold-foreground hover:bg-gold/90">
              Send Me the Resource
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Resources;
