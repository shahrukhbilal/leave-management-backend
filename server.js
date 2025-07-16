const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

require('dotenv').config();
const dbconnection = require('./dbconnection');

// ROUTES
const authRoutes = require('./routes/authRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const eventRoutes = require('./routes/eventRoutes');
const adminRoutes = require('./routes/adminRoutes');
const leaveRoutes = require('./routes/leaveManagementRoutes'); // ✅ this is important

// Middleware
app.use(express.json());
app.use(cors());

// Connect DB
dbconnection();

// Mount Routes
app.use('/api', authRoutes);                // /api/login, /api/register
app.use('/api/leaves', leaveRoutes);        // /api/leaves/ping, /api/leaves (POST)
app.use('/api/attendance', attendanceRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/events', eventRoutes);        // Use this only if routes begin with `/` in file

// Start Server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
