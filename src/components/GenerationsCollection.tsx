import { useState } from "react";

const generationsData = [
  {
    ageGroup: "0-2",
    tabLabel: "Genesis-G (0-2)",
    title: "Gentle Beginnings",
    description: "Ultra-gentle, hypoallergenic formulas for baby's delicate skin",
    products: [
      {
        name: "Baby Gentle Wash",
        description: "Tear-free, pH-balanced cleanser for daily bath time",
        benefits: ["Tear-free", "Hypoallergenic", "Moisturizing"]
      },
      {
        name: "Protective Baby Lotion",
        description: "Nourishing moisture barrier for sensitive skin",
        benefits: ["Fragrance-free", "Soothes dryness", "Dermatologist tested"]
      },
      {
        name: "Diaper Care Cream",
        description: "Zinc-based barrier cream for preventing irritation",
        benefits: ["Protects", "Soothes rashes", "Long-lasting"]
      }
    ]
  },
  {
    ageGroup: "3-9",
    tabLabel: "Big-G (3-9)",
    title: "Growing Years",
    description: "Safe, fun skincare for active kids building healthy habits",
    products: [
      {
        name: "Kids' Body Wash",
        description: "Gentle, all-in-one wash for hair and body",
        benefits: ["Fun to use", "Mild formula", "No harsh chemicals"]
      },
      {
        name: "Daily SPF Lotion",
        description: "Broad-spectrum sun protection for outdoor play",
        benefits: ["SPF 50", "Water-resistant", "Non-greasy"]
      },
      {
        name: "After-Sun Relief Gel",
        description: "Cooling, soothing care after a day in the sun",
        benefits: ["Cools skin", "Aloe-based", "Hydrating"]
      }
    ]
  },
  {
    ageGroup: "10-17",
    tabLabel: "Young-G (10-17)",
    title: "Teen Years",
    description: "Gentle, effective products for developing skin dealing with hormonal changes",
    products: [
      {
        name: "Daily Face Wash",
        description: "Gentle cleanser that removes oil and impurities without over-drying",
        benefits: ["Controls oil", "Prevents breakouts", "Non-irritating"]
      },
      {
        name: "Lightweight Moisturizer",
        description: "Oil-free formula perfect for young, active skin",
        benefits: ["Hydrates", "Non-greasy", "SPF 15"]
      },
      {
        name: "Spot Treatment",
        description: "Targeted solution for occasional blemishes",
        benefits: ["Fast-acting", "Reduces redness", "Prevents scarring"]
      }
    ]
  },
  {
    ageGroup: "18-24",
    tabLabel: "Graduate-G (18-24)",
    title: "Independence & Discovery",
    description: "Establishing routines for college, career, and active social life",
    products: [
      {
        name: "Fresh Start Cleanser",
        description: "Energizing morning wash for busy schedules",
        benefits: ["Refreshing", "Quick-rinse", "Balances skin"]
      },
      {
        name: "Multi-Defense Moisturizer",
        description: "All-day hydration with SPF 25 and pollution protection",
        benefits: ["SPF 25", "Lightweight", "Pollution shield"]
      },
      {
        name: "Acne Control Serum",
        description: "Targeted treatment for persistent breakouts",
        benefits: ["Clears acne", "Smooths texture", "Non-drying"]
      },
      {
        name: "Recovery Night Gel",
        description: "Hydrating overnight treatment for stressed skin",
        benefits: ["Repairs", "Calms", "Oil-free"]
      }
    ]
  },
  {
    ageGroup: "25-34",
    tabLabel: "Modern-G (25-34)",
    title: "Building Foundations",
    description: "Preventative care and maintenance for active lifestyles",
    products: [
      {
        name: "Deep Cleansing Wash",
        description: "Removes daily buildup while maintaining skin's natural barrier",
        benefits: ["Deep clean", "Refreshing", "Balanced pH"]
      },
      {
        name: "Anti-Aging Moisturizer",
        description: "Early prevention with antioxidants and SPF 30",
        benefits: ["Fights free radicals", "SPF 30", "Reduces fine lines"]
      },
      {
        name: "Eye Cream",
        description: "Combat fatigue and early signs of aging around eyes",
        benefits: ["Reduces puffiness", "Brightens", "Smooth texture"]
      },
      {
        name: "Aftershave Balm",
        description: "Soothes irritation and hydrates post-shave",
        benefits: ["Calms skin", "Prevents razor burn", "Nourishing"]
      }
    ]
  },
  {
    ageGroup: "35-49",
    tabLabel: "Poised-G (35-49)",
    title: "Leadership & Legacy",
    description: "Advanced care for confident men in their prime",
    products: [
      {
        name: "Firming Cleanser",
        description: "Fortifying wash with peptides and antioxidants",
        benefits: ["Improves elasticity", "Deep clean", "Energizing"]
      },
      {
        name: "Power Moisturizer with Retinol",
        description: "High-performance formula targeting wrinkles and texture",
        benefits: ["Retinol-powered", "SPF 30", "Visibly firms"]
      },
      {
        name: "Advanced Eye Treatment",
        description: "Clinical-strength solution for crow's feet and dark circles",
        benefits: ["Reduces wrinkles", "Lifts", "Brightens"]
      },
      {
        name: "Overnight Renewal Serum",
        description: "Intensive repair with hyaluronic acid and peptides",
        benefits: ["Deep hydration", "Repairs", "Smooth texture"]
      }
    ]
  },
  {
    ageGroup: "50-64",
    tabLabel: "Distinguished-G (50-64)",
    title: "Refined Care",
    description: "Advanced formulas targeting mature skin concerns",
    products: [
      {
        name: "Rejuvenating Cleanser",
        description: "Gentle yet effective cleansing with age-defying ingredients",
        benefits: ["Firms skin", "Improves texture", "Deeply cleanses"]
      },
      {
        name: "Premium Moisturizer",
        description: "Rich formula with retinol and peptides for visible results",
        benefits: ["Reduces wrinkles", "Firms", "High SPF"]
      },
      {
        name: "Intensive Eye Treatment",
        description: "Targeted treatment for crow's feet and under-eye concerns",
        benefits: ["Reduces wrinkles", "Lifts", "Brightens dark circles"]
      },
      {
        name: "Night Repair Serum",
        description: "Overnight rejuvenation with powerful active ingredients",
        benefits: ["Cellular repair", "Deeply hydrating", "Visible results"]
      }
    ]
  },
  {
    ageGroup: "65+",
    tabLabel: "Legendary-G (65+)",
    title: "Elder Excellence",
    description: "Luxurious, nourishing care for seasoned skin and wisdom earned",
    products: [
      {
        name: "Gentle Nourishing Wash",
        description: "Extra-mild cleanser that respects delicate, mature skin",
        benefits: ["Ultra-gentle", "Hydrating", "Soap-free"]
      },
      {
        name: "Rich Restorative Cream",
        description: "Deeply moisturizing formula for comfort and suppleness",
        benefits: ["Intense hydration", "Soothes dryness", "Improves texture"]
      },
      {
        name: "Protective Day Cream SPF 50",
        description: "High-protection shield against environmental damage",
        benefits: ["SPF 50", "Antioxidants", "Non-greasy"]
      },
      {
        name: "Luxury Night Treatment",
        description: "Overnight indulgence with restorative botanicals",
        benefits: ["Deeply nourishing", "Repairs", "Calms irritation"]
      }
    ]
  }
];

