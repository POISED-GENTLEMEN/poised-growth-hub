// CMS Content Loader for Blog Posts
import articleStoic from "@/assets/article-stoic.jpg";
import articleTeenAcne from "@/assets/article-teen-acne.jpg";
import articleForged from "@/assets/article-forged-story.jpg";
import articleModernMasculinity from "@/assets/article-modern-masculinity.jpg";
import articlePoisedSteps from "@/assets/article-poised-steps.jpg";
import articleEmotionalBlueprint from "@/assets/article-emotional-blueprint.jpg";
import articleFathersDay from "@/assets/article-fathers-day-2025.jpg";
import { fetchAndMapShopifyBlogPosts } from "./shopifyBlog";

type Category =
  | "All Articles"
  | "Four Pillars"
  | "Presence & Etiquette"
  | "Masculinity FAQs"
  | "Mindfulness";

export interface BlogPost {
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

// Load all posts from the content collection
const postModules = import.meta.glob('/src/content/posts/*.md', { 
  query: '?raw',
  import: 'default',
  eager: true 
});

function parseMarkdownPost(content: string, id: number, filename: string): BlogPost {
  // Extract frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    throw new Error(`Invalid frontmatter in ${filename}`);
  }

  const frontmatter = frontmatterMatch[1];
  const body = content.slice(frontmatterMatch[0].length).trim();

  // Parse frontmatter fields
  const fields: Record<string, any> = {};
  const lines = frontmatter.split('\n');
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    
    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();
    
    // Remove quotes
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    
    fields[key] = value;
  }

  // Map coverImage filename to imported asset
  const image = imageMap[fields.coverImage] || '';

  return {
    id,
    slug: fields.slug || '',
    title: fields.title || '',
    date: fields.date || '',
    excerpt: fields.description || '',
    category: (fields.category as Category) || 'All Articles',
    image,
    readTime: parseInt(fields.readTime) || 5,
    author: fields.author || 'The Poised Gentlemen',
    pillar: fields.pillar || '',
    isParentResource: fields.isParentResource === 'true',
    url: fields.url || '',
    body,
  };
}

// Parse all posts
const posts = Object.entries(postModules).map(([path, content], index) => {
  const filename = path.split('/').pop() || '';
  return parseMarkdownPost(content as string, index + 1, filename);
});

// Sort by date descending
const localArticles: BlogPost[] = posts.sort((a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateB.getTime() - dateA.getTime();
});

// Export local articles for immediate use (before Shopify fetch)
export const articles: BlogPost[] = localArticles;

// Async function to fetch all articles including Shopify blog posts
export async function fetchAllArticles(blogHandle: string = 'news'): Promise<BlogPost[]> {
  try {
    // Fetch Shopify blog posts
    const shopifyPosts = await fetchAndMapShopifyBlogPosts(blogHandle, 1000);
    
    // Merge with local posts, avoiding duplicates by slug
    const localSlugs = new Set(localArticles.map(a => a.slug));
    const uniqueShopifyPosts = shopifyPosts.filter(p => !localSlugs.has(p.slug));
    
    // Combine and sort by date
    const allPosts = [...localArticles, ...uniqueShopifyPosts].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
    
    return allPosts;
  } catch (error) {
    console.error('Error fetching Shopify blog posts:', error);
    return localArticles;
  }
}

// Helper function to get post by slug (searches local first, then can be extended)
export const getArticleBySlug = (slug: string): BlogPost | undefined => {
  return localArticles.find(article => article.slug === slug);
};

// Async version that also checks Shopify posts
export async function getArticleBySlugAsync(slug: string, blogHandle: string = 'news'): Promise<BlogPost | undefined> {
  // First check local articles
  const localArticle = localArticles.find(article => article.slug === slug);
  if (localArticle) return localArticle;
  
  // If not found locally, fetch from Shopify
  try {
    const shopifyPosts = await fetchAndMapShopifyBlogPosts(blogHandle, 1000);
    return shopifyPosts.find(article => article.slug === slug);
  } catch (error) {
    console.error('Error fetching article from Shopify:', error);
    return undefined;
  }
}
