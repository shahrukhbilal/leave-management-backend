const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  department: String,
  // add any other fields
});

module.exports = mongoose.model('Employee', employeeSchema);
