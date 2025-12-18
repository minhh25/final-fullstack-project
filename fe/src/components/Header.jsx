import { FaSearch, FaUser, FaMapMarkerAlt, FaHeart, FaShoppingCart } from 'react-icons/fa';
import {Link, NavLink} from "react-router-dom";
import {useState} from "react";

export default function Header() {
   
     const items = [
    "deals",
    "food",
    "beverages",
    "household",
    "personal-care",
  ];


    return (
        <>
            <div className="w-full bg-[#7a0000] text-white text-sm">
                <div className="max-w-7xl mx-auto px-4 py-1 flex justify-between items-center">
                    <div className="flex gap-4">
                        <Link to="/about-us"><span className="hidden sm:inline">About Us</span></Link>
                        <Link to="/customer-support"><span className="hidden md:inline">Customer Support</span></Link>
                    </div>
                    <div className="text-center">Shop on the go, download our app. <u>Details</u></div>
                    <div className="w-24" />
                </div>
            </div>

            <header className="w-full bg-[#e11414]">
                <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/"><div className="text-3xl font-extrabold text-white">Clovers.</div></Link> 


                    {/* Icons row */}
                    <div className="flex items-center gap-6 text-white text-xl">
                        <FaSearch className="cursor-pointer" />
                        <FaMapMarkerAlt className="cursor-pointer" />
                        <FaHeart className="cursor-pointer" />
                        <FaShoppingCart className="cursor-pointer" />
                        <FaUser className="cursor-pointer" />
                    </div>
                </div>
            </header>

          <nav className="bg-white shadow-sm">
  <div className="max-w-7xl mx-auto px-4">
    <ul className="flex gap-14 py-8 justify-center flex-wrap">
      {items.map((item) => (
        <li key={item}>
          <NavLink
            to={`/${item}`}
            end
            className={({ isActive }) =>
              isActive
                ? "text-red-600 font-medium cursor-pointer"
                : "text-gray-700 hover:text-red-600 hover:font-medium cursor-pointer"
            }
          >
            {item
              .split("-")
              .map((w) => w[0].toUpperCase() + w.slice(1))
              .join(" ")}
          </NavLink>
        </li>
      ))}
    </ul>
  </div>
</nav>

        </>
    );
}