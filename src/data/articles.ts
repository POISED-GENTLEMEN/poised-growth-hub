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
import modernGentlemanGuideEmotional from "@/data/posts/modern-gentleman-guide-emotional.md?raw";
import fathersDayGift from "@/data/posts/fathers-day-gift.md?raw";
import thePoisedGentlemanModernDayStoic from "@/data/posts/the-poised-gentleman-the-modern-day-stoic.md?raw";
import poisedModernMasculinity from "@/data/posts/poised-modern-masculinity.md?raw";
import teenBoyAcneRoadmap from "@/data/posts/teen-boy-acne-roadmap.md?raw";
import forgedNotFabricated from "@/data/posts/forged-not-fabricated.md?raw";

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
  parseMarkdownArticle(modernGentlemanGuideEmotional, 2),
  parseMarkdownArticle(fathersDayGift, 3),
  parseMarkdownArticle(thePoisedGentlemanModernDayStoic, 4),
  parseMarkdownArticle(poisedModernMasculinity, 5),
  parseMarkdownArticle(teenBoyAcneRoadmap, 6),
  parseMarkdownArticle(forgedNotFabricated, 7),
];

// Combine markdown articles (no legacy articles needed anymore)
// All articles are now loaded from markdown files
export const articles: Article[] = markdownArticles.sort((a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateB.getTime() - dateA.getTime();
});

// Helper function to get article by slug
export const getArticleBySlug = (slug: string): Article | undefined => {
  return articles.find(article => article.slug === slug);
};
