import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useShop } from "@/contexts/ShopContext";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getCartCount } = useShop();

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
            <Link to="/programs" className="text-foreground hover:text-primary transition-colors font-body font-medium">
              Programs
            </Link>
            <Link to="/for-moms-mentors" className="text-foreground hover:text-primary transition-colors font-body font-medium" aria-label="Resources for Moms and Mentors">
              Moms & Mentors
            </Link>
            <Link to="/shop" className="text-foreground hover:text-primary transition-colors font-body font-medium">
              Shop
            </Link>
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
            <Link to="/cart" className="relative text-foreground hover:text-primary transition-colors" aria-label="Shopping Cart">
              <ShoppingCart className="w-6 h-6" />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-gold-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                  {getCartCount()}
                </span>
              )}
            </Link>
            <Button variant="hero" size="sm">
              Book a Call
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-border pt-4">
            <Link
              to="/programs"
              className="text-foreground hover:text-primary transition-colors font-body font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Programs
            </Link>
            <Link
              to="/for-moms-mentors"
              className="text-foreground hover:text-primary transition-colors font-body font-medium flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Resources for Moms and Mentors"
            >
              <Heart className="w-5 h-5 text-gold" />
              Moms & Mentors
            </Link>
            <Link
              to="/shop"
              className="text-foreground hover:text-primary transition-colors font-body font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
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
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-gold-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {getCartCount()}
                  </span>
                )}
              </Link>
              <Button variant="hero" size="sm" className="flex-1">
                Book a Call
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
