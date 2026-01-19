import mongoose from "mongoose";
import User from "../models/user.js";


export const getWishlist = async(req,res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate('wishlist');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const toggleWishlist = async(req,res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const productIndex = user.wishlist.findIndex((id) => id.toString() === productId);
        if (productIndex === -1) {
            user.wishlist.push(productId);
        } else {
            user.wishlist.splice(productIndex, 1);
        }
        await user.save();
        res.status(200).json({ message: "Wishlist updated", wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const checkExistInWishlist = async(req,res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;
        const user = await User.findById(userId);
        if(!user) return res.status(404).json({ message: "User not found" });
        const exist = user.wishlist.some((id) => id.toString() === productId);
        res.status(200).json({ exist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


