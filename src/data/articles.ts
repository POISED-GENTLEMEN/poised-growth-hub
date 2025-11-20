// Central blog article loader and parser
import articleStoic from "@/assets/article-stoic.jpg";
import articleTeenAcne from "@/assets/article-teen-acne.jpg";
import articleForged from "@/assets/article-forged-story.jpg";
import articleModernMasculinity from "@/assets/article-modern-masculinity.jpg";
import articlePoisedSteps from "@/assets/article-poised-steps.jpg";
import articleEmotionalBlueprint from "@/assets/article-emotional-blueprint.jpg";
import articleFathersDay from "@/assets/article-fathers-day-2025.jpg";

// Import markdown files
import becomingPoisedGentleman from "@/data/posts/becoming-poised-gentleman-essential.md?raw";

type Category =
  | "All Articles"
  | "Four Pillars"
  | "Presence & Etiquette"
  | "Masculinity FAQs"
  | "Mindfulness";

export interface Article {
  id: number;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: Category;
  image: string;
  readTime: number;
  author: string;
  pillar: string;
  isParentResource: boolean;
  url: string;
  body: string;
}

// Image mapping based on filename
const imageMap: Record<string, string> = {
  "article-stoic.jpg": articleStoic,
  "article-teen-acne.jpg": articleTeenAcne,
  "article-forged-story.jpg": articleForged,
  "article-modern-masculinity.jpg": articleModernMasculinity,
  "article-poised-steps.jpg": articlePoisedSteps,
  "article-emotional-blueprint.jpg": articleEmotionalBlueprint,
  "article-fathers-day-2025.jpg": articleFathersDay,
};

// Parse markdown file into Article object
function parseMarkdownArticle(content: string, id: number): Article {
  const lines = content.split('\n');
  let currentField = '';
  let bodyStarted = false;
  const bodyLines: string[] = [];
  
  const data: any = {
    id,
    isParentResource: false,
  };

  for (const line of lines) {
    const trimmed = line.trim();
    
    // Check for field headers
    if (trimmed === 'TITLE:') {
      currentField = 'title';
      continue;
    } else if (trimmed === 'SLUG:') {
      currentField = 'slug';
      continue;
    } else if (trimmed === 'DATE:') {
      currentField = 'date';
      continue;
    } else if (trimmed === 'AUTHOR:') {
      currentField = 'author';
      continue;
    } else if (trimmed === 'CATEGORY:') {
      currentField = 'category';
      continue;
    } else if (trimmed === 'PILLAR:') {
      currentField = 'pillar';
      continue;
    } else if (trimmed === 'READ TIME:') {
      currentField = 'readTime';
      continue;
    } else if (trimmed === 'IS_PARENT_RESOURCE:') {
      currentField = 'isParentResource';
      continue;
    } else if (trimmed === 'IMAGE FILE NAME:') {
      currentField = 'imageFileName';
      continue;
    } else if (trimmed === 'SHOPIFY URL:') {
      currentField = 'url';
      continue;
    } else if (trimmed === 'EXCERPT:') {
      currentField = 'excerpt';
      continue;
    } else if (trimmed === 'BODY:') {
      currentField = 'body';
      bodyStarted = true;
      continue;
    }

    // Parse field values
    if (currentField && trimmed && !bodyStarted) {
      if (currentField === 'readTime') {
        data[currentField] = parseInt(trimmed);
      } else if (currentField === 'isParentResource') {
        data[currentField] = trimmed.toLowerCase() === 'true';
      } else if (currentField === 'imageFileName') {
        data.image = imageMap[trimmed] || '';
      } else {
        data[currentField] = trimmed;
      }
    } else if (bodyStarted) {
      // Filter out lines containing "Read original", "Read original on Shopify", or "View original"
      const lowerLine = line.toLowerCase();
      if (!lowerLine.includes('read original') && !lowerLine.includes('view original')) {
        bodyLines.push(line);
      }
    }
  }

  // Trim empty lines from the bottom
  while (bodyLines.length > 0 && bodyLines[bodyLines.length - 1].trim() === '') {
    bodyLines.pop();
  }

  data.body = bodyLines.join('\n').trim();

  return data as Article;
}

