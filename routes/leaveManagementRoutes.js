const express = require('express');
const router = express.Router();
const Leave = require('../models/leaveModel');
router.get('/ping', (req, res) => {
  res.send("Leave API working ✅");
});

// ✅ Apply for Leave
router.post('/', async (req, res) => {
  try {
    const { employeeId, reason, fromDate, toDate } = req.body;
    const newLeave = new Leave({ employeeId, reason, fromDate, toDate });
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


// ✅ Update Leave Status (Admin action)
// ✅ Apply for Leave
router.post('/', async (req, res) => {
  try {
    const { userId, reason, fromDate, toDate } = req.body;

    const newLeave = new Leave({ userId, reason, fromDate, toDate });

    await newLeave.save();

    res.status(201).json({ message: 'Leave applied!', newLeave });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
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
module.exports = router;
