const express = require('express');
const router = express.Router(); // Creating route object
const bcrypt = require('bcryptjs'); // To hash and compare passwords
const jwt = require('jsonwebtoken'); // To generate and verify tokens
const User = require('../models/userModel'); // Importing user model
const JWT_SECRET = process.env.JWT_SECRET;





// ========== REGISTER ROUTE ==========
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role,secretKey } = req.body;

    // ✅ lowercase email for consistency
    const userEmail = email.toLowerCase();
if (role === "admin") {
      if (secretKey !== process.env.ADMIN_SECRET_KEY) {
        return res.status(400).json({ message: "Invalid Admin Secret Key" });
      }
    }

    // Check if already exists
    const existingUser = await User.findOne({ email: userEmail });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email: userEmail,
      password: hashedPassword,
      role,
      secretKey
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


/// ========== LOGIN ROUTE (Unified) ==========
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET , { expiresIn: '1d' });

    // ✅ Must include role in response
   res.json({
  token,
  user: {
    _id: user._id,
    email: user.email,
    role: user.role
  }
});


  } catch (error) {
  console.error("Login error:", error); // ⬅️ Log the actual error
  res.status(500).json({ message: 'Server error' });
}

});
module.exports = router; // Export routes
