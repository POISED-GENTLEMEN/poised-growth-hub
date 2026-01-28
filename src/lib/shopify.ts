// Shopify API Configuration
const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'poised-growth-hub-rfqhl.myshopify.com';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || 'a68886fc37f05f0f157a3c8b2057d4dc';
// Blog token with unauthenticated_read_content scope - uses env var with fallback for backwards compatibility
const SHOPIFY_BLOG_TOKEN = import.meta.env.VITE_SHOPIFY_BLOG_TOKEN || '9d01b783b935434fab46eb9822fb9668';

// Cart item interface for checkout
export interface CartLineItem {
  variantId: string;
  quantity: number;
}

// Cart Create Mutation for Shopify Checkout
const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    handle
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// Create Shopify checkout and return checkout URL
export async function createShopifyCheckout(items: CartLineItem[]): Promise<string> {
  try {
    const lines = items.map(item => ({
      quantity: item.quantity,
      merchandiseId: item.variantId,
    }));

    const cartData = await storefrontApiRequest(CART_CREATE_MUTATION, {
      input: {
        lines,
      },
    });

    if (cartData.data.cartCreate.userErrors.length > 0) {
      throw new Error(`Cart creation failed: ${cartData.data.cartCreate.userErrors.map((e: any) => e.message).join(', ')}`);
    }

    const cart = cartData.data.cartCreate.cart;
    
    if (!cart.checkoutUrl) {
      throw new Error('No checkout URL returned from Shopify');
    }

    // Add channel parameter to ensure checkout works without password
    const url = new URL(cart.checkoutUrl);
    url.searchParams.set('channel', 'online_store');
    return url.toString();
  } catch (error) {
    console.error('Error creating Shopify checkout:', error);
    throw error;
  }
}

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    descriptionHtml: string;
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
          descriptionHtml
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 20) {
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
            descriptionHtml
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 20) {
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

// Query to list all blogs in the store
const LIST_BLOGS_QUERY = `
  query ListBlogs($first: Int!) {
    blogs(first: $first) {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
  }
`;

// Fetch all articles from ALL blogs (not just one specific blog)
const ALL_ARTICLES_QUERY = `
  query GetAllArticles($first: Int!) {
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
`;

// Extract numeric Shopify ID from GraphQL ID
// e.g., "gid://shopify/ProductVariant/45678901234567" -> "45678901234567"
export function extractShopifyId(graphqlId: string): string {
  const parts = graphqlId.split('/');
  return parts[parts.length - 1];
}

// Fetch list of all blogs in the store
export async function fetchShopifyBlogs(): Promise<Array<{ id: string; title: string; handle: string }>> {
  try {
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
        query: LIST_BLOGS_QUERY,
        variables: { first: 20 },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      console.error('Shopify blogs API errors:', data.errors);
      return [];
    }
    
    const blogs = data.data?.blogs?.edges?.map((edge: any) => edge.node) || [];
    console.log('Available Shopify blogs:', blogs);
    return blogs;
  } catch (error) {
    console.error('Error fetching Shopify blogs:', error);
    return [];
  }
}

// Fetch ALL articles from ALL blogs (recommended approach)
export async function fetchAllShopifyArticles(): Promise<ShopifyArticle[]> {
  try {
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
        query: ALL_ARTICLES_QUERY,
        variables: { first: 100 },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      console.error('Shopify articles API errors:', data.errors);
      return [];
    }
    
    const articles = data.data?.articles?.edges || [];
    console.log(`Fetched ${articles.length} articles from Shopify`);
    return articles;
  } catch (error) {
    console.error('Error fetching all Shopify articles:', error);
    return [];
  }
}

// Fetch blog posts from a specific blog (legacy function, kept for compatibility)
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
      console.warn(`Blog "${blogHandle}" not found. Trying to fetch all articles instead.`);
      // Fallback to fetching all articles
      return fetchAllShopifyArticles();
    }
    
    return data.data.blog.articles.edges;
  } catch (error) {
    console.error('Error fetching Shopify blog posts:', error);
    return [];
  }
}
