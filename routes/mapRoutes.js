const express = require('express');
const router = express.Router();
const mapController = require('../controllers/mapController'); // Make sure the path is correct

// Route to get all bins
router.get('/bins', mapController.getBins);

module.exports = router;
