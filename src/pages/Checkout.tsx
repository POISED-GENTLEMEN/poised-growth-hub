import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "@/contexts/ShopContext";
import { Button } from "@/components/ui/button";

const Checkout = () => {
  const { cartItems, getCartTotal, getShippingCost, getFinalTotal, getDiscountAmount, clearCart } = useShop();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: "", phone: "", firstName: "", lastName: "", address: "", address2: "", city: "", state: "", zip: "", country: "United States"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const orderNumber = `TPG-${Math.floor(10000 + Math.random() * 90000)}`;
    clearCart();
    navigate('/thank-you', { state: { orderNumber, email: formData.email } });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-heading font-bold mb-8">Checkout</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-xl font-heading font-bold mb-4">Contact Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <input required type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="border rounded px-4 py-2" />
                <input type="tel" placeholder="Phone (optional)" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="border rounded px-4 py-2" />
              </div>
            </div>
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-xl font-heading font-bold mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input required placeholder="First Name" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="border rounded px-4 py-2" />
                  <input required placeholder="Last Name" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="border rounded px-4 py-2" />
                </div>
                <input required placeholder="Address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="border rounded px-4 py-2 w-full" />
                <input placeholder="Apartment, suite, etc. (optional)" value={formData.address2} onChange={(e) => setFormData({...formData, address2: e.target.value})} className="border rounded px-4 py-2 w-full" />
                <div className="grid md:grid-cols-3 gap-4">
                  <input required placeholder="City" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="border rounded px-4 py-2" />
                  <input required placeholder="State" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} className="border rounded px-4 py-2" />
                  <input required placeholder="ZIP" value={formData.zip} onChange={(e) => setFormData({...formData, zip: e.target.value})} className="border rounded px-4 py-2" />
                </div>
              </div>
            </div>
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-xl font-heading font-bold mb-4">Payment</h2>
              <p className="text-muted-foreground mb-4">Payment processing coming soon. We'll contact you to arrange payment after your order is confirmed.</p>
            </div>
            <Button variant="hero" size="lg" className="w-full" type="submit" disabled={isProcessing}>
              {isProcessing ? 'Processing...' : `Place Order — $${getFinalTotal().toFixed(2)}`}
            </Button>
          </form>
          <div className="lg:sticky lg:top-24 h-fit bg-card border rounded-lg p-6">
            <h2 className="text-xl font-heading font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-3 space-y-2">
              <div className="flex justify-between"><span>Subtotal</span><span>${getCartTotal().toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{getShippingCost() === 0 ? 'FREE' : `$${getShippingCost().toFixed(2)}`}</span></div>
              {getDiscountAmount() > 0 && <div className="flex justify-between text-success"><span>Discount</span><span>-${getDiscountAmount().toFixed(2)}</span></div>}
              <div className="border-t pt-2 flex justify-between text-xl font-bold"><span>Total</span><span className="text-gold">${getFinalTotal().toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;