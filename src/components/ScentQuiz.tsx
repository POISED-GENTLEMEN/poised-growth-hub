import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, Compass } from "lucide-react";
import { useShop, Product } from "@/contexts/ShopContext";
import { Badge } from "@/components/ui/badge";

interface QuizQuestion {
  id: string;
  text: string;
  type: "single" | "multiple";
  options: {
    value: string;
    label: string;
    description?: string;
    icon?: string;
  }[];
}

const questions: QuizQuestion[] = [
  {
    id: "lifestyle",
    text: "What best describes your daily life?",
    type: "single",
    options: [
      { value: "corporate", label: "Corporate Professional", description: "Office settings, meetings, presentations" },
      { value: "creative", label: "Creative/Entrepreneur", description: "Dynamic workspace, client interactions" },
      { value: "active", label: "Active/Outdoorsy", description: "Fitness, nature, on-the-go" },
      { value: "social", label: "Social/Nightlife", description: "Evening events, social gatherings" }
    ]
  },
  {
    id: "occasion",
    text: "When do you most want to make an impression?",
    type: "multiple",
    options: [
      { value: "professional", label: "Professional settings" },
      { value: "date", label: "Date nights" },
      { value: "casual", label: "Weekend casual" },
      { value: "special", label: "Special events" },
      { value: "everyday", label: "Everyday confidence" }
    ]
  },
  {
    id: "scent",
    text: "Which scent family appeals to you most?",
    type: "single",
    options: [
      { value: "fresh", label: "Fresh & Aquatic", description: "Crisp, clean, ocean-inspired" },
      { value: "woody", label: "Woody & Warm", description: "Grounded, sophisticated, earthy" },
      { value: "citrus", label: "Citrus & Bright", description: "Energizing, uplifting, vibrant" },
      { value: "spicy", label: "Spicy & Bold", description: "Confident, magnetic, memorable" },
      { value: "subtle", label: "Subtle & Refined", description: "Understated, elegant, classic" }
    ]
  },
  {
    id: "season",
    text: "Which season are you shopping for?",
    type: "single",
    options: [
      { value: "spring", label: "Spring", description: "Fresh, renewal, light" },
      { value: "summer", label: "Summer", description: "Bright, energetic, warm" },
      { value: "fall", label: "Fall", description: "Cozy, grounded, rich" },
      { value: "winter", label: "Winter", description: "Deep, warm, comforting" },
      { value: "year-round", label: "Year-Round", description: "Versatile for any season" }
    ]
  },
  {
    id: "strength",
    text: "How bold do you want your presence?",
    type: "single",
    options: [
      { value: "subtle", label: "Subtle", description: "Personal space only, intimate" },
      { value: "moderate", label: "Moderate", description: "Noticed up close, not overpowering" },
      { value: "bold", label: "Bold", description: "Room presence, memorable trail" }
    ]
  },
  {
    id: "style",
    text: "Which describes your personal style?",
    type: "single",
    options: [
      { value: "classic", label: "Classic & Timeless", description: "Traditional, refined" },
      { value: "modern", label: "Modern & Minimalist", description: "Sleek, contemporary" },
      { value: "adventurous", label: "Adventurous & Unique", description: "Eclectic, bold" },
      { value: "casual", label: "Casual & Approachable", description: "Relaxed, easy" }
    ]
  }
];

