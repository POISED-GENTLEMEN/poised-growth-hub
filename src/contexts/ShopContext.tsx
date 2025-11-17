import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchShopifyProducts, ShopifyProduct } from '@/lib/shopify';

export interface Product {
  id: number;
  name: string;
  ageGroup: string;
  ageRange: string;
  category: string;
  pillar: string;
  price: number;
  compareAtPrice: number | null;
  image: string;
  shortDescription: string;
  fullDescription: string;
  ingredients?: { name: string; benefit: string }[];
  included?: string[];
  howToUse: string[];
  stock: number;
  featured: boolean;
  bestseller?: boolean;
  badges?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

interface Discount {
  code: string;
  type: 'percentage' | 'shipping' | 'fixed';
  value: number;
  description: string;
}

interface ShopContextType {
  products: Product[];
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  appliedDiscount: Discount | null;
  applyDiscount: (code: string) => { success: boolean; message: string };
  removeDiscount: () => void;
  getDiscountAmount: () => number;
  getShippingCost: () => number;
  getFinalTotal: () => number;
  clearCart: () => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Helper function to map Shopify products to our Product interface
function mapShopifyToProduct(shopifyProduct: ShopifyProduct, index: number): Product {
  const { node } = shopifyProduct;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const imageUrl = node.images.edges[0]?.node.url || '';
  
  return {
    id: index + 1,
    name: node.title,
    ageGroup: "all",
    ageRange: "Any Age",
    category: "Essence Collection",
    pillar: "All Four Pillars",
    price: price,
    compareAtPrice: null,
    image: imageUrl,
    shortDescription: node.description.substring(0, 150) + (node.description.length > 150 ? '...' : ''),
    fullDescription: node.description,
    howToUse: [
      "Apply to pulse points",
      "Massage gently into skin",
      "Enjoy the signature scent"
    ],
    stock: 99,
    featured: index < 3,
    bestseller: index < 2,
    badges: ["Essence Collection"]
  };
}

const validDiscounts: Record<string, Omit<Discount, 'code'>> = {
  'STAYPOISE': { type: 'percentage', value: 10, description: '10% off' },
  'WELCOME10': { type: 'percentage', value: 10, description: '10% off your first order' },
  'FREESHIP': { type: 'shipping', value: 0, description: 'Free shipping' },
  'SAVE20': { type: 'fixed', value: 20, description: '$20 off orders over $100' }
};

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState<Discount | null>(null);
  const [toasts, setToasts] = useState<Array<{ id: number; message: string; type: 'success' | 'error' | 'info' }>>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  // Fetch products from Shopify on mount
  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        const shopifyProducts = await fetchShopifyProducts();
        const mappedProducts = shopifyProducts.map((sp, idx) => mapShopifyToProduct(sp, idx));
        setProducts(mappedProducts);
      } catch (error) {
        console.error('Error loading Shopify products:', error);
        showToast('Failed to load products', 'error');
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToCart = (product: Product, quantity: number = 1) => {
    const existing = cartItems.find(item => item.id === product.id);
    const currentQuantity = existing ? existing.quantity : 0;
    const newQuantity = currentQuantity + quantity;

    if (newQuantity > product.stock) {
      showToast(`Only ${product.stock} available in stock`, 'error');
      return;
    }

    if (existing) {
      updateQuantity(product.id, newQuantity);
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
    showToast(`Added ${product.name} to cart!`, 'success');
  };

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    const product = products.find(p => p.id === productId);
    if (product && newQuantity > product.stock) {
      showToast(`Only ${product.stock} available in stock`, 'error');
      return;
    }

    setCartItems(cartItems.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const applyDiscount = (code: string): { success: boolean; message: string } => {
    const upperCode = code.toUpperCase().trim();
    
    if (!upperCode) {
      return { success: false, message: 'Please enter a discount code' };
    }

    const discount = validDiscounts[upperCode];
    
    if (!discount) {
      return { success: false, message: 'Invalid discount code' };
    }

    if (discount.type === 'fixed' && discount.value === 20 && getCartTotal() < 100) {
      return { success: false, message: 'This code requires a minimum order of $100' };
    }

    setAppliedDiscount({ code: upperCode, ...discount });
    showToast(`Discount applied: ${discount.description}`, 'success');
    return { success: true, message: discount.description };
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
  };

  const getDiscountAmount = () => {
    if (!appliedDiscount) return 0;
    
    const subtotal = getCartTotal();
    
    if (appliedDiscount.type === 'percentage') {
      return subtotal * (appliedDiscount.value / 100);
    }
    
    if (appliedDiscount.type === 'fixed') {
      return Math.min(appliedDiscount.value, subtotal);
    }
    
    return 0;
  };

  const getShippingCost = () => {
    if (appliedDiscount?.type === 'shipping') return 0;
    if (getCartTotal() >= 50) return 0;
    return 8.99;
  };

  const getFinalTotal = () => {
    return getCartTotal() - getDiscountAmount() + getShippingCost();
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <ShopContext.Provider value={{
      products,
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      getCartTotal,
      getCartCount,
      selectedProduct,
      setSelectedProduct,
      isModalOpen,
      setIsModalOpen,
      appliedDiscount,
      applyDiscount,
      removeDiscount,
      getDiscountAmount,
      getShippingCost,
      getFinalTotal,
      clearCart,
      showToast
    }}>
      {children}
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-lg shadow-lg border-l-4 flex items-center gap-3 animate-fade-in ${
              toast.type === 'success' ? 'bg-green-50 border-success text-success' :
              toast.type === 'error' ? 'bg-red-50 border-destructive text-destructive' :
              'bg-blue-50 border-primary text-primary'
            }`}
          >
            <span className="font-medium">{toast.message}</span>
          </div>
        ))}
      </div>
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};