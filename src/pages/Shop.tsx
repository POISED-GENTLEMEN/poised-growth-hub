import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, ShieldCheck, BadgeCheck, Truck, Lock, ArrowRight, Compass } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCanonical } from "@/hooks/useCanonical";
import { ScentQuiz } from "@/components/ScentQuiz";
import {
  shopifyUrl,
  trackShopClick,
  type ShopPlacement,
} from "@/lib/shopifyLinks";

const TITLE = "Shop | Poised Gentlemen";
const DESC =
  "Shop the Poised Essence Collection and Young-G Collection — grooming built on the principle that how you present yourself is a form of discipline.";

const SHOP_LINKS = {
  essence: shopifyUrl("/collections/essence-collection", "shop_bridge_essence"),
  youngG: shopifyUrl("/collections/young-g-collection", "shop_bridge_young_g"),
  bundles: shopifyUrl("/collections/bundles-subscribe-save", "shop_bridge_bundles"),
};

const setMeta = (selector: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    const m = selector.match(/\[(\w+)="([^"]+)"\]/);
    if (m) el.setAttribute(m[1], m[2]);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
};

interface BridgeCardProps {
  badge: string;
  title: string;
  description: string;
  bullets: string[];
  ctaLabel: string;
  href: string;
  placement: ShopPlacement;
  internalLink?: { to: string; label: string };
  anchorId?: string;
}

