const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Load .env variables
const accountRoutes = require('./routes/accountRoutes');
const cookieParser = require('cookie-parser');
const binRoutes = require('./routes/binRoutes');
const mapRoutes = require('./routes/mapRoutes');

const app = express(); // Initialize app
const PORT = process.env.PORT || 5002;

// Enable CORS with credentials
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true, // Allow sending cookies with requests
}));

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/account', accountRoutes);

app.use('/api/bins', binRoutes);

// Use mapRoutes
app.use('/api/map', mapRoutes);

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection failed:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
