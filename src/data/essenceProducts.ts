export interface EssenceProduct {
  id: string;
  slug: string;
  name: string;
  fragranceFamily: string;
  colorCode: string;
  colorName: string;
  oneLiner: string;
  topNotes: string;
  heartNotes?: string;
  baseNotes: string;
  scentExperience: string;
  bestFor: string[];
  occasions: string[];
  price4oz: number;
  price8oz: number;
  rating: number;
  reviewCount: number;
  howToUse: string;
  poisedDifference: string;
  ingredients: string[];
  benefits: string[];
}

export const essenceProducts: EssenceProduct[] = [
  {
    id: "1",
    slug: "buoyant",
    name: "Buoyant",
    fragranceFamily: "Aquatic/Fresh",
    colorCode: "#077DFE",
    colorName: "Brilliant Blue",
    oneLiner: "Crisp marine lift with grounded cedarwood. Your everyday clarity cue.",
    topNotes: "Marine Accord, Bergamot, Cedarwood",
    baseNotes: "Cedarwood, Amber, Musk",
    scentExperience: "Buoyant opens with crisp marine notes that evoke coastal breezes and open waters. Fresh bergamot adds citrus brightness while grounded cedarwood provides lasting depth. This aquatic men's body balm delivers 4-6 hours of subtle yet captivating fragrance.",
    bestFor: [
      "Daily office wear",
      "Casual outings & weekend activities",
      "Spring & summer seasons",
      "Men seeking fresh, clean confidence"
    ],
    occasions: ["Office Ready", "Summer"],
    price4oz: 48,
    price8oz: 72,
    rating: 4.8,
    reviewCount: 127,
    howToUse: "Apply small amount to clean, dry skin. Massage into pulse points (wrists, neck, chest) and any areas needing hydration. Use daily after shower for best results.",
    poisedDifference: "Buoyant isn't just a moisturizer or cologne—it's both. Premium men's body balm that hydrates your skin while leaving a signature aquatic scent that commands attention. Made in USA with clean, skin-safe ingredients.",
    ingredients: [
      "Organic Shea Butter",
      "Mango Butter",
      "Sunflower Seed Oil",
      "Aloe Vera Juice",
      "Vitamin E",
      "Fragrance Oils"
    ],
    benefits: [
      "Non-greasy absorption in 30-60 seconds",
      "Locks in moisture for all-day softness",
      "Vitamin E offers antioxidant protection",
      "4-6 hours of lasting fragrance"
    ]
  },
  {
    id: "2",
    slug: "vigaros",
    name: "Vigaros",
    fragranceFamily: "Aromatic/Spicy",
    colorCode: "#4B2E5C",
    colorName: "Deep Purple",
    oneLiner: "Mint and green apple over a confident base. Evening intensity.",
    topNotes: "Mint, Green Apple, Lemon",
    heartNotes: "Tonka Bean, Amberwood",
    baseNotes: "Vanilla, Oakmoss, Cedarwood",
    scentExperience: "Vigaros delivers a powerful opening of crisp mint and green apple that transitions into warm, spicy depths. Perfect for evening wear, this aromatic balm combines freshness with masculine intensity. The blend of tonka bean and vanilla creates an unforgettable signature.",
    bestFor: [
      "Date nights & romantic evenings",
      "Clubbing & nightlife",
      "Fall & winter seasons",
      "Men wanting bold, memorable presence"
    ],
    occasions: ["Date Night", "Weekend"],
    price4oz: 48,
    price8oz: 72,
    rating: 4.9,
    reviewCount: 143,
    howToUse: "Apply to pulse points after evening shower. Focus on neck, wrists, and chest for maximum projection. A little goes a long way with this intense formula.",
    poisedDifference: "Vigaros combines the refreshing kick of mint with deep, warm spices. It's designed for the man who commands attention without saying a word. Premium grooming meets designer-inspired fragrance.",
    ingredients: [
      "Organic Shea Butter",
      "Mango Butter",
      "Sunflower Seed Oil",
      "Aloe Vera Juice",
      "Vitamin E",
      "Premium Fragrance Oils"
    ],
    benefits: [
      "Long-lasting evening fragrance (6-8 hours)",
      "Deeply nourishing night moisturizer",
      "Anti-aging vitamin E formula",
      "Confidence-boosting scent profile"
    ]
  },
  {
    id: "3",
    slug: "light-breeze",
    name: "Light Breeze",
    fragranceFamily: "Citrus/Bright",
    colorCode: "#D97E3A",
    colorName: "Burnt Orange",
    oneLiner: "Citrus-bright, coast-casual energy. Summer vacation in a bottle.",
    topNotes: "Mandarin, Grapefruit, Juniper",
    heartNotes: "Sea Salt, Jasmine",
    baseNotes: "Driftwood, Amber",
    scentExperience: "Light Breeze captures the essence of sun-soaked beaches and carefree summer days. Bright citrus notes of mandarin and grapefruit blend with coastal juniper and sea salt. This fresh, uplifting scent is perfect for warm weather adventures.",
    bestFor: [
      "Summer vacations & beach outings",
      "Casual daytime activities",
      "Weekend adventures",
      "Men who embrace laid-back confidence"
    ],
    occasions: ["Weekend", "Summer"],
    price4oz: 48,
    price8oz: 72,
    rating: 4.7,
    reviewCount: 98,
    howToUse: "Apply generously after morning shower. Reapply at midday for continuous freshness. Perfect for active lifestyles and warm weather.",
    poisedDifference: "Light Breeze brings vacation vibes to your daily routine. This citrus-forward balm delivers coastal freshness while nourishing sun-exposed skin. Clean, bright, and effortlessly cool.",
    ingredients: [
      "Organic Shea Butter",
      "Mango Butter",
      "Sunflower Seed Oil",
      "Aloe Vera Juice",
      "Vitamin E",
      "Natural Citrus Oils"
    ],
    benefits: [
      "Refreshing all-day wear",
      "Soothes sun-exposed skin",
      "Lightweight, non-greasy formula",
      "Uplifting citrus aromatherapy"
    ]
  },
  {
    id: "4",
    slug: "blue-harmony",
    name: "Blue Harmony",
    fragranceFamily: "Woody/Earthy",
    colorCode: "#CFB040",
    colorName: "Rich Gold",
    oneLiner: "Sophisticated woody aromatic elegance. Boardroom authority.",
    topNotes: "Grapefruit, Cedar, Sandalwood",
    heartNotes: "Violet, Patchouli",
    baseNotes: "Vetiver, Oakmoss, Amber",
    scentExperience: "Blue Harmony opens with refined grapefruit brightness before settling into a sophisticated woody heart. Sandalwood and cedar provide warmth, while vetiver and oakmoss add earthy depth. This is elegance in balm form—perfect for professional settings.",
    bestFor: [
      "Business meetings & office wear",
      "Formal events & presentations",
      "All-year-round versatility",
      "Men seeking refined sophistication"
    ],
    occasions: ["Office Ready", "Date Night"],
    price4oz: 48,
    price8oz: 72,
    rating: 4.9,
    reviewCount: 156,
    howToUse: "Apply each morning as part of your professional grooming routine. Focus on visible areas—neck, forearms, hands. Subtle yet commanding presence.",
    poisedDifference: "Blue Harmony is the scent of success. This woody aromatic balm combines boardroom authority with therapeutic skincare. Confidence, competence, and premium grooming in one distinguished product.",
    ingredients: [
      "Organic Shea Butter",
      "Mango Butter",
      "Sunflower Seed Oil",
      "Aloe Vera Juice",
      "Vitamin E",
      "Premium Woody Essences"
    ],
    benefits: [
      "Professional all-day fragrance",
      "Intensive hand and skin conditioning",
      "Maintains subtle, sophisticated presence",
      "Anti-aging antioxidant protection"
    ]
  },
  {
    id: "5",
    slug: "urban-wisdom",
    name: "Urban Wisdom",
    fragranceFamily: "Aromatic/Spicy",
    colorCode: "#4B2E5C",
    colorName: "Deep Purple",
    oneLiner: "Modern aromatic daily luxury. Contemporary sophistication.",
    topNotes: "Pear, Bergamot, Lavender",
    heartNotes: "Geranium, Coumarin",
    baseNotes: "Vanilla, Patchouli, Cedar",
    scentExperience: "Urban Wisdom combines fresh pear and bergamot with aromatic lavender, creating a modern, versatile scent. The heart reveals floral geranium and sweet coumarin, while the base settles into warm vanilla and cedarwood. This is daily luxury for the contemporary man.",
    bestFor: [
      "Daily office wear",
      "Casual outings",
      "Spring & summer seasons",
      "Men seeking modern versatility"
    ],
    occasions: ["Office Ready", "Summer"],
    price4oz: 48,
    price8oz: 72,
    rating: 4.8,
    reviewCount: 112,
    howToUse: "Apply daily as your signature scent. Suitable for all occasions—office, casual, or evening. A true all-day, every-day grooming essential.",
    poisedDifference: "Urban Wisdom adapts to your lifestyle. This modern aromatic balm transitions seamlessly from day to night, providing continuous moisture and a sophisticated scent that evolves throughout the day.",
    ingredients: [
      "Organic Shea Butter",
      "Mango Butter",
      "Sunflower Seed Oil",
      "Aloe Vera Juice",
      "Vitamin E",
      "Contemporary Fragrance Blend"
    ],
    benefits: [
      "Versatile all-occasion scent",
      "Smooth, rapid absorption",
      "Long-lasting hydration",
      "Modern aromatherapy benefits"
    ]
  },
  {
    id: "6",
    slug: "fighting-trim",
    name: "Fighting Trim",
    fragranceFamily: "Fresh/Green",
    colorCode: "#7ED957",
    colorName: "Bright Lime Green",
    oneLiner: "Athletic citrus aromatic edge. Post-workout vitality.",
    topNotes: "Rosemary, Pineapple, Bergamot",
    heartNotes: "Sage, Juniper",
    baseNotes: "Oakmoss, Patchouli, Cedarwood",
    scentExperience: "Fighting Trim energizes with fresh rosemary and tropical pineapple, balanced by herbaceous sage and juniper. The green, athletic character is grounded by earthy oakmoss and cedarwood. Perfect for active lifestyles and post-workout refreshment.",
    bestFor: [
      "Post-workout refreshment",
      "Sporting events & active days",
      "Summer adventures",
      "Men with athletic lifestyles"
    ],
    occasions: ["Weekend", "Summer"],
    price4oz: 48,
    price8oz: 72,
    rating: 4.7,
    reviewCount: 89,
    howToUse: "Apply after workouts or morning runs. Massage into shoulders, arms, and chest for cooling refreshment. Energizing scent keeps you feeling fresh all day.",
    poisedDifference: "Fighting Trim is built for action. This athletic cologne balm combines post-workout skincare with an energizing green scent. Stay fresh, stay confident, stay in the fight.",
    ingredients: [
      "Organic Shea Butter",
      "Mango Butter",
      "Sunflower Seed Oil",
      "Aloe Vera Juice",
      "Vitamin E",
      "Cooling Herbal Extracts"
    ],
    benefits: [
      "Refreshing post-workout application",
      "Soothes exercise-stressed skin",
      "Energizing aromatic lift",
      "Fast-absorbing athletic formula"
    ]
  },
  {
    id: "7",
    slug: "first-impression",
    name: "First Impression",
    fragranceFamily: "Woody/Earthy",
    colorCode: "#CFB040",
    colorName: "Rich Gold",
    oneLiner: "Professional woody floral authority. Make it count.",
    topNotes: "Violet Leaf, Mandarin, Cedarwood",
    heartNotes: "Iris, Nutmeg",
    baseNotes: "Vetiver, Tonka Bean, Amber",
    scentExperience: "First Impression opens with refined violet leaf and mandarin brightness, evolving into a woody floral heart of iris and nutmeg. The base of vetiver, tonka bean, and amber delivers lasting sophistication. This is the scent of authority and professional excellence.",
    bestFor: [
      "Office wear & business meetings",
      "Formal events & presentations",
      "Fall & winter seasons",
      "Men making power moves"
    ],
    occasions: ["Office Ready", "Date Night"],
    price4oz: 48,
    price8oz: 72,
    rating: 4.9,
    reviewCount: 134,
    howToUse: "Apply before important meetings or events. Focus on visible skin—neck, hands, forearms. A commanding presence that speaks before you do.",
    poisedDifference: "First Impression ensures you're remembered. This woody floral balm combines professional authority with premium skincare, delivering confidence and competence in equal measure.",
    ingredients: [
      "Organic Shea Butter",
      "Mango Butter",
      "Sunflower Seed Oil",
      "Aloe Vera Juice",
      "Vitamin E",
      "Premium Woody Florals"
    ],
    benefits: [
      "Professional lasting power (6-8 hours)",
      "Sophisticated, memorable scent",
      "Premium hand and skin conditioning",
      "Confidence-building presence"
    ]
  },
  {
    id: "8",
    slug: "jsp",
    name: "JSP (James Saint Patrick)",
    fragranceFamily: "Woody/Earthy",
    colorCode: "#CFB040",
    colorName: "Rich Gold",
    oneLiner: "Sophisticated woody elegance. Power and poise.",
    topNotes: "Bergamot, Apple, Sage",
    heartNotes: "Juniper Berries, Geranium",
    baseNotes: "Tonka Bean, Vetiver, Cedar",
    scentExperience: "JSP opens with refined bergamot and crisp apple, balanced by herbal sage. The heart reveals juniper and geranium florals, while the base delivers warm tonka bean, earthy vetiver, and cedarwood. This is power, sophistication, and unforgettable presence.",
    bestFor: [
      "Formal events & elegant occasions",
      "Romantic evenings",
      "Fall & winter seasons",
      "Men who command respect"
    ],
    occasions: ["Date Night", "Winter"],
    price4oz: 48,
    price8oz: 72,
    rating: 4.9,
    reviewCount: 167,
    howToUse: "Apply for evening events or important occasions. A little goes far with this intense, sophisticated formula. Focus on pulse points for maximum impact.",
    poisedDifference: "JSP is named for excellence. This woody elegant balm delivers the sophistication and confidence of a man who owns every room he enters. Premium grooming for premium moments.",
    ingredients: [
      "Organic Shea Butter",
      "Mango Butter",
      "Sunflower Seed Oil",
      "Aloe Vera Juice",
      "Vitamin E",
      "Luxury Woody Blend"
    ],
    benefits: [
      "Intense, long-lasting fragrance",
      "Sophisticated evening wear",
      "Deep skin nourishment",
      "Confidence-building luxury"
    ]
  },
  {
    id: "9",
    slug: "poised-sauvage",
    name: "Poised Sauvage",
    fragranceFamily: "Aromatic/Spicy",
    colorCode: "#4B2E5C",
    colorName: "Deep Purple",
    oneLiner: "Bold woody spicy luxury. Untamed sophistication.",
    topNotes: "Calabrian Bergamot, Sichuan Pepper",
    heartNotes: "Lavender, Elemi, Geranium",
    baseNotes: "Ambroxan, Vanilla, Cedar",
    scentExperience: "Poised Sauvage delivers raw, untamed sophistication. Opening with spicy Sichuan pepper and bright bergamot, it evolves through aromatic lavender and geranium before settling into a powerful base of ambroxan and vanilla. This is bold, masculine luxury.",
    bestFor: [
      "Date nights & evening events",
      "Nightlife & socializing",
      "Year-round versatility",
      "Men seeking bold presence"
    ],
    occasions: ["Date Night", "Winter"],
    price4oz: 48,
    price8oz: 72,
    rating: 4.9,
    reviewCount: 189,
    howToUse: "Apply for maximum impact. This powerful scent demands attention—perfect for evening wear and special occasions. Focus on neck and chest for lasting projection.",
    poisedDifference: "Poised Sauvage is untamed luxury. This bold cologne balm combines raw masculinity with premium skincare, delivering a scent that's impossible to ignore.",
    ingredients: [
      "Organic Shea Butter",
      "Mango Butter",
      "Sunflower Seed Oil",
      "Aloe Vera Juice",
      "Vitamin E",
      "Bold Spicy Aromatics"
    ],
    benefits: [
      "Powerful, long-lasting scent (8+ hours)",
      "Commanding masculine presence",
      "Premium evening moisturizer",
      "Unforgettable signature fragrance"
    ]
  },
  {
    id: "10",
    slug: "seven-figures",
    name: "Seven Figures",
    fragranceFamily: "Oriental/Warm",
    colorCode: "#FF0707",
    colorName: "Vibrant Red",
    oneLiner: "Charismatic woody spicy dominance. Success personified.",
    topNotes: "Grapefruit, Mint, Blood Mandarin",
    heartNotes: "Cinnamon, Spicy Notes, Rose",
    baseNotes: "Amber, Leather, Woody Notes",
    scentExperience: "Seven Figures opens with confident grapefruit, mint, and blood mandarin before revealing a spicy heart of cinnamon and rose. The base delivers warm amber, rich leather, and woody depth. This is the scent of success, power, and charismatic dominance.",
    bestFor: [
      "Clubbing & nightlife",
      "Parties & social events",
      "Date nights",
      "Fall & winter evenings"
    ],
    occasions: ["Date Night", "Winter"],
    price4oz: 48,
    price8oz: 72,
    rating: 4.8,
    reviewCount: 145,
    howToUse: "Apply for maximum impact at evening events. This powerful oriental scent makes a statement—perfect for nights when you want to be remembered.",
    poisedDifference: "Seven Figures is success in balm form. This oriental woody balm delivers charismatic dominance with every application. Premium grooming for men who play to win.",
    ingredients: [
      "Organic Shea Butter",
      "Mango Butter",
      "Sunflower Seed Oil",
      "Aloe Vera Juice",
      "Vitamin E",
      "Exotic Spice Blend"
    ],
    benefits: [
      "Powerful evening fragrance (8+ hours)",
      "Charismatic presence",
      "Rich skin conditioning",
      "Memorable signature scent"
    ]
  },
  {
    id: "11",
    slug: "ly-creed",
    name: "L.Y. Creed",
    fragranceFamily: "Citrus/Bright",
    colorCode: "#D97E3A",
    colorName: "Burnt Orange",
    oneLiner: "Premium fruity chypre success. Executive excellence.",
    topNotes: "Blackcurrant, Pineapple, Bergamot",
    heartNotes: "Birch, Patchouli, Jasmine",
    baseNotes: "Musk, Oakmoss, Ambergris",
    scentExperience: "L.Y. Creed opens with luxurious blackcurrant and pineapple, balanced by bright bergamot. The heart reveals smoky birch and earthy patchouli, while the base delivers rich musk, oakmoss, and ambergris. This is executive excellence in cologne balm form.",
    bestFor: [
      "High-end events & galas",
      "Business meetings & presentations",
      "Spring & summer seasons",
      "Men seeking luxury sophistication"
    ],
    occasions: ["Office Ready", "Summer"],
    price4oz: 48,
    price8oz: 72,
    rating: 4.9,
    reviewCount: 178,
    howToUse: "Apply for premium occasions. This luxurious scent elevates any moment—perfect for high-stakes meetings, elegant events, or whenever you want to feel like success.",
    poisedDifference: "L.Y. Creed brings luxury to daily grooming. This fruity chypre balm combines executive excellence with premium skincare, delivering sophistication that can't be bought—only earned.",
    ingredients: [
      "Organic Shea Butter",
      "Mango Butter",
      "Sunflower Seed Oil",
      "Aloe Vera Juice",
      "Vitamin E",
      "Premium Fruity Chypre Blend"
    ],
    benefits: [
      "Luxurious all-day fragrance",
      "Executive presence",
      "Deep moisturization",
      "Premium confidence boost"
    ]
  },
  {
    id: "12",
    slug: "admirals-odyssey",
    name: "Admiral's Odyssey",
    fragranceFamily: "Aquatic/Fresh",
    colorCode: "#077DFE",
    colorName: "Brilliant Blue",
    oneLiner: "Fresh aquatic adventure. Navigator's confidence.",
    topNotes: "Green Leaf, Apple, Mimosa",
    heartNotes: "Sea Notes, Jasmine",
    baseNotes: "White Musk, Cedarwood, Amber",
    scentExperience: "Admiral's Odyssey captures maritime adventure with fresh green leaf, crisp apple, and floral mimosa. The heart reveals oceanic sea notes and jasmine, while the base grounds with white musk, cedarwood, and amber. This is confidence for the modern navigator.",
    bestFor: [
      "Casual daytime activities",
      "Sports & outdoor adventures",
      "Summer seasons",
      "Men seeking fresh confidence"
    ],
    occasions: ["Weekend", "Summer"],
    price4oz: 48,
    price8oz: 72,
    rating: 4.8,
    reviewCount: 103,
    howToUse: "Apply for daytime adventures. This fresh aquatic scent keeps you feeling confident and cool all day. Perfect for active lifestyles and warm weather.",
    poisedDifference: "Admiral's Odyssey brings maritime confidence to your daily routine. This aquatic balm delivers fresh, clean scent while nourishing adventure-stressed skin.",
    ingredients: [
      "Organic Shea Butter",
      "Mango Butter",
      "Sunflower Seed Oil",
      "Aloe Vera Juice",
      "Vitamin E",
      "Fresh Aquatic Blend"
    ],
    benefits: [
      "Fresh all-day wear",
      "Adventure-ready moisturizer",
      "Lightweight formula",
      "Confidence-building freshness"
    ]
  }
];

export const getProductBySlug = (slug: string): EssenceProduct | undefined => {
  return essenceProducts.find(product => product.slug === slug);
};

export const getRelatedProducts = (currentProduct: EssenceProduct, count: number = 4): EssenceProduct[] => {
  // Filter products by same fragrance family, excluding current product
  const sameFamily = essenceProducts.filter(
    p => p.id !== currentProduct.id && p.fragranceFamily === currentProduct.fragranceFamily
  );
  
  // If not enough same family, add products with same occasions
  const sameOccasion = essenceProducts.filter(
    p => p.id !== currentProduct.id && 
    !sameFamily.includes(p) &&
    p.occasions.some(occ => currentProduct.occasions.includes(occ))
  );
  
  // Combine and limit to requested count
  return [...sameFamily, ...sameOccasion].slice(0, count);
};
