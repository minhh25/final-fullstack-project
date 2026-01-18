import AdminLayout from "../components/AdminLayout";
import Status from "../components/Status";
import Table from "../components/Table";
import { products } from "../data/products.mock";

export default function Products() {
  return (
    <AdminLayout>
      <h2 className="text-2xl font-semibold mb-6">Product Management</h2>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-3 text-left font-medium">Name</th>
                <th className="px-6 py-3 text-left font-medium">Category</th>
                <th className="px-6 py-3 text-left font-medium">Price</th>
                <th className="px-6 py-3 text-left font-medium">Stock</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
                <th className="px-6 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {products.map(p => (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{p.name}</td>
                  <td className="px-6 py-4">{p.tags.join(", ")}</td>
                  <td className="px-6 py-4">${p.price}</td>
                  <td className="px-6 py-4">{p.quantity}</td>
                  <td className="px-6 py-4">
                    <Status status={p.inStock ? "active" : "inactive"} />
                  </td>
                  <td className="px-6 py-4">
                    <Table onEdit={() => {}} onDelete={() => {}} />
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
