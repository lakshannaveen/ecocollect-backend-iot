const express = require("express");
const router = express.Router();
const { getDailyAverages } = require("../controllers/analysisController"); // Ensure correct import

// Define route
router.get("/daily", getDailyAverages);

module.exports = router;
