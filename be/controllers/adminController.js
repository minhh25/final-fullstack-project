import User from '../models/user.js';
import Product from '../models/product.js';
import Order from '../models/order.js';
import bcrypt from 'bcrypt';




//products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

//orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'username email').populate('items.product', 'name price');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};



//users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const createUser = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            phone,
            address,
            role = "user",
        } = req.body;


        if (!username || !email || !password || !phone || !address) {
            return res.status(400).json({ message: "Missing required fields" });
        }


        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(409).json({ message: "Email already exists" });
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            phone,
            address,
            role,
        });


        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            phone: user.phone,
            address: user.address,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const update = { ...req.body };

    if (update.password) {
      update.password = await bcrypt.hash(update.password, 10);
    } else {
      delete update.password;
    }

    const user = await User.findByIdAndUpdate(id, update, { new: true })
      .select("-password");

    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch {
    res.status(400).json({ message: "Delete failed" });
  }
};




//dashboard
export const getDashboardData = async (req, res) => {
  try {
    const now = new Date();
    const last30Days = new Date();
    last30Days.setDate(now.getDate() - 30);

    const [
      revenueAgg,
      totalOrders,
      pendingOrders,
      newUsers,
      recentOrders
    ] = await Promise.all([
      // revenue: only paid
      Order.aggregate([
        { $match: { status: "paid" } },
        { $group: { _id: null, total: { $sum: "$total" } } }
      ]),

      Order.countDocuments(),
      Order.countDocuments({ status: "pending" }),
      User.countDocuments({ createdAt: { $gte: last30Days } }),

      Order.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("user", "username email")
    ]);

    res.json({
      stats: {
        totalRevenue: revenueAgg[0]?.total || 0,
        totalOrders,
        newUsers,
        pendingOrders
      },
      recentOrders
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Dashboard error" });
  }
};