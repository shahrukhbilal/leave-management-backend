const express = require('express');
const router = express.Router(); // Creating route object
const bcrypt = require('bcryptjs'); // To hash and compare passwords
const jwt = require('jsonwebtoken'); // To generate and verify tokens
const User = require('../models/userModel'); // Importing user model



// ========== REGISTER ROUTE ==========
router.post('/register', async (req, res) => {
     console.log("Request body received:", req.body); 
     
  try {
     console.log('Request body:', req.body);
    const { name, email, password, role } = req.body;
    if (!name || !email || !password  || !role) {
  return res.status(400).json({ message: 'Please provide all fields' });
}

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    res.status(201).json({ message: 'Registered successfully', user });
  } catch (err) {
    console.error('Registration error:', err); // <-- log error
    res.status(500).json({ message: 'Something went wrong', error: err.message });
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
    res.status(200).json({
      user: {
        email: user.email,
        role: user.role
      },
      token
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }

});
module.exports = router; // Export routes
