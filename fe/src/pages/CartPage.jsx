import { useCart } from "../context/CartContext.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export default function CartPage() {
  const { cartItems, clearCart, removeFromCart, increaseQuantity, decreaseQuantity, totals } =
    useCart();

  return (
    <>
    <Header />
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold text-center mb-10 ">
        Your Cart
      </h1>

      <div className="bg-white rounded-3xl shadow-sm border p-6">
        {cartItems.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            Cart is empty.
          </div>
        ) : (
          <>
            <div className="divide-y">
              {cartItems.map((it) => {
                const hasDiscount =
                  it.discountPrice !== null && it.discountPrice !== undefined;

                const unitPrice = hasDiscount
                  ? Number(it.discountPrice)
                  : Number(it.price);

                const lineTotal = unitPrice * it.quantity;

                return (
                  <div
                    key={it.id}
                    className="py-6 flex items-center gap-6"
                  >
                    {/* image */}
                    <div className="h-20 w-20 rounded-2xl bg-gray-100 border overflow-hidden flex items-center justify-center">
                      {it.image ? (
                        <img
                          src={it.image}
                          alt={it.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-xs text-gray-400">No image</span>
                      )}
                    </div>

                    {/* name */}
                    <div className="flex-1">
                      <div className="text-lg font-medium">{it.name}</div>
                    </div>

                    {/* unit price */}
                    <div className="w-32 text-center">
                      {hasDiscount ? (
                        <div className="flex flex-col items-center">
                          <span className="text-xs text-gray-400 line-through">
                            ${Number(it.price).toFixed(2)}
                          </span>
                          <span className="font-bold">
                            ${unitPrice.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="font-bold">
                          ${unitPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* qty control */}
                    <div className="w-44 flex items-center justify-center gap-4">
                      <button
                        className="w-12 h-10 rounded-lg bg-black text-white text-xl flex items-center justify-center hover:opacity-90"
                        onClick={() => decreaseQuantity(it.id, 1)}
                        aria-label="decrease"
                      >
                        –
                      </button>

                      <span className="min-w-6 text-center font-semibold ">
                        {it.quantity}
                      </span>

                      <button
                        className="w-12 h-10 rounded-lg bg-black text-white text-xl flex items-center justify-center hover:opacity-90"
                        onClick={() => increaseQuantity(it.id, 1)}
                        aria-label="increase"
                      >
                        +
                      </button>
                    </div>

                    {/* line total */}
                    <div className="w-32 text-right font-bold ">
                      ${lineTotal.toFixed(2)}
                    </div>

                    {/* remove */}
                    <button
                      className="w-10 h-10 rounded-full text-red-400 hover:text-red-600 text-2xl flex items-center justify-center"
                      onClick={() => removeFromCart(it.id)}
                      aria-label="remove"
                      title="Remove"
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>

            {/* summary */}
            <div className="mt-10 flex flex-col items-end gap-2">
              <div className="">
                Items: <span className="font-semibold">{totals.totalItems}</span>
              </div>
              <div className="text-2xl font-extrabold ">
                Total: ${totals.totalPrice.toFixed(2)}
              </div>

              <div className="mt-4 flex gap-4">
                <button
                  className="px-6 py-3 rounded-xl bg-red-400 text-white hover:opacity-90"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
                <button
                  className="px-6 py-3 rounded-xl bg-black text-white hover:opacity-90"
                  onClick={() => alert("Checkout later 😄")}
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
    <Footer />
    </>
  );

}
