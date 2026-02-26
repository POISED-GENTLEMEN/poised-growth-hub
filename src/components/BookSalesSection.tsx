import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Loader2 } from "lucide-react";
import { createShopifyCheckout } from "@/lib/shopify";
import { toast } from "sonner";
import authorPhoto from "@/assets/dr3-headshot.png";
import hardcoverImage from "@/assets/book-hardcover.jpg";
import bookLaunchImage from "@/assets/codex-book-launch.png";

// Shopify variant IDs for The Poised Gentlemen Codex
const PAPERBACK_VARIANT_ID = "gid://shopify/ProductVariant/47414370337026";
const HARDCOVER_VARIANT_ID = "gid://shopify/ProductVariant/47414370369794";

const BookSalesSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [buyingPaperback, setBuyingPaperback] = useState(false);
  const [buyingHardcover, setBuyingHardcover] = useState(false);

  const handleBuy = async (variantId: string, setLoading: (v: boolean) => void) => {
    setLoading(true);
    try {
      const checkoutUrl = await createShopifyCheckout([{ variantId, quantity: 1 }]);
      window.open(checkoutUrl, '_blank');
    } catch (error) {
      toast.error("Unable to start checkout. Please try again.");
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    // Placeholder — swap with real endpoint
    await new Promise((r) => setTimeout(r, 600));
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <section className="bg-primary text-primary-foreground">
      {/* ── 1. HEADLINE BLOCK ── */}
      <div className="py-20 md:py-28 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-gold uppercase tracking-[0.25em] text-xs md:text-sm font-semibold mb-6">
            Now Available — Founding Circle Edition
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-4">
            The Poised Gentlemen Codex
          </h1>
          <p className="text-xl md:text-2xl font-heading italic text-gold mb-6">
            Earn Respect. Build Freedom. Master Yourself.
          </p>
          <p className="text-base md:text-lg text-primary-foreground/70 max-w-2xl mx-auto">
            The blueprint for modern men — written in biblical verse format for
            reflection, memory, and daily practice.
          </p>
        </div>
      </div>

      {/* ── 2. BOOK DISPLAY ── */}
      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl">
          <img
            src={bookLaunchImage}
            alt="The Poised Gentlemen Codex — Book Launch Event"
            className="w-full h-auto block"
          />
        </div>
      </div>

      {/* ── 3. PRE-ORDER OFFER BLOCK ── */}
      <div className="container mx-auto px-4 pb-20 md:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {/* ── Paperback Card ── */}
          <Card className="bg-primary border border-gold/30 text-primary-foreground p-8 flex flex-col order-2 md:order-1">
            <p className="text-sm text-gold uppercase tracking-wider font-semibold mb-2">
              The Codex — Paperback
            </p>
            <p className="text-4xl font-heading font-bold text-gold mb-6">$19.99</p>

            <ul className="space-y-3 mb-8 flex-1">
              {[
                "Paperback delivered by March 7",
                "Immediate digital access upon purchase",
                "Complimentary audiobook bundle included",
                "Founding Circle numbered edition",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-primary-foreground/80">
                  <Check className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => handleBuy(PAPERBACK_VARIANT_ID, setBuyingPaperback)}
              disabled={buyingPaperback}
              className="w-full bg-gold text-gold-foreground hover:bg-gold/90 font-bold rounded-lg"
            >
              {buyingPaperback ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Order Paperback
            </Button>
          </Card>

          {/* ── Hardcover Card (Featured) ── */}
          <Card className="relative bg-primary border-2 border-gold text-primary-foreground p-8 flex flex-col md:scale-105 shadow-xl shadow-gold/10 order-1 md:order-2">
            {/* Banner */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-gold-foreground text-xs font-bold uppercase tracking-wider px-5 py-1.5 rounded-full whitespace-nowrap">
              Founding Circle
            </div>

            <p className="text-sm text-gold uppercase tracking-wider font-semibold mb-2 mt-2">
              The Codex — Hardcover
            </p>
            <p className="text-4xl font-heading font-bold text-gold mb-6">$29.99</p>

            <ul className="space-y-3 mb-8 flex-1">
              {[
                "Hardcover delivered by March 7",
                "Immediate digital access upon purchase",
                "Complimentary audiobook bundle included",
                "Founding Circle numbered edition",
                "Premium binding — built to last a generation",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-primary-foreground/80">
                  <Check className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => handleBuy(HARDCOVER_VARIANT_ID, setBuyingHardcover)}
              disabled={buyingHardcover}
              className="w-full bg-gold text-gold-foreground hover:bg-gold/90 font-bold rounded-lg"
            >
              {buyingHardcover ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Order Hardcover
            </Button>
          </Card>

          {/* ── Email Capture Card ── */}
          <Card className="bg-primary border border-gold/30 text-primary-foreground p-8 flex flex-col order-3">
            <p className="text-sm text-primary-foreground/60 uppercase tracking-wider font-semibold mb-2">
              Not ready to order?
            </p>
            <p className="text-2xl font-heading font-bold text-gold mb-3">
              Stay in the Circle
            </p>
            <p className="text-sm text-primary-foreground/70 mb-6 flex-1">
              Get updates, early access content, and movement announcements from
              DR3 directly.
            </p>

            {submitted ? (
              <p className="text-gold font-heading text-lg font-semibold text-center py-4">
                You're in. Stay Poised.
              </p>
            ) : (
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <Input
                  type="email"
                  required
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-primary-foreground/10 border-gold/40 text-primary-foreground placeholder:text-primary-foreground/40"
                />
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary border-2 border-gold text-gold hover:bg-gold hover:text-gold-foreground font-bold rounded-lg"
                >
                  {submitting ? "Submitting…" : "Count Me In"}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>

      {/* ── 4. SOCIAL PROOF BAR ── */}
      <div className="border-t border-gold/20 py-10">
        <p className="text-center font-heading italic text-gold text-base md:text-lg px-4">
          "50 Founding Circle members. One night. New Orleans. February 26, 2026."
        </p>
      </div>

      {/* ── 5. AUTHOR CREDIBILITY BLOCK ── */}
      <div className="container mx-auto px-4 py-16 md:py-20 text-center max-w-2xl">
        <img
          src={authorPhoto}
          alt="David Rachal III"
          className="w-28 h-28 rounded-full object-cover mx-auto mb-6 border-2 border-gold"
        />
        <p className="font-heading text-xl font-bold text-gold mb-2">
          David Rachal III — CEO[G], The Poised Gentlemen
        </p>
        <p className="text-sm text-primary-foreground/70 leading-relaxed">
          Creator of the nation's first commercially reimbursable medical fitness
          program. Father. Mentor. Author.
        </p>
      </div>

      {/* ── 6. CLOSING CTA ── */}
      <div className="container mx-auto px-4 pb-20 md:pb-28 text-center max-w-3xl">
        <p className="text-2xl md:text-3xl font-heading font-bold mb-6">
          The room feels it before you speak a word.
        </p>

        <div className="w-24 h-px bg-gold mx-auto mb-8" />

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Button
            onClick={() => handleBuy(PAPERBACK_VARIANT_ID, setBuyingPaperback)}
            disabled={buyingPaperback}
            variant="outline"
            size="lg"
            className="border-gold text-gold hover:bg-gold hover:text-gold-foreground font-bold rounded-lg"
          >
            {buyingPaperback ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Order Paperback — $19.99
          </Button>
          <Button
            onClick={() => handleBuy(HARDCOVER_VARIANT_ID, setBuyingHardcover)}
            disabled={buyingHardcover}
            size="lg"
            className="bg-gold text-gold-foreground hover:bg-gold/90 font-bold rounded-lg"
          >
            {buyingHardcover ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Order Hardcover — $29.99
          </Button>
        </div>

        <p className="text-xs text-primary-foreground/50">
          Digital access delivered instantly. Physical copy ships by March 7, 2026.
        </p>
      </div>
    </section>
  );
};

export default BookSalesSection;
