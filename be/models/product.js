import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    image: { type: String, required: true },
    tags: { type: [String], required: true },
})

const productModel = mongoose.model("products", productSchema);