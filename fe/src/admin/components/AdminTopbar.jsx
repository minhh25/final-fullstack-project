import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
//logout button: link to home page


export default function AdminTopbar() {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h1 className="font-semibold">Admin Panel</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {user?.username || "Admin"}
        </span>
        <Link to='/'> <button
          onClick={logout}
          className="text-sm text-red-600 hover:underline"


        >
          Logout
        </button>
        </Link>
      </div>
    </header>
  );
}
