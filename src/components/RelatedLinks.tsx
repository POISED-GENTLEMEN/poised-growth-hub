import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  FileText,
  Sparkles,
  ShoppingBag,
  Layers,
} from "lucide-react";
import { codexArticles, getCodexArticleBySlug } from "@/lib/codexArticles";
import { shopifyUrl } from "@/lib/shopifyLinks";

type Variant = "programs" | "schools" | "codex-article" | "essence";

interface RelatedLink {
  to: string;
  external?: boolean;
  eyebrow: string;
  title: string;
  icon: typeof BookOpen;
  emphasis?: boolean;
}

interface RelatedLinksProps {
  variant: Variant;
  /** Required for variant="codex-article" */
  articleSlug?: string;
  className?: string;
}

const codexLink = (slug: string, eyebrow = "From the Codex"): RelatedLink | null => {
  const a = getCodexArticleBySlug(slug);
  if (!a) return null;
  return {
    to: `/codex/${a.slug}/`,
    eyebrow,
    title: a.shortTitle,
    icon: BookOpen,
  };
};

const buildLinks = (
  variant: Variant,
  articleSlug?: string,
): RelatedLink[] => {
  if (variant === "programs" || variant === "schools") {
    const featured = variant === "schools"
      ? codexLink("four-pillars-of-character", "Read the framework")
      : codexLink("how-to-build-discipline", "Read the framework");
    return [
      {
        to: "/schools/one-pager/",
        eyebrow: "For decision-makers",
        title: "Download the Schools One-Pager",
        icon: FileText,
        emphasis: true,
      },
      ...(variant === "programs"
        ? [{
            to: "/schools/",
            eyebrow: "Institutional partners",
            title: "Programs for Schools & Organizations",
            icon: GraduationCap,
          }]
        : [{
            to: "/programs/",
            eyebrow: "All offerings",
            title: "Explore the Full Programs Catalog",
            icon: Layers,
          }]),
      ...(featured ? [featured] : []),
    ];
  }

  if (variant === "codex-article") {
    const article = articleSlug ? getCodexArticleBySlug(articleSlug) : undefined;
    if (!article) return [];
    const links: RelatedLink[] = [];
    const related = codexLink(article.relatedSlug, "Related in the Codex");
    if (related) links.push(related);

    if (article.showEssenceLink) {
      links.push({
        to: "/essence/",
        eyebrow: "Refinement, in practice",
        title: "The Essence Collection — Grooming as Discipline",
        icon: Sparkles,
        emphasis: true,
      });
    }
    if (article.showSchoolsLink) {
      links.push({
        to: "/schools/",
        eyebrow: "Take this off the page",
        title: "Bring Our Programs to Your School",
        icon: GraduationCap,
        emphasis: !article.showEssenceLink,
      });
    }
    return links;
  }

  // essence / grooming
  const grooming = [
    codexLink("teen-grooming-routine"),
    codexLink("modern-masculinity"),
    codexLink("how-to-build-discipline"),
  ].filter((l): l is RelatedLink => l !== null);
  return [
    {
      to: shopifyUrl("/collections/essence-collection", "essence_hub"),
      external: true,
      eyebrow: "Shop the collection",
      title: "Visit the Essence Collection on Shopify",
      icon: ShoppingBag,
      emphasis: true,
    },
    ...grooming,
  ];
};

const RelatedLinks = ({ variant, articleSlug, className = "" }: RelatedLinksProps) => {
  const links = buildLinks(variant, articleSlug);
  if (links.length === 0) return null;

  return (
    <section
      aria-labelledby="related-links-heading"
      className={`border-t border-border bg-muted/30 py-16 ${className}`}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
          Continue
        </p>
        <h2
          id="related-links-heading"
          className="text-2xl md:text-3xl font-heading font-bold mb-8"
        >
          Related from Poised Gentlemen
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {links.map((link) => {
            const Icon = link.icon;
            const cardClasses = `p-5 h-full transition-shadow hover:shadow-md ${
              link.emphasis
                ? "bg-primary text-primary-foreground border-primary"
                : ""
            }`;
            const eyebrowClasses = `text-xs uppercase tracking-wide mb-2 ${
              link.emphasis ? "opacity-75" : "text-muted-foreground"
            }`;
            const inner = (
              <Card className={cardClasses}>
                <div className="flex flex-col h-full">
                  <Icon
                    className={`h-5 w-5 mb-3 ${
                      link.emphasis ? "" : "text-secondary"
                    }`}
                  />
                  <p className={eyebrowClasses}>{link.eyebrow}</p>
                  <p className="font-heading font-semibold leading-snug flex-1">
                    {link.title}
                  </p>
                  <span
                    className={`inline-flex items-center text-sm mt-4 ${
                      link.emphasis ? "" : "text-secondary"
                    }`}
                  >
                    {link.external ? "Visit" : "Read more"}
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </span>
                </div>
              </Card>
            );

            return link.external ? (
              <a
                key={link.to}
                href={link.to}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                {inner}
              </a>
            ) : (
              <Link key={link.to} to={link.to} className="block group">
                {inner}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RelatedLinks;
