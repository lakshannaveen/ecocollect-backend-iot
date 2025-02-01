const express = require("express");
const router = express.Router();
const { getWeeklyAverages } = require("../controllers/analysisController");

// Define route to fetch weekly averages
router.get("/weekly-averages", getWeeklyAverages);

module.exports = router;