// Product quiz attributes mapping
const productQuizAttributes: Record<number, {
  lifestyle: string[];
  occasion: string[];
  scent: string[];
  season: string[];
  strength: string[];
  style: string[];
}> = {
  1: { // Modern-G Hydrating Cleanser
    lifestyle: ["corporate", "creative"],
    occasion: ["professional", "everyday"],
    scent: ["fresh", "citrus"],
    season: ["spring", "summer", "year-round"],
    strength: ["subtle", "moderate"],
    style: ["modern", "classic"]
  },
  2: { // Poised-G Anti-Aging Serum
    lifestyle: ["corporate", "social"],
    occasion: ["date", "special", "professional"],
    scent: ["woody", "spicy"],
    season: ["fall", "winter", "year-round"],
    strength: ["moderate", "bold"],
    style: ["classic", "modern"]
  },
  3: { // Young-G Acne Defense System
    lifestyle: ["active", "creative"],
    occasion: ["everyday", "casual"],
    scent: ["fresh", "citrus"],
    season: ["spring", "summer", "year-round"],
    strength: ["subtle"],
    style: ["casual", "modern"]
  },
  5: { // The Essentials Bundle
    lifestyle: ["corporate", "creative", "active"],
    occasion: ["everyday", "professional", "casual"],
    scent: ["fresh", "citrus", "subtle"],
    season: ["year-round"],
    strength: ["subtle", "moderate"],
    style: ["modern", "classic", "casual"]
  },
  6: { // Distinguished-G Eye Cream
    lifestyle: ["corporate", "social"],
    occasion: ["professional", "special"],
    scent: ["subtle", "woody"],
    season: ["year-round"],
    strength: ["subtle", "moderate"],
    style: ["classic", "modern"]
  },
  9: { // Graduate-G Daily Moisturizer with SPF
    lifestyle: ["active", "creative", "casual"],
    occasion: ["everyday", "casual"],
    scent: ["fresh", "citrus"],
    season: ["summer", "spring", "year-round"],
    strength: ["subtle", "moderate"],
    style: ["casual", "modern"]
  },
  10: { // Distinguished-G Beard Oil
    lifestyle: ["corporate", "creative", "social"],
    occasion: ["professional", "special", "date"],
    scent: ["woody", "spicy"],
    season: ["fall", "winter", "year-round"],
    strength: ["moderate", "bold"],
    style: ["classic", "adventurous"]
  }
};

