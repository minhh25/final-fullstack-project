import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice : { type: Number, required: false },
    inStock: { type: Boolean, default: true },
    quantity: { type: Number, default: 100 },
    image: { type: String, required: true },
    tags: { type: [String], required: true },
    description: { type: String },
})

const Product = mongoose.model("Product", productSchema);
export default Product;