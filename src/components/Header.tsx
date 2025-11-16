import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X, Heart, Gift, FileText, GraduationCap, HelpCircle, ChevronDown, Users } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useCartStore } from "@/stores/cartStore";
import ParentBadge from "./ParentBadge";
import { SiteSearch } from "./SiteSearch";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopMenuOpen, setShopMenuOpen] = useState(false);
  const getItemCount = useCartStore(state => state.getItemCount);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-heading font-bold text-primary">
            The Poised Gentlemen
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <NavigationMenu delayDuration={200}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground hover:text-primary transition-colors font-body font-medium bg-transparent h-auto p-0 hover:bg-transparent data-[state=open]:bg-transparent">
                    Programs
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="w-[320px]">
                    <div className="p-6 border-t-2 border-gold">
                      <div className="space-y-4">
                        <Link 
                          to="/programs#pyg"
                          className="group block p-3 rounded-lg hover:border-l-4 hover:border-gold hover:pl-[11px] transition-all"
                        >
                          <div className="flex items-start gap-3">
                            <GraduationCap className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-medium text-foreground group-hover:text-gold transition-colors">
                                Poised Young Gentlemen (Ages 10-14)
                              </div>
                              <div className="text-sm text-muted-foreground mt-0.5">
                                Ages 10-14 • Character development program
                              </div>
                            </div>
                          </div>
                        </Link>

                        <Link 
                          to="/programs/mentor-training"
                          className="group block p-3 rounded-lg hover:border-l-4 hover:border-gold hover:pl-[11px] transition-all"
                        >
                          <div className="flex items-start gap-3">
                            <Heart className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <div className="font-medium text-foreground group-hover:text-gold transition-colors">
                                  Mentor Training
                                </div>
                                <span className="px-2 py-0.5 bg-gold text-white text-[10px] font-bold rounded-full uppercase tracking-wide">
                                  NEW
                                </span>
                              </div>
                              <div className="text-sm text-muted-foreground mt-0.5">
                                For parents & mentors • Online course
                              </div>
                            </div>
                          </div>
                        </Link>

                        <Link 
                          to="/programs/partners"
                          className="group block p-3 rounded-lg hover:border-l-4 hover:border-gold hover:pl-[11px] transition-all"
                        >
                          <div className="flex items-start gap-3">
                            <Users className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-medium text-foreground group-hover:text-gold transition-colors">
                                For Organizations
                              </div>
                              <div className="text-sm text-muted-foreground mt-0.5">
                                Bulk enrollment & partnerships
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <NavigationMenu delayDuration={200}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground hover:text-primary transition-colors font-body font-medium bg-transparent h-auto p-0 hover:bg-transparent data-[state=open]:bg-transparent">
                    <span className="flex items-center gap-2">
                      Moms & Mentors
                      <ParentBadge variant="new" className="ml-1" />
                    </span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="w-[300px]">
                    <div className="p-6 border-t-2 border-gold">
                      <div className="space-y-4">
                        <Link 
                          to="/for-moms-mentors#starter-kits"
                          className="group block p-3 rounded-lg hover:border-l-4 hover:border-gold hover:pl-[11px] transition-all"
                        >
                          <div className="flex items-start gap-3">
                            <Gift className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-medium text-foreground group-hover:text-gold transition-colors">
                                Teen Starter Kits
                              </div>
                              <div className="text-sm text-muted-foreground mt-0.5">
                                Age-appropriate grooming collections
                              </div>
                            </div>
                          </div>
                        </Link>

                        <Link 
                          to="/for-moms-mentors#first-shave"
                          className="group block p-3 rounded-lg hover:border-l-4 hover:border-gold hover:pl-[11px] transition-all"
                        >
                          <div className="flex items-start gap-3">
                            <FileText className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-medium text-foreground group-hover:text-gold transition-colors">
                                First Shave Guide
                              </div>
                              <div className="text-sm text-muted-foreground mt-0.5">
                                Free downloadable PDF guide
                              </div>
                            </div>
                          </div>
                        </Link>

                        <Link 
                          to="/for-moms-mentors#programs"
                          className="group block p-3 rounded-lg hover:border-l-4 hover:border-gold hover:pl-[11px] transition-all"
                        >
                          <div className="flex items-start gap-3">
                            <GraduationCap className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-medium text-foreground group-hover:text-gold transition-colors">
                                Youth Programs (PYG)
                              </div>
                              <div className="text-sm text-muted-foreground mt-0.5">
                                8-week character development
                              </div>
                            </div>
                          </div>
                        </Link>

                        <Link 
                          to="/for-moms-mentors#resources"
                          className="group block p-3 rounded-lg hover:border-l-4 hover:border-gold hover:pl-[11px] transition-all"
                        >
                          <div className="flex items-start gap-3">
                            <HelpCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-medium text-foreground group-hover:text-gold transition-colors">
                                Parent Resources & FAQs
                              </div>
                              <div className="text-sm text-muted-foreground mt-0.5">
                                Guides and conversation starters
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>

                      <div className="mt-6 pt-4 border-t border-border">
                        <Link 
                          to="/for-moms-mentors"
                          className="group flex items-center gap-1 text-sm font-bold text-gold hover:gap-2 transition-all"
                        >
                          View All Parent Resources 
                          <ChevronDown className="w-4 h-4 -rotate-90" />
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground hover:text-primary transition-colors font-body font-medium bg-transparent h-auto p-0 hover:bg-transparent data-[state=open]:bg-transparent">
                    Shop
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="w-[280px]">
                    <div className="p-5 border-t-2 border-gold">
                      <div className="space-y-3">
                        <Link 
                          to="/shop"
                          className="group block p-3 rounded-lg hover:border-l-4 hover:border-gold hover:pl-[11px] transition-all"
                        >
                          <div className="flex items-start gap-3">
                            <Menu className="w-[18px] h-[18px] text-gold mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-medium text-foreground group-hover:text-gold transition-colors">
                                All Products
                              </div>
                              <div className="text-sm text-muted-foreground mt-0.5">
                                Browse complete catalog
                              </div>
                            </div>
                          </div>
                        </Link>

                        <Link 
                          to="/shop#essence-collection"
                          className="group block p-3 rounded-lg hover:border-l-4 hover:border-gold hover:pl-[11px] transition-all"
                        >
                          <div className="flex items-start gap-3">
                            <Heart className="w-[18px] h-[18px] text-gold mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <div className="font-medium text-foreground group-hover:text-gold transition-colors">
                                  Essence Collection
                                </div>
                                <span className="px-2 py-0.5 bg-gold/10 text-gold text-xs font-semibold rounded-full">
                                  Bestseller
                                </span>
                              </div>
                              <div className="text-sm text-muted-foreground mt-0.5">
                                12 signature cologne balms
                              </div>
                            </div>
                          </div>
                        </Link>

                        <Link 
                          to="/shop#generations-collection"
                          className="group block p-3 rounded-lg hover:border-l-4 hover:border-gold hover:pl-[11px] transition-all"
                        >
                          <div className="flex items-start gap-3">
                            <Gift className="w-[18px] h-[18px] text-gold mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-medium text-foreground group-hover:text-gold transition-colors">
                                Generations Collection
                              </div>
                              <div className="text-sm text-muted-foreground mt-0.5">
                                Heritage grooming essentials
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>

                      <div className="mt-4 pt-4 border-t border-border">
                        <Link 
                          to="/shop#scent-quiz"
                          className="group flex items-center justify-between p-3 rounded-lg bg-gold/5 hover:bg-gold/10 transition-all"
                        >
                          <span className="text-sm font-bold text-gold">
                            Take Scent Quiz
                          </span>
                          <ChevronDown className="w-4 h-4 text-gold -rotate-90 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors font-body font-medium">
              About
            </Link>
            <Link to="/codex" className="text-foreground hover:text-primary transition-colors font-body font-medium">
              The Codex
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors font-body font-medium">
              Contact
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            <SiteSearch />
            <Link to="/cart" className="relative text-foreground hover:text-primary transition-colors" aria-label="Shopping Cart">
              <ShoppingCart className="w-6 h-6" />
              {getItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-gold-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                  {getItemCount()}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center gap-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <SiteSearch />
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-border pt-4">
            <div className="space-y-2">
              <button
                className="w-full text-left text-foreground hover:text-primary transition-colors font-body font-medium flex items-center justify-between"
                onClick={() => setShopMenuOpen(!shopMenuOpen)}
              >
                Programs
                <ChevronDown className={`w-4 h-4 transition-transform ${shopMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {shopMenuOpen && (
                <div className="pl-4 space-y-2 border-l-2 border-gold/20">
                  <Link
                    to="/programs#pyg"
                    className="group flex items-start gap-2 text-sm text-foreground hover:text-gold transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <GraduationCap className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Poised Young Gentlemen (Ages 10-14)</div>
                    </div>
                  </Link>
                  
                  <Link
                    to="/programs/mentor-training"
                    className="group flex items-start gap-2 text-sm text-foreground hover:text-gold transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Heart className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        Mentor Training
                        <span className="px-1.5 py-0.5 bg-gold text-white text-[10px] font-bold rounded-full uppercase tracking-wide">
                          NEW
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">For parents & mentors</div>
                    </div>
                  </Link>
                  
                  <Link
                    to="/programs/partners"
                    className="group flex items-start gap-2 text-sm text-foreground hover:text-gold transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Users className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">For Organizations</div>
                      <div className="text-xs text-muted-foreground">Bulk enrollment</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
            <Link
              to="/for-moms-mentors"
              className="text-foreground hover:text-primary transition-colors font-body font-medium flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Resources for Moms and Mentors"
            >
              <Heart className="w-5 h-5 text-gold" />
              Moms & Mentors
            </Link>
            
            <div className="space-y-2">
              <button
                className="w-full text-left text-foreground hover:text-primary transition-colors font-body font-medium flex items-center justify-between"
                onClick={() => setShopMenuOpen(prev => !prev)}
              >
                Shop
                <ChevronDown className={`w-4 h-4 transition-transform ${shopMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {shopMenuOpen && (
                <div className="pl-4 space-y-2 border-l-2 border-gold/20">
                  <Link
                    to="/shop"
                    className="group flex items-start gap-2 text-sm text-foreground hover:text-gold transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Menu className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">All Products</div>
                      <div className="text-xs text-muted-foreground">Browse complete catalog</div>
                    </div>
                  </Link>
                  
                  <Link
                    to="/shop#essence-collection"
                    className="group flex items-start gap-2 text-sm text-foreground hover:text-gold transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Heart className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        Essence Collection
                        <span className="px-1.5 py-0.5 bg-gold/10 text-gold text-[10px] font-semibold rounded-full">
                          Bestseller
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">12 signature cologne balms</div>
                    </div>
                  </Link>
                  
                  <Link
                    to="/shop#generations-collection"
                    className="group flex items-start gap-2 text-sm text-foreground hover:text-gold transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Gift className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Generations Collection</div>
                      <div className="text-xs text-muted-foreground">Heritage grooming essentials</div>
                    </div>
                  </Link>
                  
                  <Link
                    to="/shop#scent-quiz"
                    className="flex items-center justify-between p-2 rounded-lg bg-gold/5 hover:bg-gold/10 transition-all mt-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="text-sm font-bold text-gold">Take Scent Quiz</span>
                    <ChevronDown className="w-4 h-4 text-gold -rotate-90" />
                  </Link>
                </div>
              )}
            </div>
            <Link
              to="/about"
              className="text-foreground hover:text-primary transition-colors font-body font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/codex"
              className="text-foreground hover:text-primary transition-colors font-body font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              The Codex
            </Link>
            <Link
              to="/contact"
              className="text-foreground hover:text-primary transition-colors font-body font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex items-center gap-4 pt-2">
              <Link to="/cart" className="relative text-foreground hover:text-primary transition-colors" aria-label="Shopping Cart">
                <ShoppingCart className="w-6 h-6" />
                {getItemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-gold-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {getItemCount()}
                  </span>
                )}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
