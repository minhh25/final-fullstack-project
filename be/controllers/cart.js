import mongoose from "mongoose";
import User from "../models/user.js";
import Product from "../models/product.js";

export const getCart = async (req,res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('cart');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addToCart = async (req, res) => {
    try {
      const userId = req.user.id;
      const { productId, qty = 1 } = req.body;
  
      if (!productId) return res.status(400).json({ message: "Missing productId" });
  
      const quantity = Math.max(1, Number(qty) || 1);
  
      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ message: "Product not found" });
  
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const idx = user.cart.findIndex((it) => it.product.toString() === productId);
  
      if (idx >= 0) {
        user.cart[idx].quantity += quantity;
      } else {
        user.cart.push({
          product: product._id,
          quantity,
          name: product.name,
          price: product.price,
          discountPrice: product.discountPrice ?? null,
          image: product.image || "",
        });
      }
  
      await user.save();
      return res.status(200).json({ message: "Added to cart", cart: user.cart });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  export const updateCartItemQty = async (req, res) => {
    try {
      const userId = req.user.id;
      const { productId, qty } = req.body;
  
      const nextQty = Number(qty);
  
      if (!productId) return res.status(400).json({ message: "Missing productId" });
      if (!Number.isFinite(nextQty)) return res.status(400).json({ message: "Invalid qty" });
  
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const idx = user.cart.findIndex((it) => it.product.toString() === productId);
      if (idx === -1) return res.status(404).json({ message: "Item not in cart" });
  
      if (nextQty <= 0) {
        user.cart.splice(idx, 1);
      } else {
        user.cart[idx].quantity = nextQty;
      }
  
      await user.save();
      return res.status(200).json({ message: "Cart updated", cart: user.cart });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  export const removeCartItem = async (req, res) => {
    try {
      const userId = req.user.id;
      const { productId } = req.params;
  
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      user.cart = user.cart.filter((it) => it.product.toString() !== productId);
  
      await user.save();
      return res.status(200).json({ message: "Removed", cart: user.cart });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  export const clearCart = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      user.cart = [];
      await user.save();
  
      return res.status(200).json({ message: "Cleared cart", cart: [] });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
