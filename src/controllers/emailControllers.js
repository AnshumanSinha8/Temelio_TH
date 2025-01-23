const { getNonprofitByEmail } = require('../models/nonProfitModel');
const { sendEmail } = require('../services/emailService');

// Store "sent emails" in memory here for now.
const sentEmails = [];

// Bulk send controller
async function bulkSendEmails(req, res) {
  const { nonprofitEmails, template } = req.body;
  const now = new Date().toISOString().slice(0, 10); // e.g. "YYYY-MM-DD"
  const results = [];

  for (const email of nonprofitEmails) {
    const nonprofit = getNonprofitByEmail(email);
    if (!nonprofit) {
      // Realistically, we might return an error.
      // For now, let's just skip.
      continue;
    }

    // Replace placeholders in template
    let resolvedBody = template
      .replace('{name}', nonprofit.name)
      .replace('{address}', nonprofit.address)
      .replace('{date}', now);

    // Use the emailService to "send"
    sendEmail(email, 'Temelio Notification', resolvedBody);

    // Keep record of sent email (for later use to check all sent emails)
    const record = {
      to: email,
      body: resolvedBody,
      sentAt: new Date().toISOString()
    };
    sentEmails.push(record);
    results.push(record);
  }

  return res.json({
    message: 'Emails processed',
    sent: results
  });
}

function getAllSentEmails(req, res) {
  return res.json(sentEmails);
}

module.exports = {
  bulkSendEmails,
  getAllSentEmails
};
