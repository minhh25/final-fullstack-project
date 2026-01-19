import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import Status from "../components/Status";
import Table from "../components/Table";
import axios from "../api/axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [creating, setCreating] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    role: "user",
  });

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/admin/users");
      setUsers(Array.isArray(res.data) ? res.data : res.data.users);
    } catch (err) {
      console.error(err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openCreate = () => {
    setIsEdit(false);
    setForm({
      username: "",
      email: "",
      password: "",
      address: "",
      phone: "",
      role: "user",
    });
    setShowModal(true);
  };

  const openEdit = (u) => {
    setIsEdit(true);
    setCurrentId(u._id);
    setForm({
      username: u.username,
      email: u.email,
      password: "",
      address: u.address,
      phone: u.phone,
      role: u.role,
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);

    try {
      if (isEdit) {
        await axios.put(`/admin/users/${currentId}`, form);
      } else {
        await axios.post("/admin/users", form);
      }
      setShowModal(false);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Action failed");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this user? This action cannot be undone.")) return;

    try {
      await axios.delete(`/admin/users/${id}`);
      fetchUsers();
    } catch (err) {
      
      alert(err.response?.data?.message);
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      await axios.put(`/admin/users/${id}`, { role });
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role } : u))
      );
    } catch (err) {
    
      alert(err.response?.data?.message);
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">User Management</h2>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800"
        >
          + New User
        </button>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 text-gray-500">Loading users...</div>
          ) : (
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Role</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{u.username}</td>
                    <td className="px-6 py-4">{u.email}</td>

                 
                    <td className="px-6 py-4">
                      <select
                        value={u.role}
                        onChange={(e) =>
                          handleRoleChange(u._id, e.target.value)
                        }
                        className="border rounded-md px-2 py-1 text-sm"
                      >
                        <option value="user">User</option>
                        <option value="staff">Staff</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>

                    <td className="px-6 py-4">
                      <Status status={u.role === "admin" ? "active" : "inactive"} />
                    </td>

                    <td className="px-6 py-4">
                      <Table
                        onEdit={() => openEdit(u)}
                        onDelete={() => handleDelete(u._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

    
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg">
            <div className="px-6 py-4 border-b flex justify-between">
              <h3 className="text-lg font-semibold">
                {isEdit ? "Edit User" : "Create User"}
              </h3>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <input name="username" value={form.username} onChange={handleChange} required className="w-full border rounded-lg px-4 py-2 text-sm" placeholder="Username" />
              <input name="email" value={form.email} onChange={handleChange} required className="w-full border rounded-lg px-4 py-2 text-sm" placeholder="Email" />
              <input name="password" type="password" onChange={handleChange} className="w-full border rounded-lg px-4 py-2 text-sm" placeholder={isEdit ? "New password (optional)" : "Password"} />
              <input name="phone" value={form.phone} onChange={handleChange} required className="w-full border rounded-lg px-4 py-2 text-sm" placeholder="Phone" />
              <input name="address" value={form.address} onChange={handleChange} required className="w-full border rounded-lg px-4 py-2 text-sm" placeholder="Address" />

              <select name="role" value={form.role} onChange={handleChange} className="w-full border rounded-lg px-4 py-2 text-sm">
                <option value="user">User</option>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg text-sm">
                  Cancel
                </button>
                <button type="submit" disabled={creating} className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800">
                  {creating ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
