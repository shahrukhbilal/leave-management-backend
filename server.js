const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

require('dotenv').config();
console.log('JWT_SECRET:', process.env.JWT_SECRET);

const dbconnection = require('./dbconnection');

// ROUTES
const authRoutes = require('./routes/authRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const eventRoutes = require('./routes/eventRoutes');
const adminRoutes = require('./routes/adminRoutes');
const leaveRoutes = require('./routes/leaveManagementRoutes'); // ✅ this is important
const employeesRoutes= require('./routes/employeeRoutes')

// Middleware
app.use(express.json());
app.use(cors());

// Connect DB
dbconnection();

// Mount Routes
app.use('/api/auth', authRoutes);                // /api/login, /api/register
app.use('/api/leaves', leaveRoutes);        // /api/leaves/ping, /api/leaves (POST)
app.use('/api/attendance', attendanceRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/events', eventRoutes); 
app.use('/api/employees', employeesRoutes)

// Start Server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
