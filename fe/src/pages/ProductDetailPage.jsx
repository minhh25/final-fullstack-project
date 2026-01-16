import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { useCart } from "../context/CartContext.jsx";
import { FaHeart } from "react-icons/fa";

export default function ProductDetailPage() {
  const navigate = useNavigate();
  const { department, category, productId } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  // wishlist state (server)
  const [wishlisted, setWishlisted] = useState(false);
  const [loadingWish, setLoadingWish] = useState(false);

  const hasDiscount = useMemo(() => {
    if (!product) return false;
    return product.discountPrice !== null && product.discountPrice !== undefined;
  }, [product]);

  const displayPrice = useMemo(() => {
    if (!product) return 0;
    return Number(hasDiscount ? product.discountPrice : product.price);
  }, [product, hasDiscount]);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`http://localhost:8080/products/${productId}`);
        const data = await res.json();
        setProduct(data);
      } catch (e) {
        console.error("fetch product detail error:", e);
      }
    };

    const fetchWishlistState = async () => {
      try {
        // API check product in wishlist (server)
        // Nếu bạn chưa làm auth/me thì đổi endpoint theo BE của bạn
        const res = await fetch(`http://localhost:8080/users/me/wishlist/${productId}`, {
          headers: {
            // Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        });
        const data = await res.json(); // { wishlisted: true/false }
        setWishlisted(Boolean(data?.wishlisted));
      } catch (e) {
        // nếu chưa có endpoint thì cứ im lặng
      }
    };

    fetchDetail();
    fetchWishlistState();
  }, [productId]);

  const decQty = () => setQty((q) => Math.max(1, q - 1));
  const incQty = () => setQty((q) => q + 1);

  const onAddToCart = () => {
    if (!product) return;
    addToCart(product, qty);
  };

  const toggleWishlist = async () => {
    if (!product) return;
    if (loadingWish) return;

    try {
      setLoadingWish(true);

      // toggle wishlist (server)
      const res = await fetch(`http://localhost:8080/users/me/wishlist/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await res.json(); // { wishlisted: true/false }
      setWishlisted(Boolean(data?.wishlisted));
    } catch (e) {
      console.error("toggle wishlist error:", e);
    } finally {
      setLoadingWish(false);
    }
  };

  return (
    <>
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-10">
        
        <div className="text-sm text-gray-500 mb-8">
          <button className="hover:underline" onClick={() => navigate("/")}>
            Home
          </button>
          <span> / </span>
          <button
            className="hover:underline  capitalize"
            onClick={() => navigate(`/${department}`)}
          >
            {department?.replaceAll("-", " ")}
          </button>
          <span> / </span>
          <button
            className="hover:underline capitalize"
            onClick={() => navigate(`/${department}/${category}`)}
          >
            {category?.replaceAll("-", " ")}
          </button>
          <span> / </span>
          <span className="text-gray-700">{product?.name || "..."}</span>
        </div>

        {!product ? (
          <div className="text-gray-500">Loading...</div>
        ) : (
          <div className="grid grid-cols-12 gap-10">
            {/* image */}
            <div className="col-span-7">
              <div className="border rounded-sm h-[520px] flex items-center justify-center bg-white">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-[460px] object-contain"
                  />
                ) : (
                  <div className="text-gray-400">No image</div>
                )}
              </div>
            </div>

            {/* info */}
            <div className="col-span-5">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              {product.sku && (
                <div className="text-xs text-gray-500 mb-4">SKU: {product.sku}</div>
              )}

              {/* price */}
              <div className="mb-6">
                {hasDiscount ? (
                  <div className="flex items-baseline gap-3">
                    <span className="text-gray-400 line-through">
                      ${Number(product.price).toFixed(2)}
                    </span>
                    <span className="text-red-600 text-2xl font-bold">
                      ${Number(product.discountPrice).toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <div className="text-red-600 text-2xl font-bold">
                    ${Number(product.price).toFixed(2)}
                  </div>
                )}
              </div>

              {/* quantity */}
              <div className="mb-6">
                <div className="text-sm mb-2">Quantity *</div>
                <div className="inline-flex items-center border h-10">
                  <button className="w-10 h-10 text-xl" onClick={decQty}>
                    –
                  </button>
                  <div className="w-12 text-center">{qty}</div>
                  <button className="w-10 h-10 text-xl" onClick={incQty}>
                    +
                  </button>
                </div>
              </div>

              {/* add to cart + heart */}
              <div className="flex items-center gap-4 mb-10">
                <button
                  className="flex-1 h-12 rounded-full bg-red-600 text-white hover:opacity-90"
                  onClick={onAddToCart}
                >
                  Add to Cart
                </button>

                <button
                  className={`h-12 w-12 rounded-full border flex items-center justify-center ${
                    wishlisted ? "border-red-500" : "border-gray-300"
                  }`}
                  onClick={toggleWishlist}
                  disabled={loadingWish}
                  title="Add to wishlist"
                >
                  <FaHeart className={wishlisted ? "text-red-500" : "text-gray-400"} />
                </button>
              </div>

              {/* product info */}
              <div>
                <div className="flex items-center justify-between border-b pb-2 mb-3">
                  <div className="font-semibold">Product Info</div>
                  <div className="text-gray-500">–</div>
                </div>

                <p className="text-sm text-gray-600 leading-6">
                  {product.description || ""}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
