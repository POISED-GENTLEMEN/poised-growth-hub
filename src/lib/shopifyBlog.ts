// Shopify Blog to BlogPost Mapper
import { fetchShopifyBlogPosts, type ShopifyArticle } from './shopify';
import type { BlogPost } from './content';

type Category =
  | "All Articles"
  | "Four Pillars"
  | "Presence & Etiquette"
  | "Masculinity FAQs"
  | "Mindfulness";

// Map Shopify tags to your category system
const tagToCategoryMap: Record<string, Category> = {
  'four-pillars': 'Four Pillars',
  'four pillars': 'Four Pillars',
  'pillars': 'Four Pillars',
  'presence': 'Presence & Etiquette',
  'etiquette': 'Presence & Etiquette',
  'style': 'Presence & Etiquette',
  'masculinity': 'Masculinity FAQs',
  'faq': 'Masculinity FAQs',
  'faqs': 'Masculinity FAQs',
  'mindfulness': 'Mindfulness',
  'mental-health': 'Mindfulness',
  'wellness': 'Mindfulness',
};

// Map tags to pillars (categories shown on blog)
const tagToPillarMap: Record<string, string> = {
  // Four Pillars
  'integrity': 'Integrity',
  'honesty': 'Integrity',
  'character': 'Integrity',
  'values': 'Integrity',
  'strength': 'Strength',
  'resilience': 'Strength',
  'courage': 'Strength',
  'confidence': 'Strength',
  'emotional-intelligence': 'Emotional Intelligence',
  'eq': 'Emotional Intelligence',
  'emotions': 'Emotional Intelligence',
  'empathy': 'Emotional Intelligence',
  'self-awareness': 'Emotional Intelligence',
  'discipline': 'Discipline',
  'habits': 'Discipline',
  'routine': 'Discipline',
  'focus': 'Discipline',
  'consistency': 'Discipline',
  // Grooming & Style
  'grooming': 'Grooming',
  'skincare': 'Grooming',
  'shaving': 'Grooming',
  'beard': 'Grooming',
  'haircare': 'Grooming',
  'style': 'Style',
  'fashion': 'Style',
  'wardrobe': 'Style',
  'etiquette': 'Etiquette',
  'manners': 'Etiquette',
  // Mentorship & Growth
  'mentorship': 'Mentorship',
  'fatherhood': 'Fatherhood',
  'parenting': 'Fatherhood',
  'fathers': 'Fatherhood',
  'dads': 'Fatherhood',
  'youth': 'Youth Development',
  'teens': 'Youth Development',
  'young-men': 'Youth Development',
  'boys': 'Youth Development',
  // Wellness & Mindset
  'mindfulness': 'Mindfulness',
  'meditation': 'Mindfulness',
  'mental-health': 'Wellness',
  'wellness': 'Wellness',
  'health': 'Wellness',
  'fitness': 'Wellness',
  // Career & Leadership
  'leadership': 'Leadership',
  'career': 'Career',
  'professional': 'Career',
  'success': 'Success',
  'legacy': 'Legacy',
  'purpose': 'Purpose',
};

function getCategoryFromTags(tags: string[]): Category {
  const lowerTags = tags.map(t => t.toLowerCase());
  
  for (const tag of lowerTags) {
    if (tagToCategoryMap[tag]) {
      return tagToCategoryMap[tag];
    }
  }
  
  return 'All Articles';
}

function getPillarFromTags(tags: string[]): string {
  const lowerTags = tags.map(t => t.toLowerCase());
  
  for (const tag of lowerTags) {
    if (tagToPillarMap[tag]) {
      return tagToPillarMap[tag];
    }
  }
  
  // Default pillar based on category
  return 'Growth';
}

function estimateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function mapShopifyArticleToBlogPost(
  article: ShopifyArticle,
  id: number
): BlogPost {
  const node = article.node;
  
  return {
    id,
    slug: node.handle,
    title: node.title,
    date: formatDate(node.publishedAt),
    excerpt: node.excerpt || node.content.substring(0, 200) + '...',
    category: getCategoryFromTags(node.tags),
    image: node.image?.url || '',
    readTime: estimateReadTime(node.content),
    author: node.authorV2?.name || 'The Poised Gentlemen',
    pillar: getPillarFromTags(node.tags),
    isParentResource: node.tags.some(t => 
      t.toLowerCase() === 'parent-resource' || 
      t.toLowerCase() === 'for-parents'
    ),
    url: '',
    body: node.contentHtml || node.content,
    tags: node.tags,
  };
}

export async function fetchAndMapShopifyBlogPosts(
  blogHandle: string = 'news',
  startId: number = 1000
): Promise<BlogPost[]> {
  const shopifyArticles = await fetchShopifyBlogPosts(blogHandle);
  
  return shopifyArticles.map((article, index) => 
    mapShopifyArticleToBlogPost(article, startId + index)
  );
}
