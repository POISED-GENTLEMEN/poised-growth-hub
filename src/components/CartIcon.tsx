import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

export const CartIcon = () => {
  const getItemCount = useCartStore(state => state.getItemCount);
  const itemCount = getItemCount();

  return (
    <Link 
      to="/cart" 
      className="relative text-foreground hover:text-primary transition-colors" 
      aria-label="Shopping Cart"
    >
      <ShoppingCart className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
          {itemCount}
        </span>
      )}
    </Link>
  );
};
