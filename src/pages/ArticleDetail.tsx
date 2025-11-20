import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, User, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ParentBadge from "@/components/ParentBadge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getArticleBySlug } from "@/data/articles";

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/codex">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Codex
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${article.image})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4 pb-12 relative z-10">
          <div className="max-w-4xl">
            <Link
              to="/codex"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Codex
            </Link>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">{article.category}</Badge>
              <Badge variant="outline">{article.pillar}</Badge>
              {article.isParentResource && <ParentBadge />}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">{article.title}</h1>

            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{article.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Excerpt */}
          <div className="text-xl text-muted-foreground mb-12 pb-8 border-b">{article.excerpt}</div>

          {/* Body Content */}
          <article className="prose prose-lg prose-slate dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap leading-relaxed">{article.body}</div>
          </article>

          {/* Back to Codex */}
          <div className="mt-12">
            <Link to="/codex">
              <Button variant="ghost">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Articles
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArticleDetail;
