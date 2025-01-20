const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Make sure to load .env variables


const app = express();
const PORT = process.env.PORT || 5002;


// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection failed:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
