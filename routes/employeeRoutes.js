const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// GET /api/employees - fetch users with role=employee
router.get('/', async (req, res) => {
  try {
    const employees = await User.find({ role: 'employee' }).select('-password'); // Exclude password
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch employees', error: err.message });
  }
});

module.exports = router;
