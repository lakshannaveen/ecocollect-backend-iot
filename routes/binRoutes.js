const express = require('express');
const { getAllBins, updateBinStatus,createOrUpdateBinData } = require('../controllers/binController');

const router = express.Router();

// Route to get all bins
router.get('/', getAllBins);

// Route to update a bin's collection status
router.put('/:id', updateBinStatus);
// New route for sensor data
router.post('/sensor-data', createOrUpdateBinData);

module.exports = router;
