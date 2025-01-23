// Setup for Express routing
const express = require('express');
const router = express.Router();

// Import controller methods
const { bulkSendEmails, getAllSentEmails } = require('../controllers/emailControllers');

// Bulk send emails
router.post('/bulk', bulkSendEmails);

// Retrieve all sent emails
router.get('/', getAllSentEmails);

module.exports = router;
