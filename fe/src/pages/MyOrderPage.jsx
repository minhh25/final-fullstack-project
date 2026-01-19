import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const statusBadge = (s) => {
  const map = {
    pending: "bg-yellow-100 text-yellow-800",
    paid: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return map[s] || "bg-gray-100 text-gray-700";
};

export default function MyOrderPage() {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return navigate("/signin");

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:8080/orders/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Fetch orders failed");
        setOrders(data.orders || []);
      } catch (e) {
        console.error(e);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-5xl font-bold text-center mb-10">My Orders</h1>

        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : orders.length === 0 ? (
          <div className="text-gray-500 text-center py-16">
            You have no orders yet.
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((o) => (
              <div key={o._id} className="bg-white border rounded-3xl shadow-sm overflow-hidden">
                {/* header */}
                <div className="px-6 py-4 border-b flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold">
                      Order #{o._id.slice(-6).toUpperCase()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(o.createdAt).toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm ${statusBadge(o.status)}`}>
                      {o.status}
                    </span>
                    <div className="text-lg font-extrabold">
                      ${Number(o.total).toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* customer + shipping */}
                <div className="px-6 py-5 grid grid-cols-12 gap-6">
                  <div className="col-span-6">
                    <div className="font-semibold mb-2">Customer</div>
                    <div className="text-sm text-gray-700 space-y-1">
                      <div><span className="text-gray-500">Name:</span> {o.user?.username || user?.username}</div>
                      <div><span className="text-gray-500">Email:</span> {o.user?.email || "-"}</div>
                      <div><span className="text-gray-500">Phone:</span> {o.phone}</div>
                    </div>
                  </div>

                  <div className="col-span-6">
                    <div className="font-semibold mb-2">Shipping</div>
                    <div className="text-sm text-gray-700 space-y-1">
                      <div><span className="text-gray-500">Address:</span> {o.shippingAddress}</div>
                      <div><span className="text-gray-500">Payment:</span> {o.paymentMethod}</div>
                    </div>
                  </div>
                </div>

                {/* items */}
                <div className="px-6 pb-6">
                  <div className="font-semibold mb-3">Products</div>

                  <div className="divide-y border rounded-2xl">
                    {o.items.map((it, idx) => (
                      <div key={idx} className="p-4 flex items-center gap-4">
                        <div className="h-14 w-14 rounded-xl border bg-gray-50 overflow-hidden flex items-center justify-center">
                          {it.product?.image ? (
                            <img src={it.product.image} alt={it.name} className="h-full w-full object-cover" />
                          ) : (
                            <span className="text-xs text-gray-400">No img</span>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="font-medium">{it.name}</div>
                          <div className="text-sm text-gray-500">
                            ${Number(it.price).toFixed(2)} × {it.quantity}
                          </div>
                        </div>

                        <div className="font-bold">
                          ${(Number(it.price) * it.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
