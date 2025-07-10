// models/attendanceModel.js
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId, // ✅ Must match how you're storing _id
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: String, // ISO string
    required: true
  },
  status: {
    type: String,
    enum: ['Present', 'Absent'],
    required: true
  }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
