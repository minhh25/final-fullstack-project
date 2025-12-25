import {
  FaSearch,
  FaUser,
  FaMapMarkerAlt,
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const items = [
    "deals",
    "food",
    "beverages",
    "household",
    "personal-care",
    "my-orders",
  ];

  const foodCategories = [
    "Vegetables",
    "Fruit",
    "Meat & Poultry",
    "Fish & Seafood",
    "Bakery",
    "Dairy & Eggs",
    "Pastas & Grains",
    "Cereals & Snacks",
  ];

  const [activeMenu, setActiveMenu] = useState(null);
  const [showFoodDropdown, setShowFoodDropdown] = useState(false);

  const dropdownRef = useRef(null);

  // ✅ close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowFoodDropdown(false);
        setActiveMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuClick = (item) => {
    setActiveMenu(item);
    setShowFoodDropdown(item === "food");
  };

  return (
    <>
      {/* ===== TOP BAR (UNCHANGED) ===== */}
      <div className="w-full bg-[#7a0000] text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-1 flex justify-between items-center">
          <div className="flex gap-4">
            <Link to="/about-us">About Us</Link>
            <Link to="/customer-support">Customer Support</Link>
          </div>
          <div>Shop on the go, download our app. <u>Details</u></div>
          <div className="w-24" />
        </div>
      </div>

      {/* ===== HEADER (UNCHANGED) ===== */}
      <header className="w-full bg-[#e11414]">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link to="/">
            <div className="text-3xl font-extrabold text-white">Clovers.</div>
          </Link>

          <div className="flex items-center gap-6 text-white text-xl">
            <FaSearch />
            <FaMapMarkerAlt />
            <FaHeart />
            <FaShoppingCart />
            <FaUser />
          </div>
        </div>
      </header>

      {/* ===== NAV WITH DROPDOWN ===== */}
      <nav className="bg-white shadow-sm relative">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex gap-14 py-8 justify-center flex-wrap">
            {items.map((item) => (
              <li key={item} className="relative">
                <NavLink
                  to={`/${item}`}
                  onClick={() => handleMenuClick(item)}
                  className={() =>
                    activeMenu === item
                      ? "text-red-600 font-medium"
                      : "text-gray-700 hover:text-red-600 hover:font-medium"
                  }
                >
                  {item
                    .split("-")
                    .map(w => w[0].toUpperCase() + w.slice(1))
                    .join(" ")}
                </NavLink>

                {/* FOOD DROPDOWN */}
                {item === "food" && showFoodDropdown && (
                  <div
                    ref={dropdownRef}
                    className="absolute top-full left-0 mt-6 w-64 bg-white border shadow-lg z-50"
                  >
                    <ul className="py-4">
                      {foodCategories.map((cat) => (
                        <li
                          key={cat}
                          className="px-6 py-2 hover:text-red-600"
                        >
                          <NavLink
                            to={`/food/${cat.toLowerCase().replace(/ & /g, "-")}`}
                          >
                            {cat}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
