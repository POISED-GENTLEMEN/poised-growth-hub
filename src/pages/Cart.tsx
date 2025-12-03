import { Link, useNavigate } from "react-router-dom";
import { useShop } from "@/contexts/ShopContext";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import { useCanonical } from "@/hooks/useCanonical";

const Cart = () => {
  useCanonical();
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, getShippingCost, getFinalTotal, appliedDiscount, applyDiscount, removeDiscount, getDiscountAmount } = useShop();
  const [discountCode, setDiscountCode] = useState("");
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [discountError, setDiscountError] = useState("");
  const navigate = useNavigate();

  const handleApplyDiscount = () => {
    const result = applyDiscount(discountCode);
    if (!result.success) {
      setDiscountError(result.message);
    } else {
      setDiscountError("");
      setDiscountCode("");
    }
  };

  const subtotal = getCartTotal();
  const shipping = getShippingCost();
  const discount = getDiscountAmount();
  const total = getFinalTotal();
  const freeShippingThreshold = 50;
  const amountUntilFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <ShoppingBag className="w-24 h-24 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-heading font-bold text-foreground mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">Start building your grooming routine with the Four Pillars.</p>
        <Button variant="hero" size="lg" asChild>
          <Link to="/shop">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-heading font-bold text-foreground mb-2">Shopping Cart</h1>
        <p className="text-muted-foreground mb-8">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="bg-card border border-border rounded-lg p-6 flex gap-4">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-lg">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.ageRange}</p>
                  <p className="text-gold font-bold mt-2">${item.price}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-muted">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-muted">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-heading font-bold mb-6">Order Summary</h2>
              
              {subtotal < freeShippingThreshold && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800 mb-2">
                    Add <strong className="text-gold">${amountUntilFreeShipping.toFixed(2)}</strong> more for free shipping!
                  </p>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div className="bg-gold h-2 rounded-full transition-all" style={{ width: `${freeShippingProgress}%` }} />
                  </div>
                </div>
              )}

              {subtotal >= freeShippingThreshold && (
                <div className="mb-6 p-4 bg-green-50 border border-success rounded-lg flex items-center gap-2">
                  <Check className="w-5 h-5 text-success" />
                  <p className="text-success font-medium">You've qualified for free shipping!</p>
                </div>
              )}

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount</span>
                    <span className="font-semibold">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-3 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-gold">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-4">
                <button onClick={() => setShowDiscountInput(!showDiscountInput)} className="text-gold text-sm hover:underline">
                  Have a discount code?
                </button>
                {showDiscountInput && (
                  <div className="mt-3">
                    {!appliedDiscount ? (
                      <div className="flex gap-2">
                        <input type="text" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} placeholder="Enter code" className="flex-1 border rounded px-3 py-2 text-sm" />
                        <Button size="sm" onClick={handleApplyDiscount}>Apply</Button>
                      </div>
                    ) : (
                      <div className="bg-green-50 border border-success rounded p-3 flex items-center justify-between">
                        <span className="text-success text-sm font-medium">✓ {appliedDiscount.description}</span>
                        <button onClick={removeDiscount} className="text-destructive text-sm hover:underline">Remove</button>
                      </div>
                    )}
                    {discountError && <p className="text-destructive text-sm mt-2">{discountError}</p>}
                  </div>
                )}
              </div>

              <div className="w-full">
                <Button variant="hero" size="lg" className="w-full whitespace-nowrap text-center mb-4" onClick={() => navigate('/checkout')}>
                  Proceed to Checkout
                </Button>
              </div>
              <Link to="/shop" className="block text-center text-gold hover:underline text-sm">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;