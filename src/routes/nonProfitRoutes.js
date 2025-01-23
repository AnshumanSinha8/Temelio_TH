const express = require('express');
const router = express.Router();

// Import the controller
const { createNewNonprofit } = require('../controllers/nonProfitController');

// POST /nonprofits -> create a new nonprofit
router.post('/', createNewNonprofit);

module.exports = router;
