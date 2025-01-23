const {
    createNonprofit,
    hasNonprofitWithEmail
  } = require('../models/nonProfitModel');
  
  async function createNewNonprofit(req, res) {
    const { name, address, email } = req.body;
  
    if (hasNonprofitWithEmail(email)) {
      return res.status(400).json({ error: 'Email already exists' });
    }
  
    createNonprofit({ name, address, email });
  
    return res.status(201).json({
      message: 'Nonprofit created successfully',
      nonprofit: { name, address, email }
    });
  }
  
  module.exports = {
    createNewNonprofit
  };
  