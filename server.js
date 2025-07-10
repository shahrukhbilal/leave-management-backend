const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');

const attendanceRoutes = require('./routes/attendanceRoutes');
const eventRoutes = require('./routes/eventRoutes');
const adminRoutes = require('./routes/adminRoutes');
 const leaveRoutes = require('./routes/leaveManagementRoutes')
const dbconnection = require('./dbconnection');
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
dbconnection();

// Routes
app.use('/api', authRoutes);         // ✅ /api/login and /api/register
app.use('/api/leaves', leaveRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/admin', adminRoutes);  // ✅ /api/admin/employees
app.use('/api', adminRoutes);
app.use('/api', eventRoutes);        // ✅ /api/events or whatever is inside eventRoutes

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
