import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ArrowRight, Award, Brain, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCanonical } from "@/hooks/useCanonical";
import { codexArticles } from "@/lib/codexArticles";
import codexCover from "@/assets/book-hardcover.jpg";

const DESC =
  "Frameworks, principles, and practical tools for building men of character. Poised Gentlemen Codex — Library of Congress cataloged.";

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

const Codex = () => {
  useCanonical("/codex/");

  useEffect(() => {
    document.title = "The Codex | Poised Gentlemen";
    setMeta('meta[name="description"]', DESC);
    setMeta('meta[property="og:title"]', "The Codex | Poised Gentlemen");
    setMeta('meta[property="og:description"]', DESC);
    setMeta('meta[property="og:url"]', "https://poisedgentlemen.com/codex/");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-24 md:py-32">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">
            The Codex
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
            Frameworks for integrity, discipline, and emotional intelligence —
            built for modern men and the boys who will become them.
          </p>
        </div>
      </section>

      {/* Book Feature */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <Badge className="mb-4 bg-secondary text-secondary-foreground">
                <Award className="h-3 w-3 mr-1" />
                Library of Congress Cataloged
              </Badge>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Poised Gentlemen Codex
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                The foundational text of our work. A practical framework for
                men — and the boys raising up behind them — to live with
                integrity, strength, emotional intelligence, and discipline.
                Cataloged by the Library of Congress and written for the man
                committed to refinement.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <Link to="/shop">
                    Get the Book
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/about">About the Author</Link>
                </Button>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <img
                src={codexCover}
                alt="Poised Gentlemen Codex hardcover book"
                className="max-w-sm w-full rounded shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Free Resources */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-secondary text-secondary-foreground">Free Resources</Badge>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Tools You Can Use Today
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Practical instruments from the Codex — built for today's men and
              those raising the next generation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="p-8 border-border hover:shadow-lg transition-shadow">
              <Brain className="h-10 w-10 text-secondary mb-4" />
              <h3 className="font-heading font-bold text-2xl mb-3">
                EQ Self-Assessment
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                A 25-question instrument across five dimensions of emotional
                intelligence. Get a scored profile and tier-based guidance in
                under 10 minutes.
              </p>
              <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Link to="/eq-assessment">
                  Take the Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Card>

            <Card className="p-8 border-border hover:shadow-lg transition-shadow">
              <FileText className="h-10 w-10 text-secondary mb-4" />
              <h3 className="font-heading font-bold text-2xl mb-3">
                First Shave Kit Guide
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                A printable guide for fathers, mothers, and mentors preparing a
                young man for his first shave. Step-by-step technique, tools,
                and the conversation that goes with it.
              </p>
              <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <a
                  href="/POISED-YOUNG-GENTLEMEN-FIRST-SHAVE-KIT.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download PDF
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Codex Articles
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Plain-spoken frameworks on the topics today's men — and the boys
              who will become them — actually wrestle with.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {codexArticles.map((article) => (
              <Link
                key={article.slug}
                to={`/codex/${article.slug}/`}
                className="group"
              >
                <Card className="h-full p-6 hover:shadow-lg transition-shadow border-border">
                  <Badge variant="secondary" className="mb-3">
                    {article.pillar}
                  </Badge>
                  <h3 className="font-heading font-bold text-xl mb-3 group-hover:text-secondary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {article.intro}
                  </p>
                  <span className="text-sm font-semibold text-secondary inline-flex items-center">
                    Read article
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <BookOpen className="h-12 w-12 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Take the Work Off the Page
          </h2>
          <p className="text-lg opacity-90 mb-8">
            The Codex frames the work. Our programs deliver it — in schools,
            communities, and 1-on-1.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link to="/schools/">Programs for Schools</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/programs/">Explore All Programs</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Codex;
