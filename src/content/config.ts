// Content Collection Configuration for Lovable CMS
// This defines the schema for blog posts managed through the Lovable Content tab

export interface PostFrontmatter {
  title: string;
  slug: string;
  date: string;
  author: string;
  description: string;
  coverImage: string;
  tags: string[];
  category: 'All Articles' | 'Four Pillars' | 'Presence & Etiquette' | 'Masculinity FAQs' | 'Mindfulness';
  pillar: string;
  readTime: number;
  isParentResource: boolean;
  url?: string;
}

export const collections = {
  posts: {
    type: 'content' as const,
    directory: 'src/content/posts',
    schema: {
      title: { type: 'string', required: true },
      slug: { type: 'string', required: true },
      date: { type: 'string', required: true },
      author: { type: 'string', default: 'Poised Gentlemen' },
      description: { type: 'string', required: true },
      coverImage: { type: 'string', required: true },
      tags: { type: 'array', items: 'string', default: [] },
      category: { 
        type: 'enum', 
        values: ['All Articles', 'Four Pillars', 'Presence & Etiquette', 'Masculinity FAQs', 'Mindfulness'],
        default: 'All Articles'
      },
      pillar: { type: 'string', default: '' },
      readTime: { type: 'number', default: 5 },
      isParentResource: { type: 'boolean', default: false },
      url: { type: 'string', optional: true },
    }
  }
};
