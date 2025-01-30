const { getNonprofitByEmail } = require('../models/nonProfitModel');
const { sendEmail } = require('../services/emailService');

// Store "sent emails" in memory here for now.
const sentEmails = [];

// Bulk send controller
async function bulkSendEmails(req, res) {
  // now we want to include email addresses as a 'cc' or a 'bcc'.
  const { nonprofitEmails, template } = req.body;
  const now = new Date().toISOString().slice(0, 10); // e.g. "YYYY-MM-DD"
  const results = [];

  for (const email of nonprofitEmails) {
    // no geography! how error handle?
    const nonprofit = getNonprofitByEmail(email);
    if (!nonprofit) {
      // Realistically, we might return an error.
      // For now, let's just skip.
      continue;
    }

    // Allowed placeholders in the template
    const allowedPlaceholders = ['name', 'address', 'email', 'date'];

    // Extract all placeholders, e.g. ["{name}", "{geography}", "{date}"]
    const placeholders = template.match(/{(.*?)}/g) || [];

    // Strip out the braces to get just ["name", "geography", "date"]
    const extractedKeys = placeholders.map(ph => ph.replace(/[{}]/g, ''));

    // Find any invalid placeholders
    const invalidPlaceholders = extractedKeys.filter(key => !allowedPlaceholders.includes(key));
    if (invalidPlaceholders.length > 0) {
      console.log(invalidPlaceholders);
      // If any unrecognized placeholders are found, return an error
      return res.status(400).json({
        error: `Invalid placeholder(s): ${invalidPlaceholders.join(', ')}`
      });
    }

    // Replace placeholders in template
    let resolvedBody = template
      .replace('{name}', nonprofit.name)
      .replace('{address}', nonprofit.address)
      .replace('{date}', now)

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

function addCCtoNonprofit(nonProfitEmail, ccEmail) {
  const nonprofitEmails = req.body;
  // if nonProfit doesn't exist, error
  // error handle to make sure the cc exists, add email to cc if doesn't exist

  updateNonprofit(nonProfitEmail, ccEmail)
}

module.exports = {
  bulkSendEmails,
  getAllSentEmails,
  addCCtoNonprofit
};
