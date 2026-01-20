import AdminLayout from "../components/AdminLayout";
import Status from "../components/Status";
import { useEffect, useState } from "react";
import axios from "../api/axios";

const STATUS_OPTIONS = [
  "pending",
  "paid",
  "shipped",
  "delivered",
  "cancelled"
];

const STATUS_COLOR = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  paid: "bg-blue-100 text-blue-800 border-blue-300",
  shipped: "bg-purple-100 text-purple-800 border-purple-300",
  delivered: "bg-green-100 text-green-800 border-green-300",
  cancelled: "bg-red-100 text-red-800 border-red-300"
};


export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/admin/orders");

      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.orders || [];

      setOrders(data);
    } catch (err) {
      console.error(err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async (orderId, newStatus) => {
  try {
    const res = await axios.put(`/admin/orders/${orderId}`, {
      status: newStatus
    });

    setOrders(prev =>
      prev.map(o =>
        o._id === orderId ? res.data.order : o
      )
    );
  } catch (err) {
    console.error(err);
    alert("Failed to update order status");
  }
};


  return (
    <AdminLayout>
      <h2 className="text-2xl font-semibold mb-6">Order Management</h2>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 text-gray-500">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="p-6 text-gray-500">No orders found</div>
          ) : (
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left">ID</th>
                  <th className="px-6 py-3 text-left">Customer</th>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Total</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {orders.map(o => (
                  <tr key={o._id} className="hover:bg-gray-50">
                    {/* Order ID */}
                    <td className="px-6 py-4 font-medium">
                      {o._id}
                    </td>

                    {/* Customer */}
                    <td className="px-6 py-4">
                      {o.user?.username || "Unknown"}
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </td>

                    {/* Total */}
                    <td className="px-6 py-4">
                      ${o.total}
                    </td>

                    {/* Status dropdown */}
                    <td className="px-6 py-4">
                      <select
                        value={o.status}
                        onChange={e =>
                          updateStatus(o._id, e.target.value)
                        }
                        className={`border rounded-md px-3 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black ${STATUS_COLOR[o.status]}`}
                      >
                        {STATUS_OPTIONS.map(s => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
