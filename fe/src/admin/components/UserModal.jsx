import { useState } from "react";

export default function UserModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "user",
  });

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Create New User</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              name="username"
              placeholder="Username"
              className="border rounded-lg px-3 py-2"
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="border rounded-lg px-3 py-2"
              onChange={handleChange}
              required
            />
          </div>

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-3 py-2"
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="phone"
              placeholder="Phone"
              className="border rounded-lg px-3 py-2"
              onChange={handleChange}
              required
            />
            <select
              name="role"
              className="border rounded-lg px-3 py-2"
              onChange={handleChange}
              value={form.role}
            >
              <option value="user">User</option>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <textarea
            name="address"
            placeholder="Address"
            className="w-full border rounded-lg px-3 py-2 resize-none"
            rows={3}
            onChange={handleChange}
            required
          />

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-black text-white hover:opacity-90"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
