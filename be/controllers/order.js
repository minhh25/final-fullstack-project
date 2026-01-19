import Order from "../models/order.js";
import User from "../models/user.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, total, shippingAddress, phone, paymentMethod } = req.body;

    if (!items?.length) return res.status(400).json({ message: "Cart is empty" });
    if (!shippingAddress || !phone) return res.status(400).json({ message: "Missing shippingAddress/phone" });

    const order = await Order.create({
      user: userId,
      items,
      total,
      shippingAddress,
      phone,
      paymentMethod: paymentMethod || "cod",
      status: "pending",
    });

    
    await User.findByIdAndUpdate(userId, { $push: { orders: order._id }, $set: { cart: [] } });

    return res.status(201).json({ message: "Order created", order });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ user: userId })
      .populate("user", "username email address phone")
      .populate("items.product", "image department category name price discountPrice")
      .sort({ createdAt: -1 });

    return res.status(200).json({ orders });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status || order.status;
    await order.save();

    return res.status(200).json({ message: "Order status updated", order });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
