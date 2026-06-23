import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail, ArrowRight, Download } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCanonical } from "@/hooks/useCanonical";
import onePagerAsset from "@/assets/schools-one-pager.pdf.asset.json";

const SchoolsOnePagerThankYou = () => {
  useCanonical("/schools/one-pager/thank-you/");

  useEffect(() => {
    document.title = "Thank You | Poised Gentlemen One-Pager";
    const meta = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (meta) meta.setAttribute("content", "noindex");

    // GA4 conversion event
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    if (typeof w.gtag === "function") {
      w.gtag("event", "conversion", {
        event_category: "schools",
        event_label: "one_pager_request",
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-20 bg-background">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/10 mb-6">
            <CheckCircle className="h-12 w-12 text-secondary" />
          </div>

          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            You're one step closer to building stronger young men.
          </h1>

          <p className="text-lg text-muted-foreground mb-8 flex items-center justify-center gap-2">
            <Mail className="h-5 w-5" />
            Check your inbox — your one-pager is on its way.
          </p>

          <div className="bg-muted/30 rounded-lg p-8 text-left mb-8">
            <p className="font-heading font-semibold text-lg mb-4">
              In the meantime, here's what most school partners ask us next:
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="outline" className="flex-1">
                <Link to="/schools/#faq">
                  Read the FAQ
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Link to="/contact/">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Need to reach us directly? Email{" "}
            <a href="mailto:david@risetopurpose.org" className="text-primary underline">
              david@risetopurpose.org
            </a>{" "}
            or call <a href="tel:5044849037" className="text-primary underline">504-484-9037</a>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SchoolsOnePagerThankYou;
