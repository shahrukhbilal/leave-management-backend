const mongoose = require('mongoose');

// Step 1: Define schema for User
const userSchema = new mongoose.Schema({
  name: String, // Employee or admin name
 email: { type: String, required: true, unique: true, lowercase: true }
, // Unique email required
  password: String, // Encrypted password
  role: {
    type: String,
    enum: ['employee', 'admin'], // Only these roles are allowed
    default: 'employee' // Default role
  },
  
});

// Step 2: Export model
module.exports = mongoose.model('User', userSchema, 'my-custom-user');
