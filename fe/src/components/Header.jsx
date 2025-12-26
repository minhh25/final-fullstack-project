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

  /* ===== AUTO CLOSE AFTER 2s ===== */
  useEffect(() => {
    if (openDropdown) {
      timerRef.current = setTimeout(() => {
        setOpenDropdown(null);
      }, 2000);
    }
    return () => clearTimeout(timerRef.current);
  }, [openDropdown]);

  /* ===== CLOSE ON OUTSIDE CLICK ===== */
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
            <FaSearch />
            <FaMapMarkerAlt />
            <FaHeart />
            <FaShoppingCart />
            <FaUser />
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