const BridgeCard = ({
  badge,
  title,
  description,
  bullets,
  ctaLabel,
  href,
  placement,
  internalLink,
  anchorId,
}: BridgeCardProps) => (
  <Card
    id={anchorId}
    className="flex flex-col h-full p-8 border-2 border-border hover:border-gold/60 transition-colors scroll-mt-24"
  >
    <span className="inline-block self-start text-[11px] uppercase tracking-widest font-semibold text-gold mb-4">
      {badge}
    </span>
    <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-3">{title}</h2>
    <p className="text-muted-foreground mb-5 leading-relaxed">{description}</p>
    <ul className="space-y-2 mb-8">
      {bullets.map((b) => (
        <li key={b} className="flex items-start gap-2 text-sm text-foreground">
          <BadgeCheck className="w-4 h-4 text-gold mt-0.5 shrink-0" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
    <div className="mt-auto space-y-3">
      <Button
        asChild
        size="lg"
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackShopClick(placement, href)}
          data-ga-event="shop_click"
          data-ga-label={placement}
        >
          {ctaLabel}
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </Button>
      {internalLink && (
        <Link
          to={internalLink.to}
          className="block text-center text-sm text-gold hover:underline"
        >
          {internalLink.label} →
        </Link>
      )}
    </div>
  </Card>
);

const TRUST_BADGES = [
  { icon: Lock, label: "Secure Shopify Checkout" },
  { icon: ShieldCheck, label: "Satisfaction Guarantee" },
  { icon: Truck, label: "Ships from the USA" },
  { icon: BadgeCheck, label: "Cruelty-Free • Paraben-Free" },
];

const Shop = () => {
  useCanonical("/shop/");
  const location = useLocation();
  const navigate = useNavigate();
  const [quizOpen, setQuizOpen] = useState(false);

  useEffect(() => {
    document.title = TITLE;
    setMeta('meta[name="description"]', DESC);
    setMeta('meta[property="og:title"]', TITLE);
    setMeta('meta[property="og:description"]', DESC);
    setMeta('meta[property="og:url"]', "https://poisedgentlemen.com/shop/");
  }, []);

  // Auto-open the scent quiz when arriving via #scent-quiz or ?quiz=1.
  useEffect(() => {
    const wantsQuiz =
      location.hash === "#scent-quiz" ||
      new URLSearchParams(location.search).get("quiz") === "1";
    if (wantsQuiz) setQuizOpen(true);
  }, [location.hash, location.search]);

  // Smooth-scroll to #essence-collection or #young-g-collection when used.
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    if (id === "scent-quiz") return; // handled by quiz auto-open
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [location.hash]);

  const handleQuizOpenChange = (open: boolean) => {
    setQuizOpen(open);
    // When closing, strip ?quiz=1 / #scent-quiz so reopens are intentional.
    if (!open) {
      const wantsQuiz =
        location.hash === "#scent-quiz" ||
        new URLSearchParams(location.search).get("quiz") === "1";
      if (wantsQuiz) {
        navigate("/shop/", { replace: true });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero / Intro */}
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <span className="inline-block text-[11px] uppercase tracking-widest font-semibold text-gold mb-4">
            The Shop
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Grooming as Discipline
          </h1>
          <p className="text-lg md:text-xl opacity-90 leading-relaxed">
            Grooming is one of the Four Pillars in practice. How a man presents himself —
            the way he walks into a room, the care he takes with his skin, the scent he
            chooses for the day — is a daily rehearsal of discipline and self-respect.
            Our products are built for that practice: a tool, not a treatment. No medical
            claims, no shortcuts. Just consistent, intentional self-presentation for today's
            men — and the boys raising up behind them.
          </p>
        </div>
      </section>

      {/* External-store notice */}
      <section className="bg-muted/40 border-y border-border py-4">
        <div className="container mx-auto px-4 max-w-4xl text-center text-sm text-muted-foreground">
          Our store is hosted on Shopify. Every purchase below opens our secure Shopify
          storefront in a new tab.
        </div>
      </section>

      {/* Three bridge sections */}
      <section className="py-16 md:py-24 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <BridgeCard
              anchorId="essence-collection"
              badge="Adult — 12 Scents"
              title="The Essence Collection"
              description="Twelve designer-inspired cologne balms. Fragrance and skincare in one — built for the man who treats his routine as a daily standard."
              bullets={[
                "12 signature fragrances",
                "4–6 hours of lasting scent",
                "Hydrating cologne balm format",
              ]}
              ctaLabel="Shop the Essence Collection"
              href={SHOP_LINKS.essence}
              placement="shop_bridge_essence"
              internalLink={{ to: "/essence/", label: "Read the story behind Essence" }}
            />
            <BridgeCard
              anchorId="young-g-collection"
              badge="Boys 10–17"
              title="The Young-G Collection"
              description="Grooming built specifically for boys 10–17 — a structured first routine that turns daily care into a habit of discipline and self-respect."
              bullets={[
                "Age-appropriate formulas",
                "Individual products from $14.99",
                "Starter Kit $79.00",
              ]}
              ctaLabel="Shop the Young-G Collection"
              href={SHOP_LINKS.youngG}
              placement="shop_bridge_young_g"
              internalLink={{
                to: "/codex/teen-grooming-routine/",
                label: "Read: The Teen Grooming Routine",
              }}
            />
            <BridgeCard
              badge="Save"
              title="Bundles + Subscribe & Save"
              description="Curated bundles and a subscribe-and-save option for the gentleman who has already chosen consistency — and wants to make it the default."
              bullets={[
                "Curated multi-product bundles",
                "Subscribe & save on essentials",
                "Auto-ship on your schedule",
              ]}
              ctaLabel="Shop Bundles + Subscribe & Save"
              href={SHOP_LINKS.bundles}
              placement="shop_bridge_bundles"
              internalLink={{
                to: "/codex/how-to-build-discipline/",
                label: "Read: How to Build Discipline",
              }}
            />
          </div>
        </div>
      </section>

      {/* Young-G individual products */}
      <section id="young-g-products" className="py-16 md:py-20 px-4 bg-muted/30 scroll-mt-24">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <span className="inline-block text-[11px] uppercase tracking-widest font-semibold text-gold mb-3">
              Young-G — Shop Individual Products
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-3">
              Built for boys 10–17
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Age-appropriate fragrance and skincare. Each product opens directly on our secure Shopify storefront.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Let's Geaux", family: "Youth Cologne Balm", notes: "Fresh citrus — a Louisiana nod, ready to move.", color: "#D97E3A", handle: "lets-geaux" },
              { name: "Champion's Crest", family: "Youth Cologne Balm", notes: "Victory-fueled freshness — aquatic, clean.", color: "#1E90FF", handle: "champions-crest" },
              { name: "Legacy Drive", family: "Youth Cologne Balm", notes: "Clean ambition — bright, focused, forward.", color: "#CFB040", handle: "legacy-drive" },
              { name: "Common Ground", family: "Unisex Youth Cologne Balm", notes: "Shared freshness — light, easy, every day.", color: "#7ED957", handle: "common-ground" },
            ].map((p) => {
              const productUrl = shopifyUrl(`/products/${p.handle}`, "young_g_product_card");
              return (
                <Card key={p.handle} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                  <div className="h-2" style={{ backgroundColor: p.color }} aria-hidden />
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                      {p.family}
                    </p>
                    <h3 className="font-heading font-bold text-xl mb-2">{p.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                      {p.notes}
                    </p>
                    <Button
                      asChild
                      size="sm"
                      className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    >
                      <a
                        href={productUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackShopClick("young_g_product_card", productUrl)}
                        aria-label={`Shop ${p.name} on Shopify`}
                      >
                        Shop {p.name}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <a
                href={SHOP_LINKS.youngG}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackShopClick("shop_bridge_young_g", SHOP_LINKS.youngG)}
              >
                Browse the full Young-G Collection
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Scent Quiz launcher (re-homed from /shop/essence-collection) */}
      <section
        id="scent-quiz"
        className="py-20 bg-primary text-primary-foreground scroll-mt-24"
      >
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Compass className="h-10 w-10 mx-auto mb-5 text-gold" />
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Find Your Signature Scent
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Six questions. Two minutes. We'll match you to the scents in the
            Essence Collection built for your lifestyle, your standard, and the
            rooms you walk into.
          </p>
          <Button
            size="lg"
            onClick={() => setQuizOpen(true)}
            className="bg-gold text-primary hover:bg-gold/90"
          >
            Take the Scent Quiz
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-12 bg-[#F9F7F4] border-y border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <Icon className="w-7 h-7 text-gold" aria-hidden="true" />
                <p className="text-sm font-medium text-primary">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
            Self-presentation is a practice. Start it deliberately.
          </h2>
          <p className="opacity-90 mb-8">
            Pick the collection that fits the man — or the young man — in front of you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              <a
                href={SHOP_LINKS.essence}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackShopClick("shop_bridge_essence", SHOP_LINKS.essence)}
              >
                Essence Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <a
                href={SHOP_LINKS.youngG}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackShopClick("shop_bridge_young_g", SHOP_LINKS.youngG)}
              >
                Young-G Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <ScentQuiz open={quizOpen} onOpenChange={handleQuizOpenChange} />

      <Footer />
    </div>
  );
};

export default Shop;
