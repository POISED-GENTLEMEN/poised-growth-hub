import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ParentGuideBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const STORAGE_KEY = "parent-guide-banner-dismissed";
  const VISITED_KEY = "visited-moms-mentors";

  useEffect(() => {
    // Check if banner was dismissed
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    const dismissedDate = localStorage.getItem(STORAGE_KEY + "-date");
    
    // Check if user has visited the moms & mentors page
    const hasVisited = sessionStorage.getItem(VISITED_KEY);
    
    // Check if 7 days have passed since dismissal
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const shouldShow = !dismissed && 
                       !hasVisited && 
                       (!dismissedDate || new Date(dismissedDate) < sevenDaysAgo);
    
    if (shouldShow) {
      // Small delay for slide-down animation
      setTimeout(() => setIsVisible(true), 100);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem(STORAGE_KEY, "true");
    localStorage.setItem(STORAGE_KEY + "-date", new Date().toISOString());
  };

  if (!isVisible) return null;

  return (
    <div 
      className="w-full bg-[hsl(var(--muted))] border-b border-gold/20 animate-fade-in"
      style={{ animation: "slideDown 0.3s ease-out" }}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Left side - Icon and Text */}
          <div className="flex items-start gap-3 flex-1">
            <Gift className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
            <p className="text-[15px] text-foreground font-medium leading-relaxed">
              Shopping for a teen or young adult? Check out our{" "}
              <span className="text-gold">Parent's Guide</span> for age-appropriate recommendations
            </p>
          </div>

          {/* Right side - CTA Button and Close */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              asChild
              className="bg-gold hover:bg-gold/90 text-primary font-semibold px-6 flex-1 sm:flex-none"
            >
              <Link to="/for-moms-mentors">View Guide</Link>
            </Button>
            
            <button
              onClick={handleDismiss}
              className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted-foreground/10"
              aria-label="Dismiss banner"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
