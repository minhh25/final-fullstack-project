import {
  FaSearch,
  FaUser,
  FaMapMarkerAlt,
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";


export default function Header() {
  const navigate = useNavigate();
  const items = [
    "deals",
    "food",
    "beverages",
    "household",
    "personal-care",
    "my-orders",
  ];

  const dropdownData = {
    food: [
      "vegetables",
      "fruit",
      "meat-poultry",
      "fish-seafood",
      "bakery",
      "dairy-eggs",
      "pastas-grains",
      "cereals-snacks",
    ],
    beverages: ["tea", "coffee", "soft-drinks", "beer", "wine"],
    household: ["home-kitchen", "cleaning-supplies"],
    "personal-care": ["personal-hygiene", "babies"],
  };

  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const timerRef = useRef(null);
  const { user, logout } = useAuth();

  const [userMenuOpen, setUserMenuOpen] = useState(false);


  const IconWrapper = ({ children }) => (
    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/30 transition">
      {children}
    </div>
  );



  useEffect(() => {
    if (openDropdown) {
      timerRef.current = setTimeout(() => {
        setOpenDropdown(null);
      }, 2000);
    }
    return () => clearTimeout(timerRef.current);
  }, [openDropdown]);


  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navClass = ({ isActive }) =>
    isActive
      ? "text-red-600 font-medium"
      : "text-gray-700 hover:text-red-600 hover:font-medium";

  const formatText = (text) =>
    text
      .split("-")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" ");

  return (
    <>
      {/* ===== TOP BAR ===== */}
      <div className="w-full bg-[#7a0000] text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-1 flex justify-between">
          <div className="flex gap-4">
            <Link to="/about-us">About Us</Link>
            <Link to="/customer-support">Customer Support</Link>
          </div>
          <div>
            Shop on the go, download our app. <u>Details</u>
          </div>
          <div className="w-24" />
        </div>
      </div>

      {/* ===== HEADER ===== */}
      <header className="w-full bg-[#e11414]">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <Link to="/" className="text-3xl font-extrabold text-white">
            Clovers.
          </Link>

          <div className="flex gap-6 text-white text-xl">
            <IconWrapper><FaSearch className="text-sm" /></IconWrapper>
            <IconWrapper><FaMapMarkerAlt className="text-sm" /></IconWrapper>
            <IconWrapper><FaHeart className="text-sm" /></IconWrapper>
            <IconWrapper><FaShoppingCart className="text-sm" onClick={() => navigate("/cart")}/></IconWrapper>

            <div className="relative">
              <div
                className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/30 transition"
                onClick={() => setUserMenuOpen((prev) => !prev)}
              >
                <FaUser className="text-white text-sm" />
              </div>

              {userMenuOpen && (
                <div className="absolute right-0 mt-4 w-48 bg-white text-gray-700 rounded-lg shadow-xl border z-50">
                  {!user ? (
                    <>
                      <Link
                        to="/signin"
                        className="block px-4 py-3 hover:bg-gray-50 font-medium"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/signup"
                        className="block px-4 py-4 hover:bg-gray-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-3 border-b">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">My account</p>
                      </div>

                      <Link
                        to="/account"
                        className="block px-4 py-3 hover:bg-gray-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Account
                      </Link>

                      <button
                        className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-b-lg"
                        onClick={() => {
                          setUserMenuOpen(false);
                          logout();
                          navigate(0);

                  
                        }}
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* ===== NAV ===== */}
      <nav className="bg-white shadow-sm relative">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex gap-14 py-8 justify-center flex-wrap">
            {items.map((item) => {
              const hasDropdown = dropdownData[item];

              return (
                <li
                  key={item}
                  className="relative"
                  onMouseEnter={() =>
                    hasDropdown && setOpenDropdown(item)
                  }
                >
                  <NavLink to={`/${item}`} className={navClass}>
                    {formatText(item)}
                  </NavLink>

                  {hasDropdown && openDropdown === item && (
                    <div
                      ref={dropdownRef}
                      className="absolute top-full left-0 mt-6 w-64 bg-white border shadow-lg z-50"
                    >
                      <ul className="py-4">
                        {dropdownData[item].map((sub) => (
                          <li key={sub}>
                            <NavLink
                              to={`/${item}/${sub}`}
                              className="block px-6 py-2 hover:text-red-600"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {formatText(sub)}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}
