import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function WishListPage() {
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8080/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json(); // { wishlist: [...] populated products }
      setItems(data?.wishlist || []);
    } catch (e) {
      console.error(e);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const removeWishlist = async (productId) => {
    try {
      await fetch("http://localhost:8080//wishlist/toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });
      fetchWishlist();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!user || !token) {
      navigate("/signin");
      return;
    }
    fetchWishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, token]);

  return (
    <>
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-5xl font-bold text-center mb-10">
          Your Wishlist
        </h1>

        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : items.length === 0 ? (
          <div className="text-gray-500 text-center py-16">
            Wishlist is empty.
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-8">
            {items.map((p) => (
              <div key={p._id} className="border p-4 flex flex-col">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-40 object-contain mx-auto"
                />

                <p className="mt-4 text-sm">{p.name}</p>

                <div className="mt-2 text-red-600 font-semibold">
                  ${Number(p.discountPrice ?? p.price).toFixed(2)}
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    className="flex-1 bg-black text-white py-2 rounded-full"
                    onClick={() =>
                      navigate(`/${p.department}/${p.category}/${p._id}`)
                    }
                  >
                    View
                  </button>
                  <button
                    className="px-4 py-2 rounded-full border text-red-600"
                    onClick={() => removeWishlist(p._id)}
                    title="Remove from wishlist"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
