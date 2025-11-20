import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
    alert("Thank you for subscribing!");
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/programs" className="hover:text-gold transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link to="/programs#youth" className="hover:text-gold transition-colors">
                  Youth Mentorship
                </Link>
              </li>
              <li>
                <Link to="/programs#adult" className="hover:text-gold transition-colors">
                  Adult Coaching
                </Link>
              </li>
              <li>
                <Link to="/programs/partners" className="hover:text-gold transition-colors">
                  Partner With Us
                </Link>
              </li>
              <li>
                <Link to="/for-moms-mentors" className="hover:text-gold transition-colors">
                  For Moms & Mentors
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-gold transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/codex" className="hover:text-gold transition-colors">
                  The Codex
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shipping" className="hover:text-gold transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-gold transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-gold transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="hover:text-gold transition-colors">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Connect</h3>
            <form onSubmit={handleNewsletterSubmit} className="mb-4">
              <label htmlFor="footer-email" className="text-sm mb-2 block">
                Subscribe to our newsletter
              </label>
              <div className="flex gap-2">
                <Input
                  id="footer-email"
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background text-foreground"
                />
                <Button type="submit" variant="secondary" size="sm">
                  Join
                </Button>
              </div>
            </form>
            <div className="flex gap-4 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:info@thepoisedgentlemen.com" className="hover:text-gold transition-colors">
                  info@thepoisedgentlemen.com
                </a>
              </li>
              <li>
                <a href="tel:+15041234567" className="hover:text-gold transition-colors">
                  (504) 123-4567
                </a>
              </li>
              <li className="pt-2">
                <p>New Orleans, LA</p>
                <p className="text-xs mt-1">Mon-Fri: 9am-6pm CST</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-primary-foreground/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© 2025 RISE TO PURPOSE LLC. All rights reserved.</p>
          <div className="flex gap-6 items-center">
            <span>A B Corp in progress</span>
            <span className="font-heading font-bold text-gold">Stay Poised.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
