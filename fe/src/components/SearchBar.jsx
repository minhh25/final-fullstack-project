// src/components/SearchBar.jsx
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  const navigate = useNavigate();
  const wrapRef = useRef(null);

  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [openList, setOpenList] = useState(false);
  const [loading, setLoading] = useState(false);

  // click outside -> close list
  useEffect(() => {
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpenList(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  // search
  useEffect(() => {
    const q = keyword.trim();
    if (!q) {
      setResults([]);
      setLoading(false);
      return;
    }

    setOpenList(true);

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:8080/products/search?search=${encodeURIComponent(q)}`
        );
        const data = await res.json();
        setResults(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("search error:", e);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [keyword]);

  return (
    <div ref={wrapRef} className="relative w-full max-w-[520px]">
      {/* INPUT nằm luôn trên nền đỏ */}
      <div className="h-10 w-full bg-white rounded-full px-4 flex items-center justify-between border border-black/10 shadow-sm">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={() => keyword.trim() && setOpenList(true)}
          placeholder="Search..."
          className="flex-1 bg-transparent outline-none text-sm pr-3"
        />

        {/* Icon kính lúp nằm bên phải, đúng như hình */}
        <FaSearch className="text-gray-400" />
      </div>

      {/* RESULTS DROPDOWN */}
      {openList && keyword.trim() && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-2xl border shadow-xl overflow-hidden z-[999]">
          <div className="max-h-[320px] overflow-auto">
            {loading && (
              <div className="px-4 py-3 text-sm text-gray-500">
                Searching…
              </div>
            )}

            {!loading && results.length === 0 && (
              <div className="px-4 py-3 text-sm text-gray-500">
                No products found
              </div>
            )}

            {!loading &&
              results.map((p) => (
                <button
                  key={p._id}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 flex gap-3"
                  onClick={() => {
                    navigate(`/${p.department}/${p.category}/${p._id}`);
                    setOpenList(false);
                    setKeyword("");
                  }}
                >
                  <div className="h-10 w-10 rounded-lg border bg-gray-50 overflow-hidden flex items-center justify-center">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-[10px] text-gray-400">No img</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="text-sm font-medium line-clamp-1">
                      {p.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      ${Number(p.discountPrice ?? p.price).toFixed(2)}
                    </div>
                  </div>
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
