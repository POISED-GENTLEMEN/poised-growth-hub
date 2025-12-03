import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useCanonical } from "@/hooks/useCanonical";

const ThankYou = () => {
  useCanonical();
  const location = useLocation();
  const { orderNumber, email } = location.state || { orderNumber: 'TPG-00000', email: 'your email' };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <CheckCircle className="w-24 h-24 text-success mx-auto mb-6" />
        <h1 className="text-4xl font-heading font-bold mb-4">Thank You for Your Order!</h1>
        <p className="text-xl text-muted-foreground mb-2">Order #{orderNumber}</p>
        <p className="text-muted-foreground mb-8">
          We've received your order and will contact you within 24 hours at <strong>{email}</strong> to arrange payment and confirm shipping details.
        </p>
        <div className="bg-muted rounded-lg p-6 mb-8">
          <h2 className="font-heading font-bold text-xl mb-4">What's Next?</h2>
          <ul className="text-left space-y-2 text-muted-foreground">
            <li>✓ Check your email for order confirmation</li>
            <li>✓ We'll reach out within 24 hours</li>
            <li>✓ Questions? Contact us at info@thepoisedgentlemen.com</li>
          </ul>
        </div>
        <div className="bg-gold/10 border-2 border-gold rounded-lg p-6 mb-8">
          <h3 className="font-heading font-bold text-lg mb-2">While You Wait...</h3>
          <p className="text-muted-foreground mb-4">Explore our mentorship programs and discover how the Four Pillars can transform your life.</p>
          <Button variant="outline" asChild><Link to="/programs">Explore Programs →</Link></Button>
        </div>
        <div className="flex gap-4 justify-center">
          <Button variant="hero" size="lg" asChild><Link to="/shop">Continue Shopping</Link></Button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;