// Parse all markdown files
const markdownArticles = [
  parseMarkdownArticle(becomingPoisedGentleman, 1),
];

// Existing hardcoded articles that don't have markdown files yet
const legacyArticles: Article[] = [
  {
    id: 100,
    slug: "the-poised-gentleman-the-modern-day-stoic",
    title: "The Poised Gentleman: The Modern Day Stoic",
    date: "August 26, 2024",
    excerpt: "How modern Stoic principles like self-mastery, integrity, and emotional resilience shape the Poised Gentleman.",
    category: "Mindfulness",
    image: articleStoic,
    readTime: 8,
    author: "David Rachal III",
    pillar: "Integrity",
    url: "https://poisedgentlemen.com/blogs/news/the-poised-gentleman-the-modern-day-stoic",
    body: "",
    isParentResource: false,
  },
  {
    id: 101,
    slug: "conquering-teen-boy-acne-odor-parents-roadmap",
    title: "Conquering Teen Boy Acne & Odor: A Parent's Roadmap",
    date: "June 26, 2025",
    excerpt: "A practical guide to helping teen boys handle acne, body odor, and grooming in a way that protects their confidence.",
    category: "Presence & Etiquette",
    image: articleTeenAcne,
    readTime: 10,
    author: "David Rachal III",
    pillar: "Discipline",
    isParentResource: true,
    url: "https://poisedgentlemen.com/blogs/news/conquering-teen-boy-acne-odor-parents-roadmap",
    body: "",
  },
  {
    id: 102,
    slug: "forged-not-fabricated-my-story-behind-the-poised-gentleman",
    title: "Forged, Not Fabricated: My Story Behind The Poised Gentleman",
    date: "June 17, 2025",
    excerpt: "David's personal story of how hardship, not comfort, forged the standards behind The Poised Gentleman.",
    category: "Four Pillars",
    image: articleForged,
    readTime: 7,
    author: "David Rachal III",
    pillar: "All Four Pillars",
    url: "https://poisedgentlemen.com/blogs/news/forged-not-fabricated-my-story-behind-the-poised-gentleman",
    body: "",
    isParentResource: false,
  },
  {
    id: 103,
    slug: "poised-modern-masculinity",
    title: "Modern Masculinity: How to Become a Poised Gentleman Today",
    date: "May 14, 2025",
    excerpt: "The evolution of masculinity through the lens of discipline, integrity, emotional intelligence, and social grace.",
    category: "Masculinity FAQs",
    image: articleModernMasculinity,
    readTime: 9,
    author: "David Rachal III",
    pillar: "All Four Pillars",
    url: "https://poisedgentlemen.com/blogs/news/poised-modern-masculinity",
    body: "",
    isParentResource: false,
  },
  {
    id: 104,
    slug: "modern-gentlemen-guide-emotional",
    title: "The Modern Gentleman's Guide to Emotional Intelligence",
    date: "April 8, 2025",
    excerpt: "How emotional mastery separates refined men from the rest.",
    category: "Four Pillars",
    image: articleEmotionalBlueprint,
    readTime: 9,
    author: "David Rachal III",
    pillar: "Emotional Intelligence",
    url: "https://poisedgentlemen.com/blogs/news/modern-gentlemen-guide-emotional",
    body: "",
    isParentResource: false,
  },
  {
    id: 105,
    slug: "best-fathers-day-gift",
    title: "The Best Father's Day Gift: Teaching Young Men to Become Poised Gentlemen",
    date: "March 12, 2025",
    excerpt: "Why investing in your son's character is the most valuable gift a father can give.",
    category: "Presence & Etiquette",
    image: articleFathersDay,
    readTime: 5,
    author: "David Rachal III",
    pillar: "Discipline",
    url: "https://poisedgentlemen.com/blogs/news/best-fathers-day-gift",
    body: "",
    isParentResource: false,
  },
];

// Combine markdown articles with legacy articles
export const articles: Article[] = [...markdownArticles, ...legacyArticles].sort((a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateB.getTime() - dateA.getTime();
});

// Helper function to get article by slug
export const getArticleBySlug = (slug: string): Article | undefined => {
  return articles.find(article => article.slug === slug);
};
