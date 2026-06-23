import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, Compass, ArrowRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { essenceProducts, EssenceProduct } from "@/data/essenceProducts";
import { shopifyUrl, trackShopClick } from "@/lib/shopifyLinks";

interface QuizQuestion {
  id: string;
  text: string;
  type: "single" | "multiple";
  options: {
    value: string;
    label: string;
    description?: string;
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

// Quiz attribute mapping for each of the 12 Essence fragrances.
// Keyed by product slug so links stay aligned to live product pages.
type QuizAttrs = {
  lifestyle: string[];
  occasion: string[];
  scent: string[];
  season: string[];
  strength: string[];
  style: string[];
};

const productQuizAttributes: Record<string, QuizAttrs> = {
  "buoyant-inspired-by-giorgio-armani": {
    lifestyle: ["corporate", "active", "creative"],
    occasion: ["professional", "everyday"],
    scent: ["fresh"],
    season: ["spring", "summer", "year-round"],
    strength: ["subtle", "moderate"],
    style: ["modern", "classic"],
  },
  "vigaros-inspired-by-versace-eros": {
    lifestyle: ["social", "creative"],
    occasion: ["date", "special"],
    scent: ["spicy"],
    season: ["fall", "winter"],
    strength: ["bold", "moderate"],
    style: ["adventurous", "classic"],
  },
  "light-breeze-inspired-by-dolce-gabbana-light-blue": {
    lifestyle: ["active", "creative"],
    occasion: ["casual", "everyday"],
    scent: ["citrus", "fresh"],
    season: ["spring", "summer"],
    strength: ["moderate", "subtle"],
    style: ["casual", "modern"],
  },
  "blue-harmony-inspired-by-bleu-de-chanel": {
    lifestyle: ["corporate", "social"],
    occasion: ["professional", "date", "special"],
    scent: ["woody"],
    season: ["fall", "winter", "year-round"],
    strength: ["moderate"],
    style: ["classic", "modern"],
  },
  "urban-wisdom-inspired-by-coach-for-men": {
    lifestyle: ["corporate", "creative"],
    occasion: ["professional", "everyday"],
    scent: ["subtle", "woody"],
    season: ["spring", "summer", "year-round"],
    strength: ["moderate"],
    style: ["modern", "classic"],
  },
  "fighting-trim-inspired-by-chrome-azzaro": {
    lifestyle: ["active"],
    occasion: ["casual", "everyday"],
    scent: ["fresh", "citrus"],
    season: ["spring", "summer"],
    strength: ["moderate"],
    style: ["casual", "adventurous"],
  },
  "first-impression-inspired-by-bleu-de-chanel": {
    lifestyle: ["corporate", "social"],
    occasion: ["professional", "special", "date"],
    scent: ["woody", "subtle"],
    season: ["fall", "winter", "year-round"],
    strength: ["moderate", "bold"],
    style: ["classic"],
  },
  "james-saint-patrick-jsp-inspired-by-yves-saint-laurent": {
    lifestyle: ["social", "corporate"],
    occasion: ["date", "special"],
    scent: ["woody", "spicy"],
    season: ["fall", "winter"],
    strength: ["bold", "moderate"],
    style: ["classic", "modern"],
  },
  "poised-sauvage-inspired-by-dior-sauvage": {
    lifestyle: ["social", "creative"],
    occasion: ["date", "special"],
    scent: ["spicy", "woody"],
    season: ["fall", "winter", "year-round"],
    strength: ["bold"],
    style: ["adventurous", "modern"],
  },
  "seven-figures-inspired-by-paco-rabanne-1-million": {
    lifestyle: ["social"],
    occasion: ["date", "special"],
    scent: ["spicy", "woody"],
    season: ["fall", "winter"],
    strength: ["bold"],
    style: ["adventurous", "classic"],
  },
  "l-y-creed-inspired-by-creed-aventus": {
    lifestyle: ["corporate", "social"],
    occasion: ["professional", "special"],
    scent: ["citrus", "woody"],
    season: ["spring", "summer", "year-round"],
    strength: ["moderate", "bold"],
    style: ["classic", "modern"],
  },
  "admirals-odyssey-inspired-by-nautica-voyage": {
    lifestyle: ["active", "creative"],
    occasion: ["casual", "everyday"],
    scent: ["fresh"],
    season: ["spring", "summer"],
    strength: ["subtle", "moderate"],
    style: ["casual", "modern"],
  },
};

interface ScentQuizProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ScentQuiz = ({ open, onOpenChange }: ScentQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [recommendations, setRecommendations] = useState<EssenceProduct[]>([]);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers };

    if (question.type === "multiple") {
      const current = (answers[question.id] as string[]) || [];
      if (current.includes(value)) {
        newAnswers[question.id] = current.filter((v) => v !== value);
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
    const scored = essenceProducts
      .filter((p) => productQuizAttributes[p.slug])
      .map((product) => {
        let score = 0;
        const attrs = productQuizAttributes[product.slug];

        Object.keys(answers).forEach((key) => {
          const answer = answers[key];
          const productValues = attrs[key as keyof QuizAttrs] || [];

          if (Array.isArray(answer)) {
            answer.forEach((val) => {
              if (productValues.includes(val)) score += 2;
            });
          } else {
            if (productValues.includes(answer)) score += 3;
          }
        });

        return { product, score };
      })
      .sort((a, b) => b.score - a.score);

    // Top 2, prefer diversity across fragrance families
    const top: EssenceProduct[] = [];
    const usedFamilies = new Set<string>();
    for (const item of scored) {
      if (top.length >= 2) break;
      if (!usedFamilies.has(item.product.fragranceFamily) || top.length === 1) {
        top.push(item.product);
        usedFamilies.add(item.product.fragranceFamily);
      }
    }
    if (top.length < 2) {
      for (const item of scored) {
        if (!top.find((p) => p.id === item.product.id)) {
          top.push(item.product);
          if (top.length >= 2) break;
        }
      }
    }

    setRecommendations(top);
    setIsComplete(true);
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsComplete(false);
    setRecommendations([]);
  };

  const getWhyText = (product: EssenceProduct) => {
    const lifestyle = answers.lifestyle as string;
    const scent = answers.scent as string;
    const occasion = Array.isArray(answers.occasion) ? answers.occasion[0] : (answers.occasion as string | undefined);

    const lifestyleText =
      ({
        corporate: "professional settings",
        creative: "a dynamic work environment",
        active: "an active lifestyle",
        social: "social settings",
      } as Record<string, string>)[lifestyle] || "daily life";

    const scentText =
      ({
        fresh: "fresh, clean notes",
        woody: "grounded, sophisticated tones",
        citrus: "energizing, uplifting freshness",
        spicy: "bold, confident character",
        subtle: "refined, understated elegance",
      } as Record<string, string>)[scent] || "refined character";

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
                {question.options.map((option) => {
                  const isSelected =
                    question.type === "multiple"
                      ? ((answers[question.id] as string[]) || []).includes(option.value)
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
              <Button variant="outline" onClick={handleBack} disabled={currentQuestion === 0}>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              <Button
                onClick={handleNext}
                disabled={
                  !answers[question.id] ||
                  (question.type === "multiple" && (answers[question.id] as string[]).length === 0)
                }
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
                Your Signature Scent
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Based on your preferences, we recommend these two scents from the Essence Collection
              </p>
            </div>

            {/* Product Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {recommendations.map((product) => (
                <div key={product.id} className="bg-card border border-border rounded-xl p-6">
                  <div
                    className="w-full h-32 rounded-lg mb-4 flex items-center justify-center"
                    style={{ backgroundColor: product.colorCode }}
                    aria-hidden
                  >
                    <span className="text-white text-2xl font-heading font-bold tracking-wide drop-shadow">
                      {product.name}
                    </span>
                  </div>
                  <Badge className="mb-3 bg-gold text-gold-foreground">
                    {product.fragranceFamily}
                  </Badge>
                  <h3 className="text-xl font-heading font-bold mb-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground italic mb-3">{product.oneLiner}</p>
                  <p className="text-2xl font-bold text-gold mb-3">${product.price4oz}</p>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {getWhyText(product)}
                  </p>
                  {(() => {
                    const url = shopifyUrl(`/products/${product.slug}`, "scent_quiz_result");
                    return (
                      <Button
                        asChild
                        className="w-full bg-gold text-gold-foreground hover:bg-gold/90"
                      >
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            trackShopClick("scent_quiz_result", url);
                          }}
                        >
                          Shop on Shopify
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    );
                  })()}
                </div>
              ))}
            </div>

            {/* Shop full collection CTA */}
            <div className="bg-primary text-primary-foreground rounded-xl p-8 mb-6 text-center">
              <h3 className="text-2xl font-heading font-bold mb-3">
                Explore all twelve signatures
              </h3>
              <p className="opacity-90 mb-6">
                Six fragrance families. Twelve scents. One standard.
              </p>
              {(() => {
                const url = shopifyUrl(
                  "/collections/essence-collection",
                  "scent_quiz_cta"
                );
                return (
                  <Button
                    asChild
                    size="lg"
                    className="bg-gold text-gold-foreground hover:bg-gold/90"
                  >
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackShopClick("scent_quiz_cta", url)}
                    >
                      Shop the Essence Collection
                      <ExternalLink className="w-5 h-5 ml-2" />
                    </a>
                  </Button>
                );
              })()}
            </div>

            {/* Secondary Actions */}
            <div className="flex items-center justify-center gap-6 text-sm">
              <button onClick={handleRetake} className="text-gold hover:underline font-semibold">
                Retake Quiz
              </button>
              <button
                onClick={() => onOpenChange(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
