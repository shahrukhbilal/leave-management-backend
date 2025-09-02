const express = require('express');
const router = express.Router();
const Leave = require('../models/leaveModel');
const protect = require('../middleware/authMiddleware');

// ✅ Test route
router.get('/ping', (req, res) => {
  res.send("Leave API working ✅");
});

// ✅ Apply for Leave
router.post('/', protect, async (req, res) => {
  try {
    const { userId, reason, fromDate, toDate } = req.body;
    if (!userId || !reason || !fromDate || !toDate) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newLeave = new Leave({ userId, reason, fromDate, toDate });
    await newLeave.save();

    res.status(201).json({ message: 'Leave applied!', newLeave });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// ✅ Get All Leaves
router.get('/', async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get Single Leave by ID
router.get('/:id', async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }
    res.json(leave);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update Leave Status (Admin action)
// PUT update leave status
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedLeave = await Leave.findByIdAndUpdate(
      id,
      { status },
      { new: true } // new:true return updated document
    );

    if (!updatedLeave) {
      return res.status(404).json({ message: 'Leave not found' });
    }

    res.json(updatedLeave);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
