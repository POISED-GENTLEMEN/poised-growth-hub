import { useState, useEffect } from "react";
import { Search, X, Gift } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import ParentBadge from "./ParentBadge";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  isParentRelated?: boolean;
}

export const SiteSearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showParentSuggestion, setShowParentSuggestion] = useState(false);
  const navigate = useNavigate();

  // Parent/teen-related search triggers
  const parentTriggers = [
    "teen", "teenager", "son", "kid", "child", "youth",
    "parent", "mom", "dad", "mother", "father", "mentor",
    "first shave", "beginner", "starter", "young",
    "gift", "present",
    "13", "14", "15", "16", "17", "18"
  ];

  // All searchable content
  const searchableContent: SearchResult[] = [
    // Moms & Mentors Hub
    {
      id: "moms-mentors",
      title: "Moms & Mentors Hub",
      description: "Complete guide for parents: teen starter kits, first shave guide, and youth programs",
      url: "/for-moms-mentors",
      category: "Pages",
      isParentRelated: true,
    },
    // Products
    {
      id: "light-breeze-mini",
      title: "Light Breeze Mini - Teen Starter Kit",
      description: "Age-appropriate grooming kit for teens 13-17",
      url: "/shop#teen-kits",
      category: "Products",
      isParentRelated: true,
    },
    {
      id: "buoyant-mini",
      title: "Buoyant Mini - Youth Collection",
      description: "Gentle grooming essentials for young men",
      url: "/shop#teen-kits",
      category: "Products",
      isParentRelated: true,
    },
    {
      id: "young-g",
      title: "Young-G Collection (Ages 10-17)",
      description: "Complete grooming line designed for teens and young adults",
      url: "/shop",
      category: "Products",
      isParentRelated: true,
    },
    {
      id: "big-g",
      title: "Big-G Collection (Ages 18-24)",
      description: "Advanced grooming for young men entering adulthood",
      url: "/shop",
      category: "Products",
    },
    {
      id: "poised-g",
      title: "Poised-G Collection (Ages 25-34)",
      description: "Premium grooming for men building careers and character",
      url: "/shop",
      category: "Products",
    },
    // Programs
    {
      id: "pyg-program",
      title: "Poised Young Gentleman Program",
      description: "7-10 week youth mentorship program teaching the Four Pillars (Ages 10-17)",
      url: "/programs#youth",
      category: "Programs",
      isParentRelated: true,
    },
    {
      id: "legacy-series",
      title: "Legacy Series Adult Coaching",
      description: "Group coaching for men 18+ focused on emotional intelligence and leadership",
      url: "/programs#adult",
      category: "Programs",
    },
    {
      id: "live-experiences",
      title: "Live Experiences & Workshops",
      description: "Weekend retreats, pop-up workshops, and fatherhood forums",
      url: "/programs#events",
      category: "Programs",
    },
    // Resources
    {
      id: "first-shave-guide",
      title: "First Shave Guide (Free Download)",
      description: "Step-by-step guide for teaching your son how to shave",
      url: "/for-moms-mentors#first-shave",
      category: "Resources",
      isParentRelated: true,
    },
    {
      id: "parent-conversations",
      title: "Parent Conversation Starters",
      description: "Topics to discuss with your teen about manhood and character",
      url: "/for-moms-mentors#conversations",
      category: "Resources",
      isParentRelated: true,
    },
    {
      id: "codex",
      title: "The Codex - Articles & Guides",
      description: "Grooming tips, Four Pillars teachings, and life advice",
      url: "/codex",
      category: "Resources",
    },
    // Other pages
    {
      id: "about",
      title: "About The Poised Gentlemen",
      description: "Learn about our mission, the Four Pillars, and founder David Rachal",
      url: "/about",
      category: "Pages",
    },
    {
      id: "programs-main",
      title: "Programs Overview",
      description: "Youth mentorship, adult coaching, and live experiences",
      url: "/programs",
      category: "Pages",
    },
    {
      id: "shop",
      title: "Shop Grooming Products",
      description: "Age-appropriate grooming products from Genesis to Legendary",
      url: "/shop",
      category: "Pages",
    },
    {
      id: "contact",
      title: "Contact Us",
      description: "Get in touch with questions or partnership inquiries",
      url: "/contact",
      category: "Pages",
    },
  ];

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowParentSuggestion(false);
      return;
    }

    const lowerQuery = query.toLowerCase();
    
    // Check if query contains parent-related triggers
    const isParentQuery = parentTriggers.some(trigger => 
      lowerQuery.includes(trigger.toLowerCase())
    );
    setShowParentSuggestion(isParentQuery);

    // Filter and sort results
    let filtered = searchableContent.filter(item => {
      const searchText = `${item.title} ${item.description}`.toLowerCase();
      return searchText.includes(lowerQuery);
    });

    // If parent query, prioritize parent-related results
    if (isParentQuery) {
      filtered.sort((a, b) => {
        if (a.isParentRelated && !b.isParentRelated) return -1;
        if (!a.isParentRelated && b.isParentRelated) return 1;
        return 0;
      });
    }

    setResults(filtered.slice(0, 8));
  }, [query]);

  const handleSelect = (url: string) => {
    setOpen(false);
    setQuery("");
    navigate(url);
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 md:w-64 md:justify-start md:px-3 text-muted-foreground"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 md:mr-2" />
        <span className="hidden md:inline-flex">Search site...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 md:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Search products, programs, resources..." 
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {/* Parent Suggestion Box */}
          {showParentSuggestion && (
            <div className="border-b border-gold/20 bg-[hsl(var(--muted))] p-4 mb-2">
              <div className="flex items-start gap-3">
                <Gift className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">
                    Looking for guidance for your teen?
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Visit our Moms & Mentors Hub for age-appropriate products, guides, and programs
                  </p>
                  <Button
                    size="sm"
                    className="bg-gold hover:bg-gold/90 text-primary font-semibold"
                    onClick={() => handleSelect("/for-moms-mentors")}
                  >
                    Visit Parent Hub
                  </Button>
                </div>
              </div>
            </div>
          )}

          <CommandEmpty>
            <div className="py-6 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                No results found for "{query}"
              </p>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Try searching for:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSelect("/for-moms-mentors")}
                  >
                    Moms & Mentors Hub
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSelect("/shop")}
                  >
                    Teen Grooming Kits
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSelect("/programs")}
                  >
                    Youth Programs
                  </Button>
                </div>
              </div>
            </div>
          </CommandEmpty>

          {results.length > 0 && (
            <>
              {/* Group by category */}
              {["Pages", "Products", "Programs", "Resources"].map(category => {
                const categoryResults = results.filter(r => r.category === category);
                if (categoryResults.length === 0) return null;

                return (
                  <CommandGroup key={category} heading={category}>
                    {categoryResults.map((result) => (
                      <CommandItem
                        key={result.id}
                        value={result.id}
                        onSelect={() => handleSelect(result.url)}
                        className="cursor-pointer"
                      >
                        <div className="flex items-start gap-2 w-full">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={result.isParentRelated ? "font-semibold text-gold" : ""}>
                                {result.title}
                              </span>
                              {result.isParentRelated && (
                                <ParentBadge variant="parent-resource" className="scale-75" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {result.description}
                            </p>
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                );
              })}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};
