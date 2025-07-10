const express = require('express');
const router = express.Router();
const Attendance = require('../models/AttendanceModel');

// GET all attendance records
router.get('/', async (req, res) => {
  try {
    const records = await Attendance.find();
    res.json(records);
    console.log('attendance submitted', records)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post('/', async (req, res) => {
  try {
    console.log("Request body:", req.body); // ✅ Add this
    const { employeeId, name, date, status } = req.body;

    const newRecord = new Attendance({ employeeId, name, date, status });
    await newRecord.save();

    res.status(201).json({ message: 'Attendance marked', newRecord });
  } catch (err) {
    console.error("❌ Attendance error:", err);  // ✅ Log error
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
