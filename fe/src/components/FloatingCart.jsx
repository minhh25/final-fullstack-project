import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext.jsx";

export default function FloatingCart() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { cartItems, removeFromCart, totals, increaseQuantity, decreaseQuantity } = useCart();


  const previewItems = useMemo(() => cartItems.slice(0, 4), [cartItems]);

  return (
    <div className="fixed bottom-6 right-6 z-[999]">
      
      <div className="relative">
        
        {open && (
          <div className="absolute bottom-full right-0 mb-3 w-[320px] rounded-2xl border bg-white shadow-xl">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="font-semibold">Your Cart</div>
              <button
                className="text-sm text-gray-500 hover:text-gray-800"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>

            <div className="max-h-[240px] overflow-auto px-4 py-3">
              {cartItems.length === 0 ? (
                <div className="text-sm text-gray-500">Cart is empty.</div>
              ) : (
                <div className="space-y-3">
                  {previewItems.map((it) => (
                    <div key={it.id} className="flex gap-3">
                      <div className="h-12 w-12 rounded-lg border bg-gray-50 overflow-hidden flex items-center justify-center">
                        {it.image ? (
                          <img
                            src={it.image}
                            alt={it.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-[10px] text-gray-400">No image</span>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="text-sm font-medium line-clamp-1">{it.name}</div>
                        <div className="mt-2 flex items-center gap-2">
                            <button
                                className="w-9 h-8 border rounded-lg text-lg flex items-center justify-center hover:bg-gray-50"
                                onClick={() => decreaseQuantity(it.id, 1)}
                            >
                                –
                            </button>

                            <div className="min-w-8 text-center">{it.quantity}</div>

                            <button
                                className="w-9 h-8 border rounded-lg text-lg flex items-center justify-center hover:bg-gray-50"
                                onClick={() => increaseQuantity(it.id, 1)}
                            >
                                +
                            </button>
                        </div>
                      </div>

                      <button
                        className="text-xs text-red-500 hover:text-red-700"
                        onClick={() => removeFromCart(it.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  {cartItems.length > 4 && (
                    <div className="text-xs text-gray-500">
                      +{cartItems.length - 4} more items…
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="border-t px-4 py-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Total</span>
                <span className="font-semibold">${totals.totalPrice.toFixed(2)}</span>
              </div>

              <button
                className="mt-3 w-full rounded-xl bg-black py-2 text-white hover:opacity-90 disabled:opacity-50"
                disabled={cartItems.length === 0}
                onClick={() => navigate("/cart")}
              >
                Go to Cart
              </button>
            </div>
          </div>
        )}

        {/* Button: luôn đứng yên */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="relative h-14 w-14 rounded-full bg-black text-white shadow-lg flex items-center justify-center hover:opacity-90"
          aria-label="Open cart"
        >
          <FaShoppingCart className="text-lg" />

          {totals.totalItems > 0 && (
            <span className="absolute -top-2 -right-2 min-w-6 h-6 px-1 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {totals.totalItems}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
