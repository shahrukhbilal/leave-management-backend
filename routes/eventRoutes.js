const express = require('express');
const router = express.Router();
const Event = require('../models/eventModel');

// ➕ Add new event
router.post('/events', async (req, res) => {
  try {
    const { title, start, end } = req.body;
    const newEvent = new Event({ title, start, end });
    await newEvent.save();
    res.status(201).json({ message: 'Event added', event: newEvent });
  } catch (err) {
    res.status(500).json({ error: 'Error adding event', details: err.message });
  }
});

// 📥 Get all events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events', details: err.message });
  }
});

module.exports = router;
