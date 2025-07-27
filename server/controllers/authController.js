const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Login Controller
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        // 2. Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        // 4. Sign token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // 5. Respond with token
        res.status(200).json({ message: "Login successful", token });

    } catch (err) {
        console.error("Login Error:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const updatedData = { username, email };
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedData.password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            updatedData,
        )

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User updated successfully", user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.getSingleUser = async (req, res) => {
    try {
        const userId = req.user.id; 

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};