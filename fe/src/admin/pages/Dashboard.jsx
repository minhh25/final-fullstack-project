import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import StatCard from "../components/StatCard";
import AdminProtectedRoute from "../components/AdminProtectedRoute";
import axios from "../api/axios";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("/admin/dashboard");
        setStats(res.data.stats);
        setOrders(res.data.recentOrders);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <AdminProtectedRoute>
      <AdminLayout>
        <h2 className="text-2xl font-semibold mb-6">Dashboard Stats</h2>

        {loading ? (
          <div className="text-gray-500">Loading dashboard...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
              <StatCard title="Total Revenue" value={`$${stats.totalRevenue}`} />
              <StatCard title="Total Orders" value={stats.totalOrders} />
              <StatCard title="New Users" value={stats.newUsers} />
              <StatCard title="Pending Orders" value={stats.pendingOrders} />
            </div>

            <div className="bg-white rounded-xl border shadow-sm">
              <div className="px-6 py-4 border-b">
                <h3 className="font-semibold text-lg">Recent Orders</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="px-6 py-3 text-left font-medium">ID</th>
                      <th className="px-6 py-3 text-left font-medium">Customer</th>
                      <th className="px-6 py-3 text-left font-medium">Total</th>
                      <th className="px-6 py-3 text-left font-medium">Status</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {orders.map(o => (
                      <tr key={o._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium">{o._id}</td>
                        <td className="px-6 py-4">
                          {o.user?.username || "Guest"}
                        </td>
                        <td className="px-6 py-4">${o.total}</td>
                        <td className="px-6 py-4 capitalize">{o.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </AdminLayout>
    </AdminProtectedRoute>
  );
}
