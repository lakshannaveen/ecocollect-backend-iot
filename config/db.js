const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Establish connection to MongoDB (Atlas) using the connection URI from .env
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Log success with host information
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    // Log error details
    console.error("MongoDB connection failed:", error.message);

    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
