const express = require("express");
const router = express.Router();
const { getDailyAverages, getWeeklyAverages } = require("../controllers/analysisController"); // Add the new import

// Define routes
router.get("/daily", getDailyAverages);
router.get("/weekly", getWeeklyAverages);  // New route for weekly averages

module.exports = router;
