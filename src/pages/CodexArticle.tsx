import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, BookOpen, GraduationCap, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCanonical } from "@/hooks/useCanonical";
import { getCodexArticleBySlug, codexArticles } from "@/lib/codexArticles";

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

const upsertJsonLd = (id: string, data: object) => {
  let el = document.head.querySelector<HTMLScriptElement>(`script[data-jsonld="${id}"]`);
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-jsonld", id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
};

const CodexArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getCodexArticleBySlug(slug) : undefined;
  useCanonical(article ? `/codex/${article.slug}/` : undefined);

  useEffect(() => {
    if (!article) return;
    const url = `https://poisedgentlemen.com/codex/${article.slug}/`;
    document.title = `${article.title} | Poised Gentlemen Codex`;
    setMeta('meta[name="description"]', article.description);
    setMeta('meta[property="og:title"]', article.title);
    setMeta('meta[property="og:description"]', article.description);
    setMeta('meta[property="og:url"]', url);
    setMeta('meta[property="og:type"]', "article");

    upsertJsonLd("article", {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.description,
      author: { "@type": "Person", name: "David Rachal III" },
      publisher: {
        "@type": "Organization",
        name: "Poised Gentlemen",
        url: "https://poisedgentlemen.com",
      },
      mainEntityOfPage: url,
      url,
      keywords: article.targetKeyword,
    });

    upsertJsonLd("faq", {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: article.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });

    return () => {
      document.head.querySelector('script[data-jsonld="article"]')?.remove();
      document.head.querySelector('script[data-jsonld="faq"]')?.remove();
    };
  }, [article]);

  if (!article) {
    return <Navigate to="/codex/" replace />;
  }

  const related = getCodexArticleBySlug(article.relatedSlug);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <article className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link
            to="/codex/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to The Codex
          </Link>

          <Badge variant="secondary" className="mb-4">
            {article.pillar}
          </Badge>

          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-6 leading-tight">
            {article.title}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
            {article.intro}
          </p>

          <Card className="p-6 bg-muted/40 border-dashed">
            <p className="text-sm text-muted-foreground italic">
              <strong className="text-foreground not-italic">In development.</strong>{" "}
              The full essay publishes after July 15. In the meantime, the
              frameworks below come from the same body of work — and our
              programs deliver them in person.
            </p>
          </Card>

          {/* FAQ */}
          <section className="mt-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">
              Frequently Asked
            </h2>
            <div className="space-y-6">
              {article.faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="font-heading font-semibold text-lg mb-2">
                    {f.q}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Internal links */}
          <section className="mt-16 pt-12 border-t border-border space-y-6">
            <h2 className="text-2xl font-heading font-bold">Continue Reading</h2>

            {related && (
              <Link to={`/codex/${related.slug}/`} className="block group">
                <Card className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <BookOpen className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                        Related in the Codex
                      </p>
                      <p className="font-heading font-semibold group-hover:text-secondary transition-colors">
                        {related.title}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 ml-auto text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            )}

            {article.showSchoolsLink && (
              <Link to="/schools/" className="block group">
                <Card className="p-6 hover:shadow-md transition-shadow bg-primary text-primary-foreground">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="h-5 w-5 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-xs uppercase tracking-wide opacity-75 mb-1">
                        Take this to your school
                      </p>
                      <p className="font-heading font-semibold">
                        Bring our character development programs to your
                        organization — at no cost.
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 ml-auto group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            )}

            {article.showEssenceLink && (
              <Link to="/shop/essence-collection" className="block group">
                <Card className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                        Refinement, in practice
                      </p>
                      <p className="font-heading font-semibold group-hover:text-secondary transition-colors">
                        The Essence Collection — for the man committed to
                        refinement.
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 ml-auto text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            )}
          </section>
        </div>
      </article>

      <Footer />
    </div>
  );
};

// Export the list of slugs for App.tsx to register explicit routes.
export const codexArticleSlugs = codexArticles.map((a) => a.slug);

export default CodexArticle;
