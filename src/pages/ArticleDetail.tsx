import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Clock, Calendar, User, ExternalLink, Loader2 } from "lucide-react";
import DOMPurify from "dompurify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ParentBadge from "@/components/ParentBadge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getArticleBySlug, getArticleBySlugAsync, type BlogPost } from "@/lib/content";
import { useCanonical } from "@/hooks/useCanonical";
import { RelatedProducts } from "@/components/RelatedProducts";

const ArticleDetail = () => {
  useCanonical();
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<BlogPost | undefined>(() => 
    slug ? getArticleBySlug(slug) : undefined
  );
  const [isLoading, setIsLoading] = useState(!article);

  // Fetch article (including from Shopify if not found locally)
  useEffect(() => {
    if (!slug) return;
    
    // If we already have the article from local, no need to fetch
    const localArticle = getArticleBySlug(slug);
    if (localArticle) {
      setArticle(localArticle);
      setIsLoading(false);
      return;
    }
    
    // Try fetching from Shopify
    const fetchArticle = async () => {
      setIsLoading(true);
      try {
        const shopifyArticle = await getArticleBySlugAsync(slug, 'news');
        setArticle(shopifyArticle);
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArticle();
  }, [slug]);

  // SEO: Update meta tags for each article
  useEffect(() => {
    if (!article) return;

    // Update document title
    document.title = `${article.title} | The Poised Gentlemen`;

    // Helper function to set or create meta tag
    const setMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Standard meta tags
    setMetaTag('description', article.excerpt);
    setMetaTag('author', article.author);

    // OpenGraph tags
    setMetaTag('og:title', article.title, true);
    setMetaTag('og:description', article.excerpt, true);
    setMetaTag('og:image', article.image, true);
    setMetaTag('og:type', 'article', true);
    setMetaTag('og:url', window.location.href, true);

    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', article.title);
    setMetaTag('twitter:description', article.excerpt);
    setMetaTag('twitter:image', article.image);

    // Cleanup: Reset to default on unmount
    return () => {
      document.title = "The Poised Gentlemen | Mentorship & Grooming for Modern Men";
      setMetaTag('description', 'Youth mentorship, adult coaching, and premium grooming aligned with the Four Pillars: Integrity, Strength, Emotional Intelligence, Discipline. New Orleans.');
    };
  }, [article]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto">
            <Skeleton className="h-8 w-32 mb-6" />
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-6 w-3/4 mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
              className="inline-flex items-center text-sm bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 mb-6 transition-colors"
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
          <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-li:text-muted-foreground prose-ul:list-disc prose-ol:list-decimal">
            {article.body.includes('<') ? (
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.body) }} />
            ) : (
              <div className="whitespace-pre-wrap leading-relaxed">{article.body}</div>
            )}
          </article>

          {/* Related Products */}
          {slug && <RelatedProducts articleSlug={slug} />}

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
