import AdminLayout from "../components/AdminLayout";
import Status from "../components/Status";
import { orders } from "../data/orders.mock";

export default function Orders() {
  return (
    <AdminLayout>
      <h2 className="text-2xl font-semibold mb-6">Order Management</h2>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-3 text-left font-medium">ID</th>
                <th className="px-6 py-3 text-left font-medium">Customer</th>
                <th className="px-6 py-3 text-left font-medium">Date</th>
                <th className="px-6 py-3 text-left font-medium">Total</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {orders.map(o => (
                <tr key={o._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{o._id}</td>
                  <td className="px-6 py-4">{o.customer}</td>
                  <td className="px-6 py-4">{o.createdAt}</td>
                  <td className="px-6 py-4">${o.total}</td>
                  <td className="px-6 py-4">
                    <Status status={o.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
