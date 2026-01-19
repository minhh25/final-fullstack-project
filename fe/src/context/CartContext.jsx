// fe/src/context/CartContext.jsx
import React, { createContext, useContext, useMemo, useEffect, useState, useCallback } from "react";
import { useAuth } from "./AuthContext.jsx";

const CartContext = createContext(null);
const API = "http://localhost:8080";

const authHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

const normalizeCart = (cartFromBe = []) => {
  // BE item: { product, quantity, name, price, discountPrice, image }
  // FE muốn: { id, quantity, ... }
  return cartFromBe.map((it) => ({
    id: String(it.product),
    product: String(it.product),
    name: it.name,
    price: it.price,
    discountPrice: it.discountPrice ?? null,
    image: it.image || "",
    quantity: it.quantity,
  }));
};

export function CartProvider({ children }) {
  const { token, user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // Load cart theo user khi có token
  useEffect(() => {
    if (!token) {
      setCartItems([]); // logout => clear UI
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await fetch(`${API}/cart`, { headers: authHeaders(token) });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Fetch cart failed");
        setCartItems(normalizeCart(data.cart));
      } catch (e) {
        console.error(e);
        setCartItems([]);
      }
    };

    fetchCart();
  }, [token, user?.id]);

  const addToCart = useCallback(
    async (product, qty = 1) => {
      if (!token) {
        alert("Bạn cần đăng nhập để dùng cart.");
        return;
      }

      const productId = product._id ?? product.id;
      if (!productId) return;

      const res = await fetch(`${API}/cart/add`, {
        method: "POST",
        headers: authHeaders(token),
        body: JSON.stringify({ productId, qty }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Add to cart failed");

      setCartItems(normalizeCart(data.cart));
    },
    [token]
  );

  const updateQuantity = useCallback(
    async (productId, nextQty) => {
      if (!token) return;

      const res = await fetch(`${API}/cart/update`, {
        method: "PATCH",
        headers: authHeaders(token),
        body: JSON.stringify({ productId, qty: nextQty }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update qty failed");

      setCartItems(normalizeCart(data.cart));
    },
    [token]
  );

  const increaseQuantity = useCallback(
    (productId, step = 1) => {
      const item = cartItems.find((x) => x.id === productId);
      const next = (item?.quantity || 0) + step;
      return updateQuantity(productId, next);
    },
    [cartItems, updateQuantity]
  );

  const decreaseQuantity = useCallback(
    (productId, step = 1) => {
      const item = cartItems.find((x) => x.id === productId);
      const next = (item?.quantity || 0) - step;
      return updateQuantity(productId, next); // BE: <=0 sẽ remove:contentReference[oaicite:14]{index=14}
    },
    [cartItems, updateQuantity]
  );

  const removeFromCart = useCallback(
    async (productId) => {
      if (!token) return;

      const res = await fetch(`${API}/cart/item/${productId}`, {
        method: "DELETE",
        headers: authHeaders(token),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Remove failed");

      setCartItems(normalizeCart(data.cart));
    },
    [token]
  );

  const clearCart = useCallback(async () => {
    if (!token) return;

    const res = await fetch(`${API}/cart/clear`, {
      method: "DELETE",
      headers: authHeaders(token),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Clear failed");

    setCartItems(normalizeCart(data.cart));
  }, [token]);

  const totals = useMemo(() => {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => {
      const price = item.discountPrice ?? item.price;
      return sum + Number(price) * item.quantity;
    }, 0);
    return { totalItems, totalPrice };
  }, [cartItems]);

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      updateQuantity,
      increaseQuantity,
      decreaseQuantity,
      totals,
    }),
    [cartItems, addToCart, removeFromCart, clearCart, updateQuantity, increaseQuantity, decreaseQuantity, totals]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
