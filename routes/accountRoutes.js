const express = require('express');
const { loginAdmin } = require('../controllers/accountController');

const router = express.Router();

// POST request for login (without JWT)
router.post('/login', loginAdmin);

module.exports = router;