export const GenerationsCollection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  const handleTabClick = (index: number) => {
    if (index === activeTab) return;
    
    setFadeIn(false);
    
    setTimeout(() => {
      setActiveTab(index);
      setFadeIn(true);
    }, 200);
  };

  const handleViewProduct = (productName: string) => {
    console.log('View product:', productName);
  };

  const currentGeneration = generationsData[activeTab];

  return (
    <section className="bg-muted py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-[900px] mx-auto text-center mb-12">
          <h2 className="font-heading font-bold text-primary text-4xl md:text-5xl mb-6">
            The Generations Collection
          </h2>
          <p className="text-secondary text-base md:text-lg leading-relaxed max-w-[800px] mx-auto">
            From young gentlemen mastering discipline to seasoned mentors refining legacy — our skincare lines evolve with you, meeting the needs of every stage of the poised life.
          </p>
        </div>

        {/* Tabs Navigation */}
        <div 
          role="tablist" 
          className="flex flex-wrap justify-center gap-2 mb-12 border-b border-border"
        >
          {generationsData.map((gen, index) => (
            <button
              key={gen.ageGroup}
              role="tab"
              aria-selected={activeTab === index}
              aria-controls={`panel-${index}`}
              id={`tab-${index}`}
              onClick={() => handleTabClick(index)}
              className={`
                px-6 py-4 font-semibold text-base transition-all duration-300 border-b-[3px]
                focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2
                ${activeTab === index 
                  ? 'border-b-gold text-gold' 
                  : 'border-b-transparent text-muted-foreground hover:text-primary hover:border-b-gold/50'
                }
              `}
            >
              {gen.tabLabel}
            </button>
          ))}
        </div>

        {/* Tab Content Panel */}
        <div
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          className={`
            max-w-[1200px] mx-auto transition-opacity duration-400 ease-in-out
            ${fadeIn ? 'opacity-100' : 'opacity-0'}
          `}
        >
          {/* Age Group Title Section */}
          <div className="text-center mb-10">
            <h3 className="font-heading font-semibold text-primary text-2xl md:text-3xl mb-3">
              {currentGeneration.title}
            </h3>
            <p className="text-muted-foreground text-base">
              {currentGeneration.description}
            </p>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentGeneration.products.map((product, idx) => (
              <div
                key={idx}
                className="bg-card rounded-xl p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col"
              >
                {/* Age Group Badge */}
                <div className="inline-block mb-5">
                  <span className="inline-block px-4 py-1.5 bg-gold/10 border border-gold rounded-full text-gold text-xs font-semibold uppercase tracking-wide">
                    {currentGeneration.ageGroup}
                  </span>
                </div>

                {/* Product Name */}
                <h4 className="font-heading font-semibold text-primary text-xl md:text-2xl mb-3">
                  {product.name}
                </h4>

                {/* Product Description */}
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* KEY BENEFITS Heading */}
                <h5 className="text-secondary text-xs font-bold uppercase tracking-wider mb-3">
                  KEY BENEFITS
                </h5>

                {/* Benefits List */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.benefits.map((benefit, benefitIdx) => (
                    <span
                      key={benefitIdx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-md text-secondary text-xs md:text-sm font-medium"
                    >
                      <svg
                        className="w-3 h-3 text-gold"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {benefit}
                    </span>
                  ))}
                </div>

                {/* View Product Button */}
                <button
                  onClick={() => handleViewProduct(product.name)}
                  className="mt-auto w-full py-3 px-6 border-2 border-gold text-gold font-semibold text-sm uppercase tracking-wide rounded-lg transition-all duration-300 hover:bg-gold hover:text-gold-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
                >
                  View Product
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
