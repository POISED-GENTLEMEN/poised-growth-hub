import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <Link to="/shop" className="text-foreground hover:text-primary transition-colors font-body font-medium">
              Shop
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors font-body font-medium">
              About
            </Link>
            <Link to="/resources" className="text-foreground hover:text-primary transition-colors font-body font-medium">
              Resources
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors font-body font-medium">
              Contact
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-foreground hover:text-primary transition-colors" aria-label="Shopping Cart">
              <ShoppingCart className="w-6 h-6" />
            </button>
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
              to="/resources"
              className="text-foreground hover:text-primary transition-colors font-body font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Resources
            </Link>
            <Link
              to="/contact"
              className="text-foreground hover:text-primary transition-colors font-body font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex items-center gap-4 pt-2">
              <button className="text-foreground hover:text-primary transition-colors" aria-label="Shopping Cart">
                <ShoppingCart className="w-6 h-6" />
              </button>
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
