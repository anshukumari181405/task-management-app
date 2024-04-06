const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const authenticate = require('./middleware/authMiddleware');
require('dotenv').config();


const app = express();

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect( 'mongodb://localhost:27017/task-management-app')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks',taskRoutes);

// Server Setup
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
