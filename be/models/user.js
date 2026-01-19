import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, default: 1, min: 1 },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, required: false },
    image: { type: String },
}, { _id : false });


const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ["user", "admin", "staff"], default: "user",},
    cart: { type: [cartSchema], default: [] },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product", default: [] }],
    orders: [{type: mongoose.Schema.Types.ObjectId, ref: "Order"}]
})

const User = mongoose.model("User", userSchema);
export default User;