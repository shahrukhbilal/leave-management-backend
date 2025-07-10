const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// GET all employees (role === 'employee')
router.get('/employees', async (req, res) => {
  try {
    const employees = await User.find({ role: 'employee' });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching employees', error: err.message });
  }
});
// save attendance 
router.post('/attendance', async (req, res) => {
  try {
    const { employeeId, name, date, status } = req.body;

    // Optional: Prevent duplicate attendance on same date
    const exists = await Attendance.findOne({ employeeId, date });
    if (exists) {
      return res.status(400).json({ message: 'Attendance already marked for this employee today' });
    }

    const newRecord = new Attendance({ employeeId, name, date, status });
    await newRecord.save();

    res.status(201).json({ message: 'Attendance marked', newRecord });
  } catch (err) {
    res.status(500).json({ message: 'Error saving attendance', error: err.message });
  }
});

module.exports = router;
