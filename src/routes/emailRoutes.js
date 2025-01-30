// Setup for Express routing
const express = require('express');
const router = express.Router();

// Import controller methods
const { bulkSendEmails, getAllSentEmail, addCCtoNonprofit } = require('../controllers/emailControllers');

// Bulk send emails
router.post('/bulk', bulkSendEmails);

// New route to add a cc before sending an email
router.post('/:email/cc', addCCtoNonprofit);
// Retrieve all sent emails
router.get('/', getAllSentEmails);

module.exports = router;
