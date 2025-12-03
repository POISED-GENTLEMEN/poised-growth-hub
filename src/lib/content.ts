// CMS Content Loader for Blog Posts - Shopify Only
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
  tags: string[];
}

// Empty array for initial render (before Shopify fetch completes)
export const articles: BlogPost[] = [];

// Fetch all articles from Shopify
export async function fetchAllArticles(blogHandle: string = 'news'): Promise<BlogPost[]> {
  try {
    const shopifyPosts = await fetchAndMapShopifyBlogPosts(blogHandle, 1000);
    
    // Sort by date descending
    return shopifyPosts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error('Error fetching Shopify blog posts:', error);
    return [];
  }
}

// Helper function to get post by slug (sync version returns undefined, use async)
export const getArticleBySlug = (slug: string): BlogPost | undefined => {
  return undefined;
};

// Async version that fetches from Shopify
export async function getArticleBySlugAsync(slug: string, blogHandle: string = 'news'): Promise<BlogPost | undefined> {
  try {
    const shopifyPosts = await fetchAndMapShopifyBlogPosts(blogHandle, 1000);
    return shopifyPosts.find(article => article.slug === slug);
  } catch (error) {
    console.error('Error fetching article from Shopify:', error);
    return undefined;
  }
}
