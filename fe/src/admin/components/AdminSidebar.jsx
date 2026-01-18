import { NavLink } from "react-router-dom";

const links = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/users", label: "User Management" },
  { to: "/admin/products", label: "Product Management" },
  { to: "/admin/orders", label: "Order Management" }
];

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-red-600 text-white">
      <div className="p-6 font-bold text-xl">Clovers.</div>
      <nav className="flex flex-col gap-2 px-4">
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `p-2 rounded ${isActive ? "bg-red-800" : ""}`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
