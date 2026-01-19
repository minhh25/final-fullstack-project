import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import Status from "../components/Status";
import Table from "../components/Table";
import EditProductModal from "../components/EditProductModal";
import axios from "../api/axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showCreate, setShowCreate] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    discountPrice: "",
    quantity: 100,
    image: "",
    tags: "",
    description: ""
  });

  /* FETCH */
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/admin/products");
      setProducts(Array.isArray(res.data) ? res.data : res.data.products);
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  /* CREATE */
  const createProduct = async () => {
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        discountPrice: form.discountPrice
          ? Number(form.discountPrice)
          : undefined,
        quantity: Number(form.quantity),
        tags: form.tags.split(",").map(t => t.trim())
      };

      const res = await axios.post("/admin/products", payload);
      setProducts(p => [res.data.product, ...p]);
      setShowCreate(false);
      setForm({
        name: "",
        price: "",
        discountPrice: "",
        quantity: 100,
        image: "",
        tags: "",
        description: ""
      });
    } catch (err) {
      console.error(err);
    }
  };

  /* UPDATE */
  const saveProduct = async (data) => {
    const res = await axios.put(`/admin/products/${editing._id}`, data);
    setProducts(p =>
      p.map(x => (x._id === editing._id ? res.data.product : x))
    );
    setEditing(null);
  };

  /* DELETE */
  const deleteProduct = async (id) => {
    if (!confirm("Delete this product?")) return;
    await axios.delete(`/admin/products/${id}`);
    setProducts(p => p.filter(x => x._id !== id));
  };

  /* STOCK TOGGLE */
  const toggleStock = async (product) => {
    const res = await axios.put(`/admin/products/${product._id}`, {
      inStock: !product.inStock
    });

    setProducts(p =>
      p.map(x => (x._id === product._id ? res.data.product : x))
    );
  };

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Product Management</h2>
        <button
          onClick={() => setShowCreate(true)}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          + New Product
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 text-gray-500">Loading products...</div>
          ) : (
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Category</th>
                  <th className="px-6 py-3 text-left">Price</th>
                  <th className="px-6 py-3 text-left">Qty</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {products.map(p => (
                  <tr key={p._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{p.name}</td>
                    <td className="px-6 py-4">{p.tags.join(", ")}</td>
                    <td className="px-6 py-4">${p.price}</td>
                    <td className="px-6 py-4">{p.quantity}</td>

                    {/* INLINE TOGGLE */}
                    <td
                      className="px-6 py-4 cursor-pointer"
                      onClick={() => toggleStock(p)}
                    >
                      <Status status={p.inStock ? "active" : "inactive"} />
                    </td>

                    <td className="px-6 py-4">
                      <Table
                        onEdit={() => setEditing(p)}
                        onDelete={() => deleteProduct(p._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* CREATE MODAL */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Create Product</h3>

            <div className="grid gap-3">
              {["name", "price", "discountPrice", "quantity", "image", "tags"].map(k => (
                <input
                  key={k}
                  className="border p-2 rounded"
                  placeholder={k}
                  value={form[k]}
                  onChange={e => setForm({ ...form, [k]: e.target.value })}
                />
              ))}

              <textarea
                className="border p-2 rounded"
                placeholder="Description"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowCreate(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={createProduct}
                className="px-4 py-2 bg-black text-white rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {editing && (
        <EditProductModal
          product={editing}
          onClose={() => setEditing(null)}
          onSave={saveProduct}
        />
      )}
    </AdminLayout>
  );
}
