// Shopify API Configuration
const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'poised-growth-hub-rfqhl.myshopify.com';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
// Blog token with unauthenticated_read_content scope
const SHOPIFY_BLOG_TOKEN = '9d01b783b935434fab46eb9822fb9668';

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          availableForSale: boolean;
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
        };
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
  };
}

const STOREFRONT_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

const COLLECTION_QUERY = `
  query GetCollectionByHandle($handle: String!, $first: Int!) {
    collectionByHandle(handle: $handle) {
      id
      title
      description
      handle
      products(first: $first) {
        edges {
          node {
            id
            title
            description
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            options {
              name
              values
            }
          }
        }
      }
    }
  }
`;

export async function storefrontApiRequest(query: string, variables: any = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(`Error calling Shopify: ${data.errors.map((e: any) => e.message).join(', ')}`);
  }

  return data;
}

export async function fetchShopifyProducts(): Promise<ShopifyProduct[]> {
  const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 50 });
  return data.data.products.edges;
}

export async function fetchCollectionProducts(collectionHandle: string): Promise<ShopifyProduct[]> {
  const data = await storefrontApiRequest(COLLECTION_QUERY, { 
    handle: collectionHandle, 
    first: 50 
  });
  
  if (!data.data.collectionByHandle) {
    console.warn(`Collection "${collectionHandle}" not found. Falling back to all products.`);
    return fetchShopifyProducts();
  }
  
  return data.data.collectionByHandle.products.edges;
}

// Blog Article Types
export interface ShopifyArticle {
  node: {
    id: string;
    title: string;
    handle: string;
    excerpt: string | null;
    content: string;
    contentHtml: string;
    publishedAt: string;
    image: {
      url: string;
      altText: string | null;
    } | null;
    authorV2: {
      name: string;
    } | null;
    tags: string[];
    blog: {
      handle: string;
      title: string;
    };
  };
}

const BLOG_ARTICLES_QUERY = `
  query GetBlogArticles($blogHandle: String!, $first: Int!) {
    blog(handle: $blogHandle) {
      id
      title
      handle
      articles(first: $first, sortKey: PUBLISHED_AT, reverse: true) {
        edges {
          node {
            id
            title
            handle
            excerpt
            content
            contentHtml
            publishedAt
            image {
              url
              altText
            }
            authorV2 {
              name
            }
            tags
            blog {
              handle
              title
            }
          }
        }
      }
    }
  }
`;

export async function fetchShopifyBlogPosts(blogHandle: string = 'news'): Promise<ShopifyArticle[]> {
  try {
    // Use blog token if available, otherwise fallback to storefront token
    const token = SHOPIFY_BLOG_TOKEN || SHOPIFY_STOREFRONT_TOKEN;
    
    if (!token) {
      console.error('No Shopify token available for blog requests');
      return [];
    }
    
    const response = await fetch(SHOPIFY_STOREFRONT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token
      },
      body: JSON.stringify({
        query: BLOG_ARTICLES_QUERY,
        variables: { blogHandle, first: 50 },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      console.error('Shopify blog API errors:', data.errors);
      return [];
    }
    
    if (!data.data?.blog) {
      console.warn(`Blog "${blogHandle}" not found.`);
      return [];
    }
    
    return data.data.blog.articles.edges;
  } catch (error) {
    console.error('Error fetching Shopify blog posts:', error);
    return [];
  }
}