interface ScentQuizProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ScentQuiz = ({ open, onOpenChange }: ScentQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const { products, addToCart, showToast } = useShop();

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers };
    
    if (question.type === "multiple") {
      const current = (answers[question.id] as string[]) || [];
      if (current.includes(value)) {
        newAnswers[question.id] = current.filter(v => v !== value);
      } else if (current.length < 2) {
        newAnswers[question.id] = [...current, value];
      } else {
        return; // Max 2 selections
      }
    } else {
      newAnswers[question.id] = value;
    }
    
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateRecommendations();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateRecommendations = () => {
    const scoredProducts = products
      .filter(p => productQuizAttributes[p.id]) // Only products with quiz attributes
      .map(product => {
        let score = 0;
        const attrs = productQuizAttributes[product.id];
        
        // Score each attribute
        Object.keys(answers).forEach(key => {
          const answer = answers[key];
          const productValues = attrs[key as keyof typeof attrs] || [];
          
          if (Array.isArray(answer)) {
            // Multiple choice (occasion)
            answer.forEach(val => {
              if (productValues.includes(val)) score += 2;
            });
          } else {
            // Single choice
            if (productValues.includes(answer)) score += 3;
          }
        });
        
        return { product, score };
      })
      .sort((a, b) => b.score - a.score);

    // Get top 2, try to diversify by age group
    const top2 = [];
    const usedAgeGroups = new Set();
    
    for (const item of scoredProducts) {
      if (top2.length >= 2) break;
      if (!usedAgeGroups.has(item.product.ageGroup) || top2.length === 1) {
        top2.push(item.product);
        usedAgeGroups.add(item.product.ageGroup);
      }
    }
    
    // If we still need more, add the next highest
    if (top2.length < 2) {
      for (const item of scoredProducts) {
        if (!top2.find(p => p.id === item.product.id)) {
          top2.push(item.product);
          if (top2.length >= 2) break;
        }
      }
    }
    
    setRecommendations(top2);
    setIsComplete(true);
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsComplete(false);
    setRecommendations([]);
  };

  const handleAddDuoToCart = () => {
    recommendations.forEach(product => {
      addToCart(product, 1);
    });
    showToast("Discovery Duo added to cart! You saved 20%", "success");
    onOpenChange(false);
  };

  const getBundlePrice = () => {
    const total = recommendations.reduce((sum, p) => sum + p.price, 0);
    return (total * 0.8).toFixed(2);
  };

  const getRegularPrice = () => {
    return recommendations.reduce((sum, p) => sum + p.price, 0).toFixed(2);
  };

  const getSavings = () => {
    const total = recommendations.reduce((sum, p) => sum + p.price, 0);
    return (total * 0.2).toFixed(2);
  };

  const getWhyText = (product: Product) => {
    const lifestyle = answers.lifestyle as string;
    const scent = answers.scent as string;
    const occasion = Array.isArray(answers.occasion) ? answers.occasion[0] : answers.occasion;
    
    const lifestyleText = {
      corporate: "professional settings",
      creative: "dynamic work environment",
      active: "active lifestyle",
      social: "social settings"
    }[lifestyle] || "daily life";
    
    const scentText = {
      fresh: "fresh, clean notes",
      woody: "grounded, sophisticated tones",
      citrus: "energizing, uplifting freshness",
      spicy: "bold, confident character",
      subtle: "refined, understated elegance"
    }[scent] || "refined character";
    
    return `Perfect for ${lifestyleText}. The ${scentText} of ${product.name} aligns with your preference for ${occasion || "everyday"} occasions, providing the confidence and presence you're seeking.`;
  };

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        {!isComplete ? (
          <div className="py-6">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-muted-foreground">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Question */}
            <div className="mb-8">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-6 text-center">
                {question.text}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options.map(option => {
                  const isSelected = question.type === "multiple"
                    ? (answers[question.id] as string[] || []).includes(option.value)
                    : answers[question.id] === option.value;
                  
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className={`p-6 rounded-xl border-2 text-left transition-all hover:shadow-lg ${
                        isSelected
                          ? "border-gold bg-gold/10"
                          : "border-border bg-card hover:border-gold/50"
                      }`}
                    >
                      <div className="font-semibold text-lg mb-1">{option.label}</div>
                      {option.description && (
                        <div className="text-sm text-muted-foreground">{option.description}</div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentQuestion === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!answers[question.id] || (question.type === "multiple" && (answers[question.id] as string[]).length === 0)}
                className="bg-gold text-gold-foreground hover:bg-gold/90"
              >
                {currentQuestion === questions.length - 1 ? "See Results" : "Next"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-6">
            {/* Results Header */}
            <div className="text-center mb-8">
              <Compass className="w-16 h-16 text-gold mx-auto mb-4" />
              <h2 className="text-4xl font-heading font-bold text-primary mb-3">
                Your Perfect Match
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Based on your preferences, we recommend these two products
              </p>
            </div>

            {/* Product Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {recommendations.map(product => (
                <div key={product.id} className="bg-card border border-border rounded-xl p-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <Badge className="mb-3 bg-gold text-gold-foreground">
                    Perfect for {Array.isArray(answers.occasion) ? answers.occasion[0] : answers.occasion}
                  </Badge>
                  <h3 className="text-xl font-heading font-bold mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold text-gold mb-3">${product.price}</p>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {getWhyText(product)}
                  </p>
                  <Button
                    onClick={() => {
                      addToCart(product, 1);
                      showToast(`${product.name} added to cart`, "success");
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Add to Cart
                  </Button>
                </div>
              ))}
            </div>

            {/* Discovery Duo Offer */}
            <div className="bg-gold/10 border-2 border-gold rounded-xl p-8 mb-6">
              <h3 className="text-3xl font-heading font-bold text-primary text-center mb-3">
                Try Both as a Discovery Duo
              </h3>
              <p className="text-lg text-muted-foreground text-center mb-6">
                Get both of your perfect matches and save 20%
              </p>
              
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="text-2xl text-muted-foreground line-through">
                  ${getRegularPrice()}
                </span>
                <span className="text-4xl font-bold text-gold">
                  ${getBundlePrice()}
                </span>
                <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-300">
                  Save ${getSavings()}
                </Badge>
              </div>
              
              <Button
                onClick={handleAddDuoToCart}
                size="lg"
                className="w-full bg-gold text-gold-foreground hover:bg-gold/90 text-lg h-14"
              >
                Add Discovery Duo to Cart
              </Button>
            </div>

            {/* Secondary Actions */}
            <div className="flex items-center justify-center gap-6 text-sm">
              <button
                onClick={handleRetake}
                className="text-gold hover:underline font-semibold"
              >
                Retake Quiz
              </button>
              <button
                onClick={() => onOpenChange(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
