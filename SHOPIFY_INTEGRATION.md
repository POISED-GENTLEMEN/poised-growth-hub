# Shopify Integration Guide

## Overview
Your store is now fully integrated with Shopify! All mock data has been removed and replaced with real Shopify products, cart, and checkout functionality.

## Store Details
- **Store ID**: `poised-growth-hub-rfqhl`
- **Domain**: `poised-growth-hub-rfqhl.myshopify.com`

## What's Changed

### New Pages
- `/shop` - Main shop page displaying all Shopify products
- `/shop/:handle` - Individual product detail pages
- `/cart` - Shopping cart with Shopify integration

### Removed Pages (Old Mock Data)
- Old Shop, Cart, Checkout, ProductDetail, EssenceCollection pages
- ShopContext (replaced with Zustand cart store)

### Key Files

#### API Integration
- `src/lib/shopify.ts` - Shopify Storefront API functions
  - `getAllProducts()` - Fetch all products
  - `getProductByHandle()` - Fetch single product
  - `getCollectionByHandle()` - Fetch collection with products
  - `createCheckout()` - Create Shopify checkout

#### State Management
- `src/stores/cartStore.ts` - Zustand cart store with persistence
  - Stores cart items in localStorage
  - Handles add/update/remove operations
  - Calculates totals and item counts

#### Pages
- `src/pages/ShopifyShop.tsx` - Main shop page
- `src/pages/ShopifyProductDetail.tsx` - Product detail page
- `src/pages/ShopifyCart.tsx` - Shopping cart page

#### Components
- `src/components/CartIcon.tsx` - Cart icon with badge
- `src/components/Header.tsx` - Updated to use Zustand cart

## How Checkout Works

When users click "Proceed to Checkout":
1. Cart items are sent to Shopify via the Storefront API
2. Shopify creates a checkout session
3. User is redirected to Shopify's hosted checkout
4. Shopify handles payment processing and order completion

This is the **recommended approach** as it:
- Uses Shopify's secure payment processing
- Handles PCI compliance automatically
- Supports all Shopify payment methods
- Provides customer account features

## Next Steps

### 1. Add Products to Shopify
Visit your Shopify admin to add products:
https://poised-growth-hub-rfqhl.myshopify.com/admin

### 2. Import Your Product Data
You can use Shopify's:
- Product CSV import (Admin → Products → Import)
- Bulk editor for quick updates
- Shopify API for programmatic import

### 3. Collections & Categories
Create collections in Shopify admin to organize products:
- Go to Products → Collections
- Create collections like "Essence Line", "Grooming Essentials", etc.
- Add products to collections

### 4. Configure Checkout
In Shopify admin, configure:
- Shipping rates and zones
- Tax settings
- Payment providers
- Email notifications

### 5. Test Checkout Flow
Use Shopify's test mode to verify the complete flow:
1. Add product to cart
2. Proceed to checkout
3. Use test payment info
4. Verify order appears in admin

## Environment Variables
The following are automatically configured in `.env.local`:
```
VITE_SHOPIFY_SHOP_PERMANENT_DOMAIN=poised-growth-hub-rfqhl.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=a68886fc37f05f0f157a3c8b2057d4dc
```

⚠️ **Important**: `.env.local` is gitignored. Never commit Shopify tokens to version control.

## Customization

### Styling Products
Edit `src/pages/ShopifyShop.tsx` and `src/pages/ShopifyProductDetail.tsx` to customize:
- Product card layout
- Image display
- Add to cart buttons
- Product information display

### Collections
To show products by collection:
```typescript
import { getCollectionByHandle } from '@/lib/shopify';

const products = await getCollectionByHandle('your-collection-handle');
```

### Cart Behavior
Modify `src/stores/cartStore.ts` to customize:
- Cart persistence
- Quantity limits
- Discount codes (if using)
- Item validation

## Shopify Admin Access
- **Admin URL**: https://poised-growth-hub-rfqhl.myshopify.com/admin
- Use this to manage products, orders, customers, and settings

## Support
For Shopify-specific questions:
- [Shopify Help Center](https://help.shopify.com/)
- [Storefront API Docs](https://shopify.dev/docs/api/storefront)
- [Lovable Discord](https://discord.gg/lovable)
