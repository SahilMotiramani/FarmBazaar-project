// app.js
const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth');
const contractsRouter = require('./routes/contracts');
 // Import the new router
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

// Define CORS options
const corsOptions = {
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true, // Allow cookies/JWT
};

// Apply middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Serve uploads directory as static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/contracts', contractsRouter);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!'
  });
});

module.exports = app;