import React, { createContext, useContext, useState, ReactNode } from 'react';

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

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Modern-G Hydrating Cleanser",
    ageGroup: "Modern-G",
    ageRange: "25-34",
    category: "Cleansers",
    pillar: "Discipline",
    price: 28,
    compareAtPrice: null,
    image: "/src/assets/product-cleanser.jpg",
    shortDescription: "For men building careers and character. Your skin tells your story.",
    fullDescription: "Removes impurities without stripping natural oils. Ideal for daily use. Build discipline through consistent grooming. This cleanser makes showing up for yourself effortless.",
    ingredients: [
      { name: "Aloe Vera", benefit: "Soothes and hydrates" },
      { name: "Green Tea Extract", benefit: "Antioxidant protection" },
      { name: "Chamomile", benefit: "Calms inflammation" }
    ],
    howToUse: [
      "Wet face with warm water",
      "Apply dime-sized amount to hands",
      "Massage in circular motions for 30 seconds",
      "Rinse thoroughly",
      "Pat dry, follow with moisturizer"
    ],
    stock: 12,
    featured: true,
    bestseller: true,
    badges: ["Office Ready", "Year-Round"]
  },
  {
    id: 2,
    name: "Poised-G Anti-Aging Serum",
    ageGroup: "Poised-G",
    ageRange: "35-49",
    category: "Treatments",
    pillar: "Strength",
    price: 45,
    compareAtPrice: null,
    image: "/src/assets/product-serum.jpg",
    shortDescription: "Firms, brightens, protects. Because leadership shows on your face.",
    fullDescription: "Powerful anti-aging formula that firms skin, reduces fine lines, and brightens complexion. Leadership shows on your face—protect your presence.",
    ingredients: [
      { name: "Vitamin C", benefit: "Brightens and evens skin tone" },
      { name: "Hyaluronic Acid", benefit: "Deep hydration and plumping" },
      { name: "Peptides", benefit: "Stimulates collagen production" }
    ],
    howToUse: [
      "Apply to clean, dry face",
      "Use 3-4 drops morning and evening",
      "Gently press into skin until absorbed",
      "Follow with moisturizer and SPF (morning)"
    ],
    stock: 8,
    featured: true,
    badges: ["Date Night", "Bold & Confident"]
  },
  {
    id: 3,
    name: "Young-G Acne Defense System",
    ageGroup: "Young-G",
    ageRange: "10-17",
    category: "Treatments",
    pillar: "Discipline",
    price: 35,
    compareAtPrice: null,
    image: "/src/assets/product-young-g.jpg",
    shortDescription: "Gentle yet effective. Clears breakouts while teaching grooming discipline.",
    fullDescription: "Clear skin starts with consistent care. This gentle system clears breakouts while teaching the grooming rituals that last a lifetime. Discipline in action.",
    ingredients: [
      { name: "Salicylic Acid", benefit: "Unclogs pores, fights acne" },
      { name: "Tea Tree Oil", benefit: "Natural antibacterial" },
      { name: "Zinc", benefit: "Reduces inflammation, prevents future breakouts" }
    ],
    howToUse: [
      "Wash face twice daily",
      "Apply thin layer to affected areas",
      "Start with once daily, increase as tolerated",
      "Always follow with oil-free moisturizer"
    ],
    stock: 15,
    featured: false,
    badges: ["Starter Friendly", "Fresh & Clean"]
  },
  {
    id: 4,
    name: "Legendary-G Age Perfection Cream",
    ageGroup: "Legendary-G",
    ageRange: "65+",
    category: "Moisturizers",
    pillar: "Integrity",
    price: 52,
    compareAtPrice: null,
    image: "/src/assets/product-legendary-cream.jpg",
    shortDescription: "Deeply nourishing. Wisdom earned, skin cared for.",
    fullDescription: "Repairs and protects mature skin with deeply nourishing ingredients. Wisdom earned deserves to be well cared for. Legacy looks good on you.",
    ingredients: [
      { name: "Retinol", benefit: "Cell turnover and renewal" },
      { name: "Collagen Boosters", benefit: "Improves skin firmness" },
      { name: "Shea Butter", benefit: "Deep moisturization" }
    ],
    howToUse: [
      "Apply to face and neck nightly",
      "Use pea-sized amount",
      "Massage gently in upward motions",
      "Allow to absorb before bed"
    ],
    stock: 5,
    featured: false,
    badges: ["Year-Round", "Calming"]
  },
  {
    id: 5,
    name: "The Essentials Bundle",
    ageGroup: "all",
    ageRange: "Any Age",
    category: "Bundles",
    pillar: "All Four Pillars",
    price: 65,
    compareAtPrice: 80,
    image: "/src/assets/product-bundle.jpg",
    shortDescription: "Cleanser + Moisturizer + SPF. Everything you need to start strong.",
    fullDescription: "Build your routine, build your discipline. This complete starter kit includes everything you need for a solid grooming foundation. Save $15 when you buy the bundle.",
    included: [
      "Daily Hydrating Cleanser (4 oz)",
      "Daily Moisturizer with SPF 30 (2 oz)",
      "Night Recovery Cream (1.7 oz)"
    ],
    howToUse: [
      "Morning: Cleanse, then apply SPF moisturizer",
      "Evening: Cleanse, then apply recovery cream",
      "Consistency is key—use daily for best results"
    ],
    stock: 20,
    featured: true,
    bestseller: true,
    badges: ["Starter Friendly", "Travel"]
  },
  {
    id: 6,
    name: "Distinguished-G Eye Cream",
    ageGroup: "Distinguished-G",
    ageRange: "50-64",
    category: "Treatments",
    pillar: "Emotional Intelligence",
    price: 38,
    compareAtPrice: null,
    image: "/src/assets/product-eye-cream.jpg",
    shortDescription: "Reduces dark circles and fine lines. Show the world your experience.",
    fullDescription: "Targeted treatment for the delicate eye area. Reduces puffiness, dark circles, and fine lines. Your eyes tell your story—make sure they're well cared for.",
    badges: ["Office Ready", "Subtle & Refined"],
    ingredients: [
      { name: "Caffeine", benefit: "Reduces puffiness" },
      { name: "Peptides", benefit: "Smooths fine lines" },
      { name: "Vitamin K", benefit: "Brightens dark circles" }
    ],
    howToUse: [
      "Apply small amount to ring finger",
      "Gently pat around orbital bone",
      "Use morning and evening",
      "Don't rub or pull delicate skin"
    ],
    stock: 10,
    featured: false
  },
  {
    id: 7,
    name: "Big-G Gentle Cleanser",
    ageGroup: "Big-G",
    ageRange: "3-9",
    category: "Cleansers",
    pillar: "Integrity",
    price: 22,
    compareAtPrice: null,
    image: "/src/assets/product-big-g.jpg",
    shortDescription: "Gentle formula for young skin. Teaching grooming rituals early.",
    fullDescription: "Ultra-gentle cleanser designed for young boys learning grooming basics. Tear-free, hypoallergenic formula that builds healthy habits from day one.",
    ingredients: [
      { name: "Coconut Oil", benefit: "Gentle cleansing" },
      { name: "Oat Extract", benefit: "Soothes sensitive skin" },
      { name: "Aloe", benefit: "Calms and moisturizes" }
    ],
    howToUse: [
      "Wet face with warm water",
      "Apply small amount to hands",
      "Gently massage face",
      "Rinse well",
      "Make it fun—build the habit!"
    ],
    stock: 18,
    featured: false,
    badges: ["Starter Friendly", "Year-Round"]
  },
  {
    id: 8,
    name: "Genesis-G Baby Gentle Wash",
    ageGroup: "Genesis-G",
    ageRange: "0-2",
    category: "Cleansers",
    pillar: "Integrity",
    price: 24,
    compareAtPrice: null,
    image: "/src/assets/product-genesis-gentle.jpg",
    shortDescription: "Tear-free, hypoallergenic. Gentle care from day one.",
    fullDescription: "Ultra-gentle, pediatrician-tested formula for baby's delicate skin. Start the journey right with clean, safe ingredients designed for the youngest gentlemen.",
    ingredients: [
      { name: "Calendula", benefit: "Soothes and protects" },
      { name: "Chamomile", benefit: "Calms sensitive skin" },
      { name: "Glycerin", benefit: "Gentle moisture" }
    ],
    howToUse: [
      "Add small amount to warm bath water",
      "Gently wash baby's skin",
      "Rinse thoroughly",
      "Pat dry with soft towel",
      "Safe for daily use"
    ],
    stock: 14,
    featured: false,
    badges: ["Year-Round", "Calming"]
  },
  {
    id: 9,
    name: "Graduate-G Daily Moisturizer with SPF",
    ageGroup: "Graduate-G",
    ageRange: "18-24",
    category: "Moisturizers",
    pillar: "Discipline",
    price: 32,
    compareAtPrice: null,
    image: "/src/assets/product-moisturizer.jpg",
    shortDescription: "Hydration + sun protection. Building adult grooming discipline.",
    fullDescription: "Lightweight daily moisturizer with SPF 30. Perfect for young men establishing their adult grooming routine. Discipline starts with daily protection.",
    ingredients: [
      { name: "SPF 30", benefit: "Broad spectrum sun protection" },
      { name: "Hyaluronic Acid", benefit: "Hydrates without oil" },
      { name: "Niacinamide", benefit: "Evens skin tone" }
    ],
    howToUse: [
      "Apply after cleansing in morning",
      "Use quarter-sized amount",
      "Massage into face and neck",
      "Reapply throughout day if in sun",
      "Never skip—discipline over motivation"
    ],
    stock: 16,
    featured: true,
    badges: ["Weekend", "Summer"]
  },
  {
    id: 10,
    name: "Distinguished-G Beard Oil",
    ageGroup: "Distinguished-G",
    ageRange: "50-64",
    category: "Treatments",
    pillar: "Strength",
    price: 29,
    compareAtPrice: null,
    image: "/src/assets/product-beard-oil.jpg",
    shortDescription: "Nourishes beard and skin. Distinguished presence, well-maintained.",
    fullDescription: "Premium blend of oils to soften beard hair and nourish the skin beneath. A distinguished beard requires distinguished care. Your grooming ritual reflects your values.",
    ingredients: [
      { name: "Jojoba Oil", benefit: "Moisturizes skin and hair" },
      { name: "Argan Oil", benefit: "Softens and adds shine" },
      { name: "Cedarwood", benefit: "Subtle, masculine scent" }
    ],
    howToUse: [
      "Apply 3-5 drops to palms",
      "Rub hands together to warm",
      "Massage into beard from root to tip",
      "Brush or comb to distribute",
      "Use daily for best results"
    ],
    stock: 11,
    featured: false,
    badges: ["Signature Scent", "Year-Round"]
  },
  {
    id: 11,
    name: "Modern-G Daily SPF 50",
    ageGroup: "Modern-G",
    ageRange: "25-34",
    category: "Treatments",
    pillar: "Discipline",
    price: 34,
    compareAtPrice: null,
    image: "/src/assets/product-spf.jpg",
    shortDescription: "High protection, lightweight formula. Protect your investment.",
    fullDescription: "Advanced SPF 50 protection that doesn't leave a white cast. Modern men protect their skin—it's an investment in your future self. Discipline in action.",
    ingredients: [
      { name: "Zinc Oxide", benefit: "Physical UV protection" },
      { name: "Vitamin E", benefit: "Antioxidant defense" },
      { name: "Green Tea", benefit: "Fights environmental damage" }
    ],
    howToUse: [
      "Apply as last step of morning routine",
      "Use nickel-sized amount",
      "Reapply every 2 hours in sun",
      "Don't forget neck and ears",
      "Non-negotiable—use daily"
    ],
    stock: 13,
    featured: false,
    badges: ["Summer", "Travel"]
  }
];

const validDiscounts: Record<string, Omit<Discount, 'code'>> = {
  'STAYPOISE': { type: 'percentage', value: 10, description: '10% off' },
  'WELCOME10': { type: 'percentage', value: 10, description: '10% off your first order' },
  'FREESHIP': { type: 'shipping', value: 0, description: 'Free shipping' },
  'SAVE20': { type: 'fixed', value: 20, description: '$20 off orders over $100' }
};

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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

    const product = mockProducts.find(p => p.id === productId);
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
      products: mockProducts,
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