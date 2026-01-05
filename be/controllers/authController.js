import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



//signup
export const signup = async (req, res) => {
    try {
        const { username, password, email, address, phone } = req.body;
        //basic auth
        if (!username || !email || !password || !address || !phone) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Check existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            address,
            phone,
            role: "user",
        });

        //gen token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.status(201).json({
            message: "Signup successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

//login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Missing email or password" });
        };
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        };
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        };

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
  

        res.status(200).json({ message: "Login successful", token,  user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      }});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};