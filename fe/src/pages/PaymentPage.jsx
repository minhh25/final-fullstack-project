import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function PaymentPage() {
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const { cartItems, totals, clearCart } = useCart();

  const [shippingAddress, setShippingAddress] = useState(user?.address || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  const orderItems = useMemo(() => {
    return cartItems.map((it) => ({
      product: it.id,               // id = productId
      name: it.name,
      price: Number(it.discountPrice ?? it.price),
      quantity: it.quantity,
    }));
  }, [cartItems]);

  const placeOrder = async () => {
    if (!token) return navigate("/signin");
    if (cartItems.length === 0) return alert("Cart is empty");
    if (!shippingAddress || !phone) return alert("Please fill address & phone");

    try {
      setLoading(true);
      const res = await fetch("http://localhost:8080/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: orderItems,
          total: totals.totalPrice,
          shippingAddress,
          phone,
          paymentMethod,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Create order failed");

      // clear cart UI (và nếu bạn đã làm clearCart gọi BE thì càng tốt)
      await clearCart();

      navigate("/my-orders");
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-extrabold text-center mb-10">Payment</h1>

        <div className="grid grid-cols-12 gap-8">
          {/* LEFT: form */}
          <div className="col-span-7 bg-white border rounded-3xl p-6">
            <div className="text-lg font-semibold mb-4">Shipping Info</div>

            <label className="block text-sm mb-2">Address</label>
            <input
              className="w-full border rounded-xl px-4 py-3 mb-4"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              placeholder="Your address..."
            />

            <label className="block text-sm mb-2">Phone</label>
            <input
              className="w-full border rounded-xl px-4 py-3 mb-6"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Your phone..."
            />

            <div className="text-lg font-semibold mb-4">Payment Method</div>
            <div className="flex gap-4">
              <button
                className={`px-5 py-3 rounded-xl border ${
                  paymentMethod === "cod" ? "bg-black text-white" : "bg-white"
                }`}
                onClick={() => setPaymentMethod("cod")}
              >
                Cash on delivery
              </button>

              <button
                className={`px-5 py-3 rounded-xl border ${
                  paymentMethod === "bank" ? "bg-black text-white" : "bg-white"
                }`}
                onClick={() => setPaymentMethod("bank")}
              >
                Bank transfer
              </button>
            </div>
          </div>

          {/* RIGHT: summary */}
          <div className="col-span-5 bg-white border rounded-3xl p-6 h-fit">
            <div className="text-lg font-semibold mb-4">Order Summary</div>

            <div className="space-y-3 max-h-[280px] overflow-auto pr-1">
              {cartItems.map((it) => (
                <div key={it.id} className="flex justify-between text-sm">
                  <div className="flex-1 pr-4">
                    <div className="font-medium line-clamp-1">{it.name}</div>
                    <div className="text-gray-500">Quantity: {it.quantity}</div>
                  </div>
                  <div className="font-semibold">
                    ${(Number(it.discountPrice ?? it.price) * it.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t mt-5 pt-4 flex justify-between">
              <div className="text-gray-600">Total</div>
              <div className="text-xl font-extrabold">${totals.totalPrice.toFixed(2)}</div>
            </div>

            <button
              className="mt-5 w-full rounded-2xl bg-black text-white py-3 hover:opacity-90 disabled:opacity-50"
              onClick={placeOrder}
              disabled={loading}
            >
              {loading ? "Processing..." : "Pay / Place Order"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
